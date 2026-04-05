// hooks/useLocalStorage.ts

"use client";
import { useCallback, useRef, useSyncExternalStore } from "react";

const LOCAL_STORAGE_CHANGE_EVENT = "local-storage-change";

function parseLocalStorageValue<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (val: T | ((prev: T) => T)) => void] {
  const initialRef = useRef(initial);
  const snapshotCacheRef = useRef<{ raw: string | null; value: T }>({
    raw: null,
    value: initial,
  });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (typeof window === "undefined") return () => {};

      const handleStorage = (event: StorageEvent) => {
        if (event.key === key || event.key === null) {
          onStoreChange();
        }
      };

      const handleCustomEvent = (event: Event) => {
        const customEvent = event as CustomEvent<string>;
        if (customEvent.detail === key) {
          onStoreChange();
        }
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener(LOCAL_STORAGE_CHANGE_EVENT, handleCustomEvent);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(
          LOCAL_STORAGE_CHANGE_EVENT,
          handleCustomEvent
        );
      };
    },
    [key]
  );

  const getSnapshot = useCallback(
    () => {
      if (typeof window === "undefined") return initialRef.current;

      let raw: string | null;
      try {
        raw = window.localStorage.getItem(key);
      } catch {
        return snapshotCacheRef.current.value;
      }

      if (snapshotCacheRef.current.raw === raw) {
        return snapshotCacheRef.current.value;
      }

      const parsed = parseLocalStorageValue<T>(raw, initialRef.current);
      snapshotCacheRef.current = { raw, value: parsed };
      return parsed;
    },
    [key]
  );

  const value = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => initialRef.current
  );

  const set = useCallback(
    (val: T | ((prev: T) => T)) => {
      const prev = getSnapshot();
      const next =
        typeof val === "function" ? (val as (p: T) => T)(prev) : val;

      let raw: string | null = null;
      try {
        raw = JSON.stringify(next);
        window.localStorage.setItem(key, raw);
      } catch {
        /* ignore */
      }

      snapshotCacheRef.current = { raw, value: next };

      window.dispatchEvent(
        new CustomEvent<string>(LOCAL_STORAGE_CHANGE_EVENT, { detail: key })
      );
    },
    [getSnapshot, key]
  );

  return [value, set];
}
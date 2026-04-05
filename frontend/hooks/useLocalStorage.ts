// hooks/useLocalStorage.ts

"use client";
import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initial: T
): [T, (val: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, [key]);

  const set = (val: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const next = typeof val === "function" ? (val as (p: T) => T)(prev) : val;
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return [ready ? value : initial, set];
}
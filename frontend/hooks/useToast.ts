// hooks/useToast.ts

import { useState, useCallback } from "react";
import { ToastMessage } from "@/types";
import { generateId } from "@/lib/utils";

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const push = useCallback(
    (type: ToastMessage["type"], title: string, message?: string) => {
      const id = generateId();
      setToasts((p) => [...p, { id, type, title, message }]);
      setTimeout(
        () => setToasts((p) => p.filter((t) => t.id !== id)),
        4200
      );
    },
    []
  );

  const remove = useCallback((id: string) => {
    setToasts((p) => p.filter((t) => t.id !== id));
  }, []);

  return {
    toasts,
    remove,
    toast: {
      success: (title: string, msg?: string) => push("success", title, msg),
      error: (title: string, msg?: string) => push("error", title, msg),
      warning: (title: string, msg?: string) => push("warning", title, msg),
      info: (title: string, msg?: string) => push("info", title, msg),
    },
  };
}
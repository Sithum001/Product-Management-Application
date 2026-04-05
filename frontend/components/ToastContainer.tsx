// components/ToastContainer.tsx

"use client";

import { useEffect, useState } from "react";
import { ToastMessage } from "@/types";
import { cn } from "@/lib/utils";

interface ToastItemProps {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    requestAnimationFrame(() => setIsVisible(true));

    // Trigger exit animation before removal
    const leaveTimer = setTimeout(() => setIsLeaving(true), 3600);
    return () => clearTimeout(leaveTimer);
  }, []);

  const icons = {
    success: (
      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    ),
    error: (
      <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    ),
    warning: (
      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-amber-600 dark:text-amber-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>
    ),
    info: (
      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center flex-shrink-0">
        <svg
          className="w-4 h-4 text-blue-600 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    ),
  };

  const progressColors = {
    success: "bg-emerald-500",
    error: "bg-red-500",
    warning: "bg-amber-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={cn(
        "relative w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700",
        "overflow-hidden transition-all duration-300 ease-out",
        isVisible && !isLeaving
          ? "opacity-100 translate-x-0"
          : "opacity-0 translate-x-full"
      )}
    >
      {/* Progress bar */}
      <div
        className={cn(
          "absolute top-0 left-0 h-0.5 animate-shrink",
          progressColors[toast.type]
        )}
        style={{ animationDuration: "4s" }}
      />

      <div className="p-4 flex items-start gap-3">
        {icons[toast.type]}

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
            {toast.title}
          </p>
          {toast.message && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {toast.message}
            </p>
          )}
        </div>

        <button
          onClick={() => onRemove(toast.id)}
          className="text-slate-300 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-300 transition-colors flex-shrink-0 mt-0.5"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <ToastItem toast={toast} onRemove={onRemove} />
        </div>
      ))}
    </div>
  );
}
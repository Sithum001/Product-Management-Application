// components/DeleteConfirmModal.tsx

"use client";

import { useEffect } from "react";
import { Product } from "@/types";
import { Button } from "./ui/button";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  product: Product | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmModal({
  isOpen,
  product,
  onConfirm,
  onCancel,
}: DeleteConfirmModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onCancel();
      if (e.key === "Enter" && isOpen) onConfirm();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onConfirm, onCancel]);

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 animate-in">
        {/* Icon */}
        <div className="w-14 h-14 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-7 h-7 text-red-600 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center">
          Delete Product?
        </h3>

        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-200">
            "{product.name}"
          </span>
          ? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete Product
          </Button>
        </div>

        <p className="text-xs text-slate-400 text-center mt-3">
          Press <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">Enter</kbd> to confirm
          or <kbd className="font-mono bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">Esc</kbd> to cancel
        </p>
      </div>
    </div>
  );
}
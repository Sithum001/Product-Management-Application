// components/EmptyState.tsx

interface EmptyStateProps {
  hasFilters: boolean;
  onAddProduct: () => void;
  onResetFilters: () => void;
}

export function EmptyState({
  hasFilters,
  onAddProduct,
  onResetFilters,
}: EmptyStateProps) {
  if (hasFilters) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-3xl flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-slate-400 dark:text-slate-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          No products found
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6">
          No products match your current search or filter criteria. Try
          adjusting your filters.
        </p>
        <button
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-600 text-white text-sm font-medium hover:bg-violet-700 transition-colors"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Clear all filters
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-24 px-4">
      {/* Illustration */}
      <div className="relative mb-8">
        <div className="w-32 h-32 bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 rounded-3xl flex items-center justify-center">
          <svg
            className="w-16 h-16 text-violet-400 dark:text-violet-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
        No products yet
      </h3>
      <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-8">
        Get started by adding your first product. You can manage inventory,
        track stock, and organize by category.
      </p>

      <button
        onClick={onAddProduct}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 active:scale-95 transition-all shadow-lg shadow-violet-500/25"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
        Add Your First Product
      </button>
    </div>
  );
}
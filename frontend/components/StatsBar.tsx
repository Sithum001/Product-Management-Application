// components/StatsBar.tsx

import { formatPrice } from "@/lib/utils";

interface StatsBarProps {
  total: number;
  totalValue: number;
  inStock: number;
  categories: number;
}

export function StatsBar({
  total,
  totalValue,
  inStock,
  categories,
}: StatsBarProps) {
  const stats = [
    {
      label: "Total Products",
      value: total.toString(),
      icon: (
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
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      color:
        "bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400",
      bgColor: "bg-white dark:bg-slate-800",
    },
    {
      label: "Inventory Value",
      value: formatPrice(totalValue),
      icon: (
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color:
        "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-white dark:bg-slate-800",
    },
    {
      label: "In Stock",
      value: inStock.toString(),
      icon: (
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
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color:
        "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      bgColor: "bg-white dark:bg-slate-800",
    },
    {
      label: "Categories",
      value: categories.toString(),
      icon: (
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
            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
          />
        </svg>
      ),
      color:
        "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      bgColor: "bg-white dark:bg-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.bgColor} rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm`}
        >
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {stat.label}
              </p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                {stat.value}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
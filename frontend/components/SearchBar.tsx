// components/SearchBar.tsx

"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FilterConfig, ViewMode, SortConfig } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: FilterConfig;
  onFiltersChange: (filters: FilterConfig) => void;
  onResetFilters: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  sortConfig: SortConfig;
  onSortChange: (field: SortConfig["field"]) => void;
  resultsCount: number;
  totalCount: number;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  filters,
  onFiltersChange,
  onResetFilters,
  viewMode,
  onViewModeChange,
  sortConfig,
  onSortChange,
  resultsCount,
  totalCount,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.category ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.inStock ||
    searchQuery;

  const SortButton = ({
    field,
    label,
  }: {
    field: SortConfig["field"];
    label: string;
  }) => (
    <button
      onClick={() => onSortChange(field)}
      className={cn(
        "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
        sortConfig.field === field
          ? "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
          : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
      )}
    >
      {label}
      {sortConfig.field === field && (
        <svg
          className={cn(
            "w-3 h-3 transition-transform",
            sortConfig.order === "desc" && "rotate-180"
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 15l7-7 7 7"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="space-y-3">
      {/* Main Search Row */}
      <div className="flex gap-3 items-center">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            placeholder="Search products by name, description, or category..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            leftIcon={
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
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            }
            rightIcon={
              searchQuery ? (
                <button
                  onClick={() => onSearchChange("")}
                  className="hover:text-slate-600 transition-colors"
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
              ) : undefined
            }
          />
        </div>

        {/* Filter Toggle */}
        <Button
          variant={showFilters ? "primary" : "secondary"}
          size="md"
          onClick={() => setShowFilters(!showFilters)}
          className="flex-shrink-0"
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <span className="hidden sm:inline">Filters</span>
          {hasActiveFilters && (
            <span className="w-2 h-2 bg-amber-400 rounded-full absolute top-2 right-2" />
          )}
        </Button>

        {/* View Mode Toggle */}
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          <button
            onClick={() => onViewModeChange("grid")}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === "grid"
                ? "bg-white dark:bg-slate-700 shadow-sm text-violet-600 dark:text-violet-400"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            onClick={() => onViewModeChange("table")}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewMode === "table"
                ? "bg-white dark:bg-slate-700 shadow-sm text-violet-600 dark:text-violet-400"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            )}
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
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) =>
                  onFiltersChange({ ...filters, category: e.target.value })
                }
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Min Price
              </label>
              <Input
                type="number"
                placeholder="$0"
                value={filters.minPrice}
                onChange={(e) =>
                  onFiltersChange({ ...filters, minPrice: e.target.value })
                }
                leftIcon={
                  <span className="text-xs font-medium">$</span>
                }
              />
            </div>

            {/* Max Price */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Max Price
              </label>
              <Input
                type="number"
                placeholder="∞"
                value={filters.maxPrice}
                onChange={(e) =>
                  onFiltersChange({ ...filters, maxPrice: e.target.value })
                }
                leftIcon={
                  <span className="text-xs font-medium">$</span>
                }
              />
            </div>

            {/* In Stock */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Availability
              </label>
              <button
                onClick={() =>
                  onFiltersChange({
                    ...filters,
                    inStock: !filters.inStock,
                  })
                }
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all",
                  filters.inStock
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-700 dark:text-emerald-400"
                    : "border-slate-200 dark:border-slate-600 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700"
                )}
              >
                <div
                  className={cn(
                    "w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all",
                    filters.inStock
                      ? "bg-emerald-500 border-emerald-500"
                      : "border-slate-300 dark:border-slate-500"
                  )}
                >
                  {filters.inStock && (
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                In Stock Only
              </button>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Sort by:
            </span>
            <SortButton field="createdAt" label="Date Added" />
            <SortButton field="name" label="Name" />
            <SortButton field="price" label="Price" />
            <SortButton field="stock" label="Stock" />

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="ml-auto text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg
                  className="w-3.5 h-3.5"
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
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      {totalCount > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {resultsCount}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700 dark:text-slate-300">
            {totalCount}
          </span>{" "}
          products
          {hasActiveFilters && " (filtered)"}
        </p>
      )}
    </div>
  );
}
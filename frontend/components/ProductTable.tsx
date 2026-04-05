// components/ProductTable.tsx

"use client";

import { useState } from "react";
import { Product } from "@/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { formatPrice, formatDate } from "@/lib/utils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="danger">Out of Stock</Badge>;
    if (stock < 10) return <Badge variant="warning">Low Stock</Badge>;
    return <Badge variant="success">In Stock</Badge>;
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Product
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                Category
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Price
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden md:table-cell">
                Stock
              </th>
              <th className="text-center px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider hidden xl:table-cell">
                Added
              </th>
              <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {products.map((product) => (
              <>
                <tr
                  key={product.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedRow(
                      expandedRow === product.id ? null : product.id
                    )
                  }
                >
                  {/* Product Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white max-w-[200px] truncate">
                          {product.name}
                        </p>
                        <p className="text-xs text-slate-400 max-w-[200px] truncate hidden sm:block">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <Badge variant="info">{product.category}</Badge>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-6 py-4 text-center hidden md:table-cell">
                    <span
                      className={`text-sm font-semibold ${
                        product.stock === 0
                          ? "text-red-500"
                          : product.stock < 10
                          ? "text-amber-500"
                          : "text-emerald-500"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center hidden lg:table-cell">
                    {getStockBadge(product.stock)}
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 hidden xl:table-cell">
                    <span className="text-xs text-slate-400">
                      {formatDate(product.createdAt)}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20"
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(product)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </Button>
                    </div>
                  </td>
                </tr>

                {/* Expanded Row */}
                {expandedRow === product.id && (
                  <tr
                    key={`${product.id}-expanded`}
                    className="bg-violet-50/50 dark:bg-violet-900/10"
                  >
                    <td colSpan={7} className="px-6 py-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Full Description
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {product.description}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Inventory Value
                          </p>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                            {formatPrice(product.price * product.stock)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                            Last Updated
                          </p>
                          <p className="text-sm text-slate-700 dark:text-slate-300">
                            {formatDate(product.updatedAt)}
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
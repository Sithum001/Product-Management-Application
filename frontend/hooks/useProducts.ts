// hooks/useProducts.ts

import { useMemo, useState, useCallback } from "react";
import { Product, ProductFormData, SortConfig, FilterConfig } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import {
  generateId,
  filterProducts,
  sortProducts,
} from "@/lib/utils";
import { DEFAULT_IMAGE, STORAGE_KEY } from "@/lib/constants";

const DEFAULT_SORT: SortConfig = { field: "createdAt", order: "desc" };
const DEFAULT_FILTERS: FilterConfig = {
  category: "",
  minPrice: "",
  maxPrice: "",
  inStock: false,
};

export function useProducts() {
  const [products, setProducts] = useLocalStorage<Product[]>(STORAGE_KEY, []);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<FilterConfig>(DEFAULT_FILTERS);
  const [sort, setSort] = useState<SortConfig>(DEFAULT_SORT);

  const add = useCallback(
    (data: ProductFormData): Product => {
      const now = new Date().toISOString();
      const product: Product = {
        id: generateId(),
        name: data.name.trim(),
        price: parseFloat(data.price),
        description: data.description.trim(),
        image: data.image.trim() || DEFAULT_IMAGE,
        category: data.category,
        stock: parseInt(data.stock),
        createdAt: now,
        updatedAt: now,
      };
      setProducts((p) => [product, ...p]);
      return product;
    },
    [setProducts]
  );

  const update = useCallback(
    (id: string, data: ProductFormData) => {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                name: data.name.trim(),
                price: parseFloat(data.price),
                description: data.description.trim(),
                image: data.image.trim() || DEFAULT_IMAGE,
                category: data.category,
                stock: parseInt(data.stock),
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );
    },
    [setProducts]
  );

  const remove = useCallback(
    (id: string) => setProducts((p) => p.filter((x) => x.id !== id)),
    [setProducts]
  );

  const cycleSort = useCallback((field: SortConfig["field"]) => {
    setSort((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setQuery("");
  }, []);

  const displayed = useMemo(() => {
    const filtered = filterProducts(products, query, filters);
    return sortProducts(filtered, sort);
  }, [products, query, filters, sort]);

  const stats = useMemo(
    () => ({
      total: products.length,
      value: products.reduce((s, p) => s + p.price * p.stock, 0),
      inStock: products.filter((p) => p.stock > 0).length,
      categories: new Set(products.map((p) => p.category)).size,
    }),
    [products]
  );

  return {
    products,
    displayed,
    query,
    setQuery,
    filters,
    setFilters,
    sort,
    cycleSort,
    resetFilters,
    add,
    update,
    remove,
    stats,
  };
}
// lib/utils.ts

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, SortConfig, FilterConfig } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateId(): string {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(dateString));
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export function filterProducts(
  products: Product[],
  searchQuery: string,
  filters: FilterConfig
): Product[] {
  return products.filter((product) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower) ||
      product.category.toLowerCase().includes(searchLower);

    // Category filter
    const matchesCategory =
      !filters.category || product.category === filters.category;

    // Price filter
    const minPrice = filters.minPrice ? parseFloat(filters.minPrice) : 0;
    const maxPrice = filters.maxPrice
      ? parseFloat(filters.maxPrice)
      : Infinity;
    const matchesPrice =
      product.price >= minPrice && product.price <= maxPrice;

    // Stock filter
    const matchesStock = !filters.inStock || product.stock > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });
}

export function sortProducts(
  products: Product[],
  sortConfig: SortConfig
): Product[] {
  return [...products].sort((a, b) => {
    let comparison = 0;

    switch (sortConfig.field) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "stock":
        comparison = a.stock - b.stock;
        break;
      case "createdAt":
        comparison =
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
    }

    return sortConfig.order === "asc" ? comparison : -comparison;
  });
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
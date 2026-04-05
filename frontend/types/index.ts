// types/index.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductFormData {
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
  stock: string;
}

export interface ProductFormErrors {
  name?: string;
  price?: string;
  description?: string;
  image?: string;
  category?: string;
  stock?: string;
}

export type ViewMode = "grid" | "table";
export type SortField = "name" | "price" | "createdAt" | "stock";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
}

export interface FilterConfig {
  category: string;
  minPrice: string;
  maxPrice: string;
  inStock: boolean;
}
// lib/validators.ts

import { ProductFormData, ProductFormErrors } from "@/types";
import { isValidUrl } from "./utils";

export function validateProductForm(
  data: ProductFormData
): ProductFormErrors {
  const errors: ProductFormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Product name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Product name must be at least 2 characters";
  } else if (data.name.trim().length > 100) {
    errors.name = "Product name must not exceed 100 characters";
  }

  // Price validation
  if (!data.price) {
    errors.price = "Price is required";
  } else {
    const priceNum = parseFloat(data.price);
    if (isNaN(priceNum)) {
      errors.price = "Price must be a valid number";
    } else if (priceNum < 0) {
      errors.price = "Price cannot be negative";
    } else if (priceNum > 999999) {
      errors.price = "Price cannot exceed $999,999";
    }
  }

  // Description validation
  if (!data.description.trim()) {
    errors.description = "Description is required";
  } else if (data.description.trim().length < 10) {
    errors.description = "Description must be at least 10 characters";
  } else if (data.description.trim().length > 500) {
    errors.description = "Description must not exceed 500 characters";
  }

  // Image validation (optional but validate if provided)
  if (data.image && !isValidUrl(data.image)) {
    errors.image = "Please enter a valid image URL";
  }

  // Category validation
  if (!data.category) {
    errors.category = "Please select a category";
  }

  // Stock validation
  if (!data.stock) {
    errors.stock = "Stock quantity is required";
  } else {
    const stockNum = parseInt(data.stock);
    if (isNaN(stockNum)) {
      errors.stock = "Stock must be a valid number";
    } else if (stockNum < 0) {
      errors.stock = "Stock cannot be negative";
    } else if (!Number.isInteger(stockNum)) {
      errors.stock = "Stock must be a whole number";
    }
  }

  return errors;
}

export function hasErrors(errors: ProductFormErrors): boolean {
  return Object.keys(errors).length > 0;
}
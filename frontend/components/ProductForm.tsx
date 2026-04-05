// components/ProductForm.tsx

"use client";

import { useState, useRef } from "react";
import { ProductFormData, ProductFormErrors } from "@/types";
import { CATEGORIES } from "@/lib/constants";
import {
  validateProductForm,
  hasErrors,
} from "@/lib/validators";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isEditing?: boolean;
}

const EMPTY_FORM: ProductFormData = {
  name: "",
  price: "",
  description: "",
  image: "",
  category: "",
  stock: "",
};

export function ProductForm({
  initialData,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || EMPTY_FORM
  );
  const [errors, setErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreviewError, setImagePreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateField = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear field error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        image: "Please select a valid image file",
      }));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      updateField("image", reader.result as string);
      setImagePreviewError(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateProductForm(formData);

    if (hasErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    // Simulate slight async delay for UX
    await new Promise((resolve) => setTimeout(resolve, 300));
    onSubmit(formData);
    setIsSubmitting(false);
  };

  const hasImage = formData.image && !imagePreviewError;

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Image Preview & Upload */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Product Image
        </label>

        <div className="flex gap-4 items-start">
          {/* Preview */}
          <div
            className={cn(
              "w-24 h-24 rounded-2xl border-2 border-dashed flex items-center justify-center flex-shrink-0 overflow-hidden",
              hasImage
                ? "border-transparent"
                : "border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800/50"
            )}
          >
            {hasImage ? (
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-full object-cover rounded-2xl"
                onError={() => setImagePreviewError(true)}
              />
            ) : (
              <svg
                className="w-8 h-8 text-slate-300 dark:text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          {/* URL & Upload */}
          <div className="flex-1 space-y-2">
            <Input
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={(e) => {
                updateField("image", e.target.value);
                setImagePreviewError(false);
              }}
              error={errors.image}
              hint="Enter image URL or upload a file"
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
              Or upload from device
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Name */}
      <Input
        label="Product Name"
        placeholder="e.g. Premium Wireless Headphones"
        value={formData.name}
        onChange={(e) => updateField("name", e.target.value)}
        error={errors.name}
        required
        maxLength={100}
      />

      {/* Price & Stock - Side by side */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          type="number"
          placeholder="0.00"
          value={formData.price}
          onChange={(e) => updateField("price", e.target.value)}
          error={errors.price}
          required
          min="0"
          step="0.01"
          leftIcon={<span className="text-xs font-semibold">$</span>}
        />

        <Input
          label="Stock Quantity"
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={(e) => updateField("stock", e.target.value)}
          error={errors.stock}
          required
          min="0"
          step="1"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Category <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.category}
          onChange={(e) => updateField("category", e.target.value)}
          className={cn(
            "w-full rounded-xl border bg-white dark:bg-slate-800 px-3 py-2.5 text-sm",
            "text-slate-900 dark:text-slate-100",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent",
            errors.category
              ? "border-red-400"
              : "border-slate-200 dark:border-slate-600"
          )}
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {errors.category}
          </p>
        )}
      </div>

      {/* Description */}
      <Textarea
        label="Description"
        placeholder="Describe your product in detail..."
        value={formData.description}
        onChange={(e) => updateField("description", e.target.value)}
        error={errors.description}
        required
        rows={4}
        maxLength={500}
        showCount
      />

      {/* Actions */}
      <div className="flex gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {isEditing ? (
            <>
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
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Save Changes
            </>
          ) : (
            <>
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Product
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
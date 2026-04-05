// app/page.tsx
"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { Product, ProductFormData, ViewMode } from "@/types";
import { useProducts } from "@/hooks/useProducts";
import { useToast } from "@/hooks/useToast";
import { Header } from "@/components/Header";
import { StatsBar } from "@/components/StatsBar";
import { SearchBar } from "@/components/SearchBar";
import { ProductCard } from "@/components/ProductCard";
import { ProductTable } from "@/components/ProductTable";
import { ProductModal } from "@/components/ProductModal";
import { DeleteConfirmModal } from "@/components/DeleteConfirmModal";
import { EmptyState } from "@/components/EmptyState";
import { ToastContainer } from "@/components/ToastContainer";

const THEME_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function getClientThemeSnapshot() {
  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark") return true;
  if (stored === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToThemeStore(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const onThemeChange = () => callback();

  window.addEventListener("storage", onThemeChange);
  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange);
  media.addEventListener("change", onThemeChange);

  return () => {
    window.removeEventListener("storage", onThemeChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange);
    media.removeEventListener("change", onThemeChange);
  };
}

export default function Page() {
  /* ── dark mode ── */
  const dark = useSyncExternalStore(
    subscribeToThemeStore,
    getClientThemeSnapshot,
    getServerThemeSnapshot
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const toggleDark = useCallback(() => {
    const next = !dark;
    window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }, [dark]);

  /* ── products ── */
  const {
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
  } = useProducts();

  /* ── toasts ── */
  const { toasts, remove: removeToast, toast } = useToast();

  /* ── modal state ── */
  const [view, setView] = useState<ViewMode>("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState<Product | null>(null);

  /* ── handlers ── */
  const handleSubmit = useCallback(
    (data: ProductFormData) => {
      if (editing) {
        update(editing.id, data);
        toast.success("Product updated", `"${data.name}" has been saved.`);
      } else {
        add(data);
        toast.success(
          "Product added",
          `"${data.name}" is now in your inventory.`
        );
      }
      setModalOpen(false);
      setEditing(null);
    },
    [editing, add, update, toast]
  );

  const openAdd = useCallback(() => {
    setEditing(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((p: Product) => {
    setEditing(p);
    setModalOpen(true);
  }, []);

  const openDelete = useCallback((p: Product) => setDeleting(p), []);

  const confirmDelete = useCallback(() => {
    if (!deleting) return;
    remove(deleting.id);
    toast.success("Product deleted", `"${deleting.name}" has been removed.`);
    setDeleting(null);
  }, [deleting, remove, toast]);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditing(null);
  }, []);

  /* ── derived ── */
  const hasFilters =
    !!query ||
    !!filters.category ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    filters.inStock;

  return (
    <>
      <Header
        darkMode={dark}
        onToggleDarkMode={toggleDark}
        onAddProduct={openAdd}
      />

        <main className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 space-y-8">

        {/* Stats */}
        {products.length > 0 && (
          <StatsBar
            total={stats.total}
            totalValue={stats.value}
            inStock={stats.inStock}
            categories={stats.categories}
          />
        )}      


        {/* Toolbar */}
        {products.length > 0 && (
          <SearchBar
            searchQuery={query}
            onSearchChange={setQuery}
            filters={filters}
            onFiltersChange={setFilters}
            onResetFilters={resetFilters}
            viewMode={view}
            onViewModeChange={setView}
            sortConfig={sort}
            onSortChange={cycleSort}
            resultsCount={displayed.length}
            totalCount={products.length}
          />
        )}

        {/* Content */}
        {products.length === 0 ? (
          <EmptyState
            hasFilters={false}
            onAddProduct={openAdd}
            onResetFilters={resetFilters}
          />
        ) : displayed.length === 0 ? (
          <EmptyState
            hasFilters={hasFilters}
            onAddProduct={openAdd}
            onResetFilters={resetFilters}
          />
        ) : view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {displayed.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onEdit={openEdit}
                onDelete={openDelete}
              />
            ))}
          </div>
        ) : (
          <ProductTable
            products={displayed}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        )}
      </main>

      {/* Modals */}
      <ProductModal
        isOpen={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmit}
        editingProduct={editing}
      />

      <DeleteConfirmModal
        isOpen={!!deleting}
        product={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleting(null)}
      />

      {/* Toasts */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </>
  );
}
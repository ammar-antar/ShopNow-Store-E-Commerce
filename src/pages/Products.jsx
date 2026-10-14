import { useState, useEffect, useRef } from "react";
import { SlidersHorizontal, X, ArrowLeft } from "lucide-react";
import Container from "@/components/Container.jsx";
import ProductGrid from "@/components/products/ProductGrid.jsx";
import ProductSortBar from "@/components/products/ProductSortBar.jsx";
import ProductFilters from "@/components/products/ProductFilters.jsx";
import Pagination from "@/components/products/ProductPagination.jsx";
import useProductsUrl from "@/hooks/useProductsUrl.js";
import useProducts from "@/hooks/useProducts.js";
import useFilteredProducts from "@/hooks/useFilteredProducts.js";
import { Link } from "react-router-dom";
import { toTitleCase } from "@/lib/format";
const PAGE_SIZE = 12;

export default function Products() {
  const {
    category,
    q,
    filters,
    sort,
    page,
    setSort,
    setPage,
    setFilter,
    clearFilters,
  } = useProductsUrl();

  const {
    products: rawProducts,
    isLoading,
    error,
    refetch,
  } = useProducts({ category, q });

  const {
    products,
    total,
    totalPages,
    currentPage,
    availableBrands,
    priceRange,
  } = useFilteredProducts({
    products: rawProducts,
    filters,
    sort,
    page,
    pageSize: PAGE_SIZE,
  });
  const animationKey = `${category}-${q}-${sort}-${page}-${JSON.stringify(filters)}`;
  const [filtersOpen, setFiltersOpen] = useState(false);
  const isFirstRender = useRef(true);

  // Scroll to top on page change
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Drawer: escape + body lock
  useEffect(() => {
    if (!filtersOpen) return;
    function onKey(e) {
      if (e.key === "Escape") setFiltersOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [filtersOpen]);

  const title = category
    ? toTitleCase(category)
    : q
      ? `Results for "${q}"`
      : "All Products";

  return (
    <Container className="py-5 lg:py-8">
      {/* Title */}
      <header className="mb-4 lg:mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight lg:text-2xl">
            {title}
          </h1>

          <Link
            to="/"
            className="mb-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Toolbar */}
      <div className="mb-4 flex items-center gap-2 lg:gap-3">
        <button
          type="button"
          onClick={() => setFiltersOpen(true)}
          className="inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted sm:px-3 lg:hidden"
        >
          <SlidersHorizontal className="size-4" strokeWidth={2} />
          <span className="hidden xs:inline">Filters</span>
        </button>

        <div className="min-w-0 flex-1">
          <ProductSortBar
            sort={sort}
            onSortChange={setSort}
            total={total}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr] lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block">
          <ProductFilters
           key={`${filters.minPrice}-${filters.maxPrice}`}
            filters={filters}
            onFilterChange={setFilter}
            onClearAll={clearFilters}
            availableBrands={availableBrands}
            priceRange={priceRange}
          />
        </aside>

        {/* Grid */}
        <div
          key={animationKey}
          className="min-w-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300 motion-safe:ease-out"
        >
          <ProductGrid
            products={products}
            isLoading={isLoading}
            error={error}
            onRetry={refetch}
          />

          {!isLoading && !error && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setFiltersOpen(false)}
            className="absolute inset-0 cursor-pointer bg-black/40 backdrop-blur-sm"
          />

          {/* Drawer */}
          <div className="absolute inset-y-0 inset-s-0 flex w-[85%] max-w-sm flex-col bg-background shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-base font-bold">Filters</h2>
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                aria-label="Close"
                className="grid size-8 cursor-pointer place-items-center rounded-lg transition-colors hover:bg-muted"
              >
                <X className="size-4" strokeWidth={2.2} />
              </button>
            </div>

            {/* Filters */}
            <div className="flex-1 overflow-y-auto px-4">
              <ProductFilters
                filters={filters}
                onFilterChange={setFilter}
                onClearAll={clearFilters}
                availableBrands={availableBrands}
                priceRange={priceRange}
              />
            </div>

            {/* Footer CTA */}
            <div className="border-t border-border p-3">
              <button
                type="button"
                onClick={() => setFiltersOpen(false)}
                className="h-10 w-full cursor-pointer rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Show {total} {total === 1 ? "result" : "results"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

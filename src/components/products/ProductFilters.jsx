import { useState } from "react";
import { X, Star, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const RATING_OPTIONS = [
  { value: 4, label: "4.0 & up" },
  { value: 3, label: "3.0 & up" },
];

function hasAnyFilter(filters) {
  return (
    filters.inStock ||
    filters.brands.length > 0 ||
    filters.minPrice != null ||
    filters.maxPrice != null ||
    filters.minRating != null
  );
}

export default function ProductFilters({
  filters,
  onFilterChange,
  onClearAll,
  availableBrands = [],
  priceRange = { min: 0, max: 0 },
}) {
  const [localMin, setLocalMin] = useState(
    filters.minPrice != null ? String(filters.minPrice) : "",
  );
  const [localMax, setLocalMax] = useState(
    filters.maxPrice != null ? String(filters.maxPrice) : "",
  );

  function toggleBrand(brand) {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFilterChange("brands", next);
  }

  function toggleRating(value) {
    onFilterChange("minRating", filters.minRating === value ? null : value);
  }

  function applyPriceRange() {
    const currentMin = filters.minPrice != null ? String(filters.minPrice) : "";
    const currentMax = filters.maxPrice != null ? String(filters.maxPrice) : "";

    if (localMin === currentMin && localMax === currentMax) return;

    const min = localMin === "" ? null : Number(localMin);
    const max = localMax === "" ? null : Number(localMax);

    if (min !== filters.minPrice) {
      onFilterChange("minPrice", Number.isFinite(min) ? min : null);
    }
    if (max !== filters.maxPrice) {
      onFilterChange("maxPrice", Number.isFinite(max) ? max : null);
    }
  }

  function handlePriceKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      applyPriceRange();
      e.currentTarget.blur();
    }
  }

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-base font-bold tracking-tight text-foreground">
          Filters
        </h2>
        {hasAnyFilter(filters) && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="size-3" strokeWidth={2.4} />
            Clear all
          </button>
        )}
      </div>

      {/* In Stock */}
      <div className="border-b border-border pb-5">
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <span className="text-sm font-medium text-foreground">
            In Stock Only
          </span>
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange("inStock", e.target.checked)}
            className="peer sr-only"
          />
          <span
            aria-hidden="true"
            className={cn(
              "relative h-5 w-9 shrink-0 rounded-full transition-colors",
              "bg-muted peer-checked:bg-primary",
              "after:absolute after:left-0.5 after:top-0.5 after:size-4",
              "after:rounded-full after:bg-background after:shadow-sm",
              "after:transition-transform",
              "peer-checked:after:translate-x-4",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring/40",
            )}
          />
        </label>
      </div>

      {/* Brands */}
      {availableBrands.length > 0 && (
        <div className="border-b border-border py-5">
          <h3 className="mb-3 text-sm font-bold tracking-tight text-foreground">
            Brand
          </h3>
          <ul className="max-h-56 space-y-1.5 overflow-y-auto pe-1">
            {availableBrands.map((brand) => {
              const checked = filters.brands.includes(brand);
              return (
                <li key={brand}>
                  <label
                    className={cn(
                      "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors",
                      checked
                        ? "bg-primary/5 text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleBrand(brand)}
                      className="size-4 shrink-0 cursor-pointer accent-primary"
                    />
                    <span className="truncate">{brand}</span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Price Range */}
      <div className="border-b border-border py-5">
        <h3 className="mb-3 text-sm font-bold tracking-tight text-foreground">
          Price Range
        </h3>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={String(priceRange.min)}
              value={localMin}
              onChange={(e) => setLocalMin(e.target.value)}
              onKeyDown={handlePriceKeyDown}
              onBlur={applyPriceRange}
              className="h-9 w-full rounded-lg border border-border bg-background pl-6 pr-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
              aria-label="Minimum price"
            />
          </div>
          <Minus
            className="size-3 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground">
              $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              placeholder={String(priceRange.max)}
              value={localMax}
              onChange={(e) => setLocalMax(e.target.value)}
              onKeyDown={handlePriceKeyDown}
              onBlur={applyPriceRange}
              className="h-9 w-full rounded-lg border border-border bg-background pl-6 pr-2 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-ring focus:ring-2 focus:ring-ring/20"
              aria-label="Maximum price"
            />
          </div>
        </div>
      </div>

      {/* Rating — Golden Stars */}
      <div className="py-5">
        <h3 className="mb-3 text-sm font-bold tracking-tight text-foreground">
          Customer Rating
        </h3>
        <ul className="space-y-1">
          {RATING_OPTIONS.map(({ value, label }) => {
            const active = filters.minRating === value;
            return (
              <li key={value}>
                <button
                  type="button"
                  onClick={() => toggleRating(value)}
                  aria-pressed={active}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 text-sm transition-colors",
                    active
                      ? "bg-amber-50 text-foreground dark:bg-amber-500/10"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Star
                    className={cn(
                      "size-4 shrink-0 transition-colors",
                      active
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-muted-foreground",
                    )}
                    strokeWidth={2}
                  />
                  <span className={cn(active && "font-medium")}>{label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

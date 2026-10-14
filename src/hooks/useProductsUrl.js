import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
function parseNumber(str) {
  if (str == null || str === "") return null;
  const n = Number(str);
  return Number.isFinite(n) ? n : null;
}
export default function useProductsUrl() {
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || undefined;
  const q = searchParams.get("q") || undefined;
  const sort = searchParams.get("sort") || "default";
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);

  const brandsParam = searchParams.get("brand");
  const brands = brandsParam ? brandsParam.split(",").filter(Boolean) : [];

const minPrice = parseNumber(searchParams.get("minPrice"));
  const maxPrice = parseNumber(searchParams.get("maxPrice"));
  const minRating = parseNumber(searchParams.get("rating"));

  const inStock = searchParams.get("inStock") === "true";

  const filters = { inStock, brands, minPrice, maxPrice, minRating };

  const setSort = useCallback(
    (newSort) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (!newSort || newSort === "default") next.delete("sort");
        else next.set("sort", newSort);
        return next;
      });
    },
    [setSearchParams]
  );

  const setPage = useCallback(
    (newPage) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (newPage <= 1) next.delete("page");
        else next.set("page", String(newPage));
        return next;
      });
    },
    [setSearchParams]
  );

  const setFilter = useCallback(
    (key, value) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        if (key === "brands") {
          if (!value || value.length === 0) next.delete("brand");
          else next.set("brand", value.join(","));
        } else if (key === "minPrice") {
          if (value == null) next.delete("minPrice");
          else next.set("minPrice", String(value));
        } else if (key === "maxPrice") {
          if (value == null) next.delete("maxPrice");
          else next.set("maxPrice", String(value));
        } else if (key === "minRating") {
          if (value == null) next.delete("rating");
          else next.set("rating", String(value));
        } else if (key === "inStock") {
          if (!value) next.delete("inStock");
          else next.set("inStock", "true");
        }

     
        next.delete("page");
        return next;
      });
    },
    [setSearchParams]
  );

  const clearFilters = useCallback(() => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.delete("brand");
      next.delete("minPrice");
      next.delete("maxPrice");
      next.delete("rating");
      next.delete("inStock");
      next.delete("page");
      return next;
    });
  }, [setSearchParams]);

  return {
    category,
    q,
    filters,
    sort,
    page,
    setSort,
    setPage,
    setFilter,
    clearFilters,
  };
}
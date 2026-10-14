import { useMemo } from "react";

const DEFAULT_PAGE_SIZE = 12;

export default function useFilteredProducts({
  products = [],
  filters = {},
  sort = "default",
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
} = {}) {
  const {
    inStock = false,
    brands = [],
    minPrice,
    maxPrice,
    minRating,
  } = filters;

  // 1. filter { brand: "Essence", price: 9.99, rating: 4.94, stock: 5 }
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (inStock && p.stock <= 0) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (minPrice != null && p.price < minPrice) return false;
      if (maxPrice != null && p.price > maxPrice) return false;
      if (minRating != null && p.rating < minRating) return false;
      return true;
    });
  }, [products, inStock, brands, minPrice, maxPrice, minRating]);

  // 2. sort
  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case "price-asc":   return copy.sort((a, b) => a.price - b.price);
      case "price-desc":  return copy.sort((a, b) => b.price - a.price);
      case "rating-desc": return copy.sort((a, b) => b.rating - a.rating);
      case "title-asc":   return copy.sort((a, b) => a.title.localeCompare(b.title));
      default:            return copy;
    }
  }, [filtered, sort]);

  // 3. Pagination
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const paginated = sorted.slice(start, start + pageSize);

  // 4. Available brands and price range
  const availableBrands = useMemo(() => {
    const set = new Set(products.map((p) => p.brand).filter(Boolean));
    return [...set].sort();
  }, [products]);

  const priceRange = useMemo(() => {
    if (!products.length) return { min: 0, max: 0 };
    const prices = products.map((p) => p.price);
    return {
      min: Math.floor(Math.min(...prices)),
      max: Math.ceil(Math.max(...prices)),
    };
  }, [products]);

  return {
    products: paginated,
    total,
    totalPages,
    currentPage: safePage,
    availableBrands,
    priceRange,
  };
}
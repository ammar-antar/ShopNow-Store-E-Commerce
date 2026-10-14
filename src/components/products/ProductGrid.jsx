import ProductCard from "./ProductCard.jsx";
import ProductSkeleton from "./ProductSkeleton.jsx";
import ErrorState from "@/components/errors/ErrorState.jsx";

const DEFAULT_SKELETON_COUNT = 12;

export default function ProductGrid({
  products = [],
  isLoading = false,
  error = null,
  onRetry,
  skeletonCount = DEFAULT_SKELETON_COUNT,
}) {
  if (error) {
    return (
      <ErrorState
        title="Failed to load products"
        error={error}
        onRetry={onRetry}
        className="py-16"
      />
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useProducts from "@/hooks/useProducts.js";
import ProductCard from "@/components/products/ProductCard.jsx";
import ProductSkeleton from "@/components/products/ProductSkeleton.jsx";

const PER_PAGE = 4;

export default function RelatedProducts({ category, excludeId }) {
  const { products, isLoading, error } = useProducts({ category });
  const [page, setPage] = useState(0);

  const allRelated = products.filter((p) => p.id !== excludeId);

  const totalPages = Math.ceil(allRelated.length / PER_PAGE);
  const visible = allRelated.slice(page * PER_PAGE, (page + 1) * PER_PAGE);
  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  if (error || (!isLoading && allRelated.length === 0)) return null;

  return (
    <section className="mt-12 border-t border-border pt-8 lg:mt-16 lg:pt-10">
      {/* Header */}
      <header className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground lg:text-xl">
            You may also like
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            More from this category
          </p>
        </div>

        {!isLoading && totalPages > 1 && (
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPage((p) => p - 1)}
              disabled={!canPrev}
              aria-label="Previous products"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="size-4" strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!canNext}
              aria-label="Next products"
              className="grid size-9 cursor-pointer place-items-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="size-4" strokeWidth={2.2} />
            </button>
          </div>
        )}
      </header>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: PER_PAGE }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          : visible.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

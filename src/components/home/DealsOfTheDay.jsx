import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
import ProductCard from "@/components/products/ProductCard.jsx";
import DealsCountdown from "./DealsCountdown.jsx";

const MAX_DEALS = 4;

export default function DealsOfTheDay({ products }) {
  const deals = useMemo(() => {
    if (!products.length) return [];
    return [...products]
      .filter((p) => (p.discountPercentage ?? 0) > 0)
      .sort((a, b) => b.discountPercentage - a.discountPercentage)
      .slice(0, MAX_DEALS);
  }, [products]);

  if (deals.length === 0) return null;

  return (
    <section className="border-t border-border py-12 lg:py-16">

      {/* Header */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-xl bg-deal/10 text-deal">
            <Flame className="size-5" strokeWidth={2.2} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Deals of the Day
            </h2>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Biggest discounts, refreshed daily
            </p>
          </div>
        </div>

        <DealsCountdown />
      </header>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {/* View All */}
      <div className="mt-10 flex justify-center">
        <Link
          to="/products?sort=price-asc"
          className="group inline-flex h-11 items-center gap-2 rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
        >
          View All Deals
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}
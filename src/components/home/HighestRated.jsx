import { useMemo } from "react";
import ReviewCard from "./ReviewCard.jsx";
import { Star } from "lucide-react";

const MAX_CARDS = 4;
const MIN_RATING = 4.8;

export default function HighestRated({ products }) {
  const topRated = useMemo(() => {
    if (!products.length) return [];
    return [...products]
      .filter((p) => (p.rating ?? 0) >= MIN_RATING && p.reviews?.length > 0)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, MAX_CARDS);
  }, [products]);

  if (topRated.length === 0) return null;

  return (
    <section className="border-t border-border py-12">
      <header className="mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-500">
            <Star
              className="size-5 fill-amber-400 text-amber-400"
              strokeWidth={0}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Highest Rated
            </h2>
            <p className="flex items-center gap-1 text-xs text-muted-foreground sm:text-sm">
              Top picks by our community — 4.8
              <Star
                className="size-3 fill-amber-400 text-amber-400"
                strokeWidth={0}
              />
              and above
            </p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {topRated.map((p) => (
          <ReviewCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

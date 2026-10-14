import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const MAX_VISIBLE = 6;

export default function FeaturedCategories({ products, categories }) {
  const featured = useMemo(() => {
    if (!products.length || categories.length === 0) return [];

    // Group products by category slug
    const byCategory = new Map();
    for (const p of products) {
      if (!byCategory.has(p.category)) byCategory.set(p.category, []);
      byCategory.get(p.category).push(p);
    }

    return categories
      .filter((c) => c.slug !== "all")
      .map((c) => {
        const items = byCategory.get(c.slug) ?? [];
        return {
          slug: c.slug,
          name: c.name,
          count: items.length,
          image: items[0]?.thumbnail,
        };
      })
      .filter((c) => c.count > 0);
  }, [products, categories]);

  const visible = featured.slice(0, MAX_VISIBLE);
  const totalCount = featured.length;

  if (visible.length === 0) return null;

  return (
    <section className="border-t border-border py-12">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="text-utility font-semibold uppercase tracking-wider text-muted-foreground">
            Explore our catalog
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            Featured Categories
          </h2>
        </div>

        <Link
          to="/products"
          className="hidden shrink-0 items-center gap-1 text-sm font-medium text-foreground hover:underline sm:inline-flex"
        >
          View all {totalCount} categories
          <ArrowRight className="size-3.5" strokeWidth={2.2} />
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {visible.map((c) => (
          <Link
            key={c.slug}
            to={`/products?category=${c.slug}`}
            className="group flex flex-col"
          >
            <div className="aspect-square overflow-hidden rounded-xl border border-border bg-muted">
              {c.image && (
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>

            <div className="mt-3">
              <h3 className="text-sm font-semibold text-foreground group-hover:underline">
                {c.name}
              </h3>
              <p className="mt-0.5 text-utility text-muted-foreground tabular-nums">
                {c.count} {c.count === 1 ? "item" : "items"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <Link
        to="/products"
        className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground hover:underline sm:hidden"
      >
        View all {totalCount} categories
        <ArrowRight className="size-3.5" strokeWidth={2.2} />
      </Link>
    </section>
  );
}
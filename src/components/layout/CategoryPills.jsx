import { useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import useCategories from "@/hooks/useCategories.js";
import Container from "@/components/Container.jsx";
import ErrorState from "@/components/errors/ErrorState.jsx";
import { cn } from "@/lib/utils";

const SKELETON_COUNT = 6;
const MAX_VISIBLE = 10;

function pillTo(slug) {
  return `/products?category=${slug}`;
}

const navBase = cn(
  "flex items-center gap-2 overflow-x-auto scroll-smooth snap-x",
  "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
);

const pillBase = cn(
  "inline-flex h-7 shrink-0 items-center rounded-full px-3",
  "text-xs font-medium whitespace-nowrap transition-colors",
);

function PillSkeleton() {
  return (
    <span
      aria-hidden="true"
      className="h-7 w-20 shrink-0 animate-pulse rounded-full bg-muted"
    />
  );
}

export default function CategoryPills() {
  const { categories, isLoading, error, refetch } = useCategories();
  const [searchParams] = useSearchParams();
  const [showAll, setShowAll] = useState(false);
  const currentCategory = searchParams.get("category");
  const hasMore = categories.length > MAX_VISIBLE;
  const hiddenCount = categories.length - MAX_VISIBLE;

  return (
    <div className="border-b border-border bg-background">
      <Container>
        <div className="flex items-center gap-4 py-2">
          <span className="hidden shrink-0 text-utility font-semibold uppercase tracking-wider text-muted-foreground sm:inline">
            Category:
          </span>

          <div className="flex min-w-0 flex-1 items-start gap-2">
            <div className="min-w-0 flex-1">
              {isLoading && (
                <div className={navBase} aria-hidden="true">
                  {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                    <PillSkeleton key={i} />
                  ))}
                </div>
              )}

              {error && !isLoading && (
                <ErrorState
                  title="Categories unavailable"
                  error={error}
                  onRetry={refetch}
                  className="items-start py-3 text-start"
                />
              )}

              {!isLoading && !error && (
                <nav
                  id="category-pills"
                  aria-label="Product categories"
                  className={cn(
                    navBase,
                    showAll &&
                      "sm:grid sm:grid-cols-[repeat(auto-fit,minmax(120px,1fr))] sm:gap-2 sm:overflow-visible",
                  )}
                >
                  {categories.length === 0 ? (
                    <p className="py-1 text-xs text-muted-foreground">
                      No categories found
                    </p>
                  ) : (
                    categories.map(({ slug, name }, index) => {
                      const isActive = currentCategory === slug;

                      return (
                        <NavLink
                          key={slug}
                          to={pillTo(slug)}
                          onClick={() => {
                            setShowAll(false);
                        
                          }}
                          className={cn(
                            pillBase,
                            "snap-start",
                            !showAll && index >= MAX_VISIBLE && "sm:hidden",
                            showAll && "sm:w-full sm:justify-start",
                            isActive
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground hover:bg-muted/70",
                          )}
                        >
                          {name}
                        </NavLink>
                      );
                    })
                  )}
                </nav>
              )}
            </div>

            {!isLoading && !error && hasMore && (
              <button
                type="button"
                onClick={() => setShowAll((s) => !s)}
                aria-expanded={showAll}
                aria-controls="category-pills"
                className="hidden h-7 shrink-0 cursor-pointer items-center gap-1 self-start rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted sm:inline-flex"
              >
                {showAll ? "Less" : `+${hiddenCount}`}
                {showAll ? (
                  <ChevronUp className="size-3" strokeWidth={2.4} />
                ) : (
                  <ChevronDown className="size-3" strokeWidth={2.4} />
                )}
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

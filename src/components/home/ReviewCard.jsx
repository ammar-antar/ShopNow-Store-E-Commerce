import { Link } from "react-router-dom";
import { Star, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
export default function ReviewCard({ product }) {
  const {
    id,
    title,
    price,
    discountPercentage = 0,
    rating,
    thumbnail,
    reviews = [],
  } = product;

  const topReview = reviews
    .slice()
    .sort((a, b) => b.rating - a.rating)[0];

  const discounted = price * (1 - discountPercentage / 100);

  return (
    <article className="flex flex-col rounded-xl border border-border bg-card p-4">
      {/* Product header */}
      <Link to={`/products/${id}`} className="group flex gap-3">
        <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-1.5"
          />
        </div>
        <div className="min-w-0">
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:underline">
            {title}
          </h3>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-sm font-bold text-foreground">
              {formatPrice(discounted)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-utility text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Rating row */}
      <div className="mt-3 flex items-center gap-1.5">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3",
                i < Math.round(rating)
                  ? "fill-warning text-warning"
                  : "fill-muted text-muted"
              )}
              strokeWidth={0}
            />
          ))}
        </div>
        <span className="text-utility font-semibold text-foreground">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Review quote */}
      {topReview && (
        <p className="mt-3 line-clamp-3 text-xs italic leading-relaxed text-muted-foreground">
          "{topReview.comment}"
        </p>
      )}

      {/* Reviewer */}
      {topReview && (
        <div className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-utility">
          <span className="truncate font-medium text-foreground">
            {topReview.reviewerName}
          </span>
          <span className="flex shrink-0 items-center gap-1 text-success">
            <CheckCircle2 className="size-3" strokeWidth={2.5} />
            Verified Buyer
          </span>
        </div>
      )}
    </article>
  );
}
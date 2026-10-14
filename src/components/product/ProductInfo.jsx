import { Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toTitleCase } from "@/lib/format";
import { formatPrice } from "@/lib/format";
const STOCK_DOT = {
  "In Stock": "bg-success",
  "Low Stock": "bg-warning",
  "Out of Stock": "bg-deal",
};

export default function ProductInfo({ product }) {
  const {
    title,
    brand,
    category,
    rating = 0,
    reviews = [],
    price = 0,
    discountPercentage = 0,
    stock = 0,
    availabilityStatus,
    minimumOrderQuantity = 1,
  } = product;

  const hasDiscount = discountPercentage > 0;
  const discounted = price * (1 - discountPercentage / 100);
  const saved = price - discounted;
  const dotClass = STOCK_DOT[availabilityStatus] ?? "bg-muted-foreground";

  return (
    <div className="flex flex-col gap-5">

      {/* Brand + Category */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold uppercase tracking-wider">
        {brand && (
          <>
            <span className="text-muted-foreground">{brand}</span>
            <span className="text-muted-foreground/50">•</span>
          </>
        )}
        <Link
          to={`/products/category/${category}`}
          className="text-brand hover:underline"
        >
          {toTitleCase(category)}
        </Link>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
        {title}
      </h1>

      {/* Rating */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "size-4",
                  i < Math.round(rating)
                    ? "fill-warning text-warning"
                    : "fill-muted text-muted"
                )}
                strokeWidth={0}
              />
            ))}
          </div>
          <span className="font-semibold text-foreground">
            {rating.toFixed(1)}
          </span>
        </div>

        {reviews.length > 0 && (
          <>
            <span className="text-muted-foreground/50">|</span>
            <a href="#reviews" className="text-muted-foreground hover:text-foreground hover:underline">
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </a>
          </>
        )}
      </div>

      {/* Price block */}
      <div className="rounded-xl border border-border bg-muted/30 p-4">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-3xl font-bold tracking-tight text-foreground">
            {formatPrice(hasDiscount ? discounted : price)}
          </span>

          {hasDiscount && (
            <>
              <span className="text-base text-muted-foreground line-through">
                {formatPrice(price)}
              </span>
              <span className="rounded-md bg-success/15 px-2 py-0.5 text-xs font-bold text-success">
                Save {Math.round(discountPercentage)}%
              </span>
            </>
          )}
        </div>

        {hasDiscount && (
          <p className="mt-1 text-xs text-muted-foreground">
            You save {formatPrice(saved)} on this item
          </p>
        )}
      </div>

      {/* Stock */}
      <div className="flex flex-col gap-1.5 text-sm">
        <div className="flex items-center gap-2">
          <span className={cn("size-2 rounded-full", dotClass)} />
          <span className="font-semibold text-foreground">
            {availabilityStatus}
          </span>
          {stock > 0 && (
            <span className="text-muted-foreground">
              — {stock} {stock === 1 ? "unit" : "units"} left
            </span>
          )}
        </div>

        {minimumOrderQuantity > 1 && (
          <p className="text-xs text-muted-foreground">
            Minimum order: {minimumOrderQuantity} units
          </p>
        )}
      </div>

    </div>
  );
}
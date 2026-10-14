import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

function formatPrice(v) {
  return `$${v.toFixed(2)}`;
}

const STOCK_STYLES = {
  "In Stock": "text-success",
  "Low Stock": "text-warning",
  "Out of Stock": "text-deal",
};

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
  const {
    id,
    title,
    brand,
    category,
    price = 0,
    discountPercentage = 0,
    thumbnail,
    quantity = 1,
    availabilityStatus,
    stock = 0,
  } = item;

  const hasDiscount = discountPercentage > 0;
  const discounted = price * (1 - discountPercentage / 100);
  const lineTotal = discounted * quantity;

  const stockClass =
    STOCK_STYLES[availabilityStatus] ?? "text-muted-foreground";

  return (
    <article className="flex gap-3 py-4 sm:gap-4 sm:py-5">
      {/* Image */}
      <Link
        to={`/products/${id}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted sm:size-24"
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="h-full w-full object-contain p-2"
        />

        {hasDiscount && (
          <span className="absolute left-1.5 top-1.5 rounded-md bg-warning px-1.5 py-0.5 text-utility font-bold text-white">
            -{Math.round(discountPercentage)}%
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Brand + Stock */}
        <div className="flex items-center gap-2 text-utility font-medium uppercase tracking-wider">
          <span className="truncate text-muted-foreground">
            {brand || category}
          </span>
          <span className={cn("flex shrink-0 items-center gap-1", stockClass)}>
            <span
              className={cn(
                "size-1.5 rounded-full",
                stockClass.replace("text-", "bg-"),
              )}
            />
            {availabilityStatus}
          </span>
        </div>

        {/* Title */}
        <Link to={`/products/${id}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground hover:underline">
            {title}
          </h3>
        </Link>

        {/* Bottom row */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
          {/* Quantity stepper */}
          <div className="inline-flex items-center rounded-lg border border-border">
            <button
              type="button"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
              className="grid size-8 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="size-3.5" strokeWidth={2.2} />
            </button>

            <input
              type="text"
              inputMode="numeric"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (Number.isNaN(value) || value < 1) return;
                onUpdateQuantity(id, Math.min(value, stock));
              }}
              aria-label="Quantity"
              className="h-8 w-10 border-x border-border bg-transparent text-center text-sm font-medium outline-none"
            />

            <button
              type="button"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={quantity >= stock}
              aria-label="Increase quantity"
              className="grid size-8 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-3.5" strokeWidth={2.2} />
            </button>
          </div>

          {/* Price + Remove */}
          <div className="flex items-center gap-2">
            <div className="text-end">
              <div className="text-sm font-bold text-foreground">
                {formatPrice(lineTotal)}
              </div>
              {hasDiscount && (
                <div className="text-utility text-muted-foreground line-through">
                  {formatPrice(price * quantity)}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => onRemove(id)}
              aria-label="Remove item"
              className="grid size-8 cursor-pointer place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-deal/10 hover:text-deal"
            >
              <Trash2 className="size-4" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore.js";
import { toast } from "sonner";
import { useWishlistStore, useIsInWishlist } from "@/store/useWishlistStore.js";
import { formatPrice } from "@/lib/format";

const STOCK_STYLES = {
  "In Stock": "text-success",
  "Low Stock": "text-warning",
  "Out of Stock": "text-deal",
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    id,
    title,
    brand,
    category,
    price = 0,
    discountPercentage = 0,
    rating = 0,
    availabilityStatus,
    thumbnail,
    stock = 0,
  } = product;

  const hasDiscount = discountPercentage > 0;
  const discounted = price * (1 - discountPercentage / 100);
  const stockClass =
    STOCK_STYLES[availabilityStatus] ?? "text-muted-foreground";

  const quantity = useCartStore(
    (s) => s.items.find((i) => i.id === id)?.quantity ?? 0,
  );
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const wishListed = useIsInWishlist(product?.id);
  const outOfStock = stock <= 0;
  function handleToggleWishlist() {
    const wasInList = wishListed;
    toggleWishlist(product);

    if (wasInList) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist", {
        action: { label: "View", onClick: () => navigate("/wishlist") },
      });
    }
  }
  function handleAdd() {
    if (outOfStock) {
      toast.error("Out of stock");
      return;
    }
    addItem(product, 1);
    toast.success("Added to cart", {
      action: { label: "View Cart", onClick: () => navigate("/cart") },
    });
  }

  function handleDecrease() {
    if (quantity === 1) {
      removeItem(id);
      toast.info("Removed from cart", {
        action: { label: "Undo", onClick: () => addItem(product, 1) },
      });
    } else {
      updateQuantity(id, quantity - 1);
    }
  }

  function handleIncrease() {
    if (quantity >= stock) {
      toast.warning(`Max ${stock} available`);
      return;
    }
    updateQuantity(id, quantity + 1);
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <Link to={`/products/${id}`} className="block h-full w-full">
          <img
            src={thumbnail}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {hasDiscount && (
          <span className="absolute left-2 top-2 rounded-md bg-primary px-2 py-0.5 text-utility font-bold text-primary-foreground">
            -{Math.round(discountPercentage)}%
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishListed ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishListed}
          className="absolute right-2 top-2 grid size-7 cursor-pointer place-items-center rounded-full bg-background/80 backdrop-blur transition-colors hover:text-foreground"
        >
          <Heart
            className={cn(
              "size-3.5",
              wishListed ? "fill-deal text-deal" : "text-muted-foreground",
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {/* Brand */}
        <div className="truncate text-utility font-medium uppercase tracking-wider text-muted-foreground">
          {brand || category}
        </div>

        {/* Title */}
        <Link
          to={`/products/${id}`}
          className="line-clamp-2 min-h-9 text-sm font-medium leading-snug text-foreground hover:underline"
        >
          {title}
        </Link>

        {/* Rating + Stock */}
        <div className="flex items-center gap-1.5">
          <Star
            className="size-3 fill-amber-400 text-amber-400"
            strokeWidth={0}
          />
          <span className="text-xs font-medium text-foreground">
            {rating.toFixed(1)}
          </span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className={cn("truncate text-xs", stockClass)}>
            {availabilityStatus}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">
            {formatPrice(hasDiscount ? discounted : price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(price)}
            </span>
          )}
        </div>

        {/* Button */}
        {quantity === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            disabled={outOfStock}
            className="mt-auto inline-flex h-9 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag className="size-3.5" strokeWidth={2.2} />
            {outOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        ) : (
          <div className="mt-auto flex h-9 items-center justify-between rounded-lg border border-border bg-background">
            <button
              type="button"
              onClick={handleDecrease}
              aria-label={quantity === 1 ? "Remove" : "Decrease"}
              className="grid h-full w-10 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground"
            >
              {quantity === 1 ? (
                <Trash2 className="size-3.5" strokeWidth={2.2} />
              ) : (
                <Minus className="size-3.5" strokeWidth={2.2} />
              )}
            </button>

            <span className="text-sm font-semibold tabular-nums text-foreground">
              {quantity}
            </span>

            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= stock}
              aria-label="Increase"
              className="grid h-full w-10 cursor-pointer place-items-center text-muted-foreground transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="size-3.5" strokeWidth={2.2} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}

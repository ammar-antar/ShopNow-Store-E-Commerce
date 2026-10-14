import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Zap, Check } from "lucide-react";
import { useCartStore } from "@/store/useCartStore.js";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const MAX_QUANTITY = 10;

export default function AddToCart({ product }) {
  const navigate = useNavigate();

  const cartQty = useCartStore(
    (s) => s.items.find((i) => i.id === product.id)?.quantity ?? 0
  );
  const addItem = useCartStore((s) => s.addItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const [pendingQty, setPendingQty] = useState(1);
  const [added, setAdded] = useState(false);

  const maxQty = Math.min(MAX_QUANTITY, product.stock || MAX_QUANTITY);
  const outOfStock = product.stock <= 0;
  const inCart = cartQty > 0;
  const quantity = inCart ? cartQty : pendingQty;

  function handleDecrease() {
    if (inCart) {
      if (cartQty === 1) {
        removeItem(product.id);
        toast.info("Removed from cart", {
          action: { label: "Undo", onClick: () => addItem(product, 1) },
        });
      } else {
        updateQuantity(product.id, cartQty - 1);
      }
    } else {
      setPendingQty((q) => Math.max(1, q - 1));
    }
  }

  function handleIncrease() {
    if (quantity >= maxQty) {
      toast.warning(`Max ${maxQty} available`);
      return;
    }
    if (inCart) updateQuantity(product.id, cartQty + 1);
    else setPendingQty((q) => Math.min(maxQty, q + 1));
  }

  function handleAddToCart() {
    if (outOfStock) return;
    if (!inCart) addItem(product, pendingQty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);

    toast.success("Added to cart", {
      action: { label: "View Cart", onClick: () => navigate("/cart") },
    });
  }

  function handleBuyNow() {
    if (outOfStock) return;
    if (!inCart) addItem(product, pendingQty);
    navigate("/checkout");
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Quantity */}
      <div className="flex items-center justify-between rounded-lg border border-border px-4 py-2">
        <span className="text-sm font-medium text-foreground">
          Quantity{" "}
          {inCart && <span className="text-muted-foreground">(in cart)</span>}
        </span>

        <div className="inline-flex items-center">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={quantity <= 1 && !inCart}
            aria-label="Decrease quantity"
            className="grid size-8 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <Minus className="size-3.5" strokeWidth={2.4} />
          </button>

          <span className="w-10 text-center text-sm font-semibold tabular-nums text-foreground">
            {quantity}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={quantity >= maxQty}
            aria-label="Increase quantity"
            className="grid size-8 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <Plus className="size-3.5" strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={outOfStock || inCart}
          className={cn(
            "inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors",
            outOfStock && "cursor-not-allowed opacity-50",
            inCart && "cursor-default",
            added
              ? "bg-success text-white"
              : inCart
                ? "bg-success/10 text-success"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          {added ? (
            <>
              <Check className="size-4" strokeWidth={2.5} />
              Added
            </>
          ) : inCart ? (
            <>
              <Check className="size-4" strokeWidth={2.5} />
              In Cart
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" strokeWidth={2.2} />
              Add to Cart
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleBuyNow}
          disabled={outOfStock}
          className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Zap className="size-4" strokeWidth={2.2} />
          Buy Now
        </button>
      </div>

      {outOfStock && (
        <p className="text-utility text-deal">This item is out of stock.</p>
      )}

      {!outOfStock && (
        <p className="text-utility text-muted-foreground">
          Simulated transaction. No real payment charged.
        </p>
      )}
    </div>
  );
}
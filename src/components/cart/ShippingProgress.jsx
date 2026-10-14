import { Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { getSubtotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
export default function ShippingProgress({ items = [] }) {
  const subtotal = getSubtotal(items);

  const unlocked = subtotal >= FREE_SHIPPING_THRESHOLD;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div
      className={cn(
        "rounded-xl border p-4 transition-colors",
        unlocked
          ? "border-success/20 bg-success/5"
          : "border-border bg-muted/30",
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm">
          <Truck
            className={cn(
              "size-4 shrink-0",
              unlocked ? "text-success" : "text-muted-foreground",
            )}
            strokeWidth={2}
          />
          {unlocked ? (
            <span className="font-semibold text-foreground">
              You've unlocked Free Standard Shipping!
            </span>
          ) : (
            <span className="font-medium text-foreground">
              Add{" "}
              <span className="font-semibold">{formatPrice(remaining)}</span>{" "}
              more for free shipping
            </span>
          )}
        </div>

        {unlocked && (
          <span className="shrink-0 rounded-full bg-success/10 px-2.5 py-1 text-utility font-bold uppercase tracking-wider text-success">
            Threshold met
          </span>
        )}
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            unlocked ? "bg-success" : "bg-primary",
          )}
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Free shipping progress: ${Math.round(progress)}%`}
        />
      </div>

      <p className="mt-3 text-utility text-muted-foreground">
        {unlocked
          ? "Eligible for expedited 3–5 business day insured air dispatch with global tracking."
          : `Free standard shipping on orders over ${formatPrice(FREE_SHIPPING_THRESHOLD)}.`}
      </p>
    </div>
  );
}

import { Link } from "react-router-dom";
import { ShieldCheck, Lock } from "lucide-react";
import { getCartTotals } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartSummary({  items = [],
  promoCode = null,
  shippingMethod = "standard",
  showCheckoutButton = true, }) {
  const { subtotal, promoDiscount, shipping, tax, total } = getCartTotals(
    items,
    promoCode,
    shippingMethod
  );

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-base font-bold text-foreground">Order Summary</h2>
        <span className="text-utility text-muted-foreground">USD ($)</span>
      </div>

      <dl className="space-y-2 text-sm">
        <Row label="Subtotal" value={formatPrice(subtotal)} />

        {promoDiscount > 0 && (
          <Row
            label="Promo discount"
            value={`−${formatPrice(promoDiscount)}`}
            valueClass="text-success"
          />
        )}

        <Row
          label="Estimated Shipping"
          value={shipping === 0 ? "Free" : formatPrice(shipping)}
          valueClass={shipping === 0 ? "text-success font-semibold" : ""}
        />

        <Row label="Estimated Tax" value={formatPrice(tax)} />

        <div className="!mt-4 border-t border-border pt-3">
          <div className="flex items-baseline justify-between">
            <dt className="text-base font-bold text-foreground">Total</dt>
            <dd className="text-xl font-bold text-foreground">
              {formatPrice(total)}
            </dd>
          </div>
        </div>
      </dl>

           {showCheckoutButton && (
        <Link
          to="/checkout"
          className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Proceed to Checkout
          <span aria-hidden="true">→</span>
        </Link>
      )}

      <div className="mt-4 rounded-lg border border-border bg-muted/40 p-3">
        <div className="flex items-start gap-2">
          <Lock className="mt-0.5 size-3.5 shrink-0 text-muted-foreground" strokeWidth={2} />
          <p className="text-utility text-muted-foreground">
            Simulated sandbox checkout. No real monetary transactions.
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 border-t border-border pt-4">
        <ShieldCheck className="size-3.5 text-muted-foreground" strokeWidth={2} />
        <span className="text-utility font-medium uppercase tracking-wider text-muted-foreground">
          Guaranteed safe &amp; secure checkout
        </span>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass = "" }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={valueClass || "text-foreground"}>{value}</dd>
    </div>
  );
}
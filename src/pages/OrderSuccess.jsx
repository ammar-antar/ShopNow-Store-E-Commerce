import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import Container from "@/components/Container.jsx";
import { SHIPPING_METHODS } from "@/lib/constants";
import { useCartStore } from "@/store/useCartStore.js";
import { formatPrice } from "@/lib/format";
function getShippingLabel(method) {
  return (
    SHIPPING_METHODS[method]?.description ??
    SHIPPING_METHODS.standard.description
  );
}

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const clearCart = useCartStore((s) => s.clearCart);
  useEffect(() => {
    if (!state?.orderId) {
      navigate("/", { replace: true });
      return;
    }
    clearCart();
  }, [state, navigate, clearCart]);

  if (!state?.orderId) return null;

  const { orderId, total, itemCount, email, shippingMethod } = state;

  return (
    <Container className="py-12 lg:py-16">
      <div className="mx-auto max-w-lg text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-full bg-success/10">
          <CheckCircle2 className="size-8 text-success" strokeWidth={2.2} />
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Order confirmed
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Thanks for your order. A confirmation was sent to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </p>

        {/* Order card */}
        <div className="mt-8 rounded-xl border border-border bg-card p-5 text-start">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <span className="text-utility font-semibold uppercase tracking-wider text-muted-foreground">
              Order number
            </span>
            <span className="text-sm font-bold tabular-nums text-foreground">
              {orderId}
            </span>
          </div>

          <dl className="space-y-3 pt-4 text-sm">
            <Row
              label="Items"
              value={`${itemCount} ${itemCount === 1 ? "item" : "items"}`}
            />
            <Row label="Shipping" value={getShippingLabel(shippingMethod)} />
            <Row
              label="Total paid"
              value={formatPrice(total)}
              valueClass="font-bold text-foreground"
            />
          </dl>

          <div className="mt-4 flex items-start gap-2 rounded-lg border border-border bg-muted/40 p-3">
            <Package
              className="mt-0.5 size-3.5 shrink-0 text-muted-foreground"
              strokeWidth={2}
            />
            <p className="text-utility text-muted-foreground">
              This is a simulated order. No real shipment or charge occurred.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue Shopping
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </Link>
          <Link
            to="/"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-border bg-background px-6 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
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

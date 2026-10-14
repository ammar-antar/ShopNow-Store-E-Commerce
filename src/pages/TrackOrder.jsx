import { useState } from "react";
import { Link } from "react-router-dom";
import {
  PackageSearch,
  CheckCircle2,
  Package,
  Truck,
  Home,
  ArrowRight,
} from "lucide-react";
import Container from "@/components/Container.jsx";
import { getOrder } from "@/lib/order.js";
import { SHIPPING_METHODS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { formatPrice, formatDate } from "@/lib/format";

function getCurrentStep(placedAt, shippingMethod) {
  const placed = new Date(placedAt).getTime();
  const hoursElapsed = (Date.now() - placed) / (1000 * 60 * 60);
  const isExpress = shippingMethod === "express";

  const shipAfter = 24;
  const outForDeliveryAfter = isExpress ? 36 : 96;
  const deliveredAfter = isExpress ? 48 : 120;

  if (hoursElapsed < 0.5) return 0; // confirmed
  if (hoursElapsed < shipAfter) return 1; // processing
  if (hoursElapsed < outForDeliveryAfter) return 2; // shipped
  if (hoursElapsed < deliveredAfter) return 3; // out for delivery
  return 4; // delivered
}

const STEPS = [
  { key: "confirmed", label: "Order confirmed", icon: CheckCircle2 },
  { key: "processing", label: "Processing", icon: Package },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "out-for-delivery", label: "Out for delivery", icon: Truck },
  { key: "delivered", label: "Delivered", icon: Home },
];

export default function TrackOrder() {
  const saved = sessionStorage.getItem("track-last-order");

  const [input, setInput] = useState(saved ?? "");
  const [order, setOrder] = useState(() => (saved ? getOrder(saved) : null));
  const [searched, setSearched] = useState(!!saved);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    sessionStorage.setItem("track-last-order", trimmed);
    const found = getOrder(trimmed);
    setOrder(found);
    setSearched(true);
  }

  return (
    <Container className="py-8 lg:py-12">
      <header className="mb-8 border-b border-border pb-8 text-center">
        <div className="mx-auto mb-4 grid size-14 place-items-center rounded-full bg-muted">
          <PackageSearch className="size-6 text-foreground" strokeWidth={1.8} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Track your order
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
          Enter your order number to see the current status. Order numbers
          follow the format{" "}
          <span className="font-mono text-foreground">SF-XXXXXX-XXXX</span>.
        </p>
      </header>

      <div className="mx-auto max-w-2xl">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 sm:flex-row"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (searched) setSearched(false);
            }}
            placeholder="SF-483291-7421"
            aria-label="Order number"
            className="h-11 p-3 flex-1 rounded-lg border border-border bg-background px-4 text-sm font-mono uppercase tracking-wide outline-none transition-colors placeholder:text-muted-foreground placeholder:normal-case placeholder:font-sans focus:border-ring focus:ring-2 focus:ring-ring/20"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Track
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </button>
        </form>

        {/* Error — not found */}
        {searched && !order && (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-deal/30 bg-deal/5 p-4 text-center text-sm text-deal"
          >
            No order found with that number. Check the number and try again.
          </div>
        )}

        {/* Found */}
        {order && <OrderDetails order={order} />}

        {/* Help link */}
        <p className="mt-8 text-center text-utility text-muted-foreground">
          Can't find your order number?{" "}
          <Link
            to="/help"
            className="font-medium text-foreground hover:underline"
          >
            Visit the Help Center
          </Link>
        </p>
      </div>
    </Container>
  );
}

function OrderDetails({ order }) {
  const currentStep = getCurrentStep(order.placedAt, order.shippingMethod);
  const shippingLabel =
    SHIPPING_METHODS[order.shippingMethod]?.description ?? "—";

  return (
    <div className="mt-8 space-y-6">
      {/* Summary card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-4">
          <div>
            <div className="text-utility font-semibold uppercase tracking-wider text-muted-foreground">
              Order
            </div>
            <div className="mt-1 font-mono text-sm font-bold tracking-wide text-foreground">
              {order.orderId}
            </div>
          </div>
          <div className="text-end">
            <div className="text-utility font-semibold uppercase tracking-wider text-muted-foreground">
              Placed
            </div>
            <div className="mt-1 text-sm font-medium text-foreground">
              {formatDate(order.placedAt)}
            </div>
          </div>
        </div>

        <dl className="space-y-2 pt-4 text-sm">
          <Row label="Shipping" value={shippingLabel} />
          <Row
            label="Items"
            value={`${order.itemCount} ${order.itemCount === 1 ? "item" : "items"}`}
          />
          <Row
            label="Total"
            value={formatPrice(order.total)}
            valueClass="font-bold text-foreground"
          />
        </dl>
      </div>

      {/* Timeline */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-5 text-sm font-bold text-foreground">
          Shipment progress
        </h2>

        <ol className="relative space-y-5">
          {STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isCurrent = i === currentStep;
            const Icon = step.icon;

            return (
              <li key={step.key} className="relative flex items-start gap-4">
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <span
                    className={cn(
                      "absolute left-4 top-9 h-[calc(100%+0.25rem)] w-px",
                      isDone ? "bg-success" : "bg-border",
                    )}
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full border-2 transition-colors",
                    isDone && "border-success bg-success text-white",
                    isCurrent &&
                      "border-primary bg-primary text-primary-foreground",
                    !isDone &&
                      !isCurrent &&
                      "border-border bg-background text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </span>

                <div className="flex-1 pt-1">
                  <div
                    className={cn(
                      "text-sm",
                      isCurrent ? "font-bold text-foreground" : "font-medium",
                      !isDone && !isCurrent && "text-muted-foreground",
                    )}
                  >
                    {step.label}
                  </div>
                  {isCurrent && (
                    <div className="mt-0.5 text-utility text-muted-foreground">
                      Current status
                    </div>
                  )}
                </div>
              </li>
            );
          })}
        </ol>

        <p className="mt-5 border-t border-border pt-4 text-utility text-muted-foreground">
          This is a simulated timeline. No real shipment is in transit.
        </p>
      </div>

      {/* Items */}
      {order.items?.length > 0 && (
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="mb-3 text-sm font-bold text-foreground">
            Items in this order
          </h2>

          <ul className="divide-y divide-border">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="size-12 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-contain p-1"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-foreground">
                    {item.title}
                  </div>
                  <div className="text-utility text-muted-foreground">
                    Qty {item.quantity}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
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

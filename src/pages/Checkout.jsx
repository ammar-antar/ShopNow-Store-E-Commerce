import { Link, useNavigate, Navigate } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import Container from "@/components/Container.jsx";
import CheckoutForm from "@/components/checkout/CheckoutForm.jsx";
import { useCartStore } from "@/store/useCartStore.js";
import { getSubtotal, getCartTotals, getItemCount } from "@/lib/cart";
import CartSummary from "@/components/cart/CartSummary.jsx";
import { saveOrder } from "@/lib/order.js";
export default function Checkout() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);

  const form = useForm({
    mode: "onBlur",
    defaultValues: {
      shippingMethod: "standard",
    },
  });

  const shippingMethod = useWatch({
    control: form.control,
    name: "shippingMethod",
  });

  const subtotal = getSubtotal(items);
  const totals = getCartTotals(items, promoCode, shippingMethod);
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  function handlePlaceOrder(data) {
    const orderId = `SF-${Date.now().toString().slice(-6)}-${Math.floor(
      Math.random() * 9000 + 1000,
    )}`;

    const orderSummary = {
      orderId,
      total: totals.total,
      itemCount: getItemCount(items),
      email: data.email,
      shippingMethod: data.shippingMethod,
      placedAt: new Date().toISOString(),
      items: items.map((i) => ({
        id: i.id,
        title: i.title,
        thumbnail: i.thumbnail,
        quantity: i.quantity,
        price: i.price,
        discountPercentage: i.discountPercentage,
      })),
    };
    saveOrder(orderSummary);
    navigate("/order-success", {
      state: orderSummary,
      replace: true,
    });
  }

  return (
    <Container className="py-6 lg:py-10">
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <Link
            to="/cart"
            className="mb-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            Back to Cart
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Checkout
          </h1>
        </div>

        <span className="flex items-center gap-1.5 text-utility text-muted-foreground">
          <Lock className="size-3" strokeWidth={2} />
          Simulated sandbox
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px] lg:gap-10">
        <div className="space-y-8">
          <CheckoutForm
            form={form}
            onSubmit={handlePlaceOrder}
            subtotal={subtotal}
            total={totals.total}
          />
        </div>

        <div className="space-y-4 lg:sticky lg:top-12 lg:self-start">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <h2 className="text-sm font-bold text-foreground">
                {items.length} {items.length === 1 ? "item" : "items"}
              </h2>
              <Link
                to="/cart"
                className="text-utility font-medium text-brand hover:underline"
              >
                Edit
              </Link>
            </div>

            <ul className="space-y-3">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
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
          <CartSummary
            items={items}
            promoCode={promoCode}
            shippingMethod={shippingMethod}
            showCheckoutButton={false}
          />
        </div>
      </div>
    </Container>
  );
}

import { Link } from "react-router-dom";
import { ArrowLeft, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/Container.jsx";
import CartItem from "@/components/cart/CartItem.jsx";
import CartSummary from "@/components/cart/CartSummary.jsx";
import PromoCode from "@/components/cart/PromoCode.jsx";
import ShippingProgress from "@/components/cart/ShippingProgress.jsx";
import { useCartStore } from "@/store/useCartStore.js";
import { getItemCount } from "@/lib/cart.js";
export default function Cart() {
  const items = useCartStore((s) => s.items);
  const promoCode = useCartStore((s) => s.promoCode);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clearCart);
  const applyPromo = useCartStore((s) => s.applyPromo);
  const removePromo = useCartStore((s) => s.removePromo);
  const addItem = useCartStore((s) => s.addItem);

  function handleRemove(id) {
    const removed = items.find((i) => i.id === id);
    removeItem(id);

    toast.info("Removed from cart", {
      action: {
        label: "Undo",
        onClick: () => addItem(removed, removed.quantity),
      },
    });
  }

  function handleClear() {
    const backup = [...items];
    clearCart();

    toast.info("Cart cleared", {
      action: {
        label: "Undo",
        onClick: () => backup.forEach((item) => addItem(item, item.quantity)),
      },
    });
  }

  // Empty state
  if (items.length === 0) {
    return (
      <Container className="py-16 lg:py-20">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-full bg-muted">
            <ShoppingBag
              className="size-6 text-muted-foreground"
              strokeWidth={1.8}
            />
          </div>
          <h1 className="text-xl font-bold text-foreground lg:text-2xl">
            Your cart is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Add some products to get started.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse Products
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5 lg:py-8">
      {/* Header */}
      <header className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4 lg:mb-6 lg:pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground lg:text-2xl">
            Shopping Cart
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            You have{" "}
            <span className="font-medium text-foreground">
              {getItemCount(items)}
            </span>{" "}
            {getItemCount(items) === 1 ? "item" : "items"} in your cart.
          </p>
        </div>

        <button
          type="button"
          onClick={handleClear}
          className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-deal"
        >
          <Trash2 className="size-3.5" strokeWidth={2} />
          Clear Cart
        </button>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
        {/* Left: items */}
        <div className="space-y-4">
          <ShippingProgress items={items} />

          <div className="divide-y divide-border overflow-hidden rounded-xl border border-border bg-card">
            <div className="px-4 lg:px-5">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" strokeWidth={2} />
            Continue Shopping
          </Link>
        </div>

        {/* Right: summary */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <PromoCode
            promoCode={promoCode}
            onApply={applyPromo}
            onRemove={removePromo}
          />
          <CartSummary items={items} promoCode={promoCode} />
        </aside>
      </div>
    </Container>
  );
}

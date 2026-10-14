import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Mail, ShoppingBag, Truck, RotateCcw, CreditCard, User } from "lucide-react";
import Container from "@/components/Container.jsx";
import { cn } from "@/lib/utils";

const FAQ = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3–5 business days. Express shipping takes 1–2 business days. Shipping information is shown on each product page and confirmed at checkout.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes — standard shipping is free on orders over $100. Below that threshold, standard shipping is $9.99. Express shipping is $19.99 regardless of order value.",
  },
  {
    q: "How do I track my order?",
    a: "After placing an order, you'll receive an order number (format: SF-XXXXXX-XXXX). Use it on the Track Order page to see your shipment status.",
  },
  {
    q: "What is your return policy?",
    a: "Return policies are product-specific and shown on each product page. Most items come with a 30-day hassle-free return window.",
  },
  {
    q: "Do products come with a warranty?",
    a: "Warranty information is listed on every product page under Specifications. Coverage varies by product and is provided by the manufacturer.",
  },
  {
    q: "How do I apply a promo code?",
    a: "Add items to your cart, then enter the code in the Promo Code field on the Cart page and click Apply. The discount is reflected immediately in your order summary.",
  },
  {
    q: "Do you accept multiple promo codes?",
    a: "No — only one promo code can be applied per order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "This is a demo storefront built on the DummyJSON API. No real payments are processed. The payment step is simulated for demonstration purposes only.",
  },
  {
    q: "Is my payment information secure?",
    a: "No real card data is collected or stored. The checkout flow is a sandbox and does not transmit any sensitive information.",
  },
  {
    q: "Do I need an account to checkout?",
    a: "No. Guest checkout is fully supported. You can place an order without creating an account.",
  },
  {
    q: "How do I sign in?",
    a: "Use one of the demo accounts on the Sign In page (Emily, Michael, or Sophia). Custom usernames aren't supported by the DummyJSON API.",
  },
  {
    q: "Where does the product data come from?",
    a: "All product, category, and review data comes from the public DummyJSON REST API. Prices, ratings, and stock levels are sample data.",
  },
];

const QUICK_LINKS = [
  { icon: Truck,     label: "Shipping info",  to: "/help" },
  { icon: RotateCcw, label: "Returns",        to: "/help" },
  { icon: CreditCard,label: "Payment",        to: "/help" },
  { icon: ShoppingBag,label: "Your cart",     to: "/cart" },
  { icon: User,      label: "Account",        to: "/login" },
];

export default function HelpCenter() {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <Container className="py-8 lg:py-12">
      {/* Header */}
      <header className="mb-10 border-b border-border pb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Help Center
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
          Answers to common questions about orders, shipping, returns, and
          payments.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        {/* Sidebar quick links */}
        <aside>
          <h2 className="mb-3 text-utility font-semibold uppercase tracking-wider text-muted-foreground">
            Quick links
          </h2>
          <ul className="space-y-1">
            {QUICK_LINKS.map(({ icon: Icon, label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Icon className="size-4 shrink-0" strokeWidth={2} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* FAQ */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Frequently asked questions
          </h2>

          <div className="divide-y divide-border rounded-xl border border-border bg-card">
            {FAQ.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:bg-muted/40"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                      )}
                      strokeWidth={2.2}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 -mt-1">
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still need help */}
          <div className="mt-8 flex flex-col items-start gap-3 rounded-xl border border-border bg-muted/30 p-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-background">
                <Mail className="size-4 text-foreground" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  Still need help?
                </h3>
                <p className="mt-0.5 text-utility text-muted-foreground">
                  This is a demo project — no live support channel is available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
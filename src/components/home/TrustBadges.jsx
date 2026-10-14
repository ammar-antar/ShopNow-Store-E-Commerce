import { RotateCcw, ShieldCheck, Truck, Lock } from "lucide-react";

const BADGES = [
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    text: "Hassle-free returns on every product.",
  },
  {
    icon: ShieldCheck,
    title: "Warranty Included",
    text: "Coverage provided with every product.",
  },
  {
    icon: Truck,
    title: "Tracked Shipping",
    text: "Delivery window on every item.",
  },
  {
    icon: Lock,
    title: "Secure Checkout",
    text: "Sandbox simulation. No real payment.",
  },
];

export default function TrustBadges() {
  return (
    <section className="my-8">
      <div className="grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-card sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">

        {BADGES.map(({ icon: Icon, title, text }) => (
          <div
            key={title}
            className="group flex items-start gap-4 p-6 transition-colors hover:bg-muted/30 sm:border-b sm:border-border lg:border-b-0"
          >
            {/* Icon */}
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/5 text-primary transition-colors group-hover:bg-primary/10">
              <Icon className="size-5" strokeWidth={1.8} />
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h3 className="text-sm font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {text}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
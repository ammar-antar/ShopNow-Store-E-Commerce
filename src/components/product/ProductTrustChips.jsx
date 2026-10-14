import { Truck, ShieldCheck, RotateCcw } from "lucide-react";

export default function ProductTrustChips({
  shippingInformation,
  warrantyInformation,
  returnPolicy,
}) {
  const chips = [
    {
      icon: Truck,
      title: "Fast Delivery",
      text: shippingInformation,
    },
    {
      icon: ShieldCheck,
      title: "Warranty",
      text: warrantyInformation,
    },
    {
      icon: RotateCcw,
      title: "Returns",
      text: returnPolicy,
    },
  ].filter((c) => c.text);

  if (chips.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {chips.map(({ icon: Icon, title, text }) => (
        <div
          key={title}
          className="rounded-lg border border-border bg-muted/40 p-3"
        >
          <div className="mb-1.5 flex items-center gap-1.5">
            <Icon
              className="size-3.5 shrink-0 text-muted-foreground"
              strokeWidth={2}
            />
            <span className="text-utility font-semibold uppercase tracking-wider text-muted-foreground">
              {title}
            </span>
          </div>
          <p className="text-sm leading-snug text-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}
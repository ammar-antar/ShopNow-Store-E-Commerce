import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import useHeroRotation from "@/hooks/useHeroRotation.js";

const VARIANTS = {
  first: { bg: "bg-amber-100", interval: 5500 },
  second: { bg: "bg-indigo-100", interval: 6000 },
};

export default function HeroMiniCard({ variant = "first", products }) {
  const config = VARIANTS[variant] ?? "";
  const { current, visible, onMouseEnter, onMouseLeave } = useHeroRotation(
    products,
    config.interval,
  );

  if (!current) return null;

  return (
    <Link
      to={`/products/${current.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group flex items-center justify-between gap-3 overflow-hidden rounded-3xl p-3 md:col-span-1 md:row-span-1",
        config.bg,
      )}
    >
      <div className="flex h-full flex-col justify-between py-1">
        <span className="inline-flex w-fit items-center rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-900 shadow-sm">
          {current.category?.toUpperCase() ?? ""}
        </span>
        <p className="mt-3 line-clamp-3 text-sm font-semibold leading-snug text-neutral-900">
          {current.title}
        </p>
      </div>

      <img
        key={current.id}
        src={current.thumbnail}
        alt={current.title}
        className={cn(
          "h-24 flex-1  shrink-0 object-contain transition-all duration-500",
          visible ? "opacity-100 scale-100" : "opacity-0 scale-105",
        )}
      />
    </Link>
  );
}

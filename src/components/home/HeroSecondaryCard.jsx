import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import useHeroRotation from "@/hooks/useHeroRotation.js";

export default function HeroGamingCard({ products }) {
  const { current, visible, onMouseEnter, onMouseLeave } = useHeroRotation(
    products,
    5000,
  );

  if (!current) return null;

  return (
    <Link
      to={`/products/${current.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl bg-blue-50 p-5 md:col-span-1 md:row-span-3 lg:col-span-1 lg:row-span-2"
    >
      <span className="inline-flex w-fit items-center rounded-md bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-900 shadow-sm">
        {current.category?.toUpperCase() ?? ""}
      </span>

      <div className="flex items-center justify-center">
        <img
          key={current.id}
          src={current.thumbnail}
          alt={current.title}
          className={cn(
            "h-full w-auto object-contain transition-all duration-500",
            visible ? "opacity-100 scale-100" : "opacity-0 scale-105",
          )}
        />
      </div>

      <p className="line-clamp-3 text-sm font-semibold leading-snug text-neutral-900">
        {current.title}
      </p>
    </Link>
  );
}

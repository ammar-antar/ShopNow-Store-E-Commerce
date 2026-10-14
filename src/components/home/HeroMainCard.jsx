import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import useHeroRotation from "@/hooks/useHeroRotation.js";

function formatPrice(v) {
  return `$${v.toFixed(2)}`;
}

export default function HeroMainCard({ products }) {
  const { current, visible, onMouseEnter, onMouseLeave } = useHeroRotation(
    products,
    4500,
  );

  if (!current) return null;

  const hasDiscount = (current.discountPercentage ?? 0) > 0;
  const discounted =
    current.price * (1 - (current.discountPercentage ?? 0) / 100);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="md:col-span-2 md:row-span-2"
    >
      <div className="group relative flex h-full flex-col md:flex-row md:items-center md:justify-between md:gap-4">
        <Link
          to={`/products/${current.id}`}
          className="flex h-[60%] w-full items-center justify-center p-6 md:order-2 md:h-full md:w-auto md:flex-1 md:p-0 md:pr-6"
        >
          <img
            src={current.thumbnail}
            alt={current.title}
            className={cn(
              "h-full w-auto max-h-65 object-contain transition-all duration-500 ease-out md:max-h-85",
              visible ? "opacity-100 scale-100" : "opacity-0 scale-95",
            )}
          />
        </Link>

   
        <div className="flex flex-1 flex-col justify-between gap-3 px-6 pb-6 md:order-1 md:max-w-55 md:flex-none md:gap-4 md:px-0 md:pb-0">
    
          <div className="hidden md:block">
            <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              In Stock
            </div>

            <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500">
              Top Tech Picks
            </span>
          </div>

          <div>
            <Link to={`/products/${current.id}`} className="block">
              <h2 className="line-clamp-2 text-lg font-bold leading-[1.15] tracking-tight text-neutral-900 hover:underline md:text-3xl md:leading-[1.1] lg:text-4xl">
                {current.title}
              </h2>
            </Link>

            <div className="mt-2 flex items-baseline gap-1.5 md:mt-3 md:gap-2">
              <span className="text-base font-bold text-neutral-900 md:text-xl">
                {formatPrice(hasDiscount ? discounted : current.price)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-neutral-400 line-through md:text-sm">
                  {formatPrice(current.price)}
                </span>
              )}
            </div>
          </div>
          <Link
            to="/products"
            className="inline-flex h-9 w-fit items-center rounded-lg bg-blue-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-blue-700 md:h-10 md:px-4 md:text-sm"
          >
            Explore All
          </Link>
        </div>
      </div>
    </div>
  );
}

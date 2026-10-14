import { Truck, RotateCcw, PackageSearch, LifeBuoy } from "lucide-react";
import Container from "@/components/Container.jsx";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants";
import { NavLink } from "react-router-dom";
export default function UtilityBar() {
  return (
    <div className="bg-primary text-primary-foreground border-b border-white/5">
      <Container>
        <div className="flex flex-col items-center gap-1.5 py-2.5 text-utility text-center lg:h-10 lg:flex-row lg:justify-between lg:gap-6 lg:py-0 lg:text-start">
          {/* Left: shipping */}
          <div className="flex items-center gap-2 text-primary-foreground/80">
            <Truck className="size-3.5 shrink-0" strokeWidth={1.8} />
            <span className="tracking-wide">
              Free shipping on orders over{" "}
              <span className="text-primary-foreground font-semibold">
                {`$${FREE_SHIPPING_THRESHOLD.toFixed(2)}`}
              </span>
            </span>
          </div>

          {/* Right: features */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-primary-foreground/80">
            <div className="flex items-center gap-1.5">
              <RotateCcw className="size-3.5 shrink-0" strokeWidth={1.8} />
              <span>30-Day Returns</span>
            </div>

            <span
              className="hidden lg:block h-3 w-px bg-primary-foreground/20"
              aria-hidden="true"
            />
            <NavLink
              to="/track"
              className="group flex items-center gap-1.5 hover:text-primary-foreground transition-colors"
            >
              <PackageSearch className="size-3.5 shrink-0" strokeWidth={1.8} />
              <span className="relative">
                Track Order
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>

            <span
              className="hidden lg:block h-3 w-px bg-primary-foreground/20"
              aria-hidden="true"
            />

            <NavLink
              to="/help"
              className="group flex items-center gap-1.5 hover:text-primary-foreground transition-colors"
            >
              <LifeBuoy className="size-3.5 shrink-0" strokeWidth={1.8} />
              <span className="relative">
                Help Center
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-300 group-hover:w-full" />
              </span>
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}

import { Link } from "react-router-dom";
import { Store, User, ShoppingBag, Heart } from "lucide-react";
import Container from "@/components/Container.jsx";
import SearchBar from "./SearchBar.jsx";
import { useCartStore } from "@/store/useCartStore.js";
import { useWishlistStore } from "@/store/useWishlistStore.js";
import UserMenu from "./UserMenu.jsx";
import { useAuthStore } from "@/store/useAuthStore.js";
import { getItemCount } from "@/lib/cart";
export default function MainHeader() {
  const items = useCartStore((s) => s.items);
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const user = useAuthStore((s) => s.user);
const cartCount = getItemCount(items);
  return (
    <header className="border-b border-border bg-background">
      <Container>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-3 gap-y-3 py-3 lg:h-16 lg:grid-rows-1 lg:gap-x-6 lg:gap-y-0 lg:py-0">
          {/* Logo */}
          <Link
            to="/"
            aria-label="ShopNow home"
            className="group col-start-1 row-start-1 flex items-center gap-2"
          >
            <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-105">
              <Store className="size-4" strokeWidth={2.2} />
            </span>

            <span className="text-[17px] font-extrabold tracking-tight">
              Shop<span className="text-primary">Now</span>
            </span>
          </Link>

          {/* Search */}
          <div className="col-span-3 row-start-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
            <SearchBar />
          </div>

          {/* Actions */}

          <div className="col-start-3 row-start-1 flex items-center gap-1">
            {/* Sign In */}
            {user ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                aria-label="Sign in"
                className="group inline-flex size-9 items-center justify-center gap-2 rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:w-auto lg:justify-start lg:px-3"
              >
                <User
                  className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
                <span className="hidden text-sm font-medium lg:inline">
                  Sign In
                </span>
              </Link>
            )}

            {/* WishList  */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist${wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
              className="group relative inline-flex h-10 items-center gap-2 rounded-xl px-2.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:px-3"
            >
              <Heart
                className={`size-4.5 transition-all duration-300 group-hover:scale-110 group-hover:fill-deal/20 group-hover:text-deal ${wishlistCount > 0 && "fill-deal/10 text-deal"}`}
                strokeWidth={2}
              />

              <span className="hidden text-sm font-medium lg:inline">
                Wishlist
              </span>

              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid size-4.5 place-items-center rounded-full bg-deal text-[10px] font-bold text-white ring-2 ring-background">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              className="group relative inline-flex size-9 items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90 lg:w-auto lg:justify-start lg:px-3"
            >
              <ShoppingBag
                className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
              <span className="hidden text-sm font-medium lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-brand text-xs font-bold text-white ring-2 ring-background">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </Container>
    </header>
  );
}

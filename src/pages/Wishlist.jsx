import { Link } from "react-router-dom";
import { Heart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import Container from "@/components/Container.jsx";
import ProductCard from "@/components/products/ProductCard.jsx";
import { useWishlistStore } from "@/store/useWishlistStore.js";

export default function Wishlist() {
  const items = useWishlistStore((s) => s.items);
  const removeItem = useWishlistStore((s) => s.removeItem);

  function handleRemove(id) {
    removeItem(id);
    toast.success("Removed from wishlist");
  }

  if (items.length === 0) {
    return (
      <Container className="py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <div className="mb-4 grid size-14 place-items-center rounded-full bg-muted">
            <Heart className="size-6 text-muted-foreground" strokeWidth={1.8} />
          </div>
          <h1 className="text-xl font-bold text-foreground">
            Your wishlist is empty
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Save products you like to find them later.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Browse Products
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <header className="mb-6 border-b border-border pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Wishlist
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {items.length} {items.length === 1 ? "item" : "items"} saved.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <div key={p.id} className="relative">
            <button
              type="button"
              onClick={() => handleRemove(p.id)}
              aria-label={`Remove ${p.title} from wishlist`}
              className="absolute right-2 top-2 z-10 grid size-8 cursor-pointer place-items-center rounded-lg bg-background/90 text-muted-foreground shadow-sm backdrop-blur transition-all hover:bg-deal hover:text-white hover:scale-110"
            >
              <Trash2 className="size-3.5" strokeWidth={2.2} />
            </button>

            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </Container>
  );
}

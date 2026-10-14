import { useState } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useWishlistStore, useIsInWishlist } from "@/store/useWishlistStore.js";
import { toast } from "sonner";
export default function ProductGallery({
  product,
  thumbnail,
  images = [],
  title,
  discountPercentage = 0,
}) {
  const allImages = Array.from(new Set([thumbnail, ...images].filter(Boolean)));
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] ?? thumbnail;

  const hasDiscount = discountPercentage > 0;
  const hasMultiple = allImages.length > 1;
  const navigate = useNavigate();
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const wishListed = useIsInWishlist(product?.id);
  function handleToggleWishlist() {
    if (!product) return;
    const wasInList = wishListed;
    toggleWishlist(product);

    if (wasInList) {
      toast.success("Removed from wishlist");
    } else {
      toast.success("Added to wishlist", {
        action: { label: "View", onClick: () => navigate("/wishlist") },
      });
    }
  }
  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
        <img
          src={activeImage}
          alt={title}
          className="h-full w-full object-contain p-6"
        />

        {hasDiscount && (
          <span className="absolute left-4 top-4 rounded-lg bg-warning px-2.5 py-1 text-utility font-bold text-white">
            -{Math.round(discountPercentage)}% OFF
          </span>
        )}

               <button
          type="button"
          onClick={handleToggleWishlist}
          aria-label={wishListed ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishListed}
          className="absolute right-4 top-4 grid size-9 cursor-pointer place-items-center rounded-full border border-border bg-background/90 backdrop-blur transition-colors hover:text-foreground"
        >
          <Heart
            className={cn(
              "size-4",
              wishListed ? "fill-deal text-deal" : "text-muted-foreground"
            )}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Thumbnails */}
      {hasMultiple && (
        <div className="grid grid-cols-4 gap-3">
          {allImages.slice(0, 4).map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View image ${i + 1}`}
              aria-current={i === activeIndex}
              className={cn(
                "aspect-square cursor-pointer overflow-hidden rounded-lg border-2 bg-muted transition-colors",
                i === activeIndex
                  ? "border-primary"
                  : "border-transparent hover:border-border",
              )}
            >
              <img
                src={img}
                alt=""
                className="h-full w-full object-contain p-2"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

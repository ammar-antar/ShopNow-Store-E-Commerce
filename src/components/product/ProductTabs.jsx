import { useSearchParams } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "reviews", label: "Reviews" },
];
const VALID_TABS = TABS.map((t) => t.id);
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

// ─── Description ───
function DescriptionTab({ product }) {
  const { description, tags = [] } = product;

  return (
    <div className="max-w-3xl space-y-4">
      <p className="text-sm leading-relaxed text-foreground">{description}</p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-3 py-1 text-utility font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Specs ───
function SpecsTab({ product }) {
  const {
    sku,
    weight,
    dimensions,
    brand,
    category,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    minimumOrderQuantity,
  } = product;

  const dims = dimensions
    ? `${dimensions.width} × ${dimensions.height} × ${dimensions.depth} cm`
    : "—";

  const rows = [
    { label: "SKU", value: sku },
    { label: "Brand", value: brand },
    { label: "Category", value: category },
    { label: "Weight", value: weight ? `${weight} kg` : null },
    { label: "Dimensions (W×H×D)", value: dims },
    { label: "Warranty", value: warrantyInformation },
    { label: "Shipping", value: shippingInformation },
    { label: "Return Policy", value: returnPolicy },
    { label: "Minimum Order Qty", value: minimumOrderQuantity },
  ].filter((r) => r.value != null && r.value !== "" && r.value !== "—");

  return (
    <div className="max-w-2xl overflow-hidden rounded-lg border border-border">
      <dl className="divide-y divide-border">
        {rows.map((r) => (
          <div
            key={r.label}
           className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3 text-sm sm:grid-cols-[160px_1fr]"
          >
            <dt className="font-medium text-muted-foreground">{r.label}</dt>
            <dd className="text-foreground">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// ─── Reviews ───
function ReviewStars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-3.5",
            i < rating ? "fill-warning text-warning" : "fill-muted text-muted",
          )}
          strokeWidth={0}
        />
      ))}
    </div>
  );
}

function ReviewsTab({ reviews = [] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No reviews yet for this product.
      </p>
    );
  }

  return (
    <ul className="max-w-3xl divide-y divide-border">
      {reviews.map((review, i) => (
        <li key={i} className="py-5 first:pt-0 last:pb-0">
          <div className="flex flex-wrap items-center gap-3">
            <ReviewStars rating={review.rating} />
            <span className="text-sm font-semibold text-foreground">
              {review.reviewerName}
            </span>
            <span className="text-utility text-muted-foreground">
              {formatDate(review.date)}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-foreground">
            {review.comment}
          </p>
        </li>
      ))}
    </ul>
  );
}

// ─── Main ───
export default function ProductTabs({ product }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const active = VALID_TABS.includes(tabParam) ? tabParam : "description";

  function setActive(nextTab) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (nextTab === "description") next.delete("tab");
        else next.set("tab", nextTab);
        return next;
      },
      { replace: true },
    );
  }
  const reviewCount = product.reviews?.length ?? 0;
  const labels = {
    description: "Description",
    specs: "Specifications",
    reviews: reviewCount > 0 ? `Reviews (${reviewCount})` : "Reviews",
  };

  return (
    <section id="reviews" className="mt-10 scroll-mt-24">
      {/* Tabs header */}
      <div
        role="tablist"
        className="flex gap-6 border-b border-border overflow-x-auto"
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={cn(
                "relative shrink-0 cursor-pointer pb-3 text-sm font-medium transition-colors",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {labels[tab.id]}
              {isActive && (
                <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-foreground" />
              )}
            </button>
          );
        })}
      </div>

      {/* Tabs content */}
      <div role="tabpanel" id={`panel-${active}`} className="pt-6">
        {active === "description" && <DescriptionTab product={product} />}
        {active === "specs" && <SpecsTab product={product} />}
        {active === "reviews" && <ReviewsTab reviews={product.reviews} />}
      </div>
    </section>
  );
}

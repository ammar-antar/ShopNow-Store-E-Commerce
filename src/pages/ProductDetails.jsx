import { useParams, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import Container from "@/components/Container.jsx";
import ErrorState from "@/components/errors/ErrorState.jsx";
import ProductGallery from "@/components/product/ProductGallery.jsx";
import ProductInfo from "@/components/product/ProductInfo.jsx";
import ProductTrustChips from "@/components/product/ProductTrustChips.jsx";
import AddToCart from "@/components/product/AddToCart.jsx";
import ProductTabs from "@/components/product/ProductTabs.jsx";
import useProduct from "@/hooks/useProduct.js";
import RelatedProducts from "@/components/product/RelatedProducts.jsx";
import { toTitleCase } from "@/lib/format";

function Breadcrumb({ product }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="hidden mb-6 sm:flex flex-wrap items-center gap-1.5 text-utility text-muted-foreground"
    >
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      <ChevronRight className="size-3" strokeWidth={2} />
      <Link to="/products" className="hover:text-foreground">
        Products
      </Link>
      <ChevronRight className="size-3" strokeWidth={2} />
      <Link
        to={`/products/category/${product.category}`}
        className="hover:text-foreground"
      >
        {toTitleCase(product.category)}
      </Link>
      <ChevronRight className="size-3" strokeWidth={2} />
      <span
        className="truncate font-medium text-foreground"
        aria-current="page"
      >
        {product.title}
      </span>
    </nav>
  );
}

function DetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-3 w-32 rounded bg-muted animate-pulse" />
        <div className="h-8 w-3/4 rounded bg-muted animate-pulse" />
        <div className="h-4 w-40 rounded bg-muted animate-pulse" />
        <div className="h-20 w-full rounded-xl bg-muted animate-pulse" />
        <div className="h-4 w-52 rounded bg-muted animate-pulse" />
        <div className="h-24 w-full rounded-lg bg-muted animate-pulse" />
        <div className="h-12 w-full rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const { product, isLoading, error, refetch } = useProduct(id);
  return (
    <Container className="py-8">
      {error && (
        <ErrorState
          title="Failed to load product"
          error={error}
          onRetry={refetch}
          className="py-24"
        />
      )}

      {isLoading && !error && <DetailsSkeleton />}

      {!isLoading && !error && product && (
        <>
          <Breadcrumb product={product} />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left: Gallery */}
            <ProductGallery
              product={product}
              thumbnail={product.thumbnail}
              images={product.images}
              title={product.title}
              discountPercentage={product.discountPercentage}
            />

            {/* Right: Info + Trust + AddToCart */}
            <div className="flex flex-col gap-6">
              <ProductInfo product={product} />

              <ProductTrustChips
                shippingInformation={product.shippingInformation}
                warrantyInformation={product.warrantyInformation}
                returnPolicy={product.returnPolicy}
              />

              <div className="rounded-xl border border-border bg-card p-4">
                <AddToCart product={product} />
              </div>
            </div>
          </div>

          <ProductTabs product={product} />
          <RelatedProducts category={product.category} excludeId={product.id} />
        </>
      )}
    </Container>
  );
}

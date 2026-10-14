import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import Container from "@/components/Container.jsx";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80vh] items-center justify-center py-12">
      <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
        {/* 404 */}
        <span className="text-[140px] font-black leading-none tracking-tighter text-muted sm:text-[200px] lg:text-[260px]">
          404
        </span>

        {/* Heading */}
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          The page you're looking for doesn't exist, has been moved, or you
          might have mistyped the URL.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            <Home className="size-4" strokeWidth={2.2} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:bg-muted sm:w-auto"
          >
            <Search className="size-4" strokeWidth={2.2} />
            Browse Products
          </Link>
        </div>
      </div>
    </Container>
  );
}
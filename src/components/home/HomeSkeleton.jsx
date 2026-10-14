export default function HomeSkeleton() {
  return (
    <div className="animate-in fade-in duration-300">

      {/* Hero skeleton — bento */}
      <div className="grid grid-cols-1 gap-4 md:h-105 md:grid-cols-4 md:grid-rows-2">
        <div className="animate-pulse rounded-3xl bg-muted md:col-span-2 md:row-span-2" />
        <div className="animate-pulse rounded-3xl bg-muted md:col-span-1 md:row-span-2" />
        <div className="animate-pulse rounded-3xl bg-muted" />
        <div className="animate-pulse rounded-3xl bg-muted" />
      </div>

      {/* Trust badges */}
      <div className="my-16 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>

      {/* Featured categories */}
      <div className="mb-16">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </div>

      {/* Deals grid */}
      <div className="mb-16">
        <div className="mb-6 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>

      {/* Highest rated grid */}
      <div>
        <div className="mb-6 h-8 w-56 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductSkeleton() {
  return (
    <div className="space-y-3">
      <div className="aspect-square animate-pulse rounded-xl bg-muted" />
      <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
      <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
      <div className="h-9 w-full animate-pulse rounded-lg bg-muted" />
    </div>
  );
}
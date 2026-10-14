export default function ProductSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden="true">
      {/* Image placeholder */}
      <div className="aspect-square rounded-lg bg-muted animate-pulse" />

      {/* Text placeholders */}
      <div className="mt-3 flex flex-col gap-1">
        <div className="h-3 w-16 rounded bg-muted animate-pulse" />
        <div className="h-4 w-full rounded bg-muted animate-pulse" />
        <div className="h-4 w-2/3 rounded bg-muted animate-pulse" />

        <div className="mt-1 flex items-center gap-1.5">
          <div className="h-3 w-3 rounded bg-muted animate-pulse" />
          <div className="h-3 w-8 rounded bg-muted animate-pulse" />
          <div className="h-3 w-16 rounded bg-muted animate-pulse" />
        </div>

        <div className="mt-2 h-5 w-20 rounded bg-muted animate-pulse" />

        <div className="mt-2 h-9 w-full rounded-lg bg-muted animate-pulse" />
      </div>
    </div>
  );
}

import { ArrowUpDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_OPTIONS = [
  { value: "default", label: "Featured" },
  { value: "price-asc", label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "rating-desc", label: "Top Rated" },
  { value: "title-asc", label: "Title: A → Z" },
];

export default function ProductSortBar({
  sort,
  onSortChange,
  total,
  isLoading,
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-2">
        <span className="hidden shrink-0 text-sm text-muted-foreground sm:inline">
          Sort by:
        </span>

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger
            aria-label="Sort products"
            className="h-9 w-full min-w-0 cursor-pointer gap-2 rounded-lg border border-border bg-background px-3 text-sm font-medium shadow-sm transition-colors hover:border-foreground/20 hover:bg-muted/50 focus:border-ring focus:ring-2 focus:ring-ring/20 focus:ring-offset-0 sm:w-auto sm:min-w-50"
          >
            <ArrowUpDown className="size-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />
            <SelectValue />
          </SelectTrigger>

          <SelectContent
            position="popper"
            side="bottom"
            sideOffset={6}
            align="start"
            avoidCollisions={false}
            className="z-50 min-w-(--radix-select-trigger-width) border border-border bg-background text-foreground shadow-lg"
          >
            {SORT_OPTIONS.map(({ value, label }) => (
              <SelectItem
                key={value}
                value={value}
                className="cursor-pointer text-sm"
              >
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {!isLoading && (
        <span className="shrink-0 text-xs text-muted-foreground tabular-nums sm:text-sm">
          {total} {total === 1 ? "result" : "results"}
        </span>
      )}
    </div>
  );
}
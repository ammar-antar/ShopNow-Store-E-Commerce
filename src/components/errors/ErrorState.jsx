import { AlertCircle, RefreshCw } from "lucide-react";
import { getErrorMessage } from "@/lib/getErrorMessage.js";
import { cn } from "@/lib/utils";

export default function ErrorState({
  title = "Something went wrong",
  error,
  onRetry,
  className,
}) {
  const message = getErrorMessage(error);

  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-6 text-center",
        className
      )}
    >
      <AlertCircle className="size-5 text-muted-foreground" strokeWidth={1.8} />
      <p className="text-sm font-medium text-foreground">{title}</p>
      {message && (
        <p className="max-w-xs text-xs text-muted-foreground">{message}</p>
      )}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-medium transition-colors hover:bg-muted"
        >
          <RefreshCw className="size-3" strokeWidth={2.2} />
          Try again
        </button>
      )}
    </div>
  );
}
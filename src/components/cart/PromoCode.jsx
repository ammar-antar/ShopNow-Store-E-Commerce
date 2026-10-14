import { useState } from "react";
import { Check, X } from "lucide-react";
import { toast } from "sonner";
import { PROMO_CODES } from "@/lib/constants.js";

export default function PromoCode({ promoCode, onApply, onRemove }) {
  const [input, setInput] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = input.trim().toUpperCase();
    if (!trimmed) return;

    const success = onApply(trimmed);

    if (success) {
      setInput("");
      toast.success("Promo code applied", {
        description: `${PROMO_CODES[trimmed] * 100}% discount`,
      });
    } else {
      toast.error("Invalid promo code", {
        description: "Try DUMMY15",
      });
    }
  }

  function handleRemove() {
    setInput("");
    onRemove();
    toast.info("Promo code removed");
  }

  // Applied state
  if (promoCode) {
    return (
      <div className="rounded-lg border border-success/30 bg-success/5 p-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm">
            <Check className="size-4 shrink-0 text-success" strokeWidth={2.5} />
            <span className="font-medium text-foreground">
              <span className="font-bold">{promoCode}</span>{" "}
              <span className="text-muted-foreground">
                ({PROMO_CODES[promoCode] * 100}% off)
              </span>
            </span>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label="Remove promo code"
            className="grid size-6 shrink-0 cursor-pointer place-items-center rounded text-muted-foreground transition-colors hover:bg-success/10 hover:text-foreground"
          >
            <X className="size-3.5" strokeWidth={2.2} />
          </button>
        </div>
      </div>
    );
  }

  // Input state
  return (
    <div>
      <label
        htmlFor="promo-input"
        className="mb-2 block text-sm font-medium text-foreground"
      >
        Have a promotion code?
      </label>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          id="promo-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter code"
          className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm uppercase outline-none transition-colors focus:border-ring focus:ring-2 focus:ring-ring/20"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="h-10 shrink-0 cursor-pointer rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Apply
        </button>
      </form>
    </div>
  );
}

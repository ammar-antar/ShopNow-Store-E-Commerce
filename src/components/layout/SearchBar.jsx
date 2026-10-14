import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const isMac =
    typeof navigator !== "undefined" &&
    /Mac|iPhone|iPad/.test(navigator.platform);

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      inputRef.current?.focus();
      return;
    }
    navigate(`/products?q=${encodeURIComponent(trimmed)}`);
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  // Keyboard shortcut: Ctrl/Cmd + K
  useEffect(() => {
    function handleKey(e) {
      const isShortcut =
        (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";

      if (!isShortcut) return;

      e.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Escape: blur + clear (uses functional setState to avoid query dependency)
  useEffect(() => {
    function handleKey(e) {
      if (e.key !== "Escape") return;
      if (document.activeElement !== inputRef.current) return;

      inputRef.current?.blur();
      setQuery((q) => (q ? "" : q));
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Click outside: close focus state
  useEffect(() => {
    function handleClickOutside(e) {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showClear = query.length > 0;
  const showKbd = !query && !isFocused;

  return (
    <form
      ref={formRef}
      role="search"
      onSubmit={handleSubmit}
      className={cn(
        "group relative flex h-10 items-center rounded-xl border bg-background transition-all duration-200",
        isFocused
          ? "border-primary/40 ring-4 ring-primary/10 shadow-sm"
          : "border-border hover:border-border/80 hover:bg-muted/30"
      )}
    >
      <Search
        className={cn(
          "pointer-events-none absolute left-3 size-4 transition-colors duration-200",
          isFocused ? "text-primary" : "text-muted-foreground"
        )}
        strokeWidth={2}
      />

      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        placeholder="Search products, brands, categories…"
        aria-label="Search products"
        autoComplete="off"
        spellCheck={false}
        className="h-full w-full bg-transparent pl-9 pr-16 text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
      />

      <div className="absolute right-2 flex items-center gap-1">
        {showClear && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear search"
            className="grid size-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-3.5" strokeWidth={2.4} />
          </button>
        )}

        {showKbd && (
          <kbd className="hidden select-none items-center gap-0.5 rounded-md border border-border bg-muted/60 px-1.5 py-0.5 text-xs font-semibold text-muted-foreground lg:inline-flex">
            <span className="text-sm leading-none">
              {isMac ? "⌘" : "Ctrl"}
            </span>
            <span className="leading-none">K</span>
          </kbd>
        )}
      </div>
    </form>
  );
}
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore.js";

export default function UserMenu() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!user) return null;

  function handleSignOut() {
    signOut();
    setOpen(false);
    navigate("/");
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Account menu"
        className="inline-flex items-center gap-2 h-10 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
      >
        <img
          src={user.image}
          alt=""
          width={28}
          height={28}
          className="size-7 rounded-full border border-border object-cover bg-muted"
        />
        <span className="hidden lg:inline text-sm font-medium text-foreground">
          {user.firstName}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 w-60 rounded-xl border border-border bg-card shadow-lg p-1.5 z-50"
        >
          <div className="px-3 py-2.5 border-b border-border mb-1">
            <div className="flex items-center gap-2.5">
              <img
                src={user.image}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full border border-border object-cover bg-muted"
              />
              <div className="min-w-0">
                <div className="text-sm font-semibold text-foreground truncate">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-utility text-muted-foreground truncate">
                  {user.email}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            role="menuitem"
            className="w-full cursor-pointer inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted transition-colors"
          >
            <LogOut className="size-4" strokeWidth={2} />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
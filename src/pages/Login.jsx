import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Eye, EyeOff, LogIn } from "lucide-react";
import Container from "@/components/Container.jsx";
import client from "@/api/client.js";
import { useAuthStore } from "@/store/useAuthStore.js";
import { getErrorMessage } from "@/lib/getErrorMessage.js";
import { cn } from "@/lib/utils";
import { logger } from "@/lib/logger";
const QUICK_ACCOUNTS = [
  { username: "emilys", password: "emilyspass", label: "Emily" },
  { username: "michaelw", password: "michaelwpass", label: "Michael" },
  { username: "sophiab", password: "sophiabpass", label: "Sophia" },
];

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((s) => s.user);
  const setSession = useAuthStore((s) => s.setSession);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { username: "", password: "" },
  });

  const redirectTo = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  async function onSubmit(data) {
    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await client.post("/auth/login", {
        username: data.username.trim(),
        password: data.password,
        expiresInMins: 60,
      });

      setSession(res.data);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err);
      logger.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleQuickLogin(account) {
    setValue("username", account.username, { shouldValidate: true });
    setValue("password", account.password, { shouldValidate: true });
    handleSubmit(onSubmit)();
  }

  return (
    <div className="min-h-screen bg-background">
      <Container className="flex min-h-screen flex-col py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2} />
            Back to Home
          </Link>
        </div>

        {/* Centered form */}
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Sign in to ShopNow
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Use a demo account to explore the app.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-4 rounded-xl border border-border bg-card p-6"
            >
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  placeholder="emilys"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  aria-invalid={!!errors.username}
                  className={cn(
                    "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground",
                    errors.username
                      ? "border-deal focus:border-deal focus:ring-2 focus:ring-deal/20"
                      : "border-border focus:border-ring focus:ring-2 focus:ring-ring/20",
                  )}
                />
                {errors.username && (
                  <p className="mt-1 text-utility text-deal" role="alert">
                    {errors.username.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    aria-invalid={!!errors.password}
                    className={cn(
                      "h-10 w-full rounded-lg border bg-background px-3 pr-10 text-sm outline-none transition-colors placeholder:text-muted-foreground",
                      errors.password
                        ? "border-deal focus:border-deal focus:ring-2 focus:ring-deal/20"
                        : "border-border focus:border-ring focus:ring-2 focus:ring-ring/20",
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-1.5 top-1/2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" strokeWidth={2} />
                    ) : (
                      <Eye className="size-4" strokeWidth={2} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-utility text-deal" role="alert">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div
                  role="alert"
                  className="space-y-1.5 rounded-lg border border-deal/30 bg-deal/5 p-3"
                >
                  <p className="text-sm font-medium text-deal">
                    {getErrorMessage(serverError)}
                  </p>
                  <p className="text-utility text-muted-foreground">
                    Use one of the demo accounts above to sign in. Custom
                    usernames aren't supported by DummyJSON.
                  </p>
                </div>
              )}
              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? (
                  "Signing in…"
                ) : (
                  <>
                    <LogIn className="size-4" strokeWidth={2.2} />
                    Sign In
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-card px-3 text-utility uppercase tracking-wider text-muted-foreground">
                    Or try a demo account
                  </span>
                </div>
              </div>

              {/* Quick login */}
              <div className="grid grid-cols-3 gap-2">
                {QUICK_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.username}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    disabled={isSubmitting}
                    className="inline-flex h-10 cursor-pointer items-center justify-center rounded-lg border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {acc.label}
                  </button>
                ))}
              </div>
            </form>

            <p className="mt-6 text-center text-utility text-muted-foreground">
              Use one of the demo accounts above to sign in. Custom usernames
              aren't supported by DummyJSON.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}

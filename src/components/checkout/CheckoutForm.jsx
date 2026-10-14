import { CreditCard, Truck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SHIPPING_METHODS } from "@/lib/constants";
import { getShipping } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{7,}$/;
const CARD_PATTERN = /^\d{16}$/;
const EXPIRY_PATTERN = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CVV_PATTERN = /^\d{3,4}$/;



export default function CheckoutForm({ form, onSubmit, subtotal, total }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {/* Contact */}
      <fieldset className="rounded-xl border border-border bg-card p-5">
        <legend className="px-2 text-sm font-bold text-foreground">
          Contact
        </legend>

        <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <InputField
            label="Email"
            name="email"
            type="email"
            placeholder="you@example.com"
            register={register}
            rules={{
              required: "Email is required",
              pattern: { value: EMAIL_PATTERN, message: "Enter a valid email" },
            }}
            error={errors.email?.message}
          />
          <InputField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="+1 555 123 4567"
            register={register}
            rules={{
              required: "Phone is required",
              pattern: { value: PHONE_PATTERN, message: "Enter a valid phone" },
            }}
            error={errors.phone?.message}
          />
        </div>
      </fieldset>

      {/* Shipping Address */}
      <fieldset className="rounded-xl border border-border bg-card p-5">
        <legend className="px-2 text-sm font-bold text-foreground">
          Shipping Address
        </legend>

        <div className="mt-2 space-y-4">
          <InputField
            label="Full Name"
            name="fullName"
            placeholder="Jane Doe"
            register={register}
            rules={{ required: "Full name is required" }}
            error={errors.fullName?.message}
          />
          <InputField
            label="Address"
            name="address"
            placeholder="123 Main Street, Apt 4B"
            register={register}
            rules={{ required: "Address is required" }}
            error={errors.address?.message}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InputField
              label="City"
              name="city"
              placeholder="Cairo"
              register={register}
              rules={{ required: "City is required" }}
              error={errors.city?.message}
            />
            <InputField
              label="Postal Code"
              name="postalCode"
              placeholder="11511"
              register={register}
              rules={{
                required: "Postal code is required",
                minLength: { value: 3, message: "Too short" },
              }}
              error={errors.postalCode?.message}
            />
          </div>
          <InputField
            label="Country"
            name="country"
            placeholder="Egypt"
            register={register}
            rules={{ required: "Country is required" }}
            error={errors.country?.message}
          />
        </div>
      </fieldset>

      {/* Shipping Method */}
      <fieldset className="rounded-xl border border-border bg-card p-5">
        <legend className="px-2 text-sm font-bold text-foreground">
          Shipping Method
        </legend>

        <div className="mt-2 space-y-2">
          {Object.values(SHIPPING_METHODS).map((m) => {
            const cost = getShipping(subtotal, m.id);
            return (
              <label
                key={m.id}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-lg border p-3 transition-colors",
                  "has-[:checked]:border-primary has-[:checked]:bg-muted/40",
                  "border-border hover:bg-muted/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    value={m.id}
                    {...register("shippingMethod")}
                    className="size-4 cursor-pointer accent-primary"
                  />
                  <div className="flex items-center gap-2">
                    {m.id === "express" ? (
                      <Zap
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    ) : (
                      <Truck
                        className="size-4 text-muted-foreground"
                        strokeWidth={2}
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {m.label}
                      </div>
                      <div className="text-utility text-muted-foreground">
                        {m.description}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {cost === 0 ? "Free" : formatPrice(cost)}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Payment */}
      <fieldset className="rounded-xl border border-border bg-card p-5">
        <legend className="flex items-center gap-2 px-2 text-sm font-bold text-foreground">
          <CreditCard className="size-3.5" strokeWidth={2} />
          Payment
        </legend>

        <div className="mt-2 space-y-4">
          <InputField
            label="Card Number"
            name="cardNumber"
            placeholder="4242 4242 4242 4242"
            inputMode="numeric"
            maxLength={16}
            register={register}
            rules={{
              required: "Card number is required",
              pattern: { value: CARD_PATTERN, message: "Enter 16 digits" },
            }}
            error={errors.cardNumber?.message}
          />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Expiry (MM/YY)"
              name="expiry"
              placeholder="12/28"
              inputMode="numeric"
              register={register}
              rules={{
                required: "Expiry is required",
                pattern: { value: EXPIRY_PATTERN, message: "Format MM/YY" },
              }}
              error={errors.expiry?.message}
            />
            <InputField
              label="CVV"
              name="cvv"
              placeholder="123"
              inputMode="numeric"
              register={register}
              rules={{
                required: "CVV is required",
                pattern: { value: CVV_PATTERN, message: "3 or 4 digits" },
              }}
              error={errors.cvv?.message}
            />
          </div>
          <InputField
            label="Name on Card"
            name="cardName"
            placeholder="Jane Doe"
            register={register}
            rules={{ required: "Name on card is required" }}
            error={errors.cardName?.message}
          />
        </div>

        <p className="mt-3 text-utility text-muted-foreground">
          No real card is charged. This is a simulated sandbox.
        </p>
      </fieldset>

      {/* Submit */}
      <button
        type="submit"
        className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Place Order — {formatPrice(total)}
      </button>
    </form>
  );
}

function InputField({
  label,
  name,
  type = "text",
  placeholder,
  inputMode,
  maxLength,
  register,
  rules,
  error,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
          maxLength={maxLength} 
        {...register(name, rules)}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "h-10 w-full rounded-lg border bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground",
          error
            ? "border-deal focus:border-deal focus:ring-2 focus:ring-deal/20"
            : "border-border focus:border-ring focus:ring-2 focus:ring-ring/20",
        )}
      />
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1 text-utility text-deal"
        >
          {error}
        </p>
      )}
    </div>
  );
}

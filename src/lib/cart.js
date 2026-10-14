import {
  FREE_SHIPPING_THRESHOLD,
  SHIPPING_COST,
  EXPRESS_SHIPPING_COST,
  TAX_RATE,
  PROMO_CODES,
} from "./constants";

export function getSubtotal(items = []) {
  return items.reduce((sum, item) => {
    const discounted = item.price * (1 - (item.discountPercentage ?? 0) / 100);
    return sum + discounted * item.quantity;
  }, 0);
}

export function getItemCount(items = []) {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getPromoRate(promoCode) {
  if (!promoCode) return 0;
  return PROMO_CODES[promoCode] ?? 0;
}

export function getPromoDiscount(subtotal, promoCode) {
  return subtotal * getPromoRate(promoCode);
}

export function getShipping(subtotal, method = "standard") {
  if (method === "express") return EXPRESS_SHIPPING_COST;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

export function getTax(subtotal, promoDiscount) {
  return (subtotal - promoDiscount) * TAX_RATE;
}

export function getCartTotals(items = [], promoCode = null, shippingMethod = "standard") {
  const subtotal = getSubtotal(items);
  const promoDiscount = getPromoDiscount(subtotal, promoCode);
  const shipping = getShipping(subtotal, shippingMethod);
  const tax = getTax(subtotal, promoDiscount);
  const total = subtotal - promoDiscount + shipping + tax;

  return {
    subtotal,
    promoDiscount,
    shipping,
    tax,
    total,
  };
}


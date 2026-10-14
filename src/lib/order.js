const STORAGE_KEY = "shop-now-orders";

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOrder(order) {
  const all = readAll();
  all[order.orderId] = order;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getOrder(orderId) {
  if (!orderId) return null;
  const all = readAll();
  return all[orderId.trim().toUpperCase()] ?? null;
}
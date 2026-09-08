const eur = new Intl.NumberFormat("el-GR", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
const eurInt = new Intl.NumberFormat("el-GR", { maximumFractionDigits: 0 });

/** 449 → "449 €" (design: whole euros in cards) */
export function priceShort(v: number) {
  return Number.isInteger(v) ? `${eurInt.format(v)} €` : eur.format(v).replace(" ", " ");
}
/** 449 → "449,00 €" */
export function priceLong(v: number) {
  return eur.format(v).replace(" ", " ");
}
export function discountPct(price: number, was?: number) {
  if (!was || was <= price) return null;
  return Math.round(((was - price) / was) * 100);
}
/** Instalment without card: n equal monthly payments, rounded to cents. */
export function instalment(price: number, months = 12) {
  return Math.round((price / months) * 100) / 100;
}
export function weekday(d: Date) {
  return new Intl.DateTimeFormat("el-GR", { weekday: "short", day: "numeric", month: "numeric" }).format(d);
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product, Service } from "@/lib/data/types";
import { instalment, priceLong } from "@/lib/format";
import { useCart } from "@/components/commerce/CartProvider";
import { FreeShippingProgress } from "@/components/commerce/FreeShippingProgress";
import { Stepper } from "./Stepper";
import { ProductCard } from "@/components/commerce/ProductCard";

/**
 * Cart: lines with add-on services per line, quantity, free-shipping
 * progress, coupon / gift card, totals with VAT breakdown, cross-sell.
 */
export function CartView({ services, crossSell }: { services: Service[]; crossSell: Product[] }) {
  const { lines, setQty, remove, toggleAddon, subtotal, addonsTotal, hydrated, clear } = useCart();
  const [coupon, setCoupon] = useState("");
  const [couponMsg, setCouponMsg] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const goods = subtotal + addonsTotal;
  const shipping = goods >= 100 || goods === 0 ? 0 : 4.9;
  const total = goods - discount + shipping;
  const vat = total - total / 1.24;

  const applyCoupon = () => {
    const c = coupon.trim().toUpperCase();
    if (c === "EURONICS10") {
      setDiscount(Math.round(goods * 0.1 * 100) / 100);
      setCouponMsg("Κουπόνι 10% εφαρμόστηκε.");
    } else if (c.startsWith("GIFT")) {
      setDiscount(Math.min(goods, 50));
      setCouponMsg("Κάρτα δώρου 50,00 € εξαργυρώθηκε.");
    } else {
      setDiscount(0);
      setCouponMsg("Ο κωδικός δεν ισχύει. Δοκίμασε EURONICS10.");
    }
  };

  if (!hydrated) return <div className="eu-canvas eu-gutter py-12 text-eu-muted">Φόρτωση καλαθιού…</div>;

  if (lines.length === 0)
    return (
      <div className="eu-canvas eu-gutter py-10">
        <Stepper step={1} />
        <div className="rounded-lg bg-eu-surface p-10 text-center">
          <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)] mb-2">Το καλάθι σου είναι άδειο</h1>
          <p className="m-0 text-eu-muted text-[length:var(--fs-13-5)]">Δες τις προσφορές της εβδομάδας ή ψάξε αυτό που χρειάζεσαι.</p>
          <div className="flex justify-center gap-2 mt-5">
            <Link href="/prosfores" className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13)] px-5 min-h-11 inline-flex items-center hover:bg-eu-blue">
              Προσφορές
            </Link>
            <Link href="/proionta" className="rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-13)] px-5 min-h-11 inline-flex items-center hover:bg-white">
              Όλα τα προϊόντα
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="eu-canvas eu-gutter pb-12">
      <Stepper step={1} />
      <div className="grid grid-cols-1 @lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="min-w-0">
          <div className="flex items-center justify-between mb-3">
            <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Καλάθι</h1>
            <button type="button" onClick={clear} className="text-eu-muted text-[length:var(--fs-12)] hover:text-eu-red">
              Άδειασμα
            </button>
          </div>
          <ul className="m-0 p-0 list-none grid gap-3">
            {lines.map((l) => {
              const lineAddons = services.filter((s) => s.slug !== "paradosi-egkatastasi" || l.product.installation).filter((s) => s.addonAt?.includes("pdp") || s.addonAt?.includes("checkout"));
              const lineTotal = l.qty * (l.product.price + l.addons.reduce((a, x) => a + x.price, 0));
              return (
                <li key={l.product.id + (l.variant ?? "")} className="bg-white rounded-lg border border-eu-line p-4 grid grid-cols-[80px_1fr] @md:grid-cols-[110px_1fr_auto] gap-4">
                  <div className="relative aspect-square bg-eu-surface-2 rounded-md">{l.product.image && <Image src={l.product.image} alt="" fill sizes="110px" className="object-contain p-2" unoptimized={l.product.image.startsWith("http")} />}</div>
                  <div className="min-w-0">
                    <div className="font-semibold text-eu-muted-2 text-[length:var(--fs-10)]">{l.product.brand}</div>
                    <Link href={`/proion/${l.product.slug}`} className="font-bold text-eu-ink text-[length:var(--fs-13-5)] leading-[1.3] hover:text-eu-blue">
                      {l.product.title}
                    </Link>
                    {l.variant && <div className="text-eu-muted text-[length:var(--fs-11-5)] mt-0.5">{l.variant}</div>}
                    <div className={`text-[length:var(--fs-11-5)] font-semibold mt-1 ${l.product.availability.kind === "in-stock" ? "text-eu-green" : "text-eu-amber"}`}>
                      {l.product.availability.kind === "in-stock" ? "Άμεσα διαθέσιμο" : l.product.availability.kind === "days" ? "Διαθέσιμο σε 2–4 εργάσιμες" : "Κατόπιν παραγγελίας"}
                    </div>
                    {lineAddons.length > 0 && (
                      <details className="mt-2 group">
                        <summary className="cursor-pointer list-none text-eu-blue font-bold text-[length:var(--fs-11-5)] min-h-8 inline-flex items-center">
                          Πρόσθεσε υπηρεσίες {l.addons.length > 0 && `(${l.addons.length})`} <span className="ml-1 group-open:rotate-45 transition-transform">+</span>
                        </summary>
                        <div className="grid gap-1 mt-1.5">
                          {lineAddons.map((s) => {
                            const on = l.addons.some((a) => a.slug === s.slug);
                            return (
                              <label key={s.slug} className="flex items-center gap-2 text-[length:var(--fs-11-5)] text-eu-ink-2 cursor-pointer min-h-8">
                                <input type="checkbox" checked={on} onChange={() => toggleAddon(l.product.id, { slug: s.slug, title: s.title, price: s.priceFrom ?? 0 })} className="size-4 accent-eu-blue" />
                                <span className="flex-1">{s.title}</span>
                                <span className="text-eu-blue font-bold">{s.priceFrom ? `+ ${priceLong(s.priceFrom)}` : "δωρεάν"}</span>
                              </label>
                            );
                          })}
                        </div>
                      </details>
                    )}
                    <div className="flex items-center gap-3 mt-2 @md:hidden">
                      <Qty qty={l.qty} onChange={(q) => setQty(l.product.id, q)} />
                      <span className="font-extrabold text-eu-ink">{priceLong(lineTotal)}</span>
                      <button type="button" aria-label="Αφαίρεση" onClick={() => remove(l.product.id)} className="ml-auto size-9 inline-flex items-center justify-center text-eu-muted-2 hover:text-eu-red">
                        <Trash2 className="size-4" aria-hidden />
                      </button>
                    </div>
                  </div>
                  <div className="hidden @md:flex flex-col items-end gap-2">
                    <span className="font-extrabold text-eu-ink text-[length:var(--fs-16)]">{priceLong(lineTotal)}</span>
                    <span className="text-eu-muted text-[length:var(--fs-10-5)]">{priceLong(l.product.price)} / τεμ. · ΦΠΑ 24%</span>
                    <Qty qty={l.qty} onChange={(q) => setQty(l.product.id, q)} />
                    <button type="button" onClick={() => remove(l.product.id)} className="inline-flex items-center gap-1 text-eu-muted-2 text-[length:var(--fs-11)] hover:text-eu-red min-h-8">
                      <Trash2 className="size-3.5" aria-hidden /> Αφαίρεση
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          <Link href="/proionta" className="inline-flex mt-4 font-bold text-eu-blue text-[length:var(--fs-12-5)] hover:underline">
            ← Συνέχισε τις αγορές
          </Link>
        </div>

        <aside className="bg-eu-surface rounded-xl p-5 grid gap-4 @lg:sticky @lg:top-4">
          <FreeShippingProgress subtotal={goods} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              applyCoupon();
            }}
            className="grid gap-1.5"
          >
            <label htmlFor="coupon" className="font-bold text-eu-ink text-[length:var(--fs-12)]">
              Κουπόνι ή κάρτα δώρου
            </label>
            <div className="flex gap-1.5">
              <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="π.χ. EURONICS10" className="flex-1 min-w-0 rounded-full border border-eu-line bg-white px-3 py-2 min-h-11 text-[length:var(--fs-12-5)]" />
              <button type="submit" className="rounded-full bg-eu-navy text-white font-bold text-[length:var(--fs-12)] px-4 min-h-11 hover:bg-eu-blue">
                Εφαρμογή
              </button>
            </div>
            {couponMsg && <div className={`text-[length:var(--fs-11-5)] ${discount ? "text-eu-green" : "text-eu-red"}`}>{couponMsg}</div>}
          </form>
          <dl className="m-0 grid gap-1.5 text-[length:var(--fs-12-5)] text-eu-ink-2">
            <Row k="Προϊόντα" v={priceLong(subtotal)} />
            {addonsTotal > 0 && <Row k="Υπηρεσίες" v={priceLong(addonsTotal)} />}
            {discount > 0 && <Row k="Έκπτωση" v={`− ${priceLong(discount)}`} />}
            <Row k="Μεταφορικά" v={shipping === 0 ? "Δωρεάν" : priceLong(shipping)} />
            <Row k="ΦΠΑ 24% (περιλαμβάνεται)" v={priceLong(vat)} muted />
            <div className="flex justify-between border-t border-eu-line pt-2 mt-1 font-extrabold text-eu-ink text-[length:var(--fs-16)]">
              <dt>Σύνολο</dt>
              <dd className="m-0">{priceLong(total)}</dd>
            </div>
          </dl>
          <div className="text-eu-blue font-bold text-[length:var(--fs-11-5)]">ή 12 × {priceLong(instalment(total))} χωρίς κάρτα · έως 24 άτοκες με κάρτα</div>
          <Link href="/checkout" className="rounded-full bg-eu-yellow text-eu-navy text-center font-extrabold text-[length:var(--fs-14)] py-3.5 min-h-12 inline-flex items-center justify-center hover:bg-eu-yellow-dark">
            Ολοκλήρωση αγοράς
          </Link>
          <div className="text-eu-muted text-[length:var(--fs-10-5)] leading-snug">Τα μεταφορικά οριστικοποιούνται με βάση τη διεύθυνση. Δωρεάν από 100 € σε πόλεις με κατάστημα Euronics.</div>
        </aside>
      </div>

      <section className="mt-10" aria-label="Μην ξεχάσεις">
        <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-3">Μην ξεχάσεις — μία αποστολή, ένα κόστος μεταφορικών</h2>
        <ul className="m-0 p-0 list-none grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-3">
          {crossSell.map((p) => (
            <li key={p.id}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Qty({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="inline-flex items-center border border-eu-line rounded-full bg-white">
      <button type="button" aria-label="Λιγότερα" onClick={() => onChange(qty - 1)} className="size-9 inline-flex items-center justify-center rounded-l-full hover:bg-eu-surface">
        <Minus className="size-3.5" aria-hidden />
      </button>
      <span className="w-7 text-center font-bold tabular-nums text-[length:var(--fs-12-5)]">{qty}</span>
      <button type="button" aria-label="Περισσότερα" onClick={() => onChange(qty + 1)} className="size-9 inline-flex items-center justify-center rounded-r-full hover:bg-eu-surface">
        <Plus className="size-3.5" aria-hidden />
      </button>
    </div>
  );
}

function Row({ k, v, muted = false }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className={`flex justify-between ${muted ? "text-eu-muted-2 text-[length:var(--fs-11)]" : ""}`}>
      <dt>{k}</dt>
      <dd className="m-0 font-semibold">{v}</dd>
    </div>
  );
}

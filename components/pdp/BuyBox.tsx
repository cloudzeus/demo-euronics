"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Minus, Plus, Store as StoreIcon, Truck } from "lucide-react";
import type { Product, Service, Store } from "@/lib/data/types";
import { discountPct, instalment, priceLong, priceShort, weekday } from "@/lib/format";
import { useCart, type CartAddon } from "@/components/commerce/CartProvider";
import { WishlistButton, CompareCheckbox } from "@/components/commerce/WishlistButton";

/**
 * Sticky buy box: price + Omnibus 30-day price, instalments (with and
 * without card), variants with price per option, availability with date,
 * store selector with stock, add-on services with price, quantity,
 * Quick buy (primary) and add to cart.
 */
export function BuyBox({ product: p, addons, stores }: { product: Product; addons: Service[]; stores: Store[] }) {
  const { add, openQuickBuy } = useCart();
  const [qty, setQty] = useState(1);
  const [sel, setSel] = useState<Record<string, string>>(() => Object.fromEntries((p.variants ?? []).map((v) => [v.name, v.options[0].label])));
  const [chosen, setChosen] = useState<CartAddon[]>([]);
  const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
  const price = useMemo(() => {
    let pr = p.price;
    for (const v of p.variants ?? []) {
      const o = v.options.find((x) => x.label === sel[v.name]);
      if (o?.price) pr = o.price;
    }
    return pr;
  }, [p, sel]);
  const pct = discountPct(price, p.wasPrice);
  const variantLabel = Object.values(sel).join(" · ") || undefined;
  const store = stores.find((s) => s.id === storeId);
  const storeQty = store ? Math.max(0, ((p.storeStock ?? 0) + Number(store.id.replace(/\D/g, ""))) % 7) : 0;

  const avail = (() => {
    const a = p.availability;
    if (a.kind === "in-stock") return { c: "text-eu-green", dot: "bg-eu-green", t: `Άμεσα διαθέσιμο · παράδοση ${weekday(new Date(a.deliveryDate))}` };
    if (a.kind === "days") return { c: "text-eu-amber", dot: "bg-eu-amber", t: `Διαθέσιμο σε ${a.min}–${a.max} εργάσιμες · ${weekday(new Date(a.deliveryDate))}` };
    return { c: "text-eu-muted", dot: "bg-eu-muted", t: a.label ?? "Κατόπιν παραγγελίας" };
  })();

  const toggleAddon = (s: Service) => {
    const a: CartAddon = { slug: s.slug, title: s.title, price: s.priceFrom ?? 0 };
    setChosen((c) => (c.some((x) => x.slug === s.slug) ? c.filter((x) => x.slug !== s.slug) : [...c, a]));
  };
  const addonsTotal = chosen.reduce((n, a) => n + a.price, 0);

  return (
    <aside className="@lg:sticky @lg:top-4 @lg:max-h-[calc(100dvh-2rem)] @lg:overflow-y-auto bg-white rounded-xl border border-eu-line shadow-[var(--shadow-card)] p-5 grid gap-4" aria-label="Αγορά">
      <div>
        <div className="font-semibold text-eu-muted-2 text-[length:var(--fs-11)] tracking-wide">{p.brand}</div>
        <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)] leading-[1.2]">{p.title}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-[length:var(--fs-11-5)] text-eu-muted">
          {p.rating && (
            <a href="#reviews" className="text-eu-ink hover:text-eu-blue">
              <span className="text-eu-yellow-dark">★</span> {p.rating.value.toLocaleString("el-GR")} · {p.rating.count} αξιολογήσεις
            </a>
          )}
          <span>Κωδ. {p.sku}</span>
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="font-extrabold text-eu-ink text-[length:var(--fs-32)] leading-none tracking-[-0.02em]">{priceShort(price)}</span>
          {p.wasPrice && <s className="text-eu-muted-2 text-[length:var(--fs-14)]">{priceShort(p.wasPrice)}</s>}
          {pct !== null && <span className="bg-eu-red text-white font-extrabold text-[length:var(--fs-11)] px-2 py-1 rounded-sm">−{pct}%</span>}
        </div>
        {p.lowest30 && <div className="text-eu-muted text-[length:var(--fs-11)] mt-1">Χαμηλότερη τιμή 30 ημερών: {priceLong(p.lowest30)}</div>}
        {p.gift && <div className="text-eu-blue font-semibold text-[length:var(--fs-12)] mt-1">{p.gift}</div>}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <div className="rounded-md bg-eu-chip p-2.5">
            <div className="font-extrabold text-eu-blue text-[length:var(--fs-13)]">12 × {priceLong(instalment(price))}</div>
            <div className="text-eu-muted text-[length:var(--fs-10-5)]">χωρίς κάρτα · Eurobank</div>
          </div>
          <div className="rounded-md bg-eu-surface p-2.5">
            <div className="font-extrabold text-eu-ink text-[length:var(--fs-13)]">24 × {priceLong(instalment(price, 24))}</div>
            <div className="text-eu-muted text-[length:var(--fs-10-5)]">άτοκα με κάρτα</div>
          </div>
        </div>
      </div>

      {p.variants?.map((v) => (
        <fieldset key={v.name} className="m-0 p-0 border-0">
          <legend className="font-bold text-eu-ink text-[length:var(--fs-12)] mb-1.5">
            {v.name}: <span className="font-normal text-eu-muted">{sel[v.name]}</span>
          </legend>
          <div className="flex flex-wrap gap-1.5">
            {v.options.map((o) => {
              const on = sel[v.name] === o.label;
              return (
                <button key={o.label} type="button" aria-pressed={on} onClick={() => setSel((s) => ({ ...s, [v.name]: o.label }))} className={`inline-flex items-center gap-1.5 rounded-full border-2 px-3 py-1.5 min-h-10 text-[length:var(--fs-12)] font-semibold ${on ? "border-eu-navy bg-eu-navy text-white" : "border-eu-line text-eu-ink hover:border-eu-blue"}`}>
                  {o.swatch && <span className="size-3.5 rounded-full border border-black/10" style={{ background: o.swatch }} aria-hidden />}
                  {o.label}
                  {o.price && o.price !== p.price && <span className={on ? "text-eu-yellow" : "text-eu-muted"}>{priceShort(o.price)}</span>}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className={`flex items-center gap-1.5 font-bold text-[length:var(--fs-12-5)] ${avail.c}`}>
        <span className={`size-2 rounded-full ${avail.dot}`} aria-hidden />
        {avail.t}
      </div>

      <div className="rounded-lg border border-eu-line p-3 grid gap-2">
        <div className="flex items-center gap-2 font-bold text-eu-ink text-[length:var(--fs-12)]">
          <StoreIcon className="size-4 text-eu-blue" aria-hidden /> Απόθεμα σε κατάστημα
        </div>
        <label htmlFor="store-sel" className="sr-only">
          Επιλογή καταστήματος
        </label>
        <select id="store-sel" value={storeId} onChange={(e) => setStoreId(e.target.value)} className="rounded-md border border-eu-line px-2.5 py-2 text-[length:var(--fs-12-5)] min-h-10 bg-white">
          {stores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.city} — {s.name} ({s.distanceKm} km)
            </option>
          ))}
        </select>
        {store && (
          <div className="text-[length:var(--fs-11-5)] text-eu-ink-2">
            {storeQty > 0 ? (
              <span className="text-eu-green font-bold">{storeQty} τεμ. · παραλαβή σε 2 ώρες</span>
            ) : (
              <span className="text-eu-amber font-bold">Μεταφορά στο κατάστημα · 1–3 εργάσιμες</span>
            )}{" "}
            · ανοιχτό έως {store.openUntil} ·{" "}
            <Link href={`/katastimata/${store.slug}`} className="text-eu-blue underline">
              λεπτομέρειες
            </Link>
          </div>
        )}
        <div className="flex items-center gap-2 text-[length:var(--fs-11-5)] text-eu-ink-2">
          <Truck className="size-4 text-eu-blue" aria-hidden /> Δωρεάν μεταφορά από 100 € · {p.installation ? "εγκατάσταση με ραντεβού" : "παράδοση 1–3 εργάσιμες"}
        </div>
      </div>

      {addons.length > 0 && (
        <fieldset className="m-0 p-0 border-0 grid gap-1.5">
          <legend className="font-bold text-eu-ink text-[length:var(--fs-12)] mb-1">Υπηρεσίες για αυτό το προϊόν</legend>
          {addons.map((s) => {
            const on = chosen.some((x) => x.slug === s.slug);
            return (
              <label key={s.slug} className={`flex items-start gap-2 rounded-md border p-2.5 cursor-pointer ${on ? "border-eu-blue bg-eu-chip" : "border-eu-line hover:border-eu-blue"}`}>
                <input type="checkbox" checked={on} onChange={() => toggleAddon(s)} className="mt-0.5 size-4 accent-eu-blue" />
                <span className="flex-1 min-w-0">
                  <span className="flex justify-between gap-2 font-bold text-eu-ink text-[length:var(--fs-12)]">
                    {s.title}
                    <span className="text-eu-blue shrink-0">{s.priceFrom ? `+ ${priceLong(s.priceFrom)}` : "δωρεάν"}</span>
                  </span>
                  <span className="block text-eu-muted text-[length:var(--fs-11)]">{s.blurb}</span>
                </span>
              </label>
            );
          })}
        </fieldset>
      )}

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center border border-eu-line rounded-full">
          <button type="button" aria-label="Λιγότερα" onClick={() => setQty((q) => Math.max(1, q - 1))} className="size-11 inline-flex items-center justify-center rounded-l-full hover:bg-eu-surface">
            <Minus className="size-4" aria-hidden />
          </button>
          <span className="w-8 text-center font-bold tabular-nums">{qty}</span>
          <button type="button" aria-label="Περισσότερα" onClick={() => setQty((q) => Math.min(9, q + 1))} className="size-11 inline-flex items-center justify-center rounded-r-full hover:bg-eu-surface">
            <Plus className="size-4" aria-hidden />
          </button>
        </div>
        <div className="text-eu-muted text-[length:var(--fs-11-5)]">
          Σύνολο <strong className="text-eu-ink">{priceLong(qty * (price + addonsTotal))}</strong> με ΦΠΑ
        </div>
      </div>

      <div className="grid gap-2">
        <button type="button" onClick={() => openQuickBuy({ ...p, price })} className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-14)] py-3.5 min-h-12 hover:bg-eu-yellow-dark">
          Αγορά με 1 κλικ
        </button>
        <div className="flex gap-2">
          <button type="button" onClick={() => add({ ...p, price }, { qty, addons: chosen, variant: variantLabel })} className="flex-1 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13)] py-3 min-h-12 hover:bg-eu-blue">
            Προσθήκη στο καλάθι
          </button>
          <WishlistButton id={p.id} />
        </div>
        <div className="flex justify-between items-center">
          <CompareCheckbox id={p.id} />
          <span className="text-eu-muted text-[length:var(--fs-10-5)]">Εγγύηση 2 έτη · 14 ημέρες υπαναχώρηση</span>
        </div>
      </div>
    </aside>
  );
}

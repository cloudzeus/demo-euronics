"use client";

import Link from "next/link";
import { Heart, Plus, Scale, Eye } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { discountPct, instalment, priceLong, priceShort, weekday } from "@/lib/format";
import { useCart } from "./CartProvider";
import { EnergyChip } from "./EnergyChip";
import { FluidContent } from "@/components/fluid/Fluid";
import { ProductImage } from "@/components/commerce/ProductImage";

/**
 * The product card: nine facts at one glance.
 *  1 discount %  2 brand apart from title  3 energy class + fiche (EU
 *  2017/1369)  4 price / was-price  5 lowest 30-day price (Omnibus)
 *  6 instalment without card, computed  7 availability with colour AND
 *  date  8 Quick buy as the primary button  9 wishlist + compare (live,
 *  persisted) & store stock.
 *
 * Adaptive content: in a narrow container (<300px, e.g. 2-up on phones)
 * the card shortens the availability text and stacks the buttons; the
 * primary action, the heart and the compare toggle never disappear.
 * Every text ≥ 14px.
 */
export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const { add, openQuickBuy, openQuickView, wishlist, toggleWishlist, compare, toggleCompare } = useCart();
  const pct = discountPct(p.price, p.wasPrice);
  const monthly = instalment(p.price);
  const liked = wishlist.includes(p.id);
  const compared = compare.includes(p.id);

  const avail = (() => {
    const a = p.availability;
    if (a.kind === "in-stock") return { color: "text-eu-green", dot: "bg-eu-green", text: a.label ?? `Άμεσα · παράδοση ${weekday(new Date(a.deliveryDate))}`, short: `Άμεσα · ${weekday(new Date(a.deliveryDate))}` };
    if (a.kind === "days") return { color: "text-eu-amber", dot: "bg-eu-amber", text: `Σε ${a.min}–${a.max} εργάσιμες · ${weekday(new Date(a.deliveryDate))}`, short: `${a.min}–${a.max} εργάσιμες` };
    return { color: "text-eu-muted", dot: "bg-eu-muted", text: a.label ?? "Κατόπιν παραγγελίας", short: "Κατόπιν παραγγελίας" };
  })();

  return (
    <FluidContent as="div" className="eu-container h-full" fallback="md">
      {({ size }) => {
        const narrow = size === "xs" || size === "sm";
        return (
          <article className={`bg-white rounded-2xl overflow-hidden flex flex-col h-full border transition-shadow hover:shadow-[var(--shadow-raised)] ${compared ? "border-eu-blue/50 shadow-[var(--shadow-card)]" : "border-eu-line shadow-[var(--shadow-card)]"}`}>
            <div className="relative bg-eu-surface-2 p-3">
              <Link href={`/proion/${p.slug}`} className="block" aria-label={`${p.brand} ${p.title}`}>
                <ProductImage src={p.image} sizes="(max-width: 640px) 50vw, 320px" priority={priority} />
              </Link>
              {p.badge?.kind === "discount" && pct !== null && <span className="absolute top-0 left-0 bg-eu-red text-white font-extrabold text-[length:var(--fs-15)] px-3 py-1.5 rounded-br-xl pointer-events-none">−{pct}%</span>}
              {p.badge?.kind === "gift" && <span className="absolute top-0 left-0 bg-eu-blue text-white font-extrabold text-[length:var(--fs-15)] px-3 py-1.5 rounded-br-xl pointer-events-none">Δώρο</span>}
              {p.badge?.kind === "new" && <span className="absolute top-0 left-0 bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] px-3 py-1.5 rounded-br-xl pointer-events-none">Νέο</span>}
              {p.isRenew && !p.badge && <span className="absolute top-0 left-0 bg-eu-green text-white font-extrabold text-[length:var(--fs-15)] px-3 py-1.5 rounded-br-xl pointer-events-none">Renew</span>}
              <button
                type="button"
                aria-pressed={liked}
                aria-label={liked ? "Αφαίρεση από τη λίστα" : "Προσθήκη στη λίστα"}
                onClick={() => toggleWishlist(p.id)}
                className={`absolute top-2 right-2 size-11 rounded-full bg-white shadow-[var(--shadow-card)] inline-flex items-center justify-center ${liked ? "text-eu-red" : "text-eu-muted hover:text-eu-red"}`}
              >
                <Heart className="size-5" fill={liked ? "currentColor" : "none"} aria-hidden />
              </button>
              <button type="button" onClick={() => openQuickView(p)} aria-label="Γρήγορη προβολή" className="absolute bottom-3 right-3 h-10 rounded-full bg-white/95 shadow-[var(--shadow-card)] text-eu-navy font-bold text-[length:var(--fs-14)] inline-flex items-center gap-1.5 px-3 hover:bg-eu-navy hover:text-white">
                <Eye className="size-4" aria-hidden /> <span className="hidden @md:inline">Γρήγορη προβολή</span>
              </button>
              <div className="absolute bottom-3 left-4 flex gap-1.5">
                {p.energy && <EnergyChip cls={p.energy.cls} fiche={p.energy.fiche} compact={narrow} />}
                {!p.energy && p.rating && <span className="bg-white border border-eu-line text-eu-ink-2 font-semibold text-[length:var(--fs-14)] px-2 py-1 rounded-md">★ {p.rating.value.toLocaleString("el-GR")} · {p.rating.count}</span>}
              </div>
            </div>

            <div className="p-4 flex flex-col flex-1">
              <div className="font-bold text-eu-muted-2 text-[length:var(--fs-14)] tracking-wide mb-1 uppercase">{p.brand}</div>
              <h3 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)] leading-[1.3] line-clamp-2 min-h-[2.6em]">
                <Link href={`/proion/${p.slug}`} className="hover:text-eu-blue">
                  {p.title}
                </Link>
              </h3>
              <div className="flex items-baseline gap-2 mt-2.5">
                <span className="font-extrabold text-eu-ink text-[length:var(--fs-27)] leading-none tracking-[-0.02em]">{priceShort(p.price)}</span>
                {p.wasPrice && <s className="font-medium text-eu-muted-2 text-[length:var(--fs-15)]">{priceShort(p.wasPrice)}</s>}
              </div>
              <div className="text-eu-muted text-[length:var(--fs-14)] leading-snug mt-1 min-h-[1.4em]">{p.lowest30 ? `Χαμηλότερη 30 ημερών: ${priceLong(p.lowest30)}` : p.gift ?? ""}</div>
              <div className="font-bold text-eu-blue text-[length:var(--fs-15)] my-2">ή 12 × {priceLong(monthly)} χωρίς κάρτα</div>
              <div className={`flex items-center gap-1.5 font-bold text-[length:var(--fs-14)] mb-3 ${avail.color}`}>
                <span className={`size-2 rounded-full ${avail.dot}`} aria-hidden />
                {narrow ? avail.short : avail.text}
              </div>
              <div className={`flex gap-2 mt-auto ${narrow ? "flex-col" : ""}`}>
                <button type="button" onClick={() => openQuickBuy(p)} className="flex-1 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] py-3 min-h-12 hover:bg-eu-blue transition-colors">
                  Αγορά με 1 κλικ
                </button>
                <button type="button" onClick={() => add(p)} aria-label="Προσθήκη στο καλάθι" className={`rounded-full border-2 border-eu-navy text-eu-navy font-extrabold flex items-center justify-center min-h-12 hover:bg-eu-surface ${narrow ? "w-full" : "w-12 shrink-0"}`}>
                  <Plus className="size-5" aria-hidden />
                  {narrow && <span className="ml-1 text-[length:var(--fs-15)]">Στο καλάθι</span>}
                </button>
              </div>
              <div className="flex justify-between items-center gap-2 mt-3 text-[length:var(--fs-14)]">
                <label className={`inline-flex items-center gap-1.5 font-semibold cursor-pointer min-h-9 ${compared ? "text-eu-blue" : "text-eu-muted-2 hover:text-eu-blue"}`}>
                  <input type="checkbox" checked={compared} onChange={() => toggleCompare(p.id)} className="size-4 accent-eu-blue" />
                  <Scale className="size-4" aria-hidden /> Σύγκριση
                </label>
                {!narrow && <span className="text-eu-muted-2 truncate">{p.tradeIn ? "Παραλαβή παλιάς" : p.storeStock ? `Σε ${p.storeStock} καταστήματα` : ""}</span>}
              </div>
            </div>
          </article>
        );
      }}
    </FluidContent>
  );
}

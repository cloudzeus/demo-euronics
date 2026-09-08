"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { discountPct, instalment, priceLong, priceShort, weekday } from "@/lib/format";
import { useCart } from "./CartProvider";
import { EnergyChip } from "./EnergyChip";
import { FluidContent } from "@/components/fluid/Fluid";

/**
 * The product card: nine facts at one glance.
 *  1 discount %  2 brand apart from title  3 energy class + fiche (EU
 *  2017/1369)  4 price / was-price  5 lowest 30-day price (Omnibus)
 *  6 instalment without card, computed  7 availability with colour AND
 *  date  8 Quick buy as the primary button  9 store stock & compare.
 *
 * Adaptive content: in a narrow container (<300px, e.g. 2-up on phones)
 * the card drops the compare/stock line, shortens the availability text
 * and stacks the buttons; the primary action never disappears.
 */
export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const { add, openQuickBuy } = useCart();
  const pct = discountPct(p.price, p.wasPrice);
  const monthly = instalment(p.price);

  const avail = (() => {
    const a = p.availability;
    if (a.kind === "in-stock") return { color: "text-eu-green bg-eu-green", text: a.label ?? `Άμεσα · παράδοση ${weekday(new Date(a.deliveryDate))}`, short: "Άμεσα" };
    if (a.kind === "days") return { color: "text-eu-amber bg-eu-amber", text: `Σε ${a.min}–${a.max} εργάσιμες · ${weekday(new Date(a.deliveryDate))}`, short: `${a.min}–${a.max} εργάσιμες` };
    return { color: "text-eu-muted bg-eu-muted", text: a.label ?? "Κατόπιν παραγγελίας", short: "Κατ. παραγγελίας" };
  })();

  return (
    <FluidContent as="div" className="eu-container h-full" fallback="md">
      {({ size }) => {
        const narrow = size === "xs" || size === "sm";
        return (
          <article className="bg-white rounded-lg overflow-hidden flex flex-col h-full shadow-[var(--shadow-card)]">
            <div className="relative bg-eu-surface-2 p-3.5">
              <Link href={`/proion/${p.slug}`} className="block" aria-label={`${p.brand} ${p.title}`}>
                <div className="relative aspect-square">
                  {p.image ? (
                    <Image src={p.image} alt="" fill sizes="(max-width: 640px) 50vw, 320px" className="object-contain" priority={priority} unoptimized={p.image.startsWith("http")} />
                  ) : (
                    <div className="absolute inset-0 bg-eu-placeholder text-eu-placeholder-ink font-semibold text-[length:var(--fs-11)] flex items-center justify-center text-center rounded-md">
                      φωτογραφία
                      <br />
                      προϊόντος
                    </div>
                  )}
                </div>
              </Link>
              {p.badge?.kind === "discount" && pct !== null && (
                <span className="absolute top-0 left-0 bg-eu-red text-white font-extrabold text-[length:var(--fs-11)] px-2.5 py-1.5 rounded-br-md pointer-events-none">−{pct}%</span>
              )}
              {p.badge?.kind === "gift" && (
                <span className="absolute top-0 left-0 bg-eu-blue text-white font-extrabold text-[length:var(--fs-11)] px-2.5 py-1.5 rounded-br-md pointer-events-none">Δώρο</span>
              )}
              <div className="absolute bottom-2.5 left-3.5 flex gap-1.5">
                {p.energy && <EnergyChip cls={p.energy.cls} fiche={p.energy.fiche} compact={narrow} />}
                {!p.energy && p.rating && (
                  <span className="bg-white border border-eu-line text-eu-muted font-semibold text-[length:var(--fs-9-5)] px-1.5 py-1 rounded-sm">
                    {p.rating.value.toLocaleString("el-GR")} ★ · {p.rating.count} κριτικές
                  </span>
                )}
              </div>
            </div>

            <div className="p-3.5 flex flex-col flex-1">
              <div className="font-semibold text-eu-muted-2 text-[length:var(--fs-10)] tracking-wide mb-1">{p.brand}</div>
              <h3 className="m-0 font-bold text-eu-ink text-[length:var(--fs-13)] leading-[1.3] line-clamp-2 min-h-[2.6em]">
                <Link href={`/proion/${p.slug}`} className="hover:text-eu-blue">
                  {p.title}
                </Link>
              </h3>
              <div className="flex items-baseline gap-1.5 mt-2 mb-0.5">
                <span className="font-extrabold text-eu-ink text-[length:var(--fs-24)] leading-none tracking-[-0.02em]">{priceShort(p.price)}</span>
                {p.wasPrice && <s className="font-medium text-eu-muted-2 text-[length:var(--fs-12)]">{priceShort(p.wasPrice)}</s>}
              </div>
              <div className="text-eu-muted text-[length:var(--fs-10)] leading-snug">
                {p.lowest30 ? `Χαμηλότερη τιμή 30 ημερών: ${priceLong(p.lowest30)}` : p.gift ?? " "}
              </div>
              <div className="font-bold text-eu-blue text-[length:var(--fs-11-5)] my-2">ή 12 × {priceLong(monthly)} χωρίς κάρτα</div>
              <div className={`flex items-center gap-1.5 font-bold text-[length:var(--fs-11)] mb-3 ${avail.color.split(" ")[0]}`}>
                <span className={`size-[7px] rounded-full ${avail.color.split(" ")[1]}`} aria-hidden />
                {narrow ? avail.short : avail.text}
              </div>
              <div className={`flex gap-1.5 mt-auto ${narrow ? "flex-col" : ""}`}>
                <button
                  type="button"
                  onClick={() => openQuickBuy(p)}
                  className="flex-1 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12-5)] py-3 min-h-11 hover:bg-eu-blue transition-colors"
                >
                  Αγορά με 1 κλικ
                </button>
                <button
                  type="button"
                  onClick={() => add(p)}
                  aria-label="Προσθήκη στο καλάθι"
                  className={`rounded-full border-2 border-eu-navy text-eu-navy font-extrabold flex items-center justify-center min-h-11 hover:bg-eu-surface ${narrow ? "w-full" : "w-11 shrink-0"}`}
                >
                  <Plus className="size-4" aria-hidden />
                  {narrow && <span className="ml-1 text-[length:var(--fs-12)]">Στο καλάθι</span>}
                </button>
              </div>
              {!narrow && (
                <div className="flex justify-between font-semibold text-eu-muted-2 text-[length:var(--fs-10)] mt-2.5">
                  <button type="button" className="hover:text-eu-blue">
                    Σύγκριση
                  </button>
                  <span>{p.tradeIn ? "Παραλαβή παλιάς" : p.storeStock ? `Απόθεμα σε ${p.storeStock} καταστήματα` : ""}</span>
                </div>
              )}
            </div>
          </article>
        );
      }}
    </FluidContent>
  );
}

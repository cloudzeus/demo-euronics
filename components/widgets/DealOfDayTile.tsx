"use client";

import { Plus } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { discountPct, instalment, priceLong, priceShort } from "@/lib/format";
import { useCart } from "@/components/commerce/CartProvider";
import { Countdown } from "@/components/commerce/Countdown";
import { ProductImage } from "@/components/commerce/ProductImage";

/** Bento tile: deal of the day with a real countdown and Quick buy. */
export function DealOfDayTile({ product: p, endsAt }: { product: Product; endsAt: string }) {
  const { openQuickBuy, add } = useCart();
  const pct = discountPct(p.price, p.wasPrice);
  return (
    <div className="bg-white rounded-lg p-4 flex flex-col shadow-[var(--shadow-card)]">
      <div className="flex justify-between items-center mb-3">
        <span className="font-extrabold text-eu-red text-[length:var(--fs-13)] tracking-wide">Προσφορά ημέρας</span>
        <Countdown endsAt={endsAt} />
      </div>
      <div className="flex gap-3 items-center">
        <ProductImage src={p.image} sizes="88px" className="size-[88px]" rounded="rounded-md" />
        <div className="min-w-0">
          <div className="font-medium text-eu-muted-2 text-[length:var(--fs-13)] mb-0.5">{p.brand}</div>
          <div className="font-bold text-eu-ink text-[length:var(--fs-15)] leading-[1.3]">{p.title}</div>
          <div className="flex items-baseline gap-1.5 mt-1.5 flex-wrap">
            <span className="font-extrabold text-eu-ink text-[length:var(--fs-19)] leading-none">{priceShort(p.price)}</span>
            {p.wasPrice && <s className="font-medium text-eu-muted-2 text-[length:var(--fs-13-5)]">{priceShort(p.wasPrice)}</s>}
            {pct !== null && <span className="bg-eu-red text-white font-extrabold text-[length:var(--fs-13)] px-1.5 py-0.5 rounded-sm">−{pct}%</span>}
          </div>
        </div>
      </div>
      <div className="text-eu-muted text-[length:var(--fs-13)] leading-snug my-2.5">
        {p.lowest30 && <>Χαμηλότερη τιμή 30 ημερών: {priceLong(p.lowest30)} · </>}ή 12 × {priceLong(instalment(p.price))} χωρίς κάρτα
      </div>
      <div className="flex gap-1.5 mt-auto">
        <button type="button" onClick={() => openQuickBuy(p)} className="flex-1 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] py-3 min-h-11 hover:bg-eu-blue">
          Αγορά με 1 κλικ
        </button>
        <button type="button" onClick={() => add(p)} aria-label="Προσθήκη στο καλάθι" className="w-[46px] rounded-full border-2 border-eu-navy text-eu-navy flex items-center justify-center min-h-11 hover:bg-eu-surface">
          <Plus className="size-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

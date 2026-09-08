"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/data/types";
import { priceShort } from "@/lib/format";
import { useCart } from "@/components/commerce/CartProvider";

/** Appears after the buy box scrolls out: title, price, tabs, primary CTA. */
export function StickyBar({ product: p }: { product: Product }) {
  const { openQuickBuy } = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 720);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-eu-line shadow-[var(--shadow-overlay)] eu-container">
      <div className="eu-canvas eu-gutter py-2 flex items-center gap-3">
        <div className="min-w-0 flex-1 hidden @md:block">
          <div className="font-bold text-eu-ink text-[length:var(--fs-12-5)] truncate">
            {p.brand} {p.title}
          </div>
          <nav className="flex gap-3 text-[length:var(--fs-11)] text-eu-muted">
            <a href="#specs" className="hover:text-eu-blue">
              Χαρακτηριστικά
            </a>
            <a href="#reviews" className="hover:text-eu-blue">
              Αξιολογήσεις
            </a>
          </nav>
        </div>
        <div className="font-extrabold text-eu-ink text-[length:var(--fs-19)] whitespace-nowrap">{priceShort(p.price)}</div>
        <button type="button" onClick={() => openQuickBuy(p)} className="flex-1 @md:flex-none rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-13)] px-5 min-h-11 hover:bg-eu-yellow-dark">
          Αγορά με 1 κλικ
        </button>
      </div>
    </div>
  );
}

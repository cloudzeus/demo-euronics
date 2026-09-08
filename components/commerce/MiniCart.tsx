"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "./CartProvider";
import { priceLong } from "@/lib/format";
import { FreeShippingProgress } from "./FreeShippingProgress";

/** Mini-cart drawer: opens on add-to-cart, shows lines, free-shipping progress and the two exits. */
export function MiniCart() {
  const { miniOpen, setMiniOpen, lines, count, subtotal, addonsTotal, setQty, remove, lastAdded } = useCart();
  return (
    <Sheet open={miniOpen} onOpenChange={setMiniOpen}>
      <SheetContent side="right" className="w-full sm:max-w-[420px] p-0 gap-0 border-0 shadow-[var(--shadow-overlay)]" showCloseButton={false}>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center border-b border-eu-line-2 px-5 py-4">
            <SheetTitle className="font-extrabold text-eu-ink text-[length:var(--fs-14)]">
              {lastAdded ? "Προστέθηκε στο καλάθι" : "Καλάθι"} · {count}
            </SheetTitle>
            <button type="button" onClick={() => setMiniOpen(false)} className="inline-flex items-center gap-1 text-eu-muted-2 font-semibold text-[length:var(--fs-12)] min-h-11 px-2 hover:text-eu-ink">
              Κλείσιμο <X className="size-4" aria-hidden />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-3">
            {lines.length === 0 ? (
              <p className="text-eu-muted text-[length:var(--fs-13)] py-6 text-center m-0">Το καλάθι σου είναι άδειο.</p>
            ) : (
              <ul className="m-0 p-0 list-none divide-y divide-eu-line-2">
                {lines.map((l) => (
                  <li key={l.product.id + (l.variant ?? "")} className="flex gap-3 py-3">
                    <div className="relative size-16 shrink-0 bg-eu-surface-2 rounded-md">
                      {l.product.image && <Image src={l.product.image} alt="" fill sizes="64px" className="object-contain" unoptimized={l.product.image.startsWith("http")} />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-eu-muted-2 text-[length:var(--fs-10)]">{l.product.brand}</div>
                      <Link href={`/proion/${l.product.slug}`} className="font-bold text-eu-ink text-[length:var(--fs-12-5)] leading-[1.3] line-clamp-2 hover:text-eu-blue">
                        {l.product.title}
                      </Link>
                      {l.variant && <div className="text-eu-muted text-[length:var(--fs-11)]">{l.variant}</div>}
                      {l.addons.map((a) => (
                        <div key={a.slug} className="text-eu-blue text-[length:var(--fs-11)]">
                          + {a.title} · {priceLong(a.price)}
                        </div>
                      ))}
                      <div className="flex items-center justify-between mt-2">
                        <div className="inline-flex items-center border border-eu-line rounded-full">
                          <button type="button" aria-label="Λιγότερα" onClick={() => setQty(l.product.id, l.qty - 1)} className="size-9 inline-flex items-center justify-center hover:bg-eu-surface rounded-l-full">
                            <Minus className="size-3.5" aria-hidden />
                          </button>
                          <span className="w-7 text-center font-bold text-[length:var(--fs-12-5)] tabular-nums">{l.qty}</span>
                          <button type="button" aria-label="Περισσότερα" onClick={() => setQty(l.product.id, l.qty + 1)} className="size-9 inline-flex items-center justify-center hover:bg-eu-surface rounded-r-full">
                            <Plus className="size-3.5" aria-hidden />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-eu-ink text-[length:var(--fs-13-5)]">{priceLong(l.qty * (l.product.price + l.addons.reduce((a, x) => a + x.price, 0)))}</span>
                          <button type="button" aria-label="Αφαίρεση" onClick={() => remove(l.product.id)} className="size-9 inline-flex items-center justify-center text-eu-muted-2 hover:text-eu-red">
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {lines.length > 0 && (
            <div className="border-t border-eu-line-2 px-5 py-4 bg-eu-surface">
              <FreeShippingProgress subtotal={subtotal + addonsTotal} />
              <div className="flex justify-between font-extrabold text-eu-ink text-[length:var(--fs-14)] my-3">
                <span>Υποσύνολο</span>
                <span>{priceLong(subtotal + addonsTotal)}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/kalathi" onClick={() => setMiniOpen(false)} className="rounded-full border-2 border-eu-navy text-eu-navy text-center font-extrabold text-[length:var(--fs-12-5)] py-3 min-h-11 hover:bg-white">
                  Δες το καλάθι
                </Link>
                <Link href="/checkout" onClick={() => setMiniOpen(false)} className="rounded-full bg-eu-yellow text-eu-navy text-center font-extrabold text-[length:var(--fs-12-5)] py-3 min-h-11 hover:bg-eu-yellow-dark">
                  Ολοκλήρωση
                </Link>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

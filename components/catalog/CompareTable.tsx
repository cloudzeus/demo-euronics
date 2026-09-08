"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Product } from "@/lib/data/types";
import { priceShort, instalment, priceLong } from "@/lib/format";
import { useCart } from "@/components/commerce/CartProvider";

/** Client bridge: reads compare ids from the cart store and syncs them into the URL so the server can resolve products. */
export function CompareTable({ initial }: { initial: Product[] }) {
  const { compare, toggleCompare, hydrated, add } = useCart();
  const router = useRouter();
  useEffect(() => {
    if (!hydrated) return;
    const want = compare.join(",");
    const have = initial.map((p) => p.id).join(",");
    if (want !== have) router.replace(want ? `/sygkrisi?ids=${want}` : "/sygkrisi");
  }, [compare, hydrated, initial, router]);

  if (initial.length === 0) {
    return (
      <div className="rounded-lg bg-eu-surface p-8 text-center">
        <div className="font-bold text-eu-ink text-[length:var(--fs-15)] mb-1">Δεν έχεις επιλέξει προϊόντα για σύγκριση</div>
        <p className="m-0 text-eu-muted text-[length:var(--fs-13)]">Τσέκαρε «Σύγκριση» σε κάρτες προϊόντων της ίδιας κατηγορίας.</p>
        <Link href="/proionta" className="inline-flex mt-4 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12-5)] px-5 min-h-11 items-center">
          Δες τα προϊόντα
        </Link>
      </div>
    );
  }
  const keys = [...new Set(initial.flatMap((p) => (p.specs ?? []).map((s) => s.key)))];
  const val = (p: Product, k: string) => p.specs?.find((s) => s.key === k)?.value ?? "—";
  const differs = (k: string) => new Set(initial.map((p) => val(p, k))).size > 1;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[length:var(--fs-12-5)] min-w-[640px]">
        <thead>
          <tr>
            <th className="text-left align-bottom p-2 w-[180px]" />
            {initial.map((p) => (
              <th key={p.id} className="text-left align-top p-2 border-b border-eu-line">
                <div className="relative">
                  <button type="button" aria-label="Αφαίρεση" onClick={() => toggleCompare(p.id)} className="absolute -top-1 -right-1 size-8 rounded-full bg-white border border-eu-line inline-flex items-center justify-center hover:text-eu-red">
                    <X className="size-3.5" aria-hidden />
                  </button>
                  <div className="relative aspect-square bg-eu-surface-2 rounded-md mb-2">{p.image && <Image src={p.image} alt="" fill sizes="200px" className="object-contain p-3" unoptimized={p.image.startsWith("http")} />}</div>
                  <div className="text-eu-muted-2 text-[length:var(--fs-10-5)]">{p.brand}</div>
                  <Link href={`/proion/${p.slug}`} className="font-bold text-eu-ink hover:text-eu-blue">
                    {p.title}
                  </Link>
                  <div className="font-extrabold text-eu-ink text-[length:var(--fs-19)] mt-1">{priceShort(p.price)}</div>
                  <div className="text-eu-blue text-[length:var(--fs-11)]">ή 12 × {priceLong(instalment(p.price))}</div>
                  <button type="button" onClick={() => add(p)} className="mt-2 w-full rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12)] py-2.5 min-h-10 hover:bg-eu-blue">
                    Στο καλάθι
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="bg-eu-surface">
            <th className="text-left p-2 font-bold">Ενεργειακή κλάση</th>
            {initial.map((p) => (
              <td key={p.id} className="p-2">
                {p.energy?.cls ?? "—"}
              </td>
            ))}
          </tr>
          <tr>
            <th className="text-left p-2 font-bold">Αξιολόγηση</th>
            {initial.map((p) => (
              <td key={p.id} className="p-2">
                {p.rating ? `★ ${p.rating.value} (${p.rating.count})` : "—"}
              </td>
            ))}
          </tr>
          {keys.map((k) => (
            <tr key={k} className={differs(k) ? "bg-eu-yellow/15" : ""}>
              <th className="text-left p-2 font-bold text-eu-ink">
                {k}
                {differs(k) && <span className="ml-1 text-eu-amber text-[length:var(--fs-10)]">διαφέρει</span>}
              </th>
              {initial.map((p) => (
                <td key={p.id} className="p-2 text-eu-ink-2">
                  {val(p, k)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

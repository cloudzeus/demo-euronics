"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { priceShort } from "@/lib/format";

type Mini = { id: string; slug: string; title: string; brand: string; image: string | null; price: number };
const KEY = "euronics.recent.v1";

/** Remembers the last 8 viewed products in localStorage and shows the others. */
export function RecentlyViewed({ current }: { current: Mini }) {
  const [items, setItems] = useState<Mini[]>([]);
  useEffect(() => {
    const t = setTimeout(() => {
      try {
        const prev: Mini[] = JSON.parse(localStorage.getItem(KEY) || "[]");
        const others = prev.filter((x) => x.id !== current.id);
        setItems(others.slice(0, 8));
        localStorage.setItem(KEY, JSON.stringify([current, ...others].slice(0, 8)));
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, [current]);
  if (items.length === 0) return null;
  return (
    <section className="mt-12" aria-label="Είδες πρόσφατα">
      <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)] mb-4">Είδες πρόσφατα</h2>
      <ul className="m-0 p-0 list-none grid grid-cols-2 @md:grid-cols-4 @xl:grid-cols-8 gap-3">
        {items.map((x) => (
          <li key={x.id}>
            <Link href={`/proion/${x.slug}`} className="block rounded-lg border border-eu-line p-2 hover:border-eu-blue">
              <div className="relative aspect-square bg-eu-surface-2 rounded-md mb-2">{x.image && <Image src={x.image} alt="" fill sizes="160px" className="object-contain p-2" unoptimized={x.image.startsWith("http")} />}</div>
              <div className="text-eu-muted text-[length:var(--fs-14)]">{x.brand}</div>
              <div className="font-bold text-eu-ink text-[length:var(--fs-15)] line-clamp-2 leading-tight">{x.title}</div>
              <div className="font-extrabold text-eu-ink text-[length:var(--fs-16)] mt-1">{priceShort(x.price)}</div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

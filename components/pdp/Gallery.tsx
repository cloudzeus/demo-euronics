"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/data/types";
import { EnergyChip } from "@/components/commerce/EnergyChip";
import { ProductImage } from "@/components/commerce/ProductImage";

/** Main image with thumbnails; swipe rail on phones; badge and energy chip overlaid. */
export function Gallery({ images, title, badge, energy }: { images: string[]; title: string; badge?: Product["badge"]; energy?: Product["energy"] }) {
  const [i, setI] = useState(0);
  const src = images[i];
  return (
    <div className="grid grid-cols-1 @md:grid-cols-[72px_1fr] gap-3">
      {images.length > 1 && (
        <ul className="m-0 p-0 list-none flex flex-wrap @md:flex-col gap-2 order-2 @md:order-1">
          {images.map((im, k) => (
            <li key={im} className="shrink-0">
              <button type="button" aria-label={`Εικόνα ${k + 1}`} aria-pressed={k === i} onClick={() => setI(k)} className={`block rounded-lg border-2 ${k === i ? "border-eu-blue" : "border-transparent hover:border-eu-line"}`}>
                <ProductImage src={im} sizes="64px" className="size-16" rounded="rounded-md" frame={false} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="relative aspect-square rounded-2xl bg-white border border-eu-line-2 order-1 @md:order-2 min-w-0">
        {src ? (
          <Image src={src} alt={title} fill priority sizes="(max-width: 1024px) 100vw, 60vw" className="object-contain p-[9%]" unoptimized={src.startsWith("http")} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-eu-placeholder-ink font-semibold">φωτογραφία προϊόντος</div>
        )}
        {badge?.kind === "discount" && <span className="absolute top-3 left-3 bg-eu-red text-white font-extrabold text-[length:var(--fs-14)] px-3 py-1.5 rounded-md">Προσφορά</span>}
        {badge?.kind === "new" && <span className="absolute top-3 left-3 bg-eu-blue text-white font-extrabold text-[length:var(--fs-14)] px-3 py-1.5 rounded-md">Νέο</span>}
        {badge?.kind === "renew" && <span className="absolute top-3 left-3 bg-eu-green text-white font-extrabold text-[length:var(--fs-14)] px-3 py-1.5 rounded-md">Renew · Grade {badge.grade}</span>}
        {energy && (
          <div className="absolute bottom-3 left-3 flex gap-1.5">
            <EnergyChip cls={energy.cls} fiche={energy.fiche} />
          </div>
        )}
      </div>
    </div>
  );
}

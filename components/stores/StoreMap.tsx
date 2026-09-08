"use client";

import { useState } from "react";
import Link from "next/link";

type S = { id: string; slug: string; name: string; city: string; lat: number; lng: number };

/**
 * Lightweight map of Greece with store pins (SVG, no external tiles — the
 * production version uses MapTiler/OSM like web.kolleris.com). Pins are
 * projected linearly on the bounding box of mainland + islands.
 */
export function StoreMap({ stores }: { stores: S[] }) {
  const [active, setActive] = useState<S | null>(null);
  const W = 600, H = 560;
  const lat0 = 34.8, lat1 = 41.8, lng0 = 19.3, lng1 = 28.4;
  const x = (lng: number) => ((lng - lng0) / (lng1 - lng0)) * W;
  const y = (lat: number) => H - ((lat - lat0) / (lat1 - lat0)) * H;
  return (
    <div className="relative rounded-xl overflow-hidden bg-eu-chip border border-eu-line">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Χάρτης καταστημάτων">
        <rect width={W} height={H} fill="#e8eef8" />
        {/* very rough silhouette of Greece for orientation */}
        <path d="M120 60 L200 40 L330 45 L420 30 L560 60 L590 120 L520 160 L470 210 L430 280 L370 330 L330 400 L300 470 L250 500 L200 520 L120 540 L90 470 L110 420 L160 380 L140 320 L100 260 L80 180 Z" fill="#dbe4f3" stroke="#c3cfe6" />
        {stores.map((s) => (
          <g key={s.id} transform={`translate(${x(s.lng)} ${y(s.lat)})`} onMouseEnter={() => setActive(s)} onClick={() => setActive(s)} className="cursor-pointer">
            <circle r={active?.id === s.id ? 9 : 6} fill={active?.id === s.id ? "#f1c400" : "#1d428a"} stroke="#fff" strokeWidth={2} />
          </g>
        ))}
      </svg>
      <div className="absolute bottom-3 left-3 right-3 bg-white rounded-lg shadow-[var(--shadow-raised)] p-3 text-[length:var(--fs-14)]">
        {active ? (
          <div className="flex justify-between items-center gap-2">
            <div className="min-w-0">
              <div className="font-bold text-eu-ink truncate">
                {active.city} — {active.name}
              </div>
            </div>
            <Link href={`/katastimata/${active.slug}`} className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13-5)] px-3 min-h-9 inline-flex items-center shrink-0">
              Άνοιγμα
            </Link>
          </div>
        ) : (
          <span className="text-eu-muted">Πέρασε πάνω από μια πινέζα · {stores.length} καταστήματα στον χάρτη</span>
        )}
      </div>
    </div>
  );
}

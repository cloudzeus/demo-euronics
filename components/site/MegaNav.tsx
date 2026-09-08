"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Sparkles, Tag } from "lucide-react";
import Image from "next/image";
import { navCategories, navUtility } from "@/lib/data/nav";
import type { MegaMenuEntry } from "@/lib/data/repo";
import { ZoneBadge } from "./ZoneBadge";
import { useDevice } from "@/components/fluid/DeviceProvider";
import { ProductImage } from "@/components/commerce/ProductImage";
import { priceShort, instalment, priceLong } from "@/lib/format";
import { useCart } from "@/components/commerce/CartProvider";

/**
 * @dynamic Mega menu — nine first-level plaques; each panel has three
 * levels of content: sub-categories with counts, top brands + quick
 * filters (from the catalogue facets), and a promoted product with photo
 * and «Αγορά με 1 κλικ» plus the category's smart guide. Content comes
 * from `getMegaMenuData()` (CMS «menu» zone with catalogue fallbacks).
 * Keyboard: Tab into a plaque, Enter/ArrowDown opens, Esc closes.
 * Hidden on phones — the MobileMenu drawer takes over.
 */
export function MegaNav({ data = [] }: { data?: MegaMenuEntry[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const { reducedMotion } = useDevice();
  const { openQuickBuy } = useCart();
  const ref = useRef<HTMLElement>(null);
  const active = navCategories.find((c) => c.slug === open);
  const entry = data.find((d) => d.slug === open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <nav ref={ref} aria-label="Κατηγορίες προϊόντων" className="relative bg-white border-b border-eu-line eu-container hidden @lg:block" onMouseLeave={() => setOpen(null)}>
      <ZoneBadge no={3} />
      <ul className="eu-full eu-gutter-wide flex flex-wrap items-center gap-x-1 m-0 p-0 list-none">
        {navCategories.map((c, i) => {
          const isOpen = open === c.slug;
          return (
            <li key={c.slug}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`panel-${c.slug}`}
                onMouseEnter={() => setOpen(c.slug)}
                onFocus={() => setOpen(c.slug)}
                onClick={() => setOpen(isOpen ? null : c.slug)}
                onKeyDown={(e) => e.key === "ArrowDown" && setOpen(c.slug)}
                className={`whitespace-nowrap font-semibold text-[length:var(--fs-14)] @6xl:text-[length:var(--fs-15)] px-2 @6xl:px-3 py-[13px] rounded-md transition-colors ${isOpen || (i === 0 && !open) ? "bg-eu-navy text-white font-bold" : "text-eu-ink-2 hover:bg-eu-surface"}`}
              >
                {c.label}
              </button>
            </li>
          );
        })}
        <li className="flex-1" aria-hidden />
        {navUtility.map((u) => (
          <li key={u.slug} className={u.tone === "offer" ? "" : "hidden @6xl:block"}>
            <Link href={`/${u.slug}`} className={`block whitespace-nowrap font-semibold text-[length:var(--fs-14)] @6xl:text-[length:var(--fs-15)] px-3 @6xl:px-3.5 py-[13px] rounded-md ${u.tone === "offer" ? "bg-eu-red text-white font-extrabold hover:bg-[#c92a1a]" : "text-eu-ink-2 hover:bg-eu-surface"}`}>
              {u.label}
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            id={`panel-${active.slug}`}
            role="region"
            aria-label={active.label}
            initial={reducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 top-full z-40 bg-white border-b border-eu-line shadow-[var(--shadow-overlay)]"
          >
            <div className="eu-full eu-gutter-wide py-6 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_300px] gap-8">
              {/* Level 2: sub-categories */}
              <div>
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)]">{active.label}</h2>
                  <Link href={`/k/${active.slug}`} onClick={() => setOpen(null)} className="inline-flex items-center gap-1 font-extrabold text-eu-blue text-[length:var(--fs-14)] hover:underline">
                    Όλα{active.count ? ` (${active.count})` : ""} <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
                <ul className="m-0 p-0 list-none grid grid-cols-2 gap-x-6 gap-y-0.5">
                  {active.children.map((ch) => {
                    const n = entry?.subCounts[ch.slug];
                    return (
                      <li key={ch.slug}>
                        <Link href={`/k/${active.slug}/${ch.slug}`} onClick={() => setOpen(null)} className="flex items-center justify-between gap-2 rounded-lg px-2.5 py-2 min-h-10 text-eu-ink text-[length:var(--fs-15)] font-semibold hover:bg-eu-surface hover:text-eu-blue">
                          {ch.name}
                          {n ? <span className="text-eu-muted-2 text-[length:var(--fs-13)] tabular-nums">{n}</span> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Level 3: brands, quick filters, guide */}
              <div className="grid gap-4 content-start">
                {entry && entry.brands.length > 0 && (
                  <div>
                    <div className="font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase mb-2">Δημοφιλείς μάρκες</div>
                    <div className="flex flex-wrap gap-1.5">
                      {entry.brands.map((b) => (
                        <Link key={b.slug} href={`/proionta?k=${active.slug}&brand=${b.slug}`} onClick={() => setOpen(null)} className="rounded-full border border-eu-line px-3 min-h-9 inline-flex items-center text-[length:var(--fs-14)] font-bold text-eu-ink hover:border-eu-blue hover:text-eu-blue">
                          {b.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {entry && entry.quick.length > 0 && (
                  <div>
                    <div className="font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase mb-2">Γρήγορα φίλτρα</div>
                    <ul className="m-0 p-0 list-none grid gap-0.5">
                      {entry.quick.map((qk) => (
                        <li key={qk.href}>
                          <Link href={qk.href} onClick={() => setOpen(null)} className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 min-h-9 text-eu-ink-2 text-[length:var(--fs-14)] font-semibold hover:bg-eu-surface hover:text-eu-blue">
                            <Tag className="size-3.5 text-eu-blue" aria-hidden /> {qk.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={`/prosfores?k=${active.slug}`} onClick={() => setOpen(null)} className="inline-flex items-center gap-2 rounded-full bg-eu-red text-white font-extrabold text-[length:var(--fs-14)] px-4 min-h-10 self-start hover:bg-[#c92a1a]">
                  Προσφορές {active.label.toLowerCase()} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
                {entry?.guide && (
                  <Link href={entry.guide.href} onClick={() => setOpen(null)} className="flex items-center gap-3 rounded-xl bg-eu-surface p-2.5 hover:bg-eu-chip">
                    <span className="relative size-16 rounded-lg overflow-hidden shrink-0 bg-eu-surface-2">{entry.guide.image && <Image src={entry.guide.image} alt="" fill sizes="64px" className="object-cover" />}</span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 font-extrabold text-eu-blue text-[length:var(--fs-13)] tracking-wide uppercase">
                        <Sparkles className="size-3.5" aria-hidden /> {entry.guide.href.startsWith("/odigos-agoras") ? "Έξυπνος οδηγός" : "Οδηγός αγοράς"}
                      </span>
                      <span className="block font-bold text-eu-ink text-[length:var(--fs-15)] leading-tight line-clamp-2">{entry.guide.title}</span>
                    </span>
                  </Link>
                )}
              </div>

              {/* Promoted product */}
              {entry?.promo ? (
                <div className="rounded-2xl border border-eu-line bg-white p-4 grid gap-2 content-start">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-eu-red text-[length:var(--fs-13)] tracking-wide uppercase">Προτεινόμενο</span>
                    {entry.promo.wasPrice && <span className="rounded-full bg-eu-red text-white font-extrabold text-[length:var(--fs-13)] px-2 py-0.5">−{Math.round((1 - entry.promo.price / entry.promo.wasPrice) * 100)}%</span>}
                  </div>
                  <Link href={`/proion/${entry.promo.slug}`} onClick={() => setOpen(null)} className="block">
                    <ProductImage src={entry.promo.image} sizes="260px" className="w-full" />
                  </Link>
                  <div className="text-eu-muted-2 font-bold text-[length:var(--fs-13)] uppercase">{entry.promo.brand}</div>
                  <Link href={`/proion/${entry.promo.slug}`} onClick={() => setOpen(null)} className="font-bold text-eu-ink text-[length:var(--fs-15)] leading-tight line-clamp-2 hover:text-eu-blue">
                    {entry.promo.title}
                  </Link>
                  <div className="flex items-baseline gap-2">
                    <span className="font-extrabold text-eu-ink text-[length:var(--fs-22)]">{priceShort(entry.promo.price)}</span>
                    {entry.promo.wasPrice && <s className="text-eu-muted-2 text-[length:var(--fs-14)]">{priceShort(entry.promo.wasPrice)}</s>}
                  </div>
                  <div className="text-eu-blue font-bold text-[length:var(--fs-13-5)]">ή 12 × {priceLong(instalment(entry.promo.price))} χωρίς κάρτα</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const p = entry.promo!;
                        setOpen(null);
                        openQuickBuy(p);
                      }}
                      className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-14)] min-h-11 hover:bg-eu-yellow-dark"
                    >
                      Αγορά με 1 κλικ
                    </button>
                    <Link href={`/proion/${entry.promo.slug}`} onClick={() => setOpen(null)} className="rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-14)] min-h-11 inline-flex items-center justify-center hover:bg-eu-surface">
                      Δες το προϊόν
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl bg-eu-surface p-4 text-eu-muted text-[length:var(--fs-14)]">Σύντομα προϊόντα σε αυτή την κατηγορία.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

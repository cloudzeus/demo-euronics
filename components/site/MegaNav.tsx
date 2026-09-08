"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Sparkles, Tag } from "lucide-react";
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
  const [visible, setVisible] = useState(navCategories.length);
  const { reducedMotion } = useDevice();
  const { openQuickBuy } = useCart();
  const ref = useRef<HTMLElement>(null);
  const row = useRef<HTMLUListElement>(null);
  const probe = useRef<HTMLUListElement>(null);
  const active = navCategories.find((c) => c.slug === open);
  const entry = data.find((d) => d.slug === open);
  const overflow = navCategories.slice(visible);

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

  // Priority+ navigation: measure every item once (invisible probe row) and show as many
  // categories as fit beside the utility links; the rest collapse into «Περισσότερα».
  useLayoutEffect(() => {
    const ul = row.current;
    const pr = probe.current;
    if (!ul || !pr) return;
    const ro = new ResizeObserver(() => {
      const cats = [...pr.querySelectorAll<HTMLElement>("[data-cat]")].map((e) => e.offsetWidth + 4);
      const utils = [...pr.querySelectorAll<HTMLElement>("[data-util]")].reduce((n, e) => n + e.offsetWidth + 4, 0);
      const more = pr.querySelector<HTMLElement>("[data-more]")?.offsetWidth ?? 120;
      const cs = getComputedStyle(ul);
      const width = ul.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const fitsAll = cats.reduce((a, b) => a + b, 0) + utils <= width;
      let count = cats.length;
      if (!fitsAll) {
        let used = 0;
        count = 0;
        for (const w of cats) {
          if (used + w + utils + more + 4 > width) break;
          used += w;
          count++;
        }
      }
      setVisible(Math.max(1, count));
    });
    ro.observe(ul);
    return () => ro.disconnect();
  }, []);

  const plaque = (c: (typeof navCategories)[number], i: number, real: boolean) => {
    const isOpen = open === c.slug;
    return (
      <button
        type="button"
        data-cat=""
        tabIndex={real ? 0 : -1}
        aria-expanded={real ? isOpen : undefined}
        aria-controls={real ? `panel-${c.slug}` : undefined}
        onMouseEnter={real ? () => setOpen(c.slug) : undefined}
        onFocus={real ? () => setOpen(c.slug) : undefined}
        onClick={real ? () => setOpen(isOpen ? null : c.slug) : undefined}
        onKeyDown={real ? (e) => e.key === "ArrowDown" && setOpen(c.slug) : undefined}
        className={`relative whitespace-nowrap font-semibold text-[length:var(--fs-14)] @6xl:text-[length:var(--fs-15)] px-2.5 @6xl:px-3 py-[13px] transition-colors border-b-[3px] ${isOpen ? "text-eu-navy font-bold border-eu-navy" : i === 0 && !open ? "text-eu-navy font-bold border-transparent" : "text-eu-ink-2 border-transparent hover:text-eu-navy hover:border-eu-line-3"}`}
      >
        {c.label}
      </button>
    );
  };
  const utilLink = (u: (typeof navUtility)[number], real: boolean) => (
    <Link
      href={`/${u.slug}`}
      data-util=""
      tabIndex={real ? 0 : -1}
      className={`block whitespace-nowrap font-semibold text-[length:var(--fs-14)] @6xl:text-[length:var(--fs-15)] px-3 py-[13px] border-b-[3px] border-transparent ${u.tone === "offer" ? "text-eu-red font-extrabold hover:border-eu-red" : "text-eu-ink-2 hover:text-eu-navy hover:border-eu-line-3"}`}
    >
      {u.label}
    </Link>
  );
  const moreBtn = (real: boolean) => (
    <button
      type="button"
      data-more=""
      tabIndex={real ? 0 : -1}
      aria-expanded={real ? open === "__more" : undefined}
      onMouseEnter={real ? () => setOpen("__more") : undefined}
      onClick={real ? () => setOpen(open === "__more" ? null : "__more") : undefined}
      className={`inline-flex items-center gap-1 whitespace-nowrap font-semibold text-[length:var(--fs-14)] @6xl:text-[length:var(--fs-15)] px-2.5 py-[13px] border-b-[3px] ${open === "__more" ? "text-eu-navy font-bold border-eu-navy" : "text-eu-ink-2 border-transparent hover:text-eu-navy"}`}
    >
      Περισσότερα <ChevronDown className="size-4" aria-hidden />
    </button>
  );

  return (
    <nav ref={ref} aria-label="Κατηγορίες προϊόντων" className="relative bg-white eu-container hidden @lg:block" onMouseLeave={() => setOpen(null)}>
      <ZoneBadge no={3} />
      {/* Invisible probe row: natural widths of every item */}
      <ul ref={probe} aria-hidden className="absolute invisible pointer-events-none h-0 overflow-hidden flex items-center m-0 p-0 list-none eu-full eu-gutter-wide">
        {navCategories.map((c, i) => (
          <li key={c.slug}>{plaque(c, i, false)}</li>
        ))}
        {navUtility.map((u) => (
          <li key={u.slug}>{utilLink(u, false)}</li>
        ))}
        <li>{moreBtn(false)}</li>
      </ul>
      <ul ref={row} className="eu-full eu-gutter-wide flex flex-nowrap items-center gap-x-1 m-0 p-0 list-none">
        {navCategories.slice(0, visible).map((c, i) => (
          <li key={c.slug}>{plaque(c, i, true)}</li>
        ))}
        {overflow.length > 0 && <li>{moreBtn(true)}</li>}
        <li className="flex-1" aria-hidden />
        {navUtility.map((u) => (
          <li key={u.slug}>{utilLink(u, true)}</li>
        ))}
      </ul>

      <AnimatePresence>
        {open === "__more" && overflow.length > 0 && (
          <motion.div
            role="region"
            aria-label="Περισσότερες κατηγορίες"
            initial={reducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 top-full z-40 bg-white border-t-[3px] border-eu-navy shadow-[var(--shadow-overlay)]"
          >
            <div className="eu-full eu-gutter-wide py-7 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
              {overflow.map((c) => (
                <div key={c.slug}>
                  <Link href={`/k/${c.slug}`} onClick={() => setOpen(null)} className="block font-heading font-bold text-eu-ink text-[length:var(--fs-18)] mb-2 hover:text-eu-blue">
                    {c.label}
                  </Link>
                  <ul className="m-0 p-0 list-none">
                    {c.children.map((ch) => (
                      <li key={ch.slug}>
                        <Link href={`/k/${c.slug}/${ch.slug}`} onClick={() => setOpen(null)} className="block py-1.5 min-h-9 text-eu-ink-2 text-[length:var(--fs-15)] font-semibold hover:text-eu-blue">
                          {ch.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
            className="absolute left-0 right-0 top-full z-40 bg-white border-t-[3px] border-eu-navy shadow-[var(--shadow-overlay)]"
          >
            <div className="eu-full eu-gutter-wide py-7 grid grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_320px] gap-0 divide-x divide-eu-line-2">
              {/* Level 2: sub-categories */}
              <div className="pr-8">
                <div className="flex items-baseline justify-between gap-3 mb-3">
                  <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)]">{active.label}</h2>
                  <Link href={`/k/${active.slug}`} onClick={() => setOpen(null)} className="inline-flex items-center gap-1 font-extrabold text-eu-blue text-[length:var(--fs-14)] hover:underline">
                    Όλα{active.count ? ` (${active.count})` : ""} <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
                <ul className="m-0 p-0 list-none grid grid-cols-2 gap-x-8 gap-y-0">
                  {active.children.map((ch) => {
                    const n = entry?.subCounts[ch.slug];
                    return (
                      <li key={ch.slug}>
                        <Link href={`/k/${active.slug}/${ch.slug}`} onClick={() => setOpen(null)} className="flex items-center justify-between gap-2 py-2 min-h-10 border-b border-eu-line-3 text-eu-ink text-[length:var(--fs-15)] font-semibold hover:text-eu-blue">
                          {ch.name}
                          {n ? <span className="text-eu-muted-2 text-[length:var(--fs-13)] tabular-nums">{n}</span> : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Level 3: brands, quick filters, guide */}
              <div className="grid gap-5 content-start px-8">
                {entry && entry.brands.length > 0 && (
                  <div>
                    <div className="font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase mb-2">Δημοφιλείς μάρκες</div>
                    <ul className="m-0 p-0 list-none grid grid-cols-2 gap-x-4">
                      {entry.brands.map((b) => (
                        <li key={b.slug}>
                          <Link href={`/proionta?k=${active.slug}&brand=${b.slug}`} onClick={() => setOpen(null)} className="flex items-center justify-between py-1.5 min-h-9 text-[length:var(--fs-15)] font-semibold text-eu-ink hover:text-eu-blue">
                            {b.name} <span className="text-eu-muted-2 text-[length:var(--fs-13)] tabular-nums">{b.count}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {entry && entry.quick.length > 0 && (
                  <div>
                    <div className="font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase mb-2">Γρήγορα φίλτρα</div>
                    <ul className="m-0 p-0 list-none grid gap-0.5">
                      {entry.quick.map((qk) => (
                        <li key={qk.href}>
                          <Link href={qk.href} onClick={() => setOpen(null)} className="inline-flex items-center gap-2 py-1.5 min-h-9 text-eu-ink-2 text-[length:var(--fs-15)] font-semibold hover:text-eu-blue">
                            <Tag className="size-3.5 text-eu-blue" aria-hidden /> {qk.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <Link href={`/prosfores?k=${active.slug}`} onClick={() => setOpen(null)} className="inline-flex items-center gap-2 font-extrabold text-eu-red text-[length:var(--fs-15)] min-h-9 self-start hover:underline">
                  Προσφορές {active.label.toLowerCase()} <ArrowRight className="size-3.5" aria-hidden />
                </Link>
                {entry?.guide && (
                  <Link href={entry.guide.href} onClick={() => setOpen(null)} className="flex items-center gap-3 rounded-lg bg-eu-surface p-3 hover:bg-eu-chip">
                    <span className="relative size-16 rounded-md overflow-hidden shrink-0 bg-eu-surface-2">{entry.guide.image && <Image src={entry.guide.image} alt="" fill sizes="64px" className="object-cover" />}</span>
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
                <div className="pl-8 grid gap-2 content-start">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-eu-red text-[length:var(--fs-13)] tracking-wide uppercase">Προτεινόμενο</span>
                    {entry.promo.wasPrice && <span className="rounded-full bg-eu-red text-white font-extrabold text-[length:var(--fs-13)] px-2 py-0.5">−{Math.round((1 - entry.promo.price / entry.promo.wasPrice) * 100)}%</span>}
                  </div>
                  <Link href={`/proion/${entry.promo.slug}`} onClick={() => setOpen(null)} className="block">
                    <ProductImage src={entry.promo.image} sizes="280px" className="w-full" rounded="rounded-lg" />
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
                <div className="pl-8 text-eu-muted text-[length:var(--fs-14)]">Σύντομα προϊόντα σε αυτή την κατηγορία.</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

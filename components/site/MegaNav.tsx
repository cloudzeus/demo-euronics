"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { navCategories, navUtility } from "@/lib/data/nav";
import { ZoneBadge } from "./ZoneBadge";
import { useDevice } from "@/components/fluid/DeviceProvider";

/**
 * Zone 3 — nine first-level categories as solid plaques (not underlines):
 * they read peripherally. Panels load lazily with suggested
 * sub-categories and visible counts; the whole thing works with the
 * keyboard (Tab into a plaque, Enter/ArrowDown opens, Esc closes).
 * Hidden on phones — the MobileMenu drawer takes over.
 */
export function MegaNav() {
  const [open, setOpen] = useState<string | null>(null);
  const { reducedMotion } = useDevice();
  const ref = useRef<HTMLElement>(null);
  const active = navCategories.find((c) => c.slug === open);

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
      <ul className="eu-canvas eu-gutter flex items-center gap-1 m-0 p-0 list-none">
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
                className={`font-semibold text-[length:var(--fs-12-5)] px-3 py-[13px] rounded-md transition-colors ${
                  isOpen || (i === 0 && !open) ? "bg-eu-navy text-white font-bold" : "text-eu-ink-2 hover:bg-eu-surface"
                }`}
              >
                {c.label}
              </button>
            </li>
          );
        })}
        <li className="flex-1" aria-hidden />
        {navUtility.map((u) => (
          <li key={u.slug}>
            <Link
              href={`/${u.slug}`}
              className={`block font-semibold text-[length:var(--fs-12-5)] px-3.5 py-[13px] rounded-md ${
                u.tone === "offer" ? "bg-eu-red text-white font-extrabold hover:bg-[#c92a1a]" : "text-eu-ink-2 hover:bg-eu-surface"
              }`}
            >
              {u.label}
            </Link>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && (
          <motion.div
            id={`panel-${active.slug}`}
            initial={reducedMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.2, 0.7, 0.3, 1] }}
            className="absolute inset-x-0 top-full z-40 bg-white border-b border-eu-line shadow-[var(--shadow-raised)]"
          >
            <div className="eu-canvas eu-gutter py-5 grid grid-cols-[1fr_auto] gap-8">
              <div>
                <div className="flex items-baseline justify-between mb-3">
                  <h2 className="m-0 font-extrabold text-eu-ink text-[length:var(--fs-15)]">{active.label}</h2>
                  <Link href={`/${active.slug}`} className="font-bold text-eu-blue text-[length:var(--fs-12)] hover:underline">
                    Όλα τα {active.count} προϊόντα →
                  </Link>
                </div>
                <ul className="grid grid-cols-3 gap-2 m-0 p-0 list-none">
                  {active.children.map((ch) => (
                    <li key={ch}>
                      <Link
                        href={`/${active.slug}/${encodeURIComponent(ch)}`}
                        className="block border border-eu-line-3 rounded-md px-3 py-2.5 text-eu-ink-2 font-semibold text-[length:var(--fs-12-5)] hover:border-eu-blue hover:text-eu-blue"
                      >
                        {ch}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="w-[260px] bg-eu-surface rounded-lg p-4">
                <div className="font-extrabold text-eu-blue text-[length:var(--fs-10-5)] tracking-wide mb-2">Προτεινόμενο</div>
                <p className="m-0 text-eu-ink-2 text-[length:var(--fs-12-5)] leading-relaxed">
                  Οδηγός αγοράς για {active.label.toLowerCase()} και οι προσφορές της εβδομάδας, με δόσεις χωρίς κάρτα.
                </p>
                <Link href={`/odigoi/${active.slug}`} className="inline-block mt-3 font-bold text-eu-blue text-[length:var(--fs-12)] hover:underline">
                  Διάβασε τον οδηγό →
                </Link>
              </aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

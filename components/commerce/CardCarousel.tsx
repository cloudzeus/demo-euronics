"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDevice } from "@/components/fluid/DeviceProvider";

/**
 * Adaptive card rail. The number of cards per view comes from the
 * measured width and a minimum optimal card width — cards never get
 * cramped. Whatever does not fit is reached with the arrows (or a swipe
 * on touch); there is never a scrollbar. With few items it is a plain
 * grid. Pages move by a full view, so alignment stays pixel-perfect.
 */
export function CardCarousel({ children, minItem = 240, minItemNarrow = 165, gap = 16, label = "Προϊόντα" }: { children: ReactNode; minItem?: number; minItemNarrow?: number; gap?: number; label?: string }) {
  const items = Children.toArray(children);
  const { device } = useDevice();
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  const [page, setPage] = useState(0);
  const drag = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => setW(Math.round(entries[0].contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const min = w && w < 520 ? minItemNarrow : minItem;
  const fallback = device === "mobile" ? 2 : device === "tablet" ? 3 : 4;
  const per = w ? Math.max(1, Math.floor((w + gap) / (min + gap))) : fallback;
  const pages = Math.max(1, Math.ceil(items.length / per));
  const cur = Math.min(page, pages - 1);
  const multi = items.length > per;
  /** First visible index: pages advance by a full view, the last page ends flush so no card stands alone. */
  const start = multi ? Math.min(cur * per, items.length - per) : 0;
  const cardW = `((100% - ${(per - 1) * gap}px) / ${per})`;
  const go = (d: 1 | -1) => setPage(Math.max(0, Math.min(pages - 1, cur + d)));

  return (
    <div className="relative" role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={ref}
        className="overflow-hidden"
        onPointerDown={(e) => (drag.current = e.clientX)}
        onPointerUp={(e) => {
          if (drag.current == null) return;
          const dx = e.clientX - drag.current;
          drag.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}
        onPointerCancel={() => (drag.current = null)}
      >
        <ul
          className="m-0 p-0 list-none grid grid-flow-col transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ gap, gridAutoColumns: `calc(${cardW})`, transform: `translateX(calc(-${start} * (${cardW} + ${gap}px)))` }}
        >
          {items.map((it, i) => (
            <li key={i} className="min-w-0" aria-hidden={multi && (i < start || i >= start + per) ? true : undefined}>
              {it}
            </li>
          ))}
        </ul>
      </div>
      {multi && (
        <>
          <button type="button" aria-label="Προηγούμενα" disabled={cur === 0} onClick={() => go(-1)} className="absolute left-0 top-[38%] -translate-x-1/2 size-12 rounded-full bg-white border border-eu-line shadow-[var(--shadow-raised)] inline-flex items-center justify-center text-eu-navy hover:bg-eu-navy hover:text-white disabled:opacity-0 disabled:pointer-events-none z-10">
            <ChevronLeft className="size-6" aria-hidden />
          </button>
          <button type="button" aria-label="Επόμενα" disabled={cur >= pages - 1} onClick={() => go(1)} className="absolute right-0 top-[38%] translate-x-1/2 size-12 rounded-full bg-white border border-eu-line shadow-[var(--shadow-raised)] inline-flex items-center justify-center text-eu-navy hover:bg-eu-navy hover:text-white disabled:opacity-0 disabled:pointer-events-none z-10">
            <ChevronRight className="size-6" aria-hidden />
          </button>
          <div className="flex justify-center gap-1.5 mt-4" aria-hidden>
            {Array.from({ length: pages }).map((_, i) => (
              <button key={i} type="button" tabIndex={-1} onClick={() => setPage(i)} className={`h-2 rounded-full transition-all ${i === cur ? "w-6 bg-eu-navy" : "w-2 bg-eu-line-3"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

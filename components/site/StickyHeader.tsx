"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins the header (search) and the category menu to the top while the
 * page scrolls. Publishes its height as `--eu-header-h` on <html>, so
 * every other sticky element (section nav, filters, buy box) offsets
 * itself below it instead of hiding under it.
 */
export function StickyHeader({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      document.documentElement.style.setProperty("--eu-header-h", `${Math.round(entries[0].contentRect.height)}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div ref={ref} className="sticky top-0 z-40 shadow-[0_2px_12px_rgba(18,42,88,0.08)]">
      {children}
    </div>
  );
}

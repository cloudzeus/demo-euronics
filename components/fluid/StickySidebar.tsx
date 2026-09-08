"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Smart sticky column (filters, buy box) without an inner scrollbar.
 *  · Fits in the viewport → sticks to the top.
 *  · Taller than the viewport → scrolls with the page; when its bottom
 *    reaches the viewport bottom it pins there, so the customer reads it
 *    to the end while scrolling down. Scrolling up, it unpins in place
 *    and re-pins to the top when its top comes into view.
 * Parent must be the full-height column (flex item with items-stretch).
 */
export function StickySidebar({ children, top = 72, gap = 16, className = "" }: { children: ReactNode; top?: number; gap?: number; className?: string }) {
  const col = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<CSSProperties>({ position: "sticky", top });

  useEffect(() => {
    const c = col.current;
    const b = box.current;
    if (!c || !b) return;
    let lastY = window.scrollY;
    let state: "top" | "bottom" | "free" = "top";
    let freeOffset = 0;
    const apply = () => {
      if (state === "top") setStyle({ position: "sticky", top });
      else if (state === "bottom") setStyle({ position: "sticky", top: window.innerHeight - b.offsetHeight - gap });
      else setStyle({ position: "relative", top: freeOffset });
    };
    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      const vh = window.innerHeight;
      const h = b.offsetHeight;
      if (h + top + gap <= vh) {
        if (state !== "top") {
          state = "top";
          apply();
        }
        return;
      }
      const r = b.getBoundingClientRect();
      const colTop = c.getBoundingClientRect().top;
      if (down) {
        if (state !== "bottom") {
          if (r.bottom <= vh - gap + 1) {
            state = "bottom";
            apply();
          } else if (state === "top") {
            state = "free";
            freeOffset = r.top - colTop;
            apply();
          }
        }
      } else if (state !== "top") {
        if (r.top >= top - 1) {
          state = "top";
          apply();
        } else if (state === "bottom") {
          state = "free";
          freeOffset = r.top - colTop;
          apply();
        }
      }
    };
    const onResize = () => {
      state = "top";
      apply();
      onScroll();
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(b);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [top, gap]);

  return (
    <div ref={col} className={`self-stretch ${className}`}>
      <div ref={box} style={style}>
        {children}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor spotlight for navy zones: a soft radial highlight follows the
 * pointer over the parent section (desktop, fine pointer only). Pure
 * transform updates through CSS variables; no React re-renders.
 */
export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(hover: none)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--sx", `${e.clientX - r.left}px`);
      el.style.setProperty("--sy", `${e.clientY - r.top}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return <span ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 bg-[radial-gradient(520px_circle_at_var(--sx,50%)_var(--sy,50%),rgba(255,255,255,.08),transparent_60%)] ${className}`} />;
}

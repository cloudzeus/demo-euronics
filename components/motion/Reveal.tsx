"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";
import gsap from "gsap";

/**
 * Reveal on scroll: the wrapper (or its `[data-reveal]` children, staggered)
 * rises 18px and fades in the first time it enters the viewport. One
 * IntersectionObserver per instance, GSAP `power3.out`, 0.06s stagger.
 * No-op under prefers-reduced-motion. Never changes layout (transform +
 * opacity only) so it is safe around every zone.
 */
export function Reveal({ as: Tag = "div", children, className = "", stagger = 0.06, y = 18, delay = 0, once = true }: { as?: ElementType; children: ReactNode; className?: string; stagger?: number; y?: number; delay?: number; once?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    const targets: Element[] = items.length ? Array.from(items) : [el];
    gsap.set(targets, { opacity: 0, y });
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (!hit) {
          if (!once && done) {
            gsap.set(targets, { opacity: 0, y });
            done = false;
          }
          return;
        }
        if (done) return;
        done = true;
        gsap.to(targets, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out", stagger, delay, overwrite: true, clearProps: "transform" });
        if (once) io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [stagger, y, delay, once]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

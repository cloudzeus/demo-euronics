"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useDevice, type DeviceClass } from "./DeviceProvider";

/**
 * Fluid / adaptive primitives.
 *
 * Three levels of adaptation, from cheapest to richest:
 *  1. CSS container queries — every widget root gets `eu-container`, parts
 *     use `@md:` / `@lg:` variants. No JS, no layout shift.
 *  2. <ForDevice> — server-detected device class, works before hydration
 *     through `data-device` on <html> (pure CSS, see globals.css).
 *  3. <FluidContent> — render-prop that receives the *measured* width of
 *     its own box (ResizeObserver) so content can change: fewer items,
 *     shorter copy, a different component altogether.
 */

export type ContainerSize = "xs" | "sm" | "md" | "lg" | "xl";

export function sizeOf(width: number): ContainerSize {
  if (width < 360) return "xs";
  if (width < 560) return "sm";
  if (width < 820) return "md";
  if (width < 1100) return "lg";
  return "xl";
}

export function useContainerSize<T extends HTMLElement>(fallback: ContainerSize = "xl") {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<ContainerSize>(fallback);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      setWidth(w);
      setSize((prev) => {
        const next = sizeOf(w);
        return prev === next ? prev : next;
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, size, width };
}

export function FluidContent({
  children,
  fallback,
  className,
  as: Tag = "div",
}: {
  children: (ctx: { size: ContainerSize; width: number; device: DeviceClass; touch: boolean }) => ReactNode;
  fallback?: ContainerSize;
  className?: string;
  as?: "div" | "section" | "ul";
}) {
  const { ref, size, width } = useContainerSize<HTMLDivElement>(fallback);
  const { device, touch } = useDevice();
  const Comp = Tag as "div";
  return (
    <Comp ref={ref} className={className}>
      {children({ size, width, device, touch })}
    </Comp>
  );
}

/** Render children only for the given device classes (server-safe via CSS, corrected on the client). */
export function ForDevice({
  devices,
  children,
  className = "",
}: {
  devices: DeviceClass[];
  children: ReactNode;
  className?: string;
}) {
  const hide: string[] = [];
  if (!devices.includes("mobile")) hide.push("device-hide-mobile");
  if (!devices.includes("tablet")) hide.push("device-hide-tablet");
  if (!devices.includes("desktop")) hide.push("device-hide-desktop");
  return <div className={[...hide, className].join(" ").trim()}>{children}</div>;
}

/** Pick a value per device class, with desktop as the default. */
export function pick<T>(device: DeviceClass, values: { mobile?: T; tablet?: T; desktop: T }): T {
  return values[device] ?? values.desktop;
}

/** Truncate copy for small containers without touching the source text. */
export function clampWords(text: string, size: ContainerSize, limits: Partial<Record<ContainerSize, number>>) {
  const limit = limits[size];
  if (!limit) return text;
  const words = text.split(" ");
  return words.length <= limit ? text : words.slice(0, limit).join(" ") + "…";
}

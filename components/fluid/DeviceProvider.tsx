"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type DeviceClass = "mobile" | "tablet" | "desktop";

export interface DeviceState {
  /** Server-detected class, corrected on the client by viewport width. */
  device: DeviceClass;
  touch: boolean;
  saveData: boolean;
  reducedMotion: boolean;
  /** Live viewport width (0 until mounted). */
  width: number;
}

const DeviceContext = createContext<DeviceState | null>(null);

const BREAK_TABLET = 768;
const BREAK_DESKTOP = 1024;

export function widthToDevice(w: number): DeviceClass {
  if (w < BREAK_TABLET) return "mobile";
  if (w < BREAK_DESKTOP) return "tablet";
  return "desktop";
}

export function DeviceProvider({
  initial,
  children,
}: {
  initial: { device: DeviceClass; touch: boolean; saveData: boolean };
  children: React.ReactNode;
}) {
  const [state, setState] = useState<DeviceState>({
    ...initial,
    reducedMotion: false,
    width: 0,
  });

  useEffect(() => {
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    const update = () => {
      const width = window.innerWidth;
      const device = widthToDevice(width);
      setState((s) => ({
        ...s,
        width,
        device,
        touch: mqCoarse.matches,
        reducedMotion: mqMotion.matches,
      }));
      document.documentElement.dataset.device = device;
    };
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update, { passive: true });
    mqMotion.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  const value = useMemo(() => state, [state]);
  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
}

export function useDevice(): DeviceState {
  const ctx = useContext(DeviceContext);
  if (!ctx) {
    return { device: "desktop", touch: false, saveData: false, reducedMotion: false, width: 0 };
  }
  return ctx;
}

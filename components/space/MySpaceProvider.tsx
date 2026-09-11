"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { MySpace } from "@/lib/space/fit";

interface Ctx {
  space: MySpace | null;
  setSpace: (s: MySpace | null) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}
const C = createContext<Ctx | null>(null);
const KEY = "euronics.mySpace.v1";

/**
 * @dynamic «Ο χώρος μου» — the customer's door width / lift / niche, entered
 * once and reused by every product card (Fit badge), the PDP schematic
 * and the AI advisor. Demo: localStorage. Production: customer profile
 * (account) with anonymous cookie fallback, GDPR: no personal data.
 */
export function MySpaceProvider({ children }: { children: ReactNode }) {
  const [space, setSpaceState] = useState<MySpace | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Deferred so the server-rendered markup hydrates first (no sync setState in effect).
    const t = setTimeout(() => {
      try {
        const raw = localStorage.getItem(KEY);
        if (raw) setSpaceState(JSON.parse(raw));
      } catch {}
    }, 0);
    return () => clearTimeout(t);
  }, []);
  const setSpace = useCallback((s: MySpace | null) => {
    setSpaceState(s);
    try {
      if (s) localStorage.setItem(KEY, JSON.stringify(s));
      else localStorage.removeItem(KEY);
    } catch {}
  }, []);
  const v = useMemo(() => ({ space, setSpace, open, setOpen }), [space, setSpace, open]);
  return <C.Provider value={v}>{children}</C.Provider>;
}

export function useMySpace(): Ctx {
  const c = useContext(C);
  if (!c) return { space: null, setSpace: () => {}, open: false, setOpen: () => {} };
  return c;
}

"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/lib/data/types";

interface CartLine {
  product: Product;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  count: number;
  total: number;
  add: (p: Product, qty?: number) => void;
  /** Product currently open in the Quick buy sheet. */
  quickBuy: Product | null;
  openQuickBuy: (p: Product) => void;
  closeQuickBuy: () => void;
}

const CartContext = createContext<CartState | null>(null);

/** Demo seed: the design shows «Καλάθι · 2 — 748,00 €». */
const SEED: CartLine[] = [];

export function CartProvider({ children, seedTotal = 748, seedCount = 2 }: { children: ReactNode; seedTotal?: number; seedCount?: number }) {
  const [lines, setLines] = useState<CartLine[]>(SEED);
  const [quickBuy, setQuickBuy] = useState<Product | null>(null);

  const add = useCallback((p: Product, qty = 1) => {
    setLines((ls) => {
      const i = ls.findIndex((l) => l.product.id === p.id);
      if (i === -1) return [...ls, { product: p, qty }];
      const next = [...ls];
      next[i] = { ...next[i], qty: next[i].qty + qty };
      return next;
    });
  }, []);

  const value = useMemo<CartState>(() => {
    const count = seedCount + lines.reduce((n, l) => n + l.qty, 0);
    const total = seedTotal + lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    return {
      lines,
      count,
      total,
      add,
      quickBuy,
      openQuickBuy: setQuickBuy,
      closeQuickBuy: () => setQuickBuy(null),
    };
  }, [lines, quickBuy, add, seedCount, seedTotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

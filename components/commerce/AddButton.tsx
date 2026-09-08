"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/lib/data/types";
import { useCart } from "./CartProvider";

/** Small add-to-cart control for compact tiles (accessories, suggestions). */
export function AddButton({ product, label = "Στο καλάθι" }: { product: Product; label?: string }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        add(product, { openMiniCart: true });
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      }}
      className={`inline-flex items-center gap-1 rounded-full border-2 font-extrabold text-[length:var(--fs-14)] px-3 min-h-10 ${done ? "border-eu-green bg-eu-green text-white" : "border-eu-navy text-eu-navy hover:bg-eu-surface"}`}
    >
      {done ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />} {done ? "Προστέθηκε" : label}
    </button>
  );
}

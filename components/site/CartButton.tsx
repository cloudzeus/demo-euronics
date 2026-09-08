"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/commerce/CartProvider";
import { priceLong } from "@/lib/format";

/** Cart with count *and* total (the current site shows a link without a total). */
export function CartButton() {
  const { count, total } = useCart();
  return (
    <Link
      href="/kalathi"
      className="flex items-center gap-2 bg-eu-blue text-white rounded-full pl-3 pr-4 py-2 min-h-11 hover:bg-eu-blue-light transition-colors"
      aria-label={`Καλάθι, ${count} προϊόντα, σύνολο ${priceLong(total)}`}
    >
      <ShoppingBag className="size-5" aria-hidden />
      <span className="flex flex-col leading-tight">
        <span className="font-extrabold text-[length:var(--fs-12)]">Καλάθι · {count}</span>
        <span className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] hidden @sm:block">{priceLong(total)}</span>
      </span>
    </Link>
  );
}

"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/data/types";
import { useCart } from "@/components/commerce/CartProvider";
import { ProductGrid } from "./ProductGrid";

export function WishlistGrid({ initial }: { initial: Product[] }) {
  const { wishlist, hydrated } = useCart();
  const router = useRouter();
  useEffect(() => {
    if (!hydrated) return;
    const want = wishlist.join(",");
    const have = initial.map((p) => p.id).join(",");
    if (want !== have) router.replace(want ? `/lista?ids=${want}` : "/lista");
  }, [wishlist, hydrated, initial, router]);
  if (initial.length === 0)
    return (
      <div className="rounded-lg bg-eu-surface p-8 text-center">
        <div className="font-bold text-eu-ink text-[length:var(--fs-17)] mb-1">Η λίστα σου είναι άδεια</div>
        <p className="m-0 text-eu-muted text-[length:var(--fs-15)]">Πάτησε την καρδιά σε ένα προϊόν για να το κρατήσεις εδώ.</p>
        <Link href="/prosfores" className="inline-flex mt-4 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] px-5 min-h-11 items-center">
          Δες τις προσφορές
        </Link>
      </div>
    );
  return <ProductGrid products={initial} />;
}

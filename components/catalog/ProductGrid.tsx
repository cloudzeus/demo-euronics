import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ProductRow } from "@/components/commerce/ProductRow";

export function ProductGrid({ products, view = "grid" }: { products: Product[]; view?: "grid" | "list" }) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg bg-eu-surface p-8 text-center">
        <div className="font-bold text-eu-ink text-[length:var(--fs-17)] mb-1">Δεν βρέθηκαν προϊόντα</div>
        <p className="m-0 text-eu-muted text-[length:var(--fs-15)]">Δοκίμασε να αφαιρέσεις κάποιο φίλτρο ή να αλλάξεις τον όρο αναζήτησης.</p>
      </div>
    );
  }
  if (view === "list") {
    return (
      <ul className="m-0 p-0 list-none grid gap-3">
        {products.map((p) => (
          <li key={p.id}>
            <ProductRow product={p} />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="m-0 p-0 list-none grid grid-cols-2 @xl:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3 @md:gap-4">
      {products.map((p, i) => (
        <li key={p.id}>
          <ProductCard product={p} priority={i < 4} />
        </li>
      ))}
    </ul>
  );
}

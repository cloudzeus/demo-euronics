import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/commerce/ProductCard";

/** Responsive grid of product cards (related, accessories). No horizontal scrolling: every card is visible and nothing is clipped. */
export function ProductRail({ title, products }: { title: string; products: Product[] }) {
  return (
    <section aria-label={title}>
      <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-26)] leading-tight mb-4">{title}</h2>
      <ul className="m-0 p-0 list-none grid grid-cols-2 @xl:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3 @md:gap-4">
        {products.map((p) => (
          <li key={p.id} className="min-w-0">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

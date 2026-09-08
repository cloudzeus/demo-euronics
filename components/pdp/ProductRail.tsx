import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { CardCarousel } from "@/components/commerce/CardCarousel";

/** Adaptive rail of product cards: as many per view as fit at optimal width, arrows/swipe for the rest, never a scrollbar. */
export function ProductRail({ title, products }: { title: string; products: Product[] }) {
  return (
    <section aria-label={title}>
      <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-26)] leading-tight mb-4">{title}</h2>
      <CardCarousel label={title}>
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </CardCarousel>
    </section>
  );
}

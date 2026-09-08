import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/commerce/ProductCard";

/** Horizontal snap rail of product cards (related, accessories, recently viewed). */
export function ProductRail({ title, products }: { title: string; products: Product[] }) {
  return (
    <section className="mt-10" aria-label={title}>
      <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)] mb-4">{title}</h2>
      <ul className="m-0 p-0 list-none flex gap-3 overflow-x-auto snap-x snap-mandatory eu-scrollbar-none -mx-[clamp(14px,3vw,26px)] px-[clamp(14px,3vw,26px)] pb-2">
        {products.map((p) => (
          <li key={p.id} className="snap-start shrink-0 w-[70%] @sm:w-[46%] @md:w-[31%] @xl:w-[23%]">
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </section>
  );
}

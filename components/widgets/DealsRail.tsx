import type { Product } from "@/lib/data/types";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Countdown } from "@/components/commerce/Countdown";
import { ZoneBadge } from "@/components/site/ZoneBadge";

/**
 * Zone 7 — offers with a real expiry. Four cards on the 1360 canvas,
 * two on tablets, a horizontal snap-scroll of ~78%-wide cards on phones
 * (the second card peeks in to signal scrolling).
 */
export function DealsRail({ products, endsAt, label, title, zoneNo }: { products: Product[]; endsAt: string; label: string; title: string; zoneNo?: number }) {
  return (
    <section className="relative bg-eu-surface eu-container" aria-labelledby="deals-title">
      <ZoneBadge no={zoneNo} />
      <div className="eu-canvas eu-gutter py-8 @lg:py-[34px]">
        <div className="flex items-end justify-between gap-4 mb-5">
          <div>
            <div className="font-extrabold text-eu-red text-[length:var(--fs-13)] tracking-wide mb-2">{label}</div>
            <h2 id="deals-title" className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-30)] leading-[1.1] tracking-[-0.02em]">
              {title}
            </h2>
          </div>
          <Countdown endsAt={endsAt} variant="blocks" className="shrink-0" />
        </div>
        <ul className="m-0 p-0 list-none flex @md:grid @md:grid-cols-2 @xl:grid-cols-4 gap-3.5 overflow-x-auto @md:overflow-visible snap-x snap-mandatory eu-scrollbar-none -mx-[clamp(14px,3vw,26px)] px-[clamp(14px,3vw,26px)] @md:mx-0 @md:px-0">
          {products.map((p, i) => (
            <li key={p.id} className="snap-start shrink-0 w-[78%] @sm:w-[60%] @md:w-auto">
              <ProductCard product={p} priority={i < 2} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Gallery } from "@/components/pdp/Gallery";
import { BuyBox } from "@/components/pdp/BuyBox";
import { SpecsTable } from "@/components/pdp/SpecsTable";
import { Reviews } from "@/components/pdp/Reviews";
import { Questions } from "@/components/pdp/Questions";
import { ProductRail } from "@/components/pdp/ProductRail";
import { StickyBar } from "@/components/pdp/StickyBar";
import { getAccessoriesFor, getL1, getProductBySlug, getRelated, getServicesFull, getStores } from "@/lib/data/repo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getProductBySlug((await params).slug);
  if (!p) return {};
  return { title: `${p.brand} ${p.title}`, description: p.description?.slice(0, 160) };
}

/**
 * Product page: gallery · sticky buy box (variants, instalments, store
 * selector with stock, add-ons with price, Quick buy) · highlights ·
 * grouped specs · reviews · Q&A · accessories · related.
 */
export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();
  const [l1, related, accessories, services, stores] = await Promise.all([getL1(p.category), getRelated(p, 8), getAccessoriesFor(p), getServicesFull(), getStores()]);
  const l2 = l1?.children.find((c) => c.slug === p.subcategory);
  const addons = services.filter((s) => s.addonAt?.includes("pdp") && (s.slug !== "paradosi-egkatastasi" || p.installation));
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.title}`,
    sku: p.sku,
    gtin13: p.ean,
    brand: { "@type": "Brand", name: p.brand },
    image: p.images ?? (p.image ? [p.image] : []),
    description: p.description,
    offers: { "@type": "Offer", priceCurrency: "EUR", price: p.price, availability: p.availability.kind === "order" ? "https://schema.org/PreOrder" : "https://schema.org/InStock", url: `https://www.euronics.gr/proion/${p.slug}` },
    ...(p.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating.value, reviewCount: p.rating.count } } : {}),
  };

  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Προϊόντα", href: "/proionta" }, ...(l1 ? [{ label: l1.label, href: `/k/${l1.slug}` }] : []), ...(l1 && l2 ? [{ label: l2.name, href: `/k/${l1.slug}/${l2.slug}` }] : []), { label: p.title }]} />
      <article className="eu-canvas eu-gutter pb-12">
        <div className="grid grid-cols-1 @lg:grid-cols-[minmax(0,1fr)_400px] @xl:grid-cols-[minmax(0,1fr)_440px] gap-6 @lg:gap-10 items-start [grid-template-areas:'gallery'_'buy'_'content'] @lg:[grid-template-areas:'gallery_buy'_'content_buy']">
          <div className="min-w-0 [grid-area:gallery]">
            <Gallery images={p.images?.length ? p.images : p.image ? [p.image] : []} title={p.title} badge={p.badge} energy={p.energy} />
          </div>
          <div className="min-w-0 [grid-area:content]">
            {p.highlights && (
              <section className="mt-6" aria-labelledby="hl">
                <h2 id="hl" className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-3">
                  Με μια ματιά
                </h2>
                <ul className="m-0 p-0 list-none grid grid-cols-1 @sm:grid-cols-2 gap-2">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-2 rounded-md bg-eu-surface px-3 py-2.5 text-eu-ink-2 text-[length:var(--fs-12-5)]">
                      <span className="text-eu-green font-extrabold" aria-hidden>
                        ✓
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {p.description && (
              <section className="mt-6" aria-labelledby="desc">
                <h2 id="desc" className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-2">
                  Περιγραφή
                </h2>
                <p className="m-0 text-eu-ink-2 text-[length:var(--fs-13-5)] leading-relaxed">{p.description}</p>
                {p.sourceUrl && (
                  <p className="m-0 mt-2 text-eu-muted-2 text-[length:var(--fs-10-5)]">
                    Στοιχεία από το euronics.gr ·{" "}
                    <a href={p.sourceUrl} className="underline" rel="noreferrer" target="_blank">
                      πηγή
                    </a>
                  </p>
                )}
              </section>
            )}
            {p.specs && p.specs.length > 0 && <SpecsTable specs={p.specs} energy={p.energy} />}
            <Reviews product={p} />
            <Questions product={p} />
          </div>
          <div className="[grid-area:buy] min-w-0">
            <BuyBox product={p} addons={addons} stores={stores.slice(0, 8)} />
          </div>
        </div>
        {accessories.length > 0 && <ProductRail title="Ταιριάζει με" products={accessories} />}
        {related.length > 0 && <ProductRail title="Σχετικά προϊόντα" products={related} />}
        <div className="mt-8 text-[length:var(--fs-12)] text-eu-muted flex flex-wrap gap-x-4 gap-y-1">
          <span>Κωδικός: {p.sku}</span>
          {p.ean && <span>EAN: {p.ean}</span>}
          <Link href="/epistrofes" className="text-eu-blue underline">
            14 ημέρες υπαναχώρηση
          </Link>
          <Link href="/tropoi-pliromis" className="text-eu-blue underline">
            Τρόποι πληρωμής
          </Link>
        </div>
      </article>
      <StickyBar product={p} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
    </div>
  );
}

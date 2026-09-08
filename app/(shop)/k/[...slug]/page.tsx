import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { Facets } from "@/components/catalog/Facets";
import { SortBar } from "@/components/catalog/SortBar";
import { Pagination } from "@/components/catalog/Pagination";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { CategoryFaq } from "@/components/catalog/CategoryFaq";
import { getL1, getL2, listProducts, type ListFilter } from "@/lib/data/repo";

type Params = { slug: string[] };
type SP = Record<string, string | undefined>;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const l1 = await getL1(slug[0]);
  if (!l1) return {};
  const l2 = slug[1] ? l1.children.find((c) => c.slug === slug[1]) : null;
  const name = l2 ? `${l2.name} · ${l1.label}` : l1.label;
  return { title: name, description: `${name}: προσφορές, δόσεις χωρίς κάρτα, παραλαβή σε 2 ώρες από 350 καταστήματα Euronics.` };
}

/** /k/{l1} = category landing (subcategory tiles + products) · /k/{l1}/{l2} = listing with facets in the URL. */
export default async function CategoryPage({ params, searchParams }: { params: Promise<Params>; searchParams: Promise<SP> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const l1 = await getL1(slug[0]);
  if (!l1) notFound();
  const l2 = slug[1] ? (await getL2(slug[0], slug[1]))?.l2 ?? null : null;
  if (slug[1] && !l2) notFound();

  const filter: ListFilter = {
    l1: l1.slug,
    l2: l2?.slug,
    brand: sp.brand?.split(",").filter(Boolean),
    energy: sp.energy?.split(",").filter(Boolean),
    minPrice: sp.min ? Number(sp.min) : undefined,
    maxPrice: sp.max ? Number(sp.max) : undefined,
    avail: sp.avail === "in-stock" ? "in-stock" : undefined,
    sale: sp.sale === "1",
    sort: (sp.sort as ListFilter["sort"]) ?? "relevance",
    page: sp.page ? Number(sp.page) : 1,
    perPage: 24,
  };
  const result = await listProducts(filter);
  const basePath = l2 ? `/k/${l1.slug}/${l2.slug}` : `/k/${l1.slug}`;
  const title = l2 ? l2.name : l1.label;

  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Προϊόντα", href: "/proionta" }, { label: l1.label, href: `/k/${l1.slug}` }, ...(l2 ? [{ label: l2.name }] : [])]} />
      <PageIntro kicker={l2 ? l1.label : "Κατηγορία"} title={title} lead={`${result.total} προϊόντα · δόσεις χωρίς κάρτα · παραλαβή σε 2 ώρες από το κατάστημα της περιοχής σου.`} />

      {!l2 && (
        <div className="eu-canvas eu-gutter pb-6">
          <ul className="m-0 p-0 list-none flex gap-2 overflow-x-auto eu-scrollbar-none snap-x">
            {l1.children.map((ch) => (
              <li key={ch.slug} className="snap-start shrink-0">
                <Link href={`/k/${l1.slug}/${ch.slug}`} className="inline-flex items-center rounded-full border border-eu-line bg-white px-4 py-2.5 min-h-11 font-semibold text-eu-ink text-[length:var(--fs-12-5)] hover:border-eu-blue hover:text-eu-blue">
                  {ch.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="eu-canvas eu-gutter pb-12 flex gap-6 items-start">
        <Facets result={result} />
        <div className="flex-1 min-w-0 eu-container">
          <SortBar total={result.total} page={result.page} pages={result.pages} />
          <ProductGrid products={result.items} view={sp.view === "list" ? "list" : "grid"} />
          <Pagination page={result.page} pages={result.pages} basePath={basePath} params={sp} />
          <CategoryFaq name={title} />
        </div>
      </div>
    </div>
  );
}

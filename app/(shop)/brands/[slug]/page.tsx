import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { Facets } from "@/components/catalog/Facets";
import { SortBar } from "@/components/catalog/SortBar";
import { Pagination } from "@/components/catalog/Pagination";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { getBrand, listProducts, type ListFilter } from "@/lib/data/repo";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const b = await getBrand((await params).slug);
  return b ? { title: `${b.name} — προϊόντα`, description: `Όλα τα προϊόντα ${b.name} στη Euronics με εργοστασιακή εγγύηση και δόσεις.` } : {};
}

export default async function BrandPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const brand = await getBrand(slug);
  if (!brand) notFound();
  const result = await listProducts({ brand: [slug], energy: sp.energy?.split(",").filter(Boolean), minPrice: sp.min ? Number(sp.min) : undefined, maxPrice: sp.max ? Number(sp.max) : undefined, avail: sp.avail === "in-stock" ? "in-stock" : undefined, sale: sp.sale === "1", sort: (sp.sort as ListFilter["sort"]) ?? "relevance", page: sp.page ? Number(sp.page) : 1 });
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Μάρκες", href: "/brands" }, { label: brand.name }]} />
      <PageIntro tone="blue" kicker="Επίσημος μεταπωλητής" title={brand.name} lead={`${brand.count} προϊόντα ${brand.name} με εργοστασιακή εγγύηση, service αντιπροσωπείας και δόσεις χωρίς κάρτα.`} />
      <div className="eu-canvas eu-gutter py-8 flex gap-6 items-start">
        <Facets result={{ ...result, brands: [] }} />
        <div className="flex-1 min-w-0 eu-container">
          <SortBar total={result.total} page={result.page} pages={result.pages} />
          <ProductGrid products={result.items} view={sp.view === "list" ? "list" : "grid"} />
          <Pagination page={result.page} pages={result.pages} basePath={`/brands/${slug}`} params={sp} />
        </div>
      </div>
    </div>
  );
}

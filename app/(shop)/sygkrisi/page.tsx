import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { CompareTable } from "@/components/catalog/CompareTable";
import { getProductsByIds } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Σύγκριση προϊόντων" };

/** Compare up to 4: ids come from the client (localStorage) via ?ids=, the table highlights differences. */
export default async function ComparePage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids } = await searchParams;
  const products = ids ? await getProductsByIds(ids.split(",").filter(Boolean).slice(0, 4)) : [];
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Σύγκριση" }]} />
      <PageIntro kicker="Σύγκριση" title="Σύγκριση προϊόντων" lead="Έως 4 προϊόντα της ίδιας κατηγορίας. Οι διαφορές επισημαίνονται." />
      <div className="eu-canvas eu-gutter pb-12">
        <CompareTable initial={products} />
      </div>
    </div>
  );
}

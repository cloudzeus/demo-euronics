import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { WishlistGrid } from "@/components/catalog/WishlistGrid";
import { getProductsByIds } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Η λίστα μου" };

export default async function WishlistPage({ searchParams }: { searchParams: Promise<{ ids?: string }> }) {
  const { ids } = await searchParams;
  const products = ids ? await getProductsByIds(ids.split(",").filter(Boolean)) : [];
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Η λίστα μου" }]} />
      <PageIntro kicker="Αγαπημένα" title="Η λίστα μου" lead="Τα προϊόντα που ξεχώρισες. Αποθηκεύονται στη συσκευή σου· με λογαριασμό, σε όλες τις συσκευές." />
      <div className="eu-canvas eu-gutter pb-12">
        <WishlistGrid initial={products} />
      </div>
    </div>
  );
}

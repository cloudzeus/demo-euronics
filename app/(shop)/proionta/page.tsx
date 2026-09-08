import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { getCategoryTree } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Όλα τα προϊόντα", description: "9 κατηγορίες, ~200 υποκατηγορίες, 2.250 προϊόντα με δόσεις και παραλαβή από 350 καταστήματα." };

/** Catalog hub — the real 9 L1 categories of euronics.gr with their L2 children and counts. */
export default async function CatalogHub() {
  const tree = await getCategoryTree();
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Προϊόντα" }]} />
      <PageIntro kicker="Κατάλογος" title="Όλα τα προϊόντα" lead="Εννέα κατηγορίες, περίπου 200 υποκατηγορίες. Κάθε προϊόν με δόσεις, ενεργειακή κλάση και απόθεμα σε κατάστημα." />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-4">
        {tree.map((c, i) => (
          <section key={c.slug} className="bg-white border border-eu-line rounded-lg p-5">
            <div className="flex items-baseline justify-between mb-3">
              <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)]">
                <span className="text-eu-muted-3 font-extrabold text-[length:var(--fs-11)] mr-2">{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </h2>
              <span className="text-eu-muted-2 text-[length:var(--fs-11-5)]">{c.count}</span>
            </div>
            <ul className="m-0 p-0 list-none grid gap-1">
              {c.children.map((ch) => (
                <li key={ch.slug}>
                  <Link href={`/k/${c.slug}/${ch.slug}`} className="block py-1.5 text-eu-ink-2 text-[length:var(--fs-13)] hover:text-eu-blue">
                    {ch.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={`/k/${c.slug}`} className="inline-flex items-center gap-1 mt-3 font-extrabold text-eu-blue text-[length:var(--fs-12)] hover:underline">
              Όλα <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}

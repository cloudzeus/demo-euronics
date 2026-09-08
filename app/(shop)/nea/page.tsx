import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { NewsCard } from "@/components/news/NewsCard";
import { getNews, getNewsCategories } from "@/lib/data/repo";
import type { NewsItem } from "@/lib/data/types";

export const metadata: Metadata = { title: "Νέα & ανακοινώσεις", description: "Νέα καταστήματα, προσφορές, εκδηλώσεις και ανακοινώσεις της Euronics Ελλάδας." };

/**
 * @dynamic /nea — list bound to the CMS: `getNews({ category })`. The
 * category filter lives in the URL (?k=) so campaigns can deep-link.
 * First item featured (wide), the rest in a width-adaptive grid.
 */
export default async function NewsPage({ searchParams }: { searchParams: Promise<{ k?: string }> }) {
  const { k } = await searchParams;
  const cats = getNewsCategories();
  const category = cats.find((c) => c.slug === k)?.slug as NewsItem["category"] | undefined;
  const items = await getNews({ category });
  const [first, ...rest] = items;
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Νέα & ανακοινώσεις" }]} />
      <PageIntro kicker="Newsroom" title="Νέα & ανακοινώσεις" lead="Νέα καταστήματα, προσφορές με ημερομηνία, εκδηλώσεις και ό,τι αλλάζει στη Euronics — με σύνδεσμο προς τη σχετική ενέργεια." />
      <div className="eu-canvas eu-gutter pb-12 grid gap-6">
        <ul className="m-0 p-0 list-none flex flex-wrap gap-2" aria-label="Κατηγορίες νέων">
          {[{ slug: "", label: "Όλα" }, ...cats].map((c) => {
            const on = (c.slug || undefined) === category;
            return (
              <li key={c.slug}>
                <Link href={c.slug ? `/nea?k=${c.slug}` : "/nea"} className={`inline-flex items-center rounded-full border-2 px-4 min-h-11 font-bold text-[length:var(--fs-15)] ${on ? "border-eu-navy bg-eu-navy text-white" : "border-eu-line bg-white text-eu-ink hover:border-eu-blue hover:text-eu-blue"}`}>
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
        {first && <NewsCard item={first} featured priority />}
        {rest.length > 0 && (
          <ul className="m-0 p-0 list-none grid grid-cols-1 @xl:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4">
            {rest.map((n) => (
              <li key={n.slug} className="min-w-0">
                <NewsCard item={n} />
              </li>
            ))}
          </ul>
        )}
        {items.length === 0 && <p className="m-0 text-eu-muted text-[length:var(--fs-16)]">Δεν υπάρχουν νέα σε αυτή την κατηγορία.</p>}
      </div>
    </div>
  );
}

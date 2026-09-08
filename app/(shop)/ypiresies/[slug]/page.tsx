import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { getService, getServicesFull } from "@/lib/data/repo";
import { priceLong } from "@/lib/format";
import { ServiceBooking } from "@/components/services/ServiceBooking";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = await getService((await params).slug);
  return s ? { title: s.title, description: s.blurb } : {};
}

/** Service page: what you get, cost, steps, FAQ, booking / how it appears in the journey. */
export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) notFound();
  const all = await getServicesFull();
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Υπηρεσίες", href: "/ypiresies" }, { label: s.title }]} />
      <PageIntro kicker={`Υπηρεσία ${s.no}`} title={s.title} lead={s.blurb} right={<div className="rounded-xl bg-eu-yellow text-eu-navy px-5 py-3 font-extrabold text-[length:var(--fs-16)]">{s.priceFrom ? `από ${priceLong(s.priceFrom)}` : "Δωρεάν"}</div>} />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="grid gap-6">
          {s.body && <p className="m-0 text-eu-ink-2 text-[length:var(--fs-14)] leading-relaxed">{s.body}</p>}
          {s.steps && (
            <section>
              <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-3">Πώς λειτουργεί</h2>
              <ol className="m-0 p-0 list-none grid gap-2">
                {s.steps.map((st, i) => (
                  <li key={st} className="flex gap-3 rounded-lg bg-eu-surface p-3 text-[length:var(--fs-13)] text-eu-ink-2">
                    <span className="size-7 shrink-0 rounded-full bg-eu-navy text-white font-extrabold inline-flex items-center justify-center text-[length:var(--fs-12)]">{i + 1}</span>
                    {st}
                  </li>
                ))}
              </ol>
            </section>
          )}
          {s.faq && (
            <section>
              <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-3">Συχνές ερωτήσεις</h2>
              <div className="grid gap-2">
                {s.faq.map((f) => (
                  <details key={f.q} className="group rounded-lg border border-eu-line bg-white px-4">
                    <summary className="cursor-pointer list-none flex justify-between items-center py-3 font-bold text-eu-ink text-[length:var(--fs-13)] min-h-11">
                      {f.q}
                      <span className="text-eu-blue group-open:rotate-45 transition-transform text-[length:var(--fs-19)] leading-none">+</span>
                    </summary>
                    <p className="m-0 pb-3 text-eu-ink-2 text-[length:var(--fs-12-5)]">{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
          {s.addonAt && (
            <section className="rounded-xl bg-eu-chip p-4 text-[length:var(--fs-12-5)] text-eu-ink-2">
              <strong className="text-eu-ink">Πού θα το βρεις:</strong> {s.addonAt.map((a) => ({ pdp: "στη σελίδα προϊόντος", checkout: "στο καλάθι / checkout", delivery: "στην παράδοση" })[a]).join(", ")}.
            </section>
          )}
        </div>
        <aside className="grid gap-3 @lg:sticky @lg:top-4">
          <ServiceBooking service={{ slug: s.slug, title: s.title, priceFrom: s.priceFrom }} />
          <div className="bg-white rounded-xl border border-eu-line p-4">
            <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-13)] mb-2">Άλλες υπηρεσίες</h2>
            <ul className="m-0 p-0 list-none grid gap-1 text-[length:var(--fs-12-5)]">
              {all.filter((x) => x.slug !== s.slug).slice(0, 6).map((x) => (
                <li key={x.slug}>
                  <Link href={`/ypiresies/${x.slug}`} className="text-eu-ink-2 hover:text-eu-blue">
                    {x.no} · {x.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

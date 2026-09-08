import Link from "next/link";
import { Breadcrumbs } from "./Breadcrumbs";
import { PageIntro } from "./PageIntro";
import type { Policy } from "@/lib/data/types";

const NAV = [
  { href: "/tropoi-pliromis", label: "Τρόποι πληρωμής" },
  { href: "/tropoi-apostolis", label: "Τρόποι αποστολής" },
  { href: "/epistrofes", label: "Επιστροφές" },
  { href: "/syxnes-erotiseis", label: "Συχνές ερωτήσεις" },
  { href: "/oroi-chrisis", label: "Όροι χρήσης" },
  { href: "/aporrito", label: "Απόρρητο" },
  { href: "/cookies", label: "Cookies" },
  { href: "/epikoinonia", label: "Επικοινωνία" },
];

/** Shared layout for policy / help pages: sidebar nav + sectioned content, source link to euronics.gr. */
export function PolicyPage({ policy, children }: { policy: Policy; children?: React.ReactNode }) {
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Εξυπηρέτηση", href: "/syxnes-erotiseis" }, { label: policy.title }]} />
      <PageIntro kicker="Εξυπηρέτηση" title={policy.title} lead={policy.intro} />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @lg:grid-cols-[220px_minmax(0,1fr)] gap-8 items-start">
        <nav aria-label="Εξυπηρέτηση" className="@lg:sticky @lg:top-4">
          <ul className="m-0 p-0 list-none flex @lg:flex-col gap-1 overflow-x-auto eu-scrollbar-none">
            {NAV.map((n) => (
              <li key={n.href} className="shrink-0">
                <Link href={n.href} aria-current={n.href === `/${policy.slug}` ? "page" : undefined} className={`inline-flex rounded-full @lg:rounded-md px-3.5 py-2.5 min-h-11 items-center font-semibold text-[length:var(--fs-12-5)] ${n.href === `/${policy.slug}` ? "bg-eu-navy text-white" : "bg-eu-surface @lg:bg-transparent text-eu-ink-2 hover:bg-eu-chip"}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="max-w-[760px] grid gap-6">
          {policy.sections.map((s) => (
            <section key={s.title}>
              <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)] mb-2">{s.title}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="m-0 mb-2 text-eu-ink-2 text-[length:var(--fs-13-5)] leading-relaxed">
                  {p}
                </p>
              ))}
            </section>
          ))}
          {children}
          {policy.sourceUrl && (
            <p className="m-0 text-eu-muted-2 text-[length:var(--fs-11)] border-t border-eu-line pt-3">
              Κείμενο συμπυκνωμένο από την τρέχουσα σελίδα του euronics.gr ·{" "}
              <a href={policy.sourceUrl} className="underline" rel="noreferrer" target="_blank">
                πηγή
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

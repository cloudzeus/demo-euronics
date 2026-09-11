import Link from "next/link";
import type { Service } from "@/lib/data/types";
import { ZoneBadge } from "@/components/site/ZoneBadge";
import { SectionHead } from "./SectionHead";

/**
 * Zone 9 — twelve services, each with a price, as a numbered list on
 * deep blue. The colour stops the scroll; the absence of images puts the
 * weight on *what you gain and what it costs*.
 */
export function ServicesBand({ services, zoneNo }: { services: Service[]; zoneNo?: number }) {
  return (
    <section className="relative bg-eu-navy text-white eu-container" aria-labelledby="services-title">
      <ZoneBadge no={zoneNo} />
      <div className="eu-canvas eu-gutter pt-8 @lg:pt-[38px] pb-8">
        <SectionHead id="services-title" tone="dark" kicker="Υπηρεσίες Euronics" title={["Πριν, κατά και μετά την αγορά,", "είμαστε δίπλα σου"]} link={{ label: "Όλες οι υπηρεσίες →", href: "/ypiresies" }} />
        <ul className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-px bg-eu-navy-line border border-eu-navy-line rounded-lg overflow-hidden m-0 p-0 list-none">
          {services.map((s) => (
            <li key={s.slug} className="bg-eu-navy">
              <Link href={`/ypiresies/${s.slug}`} className="flex gap-3.5 p-4 @md:p-[18px_20px] h-full hover:bg-eu-navy-2">
                <span className="font-extrabold text-eu-yellow text-[length:var(--fs-14)] w-[22px] shrink-0 pt-0.5">{s.no}</span>
                <div>
                  <div className="font-bold text-[length:var(--fs-16)] leading-[1.25]">{s.title}</div>
                  <div className="text-eu-on-dark-2 text-[length:var(--fs-14)] leading-[1.5] mt-1.5">{s.blurb}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HeroSlide, Product, Store } from "@/lib/data/types";
import { CinematicHero } from "./CinematicHero";
import { DealOfDayTile } from "./DealOfDayTile";
import { ZoneBadge } from "@/components/site/ZoneBadge";

interface Props {
  slides: HeroSlide[];
  deal: { product: Product; endsAt: string };
  store: Store;
  services: string[];
  intervalMs?: number;
  zoneNo?: number;
}

/**
 * Zone 4 — bento grid instead of a hero. Four messages in one screen:
 * the seasonal campaign (2/3 width), the deal of the day with Quick buy,
 * the nearest store, three services. Inspiration, transaction and the
 * physical network together — what a marketplace cannot copy.
 *
 * Adaptive: 2fr/1fr grid on the canvas; on tablets the side tiles go
 * side by side under the campaign; on phones a single column in the
 * order campaign → deal → store → services.
 */
export function BentoHero({ slides, deal, store, services, intervalMs, zoneNo }: Props) {
  return (
    <section className="relative bg-eu-navy eu-container" aria-label="Προτεινόμενα">
      <ZoneBadge no={zoneNo} />
      <div className="eu-full eu-gutter-wide py-3 @lg:py-3.5 grid grid-cols-1 @md:grid-cols-2 @lg:grid-cols-[2fr_1fr] @lg:grid-rows-[auto_auto] gap-3 @lg:gap-3.5">
        <div className="@md:col-span-2 @lg:col-span-1 @lg:row-span-2">
          <CinematicHero slides={slides} intervalMs={intervalMs} />
        </div>

        <DealOfDayTile product={deal.product} endsAt={deal.endsAt} />

        <div className="grid grid-rows-2 gap-3 @lg:gap-3.5">
          <form action="/katastimata" className="bg-eu-blue text-white rounded-lg p-4 flex flex-col justify-between">
            <div>
              <div className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] tracking-wide mb-2">Το κατάστημά σου</div>
              <div className="font-heading font-bold text-[length:var(--fs-17)] leading-[1.25]">
                Δες απόθεμα
                <br className="hidden @lg:block" /> δίπλα σου
              </div>
              <div className="text-eu-on-dark-3 text-[length:var(--fs-13-5)] mt-1.5 hidden @lg:block">
                Πιο κοντά: {store.name.split(" — ")[0]} · {store.distanceKm} km
              </div>
            </div>
            <div className="flex gap-1.5 mt-3">
              <label className="sr-only" htmlFor="hero-store-q">
                Ταχυδρομικός κώδικας ή πόλη
              </label>
              <input id="hero-store-q" name="q" placeholder="ΤΚ ή πόλη" className="flex-1 min-w-0 rounded-full bg-white text-eu-ink placeholder:text-eu-muted-2 px-3 py-2.5 text-[length:var(--fs-14)] outline-none focus-visible:ring-2 ring-eu-yellow" />
              <button type="submit" className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-14)] px-3.5 min-h-11 hover:bg-eu-yellow-dark">
                Βρες
              </button>
            </div>
          </form>

          <Link href="/ypiresies" className="bg-eu-surface text-eu-ink rounded-lg p-4 flex flex-col justify-between group hover:bg-eu-chip">
            <div>
              <div className="font-extrabold text-eu-blue text-[length:var(--fs-13)] tracking-wide mb-2">Υπηρεσίες</div>
              <div className="font-semibold text-eu-ink-2 text-[length:var(--fs-14)] leading-[1.55]">{services.join(" · ")}</div>
            </div>
            <div className="font-extrabold text-eu-blue text-[length:var(--fs-14)] mt-3 flex items-center gap-1">
              Και άλλες 9 <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
            </div>
          </Link>
        </div>
      </div>
      <span className="sr-only">
        <Image src="/design/star.svg" alt="" width={1} height={1} />
      </span>
    </section>
  );
}

import Image from "next/image";
import { LocateFixed } from "lucide-react";
import type { Store } from "@/lib/data/types";
import { ZoneBadge } from "@/components/site/ZoneBadge";

/**
 * Zone 10 — the network. Real distance, «open now», service filters, and
 * 350 static store pages with LocalBusiness data behind it. Geolocation
 * only after the user asks (GDPR).
 */
export function StoreFinder({ store, image, zoneNo }: { store: Store; image: string; zoneNo?: number }) {
  return (
    <section className="relative bg-eu-blue text-white eu-container" aria-labelledby="stores-title">
      <ZoneBadge no={zoneNo} />
      <div className="eu-canvas grid grid-cols-1 @lg:grid-cols-[1fr_40%]">
        <div className="eu-gutter py-8 @lg:py-9">
          <div className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] tracking-wide mb-3">Το δίκτυο</div>
          <h2 id="stores-title" className="m-0 font-heading font-bold text-[length:var(--fs-32)] leading-[1.08] tracking-[-0.022em] mb-3">
            350 καταστήματα.
            <br />
            Ένα είναι δίπλα σου.
          </h2>
          <p className="m-0 text-eu-on-dark text-[length:var(--fs-16)] leading-[1.6] mb-5 max-w-[34em]">
            Απόθεμα σε πραγματικό χρόνο, παραλαβή σε 2 ώρες, εγκατάσταση από τον τεχνικό της γειτονιάς σου.
          </p>
          <form action="/katastimata" className="flex gap-2 max-w-[430px] mb-3.5">
            <label htmlFor="store-q" className="sr-only">
              Ταχυδρομικός κώδικας ή πόλη
            </label>
            <input id="store-q" name="q" placeholder="Ταχυδρομικός κώδικας ή πόλη" className="flex-1 min-w-0 rounded-full bg-white text-eu-ink placeholder:text-eu-muted-2 px-4 py-3 text-[length:var(--fs-15)] outline-none focus-visible:ring-2 ring-eu-yellow" />
            <button type="submit" className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-15)] px-5 min-h-11 hover:bg-eu-yellow-dark">
              Βρες
            </button>
          </form>
          <button type="button" className="inline-flex items-center gap-1.5 font-bold text-eu-yellow text-[length:var(--fs-14)] min-h-11 hover:underline">
            <LocateFixed className="size-4" aria-hidden /> Χρήση της τοποθεσίας μου
          </button>
        </div>
        <div className="relative bg-eu-blue-dark min-h-[260px] @lg:min-h-0">
          <Image src={image} alt="Κατάστημα euronics" fill sizes="(max-width: 1024px) 100vw, 540px" className="object-cover" />
          <div className="absolute bottom-4 left-4 right-4 @lg:bottom-[18px] @lg:left-5 @lg:right-5 bg-white text-eu-ink rounded-lg p-3 flex justify-between items-center gap-3 shadow-[var(--shadow-raised)]">
            <div className="min-w-0">
              <div className="font-bold text-[length:var(--fs-15)] leading-[1.3] truncate">{store.name}</div>
              <div className="font-medium text-eu-muted text-[length:var(--fs-13-5)] mt-0.5">
                {store.distanceKm.toLocaleString("el-GR")} km · Ανοιχτό έως {store.openUntil}
              </div>
            </div>
            <a href={`https://maps.google.com/?q=${store.lat},${store.lng}`} className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13-5)] px-3.5 py-2.5 min-h-10 inline-flex items-center shrink-0 hover:bg-eu-blue">
              Οδηγίες
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

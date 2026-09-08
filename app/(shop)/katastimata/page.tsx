import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { StoreMap } from "@/components/stores/StoreMap";
import { getRegions, getStores } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Καταστήματα Euronics", description: "350 καταστήματα-μέλη σε όλη την Ελλάδα: απόσταση, ωράριο, υπηρεσίες, παραλαβή σε 2 ώρες." };

const SERVICE_LABEL: Record<string, string> = { "click-collect": "Παραλαβή σε 2 ώρες", installation: "Εγκατάσταση", "service-point": "Service point", recycling: "Ανακύκλωση", parking: "Parking" };

/** Locator: real distance (from Athens centre in the demo), «open now», filters by prefecture and service, map + list in sync. */
export default async function StoresPage({ searchParams }: { searchParams: Promise<{ q?: string; region?: string; service?: string }> }) {
  const sp = await searchParams;
  const [stores, regions] = await Promise.all([getStores({ q: sp.q, region: sp.region, service: sp.service }), getRegions()]);
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Καταστήματα" }]} />
      <PageIntro tone="blue" kicker="Το δίκτυο" title="350 καταστήματα. Ένα είναι δίπλα σου." lead="Καταστήματα-μέλη με απόθεμα, εγκατάσταση από τεχνικό της γειτονιάς και παραλαβή σε 2 ώρες." />
      <div className="eu-canvas eu-gutter py-6">
        <form className="grid grid-cols-1 @md:grid-cols-[1fr_200px_200px_auto] gap-2 mb-5">
          <input name="q" defaultValue={sp.q} placeholder="Πόλη, Τ.Κ. ή όνομα καταστήματος" className="rounded-full border border-eu-line px-4 py-2.5 min-h-11 text-[length:var(--fs-15)]" aria-label="Αναζήτηση καταστήματος" />
          <select name="region" defaultValue={sp.region ?? ""} className="rounded-full border border-eu-line px-4 py-2.5 min-h-11 text-[length:var(--fs-15)] bg-white" aria-label="Νομός">
            <option value="">Όλοι οι νομοί</option>
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select name="service" defaultValue={sp.service ?? ""} className="rounded-full border border-eu-line px-4 py-2.5 min-h-11 text-[length:var(--fs-15)] bg-white" aria-label="Υπηρεσία">
            <option value="">Όλες οι υπηρεσίες</option>
            {Object.entries(SERVICE_LABEL).map(([k, v]) => (
              <option key={k} value={k}>
                {v}
              </option>
            ))}
          </select>
          <button type="submit" className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] px-5 min-h-11 hover:bg-eu-blue">
            Βρες
          </button>
        </form>
        <div className="grid grid-cols-1 @lg:grid-cols-[minmax(0,1fr)_1fr] gap-5 items-start">
          <div>
            <div className="text-eu-muted text-[length:var(--fs-15)] mb-2">
              <strong className="text-eu-ink">{stores.length}</strong> καταστήματα · ταξινόμηση κατά απόσταση
            </div>
            <ul className="m-0 p-0 list-none grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
              {stores.map((s) => (
                <li key={s.id} className="bg-white rounded-xl border border-eu-line p-4 text-[length:var(--fs-15)]">
                  <div className="flex justify-between gap-2">
                    <Link href={`/katastimata/${s.slug}`} className="font-extrabold text-eu-ink text-[length:var(--fs-16)] hover:text-eu-blue">
                      {s.city} — {s.name}
                    </Link>
                    <span className="text-eu-muted whitespace-nowrap">{s.distanceKm.toLocaleString("el-GR")} km</span>
                  </div>
                  <div className="text-eu-ink-2 mt-1 flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-eu-blue shrink-0" aria-hidden /> {s.address}, {s.zip} {s.city}
                  </div>
                  <div className="text-eu-ink-2 mt-0.5 flex items-center gap-1.5">
                    <Clock className="size-3.5 text-eu-green shrink-0" aria-hidden /> <span className="text-eu-green font-bold">Ανοιχτό</span> · έως {s.openUntil}
                    {s.phone && (
                      <>
                        <span className="text-eu-muted-3">·</span>
                        <Phone className="size-3.5 text-eu-blue shrink-0" aria-hidden />
                        <a href={`tel:${s.phone}`} className="hover:text-eu-blue">
                          {s.phone}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {s.services.map((sv) => (
                      <span key={sv} className="rounded-full bg-eu-surface text-eu-ink-2 font-semibold text-[length:var(--fs-13)] px-2 py-0.5">
                        {SERVICE_LABEL[sv]}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Link href={`/katastimata/${s.slug}`} className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-14)] px-3.5 min-h-9 inline-flex items-center hover:bg-eu-blue">
                      Το κατάστημα
                    </Link>
                    <a href={`https://maps.google.com/?q=${s.lat},${s.lng}`} target="_blank" rel="noreferrer" className="rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-14)] px-3.5 min-h-9 inline-flex items-center hover:bg-eu-surface">
                      Οδηγίες
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="@lg:sticky @lg:top-4">
            <StoreMap stores={stores.map((s) => ({ id: s.id, slug: s.slug, name: s.name, city: s.city, lat: s.lat, lng: s.lng }))} />
            <div className="relative h-[140px] rounded-xl overflow-hidden mt-3">
              <Image src="/img/store-front.jpg" alt="Κατάστημα Euronics" fill sizes="600px" className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

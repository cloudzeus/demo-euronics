import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PageIntro } from "@/components/site/PageIntro";
import { OrderTimeline } from "@/components/account/OrderTimeline";
import { getOrder } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Παρακολούθηση παραγγελίας" };

/** Public tracking: order number + phone/email. Demo numbers: EUR-20260904-0417, EUR-20260812-0093, EUR-20260620-1188. */
export default async function TrackingPage({ searchParams }: { searchParams: Promise<{ no?: string; contact?: string }> }) {
  const { no, contact } = await searchParams;
  const order = no ? await getOrder(no) : null;
  const fresh = no && !order && no.startsWith("EUR-");
  return (
    <div className="eu-container">
      <Breadcrumbs items={[{ label: "Παρακολούθηση παραγγελίας" }]} />
      <PageIntro kicker="Εξυπηρέτηση" title="Παρακολούθηση παραγγελίας" lead="Δώσε τον αριθμό παραγγελίας και το κινητό ή το email σου. Δεν χρειάζεται λογαριασμός." />
      <div className="eu-canvas eu-gutter pb-12 grid grid-cols-1 @lg:grid-cols-[380px_minmax(0,1fr)] gap-6 items-start">
        <form action="/entopismos" className="bg-eu-surface rounded-xl p-5 grid gap-3">
          <label className="grid gap-1 text-[length:var(--fs-14)] font-semibold text-eu-ink">
            Αριθμός παραγγελίας
            <input name="no" defaultValue={no ?? ""} placeholder="EUR-20260904-0417" className="rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-15)]" />
          </label>
          <label className="grid gap-1 text-[length:var(--fs-14)] font-semibold text-eu-ink">
            Κινητό ή email
            <input name="contact" defaultValue={contact ?? ""} placeholder="69xxxxxxxx" className="rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-15)]" />
          </label>
          <button type="submit" className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-15)] py-3 min-h-11 hover:bg-eu-blue">
            Αναζήτηση
          </button>
          <p className="m-0 text-eu-muted text-[length:var(--fs-13)]">Δοκίμασε: EUR-20260904-0417 (σε διανομή), EUR-20260812-0093 (παραλήφθηκε).</p>
        </form>
        <div>
          {order ? (
            <div className="bg-white rounded-xl border border-eu-line p-5">
              <OrderTimeline order={order} />
            </div>
          ) : fresh ? (
            <div className="bg-white rounded-xl border border-eu-line p-5">
              <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)]">Παραγγελία {no}</h2>
              <p className="m-0 mt-2 text-eu-ink-2 text-[length:var(--fs-15)]">Η παραγγελία καταχωρήθηκε μόλις τώρα και βρίσκεται σε επεξεργασία. Θα λάβεις SMS με τον αριθμό αποστολής μόλις παραδοθεί στον courier ή ετοιμαστεί στο κατάστημα.</p>
            </div>
          ) : no ? (
            <div className="bg-eu-surface rounded-xl p-5 text-eu-ink-2 text-[length:var(--fs-15)]">
              Δεν βρέθηκε παραγγελία με αυτόν τον αριθμό. Έλεγξε το email επιβεβαίωσης ή κάλεσε στο{" "}
              <a href="tel:2104835143" className="text-eu-blue underline">
                210 483 5143
              </a>
              .
            </div>
          ) : (
            <div className="bg-eu-surface rounded-xl p-5 text-eu-ink-2 text-[length:var(--fs-15)]">
              Έχεις λογαριασμό;{" "}
              <Link href="/logariasmos/paraggelies" className="text-eu-blue underline">
                Δες όλες τις παραγγελίες σου
              </Link>
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

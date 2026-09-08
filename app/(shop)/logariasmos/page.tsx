import type { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/data/repo";
import { StatusChip } from "@/components/account/OrderTimeline";
import { priceLong } from "@/lib/format";

export const metadata: Metadata = { title: "Ο λογαριασμός μου" };

export default async function AccountHome() {
  const orders = await getOrders();
  const last = orders[0];
  return (
    <div className="grid gap-5">
      <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Καλώς ήρθες, Γιάννη</h1>
      <div className="grid grid-cols-1 @md:grid-cols-3 gap-3">
        {[
          ["Παραγγελίες", String(orders.length), "/logariasmos/paraggelies"],
          ["Ενεργές εγγυήσεις", "3", "/logariasmos/eggyiseis"],
          ["Διευθύνσεις", "1", "/logariasmos/dieythynseis"],
        ].map(([t, n, h]) => (
          <Link key={t} href={h} className="rounded-xl bg-eu-surface p-4 hover:bg-eu-chip">
            <div className="font-extrabold text-eu-ink text-[length:var(--fs-24)]">{n}</div>
            <div className="text-eu-muted text-[length:var(--fs-15)]">{t}</div>
          </Link>
        ))}
      </div>
      {last && (
        <section className="bg-white rounded-xl border border-eu-line p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)]">Τελευταία παραγγελία · {last.number}</h2>
            <StatusChip status={last.status} />
          </div>
          <p className="m-0 text-eu-ink-2 text-[length:var(--fs-15)]">
            {last.lines.map((l) => `${l.qty} × ${l.title}`).join(", ")} · {priceLong(last.total)}
          </p>
          <Link href={`/logariasmos/paraggelies/${last.number}`} className="inline-flex mt-3 font-bold text-eu-blue text-[length:var(--fs-15)] hover:underline">
            Λεπτομέρειες & παρακολούθηση →
          </Link>
        </section>
      )}
      <section className="bg-white rounded-xl border border-eu-line p-5">
        <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)] mb-3">Στοιχεία λογαριασμού</h2>
        <dl className="m-0 grid grid-cols-1 @sm:grid-cols-2 gap-2 text-[length:var(--fs-15)]">
          {[["Όνομα", "Γιάννης Παπαδόπουλος"], ["Email", "giannis@example.gr"], ["Κινητό", "694 123 4567"], ["Newsletter", "Ενεργό — μπορείς να το απενεργοποιήσεις"]].map(([k, v]) => (
            <div key={k}>
              <dt className="text-eu-muted-2 text-[length:var(--fs-13-5)]">{k}</dt>
              <dd className="m-0 font-semibold text-eu-ink">{v}</dd>
            </div>
          ))}
        </dl>
        <button type="button" className="mt-3 rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-14)] px-4 min-h-10 hover:bg-eu-surface">
          Επεξεργασία
        </button>
      </section>
    </div>
  );
}

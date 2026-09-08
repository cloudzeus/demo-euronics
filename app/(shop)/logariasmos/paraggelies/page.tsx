import type { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/data/repo";
import { StatusChip } from "@/components/account/OrderTimeline";
import { priceLong } from "@/lib/format";

export const metadata: Metadata = { title: "Οι παραγγελίες μου" };

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className="grid gap-4">
      <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Παραγγελίες</h1>
      <ul className="m-0 p-0 list-none grid gap-3">
        {orders.map((o) => (
          <li key={o.number} className="bg-white rounded-xl border border-eu-line p-4 grid grid-cols-1 @md:grid-cols-[1fr_auto] gap-3 items-center">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="font-extrabold text-eu-ink text-[length:var(--fs-13-5)]">{o.number}</span>
                <StatusChip status={o.status} />
                <span className="text-eu-muted text-[length:var(--fs-11-5)]">{new Date(o.date).toLocaleDateString("el-GR")}</span>
              </div>
              <div className="text-eu-ink-2 text-[length:var(--fs-12-5)]">{o.lines.map((l) => `${l.qty} × ${l.brand} ${l.title}`).join(" · ")}</div>
              <div className="text-eu-muted text-[length:var(--fs-11-5)] mt-0.5">
                {o.fulfilment === "click-collect" ? "Παραλαβή από κατάστημα" : o.fulfilment === "appointment" ? "Παράδοση με ραντεβού" : "Courier"} · {o.payment.method}
              </div>
            </div>
            <div className="flex items-center gap-3 @md:flex-col @md:items-end">
              <span className="font-extrabold text-eu-ink text-[length:var(--fs-16)]">{priceLong(o.total)}</span>
              <Link href={`/logariasmos/paraggelies/${o.number}`} className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12)] px-4 min-h-10 inline-flex items-center hover:bg-eu-blue">
                Λεπτομέρειες
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

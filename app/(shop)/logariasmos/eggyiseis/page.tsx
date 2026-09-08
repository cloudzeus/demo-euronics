import type { Metadata } from "next";
import Link from "next/link";
import { getOrders } from "@/lib/data/repo";

export const metadata: Metadata = { title: "Εγγυήσεις & service" };

/** Warranties derived from orders: 2 years legal + extensions bought as add-ons; book service. */
export default async function WarrantiesPage() {
  const orders = await getOrders();
  const rows = orders.flatMap((o) =>
    o.lines.map((l) => {
      const ext = l.addons?.find((a) => a.slug === "epektasi-eggyisis");
      const years = ext ? 5 : 2;
      const end = new Date(o.date);
      end.setFullYear(end.getFullYear() + years);
      return { key: `${o.number}-${l.productId}`, title: `${l.brand} ${l.title}`, order: o.number, from: o.date, to: end.toISOString().slice(0, 10), years, ext: !!ext };
    }),
  );
  return (
    <div className="grid gap-4">
      <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Εγγυήσεις & service</h1>
      <ul className="m-0 p-0 list-none grid gap-3">
        {rows.map((r) => (
          <li key={r.key} className="bg-white rounded-xl border border-eu-line p-4 grid grid-cols-1 @md:grid-cols-[1fr_auto] gap-3 items-center text-[length:var(--fs-12-5)]">
            <div>
              <div className="font-bold text-eu-ink text-[length:var(--fs-13-5)]">{r.title}</div>
              <div className="text-eu-muted">
                Παραγγελία {r.order} · Εγγύηση {r.years} έτη{r.ext ? " (με επέκταση)" : " (νόμιμη)"} · έως {new Date(r.to).toLocaleDateString("el-GR")}
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/ypiresies/syntirisi-episkeyi" className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12)] px-4 min-h-10 inline-flex items-center hover:bg-eu-blue">
                Κλείσε service
              </Link>
              {!r.ext && (
                <Link href="/ypiresies/epektasi-eggyisis" className="rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-12)] px-4 min-h-10 inline-flex items-center hover:bg-eu-surface">
                  Επέκταση
                </Link>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

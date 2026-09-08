import type { Metadata } from "next";
import Link from "next/link";
import { Package, Truck, ShieldCheck, Gift, CalendarClock, CreditCard, Bell, User, Heart, ArrowRight } from "lucide-react";
import { getAppointments, getCustomer, getInstalmentPlans, getOrders } from "@/lib/data/repo";
import { OrderTimeline, StatusChip } from "@/components/account/OrderTimeline";
import { priceLong } from "@/lib/format";

export const metadata: Metadata = { title: "Ο λογαριασμός μου" };

/**
 * @dynamic /logariasmos — dashboard composed from four ERP-bound reads
 * (customer, orders, instalment plans, appointments). Every tile links
 * to its section; the active delivery shows its live courier timeline.
 */
export default async function AccountHome() {
  const [c, orders, plans, appts] = await Promise.all([getCustomer(), getOrders(), getInstalmentPlans(), getAppointments()]);
  const active = orders.find((o) => ["paid", "processing", "shipped", "ready-for-pickup"].includes(o.status));
  const nextAppt = appts.find((a) => a.status === "scheduled" || a.status === "confirmed");
  const nextPlan = [...plans].sort((a, b) => a.nextDate.localeCompare(b.nextDate))[0];
  const tiles = [
    { icon: Package, n: String(orders.length), t: "Παραγγελίες", h: "/logariasmos/paraggelies" },
    { icon: Truck, n: active ? "1" : "0", t: "Σε εξέλιξη", h: active ? `/logariasmos/paraggelies/${active.number}` : "/logariasmos/paraggelies" },
    { icon: ShieldCheck, n: "3", t: "Ενεργές εγγυήσεις", h: "/logariasmos/eggyiseis" },
    { icon: CreditCard, n: String(plans.length), t: "Προγράμματα δόσεων", h: "/logariasmos/pliromes" },
    { icon: CalendarClock, n: String(appts.filter((a) => a.status !== "done" && a.status !== "cancelled").length), t: "Ραντεβού", h: "/logariasmos/rantevou" },
    { icon: Gift, n: (c.loyaltyPoints ?? 0).toLocaleString("el-GR"), t: "Πόντοι Euronics", h: "/kartes-dorou" },
  ];
  return (
    <div className="grid grid-cols-1 gap-5">
      <div className="rounded-2xl bg-eu-navy text-white p-5 @md:p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="font-extrabold text-eu-yellow text-[length:var(--fs-14)] tracking-wide">Ο λογαριασμός μου</div>
          <h1 className="m-0 font-heading font-bold text-[length:var(--fs-28)] leading-tight">Καλώς ήρθες, {c.firstName}</h1>
          <p className="m-0 mt-1 text-eu-on-dark text-[length:var(--fs-15)]">
            {c.email} · {c.phone} · μέλος από {new Date(c.memberSince).getFullYear()}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/logariasmos/stoixeia" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[length:var(--fs-14)] px-4 min-h-11">
            <User className="size-4" aria-hidden /> Στοιχεία
          </Link>
          <Link href="/logariasmos/eidopoiiseis" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-[length:var(--fs-14)] px-4 min-h-11">
            <Bell className="size-4" aria-hidden /> Ειδοποιήσεις
          </Link>
          <Link href="/lista" className="inline-flex items-center gap-1.5 rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-14)] px-4 min-h-11 hover:bg-eu-yellow-dark">
            <Heart className="size-4" aria-hidden /> Η λίστα μου
          </Link>
        </div>
      </div>

      <ul className="m-0 p-0 list-none grid grid-cols-2 @xl:grid-cols-3 @5xl:grid-cols-6 gap-3">
        {tiles.map((t) => (
          <li key={t.t}>
            <Link href={t.h} className="block rounded-2xl bg-white border border-eu-line p-4 hover:border-eu-blue hover:shadow-[var(--shadow-card)] h-full">
              <t.icon className="size-5 text-eu-blue" aria-hidden />
              <div className="font-extrabold text-eu-ink text-[length:var(--fs-26)] leading-none mt-2">{t.n}</div>
              <div className="text-eu-muted text-[length:var(--fs-14)] mt-1">{t.t}</div>
            </Link>
          </li>
        ))}
      </ul>

      {active && (
        <section className="bg-white rounded-2xl border border-eu-line p-5 @md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-19)]">Η παραγγελία σου σε εξέλιξη</h2>
            <Link href={`/logariasmos/paraggelies/${active.number}`} className="inline-flex items-center gap-1 font-bold text-eu-blue text-[length:var(--fs-15)] hover:underline">
              Λεπτομέρειες <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <OrderTimeline order={active} />
        </section>
      )}

      <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-4">
        {nextAppt && (
          <section className="bg-white rounded-2xl border border-eu-line p-5 grid gap-2">
            <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)] inline-flex items-center gap-2">
              <CalendarClock className="size-5 text-eu-blue" aria-hidden /> Επόμενο ραντεβού
            </h2>
            <div className="font-bold text-eu-ink text-[length:var(--fs-16)]">{nextAppt.title}</div>
            <div className="text-eu-ink-2 text-[length:var(--fs-15)]">
              {new Date(nextAppt.date).toLocaleDateString("el-GR", { weekday: "long", day: "numeric", month: "long" })} · {nextAppt.slot}
              <br />
              {nextAppt.store}
              {nextAppt.technician ? ` · ${nextAppt.technician}` : ""}
            </div>
            <Link href="/logariasmos/rantevou" className="font-bold text-eu-blue text-[length:var(--fs-15)] hover:underline">
              Όλα τα ραντεβού →
            </Link>
          </section>
        )}
        {nextPlan && (
          <section className="bg-white rounded-2xl border border-eu-line p-5 grid gap-2">
            <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)] inline-flex items-center gap-2">
              <CreditCard className="size-5 text-eu-blue" aria-hidden /> Επόμενη δόση
            </h2>
            <div className="font-extrabold text-eu-ink text-[length:var(--fs-24)] leading-none">{priceLong(nextPlan.monthly)}</div>
            <div className="text-eu-ink-2 text-[length:var(--fs-15)]">
              {new Date(nextPlan.nextDate).toLocaleDateString("el-GR", { day: "numeric", month: "long" })} · {nextPlan.title}
              <br />
              {nextPlan.paid} από {nextPlan.months} δόσεις
            </div>
            <Link href="/logariasmos/pliromes" className="font-bold text-eu-blue text-[length:var(--fs-15)] hover:underline">
              Πληρωμές & δόσεις →
            </Link>
          </section>
        )}
      </div>

      <section className="bg-white rounded-2xl border border-eu-line p-5">
        <h2 className="m-0 font-bold text-eu-ink text-[length:var(--fs-17)] mb-3">Πρόσφατες παραγγελίες</h2>
        <ul className="m-0 p-0 list-none divide-y divide-eu-line-2">
          {orders.slice(0, 3).map((o) => (
            <li key={o.number} className="py-3 flex flex-wrap items-center gap-3">
              <div className="min-w-0 flex-1">
                <Link href={`/logariasmos/paraggelies/${o.number}`} className="font-bold text-eu-ink text-[length:var(--fs-15)] hover:text-eu-blue">
                  {o.number}
                </Link>
                <div className="text-eu-muted text-[length:var(--fs-14)] truncate">{o.lines.map((l) => l.title).join(", ")}</div>
              </div>
              <StatusChip status={o.status} />
              <span className="font-extrabold text-eu-ink text-[length:var(--fs-15)]">{priceLong(o.total)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

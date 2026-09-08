import type { Metadata } from "next";
import { getOrders } from "@/lib/data/repo";
import { ReturnForm } from "@/components/account/ReturnForm";

export const metadata: Metadata = { title: "Επιστροφές" };

export default async function ReturnsPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const [{ order }, orders] = await Promise.all([searchParams, getOrders()]);
  return (
    <div className="grid gap-4">
      <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Επιστροφές & υπαναχώρηση</h1>
      <p className="m-0 text-eu-ink-2 text-[length:var(--fs-15)]">14 ημερολογιακές ημέρες από την παραλαβή. Επιλέγεις παραγγελία, προϊόντα και λόγο· λαμβάνεις κωδικό RMA και οδηγίες.</p>
      <ReturnForm orders={orders.map((o) => ({ number: o.number, date: o.date, lines: o.lines.map((l) => ({ id: l.productId, title: `${l.brand} ${l.title}`, qty: l.qty })) }))} preselect={order} />
    </div>
  );
}

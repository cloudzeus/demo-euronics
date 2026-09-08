import type { Metadata } from "next";
import { getConsents } from "@/lib/data/repo";
import { ConsentsForm } from "@/components/account/ConsentsForm";

export const metadata: Metadata = { title: "Ειδοποιήσεις & συγκαταθέσεις" };

/** @dynamic /logariasmos/eidopoiiseis — consent ledger read; each toggle writes a ledger row. */
export default async function NotificationsPage() {
  const consents = await getConsents();
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-26)]">Ειδοποιήσεις & συγκαταθέσεις</h1>
        <p className="m-0 mt-1 text-eu-muted text-[length:var(--fs-15)]">Διάλεξε τι θέλεις να μαθαίνεις και από ποιο κανάλι. Οι ενημερώσεις παραγγελίας με email είναι απαραίτητες για την εκτέλεσή της.</p>
      </div>
      <ConsentsForm initial={consents} />
    </div>
  );
}

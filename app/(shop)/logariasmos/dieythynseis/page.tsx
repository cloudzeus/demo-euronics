import type { Metadata } from "next";
import { demoAddress } from "@/lib/data/fixtures/orders";

export const metadata: Metadata = { title: "Οι διευθύνσεις μου" };

export default function AddressesPage() {
  const a = demoAddress;
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-24)]">Διευθύνσεις</h1>
        <button type="button" className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12)] px-4 min-h-10 hover:bg-eu-blue">
          + Νέα διεύθυνση
        </button>
      </div>
      <ul className="m-0 p-0 list-none grid grid-cols-1 @md:grid-cols-2 gap-3">
        <li className="bg-white rounded-xl border-2 border-eu-blue p-4 text-[length:var(--fs-12-5)]">
          <div className="flex justify-between items-center mb-1">
            <span className="font-extrabold text-eu-ink">{a.label}</span>
            <span className="rounded-full bg-eu-chip text-eu-blue font-bold text-[length:var(--fs-10-5)] px-2 py-0.5">Προεπιλογή</span>
          </div>
          <p className="m-0 text-eu-ink-2">
            {a.firstName} {a.lastName}
            <br />
            {a.street} {a.number}, {a.floor}
            <br />
            {a.zip} {a.city}, {a.region}
            <br />
            {a.phone}
          </p>
          <div className="flex gap-3 mt-3 text-[length:var(--fs-12)] font-bold">
            <button type="button" className="text-eu-blue hover:underline">
              Επεξεργασία
            </button>
            <button type="button" className="text-eu-muted hover:text-eu-red">
              Διαγραφή
            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

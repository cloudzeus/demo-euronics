"use client";

import { useState } from "react";

type O = { number: string; date: string; lines: { id: string; title: string; qty: number }[] };
const input = "rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-13)] w-full";
const label = "grid gap-1 text-[length:var(--fs-12)] font-semibold text-eu-ink";

/** Online RMA — the current site handles returns only by email/phone. */
export function ReturnForm({ orders, preselect }: { orders: O[]; preselect?: string }) {
  const [no, setNo] = useState(preselect ?? orders[0]?.number ?? "");
  const [items, setItems] = useState<string[]>([]);
  const [done, setDone] = useState<string | null>(null);
  const o = orders.find((x) => x.number === no);
  if (done)
    return (
      <div className="bg-eu-green/10 border border-eu-green/30 rounded-xl p-5 text-[length:var(--fs-13)] text-eu-ink-2">
        <div className="font-extrabold text-eu-ink text-[length:var(--fs-16)] mb-1">Αίτημα καταχωρήθηκε · RMA {done}</div>
        Στείλαμε οδηγίες στο email σου. Μπορείς να παραδώσεις το προϊόν σε οποιοδήποτε κατάστημα Euronics ή να ζητήσεις παραλαβή από courier. Η επιστροφή χρημάτων γίνεται εντός 14 ημερών από την παραλαβή.
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(`RMA-${Date.now().toString().slice(-6)}`);
      }}
      className="bg-white rounded-xl border border-eu-line p-5 grid gap-4"
    >
      <label className={label}>
        Παραγγελία
        <select value={no} onChange={(e) => { setNo(e.target.value); setItems([]); }} className={input}>
          {orders.map((x) => (
            <option key={x.number} value={x.number}>
              {x.number} · {new Date(x.date).toLocaleDateString("el-GR")}
            </option>
          ))}
        </select>
      </label>
      <fieldset className="m-0 p-0 border-0 grid gap-1.5">
        <legend className="font-semibold text-eu-ink text-[length:var(--fs-12)] mb-1">Προϊόντα προς επιστροφή</legend>
        {o?.lines.map((l) => (
          <label key={l.id} className="flex items-center gap-2 rounded-md border border-eu-line p-2.5 text-[length:var(--fs-12-5)] cursor-pointer">
            <input type="checkbox" checked={items.includes(l.id)} onChange={() => setItems((s) => (s.includes(l.id) ? s.filter((x) => x !== l.id) : [...s, l.id]))} className="size-4 accent-eu-blue" />
            {l.qty} × {l.title}
          </label>
        ))}
      </fieldset>
      <label className={label}>
        Λόγος
        <select className={input}>
          <option>Άλλαξα γνώμη (υπαναχώρηση 14 ημερών)</option>
          <option>Ελαττωματικό κατά την παραλαβή (DOA)</option>
          <option>Λάθος προϊόν</option>
          <option>Ζημιά στη μεταφορά</option>
        </select>
      </label>
      <label className={label}>
        Τρόπος επιστροφής
        <select className={input}>
          <option>Παράδοση σε κατάστημα Euronics (δωρεάν)</option>
          <option>Παραλαβή από courier (χρέωση 5,90 €, δωρεάν για DOA/λάθος)</option>
        </select>
      </label>
      <label className={label}>
        Σχόλια <textarea rows={3} className="rounded-md border border-eu-line bg-white px-3 py-2 text-[length:var(--fs-13)]" />
      </label>
      <button type="submit" disabled={items.length === 0} className="justify-self-start rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13)] px-5 min-h-11 hover:bg-eu-blue disabled:opacity-40">
        Υποβολή αιτήματος
      </button>
    </form>
  );
}

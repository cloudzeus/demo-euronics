"use client";

import { useState } from "react";

const input = "rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-13)] w-full";
const label = "grid gap-1 text-[length:var(--fs-12)] font-semibold text-eu-ink";

export function ContactForm() {
  const [done, setDone] = useState(false);
  if (done)
    return (
      <div className="bg-eu-green/10 border border-eu-green/30 rounded-xl p-5 text-[length:var(--fs-13)] text-eu-ink-2">
        <div className="font-extrabold text-eu-ink text-[length:var(--fs-16)] mb-1">Λάβαμε το μήνυμά σου</div>
        Απαντάμε εντός 1 εργάσιμης ημέρας. Για επείγον, κάλεσε στο 210 483 5143.
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="bg-white rounded-xl border border-eu-line p-5 grid gap-3"
    >
      <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
        <label className={label}>
          Ονοματεπώνυμο <input required className={input} autoComplete="name" />
        </label>
        <label className={label}>
          Email <input type="email" required className={input} autoComplete="email" />
        </label>
        <label className={label}>
          Τηλέφωνο <input type="tel" className={input} autoComplete="tel" />
        </label>
        <label className={label}>
          Θέμα
          <select className={input}>
            <option>Ερώτηση για παραγγελία</option>
            <option>Τεχνική ερώτηση για προϊόν</option>
            <option>Service / εγγύηση</option>
            <option>Επιστροφή</option>
            <option>Τηλεφωνική παραγγελία</option>
            <option>Άλλο</option>
          </select>
        </label>
      </div>
      <label className={label}>
        Αριθμός παραγγελίας (προαιρετικά) <input className={input} placeholder="EUR-…" />
      </label>
      <label className={label}>
        Μήνυμα <textarea required rows={5} className="rounded-md border border-eu-line bg-white px-3 py-2 text-[length:var(--fs-13)]" />
      </label>
      <label className="flex items-start gap-2 text-[length:var(--fs-12)] text-eu-ink-2 cursor-pointer">
        <input type="checkbox" required className="mt-0.5 size-4 accent-eu-blue" /> Συμφωνώ με την επεξεργασία των στοιχείων μου για την απάντηση στο αίτημά μου (πολιτική απορρήτου).
      </label>
      <button type="submit" className="justify-self-start rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13)] px-6 min-h-11 hover:bg-eu-blue">
        Αποστολή
      </button>
    </form>
  );
}

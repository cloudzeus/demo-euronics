"use client";

import { useState } from "react";
import { priceLong } from "@/lib/format";

/** Book a service appointment (installation, service, consultation) — demo submit. */
export function ServiceBooking({ service }: { service: { slug: string; title: string; priceFrom?: number } }) {
  const [done, setDone] = useState(false);
  const input = "rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-15)] w-full";
  if (done)
    return (
      <div className="bg-eu-green/10 border border-eu-green/30 rounded-xl p-4 text-[length:var(--fs-15)] text-eu-ink-2">
        <div className="font-extrabold text-eu-ink mb-1">Το αίτημα καταχωρήθηκε</div>
        Το κατάστημα της περιοχής σου θα σε καλέσει εντός 24 ωρών για ραντεβού.
      </div>
    );
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
      className="bg-eu-navy text-white rounded-xl p-5 grid gap-3"
    >
      <div>
        <div className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] tracking-wide">Κράτηση</div>
        <div className="font-bold text-[length:var(--fs-17)]">{service.title}</div>
        {service.priceFrom && <div className="text-eu-on-dark text-[length:var(--fs-14)]">από {priceLong(service.priceFrom)} · η τελική τιμή επιβεβαιώνεται τηλεφωνικά</div>}
      </div>
      <input required placeholder="Ονοματεπώνυμο" className={input} />
      <input required type="tel" placeholder="Κινητό" className={input} />
      <input required placeholder="Τ.Κ. ή πόλη" className={input} />
      <button type="submit" className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-15)] py-3 min-h-11 hover:bg-eu-yellow-dark">
        Κλείσε ραντεβού
      </button>
    </form>
  );
}

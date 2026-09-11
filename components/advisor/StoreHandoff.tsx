"use client";

import { useState } from "react";
import { Phone, MessageCircle, Check, X, MapPin } from "lucide-react";

/**
 * @dynamic Hand-off to a human at the nearest member store: the store card
 * (photo, name, distance, hours), «Να με πάρουν» with name + phone, or
 * chat. The conversation summary travels with the request so the seller
 * does not start from zero. Demo: local confirmation; production: lead in
 * SoftOne (TRDR + SRVJOB) and notification to the store's tablet/phone.
 */
export function StoreHandoff({ summary, onClose }: { summary: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [done, setDone] = useState(false);
  return (
    <div className="absolute inset-0 z-10 bg-white grid grid-rows-[auto_minmax(0,1fr)] rounded-3xl overflow-hidden">
      <div className="relative bg-eu-blue text-white p-4 flex items-start gap-3">
        <div className="size-12 shrink-0 rounded-xl bg-[url(/img/store-front.jpg)] bg-cover bg-center" aria-hidden />
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] tracking-wide uppercase">Το κατάστημά σου</div>
          <div className="font-heading font-bold text-[length:var(--fs-17)] leading-tight">ΜΠΡΙΛΑΚΗ ΑΦΟΙ Ε.Ε.</div>
          <div className="text-eu-on-dark-2 text-[length:var(--fs-14)] inline-flex items-center gap-1">
            <MapPin className="size-3.5" aria-hidden /> 3,6 km · ανοιχτό έως 21:00
          </div>
        </div>
        <button type="button" onClick={onClose} aria-label="Πίσω" className="size-11 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 shrink-0">
          <X className="size-5" aria-hidden />
        </button>
      </div>
      {done ? (
        <div className="p-6 grid gap-3 content-center text-center">
          <span className="mx-auto size-14 rounded-full bg-eu-green text-white inline-flex items-center justify-center">
            <Check className="size-7" aria-hidden />
          </span>
          <div className="font-heading font-bold text-eu-ink text-[length:var(--fs-20)]">Ο Νίκος θα σε πάρει σε λίγα λεπτά</div>
          <p className="m-0 text-eu-ink-3 text-[length:var(--fs-15)]">Έχει ήδη τη συνομιλία σου: «{summary.slice(0, 80)}{summary.length > 80 ? "…" : ""}».</p>
          <button type="button" onClick={onClose} className="mx-auto rounded-full bg-eu-navy text-white font-extrabold px-6 min-h-12 text-[length:var(--fs-15)]">
            Εντάξει
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
          className="p-4 grid gap-3 content-start overflow-y-auto"
        >
          <div className="rounded-xl bg-eu-surface p-3 text-[length:var(--fs-14)] text-eu-ink-2">
            <span className="font-bold text-eu-ink">Θα πάρει τη συνομιλία σου:</span> {summary}
          </div>
          <label className="grid gap-1">
            <span className="font-bold text-eu-ink text-[length:var(--fs-14)]">Όνομα</span>
            <input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="rounded-xl border-2 border-eu-line px-3 min-h-12 text-[length:var(--fs-16)] outline-none focus:border-eu-blue" />
          </label>
          <label className="grid gap-1">
            <span className="font-bold text-eu-ink text-[length:var(--fs-14)]">Κινητό</span>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" inputMode="tel" autoComplete="tel" className="rounded-xl border-2 border-eu-line px-3 min-h-12 text-[length:var(--fs-16)] outline-none focus:border-eu-blue" />
          </label>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-eu-yellow text-eu-navy font-extrabold min-h-12 text-[length:var(--fs-15)] hover:bg-eu-yellow-dark">
              <Phone className="size-4" aria-hidden /> Να με πάρουν
            </button>
            <button type="button" onClick={() => setDone(true)} className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-eu-navy text-eu-navy font-extrabold min-h-12 text-[length:var(--fs-15)] hover:bg-eu-surface">
              <MessageCircle className="size-4" aria-hidden /> Chat
            </button>
          </div>
          <p className="m-0 text-eu-muted text-[length:var(--fs-14)]">Τα στοιχεία πάνε μόνο στο κατάστημα, για αυτή την κλήση.</p>
        </form>
      )}
    </div>
  );
}

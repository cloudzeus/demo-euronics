"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Landmark, Banknote, Smartphone, Store as StoreIcon, Truck, CalendarClock, ShieldCheck } from "lucide-react";
import { instalment, priceLong } from "@/lib/format";
import { useCart, type Fulfilment } from "@/components/commerce/CartProvider";
import { Stepper } from "./Stepper";

type StoreLite = { id: string; slug: string; name: string; city: string; address: string; zip: string; region: string; distanceKm: number; openUntil: string };
type Pay = "card" | "no-card" | "iris" | "bank" | "cod" | "store";

const REGIONS = ["Αττική", "Θεσσαλονίκη", "Αχαΐα", "Λάρισα", "Ηράκλειο", "Χανιά", "Δωδεκάνησα", "Ιωάννινα", "Μαγνησία", "Καβάλα", "Κέρκυρα", "Εύβοια", "Μεσσηνία", "Σέρρες", "Άλλη"];

/**
 * Checkout in three screens on one route: (2) στοιχεία & παράδοση,
 * (3) πληρωμή, then a mock SCA step and the confirmation page. Guest by
 * default; account optional at the end. Invoice with ΑΦΜ lookup (mock
 * ΑΑΔΕ). Directive 2011/83: full total before the «Παραγγελία με
 * υποχρέωση πληρωμής» button.
 */
export function Checkout({ stores }: { stores: StoreLite[] }) {
  const router = useRouter();
  const { lines, subtotal, addonsTotal, hydrated, clear } = useCart();
  const [step, setStep] = useState<2 | 3>(2);
  const [f, setF] = useState({ firstName: "", lastName: "", email: "", phone: "", street: "", number: "", floor: "", city: "", zip: "", region: "Αττική", notes: "", invoice: false, vat: "", company: "", doy: "", activity: "", createAccount: false, password: "", newsletter: false, terms: false, recycle: false });
  const [ful, setFul] = useState<Fulfilment>("courier");
  const [storeId, setStoreId] = useState(stores[0]?.id ?? "");
  const [slot, setSlot] = useState("morning");
  const [pay, setPay] = useState<Pay>("card");
  const [inst, setInst] = useState(1);
  const [sca, setSca] = useState<"idle" | "pending" | "ok">("idle");
  const [vatLookup, setVatLookup] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [err, setErr] = useState<string | null>(null);

  const goods = subtotal + addonsTotal;
  const heavy = lines.some((l) => l.product.installation);
  const shipping = ful !== "courier" ? (ful === "appointment" ? 0 : 0) : goods >= 100 ? 0 : 4.9;
  const codFee = pay === "cod" ? 2 : 0;
  const total = goods + shipping + codFee;
  const maxInst = total >= 800 ? 24 : total >= 400 ? 12 : total >= 200 ? 6 : total >= 100 ? 3 : 1;
  const store = stores.find((s) => s.id === storeId);

  const set = (k: keyof typeof f, v: string | boolean) => setF((s) => ({ ...s, [k]: v }));

  const lookupVat = () => {
    if (!/^\d{9}$/.test(f.vat)) {
      setVatLookup("err");
      return;
    }
    setVatLookup("loading");
    setTimeout(() => {
      setF((s) => ({ ...s, company: s.company || "ΠΑΠΑΔΟΠΟΥΛΟΣ Ι. & ΣΙΑ Ο.Ε.", doy: s.doy || "Αθηνών Α΄", activity: s.activity || "Λιανικό εμπόριο" }));
      setVatLookup("ok");
    }, 700);
  };

  const validStep2 = useMemo(() => {
    if (!f.firstName || !f.lastName || !/\S+@\S+\.\S+/.test(f.email) || !/^\d{10}$/.test(f.phone.replace(/\s/g, ""))) return false;
    if (ful !== "click-collect" && (!f.street || !f.number || !f.city || !/^\d{5}$/.test(f.zip))) return false;
    if (f.invoice && !/^\d{9}$/.test(f.vat)) return false;
    return true;
  }, [f, ful]);

  const submit = () => {
    if (!f.terms) {
      setErr("Πρέπει να αποδεχτείς τους όρους χρήσης.");
      return;
    }
    setErr(null);
    if (pay === "card" || pay === "no-card") {
      setSca("pending");
      setTimeout(() => {
        setSca("ok");
        finish();
      }, 1800);
    } else finish();
  };
  const finish = () => {
    const no = `EUR-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const order = { number: no, date: new Date().toISOString(), lines: lines.map((l) => ({ id: l.product.id, title: l.product.title, brand: l.product.brand, image: l.product.image, qty: l.qty, unitPrice: l.product.price, addons: l.addons, variant: l.variant })), total, shipping, goods, pay, inst, ful, store: store ? `${store.name} — ${store.address}, ${store.city}` : null, slot, address: { ...f, password: "" }, recycle: f.recycle };
    try {
      localStorage.setItem("euronics.lastOrder", JSON.stringify(order));
    } catch {}
    clear();
    router.push(`/checkout/epityxia?no=${no}`);
  };

  if (!hydrated) return <div className="eu-canvas eu-gutter py-12 text-eu-muted">Φόρτωση…</div>;
  if (lines.length === 0)
    return (
      <div className="eu-canvas eu-gutter py-10">
        <Stepper step={2} />
        <div className="rounded-lg bg-eu-surface p-8 text-center">
          <p className="m-0 text-eu-ink font-bold text-[length:var(--fs-15)]">Το καλάθι σου είναι άδειο.</p>
          <Link href="/proionta" className="inline-flex mt-4 rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-12-5)] px-5 min-h-11 items-center">
            Δες τα προϊόντα
          </Link>
        </div>
      </div>
    );

  const input = "rounded-md border border-eu-line bg-white px-3 py-2.5 min-h-11 text-[length:var(--fs-13)] w-full outline-none focus-visible:ring-2 ring-eu-blue";
  const label = "grid gap-1 text-[length:var(--fs-12)] font-semibold text-eu-ink";

  return (
    <div className="eu-canvas eu-gutter pb-12">
      <Stepper step={step} />
      <div className="grid grid-cols-1 @lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <div className="min-w-0 grid gap-5">
          {step === 2 && (
            <>
              <section className="bg-white rounded-xl border border-eu-line p-5 grid gap-3">
                <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)]">Στοιχεία επικοινωνίας</h1>
                <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                  <label className={label}>
                    Όνομα <input required value={f.firstName} onChange={(e) => set("firstName", e.target.value)} className={input} autoComplete="given-name" />
                  </label>
                  <label className={label}>
                    Επώνυμο <input required value={f.lastName} onChange={(e) => set("lastName", e.target.value)} className={input} autoComplete="family-name" />
                  </label>
                  <label className={label}>
                    Email <input type="email" required value={f.email} onChange={(e) => set("email", e.target.value)} className={input} autoComplete="email" />
                  </label>
                  <label className={label}>
                    Κινητό <input type="tel" required value={f.phone} onChange={(e) => set("phone", e.target.value)} className={input} autoComplete="tel" placeholder="69xxxxxxxx" />
                  </label>
                </div>
                <p className="m-0 text-eu-muted text-[length:var(--fs-11)]">Ολοκληρώνεις ως επισκέπτης. Λογαριασμός προαιρετικά στο τέλος.</p>
              </section>

              <section className="bg-white rounded-xl border border-eu-line p-5 grid gap-3">
                <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)]">Τρόπος παράδοσης</h2>
                <div className="grid grid-cols-1 @md:grid-cols-3 gap-2">
                  {(
                    [
                      ["courier", <Truck key="t" className="size-5" aria-hidden />, "Παράδοση στη διεύθυνσή μου", goods >= 100 ? "Δωρεάν · 1–3 εργάσιμες" : "4,90 € · 1–3 εργάσιμες"],
                      ["click-collect", <StoreIcon key="s" className="size-5" aria-hidden />, "Παραλαβή από κατάστημα", "Δωρεάν · σε 2 ώρες αν υπάρχει απόθεμα"],
                      ["appointment", <CalendarClock key="c" className="size-5" aria-hidden />, "Παράδοση με ραντεβού", heavy ? "Δωρεάν · με εγκατάσταση" : "Δωρεάν από 100 € · επιλογή ημέρας"],
                    ] as const
                  ).map(([v, icon, t, sub]) => (
                    <label key={v} className={`rounded-lg border-2 p-3 cursor-pointer grid gap-1 ${ful === v ? "border-eu-blue bg-eu-chip" : "border-eu-line hover:border-eu-blue"}`}>
                      <span className="flex items-center gap-2 font-bold text-eu-ink text-[length:var(--fs-12-5)]">
                        <input type="radio" name="ful" checked={ful === v} onChange={() => setFul(v)} className="accent-eu-blue" />
                        {icon} {t}
                      </span>
                      <span className="text-eu-muted text-[length:var(--fs-11)] pl-6">{sub}</span>
                    </label>
                  ))}
                </div>

                {ful === "click-collect" ? (
                  <div className="grid gap-2">
                    <label className={label}>
                      Κατάστημα
                      <select value={storeId} onChange={(e) => setStoreId(e.target.value)} className={input}>
                        {stores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.city} — {s.name} · {s.address} ({s.distanceKm} km)
                          </option>
                        ))}
                      </select>
                    </label>
                    {store && <p className="m-0 text-eu-ink-2 text-[length:var(--fs-12)]">{store.address}, {store.zip} {store.city} · ανοιχτό έως {store.openUntil} · Λαμβάνεις SMS όταν είναι έτοιμη.</p>}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 @sm:grid-cols-6 gap-3">
                    <label className={`${label} @sm:col-span-4`}>
                      Οδός <input required value={f.street} onChange={(e) => set("street", e.target.value)} className={input} autoComplete="address-line1" placeholder="Αρχίζεις να γράφεις και προτείνουμε διεύθυνση" />
                    </label>
                    <label className={`${label} @sm:col-span-1`}>
                      Αριθμός <input required value={f.number} onChange={(e) => set("number", e.target.value)} className={input} />
                    </label>
                    <label className={`${label} @sm:col-span-1`}>
                      Όροφος <input value={f.floor} onChange={(e) => set("floor", e.target.value)} className={input} />
                    </label>
                    <label className={`${label} @sm:col-span-2`}>
                      Πόλη <input required value={f.city} onChange={(e) => set("city", e.target.value)} className={input} autoComplete="address-level2" />
                    </label>
                    <label className={`${label} @sm:col-span-2`}>
                      Τ.Κ. <input required inputMode="numeric" value={f.zip} onChange={(e) => set("zip", e.target.value)} className={input} autoComplete="postal-code" />
                    </label>
                    <label className={`${label} @sm:col-span-2`}>
                      Νομός
                      <select value={f.region} onChange={(e) => set("region", e.target.value)} className={input}>
                        {REGIONS.map((r) => (
                          <option key={r}>{r}</option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
                {ful === "appointment" && (
                  <div className="grid gap-1.5">
                    <div className="font-semibold text-eu-ink text-[length:var(--fs-12)]">Προτίμηση ώρας</div>
                    <div className="flex flex-wrap gap-2">
                      {[["morning", "Πρωί 09:00–13:00"], ["noon", "Μεσημέρι 13:00–17:00"], ["evening", "Απόγευμα 17:00–20:00"]].map(([v, t]) => (
                        <label key={v} className={`rounded-full border-2 px-3 py-2 min-h-10 text-[length:var(--fs-12)] font-semibold cursor-pointer ${slot === v ? "border-eu-navy bg-eu-navy text-white" : "border-eu-line"}`}>
                          <input type="radio" name="slot" className="sr-only" checked={slot === v} onChange={() => setSlot(v)} />
                          {t}
                        </label>
                      ))}
                    </div>
                    <p className="m-0 text-eu-muted text-[length:var(--fs-11)]">Ο τεχνικός του καταστήματος σε καλεί εντός 24 ωρών για την ακριβή ημέρα.</p>
                  </div>
                )}
                {heavy && (
                  <label className="flex items-start gap-2 rounded-lg bg-eu-surface p-3 text-[length:var(--fs-12)] text-eu-ink-2 cursor-pointer">
                    <input type="checkbox" checked={f.recycle} onChange={(e) => set("recycle", e.target.checked)} className="mt-0.5 size-4 accent-eu-blue" />
                    <span>
                      <strong className="text-eu-ink">Παραλαβή παλιάς συσκευής για ανακύκλωση (ΑΗΗΕ) — δωρεάν.</strong> Την παραλαμβάνουμε κατά την παράδοση, σύμφωνα με την Οδηγία 2012/19/ΕΕ.
                    </span>
                  </label>
                )}
                <label className={label}>
                  Σχόλια παραγγελίας <textarea value={f.notes} onChange={(e) => set("notes", e.target.value)} rows={2} className="rounded-md border border-eu-line bg-white px-3 py-2 text-[length:var(--fs-13)]" placeholder="π.χ. κουδούνι, ώρες παρουσίας" />
                </label>
              </section>

              <section className="bg-white rounded-xl border border-eu-line p-5 grid gap-3">
                <label className="flex items-center gap-2 font-bold text-eu-ink text-[length:var(--fs-13)] cursor-pointer">
                  <input type="checkbox" checked={f.invoice} onChange={(e) => set("invoice", e.target.checked)} className="size-4 accent-eu-blue" /> Θέλω τιμολόγιο (ΑΦΜ και ΔΟΥ)
                </label>
                {f.invoice && (
                  <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                    <label className={label}>
                      ΑΦΜ
                      <div className="flex gap-1.5">
                        <input required inputMode="numeric" value={f.vat} onChange={(e) => set("vat", e.target.value)} className={input} maxLength={9} />
                        <button type="button" onClick={lookupVat} className="rounded-md bg-eu-navy text-white font-bold text-[length:var(--fs-12)] px-3 min-h-11 shrink-0 hover:bg-eu-blue">
                          {vatLookup === "loading" ? "…" : "Αναζήτηση ΑΑΔΕ"}
                        </button>
                      </div>
                      {vatLookup === "ok" && <span className="text-eu-green font-semibold text-[length:var(--fs-11)]">Βρέθηκε στο μητρώο ΑΑΔΕ — τα στοιχεία συμπληρώθηκαν.</span>}
                      {vatLookup === "err" && <span className="text-eu-red font-semibold text-[length:var(--fs-11)]">Ο ΑΦΜ πρέπει να έχει 9 ψηφία.</span>}
                    </label>
                    <label className={label}>
                      Επωνυμία <input value={f.company} onChange={(e) => set("company", e.target.value)} className={input} />
                    </label>
                    <label className={label}>
                      ΔΟΥ <input value={f.doy} onChange={(e) => set("doy", e.target.value)} className={input} />
                    </label>
                    <label className={label}>
                      Δραστηριότητα <input value={f.activity} onChange={(e) => set("activity", e.target.value)} className={input} />
                    </label>
                  </div>
                )}
              </section>

              <div className="flex justify-between items-center gap-3">
                <Link href="/kalathi" className="font-bold text-eu-blue text-[length:var(--fs-12-5)] hover:underline">
                  ← Πίσω στο καλάθι
                </Link>
                <button type="button" disabled={!validStep2} onClick={() => setStep(3)} className="rounded-full bg-eu-navy text-white font-extrabold text-[length:var(--fs-13-5)] px-6 min-h-12 hover:bg-eu-blue disabled:opacity-40">
                  Συνέχεια στην πληρωμή →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <section className="bg-white rounded-xl border border-eu-line p-5 grid gap-3">
                <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-21)]">Τρόπος πληρωμής</h1>
                <div className="grid gap-2">
                  {(
                    [
                      ["card", <CreditCard key="c" className="size-5" aria-hidden />, "Κάρτα (Visa, Mastercard, Maestro, Amex)", `Άτοκες δόσεις έως ${maxInst}${maxInst > 1 ? " · 3D Secure" : ""}`],
                      ["no-card", <Smartphone key="n" className="size-5" aria-hidden />, "Δόσεις χωρίς κάρτα · Eurobank", total >= 200 && total <= 2000 ? `Έως 24 μήνες · από ${priceLong(instalment(total, 24))}/μήνα · online έγκριση` : "Για αγορές 200–2.000 €"],
                      ["iris", <Smartphone key="i" className="size-5" aria-hidden />, "IRIS", "Άμεση πληρωμή από το mobile banking, χωρίς προμήθεια"],
                      ["bank", <Landmark key="b" className="size-5" aria-hidden />, "Κατάθεση σε τράπεζα", "Εθνική, Πειραιώς, Eurobank, Alpha · κράτηση αποθέματος 48 ώρες"],
                      ["cod", <Banknote key="d" className="size-5" aria-hidden />, "Αντικαταβολή", total <= 500 ? "Μετρητά ή κάρτα στον διανομέα · +2,00 €" : "Διαθέσιμη έως 500 €"],
                      ...(ful === "click-collect" ? [["store", <StoreIcon key="s" className="size-5" aria-hidden />, "Πληρωμή στο κατάστημα", "Μετρητά ή κάρτα κατά την παραλαβή"] as const] : []),
                    ] as const
                  ).map(([v, icon, t, sub]) => {
                    const disabled = (v === "no-card" && (total < 200 || total > 2000)) || (v === "cod" && total > 500);
                    return (
                      <label key={v} className={`rounded-lg border-2 p-3 grid gap-1 ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${pay === v ? "border-eu-blue bg-eu-chip" : "border-eu-line hover:border-eu-blue"}`}>
                        <span className="flex items-center gap-2 font-bold text-eu-ink text-[length:var(--fs-12-5)]">
                          <input type="radio" name="pay" disabled={disabled} checked={pay === v} onChange={() => setPay(v as Pay)} className="accent-eu-blue" />
                          {icon} {t}
                        </span>
                        <span className="text-eu-muted text-[length:var(--fs-11)] pl-6">{sub}</span>
                      </label>
                    );
                  })}
                </div>
                {pay === "card" && (
                  <div className="grid gap-3 rounded-lg bg-eu-surface p-4">
                    <div className="grid grid-cols-1 @sm:grid-cols-2 gap-3">
                      <label className={`${label} @sm:col-span-2`}>
                        Αριθμός κάρτας <input inputMode="numeric" placeholder="•••• •••• •••• 4821" className={input} autoComplete="cc-number" />
                      </label>
                      <label className={label}>
                        Λήξη <input placeholder="MM/YY" className={input} autoComplete="cc-exp" />
                      </label>
                      <label className={label}>
                        CVC <input inputMode="numeric" placeholder="•••" className={input} autoComplete="cc-csc" />
                      </label>
                    </div>
                    {maxInst > 1 && (
                      <label className={label}>
                        Δόσεις
                        <select value={inst} onChange={(e) => setInst(Number(e.target.value))} className={input}>
                          {[1, 3, 6, 12, 24].filter((n) => n <= maxInst).map((n) => (
                            <option key={n} value={n}>
                              {n === 1 ? "Εφάπαξ" : `${n} άτοκες × ${priceLong(instalment(total, n))}`}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    <p className="m-0 text-eu-muted text-[length:var(--fs-10-5)] flex items-center gap-1">
                      <ShieldCheck className="size-3.5 text-eu-green" aria-hidden /> Τα στοιχεία κάρτας δεν αποθηκεύονται στη Euronics· η πληρωμή γίνεται στον πάροχο με 3D Secure (SCA).
                    </p>
                  </div>
                )}
                {pay === "no-card" && <p className="m-0 rounded-lg bg-eu-surface p-4 text-eu-ink-2 text-[length:var(--fs-12)]">Θα μεταφερθείς στο ασφαλές περιβάλλον της Eurobank για online αίτηση με τους κωδικούς e-banking σου. Έγκριση σε λίγα λεπτά· η παραγγελία εκτελείται μετά την έγκριση.</p>}
                {pay === "bank" && <p className="m-0 rounded-lg bg-eu-surface p-4 text-eu-ink-2 text-[length:var(--fs-12)]">Οι λογαριασμοί (Εθνική, Πειραιώς, Eurobank, Alpha) θα σου σταλούν με το email επιβεβαίωσης. Αιτιολογία: ο αριθμός παραγγελίας. Το απόθεμα κρατείται 48 ώρες.</p>}
              </section>

              <section className="bg-white rounded-xl border border-eu-line p-5 grid gap-2">
                <h2 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-17)]">Λογαριασμός (προαιρετικά)</h2>
                <label className="flex items-center gap-2 text-[length:var(--fs-12-5)] text-eu-ink-2 cursor-pointer">
                  <input type="checkbox" checked={f.createAccount} onChange={(e) => set("createAccount", e.target.checked)} className="size-4 accent-eu-blue" /> Δημιούργησε λογαριασμό με το email {f.email || "μου"} για να βλέπω παραγγελίες, εγγυήσεις και επιστροφές
                </label>
                {f.createAccount && (
                  <label className={label}>
                    Κωδικός (τουλάχιστον 8 χαρακτήρες) <input type="password" value={f.password} onChange={(e) => set("password", e.target.value)} className={input} autoComplete="new-password" />
                  </label>
                )}
                <label className="flex items-center gap-2 text-[length:var(--fs-12-5)] text-eu-ink-2 cursor-pointer">
                  <input type="checkbox" checked={f.newsletter} onChange={(e) => set("newsletter", e.target.checked)} className="size-4 accent-eu-blue" /> Θέλω να λαμβάνω προσφορές με email (ξεχωριστή συγκατάθεση, μπορείς να τη σβήσεις ανά πάσα στιγμή)
                </label>
                <label className="flex items-start gap-2 text-[length:var(--fs-12-5)] text-eu-ink-2 cursor-pointer">
                  <input type="checkbox" checked={f.terms} onChange={(e) => set("terms", e.target.checked)} className="mt-0.5 size-4 accent-eu-blue" />
                  <span>
                    Έχω διαβάσει και αποδέχομαι τους{" "}
                    <Link href="/oroi-chrisis" className="text-eu-blue underline">
                      όρους χρήσης
                    </Link>{" "}
                    και την{" "}
                    <Link href="/aporrito" className="text-eu-blue underline">
                      πολιτική απορρήτου
                    </Link>
                    . Γνωρίζω το δικαίωμα υπαναχώρησης 14 ημερών.
                  </span>
                </label>
                {err && <p className="m-0 text-eu-red font-semibold text-[length:var(--fs-12)]">{err}</p>}
              </section>

              <div className="flex justify-between items-center gap-3">
                <button type="button" onClick={() => setStep(2)} className="font-bold text-eu-blue text-[length:var(--fs-12-5)] hover:underline">
                  ← Στοιχεία & παράδοση
                </button>
              </div>
            </>
          )}
        </div>

        <aside className="bg-eu-surface rounded-xl p-5 grid gap-3 @lg:sticky @lg:top-4">
          <h2 className="m-0 font-extrabold text-eu-ink text-[length:var(--fs-14)]">Η παραγγελία σου</h2>
          <ul className="m-0 p-0 list-none grid gap-2 max-h-[260px] overflow-y-auto">
            {lines.map((l) => (
              <li key={l.product.id + (l.variant ?? "")} className="flex gap-2 items-center">
                <div className="relative size-12 shrink-0 bg-white rounded-md">{l.product.image && <Image src={l.product.image} alt="" fill sizes="48px" className="object-contain p-1" unoptimized={l.product.image.startsWith("http")} />}</div>
                <div className="min-w-0 flex-1 text-[length:var(--fs-11-5)]">
                  <div className="font-bold text-eu-ink truncate">{l.product.title}</div>
                  <div className="text-eu-muted">
                    {l.qty} × {priceLong(l.product.price)}
                    {l.addons.map((a) => ` + ${a.title}`)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <dl className="m-0 grid gap-1 text-[length:var(--fs-12-5)] text-eu-ink-2 border-t border-eu-line pt-2">
            <div className="flex justify-between">
              <dt>Προϊόντα & υπηρεσίες</dt>
              <dd className="m-0 font-semibold">{priceLong(goods)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Μεταφορικά</dt>
              <dd className="m-0 font-semibold">{shipping === 0 ? "Δωρεάν" : priceLong(shipping)}</dd>
            </div>
            {codFee > 0 && (
              <div className="flex justify-between">
                <dt>Αντικαταβολή</dt>
                <dd className="m-0 font-semibold">{priceLong(codFee)}</dd>
              </div>
            )}
            <div className="flex justify-between text-eu-muted-2 text-[length:var(--fs-11)]">
              <dt>ΦΠΑ 24% (περιλαμβάνεται)</dt>
              <dd className="m-0">{priceLong(total - total / 1.24)}</dd>
            </div>
            <div className="flex justify-between border-t border-eu-line pt-2 mt-1 font-extrabold text-eu-ink text-[length:var(--fs-17)]">
              <dt>Σύνολο</dt>
              <dd className="m-0">{priceLong(total)}</dd>
            </div>
          </dl>
          {step === 3 && (
            <>
              <button type="button" onClick={submit} disabled={sca === "pending"} className="rounded-full bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-14)] py-3.5 min-h-12 hover:bg-eu-yellow-dark disabled:opacity-60">
                {sca === "pending" ? "Επιβεβαίωση από την τράπεζα (SCA)…" : "Παραγγελία με υποχρέωση πληρωμής"}
              </button>
              <p className="m-0 text-eu-muted text-[length:var(--fs-10-5)] leading-snug">Με το πάτημα του κουμπιού δεσμεύεσαι για την πληρωμή του συνολικού ποσού που αναγράφεται. Οδηγία 2011/83/ΕΕ.</p>
            </>
          )}
          {step === 2 && <p className="m-0 text-eu-muted text-[length:var(--fs-10-5)]">Τα μεταφορικά και τυχόν έξοδα πληρωμής εμφανίζονται πριν την οριστικοποίηση.</p>}
        </aside>
      </div>
    </div>
  );
}

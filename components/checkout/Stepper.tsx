/** 3-step checkout stepper: Καλάθι → Στοιχεία & παράδοση → Πληρωμή (+ επιβεβαίωση). */
export function Stepper({ step }: { step: 1 | 2 | 3 | 4 }) {
  const steps = ["Καλάθι", "Στοιχεία & παράδοση", "Πληρωμή", "Επιβεβαίωση"];
  return (
    <ol className="m-0 p-0 list-none flex items-center gap-2 py-5 text-[length:var(--fs-11-5)] overflow-x-auto eu-scrollbar-none" aria-label="Βήματα αγοράς">
      {steps.map((s, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "current" : "todo";
        return (
          <li key={s} className="flex items-center gap-2 shrink-0" aria-current={state === "current" ? "step" : undefined}>
            <span className={`size-7 rounded-full inline-flex items-center justify-center font-extrabold ${state === "done" ? "bg-eu-green text-white" : state === "current" ? "bg-eu-navy text-white" : "bg-eu-surface text-eu-muted-2"}`}>{state === "done" ? "✓" : n}</span>
            <span className={`font-semibold ${state === "todo" ? "text-eu-muted-2" : "text-eu-ink"}`}>{s}</span>
            {i < steps.length - 1 && <span className="w-6 @md:w-10 h-px bg-eu-line" aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}

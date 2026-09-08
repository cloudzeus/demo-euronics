import type { Product, Spec } from "@/lib/data/types";
import { EnergyChip } from "@/components/commerce/EnergyChip";

/** One grouped specification table (the current site prints a flat one twice). */
export function SpecsTable({ specs, energy }: { specs: Spec[]; energy?: Product["energy"] }) {
  const groups = new Map<string, Spec[]>();
  for (const s of specs) groups.set(s.group, [...(groups.get(s.group) ?? []), s]);
  return (
    <section className="mt-8" aria-labelledby="specs" id="specs">
      <div className="flex items-center justify-between mb-3">
        <h2 id="specs" className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-19)]">
          Χαρακτηριστικά
        </h2>
        {energy && (
          <div className="flex items-center gap-1.5 text-[length:var(--fs-11-5)] text-eu-muted">
            Ενεργειακή ετικέτα <EnergyChip cls={energy.cls} fiche={energy.fiche} />
          </div>
        )}
      </div>
      <div className="grid gap-4">
        {[...groups.entries()].map(([g, rows]) => (
          <div key={g} className="rounded-lg border border-eu-line overflow-hidden">
            <div className="bg-eu-surface px-4 py-2 font-extrabold text-eu-ink text-[length:var(--fs-12)] tracking-wide">{g}</div>
            <dl className="m-0 divide-y divide-eu-line-2">
              {rows.map((r) => (
                <div key={r.key} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-3 px-4 py-2 text-[length:var(--fs-12-5)]">
                  <dt className="text-eu-muted">{r.key}</dt>
                  <dd className="m-0 text-eu-ink font-semibold">{r.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </section>
  );
}

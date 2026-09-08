"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import type { ListResult } from "@/lib/data/repo";

/**
 * Facets live in the URL (?brand=lg,samsung&min=200&max=800&avail=in-stock
 * &sale=1&energy=A,B&sort=price-asc&page=2). Every selection is shareable,
 * bookmarkable and campaign-able — the current site keeps them in a hash.
 * Desktop: sidebar. Phones/tablets: a bottom sheet behind a «Φίλτρα» button.
 */
export function Facets({ result }: { result: ListResult }) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();

  const set = useCallback(
    (key: string, value: string | null) => {
      const next = new URLSearchParams(sp.toString());
      if (value === null || value === "") next.delete(key);
      else next.set(key, value);
      next.delete("page");
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [router, pathname, sp],
  );
  const toggleIn = (key: string, v: string) => {
    const cur = (sp.get(key) ?? "").split(",").filter(Boolean);
    const next = cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v];
    set(key, next.join(","));
  };
  const active: { key: string; label: string; value?: string }[] = [];
  (sp.get("brand") ?? "").split(",").filter(Boolean).forEach((b) => active.push({ key: "brand", label: result.brands.find((x) => x.slug === b)?.name ?? b, value: b }));
  (sp.get("energy") ?? "").split(",").filter(Boolean).forEach((e) => active.push({ key: "energy", label: `Κλάση ${e}`, value: e }));
  if (sp.get("avail")) active.push({ key: "avail", label: "Άμεσα διαθέσιμα" });
  if (sp.get("sale")) active.push({ key: "sale", label: "Σε προσφορά" });
  if (sp.get("min") || sp.get("max")) active.push({ key: "price", label: `€${sp.get("min") ?? result.priceRange[0]} – €${sp.get("max") ?? result.priceRange[1]}` });

  const clearAll = () => router.push(pathname, { scroll: false });

  const body = (
    <div className="grid gap-5">
      {active.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {active.map((a, i) => (
            <button
              key={i}
              type="button"
              onClick={() => (a.key === "price" ? (set("min", null), set("max", null)) : a.value ? toggleIn(a.key, a.value) : set(a.key, null))}
              className="inline-flex items-center gap-1 rounded-full bg-eu-chip text-eu-blue font-semibold text-[length:var(--fs-11)] px-2.5 py-1.5 hover:bg-eu-blue hover:text-white"
            >
              {a.label} <X className="size-3" aria-hidden />
            </button>
          ))}
          <button type="button" onClick={clearAll} className="text-eu-muted font-semibold text-[length:var(--fs-11)] px-2 hover:text-eu-red">
            Καθαρισμός όλων
          </button>
        </div>
      )}

      <Group title="Διαθεσιμότητα" open>
        <Check label="Άμεσα διαθέσιμα" checked={!!sp.get("avail")} onChange={() => set("avail", sp.get("avail") ? null : "in-stock")} />
        <Check label="Σε προσφορά" checked={!!sp.get("sale")} onChange={() => set("sale", sp.get("sale") ? null : "1")} />
      </Group>

      <Group title="Μάρκα" open>
        {result.brands.map((b) => (
          <Check key={b.slug} label={b.name} count={b.count} checked={(sp.get("brand") ?? "").split(",").includes(b.slug)} onChange={() => toggleIn("brand", b.slug)} />
        ))}
      </Group>

      <Group title="Τιμή" open>
        <PriceRange min={result.priceRange[0]} max={result.priceRange[1]} curMin={sp.get("min")} curMax={sp.get("max")} onApply={(a, b) => { set("min", a); set("max", b); }} />
      </Group>

      {result.energies.length > 0 && (
        <Group title="Ενεργειακή κλάση">
          {result.energies.map((e) => (
            <Check key={e.cls} label={`Κλάση ${e.cls}`} count={e.count} checked={(sp.get("energy") ?? "").split(",").includes(e.cls)} onChange={() => toggleIn("energy", e.cls)} />
          ))}
        </Group>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden @lg:block w-[250px] shrink-0" aria-label="Φίλτρα">
        {body}
      </aside>
      <div className="@lg:hidden">
        <Sheet>
          <SheetTrigger className="inline-flex items-center gap-2 rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-12-5)] px-4 min-h-11">
            <SlidersHorizontal className="size-4" aria-hidden /> Φίλτρα{active.length ? ` · ${active.length}` : ""}
          </SheetTrigger>
          <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto rounded-t-2xl p-5">
            <SheetTitle className="font-extrabold text-eu-ink text-[length:var(--fs-15)] mb-4">Φίλτρα</SheetTitle>
            {body}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}

function Group({ title, open = false, children }: { title: string; open?: boolean; children: React.ReactNode }) {
  const [o, setO] = useState(open);
  return (
    <div className="border-b border-eu-line-2 pb-3">
      <button type="button" aria-expanded={o} onClick={() => setO(!o)} className="w-full flex justify-between items-center font-extrabold text-eu-ink text-[length:var(--fs-12-5)] min-h-10">
        {title}
        <ChevronDown className={`size-4 transition-transform ${o ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {o && <div className="grid gap-1 mt-1">{children}</div>}
    </div>
  );
}

function Check({ label, count, checked, onChange }: { label: string; count?: number; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 text-eu-ink-2 text-[length:var(--fs-12-5)] min-h-9 cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} className="size-4 accent-eu-blue" />
      <span className="flex-1">{label}</span>
      {count != null && <span className="text-eu-muted-2 text-[length:var(--fs-11)]">{count}</span>}
    </label>
  );
}

function PriceRange({ min, max, curMin, curMax, onApply }: { min: number; max: number; curMin: string | null; curMax: string | null; onApply: (a: string | null, b: string | null) => void }) {
  const [a, setA] = useState(curMin ?? "");
  const [b, setB] = useState(curMax ?? "");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onApply(a || null, b || null);
      }}
      className="flex items-center gap-1.5"
    >
      <input inputMode="numeric" value={a} onChange={(e) => setA(e.target.value)} placeholder={String(Math.floor(min))} aria-label="Ελάχιστη τιμή" className="w-full min-w-0 rounded-md border border-eu-line px-2 py-2 text-[length:var(--fs-12-5)]" />
      <span className="text-eu-muted-2">–</span>
      <input inputMode="numeric" value={b} onChange={(e) => setB(e.target.value)} placeholder={String(Math.ceil(max))} aria-label="Μέγιστη τιμή" className="w-full min-w-0 rounded-md border border-eu-line px-2 py-2 text-[length:var(--fs-12-5)]" />
      <button type="submit" className="rounded-full bg-eu-navy text-white font-bold text-[length:var(--fs-11-5)] px-3 min-h-9 hover:bg-eu-blue">
        OK
      </button>
    </form>
  );
}

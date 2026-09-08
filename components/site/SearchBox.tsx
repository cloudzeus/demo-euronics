"use client";

import { useId, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { navCategories } from "@/lib/data/nav";

const PLACEHOLDER_FULL = "κλιματιστικό 12000 btu, πλυντήριο 9kg, LG OLED…";
const PLACEHOLDER_SHORT = "Ψάξε προϊόν, μάρκα ή κωδικό";

/**
 * Permanent search field with category scope. Autosuggest (four groups:
 * products, categories, brands, guides) is wired to /anazitisi.
 */
export function SearchBox({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const [scope, setScope] = useState("all");
  return (
    <form action="/anazitisi" role="search" className="flex bg-white rounded-full overflow-hidden min-w-0 shadow-[var(--shadow-card)]">
      <label htmlFor={`${id}-scope`} className="sr-only">
        Κατηγορία αναζήτησης
      </label>
      <div className={`relative shrink-0 bg-eu-chip text-eu-ink-3 font-semibold text-[length:var(--fs-15)] ${compact ? "hidden" : "flex"} items-center`}>
        <select
          id={`${id}-scope`}
          name="cat"
          value={scope}
          onChange={(e) => setScope(e.target.value)}
          className="appearance-none bg-transparent pl-3.5 pr-7 h-full min-h-11 outline-none cursor-pointer text-[length:var(--fs-15)]"
        >
          <option value="all">Κατηγορία</option>
          {navCategories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
        <ChevronDown className="size-3.5 absolute right-3 pointer-events-none" aria-hidden />
      </div>
      <label htmlFor={`${id}-q`} className="sr-only">
        Αναζήτηση προϊόντων
      </label>
      <input
        id={`${id}-q`}
        name="q"
        type="search"
        autoComplete="off"
        placeholder={compact ? PLACEHOLDER_SHORT : PLACEHOLDER_FULL}
        className="flex-1 min-w-0 px-4 py-3 text-eu-ink placeholder:text-eu-muted-2 text-[length:var(--fs-16)] outline-none bg-transparent"
      />
      <button
        type="submit"
        className="shrink-0 bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-15)] px-4 @md:px-[22px] flex items-center gap-2 hover:bg-eu-yellow-dark transition-colors min-h-11"
      >
        <Search className="size-4" aria-hidden />
        <span className={compact ? "sr-only" : "hidden @5xl:inline"}>Αναζήτηση</span>
      </button>
    </form>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, X, Clock, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { navCategories } from "@/lib/data/nav";
import type { SuggestResult } from "@/lib/data/repo";
import { priceShort, instalment, priceLong } from "@/lib/format";
import { ProductImage } from "@/components/commerce/ProductImage";

const PLACEHOLDER_FULL = "κλιματιστικό 12000 btu, πλυντήριο 9kg, LG OLED…";
const PLACEHOLDER_SHORT = "Ψάξε προϊόν, μάρκα ή κωδικό";
const RECENT_KEY = "euronics.recentSearches.v1";

/**
 * @dynamic Search with live results in four groups (products with photo
 * and price, categories with counts, brands, guides) from
 * /api/search — Meilisearch in production, same JSON. Empty state shows
 * recent + popular searches and the promoted product. Arrow keys move,
 * Enter opens, Esc closes; the form still submits to /anazitisi.
 */
export function SearchBox({ compact = false }: { compact?: boolean }) {
  const id = useId();
  const router = useRouter();
  const [scope, setScope] = useState("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [res, setRes] = useState<SuggestResult | null>(null);
  const [active, setActive] = useState(-1);
  const [recent, setRecent] = useState<string[]>([]);
  const box = useRef<HTMLDivElement>(null);
  const abort = useRef<AbortController | null>(null);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
      if (Array.isArray(saved) && saved.length) setTimeout(() => setRecent(saved), 0);
    } catch {}
  }, []);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => box.current && !box.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  useEffect(() => {
    if (!open) return;
    abort.current?.abort();
    const ac = new AbortController();
    abort.current = ac;
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q)}&cat=${scope}`, { signal: ac.signal });
        if (r.ok) {
          const data = (await r.json()) as SuggestResult;
          setRes(data);
          setActive(-1);
        }
      } catch {}
    }, q ? 140 : 0);
    return () => clearTimeout(t);
  }, [q, scope, open]);

  const remember = (term: string) => {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    setRecent(next);
    try {
      localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    } catch {}
  };
  const submitTo = (href: string, term?: string) => {
    if (term) remember(term);
    setOpen(false);
    router.push(href);
  };

  const items: { href: string; term?: string }[] = res
    ? q
      ? [...res.products.map((p) => ({ href: `/proion/${p.slug}`, term: q })), ...res.categories.map((c) => ({ href: c.href, term: q })), ...res.guides.map((g) => ({ href: `/odigoi/${g.slug}`, term: q }))]
      : [...recent.map((r) => ({ href: `/anazitisi?q=${encodeURIComponent(r)}`, term: r })), ...res.popular.map((r) => ({ href: `/anazitisi?q=${encodeURIComponent(r)}`, term: r }))]
    : [];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return setOpen(false);
    if (!open || items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(items.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(-1, a - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      submitTo(items[active].href, items[active].term);
    }
  };
  const hl = (text: string) => {
    if (!q) return text;
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return text;
    return (
      <>
        {text.slice(0, i)}
        <mark className="bg-eu-yellow/60 text-inherit rounded-sm px-0.5">{text.slice(i, i + q.length)}</mark>
        {text.slice(i + q.length)}
      </>
    );
  };
  let idx = -1;
  const row = (href: string, term: string | undefined, children: React.ReactNode) => {
    idx++;
    const i = idx;
    return (
      <Link href={href} onClick={() => term && remember(term)} onMouseEnter={() => setActive(i)} className={`block rounded-xl ${active === i ? "bg-eu-chip" : "hover:bg-eu-surface"}`}>
        {children}
      </Link>
    );
  };
  const avail = { "in-stock": ["bg-eu-green", "Άμεσα"], days: ["bg-eu-amber", "2–4 εργάσιμες"], order: ["bg-eu-muted", "Κατόπιν παραγγελίας"] } as const;
  const nothing = res && q && res.total === 0 && res.categories.length === 0 && res.brands.length === 0 && res.guides.length === 0;

  return (
    <div ref={box} className="relative min-w-0">
      <form action="/anazitisi" role="search" onSubmit={() => q && remember(q)} className={`flex bg-white rounded-full overflow-hidden min-w-0 shadow-[var(--shadow-card)] ${open ? "ring-2 ring-eu-yellow" : ""}`}>
        <label htmlFor={`${id}-scope`} className="sr-only">
          Κατηγορία αναζήτησης
        </label>
        <div className={`relative shrink-0 bg-eu-chip text-eu-ink-3 font-semibold text-[length:var(--fs-15)] ${compact ? "hidden" : "flex"} items-center`}>
          <select id={`${id}-scope`} name="cat" value={scope} onChange={(e) => setScope(e.target.value)} className="appearance-none bg-transparent pl-3.5 pr-7 h-full min-h-11 outline-none cursor-pointer text-[length:var(--fs-15)]">
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
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          aria-autocomplete="list"
          placeholder={compact ? PLACEHOLDER_SHORT : PLACEHOLDER_FULL}
          className="flex-1 min-w-0 px-4 py-3 text-eu-ink placeholder:text-eu-muted-2 text-[length:var(--fs-16)] outline-none bg-transparent"
        />
        {q && (
          <button type="button" aria-label="Καθαρισμός" onClick={() => setQ("")} className="shrink-0 px-2 text-eu-muted hover:text-eu-ink">
            <X className="size-4" aria-hidden />
          </button>
        )}
        <button type="submit" className="shrink-0 bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-15)] px-4 @md:px-[22px] flex items-center gap-2 hover:bg-eu-yellow-dark transition-colors min-h-11">
          <Search className="size-4" aria-hidden />
          <span className={compact ? "sr-only" : "hidden @5xl:inline"}>Αναζήτηση</span>
        </button>
      </form>

      {open && res && (
        <div id={`${id}-panel`} role="listbox" className={`absolute z-50 top-[calc(100%+8px)] left-0 bg-white text-eu-ink rounded-2xl shadow-[var(--shadow-overlay)] border border-eu-line overflow-hidden eu-container ${compact ? "right-0" : "w-[min(900px,calc(100vw-2rem))]"}`}>
          {nothing ? (
            <div className="p-6 grid gap-2">
              <div className="font-bold text-eu-ink text-[length:var(--fs-16)]">Δεν βρέθηκε κάτι για «{q}»</div>
              <p className="m-0 text-eu-muted text-[length:var(--fs-15)]">Δοκίμασε μάρκα, μοντέλο ή κωδικό, ή ρώτησε τον έξυπνο οδηγό αγοράς.</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {res.popular.slice(0, 5).map((p) => (
                  <Link key={p} href={`/anazitisi?q=${encodeURIComponent(p)}`} className="rounded-full bg-eu-surface px-3 min-h-9 inline-flex items-center text-[length:var(--fs-14)] font-semibold text-eu-ink-2 hover:bg-eu-chip">
                    {p}
                  </Link>
                ))}
                <Link href="/odigos-agoras" className="rounded-full bg-eu-navy text-white px-3 min-h-9 inline-flex items-center text-[length:var(--fs-14)] font-bold">
                  Έξυπνος οδηγός αγοράς
                </Link>
              </div>
            </div>
          ) : q ? (
            <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 @3xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"}`}>
              <div className="p-3">
                <div className="flex items-center justify-between px-2 py-1.5">
                  <span className="font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">Προϊόντα</span>
                  {res.total > 0 && (
                    <Link href={`/anazitisi?q=${encodeURIComponent(q)}${scope !== "all" ? `&cat=${scope}` : ""}`} onClick={() => remember(q)} className="inline-flex items-center gap-1 text-eu-blue font-bold text-[length:var(--fs-14)] hover:underline">
                      Όλα τα {res.total} <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  )}
                </div>
                {res.products.length === 0 && <p className="m-0 px-2 py-2 text-eu-muted text-[length:var(--fs-14)]">Κανένα προϊόν με αυτούς τους όρους.</p>}
                <ul className="m-0 p-0 list-none grid gap-0.5">
                  {res.products.map((p) => (
                    <li key={p.id}>
                      {row(
                        `/proion/${p.slug}`,
                        q,
                        <div className="flex items-center gap-3 p-2">
                          <ProductImage src={p.image} sizes="56px" className="size-14" rounded="rounded-lg" />
                          <div className="min-w-0 flex-1">
                            <div className="text-eu-muted-2 font-bold text-[length:var(--fs-13)] uppercase truncate">
                              {p.brand} · {p.path}
                            </div>
                            <div className="font-bold text-eu-ink text-[length:var(--fs-15)] leading-tight line-clamp-1">{hl(p.title)}</div>
                            <div className="flex items-center gap-2 text-[length:var(--fs-13-5)] text-eu-muted">
                              <span className={`size-2 rounded-full ${avail[p.avail][0]}`} aria-hidden /> {avail[p.avail][1]} · 12 × {priceLong(instalment(p.price))}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-extrabold text-eu-ink text-[length:var(--fs-16)]">{priceShort(p.price)}</div>
                            {p.wasPrice && <s className="text-eu-muted-2 text-[length:var(--fs-13)]">{priceShort(p.wasPrice)}</s>}
                          </div>
                        </div>,
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-eu-surface/60 border-t @3xl:border-t-0 @3xl:border-l border-eu-line grid gap-3 content-start">
                {res.categories.length > 0 && (
                  <div>
                    <div className="px-2 py-1.5 font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">Κατηγορίες</div>
                    <ul className="m-0 p-0 list-none grid gap-0.5">
                      {res.categories.map((c) => (
                        <li key={c.href}>
                          {row(
                            c.href,
                            q,
                            <div className="flex items-center justify-between gap-2 px-2 py-2">
                              <span className="font-semibold text-eu-ink text-[length:var(--fs-15)]">
                                {hl(c.name)}
                                {c.parent && <span className="text-eu-muted font-normal"> · {c.parent}</span>}
                              </span>
                              <span className="text-eu-muted-2 text-[length:var(--fs-13)] tabular-nums">{c.count}</span>
                            </div>,
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {res.brands.length > 0 && (
                  <div>
                    <div className="px-2 py-1.5 font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">Μάρκες</div>
                    <div className="flex flex-wrap gap-1.5 px-2">
                      {res.brands.map((b) => (
                        <Link key={b.slug} href={`/brands/${b.slug}`} onClick={() => remember(q)} className="rounded-full bg-white border border-eu-line px-3 min-h-9 inline-flex items-center gap-1.5 text-[length:var(--fs-14)] font-bold text-eu-ink hover:border-eu-blue">
                          {hl(b.name)} <span className="text-eu-muted-2 font-normal">{b.count}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {res.guides.length > 0 && (
                  <div>
                    <div className="px-2 py-1.5 font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">Οδηγοί</div>
                    <ul className="m-0 p-0 list-none grid gap-0.5">
                      {res.guides.map((g) => (
                        <li key={g.slug}>
                          {row(
                            `/odigoi/${g.slug}`,
                            q,
                            <div className="flex items-center gap-2 px-2 py-2">
                              <BookOpen className="size-4 text-eu-blue shrink-0" aria-hidden />
                              <span className="font-semibold text-eu-ink text-[length:var(--fs-14)] line-clamp-1">{g.title}</span>
                            </div>,
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className={`grid ${compact ? "grid-cols-1" : "grid-cols-1 @3xl:grid-cols-[minmax(0,1fr)_300px]"}`}>
              <div className="p-4 grid gap-4 content-start">
                {recent.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between px-1 mb-1">
                      <span className="inline-flex items-center gap-1.5 font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">
                        <Clock className="size-3.5" aria-hidden /> Πρόσφατες
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setRecent([]);
                          try {
                            localStorage.removeItem(RECENT_KEY);
                          } catch {}
                        }}
                        className="text-eu-muted text-[length:var(--fs-13)] hover:text-eu-red"
                      >
                        Καθαρισμός
                      </button>
                    </div>
                    <ul className="m-0 p-0 list-none grid gap-0.5">
                      {recent.map((r) => (
                        <li key={r}>{row(`/anazitisi?q=${encodeURIComponent(r)}`, r, <div className="px-2 py-2 text-[length:var(--fs-15)] text-eu-ink">{r}</div>)}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <div className="inline-flex items-center gap-1.5 px-1 mb-1.5 font-extrabold text-eu-muted text-[length:var(--fs-13)] tracking-wide uppercase">
                    <TrendingUp className="size-3.5" aria-hidden /> Δημοφιλείς αναζητήσεις
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {res.popular.map((p) => {
                      idx++;
                      const i = idx;
                      return (
                        <Link key={p} href={`/anazitisi?q=${encodeURIComponent(p)}`} onClick={() => remember(p)} onMouseEnter={() => setActive(i)} className={`rounded-full border px-3 min-h-9 inline-flex items-center text-[length:var(--fs-14)] font-semibold ${active === i ? "border-eu-navy bg-eu-navy text-white" : "border-eu-line text-eu-ink-2 hover:border-eu-blue"}`}>
                          {p}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              {res.promo && !compact && (
                <Link href={`/proion/${res.promo.slug}`} onClick={() => setOpen(false)} className="bg-eu-navy text-white p-4 grid gap-2 content-start hover:bg-eu-blue transition-colors">
                  <span className="font-extrabold text-eu-yellow text-[length:var(--fs-13)] tracking-wide uppercase">Προσφορά ημέρας</span>
                  <ProductImage src={res.promo.image} sizes="260px" className="w-full" />
                  <span className="text-eu-on-dark text-[length:var(--fs-13)] uppercase font-bold">{res.promo.brand}</span>
                  <span className="font-bold text-[length:var(--fs-15)] leading-tight line-clamp-2">{res.promo.title}</span>
                  <span className="flex items-baseline gap-2">
                    <span className="font-extrabold text-[length:var(--fs-22)]">{priceShort(res.promo.price)}</span>
                    {res.promo.wasPrice && <s className="text-eu-on-dark-2 text-[length:var(--fs-14)]">{priceShort(res.promo.wasPrice)}</s>}
                  </span>
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

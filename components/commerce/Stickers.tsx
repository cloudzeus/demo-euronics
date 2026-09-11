import type { Product } from "@/lib/data/types";
import { discountPct, priceShort } from "@/lib/format";

export type Sticker =
  | { kind: "discount"; pct: number; save: number }
  | { kind: "gift"; label: string }
  | { kind: "new" }
  | { kind: "renew"; grade?: "A" | "B" }
  | { kind: "last"; n: number }
  | { kind: "ends"; days: number }
  | { kind: "pick"; store: string };

/**
 * @dynamic Sticker system for offers. Every sticker is derived from data
 * (price rule, stock, campaign end, store pick), never hand-placed:
 *  · discount → red, with the euro saving (Omnibus stays as the price line)
 *  · gift → yellow ribbon, · new → navy, · renew → green
 *  · «Τελευταία N» when stockLeft ≤ 5, · «Λήγει σε N ημ.» from the deal's end
 *  · «Επιλογή καταστήματος» → navy stamp with the store name.
 * Each kind has a fixed slot on the card so stickers never collide.
 */
export function stickersFor(p: Product, dealEndsAt?: string, now = Date.now()): Sticker[] {
  const out: Sticker[] = [];
  const pct = discountPct(p.price, p.wasPrice);
  if (p.badge?.kind === "discount" && pct !== null && p.wasPrice) out.push({ kind: "discount", pct, save: Math.round(p.wasPrice - p.price) });
  if (p.badge?.kind === "gift") out.push({ kind: "gift", label: p.badge.label });
  if (p.badge?.kind === "new") out.push({ kind: "new" });
  if (p.badge?.kind === "renew") out.push({ kind: "renew", grade: p.badge.grade });
  else if (p.isRenew) out.push({ kind: "renew" });
  if (p.stockLeft !== undefined && p.stockLeft <= 5) out.push({ kind: "last", n: p.stockLeft });
  if (dealEndsAt) {
    const days = Math.ceil((new Date(dealEndsAt).getTime() - now) / 86400000);
    if (days >= 0 && days <= 3) out.push({ kind: "ends", days });
  }
  if (p.storePick) out.push({ kind: "pick", store: p.storePick });
  return out;
}

/** Top-left corner: the one "value" sticker (discount / new / renew). */
export function CornerSticker({ s, compact = false }: { s: Sticker; compact?: boolean }) {
  if (s.kind === "discount")
    return (
      <span className="eu-shimmer inline-flex flex-col items-start bg-eu-red text-white rounded-br-2xl rounded-tl-2xl px-3 py-1.5 leading-none shadow-[0_6px_16px_rgba(214,40,40,.35)]">
        <span className="font-extrabold text-[length:var(--fs-19)] tracking-[-0.02em]">−{s.pct}%</span>
        {!compact && <span className="font-bold text-[length:var(--fs-13)] mt-1 opacity-95">κερδίζεις {priceShort(s.save)}</span>}
      </span>
    );
  if (s.kind === "new") return <span className="inline-flex bg-eu-navy text-white font-extrabold text-[length:var(--fs-14)] rounded-br-2xl rounded-tl-2xl px-3 py-2 leading-none">Νέο</span>;
  if (s.kind === "renew") return <span className="inline-flex bg-eu-green text-white font-extrabold text-[length:var(--fs-14)] rounded-br-2xl rounded-tl-2xl px-3 py-2 leading-none">Renew{s.grade ? ` · ${s.grade}` : ""}</span>;
  return null;
}

/** Diagonal yellow ribbon, top-right corner (gift / store pick). */
export function RibbonSticker({ s }: { s: Sticker }) {
  const text = s.kind === "gift" ? "Δώρο" : s.kind === "pick" ? "Επιλογή καταστήματος" : null;
  const title = s.kind === "gift" ? `Δώρο ${s.label}` : s.kind === "pick" ? `Επιλογή καταστήματος · ${s.store}` : "";
  if (!text) return null;
  return (
    <span className="pointer-events-none absolute -right-14 top-5 w-48 rotate-45 bg-eu-yellow text-eu-navy font-extrabold text-[length:var(--fs-13)] text-center py-1.5 shadow-[0_4px_12px_rgba(18,42,88,.2)] eu-shimmer" aria-label={title} title={title}>
      {text}
    </span>
  );
}

/** Small urgency pills next to availability (last units / ends in). */
export function UrgencyPill({ s }: { s: Sticker }) {
  if (s.kind === "last") return <span className="inline-flex items-center gap-1 rounded-full bg-eu-red/10 text-eu-red font-extrabold text-[length:var(--fs-13)] px-2 py-1 leading-none">Τελευταία {s.n}</span>;
  if (s.kind === "ends") return <span className="inline-flex items-center gap-1 rounded-full bg-eu-yellow/60 text-eu-navy font-extrabold text-[length:var(--fs-13)] px-2 py-1 leading-none">{s.days === 0 ? "Λήγει σήμερα" : s.days === 1 ? "Λήγει αύριο" : `Λήγει σε ${s.days} ημ.`}</span>;
  return null;
}

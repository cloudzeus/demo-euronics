import type { ReactNode } from "react";

/** Standard page header: kicker, H1, lead, optional right-side slot. */
export function PageIntro({ kicker, title, lead, right, tone = "light" }: { kicker?: string; title: string; lead?: ReactNode; right?: ReactNode; tone?: "light" | "dark" | "blue" }) {
  const bg = tone === "dark" ? "bg-eu-navy text-white" : tone === "blue" ? "bg-eu-blue text-white" : "bg-white text-eu-ink";
  const kick = tone === "light" ? "text-eu-blue" : "text-eu-yellow";
  const leadC = tone === "light" ? "text-eu-muted" : "text-eu-on-dark";
  return (
    <header className={`${bg} eu-container`}>
      <div className="eu-canvas eu-gutter py-6 @lg:py-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-[46em]">
          {kicker && <div className={`font-extrabold text-[length:var(--fs-10-5)] tracking-wide mb-2 ${kick}`}>{kicker}</div>}
          <h1 className="m-0 font-heading font-bold text-[length:var(--fs-32)] leading-[1.1] tracking-[-0.02em]">{title}</h1>
          {lead && <p className={`m-0 mt-2 text-[length:var(--fs-13-5)] leading-relaxed ${leadC}`}>{lead}</p>}
        </div>
        {right}
      </div>
    </header>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PagesA } from "./pages-a";
import { PagesB } from "./pages-b";
import { PagesC } from "./pages-c";
import { PrintButton } from "./PrintButton";
import "./doc.css";

export const metadata: Metadata = {
  title: "Παρουσίαση ανασχεδιασμού",
  description: "Πρόταση ανασχεδιασμού euronics.gr — 18 σελίδες A4, DGSOFT, Σεπτέμβριος 2026.",
};

/**
 * «Euronics Παρουσίαση Ανασχεδιασμού» — the proposal document as a paged
 * web page: 18 A4-landscape pages, print-ready (Cmd+P → PDF), scaled to
 * any viewport. Pages 1–11 follow the Claude Design source; 12–18 add
 * the site scan, the kolleris/Kotsovolos comparison, the feature matrix,
 * the ERP-direct architecture and the fluid/zones system.
 */
export default function ProposalPage() {
  return (
    <div className="doc">
      <div className="doc-toolbar max-w-[1123px] mx-auto mb-4 flex flex-wrap items-center justify-between gap-3 text-[length:var(--fs-12)]">
        <div className="text-eu-muted">
          <strong className="text-eu-ink">Euronics · Παρουσίαση ανασχεδιασμού</strong> · 18 σελίδες A4 · v3 · Σεπτέμβριος 2026
        </div>
        <div className="flex gap-2">
          <Link href="/" className="rounded-full bg-white border border-eu-line px-4 py-2 font-semibold text-eu-ink hover:border-eu-blue min-h-10 inline-flex items-center">
            Δες το prototype της αρχικής →
          </Link>
          <PrintButton />
        </div>
      </div>
      <PagesA />
      <PagesB />
      <PagesC />
    </div>
  );
}

"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { AppleMark, GoogleMark, MicrosoftMark, FacebookMark } from "./BrandMarks";

export type Provider = "google" | "microsoft" | "facebook" | "apple";

/**
 * @dynamic Social sign-in (Google, Microsoft, Facebook, Apple). Demo:
 * simulated consent → returns a profile to prefill name/email and stores a
 * session. Production: Auth.js v5 providers (OAuth/OIDC), account linking
 * by verified email, GDPR consent recorded in the ledger.
 */
export function SocialLogin({ onSignedIn, compact = false, providers = ["google", "microsoft", "facebook", "apple"] }: { onSignedIn?: (p: { provider: Provider; firstName: string; lastName: string; email: string }) => void; compact?: boolean; providers?: Provider[] }) {
  const [busy, setBusy] = useState<Provider | null>(null);
  const meta: Record<Provider, { label: string; mark: React.ReactNode; cls: string }> = {
    google: { label: "Google", mark: <GoogleMark />, cls: "bg-white border-2 border-eu-line text-eu-ink hover:border-eu-blue" },
    microsoft: { label: "Microsoft", mark: <MicrosoftMark />, cls: "bg-white border-2 border-eu-line text-eu-ink hover:border-eu-blue" },
    facebook: { label: "Facebook", mark: <FacebookMark />, cls: "bg-[#1877F2] text-white hover:bg-[#166fe0]" },
    apple: { label: "Apple", mark: <AppleMark />, cls: "bg-black text-white hover:bg-black/85" },
  };
  const go = (p: Provider) => {
    setBusy(p);
    setTimeout(() => {
      const profile = { provider: p, firstName: "Μαρία", lastName: "Παπαδοπούλου", email: p === "microsoft" ? "maria.p@outlook.com" : p === "facebook" ? "maria.p@facebook.com" : p === "apple" ? "maria.p@privaterelay.appleid.com" : "maria.p@gmail.com" };
      try {
        localStorage.setItem("euronics.session", JSON.stringify({ name: `${profile.firstName} ${profile.lastName}`, email: profile.email, provider: p, at: Date.now() }));
      } catch {}
      setBusy(null);
      onSignedIn?.(profile);
    }, 1200);
  };
  return (
    <div className={`grid gap-2 ${compact ? "grid-cols-4" : "grid-cols-2 @md:grid-cols-4"}`}>
      {providers.map((p) => (
        <button key={p} type="button" onClick={() => go(p)} disabled={!!busy} aria-label={`Συνέχεια με ${meta[p].label}`} className={`rounded-full font-bold text-[length:var(--fs-15)] min-h-12 inline-flex items-center justify-center gap-2 px-3 transition-colors disabled:opacity-60 ${meta[p].cls}`}>
          {busy === p ? <Loader2 className="size-4 animate-spin" aria-hidden /> : meta[p].mark}
          {!compact && <span className="hidden @sm:inline">{meta[p].label}</span>}
        </button>
      ))}
    </div>
  );
}

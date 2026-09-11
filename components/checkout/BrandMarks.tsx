/**
 * Simplified brand marks for wallets and identity providers (demo). In
 * production replace with the official assets and follow each brand's
 * button guidelines (Apple Pay, Google Pay, Revolut Pay, Sign in with …).
 */
export function AppleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M16.365 12.79c-.02-2.19 1.79-3.24 1.87-3.29-1.02-1.49-2.6-1.7-3.16-1.72-1.35-.14-2.63.79-3.31.79-.68 0-1.74-.77-2.86-.75-1.47.02-2.83.86-3.59 2.18-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.74 2.19 1.1-.04 1.52-.71 2.85-.71s1.7.71 2.87.69c1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.3-.88-2.32-3.52zM14.19 6.36c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.56-1.23z" />
    </svg>
  );
}
export function GoogleMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47a5.53 5.53 0 0 1-2.4 3.63v3.01h3.88c2.27-2.09 3.54-5.17 3.54-8.88z" />
      <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.94-2.91l-3.88-3.01c-1.08.72-2.45 1.16-4.06 1.16-3.12 0-5.77-2.11-6.71-4.95H1.28v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.29 14.29A7.2 7.2 0 0 1 4.91 12c0-.8.14-1.57.38-2.29V6.61H1.28A12 12 0 0 0 0 12c0 1.94.46 3.77 1.28 5.39l4.01-3.1z" />
      <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.61 4.58 1.8l3.44-3.44C17.94 1.19 15.23 0 12 0A12 12 0 0 0 1.28 6.61l4.01 3.1C6.23 6.88 8.88 4.77 12 4.77z" />
    </svg>
  );
}
export function MicrosoftMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022" />
      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00" />
      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
    </svg>
  );
}
export function FacebookMark({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path fill="#fff" d="M15.6 12.9l.5-3.2h-3.1V7.6c0-.9.4-1.7 1.8-1.7h1.4V3.2S15 3 13.8 3c-2.6 0-4.3 1.6-4.3 4.4v2.3H6.7v3.2h2.8V21h3.5v-8.1h2.6z" />
    </svg>
  );
}
export function RevolutMark({ className = "h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 24" className={className} aria-hidden fill="currentColor">
      <text x="0" y="19" fontFamily="Manrope, system-ui, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.5">
        Revolut
      </text>
    </svg>
  );
}
export function FaceIdMark({ className = "size-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8V6a2 2 0 0 1 2-2h2M16 4h2a2 2 0 0 1 2 2v2M20 16v2a2 2 0 0 1-2 2h-2M8 20H6a2 2 0 0 1-2-2v-2" />
      <path d="M9 10v1M15 10v1M12 10v3.5a.5.5 0 0 1-.5.5H11M9.5 15.5c.7.7 1.6 1 2.5 1s1.8-.3 2.5-1" />
    </svg>
  );
}

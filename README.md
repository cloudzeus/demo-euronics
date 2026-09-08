# euronics-redesign

Πρόταση ανασχεδιασμού euronics.gr (DGSOFT, Σεπτέμβριος 2026) — λειτουργικό prototype αρχικής + παρουσίαση 18 σελίδων.

- `/` — Αρχική «Πρόταση Β» στο επίσημο Euronics branding, συντεθειμένη από 12 ζώνες marketing (`lib/cms/home.layout.ts`). `?zones=1` δείχνει τους αριθμούς ζωνών του design.
- `/protasi` — «Παρουσίαση Ανασχεδιασμού»: 18 σελίδες A4 landscape, εκτυπώσιμο σε PDF (Cmd+P).
- `docs/` — τα τρία audits (euronics.gr, web.kolleris.com, kotsovolos.gr) και τα αρχικά αρχεία Claude Design.
- `prisma/schema.prisma` — commerce core χωρίς ενδιάμεση πλατφόρμα (ERP-direct).
- `components/fluid/` — fluid/adaptive layer (device class από server, container queries, FluidContent).
- `scripts/fluid-type.mjs` — παραγωγή των `--fs-*` tokens.

```bash
npm install
npm run dev
```

Stack: Next.js 16 · React 19 · Tailwind 4 · shadcn/ui · Motion · Prisma/MySQL (schema only στο prototype).

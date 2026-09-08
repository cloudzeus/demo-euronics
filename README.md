# demo-euronics

Πλήρες demo eshop euronics.gr (DGSOFT, Σεπτέμβριος 2026): όλες οι σελίδες και όλα τα flows με στατικό dummy περιεχόμενο βασισμένο σε **πραγματικά στοιχεία του υφιστάμενου euronics.gr** (32 προϊόντα με επαληθευμένες εικόνες, 41 καταστήματα-μέλη, πολιτικές, υπηρεσίες, blog). Χωρίς ενδιάμεση πλατφόρμα ηλεκτρονικού εμπορίου, χωρίς B2B. Επίσημο Euronics branding.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```

## Routes

| Περιοχή | Routes |
|---|---|
| Αρχική (12 ζώνες marketing) | `/` · `/?zones=1` δείχνει τους αριθμούς ζωνών |
| Κατάλογος | `/proionta` · `/k/{l1}` · `/k/{l1}/{l2}?brand=&min=&max=&avail=&sale=&energy=&sort=&page=&view=` · `/anazitisi?q=` · `/prosfores` · `/renew` · `/brands` · `/brands/{slug}` |
| Προϊόν | `/proion/{slug}` (gallery, sticky buy box, variants, δόσεις, απόθεμα ανά κατάστημα, add-ons, reviews, Q&A, related) · `/sygkrisi` · `/lista` |
| Αγορά | `/kalathi` → `/checkout` (στοιχεία & παράδοση → πληρωμή με κάρτα/δόσεις/IRIS/κατάθεση/αντικαταβολή → SCA) → `/checkout/epityxia?no=` · `/entopismos` (public tracking) · `/kartes-dorou` |
| Λογαριασμός | `/eisodos` · `/eggrafi` · `/logariasmos` · `/logariasmos/paraggelies` · `/logariasmos/paraggelies/{no}` · `/logariasmos/dieythynseis` · `/logariasmos/epistrofes` (RMA) · `/logariasmos/eggyiseis` |
| Δίκτυο & υπηρεσίες | `/katastimata?q=&region=&service=` · `/katastimata/{slug}` (LocalBusiness JSON-LD) · `/ypiresies` · `/ypiresies/{slug}` (κράτηση) |
| Περιεχόμενο | `/odigoi` · `/odigoi/{slug}` · `/tropoi-pliromis` · `/tropoi-apostolis` · `/epistrofes` · `/oroi-chrisis` · `/aporrito` · `/cookies` · `/etaireia` · `/syxnes-erotiseis` · `/epikoinonia` |
| Πρόταση | `/protasi` — παρουσίαση ανασχεδιασμού 18 σελίδων A4, εκτυπώσιμη |

Demo δεδομένα για tracking/λογαριασμό: παραγγελίες `EUR-20260904-0417`, `EUR-20260812-0093`, `EUR-20260620-1188`. Κουπόνι `EURONICS10`.

## Δομή

- `lib/data/fixtures/` — προϊόντα (`products.real.ts` = scraped από euronics.gr 8/9/2026, `products.ts` = design fixtures), καταστήματα, υπηρεσίες, οδηγοί, πολιτικές/FAQ, παραγγελίες.
- `lib/data/repo.ts` — repository (ίδιες υπογραφές με τη μελλοντική Prisma υλοποίηση).
- `lib/cms/` — μοντέλο ζωνών/widgets (schedule, ορατότητα ανά συσκευή, A/B) + registry.
- `components/fluid/` — device class από server, container queries, `FluidContent`.
- `components/commerce/CartProvider.tsx` — καλάθι/wishlist/σύγκριση με persistence (localStorage).
- `prisma/schema.prisma` — commerce core (ERP-direct).
- `docs/` — audits euronics.gr / web.kolleris.com / kotsovolos.gr και τα αρχεία Claude Design.

Stack: Next.js 16 · React 19 · Tailwind 4 · shadcn/ui · Motion · Manrope (Greek+Latin) · Prisma/MySQL (schema only).

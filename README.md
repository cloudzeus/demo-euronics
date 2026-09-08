# demo-euronics

Πλήρες demo eshop euronics.gr (DGSOFT, Σεπτέμβριος 2026): όλες οι σελίδες και όλα τα flows με στατικό dummy περιεχόμενο βασισμένο σε **πραγματικά στοιχεία του υφιστάμενου euronics.gr** (32 προϊόντα με επαληθευμένες εικόνες, 41 καταστήματα-μέλη, πολιτικές, υπηρεσίες, blog). Χωρίς ενδιάμεση πλατφόρμα ηλεκτρονικού εμπορίου, χωρίς B2B. Επίσημο Euronics branding.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
```


## Νέα σε αυτή την έκδοση (v3 — «λίστα, σύγκριση, οδηγοί»)

| Διαδρομή | Τι είναι |
|---|---|
| `/proionta` | **Λίστα όλων των προϊόντων** με facets στο URL: κατηγορία (`?k=`), μάρκα, τιμή, διαθεσιμότητα, ενεργειακή κλάση και **χαρακτηριστικά** (`f_Διαγώνιος=55"|65"`, `f_Απόδοση (BTU)=…`). Τα χαρακτηριστικά υπολογίζονται από `lib/data/attributes.ts` (κανονικοποίηση συνωνύμων «Εύρος Οθόνης» / «Διαγώνιος» / «Μέγεθος Οθόνης» κ.λπ.). |
| `/sygkrisi` | **Σύγκριση βάσει χαρακτηριστικών** έως 4 προϊόντων: γραμμές ανά ομάδα, «μόνο διαφορές», sticky πρώτη στήλη, «Φθηνότερο». Το «Σύγκριση» υπάρχει σε κάθε κάρτα, στο PDP και στον οδηγό. |
| `/proion/[slug]` | PDP ξαναγραμμένο: header με key facts, sticky buy box (παράδοση / κατάστημα με απόθεμα / ραντεβού, «Ολοκληρωμένη λύση» με υπηρεσίες + αξεσουάρ, «Προσθήκη όλων»), sticky section nav, χαρακτηριστικά σε κάρτες, **σύγκριση με παρόμοια in-page**, υπηρεσίες & παράδοση, σχετικά σε grid (τίποτα δεν κόβεται). |
| `/kalathi` | Καλάθι: κάρτες με εικόνα, υπηρεσίες ως chips, «κράτα για αργότερα», μπάρα δωρεάν μεταφορικών, σύνοψη με navy header, express πληρωμές. |
| `/checkout` | Checkout κατά την πρόταση: express (Apple/Google Pay/IRIS), αριθμημένες ενότητες 1–4 με «Αλλαγή», επιλογή παράδοσης με κόστος/χρόνο, ΑΑΔΕ lookup, δόσεις ως chips, sticky σύνοψη με εικόνες, mobile sticky σύνολο + CTA, inline validation. |
| `/odigos-agoras` | **Έξυπνοι οδηγοί αγοράς**: `tileoraseis`, `ypologistes`, `klimatistika`. 5–6 ερωτήσεις → βαθμολόγηση κάθε μοντέλου στα πραγματικά χαρακτηριστικά του (`lib/guides/smart.ts`) → «Τι χρειάζεσαι», πρόταση με **αιτιολόγηση** (✓ γιατί / ⚠ τι να έχεις υπόψη), 2 εναλλακτικές, σύγκριση, λίστα με τα φίλτρα του οδηγού. Είσοδοι: αρχική (ζώνη 11), mega menu, σελίδες κατηγορίας, άδειο καλάθι, footer. |

Τυπογραφία: όλα τα κείμενα ≥ 14px (body 16px), fluid tokens `--fs-*`.

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

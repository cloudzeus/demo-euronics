# Audit — web.kolleris.com (08/09/2026)

Το site είναι e-shop επαγγελματικών εργαλείων (ΑΦΟΙ ΚΟΛΛΕΡΗ ΙΚΕ, Πειραιάς), χτισμένο από την DGSOFT ως **Next.js App Router → HDCtool API → SoftOne ERP**, χωρίς ενδιάμεση πλατφόρμα ηλεκτρονικού εμπορίου. Αποτελεί την αναφορά υλοποίησης για το Euronics.

## 0. Tech (επαληθευμένο)

- Next.js App Router, RSC, Turbopack, `next/image` webp. Auth.js v5. i18n EL/EN/IT με hreflang, cookie locale, `/el` default χωρίς prefix.
- Cloudflare + Bunny CDN εικόνων. MapTiler/OSM χάρτης. Viva Wallet redirect. ACS courier.
- JSON-LD: `HardwareStore`, `WebSite/SearchAction`, `Product` (sku, mpn, gtin13, offers, shippingDetails, MerchantReturnPolicy, additionalProperty[]), `BreadcrumbList`.
- robots: Disallow `/admin /api /kalathi /checkout /logariasmos /eisodos /eggrafi` · sitemap index ~340 URLs.

## 1. Site map

| Τύπος | Pattern |
|---|---|
| Αρχική | `/`, `/en`, `/it` |
| Κατάλογος hub | `/katalogos` (8.924 κωδικοί, 24 κατηγορίες, 157 groups, 379 υποκατηγορίες) |
| Κατηγορία | `/katalogos/{slug}` (3 επίπεδα, L3 μέσω `?sub=`) |
| Όλα τα προϊόντα | `/proionta` |
| Προϊόν | `/proion/{slug}-{mpn}-{brand}-{mpn}` |
| Brands | `/brands`, `/brands/{brand}` (18) |
| Προσφορές | `/prosfores`, `/prosfores/{campaign}` |
| Νέες αφίξεις | `/nees-afixeis` |
| Αναζήτηση | `/anazitisi?q=&cat=` |
| Σύγκριση | `/sygkrisi` |
| Καλάθι / Checkout | `/kalathi`, `/checkout` |
| Auth | `/eisodos`, `/eggrafi`, `/eisodos/prosvasi` (magic link) |
| Λογαριασμός | `/logariasmos`, `/logariasmos/paraggelies`, `/logariasmos/entopismos` (public tracking) |
| Εταιρικά | `/etaireia`, `/epikoinonia`, `/blog`, `/syxnes-erotiseis`, `/epistrofes`, `/eggyiseis` |
| Νομικά | `/oroi-chrisis`, `/aporrito`, `/tropoi-pliromis`, `/apostoli-paradosi` |

Listing params: `?sub= ?brand= ?min= ?max= ?avail=in-stock ?sale=1 ?new=1 ?sort= ?page= ?perPage=24|48|96 ?perRow=2..5`.

## 2. Header / Nav / Footer

- Utility bar: τηλέφωνο, B2B, διεύθυνση, «Παράδοση 24-48ω · Δωρεάν άνω 150€», αίτηση λογαριασμού συνεργάτη, γλώσσες, σύνδεση.
- Header: logo, search με dropdown κατηγορίας + autocomplete (ομάδες «Ακριβής κωδικός / Προϊόντα / Κατηγορίες»), «8.924+ ΚΩΔΙΚΟΙ», λογαριασμός, mini-cart drawer με free-shipping progress.
- Main nav: mega menu με πλήθη και «Brands που διανέμουμε», BRANDS, ΚΑΤΑΛΟΓΟΣ, ΝΕΕΣ ΑΦΙΞΕΙΣ, MILWAUKEE, FACOM, GEDORE, ΠΡΟΣΦΟΡΕΣ, ΕΤΑΙΡΕΙΑ, ΕΠΙΚΟΙΝΩΝΙΑ, BLOG. Mobile accordion.
- Footer 5 στήλες + social + payment icons + νομικά.

## 3. Αρχική (σειρά)

Hero → stats strip (κωδικοί, brands, άμεσα διαθέσιμοι, 24-48ω, 48 χρόνια) → νέες αφίξεις/featured → category grid 8 → **γρήγορη παραγγελία με κωδικό** → featured grid → carousel δημοφιλών → brand wall 18 → Google Reviews 4,9/5 + testimonials → value props → newsletter → footer.

## 4. Listing

- Heading με «{n} κωδικοί σε {m} υποκατηγορίες», breadcrumb, intro, TaxonomyFinder.
- Φίλτρα: υποκατηγορία, brand (counts), τιμή (buckets + εύρος), διαθεσιμότητα, σε προσφορά, νέα. Χωρίς attribute facets.
- Toolbar: chips ενεργών φίλτρων, sort 5, ανά γραμμή 2–5, 24/48/96, pagination.
- Κάρτα: εικόνα, brand + κωδικός, όνομα, stock badge (ΑΜΕΣΑ / ΤΕΛΕΥΤΑΙΑ n / Κατόπιν παραγγελίας), τιμή με ΦΠΑ, ΣΤΟ ΚΑΛΑΘΙ, ΑΓΟΡΑ ΤΩΡΑ, ΣΥΓΚΡΙΣΗ, ΓΡΗΓΟΡΗ ΠΡΟΒΟΛΗ, αγαπημένα.
- SEO/FAQ accordion ανά κατηγορία. Brand pages με hero/stats. Προσφορές με campaign banners + OfferCountdown. Νέες αφίξεις ανά μήνα.

## 5. Προϊόν

- Κωδικός Kolleris (SoftOne MTRL), MPN, EAN, διαστάσεις, βάρος, διαθεσιμότητα.
- PriceBox: τιμή με/χωρίς ΦΠΑ, τιμή καταλόγου + %, stock πραγματικής ποσότητας ERP, countdown «παραγγείλετε μέσα σε hh:mm:ss και φεύγει σήμερα», qty, ΠΡΟΣΘΗΚΗ, ΑΓΟΡΑ ΤΩΡΑ, block «είστε επαγγελματίας; συνδεθείτε για τιμή συνεργάτη».
- Trust row, gallery zoom/lightbox, tabs τεχνικού φακέλου (στοιχεία, περιγραφή, χαρακτηριστικά, αποστολή, εγγύηση σε μήνες), product FAQ, σχετικά 12.
- Χωρίς: variants, κλιμακωτές τιμές, MOQ, datasheets, reviews, Q&A, bundles, back-in-stock, stock ανά κατάστημα.

## 6. Καλάθι / Checkout / Λογαριασμός

- Καλάθι: stepper 3 βημάτων, split «Διαθέσιμα n — υπόλοιπα κατόπιν παραγγελίας», σύνοψη (καθαρή αξία, μεταφορικά ACS ζώνη/βάρος, επιβάρυνση πληρωμής, ΦΠΑ, σύνολο), free-shipping progress, κουπόνι (ανενεργό), cross-sell.
- Checkout: στοιχεία, address autocomplete, **τιμολόγιο με ΑΑΔΕ lookup ΑΦΜ** και match με TRDR, αποστολή ACS/παραλαβή 2 ώρες, πληρωμή Viva (κάρτες/PayPal/IRIS) ή κατάθεση με κράτηση αποθέματος, guest checkout, αριθμός `KOL-YYYYMMDD-0000`.
- Auth: email/κωδικός, εγγραφή Ιδιώτης/Εταιρεία (ΑΦΜ + ΑΑΔΕ autofill, έγκριση 2 εργάσιμες), magic link.
- Tracking public με ACS link.
- Λογαριασμός: επισκόπηση, στοιχεία, παραγγελίες, διευθύνσεις, εγγυήσεις & σέρβις, επιστροφές, αγαπημένα, αξιολογήσεις, **εταιρικός λογαριασμός** (χρήστες & ρόλοι, όριο ανά παραγγελία, πρόσκληση, τζίρος), τιμολόγια, λίστες υλικών.
- B2B: τιμή συνεργάτη μετά login. Χωρίς πιστωτικό όριο/καρτέλα/ανοιχτό λογαριασμό/quotes/RMA.

## 7. Checklist (σύνοψη)

✅ mega menu με πλήθη, brand pages, autocomplete με scope, taxonomy finder, φίλτρα βασικά, sort/perPage/perRow, quick view, σύγκριση 4, αγαπημένα, buy now, mini-cart, real-time stock ERP, split διαθεσιμότητας, countdown αυθημερόν, τιμές με/χωρίς ΦΠΑ, B2B τιμές, quick order με κωδικό, μαζική παραγγελία (paste), λίστες υλικών, guest checkout, ΑΑΔΕ autofill, address autocomplete, παραλαβή 2 ώρες, Viva/IRIS/κατάθεση, public tracking, εταιρικοί χρήστες/ρόλοι, τιμολόγια, προσφορές με countdown, schema.org, i18n 3 γλωσσών.

❌ attribute facets, list view, variants, κλιμακωτές τιμές, manuals/video, reviews προϊόντος, Q&A, bundles, back-in-stock, κουπόνια, αντικαταβολή, δόσεις, ανοιχτός λογαριασμός, online quote, online RMA, live chat, blog (ανενεργό), πολλαπλά καταστήματα/locator, cookie banner, loyalty, gift cards.

Ευρήματα προς διόρθωση: σπασμένο `og:image`, «ΜΕ ΦΠΑ 0%» σε WIHA 26852, 0 αποτελέσματα σε `sub+brand+avail`, δημόσια dev notes στο `/blog`, default αγγλικό 404, όροι χωρίς ΑΦΜ/ΓΕΜΗ.

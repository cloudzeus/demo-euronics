# Benchmark — kotsovolos.gr (08/09/2026)

Client-rendered SPA (Next.js + MUI πάνω σε legacy HCL/WebSphere Commerce routes), ~40 URLs με πραγματικό browser (1440px + 375px). ✅ επαληθεύτηκε · ⚠️ μερικώς · ❌ δεν υπάρχει · ❓ δεν επαληθεύτηκε.

## Site map

- Domains: `www` (B2C), `b2b.` (K2B), `blog.` (KBLOG), `corporate.`, `career.`, `assets.` (εικόνες, ribbons, energy label SVG, sitemaps), AEM DAM για A+ content, `adpoints.gr` retail media.
- 4 sitemaps: products, categories (~1.100), brand/feature filter landings, landing pages (404 `/pages/*` + 166 `/store/*`).
- Patterns: L1 `/household-appliances` · listing `/l1/l2/l3` · brand landing `.../filters/m/Sony` · feature landing `.../filters/f/{facet}/{value}` · PDP `/l1/l2/l3/{sku}-{slug}` · search `/SearchDisplay?q=` · collections `/collection/p{id}-{slug}` · CMS `/pages/{slug}` · services `/ypiresies/{group}/{service}` · contracts `/symvolaia/...` · stores `/StoresLocator`, `/store/{slug}` · help `/help/help-{topic}` · `/basket`, `/CompareProducts`, `/account?menu=`, `/order-tracking/`, `/gift-card`.
- 11 L1 + Υπηρεσίες + Συμβόλαια + εποχιακές (Δώρα, Σχολικά, Toys). Επισκευές και Ανταλλακτικά ως υποκατηγορίες.

## Navigation

- Utility bar: K2B, εξέλιξη παραγγελίας, τηλέφωνο. Κόκκινο sticky header: hamburger «Μενού» (drawer 3 επιπέδων με tabs Προϊόντα / Υπηρεσίες / Συμβόλαια), full-width search «Τι χρειάζεσαι σήμερα;», λογαριασμός, καλάθι. Χωρίς οριζόντια μπάρα κατηγοριών.
- USP ticker 4 μηνυμάτων (Plan K, παραλαβή σε 20', Skroutz point 24/7).
- Autocomplete: 5 query suggestions + 3 προϊόντα με τιμή.
- Footer: Κ Εξυπηρέτηση, live chat (Microsoft Omnichannel), 148/151 καταστήματα, social ×5, K2B, KBLOG, newsletter, Cookiebot (Αποδοχή/Επιλεγμένα/Απόρριψη), accessibility widget.

## Αρχική (σειρά)

Hero 2-up (όχι slider) → carousel 8 promo tiles → carousel «Top επιλογές δροσιάς» (20) → carousel «τιμές ΧΑΜΟΣ» → 2 lifestyle banners → tabbed block κλίμα/οικιακός/έπιπλα → banner ενεργειακών λύσεων → B2B block → K community (blog/video/δράσεις) → loyalty strip (Alpha Bonus) → trust strip (887+ brands, 30.000+ προϊόντα, Total Support) → footer. Χωρίς category tiles, brand wall, countdown, recently viewed.

## Listing

- L1 hub = κατάλογος κατηγοριών + FAQ accordion. Meta pattern «…: Μεγάλες Προσφορές και Έως 36 Άτοκες Δόσεις».
- Listing: brand chips πάνω από grid, quick chips (π.χ. εύρος οθόνης), σειρά SPONSORED (retail media), in-grid banner.
- Facets: Εταιρεία, Διαθεσιμότητα (4), Τρόποι παράδοσης (60', ώρα & ημέρα, σήμερα, αύριο), τιμή (inputs + buckets), Συμμετέχει στο my K, Αξιολόγηση, τεχνικά facets ανά κατηγορία (TV: panel, Hz, VRR, hotel mode· κλιματιστικά: BTU, κλάση ψύξης/θέρμανσης, m², dB, WiFi).
- Sort 4, grid/list, load-more με μετρητή (13–15/φόρτωση), FAQ SEO accordion, auto brand/feature landing URLs.
- Κάρτα: ribbon promo (Plan K Next, δωροεπιταγή, δώρο) + «Ισχύει έως», εικόνα με «+N» παραλλαγές, SKU, αστέρια + count, τίτλος, διαθεσιμότητα, «κέρδος €» + παλιά τιμή, κουμπί καλαθιού, σύγκριση, wishlist, badge my K premium. Χωρίς: δόση/μήνα, ενεργειακή ετικέτα, stock ανά κατάστημα, %.

## Προϊόν

- Gallery + counter, A+ content (AEM), TryMe video, key specs, EU energy label SVG, rating + Skroutz badge, σύντομη περιγραφή.
- Buy box: «κέρδος € (%)», τιμή, «από €/μήνα με online Πλάνο Δόσεων», «48 άτοκες με κάρτα», Klarna 3 άτοκες, Trade In banner, variants (χωρητικότητα με τιμή, χρώμα swatches), Plan K NEXT box, CTA «Απόκτησέ το», «2 προσφορές μαζί» (Total Support, TradeIn+NEXT), σημείωση ΦΠΑ επιχειρήσεων.
- Υπηρεσίες: Total Support Insurance (€229 iPhone / €55 TV), εγκατάσταση TV €54.99. Παράδοση ανά προϊόν με τιμή: 60' (Wolt €4.49), παραλαβή 20' δωρεάν σε 100 καταστήματα, Skroutz point €2.49, ραντεβού €5.99.
- **Bundle builder «Ολοκληρωμένες Λύσεις»**: κύριο + Total Support + αξεσουάρ + υπηρεσίες, σύνολο, «Προσθήκη όλων».
- Sticky bar με tabs Περιγραφή / Χαρακτηριστικά / Αξιολογήσεις / Υπηρεσίες + τιμή + CTA. Ομαδοποιημένος πίνακας specs με Προσβασιμότητα, έγγραφα εγγύησης.
- Add-to-cart drawer με upsells. Σύγκριση με PDF export και «επισήμανση διαφορών».
- Χωρίς: Q&A, related/recently viewed. Reviews lazy ❓.

## Καλάθι / Checkout / Λογαριασμός

- Καλάθι: tabs αποστολή / παραλαβή από κατάστημα ή Skroutz point (picker με ΤΚ), live stock validation (μπλόκαρε «Εξαντλημένο»), κουπόνι/δωροεπιταγή, υπηρεσίες ανά γραμμή, Plan K Snooze banner, **my K premium upsell card**, cross-sell.
- Checkout: drawer σύνδεσης με Google/Facebook/Apple, εγγραφή phone-first με OTP + reCAPTCHA. Guest checkout δεν φαίνεται ❓.
- Πληρωμές: κάρτες έως 48 άτοκες, Apple/Google Pay, Plan K (Δόσεων, Green έως 72, Snooze, Next, Mini), IRIS/κατάθεση, πληρωμή στο κατάστημα (Pay Express), αντικαταβολή έως €500, Klarna έως €1.000, SplitPay.
- Gift card €10–300 με email/SMS, σχέδια, μήνυμα, preview.
- Λογαριασμός: προφίλ, τιμολόγιο, διευθύνσεις, προτιμήσεις, παραγγελίες, my K, κουπόνια, αγαπημένα. Public: tracking (αριθμός + κινητό), εξέλιξη αιτήματος, αίτημα επιστροφής online, εξόφληση δόσεων online.
- Loyalty **my K** 2 βαθμίδων (δωρεάν / premium €49.90: δωρεάν μεταφορικά, -50% Total Support, κουπόνια €30, efood pro) + **Alpha Bonus** (1€ = 4 πόντοι).

## Υπηρεσίες & προγράμματα

- Παράδοση: Quick Drop 20', 60' (Wolt), same-day, next-day, ραντεβού (11 πόλεις), Skroutz point 24/7, εργαλείο ΤΚ → διαθέσιμες υπηρεσίες. Παραγγελία μέσω Wolt/efood/Skroutz. Χωρίς native app.
- **Plan K** 5 πλάνα χωρίς κάρτα, προέγκριση «Plan K Ready», εξόφληση online.
- **Trade In** με online εκτίμηση, 69–72 Service Points, ενσωμάτωση στο PDP.
- Ανακύκλωση 6 τύπων + δωροεπιταγή (€30 λευκές, έως €100 κλιματιστικά), «Δεύτερο Σπίτι» δωρεά συσκευής.
- Hub υπηρεσιών **K plus**: παράδοση-εγκατάσταση (10 τύποι), επισκευή (**Fix & Go 1 ώρα**, backup, αναβαθμίσεις, Pick & Pay), προστασία (Total Support έως 5 έτη, συντήρηση, calibration, smart home), ραντεβού με experts.
- Συμβόλαια: ασφάλιση, internet, κινητή, TV, ενέργεια.
- Καταστήματα: locator με Google Map, «ανοιχτό – κλείνει 21:00», 14 φίλτρα υπηρεσιών (parking, pet friendly, Scan&Go, Quick Point, Pay Express, Service Point), σελίδα ανά κατάστημα με ωράριο/υπηρεσίες/κοντινά.
- Προσφορές: εποχιακή landing `/pages/sales` + collections, outlet, stock specials, Weekend Bomb, εγγύηση τιμής μόνο Black Friday. Χωρίς μόνιμη σελίδα προσφορών με grid, χωρίς brand wall.
- KBLOG 8 ενοτήτων, FAQ σε κάθε κατηγορία, σελίδα ενεργειακών ετικετών, gift finder ❓.

## Τι παίρνουμε ως πήχη για το Euronics

Facets διαθεσιμότητας/παράδοσης, brand chips, load-more με μετρητή, variants με τιμή ανά επιλογή, energy label SVG, bundle builder, δόση/μήνα στο buy box, υπηρεσίες με τιμή στο PDP, παράδοση ανά προϊόν με τιμή/χρόνο, click & collect «σε N καταστήματα», sticky buy bar, add-to-cart drawer με upsells, fulfilment tabs στο καλάθι, live stock validation, social login/OTP, IRIS, Apple/Google Pay, δόσεις χωρίς κάρτα, trade-in με online εκτίμηση, ανακύκλωση με δωροεπιταγή, store pages με ωράρια/υπηρεσίες, public tracking, online επιστροφή, loyalty 2 βαθμίδων, live chat, CMP με ισότιμη απόρριψη.

Όπου η Euronics μπορεί να ξεπεράσει: %-έκπτωση + χαμηλότερη τιμή 30 ημερών + δόση + ενεργειακή κλάση **στην κάρτα** (ο Κωτσόβολος τα κρύβει στο PDP), Quick buy με νόμιμο φύλλο, μόνιμη σελίδα προσφορών με πραγματική λήξη, brand wall, 350 σελίδες καταστημάτων (έναντι 166), stock ανά κατάστημα στην κάρτα, Q&A, related/recently viewed, Renew ως κανονική κατηγορία με grading.

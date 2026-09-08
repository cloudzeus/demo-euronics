# Audit — www.euronics.gr (08/09/2026)

Μέθοδος: 45+ URLs (WebFetch + WebSearch). ✅ επαληθεύτηκε · ⚠️ μερική επαλήθευση · ❌ δεν βρέθηκε.

## 0. Πλατφόρμα

| Στοιχείο | Εύρημα |
|---|---|
| Πλατφόρμα | ✅ nopCommerce (ASP.NET), theme «Uptown» (Nop-Templates), Nop Ajax Filters. Copyright «© euronics 2020», Google+ share στο blog, ισολογισμοί μόνο 2014–2018 → παλιά/χαμηλής συντήρησης εγκατάσταση. |
| Γλώσσες / νόμισμα | ✅ Μόνο ελληνικά, EUR. |
| Cookie consent | ✅ Απλό «OK» bar, όχι CMP με κατηγορίες. |
| Νομικό πρόσωπο | MEGA ELECTRICS ΑΕΒΕ, ΑΦΜ 998182322, Δαμάσκου Σταμάτη 12, Αχαρνές. Συνεταιριστικό σχήμα ~350 ανεξάρτητων καταστημάτων-μελών. |
| Leftovers | Default social links nopCommerce, generic block «Ασφάλεια smartphone €23,90» σε ψυγεία/TV. |

## 1. Site map (URL patterns, flat slugs στο root, διπλότυπα `-2/-3`)

| Τύπος | Pattern | |
|---|---|---|
| Αρχική | `/` | ✅ |
| Root κατηγοριών | `/προϊοντα` (9 tiles με counts) | ✅ |
| Κατηγορία L1 (landing) | `/εικόνα-και-ήχος`, `/imaging`, `/computing`, `/τηλεφωνία`, `/gaming`, `/κλιματισμός-θέρμανση`, `/λευκές-συσκευές`, `/οικιακός-εξοπλισμός`, `/προσωπική-φροντίδα` | ✅ |
| Κατηγορία L2 (tiles) | `/τηλεοράσεις-αξεσουάρ`, `/ψυγεία`, `/κινητή-τηλεφωνία`, `/σκούπες` | ✅ |
| Listing | `/τηλεοράσεις`, `/κινητά-smartphones`, `/laptop-macbook` · `?pagenumber=N` · φίλτρα σε hash `#/specFilters/...` | ✅ |
| Προϊόν | `/{brand}-{model}-{τύπος}` | ✅ |
| Αναζήτηση | `/search?q=` · `/filterSearch?q=Refurbished` (landing «Renew») | ✅ |
| Κατασκευαστές | `/manufacturer/all` → 10 brands, όλα με 0 προϊόντα | ✅ μη λειτουργικό |
| Product tags (promo) | `/pitsosclima`, `climaoffers`, `fathersday`… | ✅ |
| Σύγκριση / Wishlist / Καλάθι | `/compareproducts`, `/wishlist`, `/cart` | ✅ |
| Checkout | `/onepagecheckout` (6 βήματα) | ⚠️ |
| Λογαριασμός | `/login`, `/register`, `/passwordrecovery`, `/customer/info`, `/customer/addresses`, `/order/history`, `/returnrequest` | ⚠️ |
| Καταστήματα | `/καταστηματα-2` και `/καταστήματα-euronics` (ίδιο locator, το δεύτερο με τόνους = 404) | ✅ |
| Υπηρεσίες | `/υπηρεσιες` (13 κάρτες χωρίς CTA/τιμές) | ✅ |
| Εταιρικές | `/αξίες-και-φιλοσοφία`, `/ιστορία-ποιοί-είμαστε` (404), `/οικονομικα-στοιχεια` (PDF 2014–2018) | ✅ |
| Πολιτικές | `/tropoi-pliromis`, `/tropoi-apostolis`, `/πολιτικη-επιστροφων-προιοντων`, `/conditions-of-use`, `/privacy-notice`, `/euronics-cookies` | ✅ |
| Επικοινωνία | `/contactus` (3 πεδία) | ✅ |
| Blog | `/blog`, `/e-news`, `/partners-news`, `/e-blog` · `/news` (1 άρθρο 2020, νεκρό) | ✅ |
| Sitemaps | `/sitemap`, `/sitemap.xml` (~900 URLs) | ✅ |
| Προσφορές / Φυλλάδιο | ❌ Δεν υπάρχει σελίδα. `offers-euronics.gr` δεν επιλύεται. | ❌ |
| FAQ, Loyalty, App, Gift card online, EN έκδοση | ❌ | ❌ |

## 2. Header / Navigation / Footer

- Header: logo, search (χωρίς επαληθευμένο autocomplete), καλάθι/wishlist counters, λογαριασμός, «ΤΗΛΕΦΩΝΙΚΕΣ ΠΑΡΑΓΓΕΛΙΕΣ 210 483 5143», Καταστήματα. Χωρίς promo bar, γλώσσα, προσφορές, chat.
- Μενού 6 στοιχείων: ΠΡΟΪΟΝΤΑ (mega-menu 3 επιπέδων, 9 ομάδες, ~200 links, μόνο κείμενο), EURONICS, ΚΑΤΑΣΤΗΜΑΤΑ, ΥΠΗΡΕΣΙΕΣ, ΤΑ ΝΕΑ ΜΑΣ, ΕΠΙΚΟΙΝΩΝΙΑ.
- Footer 5 στήλες: επικοινωνία, χρήσιμα, newsletter, χάρτης 220×170 «350 ΚΑΤΑΣΤΗΜΑΤΑ», social. Bottom: © 2020, όροι, κάρτες, GS1, «Powered by nopCommerce».

## 3. Αρχική (σειρά blocks)

1. Header + mega-menu · 2. Hero (μία στατική εικόνα 1920×400) · 3. Carousel «ΠΡΟΤΑΣΕΙΣ ΔΡΟΣΙΑΣ» (4 κλιματιστικά) · 4. USP strip 4 εικονιδίων · 5. 6 banners καμπανιών (PNG με κείμενο) · 6. Category banner Οθόνες · 7. Blog 4 άρθρα · 8. Newsletter · 9. Footer.
Δεν υπάρχουν: category tiles, brands, best sellers/νέα/προσφορές, countdown, recently viewed, reviews, app banner.

## 4. Listing

- Counts: Εικόνα & Ήχος 291, Imaging 6, Computing 181, Τηλεφωνία 225, Gaming 15, Κλιματισμός 227, Λευκές 645, Οικιακός 508, Προσωπική Φροντίδα 158 (≈2.250 SKUs).
- Category banner ανά κατηγορία (χειροκίνητο). Φίλτρα AJAX: τιμή slider, κατασκευαστής, πλούσια spec attributes (TV: ίντσες, panel, ανάλυση, Hz· ψυγεία: ενεργειακή κλάση, ύψος, No Frost…). Χωρίς URL state, χωρίς chips επιλεγμένων.
- Ταξινόμηση 6 επιλογών, grid/list, 8–10 προϊόντα/σελίδα (22 σελίδες TV).
- Κάρτα: 2 εικόνες hover, brand, μοντέλο, μία γραμμή specs, 3 καταστάσεις διαθεσιμότητας, «ΤΙΜΗ ESHOP» + διαγραμμένη. Χωρίς badge %, rating, δόσεις, ενεργειακή ετικέτα, quick add.

## 5. Σελίδα προϊόντος

- Breadcrumb 5 επιπέδων, τίτλος, EAN, SKU, gallery έως 9 εικόνες με zoom.
- Τιμή/παλιά τιμή, «Πιστωτική κάρτα από €X/μήνα» + «Δόσεις χωρίς κάρτα» (Eurobank) — συχνά κενές.
- Add-ons: ασφάλεια smartphone €23,90 (σε όλα), επέκταση εγγύησης έως 5 έτη. Χωρίς εγκατάσταση/ανακύκλωση ως επιλογή.
- Διαθεσιμότητα + «Βρες ένα κατάστημα» (locator, όχι stock ανά κατάστημα).
- Highlights + flat πίνακας specs (δύο φορές). Ενεργειακή κλάση μόνο ως κείμενο (χωρίς ετικέτα/δελτίο EPREL).
- Variants = ξεχωριστά URLs. Χωρίς reviews, Q&A, manuals, video, sticky buy box, back-in-stock.
- Renew/Refurbished: μόνο μέσω `/filterSearch`, εξήγηση Grade A/B μόνο σε blog post.

## 6. Καλάθι / Checkout / Λογαριασμός

- Καλάθι με progress 6 βημάτων· checkout nopCommerce one-page· guest checkout δεν επαληθεύτηκε.
- Register: 14 πεδία, χωρίς ΑΦΜ/ΔΟΥ. Χωρίς social login, OTP.
- Πληρωμές: κάρτα έως 24 άτοκες, κατάθεση (4 τράπεζες), δόσεις χωρίς κάρτα Eurobank €200–2.000 (14,40%), PayPal «σύντομα», αντικαταβολή ασυνεπής. Χωρίς IRIS, Apple/Google Pay, Klarna.
- Αποστολή: «δωρεάν σε όλη την Ελλάδα» vs όροι (4 πόλεις), 3–7 εργάσιμες, παραλαβή από κατάστημα, χωρίς tracking/ραντεβού.
- Επιστροφές: 14 ημέρες, DOA 7/10, μόνο email/τηλέφωνο (χωρίς RMA).

## 7. Υπηρεσίες / Καταστήματα / Περιεχόμενο

- 13 υπηρεσίες ως κάρτες χωρίς σελίδα/τιμή/CTA: επέκταση εγγύησης, ανακύκλωση, e-support, εγγύηση χαμηλότερης τιμής, παράδοση & εγκατάσταση, συντήρηση-επισκευή, εγγύηση αλλαγής, χρηματοδότηση, συμβουλευτική, παραλαβή με ένα κλικ, κάρτες δώρου, υποστήριξη high-tech, δωρεάν φύλαξη.
- Καταστήματα: radius locator (πόλη/ΤΚ/ακτίνα/geo), λίστα με επωνυμία μέλους, «Απόσταση 0 km», χωρίς ωράρια/υπηρεσίες/σελίδα ανά κατάστημα.
- Blog: οδηγοί, διαγωνισμοί, ανακοινώσεις, share Google+, φόρμα σχολίων.

## 8. Συμπέρασμα — τι υπάρχει / τι λείπει

Υπάρχει: mega-menu, AJAX spec facets, 3 καταστάσεις διαθεσιμότητας, δόσεις, add-ons εγγύησης/ασφάλειας, click & collect, locator 350 σημείων, wishlist/σύγκριση/quick view, Renew, blog, newsletter.

Λείπει: σελίδα προσφορών/φυλλάδιο, badges/countdown, ενεργά brands, reviews/Q&A/manuals/energy label, variants με swatches, URL-state φίλτρα, guest checkout σήμα, ΑΦΜ/τιμολόγιο, RMA, live chat, FAQ, tracking, ωράρια/stock ανά κατάστημα, loyalty, app, gift card online, EN, CMP cookies. Πολλά ίχνη εγκατάλειψης (© 2020, News 2020, ισολογισμοί 2018, 404 σε slugs με τόνους).

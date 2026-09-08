# Δυναμικά components — data contract για τη σύνδεση με ERP / CMS

Κάθε component του demo που σήμερα διαβάζει fixtures έχει σχόλιο `@dynamic` στην κορυφή του με την πηγή του. Ο παρακάτω πίνακας είναι το συμβόλαιο: ίδιες υπογραφές συναρτήσεων στο `lib/data/repo.ts`, ίδια props στα components. Η σύνδεση γίνεται μόνο μέσα στο repository (κανένα page δεν καλεί ERP απευθείας).

| Component / σελίδα | Repository | Πηγή παραγωγής | Cache |
|---|---|---|---|
| Αρχική — ζώνες (`lib/cms/home.layout.ts`) | `getHomeLayout()` | CMS zones (schedule, ορατότητα, A/B) | ISR 60s |
| `NewsBand`, `/nea`, `/nea/[slug]` | `getNews({category, limit})`, `getNewsItem(slug)` | CMS «Νέα & ανακοινώσεις» (ή SoftOne Ανακοινώσεις) | ISR 300s, revalidate on publish |
| `DealsRail`, `DealOfDayTile` | `listProducts({tag})`, `getDealOfDay()` | SoftOne MTRL + τιμοκατάλογος προσφορών (PRCRULES), Omnibus 30 ημερών από ιστορικό τιμών | ISR 60s |
| `ProductCard`, `ProductGrid`, `Facets` | `listProducts(filter)` | SoftOne MTRL + χαρακτηριστικά (CCCSUBGROUP2 / extra fields) → `lib/data/attributes` | ISR 60s, facets από search index |
| `ProductHeader`, `BuyBox`, `SpecsTable`, `CompareSimilar` | `getProductBySlug`, `getRelated`, `getAccessoriesFor` | SoftOne MTRL, απόθεμα ανά κατάστημα (MTRSTORE), σχετικά/συμπληρωματικά από ITEGROUP mapping | ISR 60s· απόθεμα live (no-store) |
| `SmartGuide` | `listProducts({l1,l2})` + `lib/guides/smart.ts` | Ίδια χαρακτηριστικά· τα βάρη των κριτηρίων στο CMS | ISR 60s |
| `StoreFinder`, `/katastimata` | `getStores(q)` | SoftOne BRANCH/κατάστημα μέλους + ωράρια από CMS | ISR 3600s |
| `ServicesBand`, `/ypiresies` | `getServicesFull()` | CMS υπηρεσίες με τιμές (τιμές από SoftOne SRV items) | ISR 3600s |
| Λογαριασμός — Επισκόπηση | `getCustomer`, `getOrders`, `getInstalmentPlans`, `getAppointments` | SoftOne CUSTOMER (TRDR), SALDOC, FINDOC, SRVJOB | no-store (session) |
| Λογαριασμός — Τα στοιχεία μου (`ProfileForm`) | `getCustomer` · `PATCH /api/account/profile` | SoftOne CUSTOMER · auth provider (κωδικός, 2FA) · DPO workflow για GDPR | no-store |
| Λογαριασμός — Παραγγελίες & παρακολούθηση (`OrderTimeline`) | `getOrders`, `getOrder(no)` | SoftOne SALDOC + courier tracking API (ACS/Γενική) | no-store, polling 60s σε «σε διανομή» |
| Λογαριασμός — Πληρωμές & δόσεις | `getPaymentMethods`, `getInstalmentPlans` | PSP token vault (μόνο masked), FINDOC / Eurobank consumer credit | no-store |
| Λογαριασμός — Ραντεβού & service | `getAppointments` | SoftOne Service (SRVJOB) + ημερολόγιο καταστήματος | no-store |
| Λογαριασμός — Ειδοποιήσεις (`ConsentsForm`) | `getConsents` · `POST /api/account/consents` | Consent ledger (GDPR άρθρο 7): topic, channel, value, timestamp, source | no-store |
| Λογαριασμός — Διευθύνσεις, Επιστροφές, Εγγυήσεις | `getOrders`, demo address | SoftOne TRDR addresses, RMA module, εγγυήσεις από SALDOC + add-ons | no-store |
| `/entopismos` (δημόσια παρακολούθηση) | `getOrder(no)` + έλεγχος κινητού/email | SALDOC + courier API | no-store |
| SEO · AEO · GEO (`lib/seo/product.ts`) | από `Product` | Παράγεται από το record — καμία χειρόγραφη εργασία ανά SKU | ίδιο με το προϊόν |

## Κανόνες

1. **Το UI δεν αλλάζει** όταν συνδεθεί η πηγή: μόνο το σώμα των συναρτήσεων στο `lib/data/repo.ts`.
2. **Adaptive παντού**: κάθε component είναι container (`eu-container`), οι στήλες προκύπτουν από το διαθέσιμο πλάτος (`auto-fill/auto-fit minmax`), τα rails από `CardCarousel`, ποτέ εσωτερικοί scrollers.
3. **Εικόνες** μόνο μέσα από `ProductImage` (σταθερό πλαίσιο) και τοπικά αντίγραφα / CDN της Euronics — όχι hotlink σε thumbs που αλλάζουν.
4. **Κείμενα σχεδιαστικής αιτιολόγησης** δεν εμφανίζονται στο site· ζουν στο `docs/design-notes-client.md` και στην παρουσίαση `/protasi`.

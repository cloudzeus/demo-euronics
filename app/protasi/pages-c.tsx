/* eslint-disable react/jsx-key -- Table assigns keys per cell when rendering */
import { Body, Callout, DocPage, Kicker, Mark, PageHead, Table, Tag } from "@/components/doc/DocPage";

type M = "yes" | "no" | "partial" | "new";
const row = (f: string, e: M, k: M, kt: M, n: M, note?: string) => [f, <Mark key="e" v={e} />, <Mark key="k" v={k} />, <Mark key="kt" v={kt} />, <Mark key="n" v={n} />, note ?? ""];

/** Pages 12–18: scan of euronics.gr, what we carry from kolleris, Kotsovolos benchmark, feature matrix, architecture, fluid & zones, next steps. */
export function PagesC() {
  return (
    <>
      {/* 12 · euronics.gr site map */}
      <DocPage no={12} label="Σάρωση euronics.gr">
        <PageHead title="Σάρωση euronics.gr · όλες οι σελίδες του eshop" section="Σάρωση" no={12} />
        <div className="grid grid-cols-[1.25fr_1fr] gap-6 flex-1">
          <Table
            head={["Τύπος σελίδας", "URL pattern (nopCommerce, flat slugs)", "Κατάσταση"]}
            widths={["24%", "50%"]}
            dense
            rows={[
              ["Αρχική", "/", "1 στατικό hero, 1 carousel, 6 PNG tiles, blog, 2× newsletter"],
              ["Root / L1 / L2 κατηγορίες", "/προϊοντα · /λευκές-συσκευές · /ψυγεία (tiles με counts)", "9 L1, ~200 leaf, ≈2.250 SKU"],
              ["Listing", "/τηλεοράσεις?pagenumber=N · φίλτρα σε #/specFilters", "10/σελίδα, 22 σελίδες TV, χωρίς URL state"],
              ["Προϊόν", "/{brand}-{model}-{τύπος}", "variants = ξεχωριστά URL, κενές δόσεις"],
              ["Αναζήτηση / tags", "/search?q= · /filterSearch?q=Refurbished · /pitsosclima", "χωρίς autocomplete"],
              ["Κατασκευαστές", "/manufacturer/all → 10 brands × 0 προϊόντα", <span className="text-eu-red font-semibold">νεκρό</span>],
              ["Καλάθι / Checkout", "/cart · /onepagecheckout (6 βήματα)", "guest ❓, χωρίς ΑΦΜ"],
              ["Λογαριασμός", "/login /register /customer/info /order/history /returnrequest", "default nopCommerce"],
              ["Wishlist / Σύγκριση", "/wishlist · /compareproducts", "✓"],
              ["Καταστήματα", "/καταστηματα-2 και /καταστήματα-euronics (το ίδιο· με τόνους 404)", "«0 km», χωρίς ωράρια/σελίδες"],
              ["Υπηρεσίες", "/υπηρεσιες (13 κάρτες)", "χωρίς links/τιμές"],
              ["Εταιρικές / πολιτικές", "/αξίες-και-φιλοσοφία · /οικονομικα-στοιχεια · /tropoi-pliromis · /tropoi-apostolis · /privacy-notice · /euronics-cookies · /contactus", "ισολογισμοί 2014–2018"],
              ["Blog / News", "/blog · /e-news · /partners-news · /e-blog · /news (2020)", "Google+ share"],
              ["Sitemaps", "/sitemap · /sitemap.xml (~900 URLs)", "✓"],
              ["Προσφορές / Φυλλάδιο / FAQ / Loyalty / App / EN", "—", <span className="text-eu-red font-semibold">δεν υπάρχουν</span>],
            ]}
          />
          <div>
            <Kicker>Τι υπάρχει και κρατάμε</Kicker>
            <Body className="text-[11.5px] mb-3">
              Mega-menu 3 επιπέδων και το δέντρο κατηγοριών · πλούσια spec facets ανά κατηγορία (ίντσες, panel, Hz, BTU, ενεργειακή κλάση, No Frost…) · 3 καταστάσεις διαθεσιμότητας · δόσεις με κάρτα έως 24 άτοκες + «δόσεις χωρίς κάρτα» Eurobank · add-ons ασφάλειας/εγγύησης · click & collect · locator 350 σημείων · Renew (refurbished) · blog με οδηγούς · GS1.
            </Body>
            <Kicker tone="red">Τι λείπει εντελώς</Kicker>
            <Body className="text-[11.5px] mb-3">
              Σελίδα προσφορών, badges/countdown, ενεργά brands, reviews/Q&A/manuals/video, energy label, variants με swatches, URL φίλτρα, guest checkout, ΑΦΜ/τιμολόγιο, online RMA, live chat, FAQ, tracking, ωράρια & stock ανά κατάστημα, loyalty, gift card online, CMP cookies, structured data.
            </Body>
            <Callout title="Ίχνη εγκατάλειψης της πλατφόρμας">© euronics 2020 · News module 2020 · Google+ share · οικονομικά έως 2018 · default social links nopCommerce · slugs με/χωρίς τόνους που δίνουν 404 · «PayPal σύντομα» · «ασφάλεια smartphone» σε ψυγεία. Δεν αναβαθμίζεται — αντικαθίσταται.</Callout>
          </div>
        </div>
      </DocPage>

      {/* 13 · What we carry from web.kolleris.com */}
      <DocPage no={13} label="web.kolleris.com">
        <PageHead title="Τι μεταφέρουμε από το web.kolleris.com" section="Αναφορά υλοποίησης" no={13} />
        <div className="grid grid-cols-[1fr_1fr] gap-6 flex-1">
          <div>
            <Kicker>Αποδεδειγμένη αρχιτεκτονική — χωρίς ενδιάμεση πλατφόρμα</Kicker>
            <Body className="text-[11.5px] mb-3">
              Το web.kolleris.com (8.924 κωδικοί, 24 κατηγορίες, 3 γλώσσες) τρέχει σε <strong>Next.js App Router → API layer → SoftOne ERP</strong>: κατάλογος, τιμές, πραγματικό απόθεμα (ποσότητα ERP), πελάτης ↔ ΑΦΜ (ΑΑΔΕ lookup και match με καρτέλα), παραγγελίες πίσω στο ERP. Cloudflare + CDN εικόνων, `next/image`, JSON-LD Product/Breadcrumb/SearchAction, hreflang.
            </Body>
            <Kicker>Λειτουργικότητες που μεταφέρονται ως έχουν</Kicker>
            <Body className="text-[11.5px]">
              Mega menu με πλήθη · search με scope κατηγορίας + autocomplete (κωδικός / προϊόντα / κατηγορίες) · taxonomy finder · φίλτρα με chips και «καθαρισμός» · sort / per page / per row · quick view · σύγκριση έως 4 με «διαφέρει» · αγαπημένα · «Αγορά τώρα» · mini-cart με free-shipping progress · real-time stock από ERP · split «διαθέσιμα n / υπόλοιπα κατόπιν παραγγελίας» · countdown «παραγγείλετε μέσα σε…» · τιμή καταλόγου + % · προσφορές με campaign landing + OfferCountdown · νέες αφίξεις ανά μήνα · guest checkout · address autocomplete · τιμολόγιο με ΑΑΔΕ autofill · παραλαβή από κατάστημα · Viva (κάρτες/PayPal/IRIS) + κατάθεση με κράτηση αποθέματος · public tracking με courier link · λογαριασμός (παραγγελίες, διευθύνσεις, εγγυήσεις, επιστροφές, αγαπημένα) · FAQ, πολιτικές, επικοινωνία με «ανοιχτά τώρα» · schema.org.
            </Body>
          </div>
          <div>
            <Kicker tone="red">Τι ΔΕΝ μεταφέρεται (απόφαση: χωρίς B2B)</Kicker>
            <Body className="text-[11.5px] mb-3">
              Τιμές συνεργάτη, εταιρικοί λογαριασμοί με χρήστες/ρόλους/όρια, λίστες υλικών, μαζική παραγγελία με paste, τιμολόγια B2B, «είστε επαγγελματίας;» blocks. Το Euronics είναι αμιγώς B2C· το τιμολόγιο παραμένει ως απλή επιλογή στο checkout.
            </Body>
            <Kicker>Τι διορθώνουμε σε σχέση με το kolleris</Kicker>
            <Body className="text-[11.5px] mb-3">
              Attribute facets (το kolleris έχει μόνο brand/τιμή/διαθεσιμότητα) · variants με swatches · reviews & Q&A προϊόντος · manuals/video · bundles & αξεσουάρ · back-in-stock · κουπόνια (ανενεργά εκεί) · αντικαταβολή & δόσεις · πολλαπλά καταστήματα με locator · CMP cookies · blog ενεργό · 404 με layout · og:image.
            </Body>
            <div className="flex flex-wrap gap-1.5 mt-2">
              <Tag>Next.js App Router</Tag>
              <Tag tone="blue">ERP-direct</Tag>
              <Tag tone="green">Guest checkout</Tag>
              <Tag tone="green">ΑΑΔΕ lookup</Tag>
              <Tag tone="purple">Schema.org</Tag>
              <Tag tone="yellow">Real-time stock</Tag>
              <Tag tone="red">Χωρίς B2B</Tag>
            </div>
          </div>
        </div>
      </DocPage>

      {/* 14 · Kotsovolos benchmark */}
      <DocPage no={14} label="Benchmark Κωτσόβολος">
        <PageHead title="Ο ανταγωνισμός · kotsovolos.gr ως πήχης" section="Benchmark" no={14} />
        <div className="grid grid-cols-3 gap-5 flex-1">
          <div>
            <Kicker>Τι κάνει σωστά</Kicker>
            <Body className="text-[11.5px]">
              Facets διαθεσιμότητας <em>και</em> τρόπου παράδοσης (60′, σήμερα, αύριο, ραντεβού) · brand chips πάνω από το grid · load-more με μετρητή · variants με τιμή ανά επιλογή · EU energy label SVG στο PDP · <strong>bundle builder</strong> «Ολοκληρωμένες λύσεις» · υπηρεσίες με τιμή στο buy box (Total Support €55–229, εγκατάσταση TV €54,99) · παράδοση ανά προϊόν με τιμή/χρόνο · click & collect «σε 100 καταστήματα» · sticky buy bar · add-to-cart drawer με upsells · fulfilment tabs και live stock validation στο καλάθι · social login + OTP · IRIS, Apple/Google Pay, Klarna, Plan K χωρίς κάρτα, SplitPay · trade-in με online εκτίμηση · ανακύκλωση με δωροεπιταγή · σελίδες καταστημάτων με ωράρια & 14 φίλτρα υπηρεσιών · public tracking, online επιστροφή, εξόφληση δόσεων · loyalty 2 βαθμίδων (my K €49,90) + Alpha Bonus · live chat · Cookiebot με ισότιμη απόρριψη · FAQ σε κάθε κατηγορία.
            </Body>
          </div>
          <div>
            <Kicker tone="red">Πού είναι αδύναμος</Kicker>
            <Body className="text-[11.5px]">
              Χωρίς οριζόντια μπάρα κατηγοριών (όλα πίσω από hamburger) · «κέρδος €» αντί % · χωρίς δόση/μήνα, ενεργειακή κλάση ή stock ανά κατάστημα <strong>στην κάρτα</strong> · χωρίς Q&A, related, recently viewed · reviews lazy/αόρατα · χωρίς μόνιμη σελίδα προσφορών (μόνο collections) · χωρίς brand wall · χωρίς native app · guest checkout δεν φαίνεται · sponsored rows και in-grid διαφημίσεις θολώνουν το listing · SPA client-rendered (κενό HTML για crawlers, βαρύ σε κινητό) · legacy WebSphere routes (`SearchDisplay`, `storeId=10151`).
            </Body>
          </div>
          <div>
            <Kicker>Πού ξεπερνά η πρόταση Euronics</Kicker>
            <Body className="text-[11.5px] mb-3">
              Οι 9 πληροφορίες <strong>στην κάρτα</strong> (%, 30 ημέρες, δόση, ενεργειακή κλάση, ημερομηνία παράδοσης, stock καταστημάτων) · Quick buy με νόμιμο φύλλο · μόνιμη σελίδα προσφορών με πραγματική λήξη · brand wall & brand pages · <strong>350</strong> σελίδες καταστημάτων (έναντι 166) με LocalBusiness · Renew ως κανονική κατηγορία με grading · server-rendered HTML με ISR (SEO + ταχύτητα) · fluid components ανά συσκευή · ζώνες marketing με A/B χωρίς deploy · χωρίς retail media θόρυβο.
            </Body>
            <Callout title="Ο πήχης σε αριθμούς" tone="navy">
              Κωτσόβολος: 30.000+ προϊόντα, 887 brands, 148–151 καταστήματα, 48 άτοκες, παράδοση σε 60′.
              <br />
              Euronics: ≈2.250 SKU σήμερα, 350 καταστήματα-μέλη, 13 υπηρεσίες, 24 άτοκες. Το δίκτυο είναι το πλεονέκτημα — η πρόταση το βάζει στην πρώτη οθόνη.
            </Callout>
          </div>
        </div>
      </DocPage>

      {/* 15 · Feature matrix */}
      <DocPage no={15} label="Πίνακας λειτουργικοτήτων">
        <PageHead title="Πίνακας λειτουργικοτήτων" section="euronics.gr σήμερα · kolleris · Κωτσόβολος · νέο" no={15} />
        <div className="grid grid-cols-2 gap-4 flex-1 items-start">
          <Table
            head={["Λειτουργία", "euronics.gr", "kolleris", "Κωτσόβολος", "Νέο", ""]}
            widths={["52%", "11%", "10%", "12%", "8%"]}
            dense
            rows={[
              row("Search autocomplete με scope & 4 ομάδες", "no", "yes", "partial", "yes"),
              row("Mega menu με πλήθη + accordion κινητού", "partial", "yes", "yes", "yes"),
              row("Spec facets ανά κατηγορία, σε URL", "partial", "no", "yes", "yes"),
              row("Facet διαθεσιμότητας / παράδοσης / brand chips", "no", "partial", "yes", "yes"),
              row("Κάρτα: % · 30 ημέρες · δόση · ενέργεια · stock", "no", "partial", "partial", "new"),
              row("Quick buy με νόμιμο φύλλο (2011/83, SCA)", "no", "partial", "no", "new"),
              row("Variants με swatches & τιμή ανά επιλογή", "no", "no", "yes", "yes"),
              row("Sticky buy box · επιλογέας καταστήματος με stock", "no", "no", "partial", "new"),
              row("Add-ons υπηρεσιών με τιμή στο PDP", "partial", "no", "yes", "yes"),
              row("Bundle builder · αξεσουάρ · related · recently viewed", "no", "partial", "partial", "yes"),
              row("Reviews · Q&A · manuals · video · energy label", "no", "no", "partial", "yes"),
              row("Σύγκριση με «διαφέρει» · wishlist · quick view", "partial", "yes", "yes", "yes"),
              row("Μόνιμη σελίδα προσφορών με πραγματική λήξη", "no", "yes", "no", "yes"),
              row("Brand wall & brand pages", "no", "yes", "no", "yes"),
              row("Renew / refurbished με grading", "partial", "no", "partial", "yes"),
            ]}
          />
          <Table
            head={["Λειτουργία", "euronics.gr", "kolleris", "Κωτσόβολος", "Νέο", ""]}
            widths={["52%", "11%", "10%", "12%", "8%"]}
            dense
            rows={[
              row("Mini-cart · free-shipping progress · live stock", "no", "yes", "yes", "yes"),
              row("Guest checkout · ΑΦΜ με ΑΑΔΕ · address autocomplete", "no", "yes", "partial", "yes"),
              row("Checkout 3 βημάτων, click & collect, ραντεβού", "partial", "partial", "yes", "yes"),
              row("Κάρτες/δόσεις · IRIS · Apple/Google Pay · αντικαταβολή", "partial", "partial", "yes", "yes"),
              row("Δόσεις χωρίς κάρτα (τραπεζικό πρόγραμμα)", "yes", "no", "yes", "yes"),
              row("Public tracking · online RMA · εξόφληση δόσεων", "no", "partial", "yes", "yes"),
              row("Social login · OTP · magic link", "no", "partial", "yes", "yes"),
              row("Locator με απόσταση, ωράρια, stock · 350 store pages", "partial", "no", "yes", "new"),
              row("12 σελίδες υπηρεσιών με τιμή & κράτηση", "no", "no", "yes", "yes"),
              row("Trade-in εκτίμηση · ανακύκλωση με δωροεπιταγή", "no", "no", "yes", "yes"),
              row("Gift card online · loyalty", "no", "no", "yes", "yes"),
              row("Live chat · FAQ hub · CMP cookies", "no", "partial", "yes", "yes"),
              row("Ζώνες marketing με schedule / A/B / ορατότητα", "no", "partial", "partial", "new"),
              row("Fluid/adaptive components ανά συσκευή", "no", "partial", "partial", "new"),
              row("SSR/ISR · schema.org · Core Web Vitals budget", "no", "yes", "no", "yes"),
              row("B2B section", "no", "yes", "yes", "no", "εκτός scope"),
            ]}
          />
        </div>
        <div className="flex gap-4 mt-3 text-[10.5px] text-eu-muted">
          <span>
            <Mark v="yes" /> υπάρχει
          </span>
          <span>
            <Mark v="partial" /> μερικώς
          </span>
          <span>
            <Mark v="no" /> δεν υπάρχει
          </span>
          <span>
            <Mark v="new" /> νέο, δεν το έχει κανείς από τους τρεις
          </span>
          <span className="ml-auto">Σύνολο νέων/βελτιωμένων λειτουργιών στο νέο euronics.gr: 31 · εκ των οποίων 6 πρωτότυπες</span>
        </div>
      </DocPage>

      {/* 16 · Architecture without intermediate platform */}
      <DocPage no={16} tone="dark" label="Αρχιτεκτονική">
        <PageHead title="Αρχιτεκτονική · χωρίς ενδιάμεση πλατφόρμα ηλεκτρονικού εμπορίου" section="Τεχνολογία" no={16} tone="dark" />
        <div className="grid grid-cols-[1.1fr_1fr] gap-7 flex-1">
          <div>
            <div className="grid grid-cols-4 gap-2 text-[10px] leading-[1.4] mb-4">
              {[
                ["Frontend", "Next.js 16 App Router · React server components · Tailwind 4 · shadcn/ui · Motion · fluid tokens", "bg-eu-blue"],
                ["Commerce core", "Prisma / MySQL 8: Product · Variant · Price(30d) · Stock@Store · Cart · Order · Customer · Service · Store · Page · Zone · Widget", "bg-eu-navy-2"],
                ["Integrations", "ERP adapter (κατάλογος, τιμές, απόθεμα ανά κατάστημα, παραγγελίες, ΑΦΜ) · Viva/Stripe · IRIS · courier · ΑΑΔΕ · Meilisearch · PostHog", "bg-eu-navy-2"],
                ["ERP Euronics", "Πηγή αλήθειας για είδη, τιμές, απόθεμα, πελάτες, παραστατικά. Ο adapter SoftOne υπάρχει· ο adapter της Euronics γράφεται στο ίδιο interface.", "bg-eu-blue-dark"],
              ].map(([t, b, c]) => (
                <div key={t} className={`${c} rounded-lg p-3 border border-eu-navy-line`}>
                  <div className="font-extrabold text-eu-yellow text-[10px] tracking-[0.08em] mb-1.5">{t}</div>
                  <div className="text-eu-on-dark">{b}</div>
                </div>
              ))}
            </div>
            <Body dark className="text-[11.5px]">
              <strong className="text-white">Ροή δεδομένων.</strong> Ο κατάλογος συγχρονίζεται από το ERP στη MySQL (delta ανά 10′, πλήρες νυχτερινό)· τα server components διαβάζουν <em>μόνο</em> από τη MySQL, ποτέ από το ERP σε request time. Τιμή/απόθεμα ανά κατάστημα έρχονται σε ξεχωριστό ελαφρύ αίτημα ώστε το HTML να μένει στο ISR cache. Η παραγγελία γράφεται πρώτα στη MySQL (πηγή για τον πελάτη, tracking, RMA) και μετά στο ERP μέσω ουράς με retry· η επιβεβαίωση πληρωμής έρχεται από webhook.
              <br />
              <br />
              <strong className="text-white">Γιατί όχι nopCommerce/Magento/Woo.</strong> Κάθε ενδιάμεση πλατφόρμα φέρνει δικό της μοντέλο δεδομένων, δικό του admin, δικά της plugins και δεύτερη πηγή αλήθειας δίπλα στο ERP — ακριβώς η κατάσταση που παρήγαγε τα σημερινά «PayPal σύντομα», «0 km», κενές δόσεις. Με δικό μας πυρήνα, το ERP είναι η μία αλήθεια και το CMS ζωνών η μία επιφάνεια marketing.
            </Body>
          </div>
          <div>
            <Kicker tone="yellow">Μοντέλο δεδομένων (prisma/schema.prisma)</Kicker>
            <pre className="m-0 bg-eu-blue-dark border border-eu-navy-line rounded-lg p-3 text-[9.5px] leading-[1.45] text-eu-on-dark overflow-hidden font-mono whitespace-pre">{`Product ─┬─ Variant (χρώμα, χωρητικότητα) ─ Price (current, was, lowest30d)
         ├─ Spec (group, key, value)     ─ EnergyLabel (class, fiche, EPREL)
         ├─ Media (image, video, manual) ─ Review · Question
         └─ StoreStock (store, qty, updatedAt)
Store ── OpeningHours · Services · LocalBusiness JSON-LD
Service ── price, steps, faq, addonRule (PDP / checkout / delivery)
Customer ── Address · SavedCard(token) · Consent · Wishlist · Compare
Cart ── CartLine (product, variant, addons[]) ── Order ── OrderLine
Order ── Payment (Viva/Stripe/IRIS/COD) · Fulfilment (courier/click&collect)
     └─ ErpSync (status, attempts, erpId) · Return (RMA)
Page ── Zone ── Widget (type, props, query, schedule, visibility, ab)
Campaign ── endsAt (Omnibus) · Guide · Faq · Redirect`}</pre>
            <div className="mt-3">
              <Callout title="Λειτουργία & ασφάλεια" tone="blue">
                Vercel ή δικό μας Node σε Cloudflare · MySQL 8 managed με PITR · ουρά (BullMQ/Redis) για sync & παραγγελίες · secrets σε vault · rate limiting στο checkout · PCI εκτός scope (tokenization από πάροχο) · audit log στο CMS · axe + Lighthouse budgets στο CI · staging με ανώνυμο snapshot ERP.
              </Callout>
            </div>
          </div>
        </div>
      </DocPage>

      {/* 17 · Fluid components & marketing zones */}
      <DocPage no={17} label="Fluid components & ζώνες marketing">
        <PageHead title="Fluid components · adaptive ανά συσκευή · ζώνες marketing" section="Σύστημα" no={17} />
        <div className="grid grid-cols-2 gap-7 flex-1">
          <div>
            <Kicker>Fluid / adaptive — pixel perfect στο desktop, προσαρμογή περιεχομένου αλλού</Kicker>
            <Body className="text-[11.5px]">
              <strong>1 · Τυπογραφία σε rem με clamp().</strong> Κάθε μέγεθος του design είναι token (<code className="font-mono">--fs-13</code>…) που ισούται ακριβώς με το design στα 1280px+, μεγαλώνει +1px στα μικρά κείμενα και μικραίνει ×0,78 στους τίτλους στα 360px — γραμμικά, χωρίς breakpoints. Σε iOS τα inputs δεν προκαλούν zoom· στόχοι αφής ≥44px.
              <br />
              <br />
              <strong>2 · Container queries αντί viewport.</strong> Κάθε widget είναι container· τα μέρη του απαντούν στο πλάτος που πραγματικά παίρνει (η κάρτα σε rail 4-up, 2-up ή sidebar συμπεριφέρεται σωστά χωρίς να ξέρει τη σελίδα).
              <br />
              <br />
              <strong>3 · Device class από τον server.</strong> Το User-Agent/Client Hints δίνουν mobile / tablet / desktop πριν το πρώτο byte (<code className="font-mono">data-device</code> στο html) — άρα το περιεχόμενο είναι σωστό πριν την υδάτωση, όχι μετά από layout shift. Ο client το διορθώνει με το πραγματικό viewport.
              <br />
              <br />
              <strong>4 · Content adaptation, όχι μόνο layout.</strong> <code className="font-mono">FluidContent</code> μετρά το κουτί του και αποφασίζει: λιγότερα προϊόντα, συντομότερο copy, διαφορετικό component. Παραδείγματα στο prototype: κάρτα προϊόντος (στοιχισμένα κουμπιά & σύντομη διαθεσιμότητα σε στενό container), hero (κόψιμο σώματος σε 9/12/16 λέξεις), header (search σε δεύτερη γραμμή, όχι πίσω από εικονίδιο), mega menu → accordion drawer, quick buy → bottom sheet, deals → snap rail 78% πλάτους, bento → μία στήλη με σειρά καμπάνια → προσφορά → κατάστημα. Save-Data: ένα slide, δύο προσφορές, χωρίς οδηγούς.
            </Body>
          </div>
          <div>
            <Kicker>Ζώνες marketing — το CMS αποθηκεύει δομή, όχι HTML</Kicker>
            <Body className="text-[11.5px] mb-3">
              Μια σελίδα = λίστα ζωνών (πάνω από header, main, pre-footer). Μια ζώνη = λίστα widgets από registry. Κάθε widget έχει: <strong>props</strong> (τίτλοι, επιλογές), <strong>query</strong> (κατηγορία, tag, saved search, bestsellers 30d, ids με pin), <strong>schedule</strong> (από/έως — και ο countdown δείχνει την ίδια λήξη: Omnibus), <strong>ορατότητα</strong> (συσκευές, κοινό guest/πελάτης/επιστρέφων, περιοχή μετά από ενέργεια χρήστη, Save-Data), <strong>A/B</strong> (πείραμα, παραλλαγή, ποσοστό), αριθμό ζώνης για το preview <code className="font-mono">?zones=1</code>.
            </Body>
            <pre className="m-0 bg-eu-surface rounded-lg p-3 text-[9.5px] leading-[1.45] text-eu-ink-2 font-mono whitespace-pre overflow-hidden">{`{ id: "weekly-deals", type: "deals-rail", zoneNo: 7,
  props: { title: "Προσφορές με πραγματική λήξη" },
  query: { kind: "tag", value: "weekly-deals", limit: 4,
           pin: ["p-inventor-ikura"] },
  schedule: { from: "2026-09-07T00:00+03:00",
              to:   "2026-09-13T23:59+03:00" },
  visibility: { devices: ["desktop","tablet","mobile"],
                hideOnSaveData: false },
  ab: { experiment: "home-deals", variant: "B", weight: 50 } }`}</pre>
            <Body className="text-[11.5px] mt-3">
              <strong>12 ζώνες στην αρχική</strong> (όροι, header, nav, bento, ticker, κατηγορίες, προσφορές, quick buy, υπηρεσίες, δίκτυο, οδηγοί, newsletter) και αντίστοιχες ζώνες σε category hub, listing (πάνω/μέσα στο grid/κάτω), PDP (κάτω από buy box, μετά τα specs), καλάθι, checkout success, 404. Το marketing αλλάζει σειρά, περιεχόμενο, χρόνο και κοινό χωρίς deploy· live preview ανά συσκευή· ιστορικό εκδόσεων· μετρήσεις ανά ζώνη (PostHog).
            </Body>
          </div>
        </div>
      </DocPage>

      {/* 18 · Summary & next steps */}
      <DocPage no={18} tone="grey" label="Σύνοψη & επόμενα βήματα">
        <PageHead title="Σύνοψη & επόμενα βήματα" section="Απόφαση" no={18} />
        <div className="grid grid-cols-3 gap-5 flex-1">
          <div className="bg-white rounded-lg p-5">
            <Kicker>Τι παραδίδουμε σήμερα</Kicker>
            <Body className="text-[11.5px]">
              1 · Αυτό το έγγραφο (18 σελίδες, εκτυπώσιμο A4)
              <br />
              2 · Λειτουργικό prototype αρχικής στο brand (Next.js, route «/», <code className="font-mono">?zones=1</code> για τους αριθμούς ζωνών)
              <br />
              3 · Τρία audits: euronics.gr (45+ URLs), web.kolleris.com (35+), kotsovolos.gr (~40, με browser)
              <br />
              4 · Μοντέλο δεδομένων Prisma, registry ζωνών/widgets, fluid layer, tokens brand
              <br />
              5 · 9 ρεαλιστικές φωτογραφίες (AI, προσωρινές) για hero, προϊόντα, οδηγούς, κατάστημα
            </Body>
          </div>
          <div className="bg-white rounded-lg p-5">
            <Kicker>Αποφάσεις που ζητάμε</Kicker>
            <Body className="text-[11.5px]">
              <strong>Α ή Β</strong> — ή υβριδική με A/B από τις ζώνες
              <br />
              <br />
              <strong>Quick buy</strong> — «Άμεση παραγγελία» από την αρχή, ένα-κλικ με αποθηκευμένη κάρτα αργότερα
              <br />
              <br />
              <strong>Πληρωμές</strong> — Viva ή Stripe ως κύριος πάροχος, IRIS, αντικαταβολή (ναι/όχι), δόσεις χωρίς κάρτα (Eurobank ή άλλο)
              <br />
              <br />
              <strong>Υπηρεσίες</strong> — πραγματικές τιμές των 12, ποιες γίνονται add-on και πού
              <br />
              <br />
              <strong>Brand</strong> — παράδοση γραμματοσειράς Euronics & service icons (αλλιώς Poppins/Manrope & Lucide)
            </Body>
          </div>
          <div className="bg-eu-navy text-white rounded-lg p-5">
            <Kicker tone="yellow">Επόμενες 3 εβδομάδες (kickoff)</Kicker>
            <Body dark className="text-[11.5px]">
              Εβδ. 1 · Πρόσβαση ERP/analytics, data contracts, επιλογή παρόχου πληρωμών, workshop ζωνών με το marketing
              <br />
              <br />
              Εβδ. 2 · Design system στο brand (tokens, 14 components, fluid rules) σε Storybook · ERP adapter v0 (κατάλογος + απόθεμα ανά κατάστημα)
              <br />
              <br />
              Εβδ. 3 · Αρχική, header, mega menu σε staging με πραγματικά δεδομένα · έγκριση Α/Β · έναρξη Φάσης 1
              <br />
              <br />
              <span className="text-eu-yellow font-bold">Στόχος: παραγωγή αμέσως μετά τη Black Friday 2026.</span>
            </Body>
          </div>
        </div>
        <div className="border-t border-eu-line pt-3 mt-4 flex justify-between text-eu-muted text-[10.5px]">
          <span>DGSOFT E.E. · Λεωφ. Κηφισού 48, Αθήνα · info@dgsoft.gr · Πρόταση για MEGA ELECTRICS Α.Ε. (Euronics Ελλάδα)</span>
          <span>Σεπτέμβριος 2026 · v3</span>
        </div>
      </DocPage>
    </>
  );
}

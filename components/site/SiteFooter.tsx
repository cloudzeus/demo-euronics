import Image from "next/image";
import Link from "next/link";

const cols: { title: string; links: string[] }[] = [
  { title: "Αγορές", links: ["Τρόποι πληρωμής", "Τρόποι & χρόνοι αποστολής", "Δόσεις χωρίς κάρτα", "Παραλαβή σε 2 ώρες", "Κάρτες δώρου"] },
  { title: "Εξυπηρέτηση", links: ["Επιστροφές & υπαναχώρηση", "Εγγυήσεις & service", "Ανακύκλωση ΑΗΗΕ", "Συχνές ερωτήσεις", "Επικοινωνία"] },
  { title: "Η Euronics", links: ["Ποιοι είμαστε", "Αξίες & φιλοσοφία", "Οικονομικά στοιχεία", "Δίκτυο καταστημάτων", "Καριέρα"] },
  { title: "Νομικά", links: ["Όροι χρήσης", "Πολιτική απορρήτου", "Ρυθμίσεις cookies", "Εναλλακτική επίλυση διαφορών", "Πλατφόρμα ΗΕΔ της ΕΕ"] },
];

/** DSA trader details, WEEE registry and ADR reachable on every page. */
export function SiteFooter() {
  return (
    <footer className="bg-eu-navy text-eu-on-dark-2 eu-container">
      <div className="eu-canvas eu-gutter pt-8 pb-5">
        <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-5 gap-6 text-[length:var(--fs-11-5)] leading-[1.95] mb-6">
          {cols.map((c) => (
            <div key={c.title}>
              <h2 className="m-0 mb-2.5 font-extrabold text-white text-[length:var(--fs-11)] tracking-wide">{c.title}</h2>
              <ul className="m-0 p-0 list-none">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link href="#" className="hover:text-white">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h2 className="m-0 mb-2.5 font-extrabold text-white text-[length:var(--fs-11)] tracking-wide">Επικοινωνία</h2>
            <address className="not-italic">
              Δαμάσκου Σταμάτη 12, Αχαρνές
              <br />
              <a href="tel:2104835143" className="hover:text-white">210 483 5143</a>
              <br />
              <a href="mailto:info@euronics.gr" className="hover:text-white">info@euronics.gr</a>
              <br />
              <span className="text-white">Facebook · Instagram · YouTube</span>
            </address>
          </div>
        </div>
        <div className="border-t border-eu-navy-line pt-4 flex flex-wrap justify-between items-center gap-4 text-[length:var(--fs-11)] leading-relaxed">
          <p className="m-0">
            © euronics 2026 · MEGA ELECTRICS ΑΕΒΕ · ΑΦΜ 998182322 · ΓΕΜΗ — · Αρ. μητρώου ΑΗΗΕ —
            <br />
            Οι τιμές περιλαμβάνουν ΦΠΑ 24%. Τα μεταφορικά υπολογίζονται πριν την οριστικοποίηση της παραγγελίας.
          </p>
          <Image src="https://www.euronics.gr/Themes/Uptown/Content/img/credit_cards_final.png" alt="Τρόποι πληρωμής" width={220} height={22} className="h-[22px] w-auto" unoptimized />
        </div>
      </div>
    </footer>
  );
}

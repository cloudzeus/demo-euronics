import Link from "next/link";
import { SearchBox } from "@/components/site/SearchBox";

/** 404 with the shop frame, search and the four most useful exits. */
export default function NotFound() {
  return (
    <div className="eu-container">
      <div className="eu-canvas eu-gutter py-14 max-w-[640px] text-center mx-auto">
        <div className="font-extrabold text-eu-yellow-dark text-[length:var(--fs-11)] tracking-wide mb-2">Σφάλμα 404</div>
        <h1 className="m-0 font-heading font-bold text-eu-ink text-[length:var(--fs-32)] leading-[1.1]">Η σελίδα δεν βρέθηκε</h1>
        <p className="m-0 mt-2 text-eu-muted text-[length:var(--fs-13-5)]">Ίσως το προϊόν αποσύρθηκε ή ο σύνδεσμος άλλαξε. Ψάξε το ή ξεκίνα από εδώ:</p>
        <div className="my-6 text-left">
          <SearchBox />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[["/", "Αρχική"], ["/prosfores", "Προσφορές"], ["/proionta", "Όλα τα προϊόντα"], ["/katastimata", "Καταστήματα"], ["/entopismos", "Παρακολούθηση παραγγελίας"]].map(([h, t]) => (
            <Link key={h} href={h} className="rounded-full border-2 border-eu-navy text-eu-navy font-extrabold text-[length:var(--fs-12-5)] px-4 min-h-11 inline-flex items-center hover:bg-eu-surface">
              {t}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

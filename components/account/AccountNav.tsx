"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, MapPin, RotateCcw, ShieldCheck, Heart, User, LogOut } from "lucide-react";

const items = [
  { href: "/logariasmos", label: "Επισκόπηση", icon: User },
  { href: "/logariasmos/paraggelies", label: "Παραγγελίες", icon: Package },
  { href: "/logariasmos/dieythynseis", label: "Διευθύνσεις", icon: MapPin },
  { href: "/logariasmos/epistrofes", label: "Επιστροφές", icon: RotateCcw },
  { href: "/logariasmos/eggyiseis", label: "Εγγυήσεις & service", icon: ShieldCheck },
  { href: "/lista", label: "Η λίστα μου", icon: Heart },
];

export function AccountNav() {
  const path = usePathname();
  const router = useRouter();
  return (
    <nav aria-label="Λογαριασμός" className="@lg:sticky @lg:top-4">
      <div className="hidden @lg:block bg-eu-surface rounded-xl p-4 mb-3">
        <div className="font-extrabold text-eu-ink text-[length:var(--fs-16)]">Γιάννης Παπαδόπουλος</div>
        <div className="text-eu-muted text-[length:var(--fs-14)]">giannis@example.gr</div>
      </div>
      <ul className="m-0 p-0 list-none flex flex-wrap @lg:flex-col gap-1">
        {items.map((it) => {
          const on = it.href === "/logariasmos" ? path === it.href : path.startsWith(it.href);
          const Icon = it.icon;
          return (
            <li key={it.href} className="shrink-0">
              <Link href={it.href} aria-current={on ? "page" : undefined} className={`inline-flex @lg:flex items-center gap-2 rounded-full @lg:rounded-md px-3.5 py-2.5 min-h-11 font-semibold text-[length:var(--fs-15)] ${on ? "bg-eu-navy text-white" : "text-eu-ink-2 bg-eu-surface @lg:bg-transparent hover:bg-eu-chip"}`}>
                <Icon className="size-4" aria-hidden /> {it.label}
              </Link>
            </li>
          );
        })}
        <li className="shrink-0">
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.removeItem("euronics.session");
              } catch {}
              router.push("/");
            }}
            className="inline-flex @lg:flex items-center gap-2 rounded-full @lg:rounded-md px-3.5 py-2.5 min-h-11 font-semibold text-[length:var(--fs-15)] text-eu-muted hover:text-eu-red"
          >
            <LogOut className="size-4" aria-hidden /> Αποσύνδεση
          </button>
        </li>
      </ul>
    </nav>
  );
}

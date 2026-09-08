import Image from "next/image";
import Link from "next/link";
import { Heart, Phone, User } from "lucide-react";
import { SearchBox } from "./SearchBox";
import { CartButton } from "./CartButton";
import { MobileMenu } from "./MobileMenu";
import { ZoneBadge } from "./ZoneBadge";
import { navCategories } from "@/lib/data/nav";

/**
 * Zone 2 — dark brand-blue header. The yellow search button is the
 * brightest point of the page: that is where we want the first click.
 * Phone orders stay first-level for the white-goods audience.
 *
 * Adaptive: on phones the row collapses to burger · logo · cart and the
 * search box drops to a second full-width line (still visible, never
 * hidden behind an icon).
 */
export function SiteHeader() {
  return (
    <header className="relative bg-eu-navy text-white eu-container">
      <ZoneBadge no={2} />
      <div className="eu-canvas eu-gutter py-3 @lg:py-[18px] grid grid-cols-[auto_1fr_auto] @lg:grid-cols-[auto_1fr_auto] items-center gap-3 @lg:gap-6">
        <div className="flex items-center gap-2">
          <MobileMenu categories={navCategories} />
          <Link href="/" aria-label="euronics — αρχική σελίδα" className="block shrink-0">
            <Image src="/design/logo-on-blue.svg" alt="euronics" width={132} height={34} priority className="h-[26px] @lg:h-[34px] w-auto" />
          </Link>
        </div>

        <div className="hidden @md:block min-w-0">
          <SearchBox />
        </div>

        <div className="flex items-center gap-3 @lg:gap-[18px] justify-end">
          <a
            href="tel:2104835143"
            className="hidden @xl:flex flex-col items-center text-white font-semibold text-[length:var(--fs-11)] leading-tight hover:text-eu-yellow"
          >
            <span className="flex items-center gap-1">
              <Phone className="size-3.5" aria-hidden /> 210 483 5143
            </span>
            <span className="text-eu-on-dark-2 font-normal mt-0.5">Τηλ. παραγγελίες</span>
          </a>
          <span className="hidden @xl:block w-px h-[26px] bg-eu-navy-line" aria-hidden />
          <Link
            href="/lista"
            className="hidden @lg:flex flex-col items-center gap-0.5 text-eu-on-dark-2 font-semibold text-[length:var(--fs-11)] hover:text-white min-h-11 justify-center"
          >
            <Heart className="size-4" aria-hidden />
            Λίστα
          </Link>
          <Link
            href="/logariasmos"
            className="hidden @lg:flex flex-col items-center gap-0.5 text-eu-on-dark-2 font-semibold text-[length:var(--fs-11)] hover:text-white min-h-11 justify-center"
          >
            <User className="size-4" aria-hidden />
            Λογαριασμός
          </Link>
          <CartButton />
        </div>

        <div className="col-span-3 @md:hidden">
          <SearchBox compact />
        </div>
      </div>
    </header>
  );
}

import { CartProvider } from "@/components/commerce/CartProvider";
import { QuickBuySheet } from "@/components/commerce/QuickBuySheet";
import { MiniCart } from "@/components/commerce/MiniCart";
import { CompareTray } from "@/components/commerce/CompareTray";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MegaNav } from "@/components/site/MegaNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieConsent } from "@/components/site/CookieConsent";

/** Shop frame: terms rail, header, mega nav, page, footer + the three drawers (mini-cart, quick buy, compare). */
export default function ShopLayout({ children }: LayoutProps<"/">) {
  return (
    <CartProvider>
      <AnnouncementBar
        zoneNo={1}
        left={["350 καταστήματα", "Δωρεάν μεταφορά & φύλαξη", "Δόσεις με ή χωρίς κάρτα"]}
        right={["14 ημέρες υπαναχώρηση"]}
        accent={{ label: "Παρακολούθηση παραγγελίας", href: "/entopismos" }}
      />
      <SiteHeader />
      <MegaNav />
      <main id="main" className="flex-1 bg-white">
        {children}
      </main>
      <SiteFooter />
      <MiniCart />
      <QuickBuySheet />
      <CompareTray />
      <CookieConsent />
    </CartProvider>
  );
}

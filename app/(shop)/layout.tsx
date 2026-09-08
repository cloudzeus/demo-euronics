import { CartProvider } from "@/components/commerce/CartProvider";
import { QuickBuySheet } from "@/components/commerce/QuickBuySheet";
import { MiniCart } from "@/components/commerce/MiniCart";
import { QuickViewSheet } from "@/components/commerce/QuickViewSheet";
import { getMegaMenuData, getProductsByIds } from "@/lib/data/repo";
import { CompareTray } from "@/components/commerce/CompareTray";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MegaNav } from "@/components/site/MegaNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieConsent } from "@/components/site/CookieConsent";

/** Shop frame: terms rail, header, mega nav, page, footer + the three drawers (mini-cart, quick buy, compare). */
export default async function ShopLayout({ children }: LayoutProps<"/">) {
  const [suggestions, menu] = await Promise.all([getProductsByIds(["p-jbl-flip-7", "r-108803", "r-138705", "r-145807"]), getMegaMenuData()]);
  return (
    <CartProvider>
      <AnnouncementBar
        zoneNo={1}
        left={["350 καταστήματα", "Δωρεάν μεταφορά & φύλαξη", "Δόσεις με ή χωρίς κάρτα"]}
        right={["14 ημέρες υπαναχώρηση"]}
        accent={{ label: "Παρακολούθηση παραγγελίας", href: "/entopismos" }}
      />
      <SiteHeader />
      <MegaNav data={menu} />
      <main id="main" className="flex-1 bg-white">
        {children}
      </main>
      <SiteFooter />
      <MiniCart suggestions={suggestions} />
      <QuickBuySheet />
      <QuickViewSheet />
      <CompareTray />
      <CookieConsent />
    </CartProvider>
  );
}

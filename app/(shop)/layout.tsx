import { CartProvider } from "@/components/commerce/CartProvider";
import { QuickBuySheet } from "@/components/commerce/QuickBuySheet";
import { MiniCart } from "@/components/commerce/MiniCart";
import { QuickViewSheet } from "@/components/commerce/QuickViewSheet";
import { getMegaMenuData, getProductsByIds } from "@/lib/data/repo";
import { CompareTray } from "@/components/commerce/CompareTray";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { SiteHeader } from "@/components/site/SiteHeader";
import { StickyHeader } from "@/components/site/StickyHeader";
import { MegaNav } from "@/components/site/MegaNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieConsent } from "@/components/site/CookieConsent";
import { MySpaceProvider } from "@/components/space/MySpaceProvider";
import { MySpaceSheet } from "@/components/space/MySpaceSheet";
import { AdvisorProvider } from "@/components/advisor/AdvisorContext";
import { AdvisorOrb } from "@/components/advisor/AdvisorOrb";
import { SnapSheet } from "@/components/snap/SnapSheet";
import { AutoReveal } from "@/components/motion/AutoReveal";
import { ExitIntent } from "@/components/site/ExitIntent";

/** Shop frame: terms rail, header, mega nav, page, footer + the three drawers (mini-cart, quick buy, compare). */
export default async function ShopLayout({ children }: LayoutProps<"/">) {
  const [suggestions, menu] = await Promise.all([
    getProductsByIds(["p-jbl-flip-7", "r-108803", "r-138705", "r-145807"]),
    getMegaMenuData(),
  ]);
  return (
    <CartProvider>
      <MySpaceProvider>
        <AdvisorProvider>
          <AnnouncementBar
            zoneNo={1}
            left={[
              "350 καταστήματα",
              "Δωρεάν μεταφορά εντός περιφέρειας",
              "Δόσεις με ή χωρίς κάρτα",
            ]}
            right={["Επιστροφή μέσα σε 14 ημέρες"]}
            accent={{ label: "Παρακολούθηση παραγγελίας", href: "/entopismos" }}
          />
          <StickyHeader>
            <SiteHeader />
            <MegaNav data={menu} />
          </StickyHeader>
          <main id="main" className="flex-1 bg-white">
            {children}
          </main>
          <SiteFooter />
          <MiniCart suggestions={suggestions} />
          <QuickBuySheet />
          <QuickViewSheet />
          <CompareTray />
          <CookieConsent />
          <MySpaceSheet />
          <AdvisorOrb />
          <SnapSheet />
          <AutoReveal />
          <ExitIntent />
        </AdvisorProvider>
      </MySpaceProvider>
    </CartProvider>
  );
}

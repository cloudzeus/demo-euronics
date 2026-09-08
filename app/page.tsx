import { CartProvider } from "@/components/commerce/CartProvider";
import { QuickBuySheet } from "@/components/commerce/QuickBuySheet";
import { SiteHeader } from "@/components/site/SiteHeader";
import { MegaNav } from "@/components/site/MegaNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getHomeLayout } from "@/lib/cms/home.layout";
import { renderZones } from "@/lib/cms/render";
import { getDevice } from "@/lib/device";
import type { RenderContext } from "@/lib/cms/zones";
import { ZonesToggle } from "@/components/site/ZonesToggle";

/**
 * Homepage = zones resolved from the CMS layout for *this* request
 * (device, audience, schedule, A/B bucket), rendered by the widget
 * registry. Everything is a server component except the pieces that own
 * UI state (slider, countdown, sheet, mega menu).
 */
export default async function HomePage({ searchParams }: PageProps<"/">) {
  const [{ device, saveData }, layout, sp] = await Promise.all([getDevice(), getHomeLayout(), searchParams]);
  const ctx: RenderContext = {
    now: new Date(),
    device,
    audience: "guest",
    saveData,
    bucket: 0,
  };
  const [above, main, preFooter] = await Promise.all([
    renderZones(layout.zones, ctx, "above-header"),
    renderZones(layout.zones, ctx, "main"),
    renderZones(layout.zones, ctx, "pre-footer"),
  ]);

  return (
    <CartProvider>
      <ZonesToggle enabled={sp.zones === "1"} />
      {above}
      <SiteHeader />
      <MegaNav />
      <main id="main">{main}</main>
      {preFooter}
      <SiteFooter />
      <QuickBuySheet />
    </CartProvider>
  );
}

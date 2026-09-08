import "server-only";
import type { ReactNode } from "react";
import type { RenderContext, WidgetInstance, Zone } from "./zones";
import { resolveZone } from "./zones";
import { AnnouncementBar } from "@/components/site/AnnouncementBar";
import { BentoHero } from "@/components/widgets/BentoHero";
import { Ticker } from "@/components/widgets/Ticker";
import { CategoryGrid } from "@/components/widgets/CategoryGrid";
import { DealsRail } from "@/components/widgets/DealsRail";
import { QuickBuyExplainer } from "@/components/widgets/QuickBuyExplainer";
import { ServicesBand } from "@/components/widgets/ServicesBand";
import { StoreFinder } from "@/components/widgets/StoreFinder";
import { GuidesBand } from "@/components/widgets/GuidesBand";
import { SmartGuidesBand } from "@/components/widgets/SmartGuidesBand";
import { NewsletterBand } from "@/components/widgets/NewsletterBand";
import { getCategories, getDealOfDay, getGuides, getHeroSlides, getNearestStore, getProduct, getServices, getWeeklyDeals } from "@/lib/data/catalog";

/**
 * Widget registry: type → async server component. Each widget resolves
 * its own data (query) at render time; the CMS only stores props + query.
 * Adding a widget = one entry here + one component. The page never changes.
 */
type Renderer = (w: WidgetInstance, ctx: RenderContext) => Promise<ReactNode>;

const registry: Record<string, Renderer> = {
  "announcement-bar": async (w) => {
    const p = w.props as { left: string[]; right: string[]; accent?: { label: string; href: string } };
    return <AnnouncementBar key={w.id} {...p} zoneNo={w.zoneNo} />;
  },
  "bento-hero": async (w, ctx) => {
    const [slides, deal, store, services] = await Promise.all([getHeroSlides(), getDealOfDay(), getNearestStore(), getServices(3)]);
    const p = w.props as { intervalMs?: number };
    // Save-Data: a single static slide, no slideshow.
    const shown = ctx.saveData ? slides.slice(0, 1) : slides;
    return <BentoHero key={w.id} slides={shown} deal={deal} store={store} services={services.map((s) => s.title)} intervalMs={p.intervalMs} zoneNo={w.zoneNo} />;
  },
  ticker: async (w) => <Ticker key={w.id} items={(w.props as { items: string[] }).items} zoneNo={w.zoneNo} />,
  "category-grid": async (w) => <CategoryGrid key={w.id} categories={await getCategories()} featured={(w.props as { featured?: string }).featured} zoneNo={w.zoneNo} />,
  "deals-rail": async (w, ctx) => {
    const deals = await getWeeklyDeals();
    const limit = w.query?.limit ?? 4;
    const pinned = w.query?.pin ?? [];
    const ordered = [...deals.products].sort((a, b) => Number(pinned.includes(b.id)) - Number(pinned.includes(a.id)));
    // Phones get the same four in a swipe rail; Save-Data trims to two.
    const products = ordered.slice(0, ctx.saveData ? 2 : limit);
    return <DealsRail key={w.id} products={products} endsAt={deals.endsAt} label={deals.label} title={(w.props as { title: string }).title} zoneNo={w.zoneNo} />;
  },
  "quick-buy-explainer": async (w) => {
    const p = await getProduct("p-inventor-ikura");
    return p ? <QuickBuyExplainer key={w.id} product={p} zoneNo={w.zoneNo} /> : null;
  },
  "services-band": async (w) => <ServicesBand key={w.id} services={await getServices((w.props as { limit?: number }).limit ?? 6)} zoneNo={w.zoneNo} />,
  "store-finder": async (w) => <StoreFinder key={w.id} store={await getNearestStore()} image="/img/store-front.jpg" zoneNo={w.zoneNo} />,
  "smart-guides": async (w) => <SmartGuidesBand key={w.id} zoneNo={w.zoneNo} />,
  guides: async (w) => <GuidesBand key={w.id} guides={await getGuides()} zoneNo={w.zoneNo} />,
  newsletter: async (w) => <NewsletterBand key={w.id} zoneNo={w.zoneNo} />,
};

export async function renderZone(zone: Zone, ctx: RenderContext): Promise<ReactNode[]> {
  const widgets = resolveZone(zone, ctx);
  return Promise.all(
    widgets.map(async (w) => {
      const r = registry[w.type];
      if (!r) {
        if (process.env.NODE_ENV !== "production") console.warn(`[cms] unknown widget type "${w.type}" in zone ${zone.id}`);
        return null;
      }
      return r(w, ctx);
    }),
  );
}

export async function renderZones(zones: Zone[], ctx: RenderContext, slot: Zone["slot"]): Promise<ReactNode[]> {
  const out: ReactNode[] = [];
  for (const z of zones.filter((z) => z.slot === slot)) out.push(...(await renderZone(z, ctx)));
  return out;
}

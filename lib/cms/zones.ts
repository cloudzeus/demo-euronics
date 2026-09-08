/**
 * Marketing zones — the content model behind every merchandised page.
 *
 * A page is a list of ZONES. A zone holds an ordered list of WIDGET
 * instances. Marketing composes pages from the registry without a
 * deploy: each instance carries its props, a schedule, visibility rules
 * (device, audience, region), an optional A/B assignment and a pin.
 *
 * The CMS stores *this* structure (JSON), never HTML. Widgets declare a
 * query (category, tag, saved search, bestsellers 30d) so their product
 * data is resolved server-side at render time and stays fresh.
 */

import type { DeviceClass } from "@/lib/device";

export type WidgetType =
  | "announcement-bar"
  | "bento-hero"
  | "ticker"
  | "category-grid"
  | "deals-rail"
  | "product-rail"
  | "promo-banner"
  | "services-band"
  | "store-finder"
  | "guides"
  | "smart-guides"
  | "news-band"
  | "newsletter"
  | "quick-buy-explainer";

export type Audience = "all" | "guest" | "customer" | "returning";

export interface Schedule {
  /** ISO datetime, inclusive. */
  from?: string;
  /** ISO datetime, exclusive. When present the widget may render a real countdown to it. */
  to?: string;
  timezone?: string;
}

export interface Visibility {
  devices?: DeviceClass[];
  audience?: Audience;
  /** Region codes (e.g. prefecture) — geo-personalisation only after a user action. */
  regions?: string[];
  /** Hide under Save-Data / slow connections. */
  hideOnSaveData?: boolean;
}

export interface AbAssignment {
  experiment: string;
  variant: string;
  /** 0–100 share of traffic that sees this variant. */
  weight: number;
}

export interface ProductQuery {
  kind: "category" | "tag" | "saved-search" | "bestsellers-30d" | "ids";
  value: string | string[];
  limit?: number;
  /** Pinned product ids always come first. */
  pin?: string[];
}

export interface WidgetInstance<P = Record<string, unknown>> {
  id: string;
  type: WidgetType;
  label?: string;
  props: P;
  query?: ProductQuery;
  schedule?: Schedule;
  visibility?: Visibility;
  ab?: AbAssignment;
  /** Design zone number shown in the ?zones=1 preview. */
  zoneNo?: number;
}

export interface Zone {
  id: string;
  label: string;
  /** Where in the page frame the zone lives. */
  slot: "above-header" | "header" | "main" | "pre-footer";
  widgets: WidgetInstance[];
}

export interface PageLayout {
  id: string;
  path: string;
  title: string;
  zones: Zone[];
  updatedAt: string;
}

export interface RenderContext {
  now: Date;
  device: DeviceClass;
  audience: Audience;
  region?: string;
  saveData: boolean;
  /** Stable per-visitor bucket 0–99 for A/B splits. */
  bucket: number;
}

export function isScheduled(w: WidgetInstance, now: Date) {
  const s = w.schedule;
  if (!s) return true;
  if (s.from && now < new Date(s.from)) return false;
  if (s.to && now >= new Date(s.to)) return false;
  return true;
}

export function isVisible(w: WidgetInstance, ctx: RenderContext) {
  const v = w.visibility;
  if (!v) return true;
  if (v.devices && !v.devices.includes(ctx.device)) return false;
  if (v.audience && v.audience !== "all" && v.audience !== ctx.audience) return false;
  if (v.regions && ctx.region && !v.regions.includes(ctx.region)) return false;
  if (v.hideOnSaveData && ctx.saveData) return false;
  return true;
}

export function inExperiment(w: WidgetInstance, ctx: RenderContext) {
  if (!w.ab) return true;
  // Deterministic split: the visitor bucket decides which variant they see.
  return ctx.bucket < w.ab.weight;
}

/** Widgets of a zone that should render for this request, in order. */
export function resolveZone(zone: Zone, ctx: RenderContext): WidgetInstance[] {
  return zone.widgets.filter((w) => isScheduled(w, ctx.now) && isVisible(w, ctx) && inExperiment(w, ctx));
}

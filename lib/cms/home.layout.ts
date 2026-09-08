import "server-only";
import type { PageLayout } from "./zones";

/**
 * The homepage as marketing would store it in the CMS: 12 numbered zones
 * of the «Αρχική — Πρόταση v2» design, each a widget instance with props,
 * schedule and visibility. Replace with a Prisma read (Page → Zone →
 * Widget) without touching the renderer.
 */
export async function getHomeLayout(): Promise<PageLayout> {
  return {
    id: "home",
    path: "/",
    title: "Αρχική",
    updatedAt: "2026-09-08T09:00:00+03:00",
    zones: [
      {
        id: "announcement",
        label: "Ζώνη όρων (πάνω από το header)",
        slot: "above-header",
        widgets: [
          {
            id: "terms-rail",
            type: "announcement-bar",
            zoneNo: 1,
            props: {
              left: ["350 καταστήματα", "Δωρεάν μεταφορά & φύλαξη", "Δόσεις με ή χωρίς κάρτα"],
              right: ["14 ημέρες υπαναχώρηση"],
              accent: { label: "Παρακολούθηση παραγγελίας", href: "/entopismos" },
            },
          },
        ],
      },
      {
        id: "hero",
        label: "Bento hero",
        slot: "main",
        widgets: [
          {
            id: "hero-summer",
            type: "bento-hero",
            zoneNo: 4,
            label: "Καλοκαίρι 2026 · κλιματισμός",
            props: { slides: "all", intervalMs: 6000 },
            schedule: { from: "2026-06-01T00:00:00+03:00", to: "2026-09-30T23:59:59+03:00" },
          },
        ],
      },
      {
        id: "ticker",
        label: "Κίτρινο ticker εμπορικών μηνυμάτων",
        slot: "main",
        widgets: [
          {
            id: "ticker-usp",
            type: "ticker",
            zoneNo: 5,
            props: {
              items: [
                "Δωρεάν μεταφορά σε όλη την Ελλάδα",
                "Δόσεις χωρίς κάρτα έως 24 μήνες",
                "Επίσημη εγγύηση αντιπροσωπείας",
                "Δωρεάν φύλαξη έως 6 μήνες",
                "Παραλαβή σε 2 ώρες",
              ],
            },
          },
        ],
      },
      {
        id: "catalog",
        label: "Τυπογραφικό πλέγμα κατηγοριών",
        slot: "main",
        widgets: [{ id: "cat-grid", type: "category-grid", zoneNo: 6, props: { featured: "clima" } }],
      },
      {
        id: "deals",
        label: "Προσφορές με πραγματική λήξη",
        slot: "main",
        widgets: [
          {
            id: "weekly-deals",
            type: "deals-rail",
            zoneNo: 7,
            props: { title: "Προσφορές της εβδομάδας" },
            query: { kind: "tag", value: "weekly-deals", limit: 4, pin: ["p-inventor-ikura"] },
          },
          {
            id: "quick-buy-explainer",
            type: "quick-buy-explainer",
            zoneNo: 8,
            props: {},
            visibility: { devices: ["desktop", "tablet"] },
          },
        ],
      },
      {
        id: "services",
        label: "Σκούρη ζώνη υπηρεσιών",
        slot: "main",
        widgets: [{ id: "services-6", type: "services-band", zoneNo: 9, props: { limit: 6 } }],
      },
      {
        id: "stores",
        label: "Εντοπισμός καταστήματος",
        slot: "main",
        widgets: [{ id: "store-finder", type: "store-finder", zoneNo: 10, props: {} }],
      },
      {
        id: "guides",
        label: "Οδηγοί αγοράς",
        slot: "main",
        widgets: [
          { id: "smart-guides", type: "smart-guides", zoneNo: 11, props: {} },
          { id: "guides-3", type: "guides", zoneNo: 11, props: {}, visibility: { hideOnSaveData: true } },
        ],
      },
      {
        id: "news",
        label: "Νέα & ανακοινώσεις",
        slot: "main",
        widgets: [{ id: "news-3", type: "news-band", zoneNo: 12, props: { limit: 3 } }],
      },
      {
        id: "newsletter",
        label: "Newsletter",
        slot: "pre-footer",
        widgets: [{ id: "newsletter", type: "newsletter", zoneNo: 13, props: {} }],
      },
    ],
  };
}

import "server-only";
import { headers } from "next/headers";

/**
 * Device class detected server-side. It is a *content* hint (what to
 * show, how much of it, in what order) — layout still adapts with CSS
 * container queries. The client can correct it after hydration via
 * `useDevice()` (viewport + pointer), but the first paint is already
 * right for the device that asked.
 */
export type DeviceClass = "mobile" | "tablet" | "desktop";

export interface DeviceInfo {
  device: DeviceClass;
  /** Coarse pointer (touch) is likely. */
  touch: boolean;
  /** Client-hint viewport width when the browser sends it. */
  viewportWidth: number | null;
  /** Save-Data / slow network: lighter media, fewer rails. */
  saveData: boolean;
}

const MOBILE_RE = /(iPhone|iPod|Android.+Mobile|Windows Phone|Mobile Safari|Opera Mini|BlackBerry)/i;
const TABLET_RE = /(iPad|Android(?!.*Mobile)|Tablet|Silk|Kindle|PlayBook)/i;

export function classify(ua: string, chMobile?: string | null): DeviceClass {
  if (chMobile === "?1") return "mobile";
  if (TABLET_RE.test(ua)) return "tablet";
  // iPadOS 13+ pretends to be a Mac; a Mac with touch is an iPad.
  if (/Macintosh/.test(ua) && /Mobile/.test(ua)) return "tablet";
  if (MOBILE_RE.test(ua)) return "mobile";
  return "desktop";
}

export async function getDevice(): Promise<DeviceInfo> {
  const h = await headers();
  const ua = h.get("user-agent") ?? "";
  const device = classify(ua, h.get("sec-ch-ua-mobile"));
  const vw = h.get("viewport-width") ?? h.get("sec-ch-viewport-width");
  return {
    device,
    touch: device !== "desktop",
    viewportWidth: vw ? Number(vw) : null,
    saveData: h.get("save-data") === "on",
  };
}

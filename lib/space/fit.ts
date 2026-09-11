import type { Dims } from "@/lib/data/dims";

export interface MySpace {
  /** narrowest door on the way in, cm */
  door: number;
  /** lift available (else stairs) */
  lift: boolean;
  /** niche / free spot where the appliance goes, cm (optional) */
  niche?: { w: number; h: number; d: number };
}

export type FitVerdict = { kind: "fits"; margin: number } | { kind: "tight"; margin: number } | { kind: "no"; by: number; where: "door" | "niche" };

/**
 * Fit-My-Space: does the appliance pass the narrowest door (its smallest
 * horizontal side + 2 cm for packaging/handling) and fit the niche (+1 cm
 * per side, +3 cm depth for hoses/plug)? «Tight» when the margin is < 3 cm.
 */
export function fitVerdict(dims: Dims, space: MySpace): FitVerdict {
  const side = Math.min(dims.w, dims.d) + 2;
  const doorMargin = space.door - side;
  if (doorMargin < 0) return { kind: "no", by: -doorMargin, where: "door" };
  let margin = doorMargin;
  if (space.niche) {
    const mw = space.niche.w - (dims.w + 2);
    const mh = space.niche.h - (dims.h + 1);
    const md = space.niche.d - (dims.d + 3);
    const m = Math.min(mw, mh, md);
    if (m < 0) return { kind: "no", by: -m, where: "niche" };
    margin = Math.min(margin, m);
  }
  return margin < 3 ? { kind: "tight", margin } : { kind: "fits", margin };
}

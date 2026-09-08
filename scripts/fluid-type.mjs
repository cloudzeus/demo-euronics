#!/usr/bin/env node
// Regenerates the --fs-N fluid type tokens (app/globals.css "Fluid type scale")
// from every font size used in the codebase plus the seed list below.
// Usage: node scripts/fluid-type.mjs            → prints the CSS block
//        node scripts/fluid-type.mjs 13 15.5    → adds extra sizes
import { execSync } from "node:child_process";

const grab = (cmd) => {
  try {
    return execSync(cmd, { encoding: "utf8" }).split("\n").filter(Boolean);
  } catch {
    return [];
  }
};

const fromVars = grab(
  `grep -rhoE "var\\(--fs-[0-9-]+\\)" components app lib --include="*.tsx" --include="*.ts" --include="*.css" | sed -E 's/var\\(--fs-([0-9-]+)\\)/\\1/; s/-/./'`,
);
const fromPx = grab(
  `grep -rhoE "text-\\[[0-9.]+px\\]" components app --include="*.tsx" | sed -E 's/text-\\[([0-9.]+)px\\]/\\1/'`,
);
const seed = [
  9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 26,
  28, 30, 32, 34, 36, 38, 42, 44, 50, 58, 66,
];
const sizes = [...new Set([...fromVars, ...fromPx, ...process.argv.slice(2), ...seed].map(Number))]
  .filter(Number.isFinite)
  .sort((a, b) => a - b);

const MINW = 360;
const MAXW = 1280;
const r = (v) => Number(v.toFixed(4));
// Phone rule: ≤15px grow by 1px, 16–20px unchanged, ≥22px ×0.78 (rounded to .5)
const mobile = (d) => (d <= 15 ? d + 1 : d <= 20 ? d : Math.round(d * 0.78 * 2) / 2);

for (const d of sizes) {
  const m = mobile(d);
  const name = String(d).replace(".", "-");
  if (m === d) {
    console.log(`  --fs-${name}: ${r(d / 16)}rem;`);
    continue;
  }
  const slope = (d - m) / (MAXW - MINW);
  const intercept = m - slope * MINW;
  console.log(
    `  --fs-${name}: clamp(${r(Math.min(m, d) / 16)}rem, ${r(intercept / 16)}rem ${slope < 0 ? "-" : "+"} ${r(Math.abs(slope) * 100)}vw, ${r(Math.max(m, d) / 16)}rem);`,
  );
}

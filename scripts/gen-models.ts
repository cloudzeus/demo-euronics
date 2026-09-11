// Exports {id, slug, image, cutout, dims} for every product with dimensions so
// scripts/gen-models.py can build the AR boxes. Run: npx tsx scripts/gen-models.ts <out.json>
import { writeFileSync } from "node:fs";
import { products } from "../lib/data/fixtures/products";
import { dimsFor } from "../lib/data/dims";
import { cutoutFor } from "../lib/data/cutouts";

const rows = products
  .map((p) => ({ id: p.id, slug: p.slug, image: p.image, cutout: cutoutFor(p.image), dims: dimsFor(p) }))
  .filter((r) => r.image && r.dims);
writeFileSync(process.argv[2] ?? "models.json", JSON.stringify(rows, null, 1));
console.log(rows.length, "products with dims");

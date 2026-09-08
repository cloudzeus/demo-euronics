import { NextResponse } from "next/server";
import { searchSuggest } from "@/lib/data/repo";

/** @dynamic GET /api/search?q=&cat= — autosuggest in four groups. Production: Meilisearch query with typo tolerance, same JSON shape. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") ?? "").slice(0, 80);
  const cat = searchParams.get("cat") ?? undefined;
  const res = await searchSuggest(q, cat);
  return NextResponse.json(res, { headers: { "Cache-Control": "public, max-age=30, s-maxage=60" } });
}

import { NextResponse } from "next/server";
import { advisorAnswer } from "@/lib/advisor/answer";

/** @dynamic Advisor endpoint — demo rules; production: streamed LLM answer (SSE). */
export async function GET(req: Request) {
  const u = new URL(req.url);
  const q = (u.searchParams.get("q") ?? "").trim();
  const door = Number(u.searchParams.get("door"));
  if (!q) return NextResponse.json({ error: "q required" }, { status: 400 });
  return NextResponse.json(advisorAnswer(q, door ? { door, lift: true } : null), { headers: { "cache-control": "no-store" } });
}

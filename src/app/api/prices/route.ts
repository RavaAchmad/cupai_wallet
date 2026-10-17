import { getQuotes } from "@/lib/prices";

export async function GET() {
  const assets = getQuotes();
  return Response.json(assets, {
    headers: { "cache-control": "no-store" },
  });
}

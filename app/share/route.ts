import { NextRequest, NextResponse } from "next/server";
import { IndexedQuote } from "../api/v1/fortune/Quote";

const kinds: Record<string, string> = {
  X: "https://twitter.com/intent/tweet?text=",
  Bluesky: "https://bsky.app/intent/compose?text=",
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const kindParam = url.searchParams.get("kind") || "X";
  const idParam = url.searchParams.get("id") || "21023";
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (
    kinds[kindParam] === "" ||
    kinds[kindParam] === undefined ||
    Number.isNaN(Number(idParam))
  ) {
    return NextResponse.redirect(new URL("/?id=21023", url));
  }

  const apiUrl = new URL(`/api/v1/fortune?id=${idParam}`, base);
  const resp = await fetch(apiUrl);

  const data = await resp.json().catch(() => null);
  const quote = data as IndexedQuote;

  const shareText = `${quote.text}\n\n ${base}/?id=${quote.id}`;

  const res = NextResponse.redirect(
    new URL(kinds[kindParam] + encodeURIComponent(shareText))
  );
  return res;
}

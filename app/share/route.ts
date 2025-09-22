import { NextRequest, NextResponse } from "next/server";
import { IndexedQuote } from "../../lib/Quote";
import { getFortune } from "@/lib/fortuneService";

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

  const fortune: IndexedQuote = getFortune({ id: Number(idParam) });

  const shareText = `${fortune.text}\n\n ${base}/?id=${fortune.id} #fortune #${fortune.category}`;

  const res = NextResponse.redirect(
    new URL(kinds[kindParam] + encodeURIComponent(shareText))
  );
  return res;
}

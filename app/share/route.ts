import { hash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Quote, QuoteR } from "../api/fortune/route";

const kinds: Record<string, string> = {
  "X": "https://twitter.com/intent/tweet?text=",
  "Bluesky": "https://bsky.app/intent/compose?text=",
};

export async function GET(req: NextRequest) {
  console.log("SHARE START");
  
  const url = new URL(req.url);
  const kindParam = url.searchParams.get("kind") || "X";
  const idParam = url.searchParams.get("id") || "21023";
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  console.log(kinds[kindParam]);
  console.log(123);
  
  
  if(kinds[kindParam] === "" || kinds[kindParam] === undefined || Number.isNaN(Number(idParam))
  ){
    console.log(kindParam);
    console.log("REDIR");
    
    
    return NextResponse.redirect(new URL(("/?id=21023"), url))
  }

  const apiUrl = new URL(`/api/fortune?id=${idParam}`, base);
  const resp = await fetch(apiUrl);

  const data = await resp.json().catch(() => null);
  const quote = data as QuoteR;

  const shareText = `${quote.text}\n\n ${base}/?id=${quote.id}`

  console.log(kinds[kindParam]);
  
  const res = NextResponse.redirect(new URL((kinds[kindParam]) + encodeURIComponent(shareText)));
  return res;
}

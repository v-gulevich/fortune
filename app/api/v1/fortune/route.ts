import { NextResponse, type NextRequest } from "next/server";
import quotesDataRaw from "./quotes.json";
import { easterEggs } from "./easterEggs";
import { Quote, IndexedQuote } from "./Quote";
import { randomInt } from "crypto";

// big chunk of data from json
const quotesData: Quote[] = quotesDataRaw as Quote[];

// indexed
const indexedQuotes: IndexedQuote[] = quotesData.map((q, i) => ({
  ...q,
  id: i,
}));
const indexedSafeQuotes: IndexedQuote[] = indexedQuotes.filter((q) => q.sfw);

function randomFromSet(set: IndexedQuote[]): IndexedQuote {
  const idx: number = randomInt(set.length);
  return set[idx];
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const safeParam = url.searchParams.get("safe");
  const cookieSafe = req.cookies.get("safe")?.value;
  const safeMode =
    safeParam != null
      ? safeParam !== "false"
      : cookieSafe != null
      ? cookieSafe !== "false"
      : true;
  const idParam = url.searchParams.get("id");

  let quote: IndexedQuote | undefined;

  if (idParam !== null) {
    const id = Number(idParam);
    if (Number.isInteger(id)) {
      if (id < 0 && easterEggs[id]) {
        return NextResponse.json({ ...easterEggs[id], id });
      } else {
        if (indexedQuotes[id]) {
          return NextResponse.json(indexedQuotes[id]);
        }
      }
    }
  }

  const pool = safeMode ? indexedSafeQuotes : indexedQuotes;

  quote = randomFromSet(pool);

  return NextResponse.json(quote);
}

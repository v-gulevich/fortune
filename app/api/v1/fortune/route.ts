import { NextResponse, type NextRequest } from "next/server";
import quotesDataRaw from "./quotes.json";
import { easterEggs } from "./easterEggs";

// NSFW quotes are guaranteed to be at the end of the file, so none are accidentally lost
const quotesData: Quote[] = quotesDataRaw as Quote[];
const safeQuotes: Quote[] = quotesData.filter((q) => q.sfw);

export interface Quote {
  text: string;
  sfw: boolean;
  category: string;
}

export interface QuoteR extends Quote {
  id: number;
}

function randomFromSet(set: Quote[]): QuoteR {
  const id: number = Math.floor(Math.random() * set.length);
  return { ...set[id], id: id };
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

  let quote: QuoteR | undefined;
  let selectedId: number | undefined;

  if (idParam !== null) {
    const id = Number(idParam);
    if (!isNaN(id)) {
      if (id < 0 && easterEggs[id]) {
        return NextResponse.json({ ...easterEggs[id], id });
      } else {
        quote = { ...quotesData[id], id };
        selectedId = id;
      }
    }
  } else {
    if (safeMode) {
      quote = randomFromSet(safeQuotes);
    }else{
      quote = randomFromSet(quotesData);
    }
  }

  return NextResponse.json(quote);
}

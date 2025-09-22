import { NextResponse, type NextRequest } from "next/server";
import quotesDataRaw from "./quotes.json";
import { easterEggs } from "./easterEggs";

const quotesData: Quote[] = quotesDataRaw as Quote[];

export interface Quote {
  text: string;
  sfw: boolean;
  category: string;
}

export interface QuoteR extends Quote {
  id: number;
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

  let filteredQuotes = safeMode ? quotesData.filter((q) => q.sfw) : quotesData;

  let quote: QuoteR | undefined;
  let selectedId: number | undefined;

  if (idParam !== null) {
    const id = Number(idParam);
    if (!isNaN(id) && id < 0 && easterEggs[id]) {
      return NextResponse.json({ ...easterEggs[id], id });
    }
  }

  if (idParam !== null) {
    const id = Number(idParam);
    if (!isNaN(id) && id >= 0) {
      quote = { ...quotesData[id], id };
      selectedId = id;
    }
  }

  if (!quote) {
    selectedId = Math.floor(Math.random() * filteredQuotes.length);
    quote = { ...filteredQuotes[selectedId], id: selectedId };
  }

  return NextResponse.json(quote);
}

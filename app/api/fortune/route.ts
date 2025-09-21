import { NextResponse, type NextRequest } from "next/server";
import quotesDataRaw from "./quotes.json";
import { easterEggs } from "./easterEggs";

const quotesData: Quote[] = quotesDataRaw as Quote[];

export interface Quote {
  text: string;
  sfw: boolean;
  category: string;
}

interface QuoteR extends Quote {
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
  const ua = req.headers.get("user-agent") || "";
  const isCLI = /curl|wget|httpie/i.test(ua);

  let filteredQuotes = safeMode ? quotesData.filter((q) => q.sfw) : quotesData;

  let quote: QuoteR | undefined;
  let selectedId: number | undefined;

  if (idParam !== null) {
    const id = Number(idParam);
    console.log(`${idParam} : ${id}`);
    if (!isNaN(id) && id < 0 && easterEggs[id]) {
      if (isCLI) {
        return new NextResponse(easterEggs[id].text + "\n", {
          headers: { "Content-Type": "text/plain" },
        });
      } else {
        return NextResponse.json({ ...easterEggs[id], id });
      }
    }
  }

  if (idParam !== null) {
    const id = Number(idParam);
    if (!isNaN(id) && id >= 0 && id < filteredQuotes.length) {
      quote = { ...filteredQuotes[id], id };
      selectedId = id;
    }
  }

  if (!quote) {
    selectedId = Math.floor(Math.random() * filteredQuotes.length);
    quote = { ...filteredQuotes[selectedId], id: selectedId };
  }

  if (isCLI) {
    return new NextResponse(quote.text + "\n", {
      headers: { "Content-Type": "text/plain" },
    });
  } else {
    return NextResponse.json(quote);
  }
}

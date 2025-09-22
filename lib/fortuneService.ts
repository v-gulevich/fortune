import quotesDataRaw from "./quotes.json";
import { easterEggs } from "./easterEggs";
import { Quote, IndexedQuote } from "@/lib/Quote";

const quotesData: Quote[] = quotesDataRaw as Quote[];
const indexedQuotes: IndexedQuote[] = quotesData.map((q, i) => ({
  ...q,
  id: i,
}));
const indexedSafeQuotes: IndexedQuote[] = indexedQuotes.filter((q) => q.sfw);

function randomFromSet(set: IndexedQuote[]): IndexedQuote {
  const idx: number = Math.floor(Math.random() * set.length);
  return set[idx];
}

export function getFortune(options: {
  id?: number;
  safe?: boolean;
}): IndexedQuote {
  const { id, safe = true } = options;

  if (id !== undefined && Number.isInteger(id)) {
    if (id < 0 && easterEggs[id]) {
      return { ...easterEggs[id], id };
    }
    if (indexedQuotes[id]) {
      return indexedQuotes[id];
    }
  }

  const pool = safe ? indexedSafeQuotes : indexedQuotes;
  return randomFromSet(pool);
}

export interface Quote {
  text: string;
  sfw: boolean;
  category: string;
}

export interface IndexedQuote extends Quote {
  id: number;
}

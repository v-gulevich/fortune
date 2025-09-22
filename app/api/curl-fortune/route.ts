import { getFortune } from "@/lib/fortuneService";
import { NextResponse } from "next/server";

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function GET() {
    const quote = getFortune({ safe: true });
    
    return new NextResponse(quote.text + "\n", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
}
import { NextResponse, type NextRequest } from "next/server";
import { getFortune } from "@/lib/fortuneService";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const safeParam = url.searchParams.get("safe");
  const cookieSafe = req.cookies.get("safe")?.value;
  const idParam = url.searchParams.get("id");

  const safeMode =
    safeParam != null
      ? safeParam !== "false"
      : cookieSafe != null
      ? cookieSafe !== "false"
      : true;

  const id = idParam ? Number(idParam) : undefined;

  const quote = getFortune({ id, safe: safeMode });

  return NextResponse.json(quote);
}

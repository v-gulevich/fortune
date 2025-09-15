import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const valueParam = url.searchParams.get("value");
  const redirectParam = url.searchParams.get("redirect") || "/";

  const current = req.cookies.get("safe")?.value;
  let value: "true" | "false";
  if (valueParam === "true" || valueParam === "false") {
    value = valueParam;
  } else if (current === "true") {
    value = "false";
  } else {
    value = "true";
  }

  const res = NextResponse.redirect(new URL(redirectParam, url));
  res.cookies.set("safe", value, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return res;
}
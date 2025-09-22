import { hash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const valueParam = url.searchParams.get("value");
  const redirectParam = url.searchParams.get("redirect") || "/";

  const sth_trusted:string = hash("sha1", (req.cookies.get("session_token")?.value ?? "")).toString();
  const sth_req:string = url.searchParams.get("token") || "@";

  if(!(sth_req === sth_trusted)){    
    const res = NextResponse.redirect(new URL(redirectParam, url));
    return res;
  }
  
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
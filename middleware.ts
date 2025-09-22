import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { IndexedQuote } from "./lib/Quote";
import { getFortune } from "./lib/fortuneService";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ua = request.headers.get("user-agent") || "";
  const isCLI = /(?:^|[\s(])(curl|wget|httpie)(?:\/|\s|\)|$)/i.test(ua);

  if (isCLI && (pathname === "/" || pathname === "")) {
    const quote = String(getFortune({}).text) + "\n";

    return new NextResponse(quote, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const sessionToken = request.cookies.get("session_token")?.value;

  if (!sessionToken) {
    const newSessionToken = crypto.randomUUID();

    const response = NextResponse.next();

    response.cookies.set("session_token", newSessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

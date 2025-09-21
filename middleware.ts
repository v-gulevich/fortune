import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Quote } from "./app/api/fortune/route";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const ua = request.headers.get("user-agent") || "";
  const isCLI = /(?:^|[\s(])(curl|wget|httpie)(?:\/|\s|\)|$)/i.test(ua);

  if (isCLI && (pathname === "/" || pathname === "")) {
    try {
      const apiUrl = new URL("/api/fortune", request.url);

      const resp = await fetch(apiUrl);


      if (!resp.ok) {
        const errText = await resp.text().catch(() => "");
        return new NextResponse(
          (errText || `Error: ${resp.status} ${resp.statusText}`) + "\n",
          {
            status: resp.status,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          }
        );
      }

      const data = await resp.json().catch(() => null);
      const quote = String((data as Quote).text) + "\n";

      return new NextResponse(quote, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } catch (error) {
      console.error("[middleware] CLI fortune fetch failed:", error);
      const message = error instanceof Error ? error.message : "Unknown error";
      return new NextResponse(`Internal error\n`, {
        status: 502,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
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

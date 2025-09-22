import { hash } from "crypto";
import { cookies } from "next/headers";
import Link from "next/link";
import { IndexedQuote } from "./api/v1/fortune/Quote";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const sp = await searchParams;
  const idParamRaw = sp?.id;
  const idParam = Array.isArray(idParamRaw) ? idParamRaw[0] : idParamRaw;

  const cookieStore = await cookies();

  const sth: string = hash(
    "sha1",
    cookieStore.get("session_token")?.value ?? ""
  ).toString();

  const cookieSafeVal = cookieStore.get("safe")?.value;
  const safe = cookieSafeVal === "false" ? false : true; // default true

  const apiUrl = new URL("/api/v1/fortune", base);
  if (idParam && idParam !== "") {
    apiUrl.searchParams.set("id", idParam);
  }

  const cookieHeader = cookieSafeVal
    ? `safe=${encodeURIComponent(cookieSafeVal)}`
    : undefined;

  const res = await fetch(apiUrl.toString(), {
    cache: "no-store",
    headers: cookieHeader ? { cookie: cookieHeader } : undefined,
  });
  const quote: IndexedQuote = await res.json();

  const redirectTarget = idParam ? `/?id=${idParam}` : `/`;
  const toggleHref = `/api/safe?value=${String(
    !safe
  )}&redirect=${encodeURIComponent(redirectTarget)}&token=${sth}`;

  return (
    <main className="min-h-screen flex flex-col p-4">
      <header className="w-full text-sm text-neutral-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-black">Fortune</h1>
          <p className="text-neutral-600">Your daily dose of random quotes.</p>
          <p className="text-neutral-600">
            Try{" "}
            <code className="font-mono text-xs font-semibold  text-neutral-700 p-0.5 bg-gray-200 rounded-sm border-1 border-gray-300">
              curl {base}
            </code>
            !{" "}
            <Link href={"/docs"} className="underline">
              See docs
            </Link>
            .
          </p>
          <p className="text-xs text-neutral-500">
            Safe mode hides potentially offensive content.
          </p>
          <p className="text-xs text-neutral-400">
            Fortune is a classic Unix program that prints random epigrams.{" "}
            <Link
              href="https://en.wikipedia.org/wiki/Fortune_(Unix)"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-700"
            >
              Wikipedia
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-neutral-500">Mode:</span>
            <span
              className={`px-2 py-0.5 rounded ${
                safe ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              <Link
                href={toggleHref}
                title={`Switch to ${safe ? "All" : "Safe"} mode`}
              >
                {safe ? "Safe" : "All"}
              </Link>
            </span>
          </div>
          <form method="get" className="flex items-center gap-2" role="search">
            <label htmlFor="jump-id" className="sr-only">
              Jump to ID
            </label>
            <div className="inline-flex items-stretch rounded-md overflow-hidden border border-neutral-300 bg-white shadow-sm">
              <span className="px-2 font-mono text-xs md:text-sm text-neutral-500 bg-neutral-100 border-r border-neutral-300 flex items-center">
                ID
              </span>
              <input
                id="jump-id"
                name="id"
                type="number"
                step={1}
                defaultValue={""}
                placeholder="-1"
                className="px-3 py-1 font-mono text-black text-sm outline-none w-24 md:w-36"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-gray-800 text-white text-sm hover:bg-gray-950"
                title="Try -314271!"
              >
                Go
              </button>
            </div>
          </form>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-5xl w-full font-mono">
          <pre className="text-lg md:text-lg overflow-x-auto text-black max-w-5xl whitespace-pre-wrap">
            {quote.text}
          </pre>

          <div className="mt-6 text-sm text-neutral-500 antialiased flex flex-col gap-1 md:flex-row md:justify-between">
            <span>
              <Link
                className="text-black hover:underline hover:text-blue-700 font-semibold"
                href={"/"}
              >
                [ Another ]
              </Link>{" "}
              | Share on{" "}
              <Link
                target="_blank"
                href={`/share?kind=X&id=${quote.id}`}
                className="underline font-semibold text-neutral-400 hover:text-blue-700"
              >
                X
              </Link>{" "}
              or{" "}
              <Link
                title="Unfortunately, Bluesky may lose some of the formatting."
                target="_blank"
                href={`/share?kind=Bluesky&id=${quote.id}`}
                className="underline font-semibold text-neutral-400 hover:text-blue-700"
              >
                Bluesky
              </Link>
            </span>
            <hr className="text-neutral-400" />
            <span>
              ID: {quote.id} | {quote.category}
              {quote.sfw ? "" : "/NSFW"}
            </span>
          </div>
        </div>
      </div>

      <footer className="mt-auto pt-6 text-xs text-neutral-500 text-center">
        Quotes are sourced from the "fortune-mod" databases.{" "}
        <Link
          href="https://github.com/shlomif/fortune-mod"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-blue-700"
        >
          Learn more
        </Link>
        . Safe mode preference is stored in a cookie.
      </footer>
    </main>
  );
}

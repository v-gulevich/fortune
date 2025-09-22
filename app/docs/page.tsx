import Link from "next/link";

export default async function Page() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

 

  return (
    <main className="min-h-screen flex flex-col p-4">
      <header className="w-full text-sm text-neutral-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-black"><Link href={"/"}>Fortune</Link></h1>
          <p className="text-neutral-600">Your daily dose of random quotes.</p>
        </div>
      </header>

      

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

import Link from "next/link";
import Image from "next/image";
import Footer from "../components/footer";
import CopyButton from "../components/copyButton";
export default async function Page() {
  return (
    <main className="min-h-screen flex flex-col p-4">
      <header className="w-full text-sm text-neutral-500 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl text-black">
            <Link href={"/"}>Fortune</Link>
          </h1>
          <p className="text-neutral-600">Your daily dose of random quotes.</p>
        </div>
      </header>

      <div className="flex justify-center mt-12">
        <article className="w-2/3">
          <h2 className="text-3xl font-bold text-black">
            Thank You for Your Support
          </h2>
          <p className="text-neutral-600">
            This project is free, open-source, and maintained in my spare time.
            If you've found it useful, a small donation is a great way to show
            your appreciation. It helps cover hosting costs and fuels future
            development.
          </p>
          <div className="mt-6 w-full p-6 flex flex-col items-center">
            <Image
              src="/solana-qr.png"
              alt="Solana Wallet QR Code"
              className="flex-shrink-0"
              width={250}
              height={250}
            />
            <div className="flex flex-col items-center gap-3 w-full">
              <h3 className="font-semibold text-center text-black">
                Solana Address
              </h3>
              <p className="font-mono text-xs text-neutral-500 break-all">
                3HzDiiwVXYxPnvFUmLL5TKhrYmMPrL235PTi1YmGBVyD
              </p>
              <CopyButton />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500">
            <span>Questions or suggestions? Reach out to </span>
            <Link
              href="mailto:vladislav@gulevich.by"
              className="font-medium underline hover:text-black"
            >
              vladislav@gulevich.by
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </main>
  );
}

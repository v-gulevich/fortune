import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto pt-6 text-xs text-neutral-500 text-center">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
      {/* Data Source License and Acknowledgment */}
      <p>
        Quote data sourced from{" "}
        <a
          href="https://github.com/shlomif/fortune-mod"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-black"
        >
          fortune-mod
        </a>
        , © The Regents of the University of California.
      </p>

      {/* Required Berkeley Acknowledgment Clause */}
      <p className="italic">
        This product includes software developed by the University of
        California, Berkeley and its contributors.
      </p>
    </div>
    <p className="text-sm text-neutral-600">
      © {new Date().getFullYear()}{" "}
      <Link
        href="https://github.com/v-gulevich" 
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:text-black"
      >
        Vladislav Gulevich
      </Link> | <Link
        href="mailto:vladislav@gulevich.by" 
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium hover:text-black"
      >
        vladislav@gulevich.by
      </Link> | <Link
        href="/donate" 
        rel="noopener noreferrer"
        className="hover:text-blue-700 text-black hover:underline font-mono font-semibold"
      >
        [ Donate ]
      </Link> 
    </p>
    </footer>
  );
}

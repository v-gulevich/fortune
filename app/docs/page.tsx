import Link from "next/link";
import matter from "gray-matter";
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'

import docFile from "@/docs/api.md";

export default async function Page() {
  const { content } = matter(docFile);
  const processed = await unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeStringify)
  .process(content);  

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
        <article className="w-2/3 prose" dangerouslySetInnerHTML={{ __html: processed.toString() }}>
        </article>
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

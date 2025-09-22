import Link from "next/link";
import matter from "gray-matter";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";

import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import http from "highlight.js/lib/languages/http";
import json from "highlight.js/lib/languages/json";
import typescript from "highlight.js/lib/languages/typescript";
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("http", http);
hljs.registerLanguage("json", json);
hljs.registerLanguage("typescript", typescript);


import docFile from "@/docs/api.md";
import Footer from "../components/footer";

export default async function Page() {
  const { content } = matter(docFile);
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
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
        <article
          className="w-2/3 prose"
          dangerouslySetInnerHTML={{ __html: processed.toString() }}
        ></article>
      </div>

      <Footer/>
    </main>
  );
}

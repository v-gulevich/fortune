import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.md": {
        loaders: ["raw-loader"], // import .md as a string
        as: "*.js", // treat the output as JS so Next.js can bundle it
      },
    },
    resolveExtensions: [".md", ".tsx", ".ts", ".jsx", ".js", ".json"],
  },
};

export default nextConfig;

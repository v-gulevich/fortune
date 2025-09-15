const fs = require("fs");
const path = require("path");

function readQuotesFromDir(dir: any, baseDir: any) {
  let allQuotes: any[] = [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      allQuotes = allQuotes.concat(readQuotesFromDir(fullPath, baseDir));
    } else if (entry.isFile()) {
      const data = fs.readFileSync(fullPath, "utf-8");

      const category = entry.name;
      const sfw = !entry.parentPath.includes("off");

      const quotes = data
        .split(/\n%\n/)
        .map((q: string) => q.trim())
        .filter(Boolean)
        .map((q: any) => ({
          text: q,
          sfw,
          category,
        }));

      allQuotes = allQuotes.concat(quotes);
    }
  }

  return allQuotes;
}

function generateQuotes() {
  const fortuneDir = path.join(process.cwd(), "datfiles");
  const outputFile = path.join(process.cwd(), "public", "quotes.json");

  if (!fs.existsSync(fortuneDir)) {
    console.error(`Fortunes directory not found: ${fortuneDir}`);
    process.exit(1);
  }

  let allQuotes = readQuotesFromDir(fortuneDir, fortuneDir);

  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

  fs.writeFileSync(outputFile, JSON.stringify(allQuotes, null, 2), "utf-8");
  console.log(`Generated ${allQuotes.length} quotes into ${outputFile}`);
}

if (require.main === module) {
  generateQuotes();
}

module.exports = generateQuotes;

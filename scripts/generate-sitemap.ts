import fs from "fs";
import path from "path";
import { DEITIES } from '../constants';
import { ContentType } from "../types";

const BASE_URL = "https://www.bhaktivandan.com"; // 🔴 change this

// Which content types you support
const CONTENT_TYPES = [
  ContentType.AARTI,
  ContentType.CHALISA,
  ContentType.MANTRA,
];

// Convert enum → route segment
const typeToPath = (type: ContentType) => {
  switch (type) {
    case ContentType.CHALISA:
      return "chalisa";
    case ContentType.MANTRA:
      return "mantra";
    default:
      return "aarti";
  }
};

const urls: string[] = [
  "/", // homepage
];

// Generate URLs from DEITIES
DEITIES.forEach((deity) => {
  CONTENT_TYPES.forEach((type) => {
    urls.push(`/${typeToPath(type)}/${deity.id}`);
  });
});

// Build sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `
  <url>
    <loc>${BASE_URL}${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>
`
  )
  .join("")}
</urlset>
`;

// Write to dist/
const outputPath = path.resolve("dist", "sitemap.xml");
fs.writeFileSync(outputPath, sitemap.trim());

console.log("✅ sitemap.xml generated successfully");

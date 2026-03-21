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
  ContentType.INSIGHTS,
];

// Convert enum → route segment
const typeToPath = (type: ContentType) => {
  switch (type) {
    case ContentType.CHALISA:
      return "chalisa";
    case ContentType.MANTRA:
      return "mantra";
    case ContentType.INSIGHTS:
      return "insights";
    default:
      return "aarti";
  }
};

const urls: string[] = [
  "/",
  "/about",
  "/privacy-policy",
  "/terms-and-conditions",
  "/contact-us",
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
    <changefreq>${url === "/" ? "daily" : "monthly"}</changefreq>
    <priority>${url === "/" ? "1.0" : url.startsWith("/aarti") || url.startsWith("/chalisa") ? "0.8" : "0.5"}</priority>
  </url>
`
    )
    .join("")}
</urlset>
`;

// Write to public/ and dist/ (if exists)
const publicPath = path.resolve("public", "sitemap.xml");
fs.writeFileSync(publicPath, sitemap.trim());

const distPath = path.resolve("dist", "sitemap.xml");
if (fs.existsSync(path.resolve("dist"))) {
  fs.writeFileSync(distPath, sitemap.trim());
}

console.log("✅ sitemap.xml generated successfully");

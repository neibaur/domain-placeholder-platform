import { getPublicConfig, shouldIndex } from "@/config/public";

export function GET() {
  const config = getPublicConfig(import.meta.env);
  const sitemapUrl = new URL(
    "/sitemap-index.xml",
    config.PUBLIC_SITE_URL,
  ).toString();

  const body = shouldIndex(config)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${sitemapUrl}\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}

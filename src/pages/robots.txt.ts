import { getPublicConfig, shouldIndex } from "@/config/public";
import type { PublicConfig } from "@/config/public";

export function getRobotsTxt(config: PublicConfig): string {
  const sitemapUrl = new URL(
    "/sitemap-index.xml",
    config.PUBLIC_SITE_URL,
  ).toString();

  return shouldIndex(config)
    ? `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`
    : `User-agent: *\nDisallow: /\n\nSitemap: ${sitemapUrl}\n`;
}

/* v8 ignore start -- Astro route wrapper is validated by production smoke tests. */
export function GET() {
  const config = getPublicConfig(import.meta.env);

  return new Response(getRobotsTxt(config), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
/* v8 ignore stop */

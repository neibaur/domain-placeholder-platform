import { describe, expect, it } from "vitest";
import { getPublicConfig } from "@/config/public";
import { getRobotsTxt } from "@/pages/robots.txt";

describe("robots.txt generation", () => {
  it("defaults to non-indexing robots behavior", () => {
    const config = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
    });

    expect(getRobotsTxt(config)).toBe(
      "User-agent: *\nDisallow: /\n\nSitemap: https://example.com/sitemap-index.xml\n",
    );
  });

  it("allows indexing only when explicitly configured", () => {
    const config = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com/",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
      PUBLIC_ROBOTS_INDEX: "true",
    });

    expect(getRobotsTxt(config)).toBe(
      "User-agent: *\nAllow: /\n\nSitemap: https://example.com/sitemap-index.xml\n",
    );
  });
});

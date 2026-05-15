import { describe, expect, it } from "vitest";
import { getPublicConfig, shouldIndex } from "@/config/public";
import { getLocaleCopy, getLocalizedPageContent } from "@/content/locales";

describe("public locale configuration", () => {
  it("defaults primary and secondary locales conservatively", () => {
    const config = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
    });

    expect(config.PUBLIC_PRIMARY_LOCALE).toBe("en");
    expect(config.PUBLIC_SECONDARY_LOCALE).toBe("zh-CN");
  });

  it("rejects unsupported primary locales", () => {
    expect(() =>
      getPublicConfig({
        PUBLIC_SITE_URL: "https://example.com",
        PUBLIC_SITE_TITLE: "Domain Placeholder",
        PUBLIC_PRIMARY_LOCALE: "fr",
      }),
    ).toThrow(/PUBLIC_PRIMARY_LOCALE/);
  });

  it("rejects unsupported secondary locales", () => {
    expect(() =>
      getPublicConfig({
        PUBLIC_SITE_URL: "https://example.com",
        PUBLIC_SITE_TITLE: "Domain Placeholder",
        PUBLIC_SECONDARY_LOCALE: "th",
      }),
    ).toThrow(/PUBLIC_SECONDARY_LOCALE/);
  });

  it("keeps robots indexing disabled unless explicitly enabled", () => {
    const defaultConfig = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
    });
    const indexableConfig = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
      PUBLIC_ROBOTS_INDEX: "true",
    });

    expect(shouldIndex(defaultConfig)).toBe(false);
    expect(shouldIndex(indexableConfig)).toBe(true);
  });
});

describe("localized content contract", () => {
  it("returns English and Simplified Chinese copy", () => {
    expect(getLocaleCopy("en").heading).toContain("placeholder");
    expect(getLocaleCopy("zh-CN").heading).toBe("轻量域名占位页正在准备中。");
  });

  it("renders distinct primary and secondary locale blocks", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "en",
      PUBLIC_SECONDARY_LOCALE: "zh-CN",
    });

    expect(content.primary.locale).toBe("en");
    expect(content.secondary?.locale).toBe("zh-CN");
    expect(content.visibleLocales).toEqual(["en", "zh-CN"]);
  });

  it("omits duplicate secondary content when locales match", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "en",
      PUBLIC_SECONDARY_LOCALE: "en",
    });

    expect(content.secondary).toBeUndefined();
    expect(content.visibleLocales).toEqual(["en"]);
  });

  it("falls back safely when secondary locale is not provided to the helper", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "en",
    });

    expect(content.secondary).toBeUndefined();
    expect(content.visibleLocales).toEqual(["en"]);
  });
});

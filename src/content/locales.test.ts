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
        PUBLIC_SECONDARY_LOCALE: "fr",
      }),
    ).toThrow(/PUBLIC_SECONDARY_LOCALE/);
  });

  it("accepts Thai as a supported primary and secondary locale", () => {
    const primaryConfig = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
      PUBLIC_PRIMARY_LOCALE: "th",
    });
    const secondaryConfig = getPublicConfig({
      PUBLIC_SITE_URL: "https://example.com",
      PUBLIC_SITE_TITLE: "Domain Placeholder",
      PUBLIC_SECONDARY_LOCALE: "th",
    });

    expect(primaryConfig.PUBLIC_PRIMARY_LOCALE).toBe("th");
    expect(secondaryConfig.PUBLIC_SECONDARY_LOCALE).toBe("th");
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
  it("returns English, Simplified Chinese, and Thai copy", () => {
    expect(getLocaleCopy("en").heading).toContain("placeholder");
    expect(getLocaleCopy("zh-CN").heading).toBe("轻量域名占位页正在准备中。");
    expect(getLocaleCopy("th").heading).toBe("เว็บไซต์นี้กำลังเตรียมพร้อม");
    expect(getLocaleCopy("th").description).toContain("ร่วมงาน");
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

  it("renders Thai as the primary locale", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "th",
      PUBLIC_SECONDARY_LOCALE: "en",
    });

    expect(content.primary.locale).toBe("th");
    expect(content.primary.copy.heading).toBe("เว็บไซต์นี้กำลังเตรียมพร้อม");
    expect(content.secondary?.locale).toBe("en");
    expect(content.visibleLocales).toEqual(["th", "en"]);
  });

  it("renders Thai as the secondary locale", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "en",
      PUBLIC_SECONDARY_LOCALE: "th",
    });

    expect(content.primary.locale).toBe("en");
    expect(content.secondary?.locale).toBe("th");
    expect(content.secondary?.copy.description).toContain("โดเมนนี้");
    expect(content.visibleLocales).toEqual(["en", "th"]);
  });

  it("omits duplicate secondary content when locales match", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "th",
      PUBLIC_SECONDARY_LOCALE: "th",
    });

    expect(content.secondary).toBeUndefined();
    expect(content.visibleLocales).toEqual(["th"]);
  });

  it("falls back safely when secondary locale is not provided to the helper", () => {
    const content = getLocalizedPageContent({
      PUBLIC_PRIMARY_LOCALE: "en",
    });

    expect(content.secondary).toBeUndefined();
    expect(content.visibleLocales).toEqual(["en"]);
  });
});

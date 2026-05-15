import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { supportedLocales } from "@/config/public";
import {
  domainInventory,
  getExpectedPagesProjectName,
  validateDomainInventory,
} from "@/config/domains";
import { createPlatformMetadata } from "@/config/platform";

const baseEntry = {
  domain: "example.com",
  pagesProjectName: "placeholder-platform-example-com",
  primaryLocale: "en",
  secondaryLocales: ["zh-CN", "th"],
  robotsIndexingEnabled: false,
  contactRoutingEnabled: false,
  terraformAuthority: "stage-0-validation-only",
  operationalStatus: "active",
  notes: "Synthetic test domain.",
};

describe("domain inventory contract", () => {
  it("validates the managed domain inventory", () => {
    expect(validateDomainInventory(domainInventory)).toEqual(domainInventory);
    expect(domainInventory).toHaveLength(3);
  });

  it("enforces the Cloudflare Pages project naming convention", () => {
    expect(getExpectedPagesProjectName("68tai.com")).toBe(
      "placeholder-platform-68tai-com",
    );
    expect(() =>
      validateDomainInventory([
        {
          ...baseEntry,
          pagesProjectName: "placeholder-platform-wrong-name",
        },
      ]),
    ).toThrow(/placeholder-platform-example-com/);
  });

  it("rejects duplicate domains", () => {
    expect(() =>
      validateDomainInventory([
        baseEntry,
        {
          ...baseEntry,
          pagesProjectName: "placeholder-platform-example-com",
        },
      ]),
    ).toThrow(/Duplicate domain/);
  });

  it("rejects unsupported or duplicate locale selections", () => {
    expect(() =>
      validateDomainInventory([
        {
          ...baseEntry,
          primaryLocale: "fr",
        },
      ]),
    ).toThrow();

    expect(() =>
      validateDomainInventory([
        {
          ...baseEntry,
          secondaryLocales: ["en"],
        },
      ]),
    ).toThrow(/primary locale/);

    expect(() =>
      validateDomainInventory([
        {
          ...baseEntry,
          secondaryLocales: ["th", "th"],
        },
      ]),
    ).toThrow(/duplicates/);
  });

  it("keeps inventory locales aligned with platform metadata locales", () => {
    const metadata = createPlatformMetadata("2026-05-15T00:00:00.000Z");
    const platformLocales = new Set(metadata.supportedLocales);

    expect(metadata.supportedLocales).toEqual([...supportedLocales]);

    for (const entry of domainInventory) {
      expect(platformLocales.has(entry.primaryLocale)).toBe(true);

      for (const locale of entry.secondaryLocales) {
        expect(platformLocales.has(locale)).toBe(true);
      }
    }
  });

  it("keeps docs/domains.md aware of every structured inventory domain", () => {
    const domainsDoc = readFileSync(
      join(process.cwd(), "docs", "domains.md"),
      "utf8",
    );

    for (const entry of domainInventory) {
      expect(domainsDoc).toContain(entry.domain);
      expect(domainsDoc).toContain(entry.pagesProjectName);
    }
  });
});

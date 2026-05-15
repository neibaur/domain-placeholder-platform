import { describe, expect, it } from "vitest";
import { supportedLocales } from "@/config/public";
import {
  createPlatformMetadata,
  platformMetadataSchema,
} from "@/config/platform";

describe("platform metadata contract", () => {
  it("creates safe public platform metadata", () => {
    const metadata = createPlatformMetadata("2026-05-15T00:00:00.000Z");

    expect(platformMetadataSchema.parse(metadata)).toEqual(metadata);
    expect(metadata.platformName).toBe("Domain Placeholder Platform");
    expect(metadata.architecture.staticFirst).toBe(true);
    expect(metadata.architecture.clientSideJavaScriptRequired).toBe(false);
    expect(metadata.deployment.model).toBe("cloudflare-pages-git-integration");
    expect(metadata.terraform.authority).toBe(
      "validation-only-non-authoritative",
    );
    expect(metadata.terraform.canApplyChanges).toBe(false);
    expect(metadata.contact.strategy).toBe("email-routing-preferred");
  });

  it("derives supported locales from public config", () => {
    const metadata = createPlatformMetadata("2026-05-15T00:00:00.000Z");

    expect(metadata.supportedLocales).toEqual([...supportedLocales]);
  });

  it("rejects invalid generated timestamps", () => {
    expect(() => createPlatformMetadata("not-a-date")).toThrow();
  });
});

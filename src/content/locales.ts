import type { PublicConfig } from "@/config/public";

type LocaleCopy = {
  eyebrow: string;
  heading: string;
  description: string;
  statusLabel: string;
  statusValue: string;
  contactLabel: string;
};

const copyByLanguage: Record<string, LocaleCopy> = {
  en: {
    eyebrow: "Placeholder platform",
    heading: "A lightweight domain placeholder is being prepared.",
    description:
      "This page is rendered from deployment environment variables and can be reused across multiple domains without hardcoded ownership details.",
    statusLabel: "Status",
    statusValue: "Reserved for future service",
    contactLabel: "Contact",
  },
  zh: {
    eyebrow: "域名占位平台",
    heading: "轻量域名占位页面正在准备中。",
    description:
      "此页面由部署环境变量渲染，可在多个域名之间复用，避免在代码中硬编码域名归属信息。",
    statusLabel: "状态",
    statusValue: "预留给未来服务",
    contactLabel: "联系",
  },
};

function languageFamily(locale: string): string {
  return locale.split("-")[0] ?? locale;
}

export function getLocaleCopy(locale: string): LocaleCopy {
  return copyByLanguage[languageFamily(locale)] ?? copyByLanguage.en;
}

export function getConfiguredLocales(config: PublicConfig): string[] {
  return [config.PUBLIC_PRIMARY_LOCALE, config.PUBLIC_SECONDARY_LOCALE].filter(
    Boolean,
  ) as string[];
}

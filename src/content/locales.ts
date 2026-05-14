import type { SupportedLocale } from "@/config/public";

type LocaleCopy = {
  eyebrow: string;
  heading: string;
  description: string;
  statusLabel: string;
  statusValue: string;
  statusSectionLabel: string;
  messageSectionLabel: string;
  domainLabel: string;
  localesLabel: string;
  contactLabel: string;
};

export type LocalizedPageContent = {
  primary: {
    locale: SupportedLocale;
    copy: LocaleCopy;
  };
  secondary?: {
    locale: SupportedLocale;
    copy: LocaleCopy;
  };
  visibleLocales: SupportedLocale[];
};

type LocaleSelection = {
  PUBLIC_PRIMARY_LOCALE: SupportedLocale;
  PUBLIC_SECONDARY_LOCALE?: SupportedLocale;
};

const copyByLocale = {
  en: {
    eyebrow: "Placeholder platform",
    heading: "A lightweight domain placeholder is being prepared.",
    description:
      "This page is rendered from deployment environment variables and can be reused across multiple domains without hardcoded ownership details.",
    statusLabel: "Status",
    statusValue: "Reserved for future service",
    statusSectionLabel: "Domain status",
    messageSectionLabel: "Localized message",
    domainLabel: "Domain",
    localesLabel: "Locales",
    contactLabel: "Contact",
  },
  "zh-CN": {
    eyebrow: "域名占位平台",
    heading: "轻量域名占位页正在准备中。",
    description:
      "此页面由部署环境变量渲染，可在多个域名之间复用，避免在代码中硬编码域名归属信息。",
    statusLabel: "状态",
    statusValue: "预留给未来服务",
    statusSectionLabel: "域名状态",
    messageSectionLabel: "本地化消息",
    domainLabel: "域名",
    localesLabel: "语言",
    contactLabel: "联系",
  },
} satisfies Record<SupportedLocale, LocaleCopy>;

export function getLocaleCopy(locale: SupportedLocale): LocaleCopy {
  return copyByLocale[locale] ?? copyByLocale.en;
}

export function getLocalizedPageContent(
  config: LocaleSelection,
): LocalizedPageContent {
  const primaryLocale = config.PUBLIC_PRIMARY_LOCALE;
  const secondaryLocale = config.PUBLIC_SECONDARY_LOCALE ?? undefined;
  const hasDistinctSecondary =
    secondaryLocale !== undefined && secondaryLocale !== primaryLocale;
  const visibleLocales = hasDistinctSecondary
    ? [primaryLocale, secondaryLocale]
    : [primaryLocale];

  return {
    primary: {
      locale: primaryLocale,
      copy: getLocaleCopy(primaryLocale),
    },
    secondary: hasDistinctSecondary
      ? {
          locale: secondaryLocale,
          copy: getLocaleCopy(secondaryLocale),
        }
      : undefined,
    visibleLocales,
  };
}

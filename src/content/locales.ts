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
    eyebrow: "Placeholder Page",
    heading: "Coming Soon (ish)",
    description:
      "Feel free to reach out if you have ideas for this page or want to collaborate.",
    statusLabel: "Status",
    statusValue: "Reserved for future service",
    statusSectionLabel: "Domain status",
    messageSectionLabel: "Localized message",
    domainLabel: "Domain",
    localesLabel: "Locales",
    contactLabel: "Contact",
  },
  "zh-CN": {
    eyebrow: "临时页面",
    heading: "即将上线……大概吧 😄",
    description:
      "如果你对这个页面有想法，或者想一起合作，欢迎联系我。",
    statusLabel: "状态",
    statusValue: "预留给未来服务",
    statusSectionLabel: "域名状态",
    messageSectionLabel: "本地化消息",
    domainLabel: "域名",
    localesLabel: "语言",
    contactLabel: "联系",
  },
  th: {
    eyebrow: "หน้าอยู่ระหว่างจัดเตรียม",
    heading: "เร็ว ๆ นี้…มั้ง 😄",
    description:
      "มีไอเดียหรืออยากร่วมงานกัน ติดต่อมาได้เลย",
    statusLabel: "สถานะ",
    statusValue: "สำรองไว้สำหรับบริการในอนาคต",
    statusSectionLabel: "สถานะของโดเมน",
    messageSectionLabel: "ข้อความตามภาษา",
    domainLabel: "โดเมน",
    localesLabel: "ภาษา",
    contactLabel: "ติดต่อ",
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

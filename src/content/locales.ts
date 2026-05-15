import type { SupportedLocale } from "@/config/public";
import copyByLocaleData from "./locale-copy.json";

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

const copyByLocale = copyByLocaleData satisfies Record<
  SupportedLocale,
  LocaleCopy
>;

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

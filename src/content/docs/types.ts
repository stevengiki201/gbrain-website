import type { Locale } from "@/config/i18n";

export type LocalizedText = Record<Locale, string>;
export type LocalizedList = Record<Locale, string[]>;

export type DocLink = {
  label: LocalizedText;
  url: string;
};

export type DocPage = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  topics: LocalizedList;
  commands?: LocalizedList;
  links?: DocLink[];
};

export type DocSection = {
  id: string;
  title: LocalizedText;
  slugs: string[];
};

export type CalloutTone = "info" | "tip" | "warning";

export type DocCallout = {
  tone: CalloutTone;
  title: LocalizedText;
  body: LocalizedText;
};

export type DocImage = {
  label: LocalizedText;
  caption: LocalizedText;
};

export type DocDetail = {
  intro: LocalizedText;
  prerequisites?: LocalizedList;
  callout: DocCallout;
  image: DocImage;
};

export type ProductDocBundle = {
  sections: DocSection[];
  pages: DocPage[];
  details: Record<string, DocDetail>;
};

export const localized = (en: string, sw: string): LocalizedText => ({
  en,
  sw,
});

export const localizedList = (en: string[], sw: string[]): LocalizedList => ({
  en,
  sw,
});

export const image = (
  enLabel: string,
  enCaption: string,
  swLabel: string,
  swCaption: string,
): DocImage => ({
  label: localized(enLabel, swLabel),
  caption: localized(enCaption, swCaption),
});

export const callout = (
  tone: CalloutTone,
  enTitle: string,
  enBody: string,
  swTitle: string,
  swBody: string,
): DocCallout => ({
  tone,
  title: localized(enTitle, swTitle),
  body: localized(enBody, swBody),
});

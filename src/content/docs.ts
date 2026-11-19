import { mediaDocs } from "./docs/media";
import { smsDocs } from "./docs/sms";
import { phonelinkDocs } from "./docs/phonelink";
import { neuralDocs } from "./docs/neural";
import { shulebombaDocs } from "./docs/shulebomba";
import type {
  DocDetail,
  DocPage,
  DocSection,
  LocalizedText,
  ProductDocBundle,
} from "./docs/types";

export type {
  DocCallout,
  DocDetail,
  DocLink,
  DocPage,
  DocSection,
  LocalizedList,
  LocalizedText,
} from "./docs/types";

export const productKeys = [
  "media",
  "sms",
  "phonelink",
  "neural",
  "shulebomba",
] as const;
export type ProductKey = (typeof productKeys)[number];

export const productPaths = {
  media: "/products/media",
  sms: "/products/sms",
  phonelink: "/products/phonelink",
  neural: "/products/neural",
  shulebomba: "/products/shulebomba",
} as const;

const bundles = {
  media: mediaDocs,
  sms: smsDocs,
  phonelink: phonelinkDocs,
  neural: neuralDocs,
  shulebomba: shulebombaDocs,
} as const satisfies Record<ProductKey, ProductDocBundle>;

export const docs = Object.fromEntries(
  productKeys.map((product) => [product, bundles[product].pages]),
) as Record<ProductKey, DocPage[]>;

export const docSections = Object.fromEntries(
  productKeys.map((product) => [product, bundles[product].sections]),
) as Record<ProductKey, DocSection[]>;

export const docDetails = Object.fromEntries(
  productKeys.flatMap((product) =>
    Object.entries(bundles[product].details).map(([slug, detail]) => [
      `${product}/${slug}`,
      detail,
    ]),
  ),
) as Record<string, DocDetail>;

export const productNames: Record<ProductKey, LocalizedText> = {
  media: { en: "GBrain Media Player", sw: "GBrain Media Player" },
  sms: { en: "GBrain SMS + AudioLink", sw: "GBrain SMS + AudioLink" },
  phonelink: { en: "PhoneLink", sw: "PhoneLink" },
  neural: { en: "GBrain Neural System", sw: "Mfumo wa GBrain Neural" },
  shulebomba: { en: "ShuleBomba", sw: "ShuleBomba" },
};

export const productDescriptions: Record<ProductKey, LocalizedText> = {
  media: {
    en: "Offline music and video library with playlists and persistent playback.",
    sw: "Maktaba ya muziki na video bila mtandao yenye orodha za kucheza.",
  },
  sms: {
    en: "AI SMS assistant and acoustic voice bridge running on your own machine.",
    sw: "Msaidizi wa SMS wa AI na daraja la sauti linaloendesha kwenye mashine yako.",
  },
  phonelink: {
    en: "Wireless Android remote management from a trusted Linux desktop.",
    sw: "Usimamizi wa mbali wa Android bila waya kutoka kompyuta ya Linux inayoaminika.",
  },
  neural: {
    en: "Modular AI execution platform with agents, skills, tools and approval gates.",
    sw: "Jukwaa la utekelezaji wa AI lenye mawakala, ujuzi, zana na idhini.",
  },
  shulebomba: {
    en: "Offline-first class management for attendance, tests and reports.",
    sw: "Usimamizi wa darasa bila mtandao kwa mahudhurio, mitihani na ripoti.",
  },
};

export function isProductKey(value: string): value is ProductKey {
  return productKeys.includes(value as ProductKey);
}

export function findDoc(product: ProductKey, slug: string) {
  return docs[product].find((doc) => doc.slug === slug);
}

export function getDocDetail(product: ProductKey, slug: string) {
  return docDetails[`${product}/${slug}`];
}

export function getSectionForDoc(product: ProductKey, slug: string) {
  return docSections[product].find((section) => section.slugs.includes(slug));
}

export function getDocNeighbors(product: ProductKey, slug: string) {
  const pages = docs[product];
  const index = pages.findIndex((page) => page.slug === slug);
  return {
    previous: index > 0 ? pages[index - 1] : undefined,
    next: index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined,
  };
}

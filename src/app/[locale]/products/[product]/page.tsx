import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductHero } from "@/components/product/ProductHero";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductScreenshots } from "@/components/product/ProductScreenshots";
import { ProductDownload } from "@/components/product/ProductDownload";
import { ProductDocs } from "@/components/product/ProductDocs";
import { ProductFAQ } from "@/components/product/ProductFAQ";
import { ProductChangelog } from "@/components/product/ProductChangelog";
import { ProductDashboard } from "@/components/product/ProductDashboard";
import { SmsDashboardCta } from "@/components/product/SmsDashboardCta";
import { getPhonelinkDashboardUrl } from "@/lib/phonelink";

const productData: Record<
  string,
  {
    name: string;
    tagline: string;
    description: string;
    icon: string;
    platforms: string[];
    status: string;
    repo?: string;
    playStore?: string;
    apkUrl?: string;
    desktopUrl?: string;
  }
> = {
  media: {
    name: "GBrain Media Player",
    tagline: "Your music & videos, offline-first",
    description:
      "Android-first media player built with Expo. Scan local media, create playlists, enjoy persistent playback — no cloud required.",
    icon: "🎵",
    platforms: ["Android", "Web (limited)"],
    status: "Released",
  },
  sms: {
    name: "GBrain SMS + AudioLink",
    tagline: "AI-powered SMS & voice, fully local",
    description:
      "Wi-Fi-first SMS chatbot with an AI reply engine, AudioLink phone bridge, and a secure browser dashboard reachable through gbrain-cli.",
    icon: "💬",
    platforms: ["Linux", "Android"],
    status: "Beta",
    repo: "https://github.com/stevengiki201/gbrain-sms",
  },
  phonelink: {
    name: "PhoneLink",
    tagline: "Wireless Android remote from Linux",
    description:
      "Screen mirroring, file transfer, remote control — no USB, no ADB, no cloud. Local network only.",
    icon: "📱",
    platforms: ["Linux", "Android"],
    status: "Released v1.1",
  },
  neural: {
    name: "GBrain Neural System",
    tagline: "Modular AI execution platform",
    description:
      "MrX coding agent, device automation, browser/desktop control, SMS/PhoneLink/AudioLink integration. Phases 1-12 complete.",
    icon: "🧠",
    platforms: ["Linux", "Web", "Desktop (Tauri)"],
    status: "Alpha",
    repo: "https://github.com/stevengiki201/Gbrain-neural-system",
  },
  shulebomba: {
    name: "ShuleBomba",
    tagline: "Class management built for teachers",
    description:
      "Offline-first Android class manager for primary and secondary teachers. Manage classes, learners, attendance, test scores and printable reports in one place.",
    icon: "📚",
    platforms: ["Android", "Web (limited)"],
    status: "Released v1.0.3",
    playStore:
      "https://play.google.com/store/apps/details?id=app.ShuleBomba.com&hl=en",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}): Promise<Metadata> {
  const { product } = await params;
  const data = productData[product];
  if (!data) return { title: "Product Not Found" };

  return {
    title: data.name,
    description: data.description,
    openGraph: {
      title: data.name,
      description: data.description,
      images: [`/products/${product}/og-image.png`],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { product } = await params;
  const data = productData[product];

  if (!data) notFound();

  return (
    <div className="flex flex-col">
      <ProductHero data={data} />
      {product === "phonelink" && (
        <ProductDashboard dashboardUrl={getPhonelinkDashboardUrl()} />
      )}
      {product === "sms" && <SmsDashboardCta />}
      <ProductFeatures product={product} />
      <ProductScreenshots product={product} />
      <ProductDownload product={product} data={data} />
      <ProductDocs product={product} />
      <ProductFAQ product={product} />
      <ProductChangelog product={product} />
    </div>
  );
}

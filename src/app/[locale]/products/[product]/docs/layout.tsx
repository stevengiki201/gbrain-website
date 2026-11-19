import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/DocsShell";
import { isProductKey } from "@/content/docs";

export default async function ProductDocsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ product: string }>;
}) {
  const { product } = await params;
  if (!isProductKey(product)) notFound();

  return <DocsShell product={product}>{children}</DocsShell>;
}

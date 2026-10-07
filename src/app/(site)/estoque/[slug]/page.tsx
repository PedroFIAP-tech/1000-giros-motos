import type { Metadata } from "next";
import { Suspense } from "react";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Detalhes da moto",
};

/** "honda-cb-500f" → "Honda Cb 500f" (provisório até o banco da Fase 2). */
function slugToTitle(slug: string) {
  return decodeURIComponent(slug)
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function MotoTitle({ params }: { params: PageProps<"/estoque/[slug]">["params"] }) {
  const { slug } = await params;
  return <PagePlaceholder eyebrow="Detalhes da moto" title={slugToTitle(slug)} />;
}

export default function MotoPage({ params }: PageProps<"/estoque/[slug]">) {
  return (
    <Suspense fallback={<PagePlaceholder eyebrow="Detalhes da moto" title="Carregando…" />}>
      <MotoTitle params={params} />
    </Suspense>
  );
}

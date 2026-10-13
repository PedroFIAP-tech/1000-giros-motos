import type { Metadata } from "next";
import { Suspense } from "react";
import { EstoqueFromUrl } from "@/components/moto/EstoqueFromUrl";
import { EstoqueView } from "@/components/moto/EstoqueView";
import { PageBanner } from "@/components/ui/PageBanner";
import { getMotos } from "@/data/motos";

export const metadata: Metadata = {
  title: "Estoque",
  description: "Motos seminovas revisadas, com laudo e documentação em dia. Filtre e encontre a sua.",
};

export default function EstoquePage() {
  const motos = getMotos();
  return (
    <>
      <PageBanner
        eyebrow="Seminovas com procedência"
        pre="Nosso"
        hl="Estoque"
        sub="Todas as motos revisadas, com laudo e documentação em dia. Filtre e encontre a sua."
        crumbs={[{ label: "Home", href: "/" }, { label: "Estoque" }]}
      />
      {/* Sem filtros no shell estático; os da URL entram em seguida. */}
      <Suspense fallback={<EstoqueView motos={motos} />}>
        <EstoqueFromUrl motos={motos} />
      </Suspense>
    </>
  );
}

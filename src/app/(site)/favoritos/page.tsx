import type { Metadata } from "next";
import { FavoritosView } from "@/components/moto/FavoritosView";
import { PageBanner } from "@/components/ui/PageBanner";
import { getMotos } from "@/data/motos";

export const metadata: Metadata = {
  title: "Favoritos",
  robots: { index: false },
};

export default function FavoritosPage() {
  return (
    <>
      <PageBanner
        eyebrow="Salvas neste aparelho"
        pre="Meus"
        hl="favoritos"
        crumbs={[{ label: "Home", href: "/" }, { label: "Favoritos" }]}
        position="30% center"
      />
      <div className="container-site pb-[72px] pt-8">
        <FavoritosView motos={getMotos()} />
      </div>
    </>
  );
}

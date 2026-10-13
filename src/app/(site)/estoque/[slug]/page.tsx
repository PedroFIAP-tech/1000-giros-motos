import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Bike,
  Calendar,
  CircleCheck,
  Cog,
  Disc,
  Fuel,
  Gauge,
  Palette,
  RectangleHorizontal,
  Settings2,
  Tag,
  Zap,
} from "lucide-react";
import { Gallery } from "@/components/moto/Gallery";
import { InterestBar } from "@/components/moto/InterestBar";
import { MotoCard } from "@/components/moto/MotoCard";
import { MotoPurchase } from "@/components/moto/MotoPurchase";
import { SpecTable, type Spec } from "@/components/moto/SpecTable";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { Hl, SectionTitle } from "@/components/ui/SectionTitle";
import { getMoto, getMotos, getSimilares, motoNome, type Moto } from "@/data/motos";
import { formatNumber, formatPrice } from "@/lib/format";
import { interestMessage, whatsappLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return getMotos().map((moto) => ({ slug: moto.slug }));
}

export async function generateMetadata({ params }: PageProps<"/estoque/[slug]">): Promise<Metadata> {
  const moto = getMoto((await params).slug);
  if (!moto) return { title: "Moto não encontrada" };
  return {
    title: `${motoNome(moto)} ${moto.ano}`,
    description: `${motoNome(moto)} ${moto.ano}, ${formatNumber(moto.km)} km, ${formatPrice(moto.preco)}. ${moto.descricao}`,
  };
}

function specs(moto: Moto): Spec[] {
  return [
    { label: "Marca", value: moto.marca, icon: Tag },
    { label: "Modelo", value: moto.modelo, icon: Bike },
    { label: "Ano", value: `${moto.ano}/${moto.anoModelo}`, icon: Calendar },
    { label: "Quilometragem", value: `${formatNumber(moto.km)} km`, icon: Gauge },
    { label: "Cor", value: moto.cor, icon: Palette },
    { label: "Cilindrada", value: `${moto.cilindrada} cc`, icon: Cog },
    { label: "Combustível", value: moto.combustivel, icon: Fuel },
    { label: "Câmbio", value: moto.cambio, icon: Settings2 },
    { label: "Partida", value: moto.partida, icon: Zap },
    { label: "Freios", value: moto.freios, icon: Disc },
    { label: "Final da placa", value: moto.finalPlaca, icon: RectangleHorizontal },
  ];
}

const twoCols = "container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-8";

export default async function MotoPage({ params }: PageProps<"/estoque/[slug]">) {
  const moto = getMoto((await params).slug);
  if (!moto) notFound();
  const nome = motoNome(moto);

  return (
    <>
      <Breadcrumb
        className="container-site pt-5"
        items={[{ label: "Home", href: "/" }, { label: "Estoque", href: "/estoque" }, { label: nome }]}
      />

      <section className={`${twoCols} pb-12 pt-[18px]`}>
        <Gallery items={moto.galeria} alt={nome} selo={moto.selo} transitionName={`moto-${moto.slug}`} />
        <MotoPurchase moto={moto} />
      </section>

      <section className={`${twoCols} pb-14`}>
        <div>
          <SectionTitle eyebrow="Detalhes" titleClassName="mb-4">
            Ficha <Hl>técnica</Hl>
          </SectionTitle>
          <SpecTable specs={specs(moto)} />
        </div>
        <div>
          <SectionTitle eyebrow="Sobre esta moto" titleClassName="mb-4">
            Descrição e <Hl>opcionais</Hl>
          </SectionTitle>
          <p className="mb-5 text-pretty text-[15px] leading-[1.65] text-soft">{moto.descricao}</p>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2.5">
            {moto.opcionais.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 rounded-md border border-white/7 bg-surface px-3.5 py-3 text-sm"
              >
                <CircleCheck className="size-[17px] shrink-0 text-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-white/6 bg-bg-alt">
        <div className="container-site pb-16 pt-12">
          <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3">
            <SectionTitle eyebrow="Motos parecidas" titleClassName="text-[clamp(32px,4.4vw,44px)]">
              Você também <Hl>pode gostar</Hl>
            </SectionTitle>
            <Button href="/estoque" variant="ghost">
              Ver todo o estoque
              <ArrowRight className="size-4" />
            </Button>
          </div>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,160px),1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))]">
            {getSimilares(moto).map((similar) => (
              <li key={similar.slug}>
                <MotoCard moto={similar} showSelo={false} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <InterestBar
        label={`${nome} · ${moto.ano}`}
        price={formatPrice(moto.preco)}
        href={whatsappLink(interestMessage(moto))}
      />
    </>
  );
}

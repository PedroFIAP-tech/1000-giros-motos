import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { MapCard } from "@/components/sections/MapCard";
import { ParallaxImage } from "@/components/sections/ParallaxImage";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/ui/CountUp";
import { Eyebrow, Hl, SectionTitle, titleLg } from "@/components/ui/SectionTitle";
import { depoimentos, galeriaLoja, numeros, valores } from "@/data/loja";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "Motos seminovas selecionadas a dedo em Itapecerica da Serra, com procedência e o atendimento de quem também vive a estrada.",
};

const sectionY = "py-[clamp(48px,7vw,88px)]";

export default function SobrePage() {
  return (
    <>
      <section className="relative flex min-h-[clamp(440px,48vw,580px)] items-end overflow-hidden">
        <ParallaxImage src="/images/store.png" alt="Interior da loja 1000 Giros" position="60% center" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,0.96)_20%,rgba(10,10,11,0.55)_60%,rgba(10,10,11,0.25)),linear-gradient(0deg,#0a0a0b,transparent_45%)]" />
        <div className="container-site relative w-full pb-[72px] pt-16">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Sobre Nós" }]} className="mb-[22px]" />
          <Eyebrow>Sobre a 1000 Giros</Eyebrow>
          <h1 className="mt-3 max-w-[820px] font-title text-[clamp(44px,7.4vw,92px)] leading-[0.9]">
            Mais que uma loja, uma paixão <Hl>sobre duas rodas</Hl>
          </h1>
          <p className="mt-5 max-w-[520px] text-pretty text-[clamp(15px,1.6vw,18px)] leading-normal text-soft">
            Motos seminovas selecionadas a dedo em Itapecerica da Serra, com procedência e o atendimento de quem
            também vive a estrada.
          </p>
        </div>
      </section>

      <section
        className={`container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-center gap-[clamp(32px,5vw,64px)] ${sectionY}`}
      >
        <div>
          <SectionTitle eyebrow="Nossa história" titleClassName={`${titleLg} mb-5`}>
            Começou com uma moto. <Hl>Virou uma garagem cheia.</Hl>
          </SectionTitle>
          <div className="flex flex-col gap-3.5 text-pretty text-base leading-[1.7] text-soft">
            <p>
              A 1000 Giros nasceu da vontade de comprar e vender motos do jeito que a gente gostaria de ser
              atendido: sem enrolação, com a moto revisada e a documentação limpa.
            </p>
            <p>
              Hoje, na Rodovia Salvador de Leone, recebemos motociclistas de toda a região. Cada moto que entra
              passa por vistoria completa antes de chegar ao salão — e só fica no estoque se a gente teria
              coragem de levar para casa.
            </p>
          </div>
          <Button href="/estoque" size="lg" className="mt-7 gap-2.5 px-6">
            Ver o estoque
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <div className="relative aspect-5/4 overflow-hidden rounded-[10px] border border-white/8">
          <Image src="/images/rider.png" alt="Piloto com capacete" fill sizes="(min-width: 1240px) 590px, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,10,11,0.85),transparent_50%)]" />
          <p className="absolute bottom-[18px] left-5 font-title text-[22px] leading-[normal]">Desde o primeiro giro</p>
        </div>
      </section>

      <section className="border-y border-primary/25 bg-[linear-gradient(90deg,#1a0608,#0d0d0f_50%,#1a0608)]">
        <dl className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-7 py-11">
          {numeros.map((n) => (
            <div key={n.label} className="flex flex-col-reverse gap-1.5 border-l-2 border-primary pl-[18px]">
              <dt className="text-sm uppercase tracking-[0.05em] text-soft">{n.label}</dt>
              <dd className="font-display text-[clamp(52px,6.4vw,76px)] font-black italic leading-[0.9]">
                <CountUp value={n.valor} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`container-site ${sectionY}`}>
        <SectionTitle eyebrow="No que a gente acredita" titleClassName={`${titleLg} mb-7`}>
          Nossos <Hl>valores</Hl>
        </SectionTitle>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4">
          {valores.map((v) => (
            <li key={v.titulo}>
              <FeatureCard icon={v.icon} title={v.titulo}>
                {v.texto}
              </FeatureCard>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-site pb-[clamp(48px,7vw,88px)]">
        <SectionTitle eyebrow="Por dentro da loja" titleClassName={`${titleLg} mb-7`}>
          Nosso <Hl>espaço</Hl>
        </SectionTitle>
        <div className="grid auto-rows-[180px] grid-cols-[repeat(auto-fill,minmax(min(100%,140px),1fr))] gap-3 md:grid-cols-[repeat(auto-fill,minmax(min(100%,220px),1fr))]">
          <div className="relative col-span-2 row-span-2 overflow-hidden rounded-lg">
            <Image
              src="/images/store.png"
              alt="Salão da loja"
              fill
              sizes="(min-width: 760px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-[1.04]"
            />
          </div>
          {galeriaLoja.map((label) => (
            <div
              key={label}
              className="flex items-center justify-center rounded-lg border border-white/6 bg-[repeating-linear-gradient(135deg,#121215_0_10px,#17171b_10px_20px)] p-2.5 text-center font-mono text-[11px] text-dim"
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-white/6 bg-bg-alt">
        <div className="container-site py-[clamp(48px,7vw,80px)]">
          <TestimonialCarousel
            items={depoimentos}
            heading={
              <SectionTitle eyebrow="Depoimentos" titleClassName={titleLg}>
                Quem comprou, <Hl>recomenda</Hl>
              </SectionTitle>
            }
          />
        </div>
      </section>

      <section className={`container-site ${sectionY}`}>
        <MapCard
          title={
            <>
              Venha conhecer <Hl>a loja</Hl>
            </>
          }
        />
      </section>
    </>
  );
}

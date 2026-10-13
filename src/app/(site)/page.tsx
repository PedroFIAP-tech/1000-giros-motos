import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Bike, CreditCard, Handshake, ShieldCheck, Users } from "lucide-react";
import { FeaturedCarousel } from "@/components/home/FeaturedCarousel";
import { SearchPanel } from "@/components/home/SearchPanel";
import { MotoCard } from "@/components/moto/MotoCard";
import { FeatureCard } from "@/components/sections/FeatureCard";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Eyebrow, Hl, SectionTitle } from "@/components/ui/SectionTitle";
import { getDestaques, getMotos, marcas } from "@/data/motos";
import { servicesNav } from "@/lib/navigation";
import { whatsappLink } from "@/lib/whatsapp";

const confianca = [
  { icon: ShieldCheck, texto: ["Motos revisadas", "e com procedência"] },
  { icon: CreditCard, texto: ["Facilidade", "no financiamento"] },
  { icon: Handshake, texto: ["Atendimento", "especializado"] },
];

/* Sem os arquivos das logos no design: nomes em caixa alta, como marcas d'água. */
const estiloMarca: Record<string, string> = {
  Honda: "font-display text-[26px] font-extrabold italic tracking-[0.06em]",
  Yamaha: "font-display text-[26px] font-bold tracking-[0.04em]",
  Kawasaki: "text-[22px] font-bold italic",
  Suzuki: "font-display text-[26px] font-black italic tracking-[0.03em]",
  BMW: "flex size-14 items-center justify-center rounded-full border-2 border-current text-base font-bold",
  Triumph: "font-display text-2xl font-semibold tracking-[0.18em]",
};

export default function HomePage() {
  const motos = getMotos();

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full md:w-[68%]">
          <Image
            src="/images/hero-moto.png"
            alt="Honda CB 500F vermelha na loja 1000 Giros"
            fill
            preload
            sizes="(min-width: 760px) 68vw, 100vw"
            className="object-cover object-[60%_center] max-md:opacity-45"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0b_28%,rgba(10,10,11,0.7)_48%,rgba(10,10,11,0.1)_75%),linear-gradient(0deg,#0a0a0b,transparent_35%)]" />
        <div className="container-site relative pb-[110px] pt-[clamp(36px,5vw,56px)]">
          <Eyebrow>1000 Giros Motos</Eyebrow>
          <h1 className="mt-3 font-title text-[clamp(44px,7.4vw,92px)] leading-[0.9]">
            Sua próxima
            <br />
            <Hl>moto</Hl> está aqui.
          </h1>
          <p className="mt-5 max-w-[440px] text-pretty text-[clamp(15px,1.6vw,18px)] leading-normal text-soft">
            Motos selecionadas, procedência e o atendimento que você merece.
          </p>
          <div className="mt-[26px] flex flex-wrap gap-2.5">
            <Button
              href="/estoque"
              className="h-[52px] gap-2.5 px-6 text-lg shadow-[0_10px_30px_-10px_rgba(229,22,29,0.7)] hover:shadow-[0_10px_30px_-10px_rgba(229,22,29,0.7)]"
            >
              <Bike className="size-5" />
              Ver estoque
              <ArrowRight className="size-4" />
            </Button>
            <Button href={whatsappLink()} external variant="secondary" className="h-[52px] gap-2.5 px-6 text-lg">
              <WhatsAppIcon className="size-5" />
              Fale no WhatsApp
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-4">
            {confianca.map(({ icon: Icon, texto }) => (
              <li key={texto[0]} className="flex items-center gap-3 text-[13px] leading-[1.3] text-soft">
                <Icon className="size-7 shrink-0 text-primary" />
                <span>
                  {texto[0]}
                  <br />
                  {texto[1]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="container-site relative z-10 -mt-[72px]">
        <SearchPanel motos={motos} />
      </div>

      <section className="container-site pb-[clamp(40px,5vw,56px)] pt-10">
        <div className="mb-[22px] flex flex-wrap items-end justify-between gap-3">
          <SectionTitle eyebrow="Destaques do estoque" titleClassName="text-[clamp(32px,4.4vw,44px)]">
            Motos <Hl>em</Hl> destaque
          </SectionTitle>
          <Button href="/estoque" variant="ghost">
            Ver todo o estoque
            <ArrowRight className="size-4" />
          </Button>
        </div>
        <FeaturedCarousel>
          {getDestaques().map((moto) => (
            <li key={moto.slug} className="snap-start">
              <MotoCard moto={moto} showSelo={false} />
            </li>
          ))}
        </FeaturedCarousel>
      </section>

      <section className="relative overflow-hidden border-y border-white/6 bg-bg-alt">
        <div className="absolute inset-y-0 left-0 hidden w-[34%] lg:block">
          <Image src="/images/rider.png" alt="" fill sizes="34vw" className="object-cover object-left opacity-60" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,#0d0d0f_85%)]" />
        </div>
        <div className="container-site relative grid items-center gap-8 py-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)]">
          <h2 className="font-title text-[clamp(32px,3.6vw,44px)] leading-[0.95] lg:pl-[22%]">
            Tudo para
            <br />
            você sair
            <br />
            <Hl>de moto nova</Hl>
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {servicesNav.map(({ href, label, description, icon }) => (
              <li key={href}>
                <Link href={href} className="block h-full text-white hover:text-white">
                  <FeatureCard icon={icon!} title={label} variant="center">
                    {description}
                  </FeatureCard>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-site flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:gap-14">
        <SectionTitle eyebrow="As melhores marcas" className="shrink-0" titleClassName="text-[clamp(28px,3vw,36px)] leading-[0.95]">
          Trabalhamos com
          <br />
          as principais marcas
        </SectionTitle>
        <ul className="grid flex-1 grid-cols-3 items-center gap-x-6 gap-y-8 md:grid-cols-6">
          {marcas.map((marca) => (
            <li key={marca} className="flex justify-center">
              <Link
                href={`/estoque?marca=${encodeURIComponent(marca)}`}
                aria-label={`Motos ${marca} no estoque`}
                className="uppercase text-white/70 transition-colors hover:text-white"
              >
                <span className={estiloMarca[marca]}>{marca}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="grid border-t border-white/6 md:grid-cols-2">
        <div className="relative min-h-[300px]">
          <Image src="/images/store.png" alt="Salão da loja 1000 Giros" fill sizes="(min-width: 760px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col justify-center gap-[18px] bg-[radial-gradient(ellipse_at_top_right,#1a1a1f,#0a0a0b_70%)] px-6 py-[clamp(36px,5vw,56px)] md:px-[clamp(28px,4vw,56px)]">
          <SectionTitle eyebrow="Sobre nós" titleClassName="text-[clamp(30px,3.4vw,40px)] leading-[0.95]">
            Mais que uma loja,
            <br />
            uma paixão <Hl>sobre duas rodas</Hl>
          </SectionTitle>
          <p className="max-w-[540px] text-pretty text-[15px] leading-[1.6] text-soft">
            Na 1000 Giros, acreditamos que vender uma moto vai muito além de fechar negócio. Aqui você encontra
            qualidade, procedência e um atendimento de verdade, feito por quem também é apaixonado por motos.
          </p>
          <Button href="/sobre" size="lg" className="self-start px-6 hover:shadow-none">
            Conheça a nossa história
            <ArrowRight className="size-4" />
          </Button>
          <ul className="mt-2 grid grid-cols-3 gap-4 text-[13px] text-soft">
            <li className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary">
                <Award className="size-5 text-primary" />
              </span>
              <span>
                Anos de
                <br />
                mercado
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Bike className="size-9 shrink-0 text-primary" />
              <span>
                <strong className="block text-base text-white">+500</strong>
                motos vendidas
              </span>
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary">
                <Users className="size-5 text-primary" />
              </span>
              <span>
                Clientes
                <br />
                satisfeitos
              </span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Eyebrow, Hl, SectionTitle, titleLg } from "@/components/ui/SectionTitle";
import { getMotos, motoNome } from "@/data/motos";
import { servicoKeys, servicos, type ServicoKey } from "@/data/servicos";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { FeatureCard } from "./FeatureCard";
import { RevealItem, RevealList } from "./Reveal";
import { ServiceForm } from "./ServiceForm";
import { StepCard } from "./StepCard";

const grid4 = "grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-4";
const sectionTop = "container-site pt-[clamp(48px,7vw,80px)]";

/** Template único das páginas de serviço. */
export function ServicePage({ servico }: { servico: ServicoKey }) {
  const s = servicos[servico];
  const Icon = s.icon;
  const stockOptions = [
    ...getMotos()
      .filter((m) => m.status === "disponivel")
      .map((m) => `${motoNome(m)} — ${formatPrice(m.preco)}`),
    "Outra moto do estoque",
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/6">
        <div className="absolute inset-y-0 right-0 w-[60%] opacity-50">
          <Image src="/images/hero-moto.png" alt="" fill preload sizes="60vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0b_40%,rgba(10,10,11,0.6)_70%,rgba(10,10,11,0.3))]" />
        <div className="container-site relative pb-[clamp(36px,5vw,60px)] pt-[clamp(40px,6vw,72px)]">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Serviços" }, { label: s.nome }]}
            className="mb-[22px]"
          />
          <div className="mb-[18px] flex size-16 items-center justify-center rounded-xl border-[1.5px] border-primary/55 bg-primary/10">
            <Icon className="size-[30px] text-primary" />
          </div>
          <Eyebrow>Serviços 1000 Giros</Eyebrow>
          <h1 className="mt-2.5 max-w-[720px] font-title text-[clamp(42px,6.8vw,84px)] leading-[0.98]">
            {s.pre} <Hl>{s.hl}</Hl>
          </h1>
          <p className="mt-4 max-w-[520px] text-pretty text-[clamp(15px,1.6vw,18px)] leading-normal text-soft">
            {s.sub}
          </p>
          <div className="mt-[26px] flex flex-wrap gap-2.5">
            <Button href="#form" className="h-[52px] gap-2.5 px-6 text-lg hover:shadow-none">
              {s.cta}
              <ArrowRight className="size-4" />
            </Button>
            <Button
              href={whatsappLink(`Olá! Quero saber mais sobre ${s.nome.toLowerCase()}.`)}
              external
              variant="secondary"
              className="h-[52px] gap-2.5 px-6 text-lg"
            >
              <WhatsAppIcon className="size-4 text-primary" />
              Fale no WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <nav aria-label="Serviços" className="overflow-x-auto border-b border-white/6 bg-bg-alt">
        <div className="container-site flex gap-1">
          {servicoKeys.map((key) => {
            const tab = servicos[key];
            const TabIcon = tab.icon;
            const active = key === servico;
            return (
              <Link
                key={key}
                href={`/servicos/${key}`}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-[54px] flex-none items-center gap-2 border-b-2 px-[18px] text-sm font-semibold transition-colors duration-200 hover:text-white",
                  active ? "border-primary text-white" : "border-transparent text-muted",
                )}
              >
                <TabIcon className="size-[17px] text-primary" />
                {tab.nome}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className={sectionTop}>
        <SectionTitle eyebrow="Passo a passo" titleClassName={`${titleLg} mb-7`}>
          Como <Hl>funciona</Hl>
        </SectionTitle>
        <RevealList as="ol" className={grid4}>
          {s.passos.map((p, i) => (
            <RevealItem key={p.titulo}>
              <StepCard n={i + 1} title={p.titulo}>
                {p.texto}
              </StepCard>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      <section className={sectionTop}>
        <SectionTitle eyebrow="Por que com a gente" titleClassName={`${titleLg} mb-7`}>
          Vantagens <Hl>1000 Giros</Hl>
        </SectionTitle>
        <ul className={grid4}>
          {s.vantagens.map((v) => (
            <li key={v.titulo}>
              <FeatureCard icon={v.icon} title={v.titulo} variant="center">
                {v.texto}
              </FeatureCard>
            </li>
          ))}
        </ul>
      </section>

      <section
        id="form"
        className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-8 py-[clamp(48px,7vw,80px)]"
      >
        <div className="rounded-[10px] border border-primary/25 bg-[linear-gradient(160deg,#1a0a0c,#121215_45%)] p-[clamp(22px,3vw,36px)]">
          <ServiceForm
            key={servico}
            campos={s.campos}
            stockOptions={stockOptions}
            formT={s.formT}
            formHl={s.formHl}
            cta={s.cta}
            ok={s.ok}
            intro={s.intro}
          />
        </div>
        <div>
          <SectionTitle
            eyebrow="Dúvidas frequentes"
            titleClassName="mb-[22px] mt-2.5 text-[clamp(34px,4.6vw,48px)] leading-[0.95]"
          >
            Perguntas <Hl>frequentes</Hl>
          </SectionTitle>
          <Accordion key={servico} items={s.faq} />
        </div>
      </section>
    </>
  );
}

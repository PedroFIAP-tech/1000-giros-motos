import type { Metadata } from "next";
import { Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { socials } from "@/components/layout/SocialLinks";
import { ContactForm } from "@/components/sections/ContactForm";
import { MapEmbed } from "@/components/sections/MapCard";
import { RevealItem, RevealList } from "@/components/sections/Reveal";
import { WhatsAppIcon } from "@/components/ui/icons";
import { PageBanner } from "@/components/ui/PageBanner";
import { Hl } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contato",
  description: "WhatsApp, telefone ou uma visita na loja — escolha o caminho mais rápido para você.",
};

const { phone, email, address, hours, whatsapp } = siteConfig;

const canais = [
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    valor: whatsapp.display,
    texto: "Resposta mais rápida",
    href: whatsappLink(),
    external: true,
    destaque: true,
  },
  { icon: Phone, label: "Telefone", valor: phone.display, texto: "Seg a sáb no horário da loja", href: phone.href },
  { icon: Mail, label: "E-mail", valor: email, texto: "Para propostas e parcerias", href: `mailto:${email}` },
  {
    icon: MapPin,
    label: "Endereço",
    valor: address.street.replace("Rodovia", "Rod."),
    texto: `${address.city} - ${address.state}`,
    href: address.mapsUrl,
    external: true,
  },
  { icon: Clock, label: "Horário", valor: hours.weekdays, texto: hours.saturday, href: address.mapsUrl, external: true },
];

export default function ContatoPage() {
  return (
    <>
      <PageBanner
        eyebrow="Atendimento"
        pre="Fale com"
        hl="a gente"
        sub="WhatsApp, telefone ou uma visita na loja — escolha o caminho mais rápido para você."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contato" }]}
        position="70% center"
      />

      <section className="container-site pt-10">
        <RevealList className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,210px),1fr))] gap-3.5">
          {canais.map(({ icon: Icon, label, valor, texto, href, external, destaque }) => (
            <RevealItem key={label}>
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "flex h-full flex-col gap-2.5 rounded-lg border px-5 py-[22px] text-white transition-all duration-250 hover:-translate-y-1 hover:border-primary hover:text-white",
                  destaque ? "border-primary bg-primary" : "border-white/8 bg-surface",
                )}
              >
                <Icon className={cn("size-7", destaque ? "text-white" : "text-primary")} />
                <span
                  className={cn(
                    "text-xs font-semibold uppercase tracking-[0.06em]",
                    destaque ? "text-[#ffe4e5]" : "text-muted",
                  )}
                >
                  {label}
                </span>
                <span className="text-base font-bold leading-[1.35]">{valor}</span>
                <span className={cn("text-[13px] leading-[1.4]", destaque ? "text-[#ffe4e5]" : "text-muted")}>
                  {texto}
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealList>
      </section>

      <section className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] items-stretch gap-6 pb-16 pt-10">
        <div className="rounded-[10px] border border-white/8 bg-surface p-[clamp(22px,3vw,36px)]">
          <ContactForm />
        </div>
        <div className="flex flex-col gap-3.5">
          <div className="relative min-h-[420px] flex-1 overflow-hidden rounded-[10px] border border-white/8 bg-surface-3">
            <MapEmbed zoom={15} className="absolute inset-0 size-full" />
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-3.5 left-3.5 flex h-11 items-center gap-2 rounded-md bg-primary px-[18px] font-cta text-base text-white shadow-[0_8px_20px_rgba(0,0,0,0.5)] hover:text-white"
            >
              <Navigation className="size-4" />
              Como chegar
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3.5 rounded-[10px] border border-white/8 bg-surface px-5 py-[18px]">
            <div>
              <p className="font-title text-[22px] leading-[normal]">
                Siga a <Hl>1000 Giros</Hl>
              </p>
              <p className="text-[13px] text-muted">Chegadas novas primeiro nas redes.</p>
            </div>
            <ul className="flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-11 items-center gap-2 rounded-md border border-white/14 px-3.5 text-[13px] font-semibold text-ink transition-all duration-200 hover:border-primary hover:bg-primary/10 hover:text-white"
                  >
                    <Icon className="size-[18px] text-primary" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

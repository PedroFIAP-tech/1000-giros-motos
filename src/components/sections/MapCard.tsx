import { Clock, MapPin, Navigation } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Eyebrow } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
  `${siteConfig.address.street}, ${siteConfig.address.city}`,
)}&z=14&output=embed`;

/** Mapa escurecido do Google (mesmo filtro do design). */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <iframe
      title={`Mapa: ${siteConfig.name}`}
      src={mapSrc}
      loading="lazy"
      className={className}
      style={{ border: 0, filter: "invert(.92) hue-rotate(180deg) saturate(.6) contrast(.9)" }}
    />
  );
}

/** "Visite a gente": endereço, horário, Traçar rota / Agendar visita e mapa. */
export function MapCard({ title }: { title: ReactNode }) {
  const { address, hours } = siteConfig;
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] overflow-hidden rounded-[10px] border border-white/8 bg-surface">
      <div className="flex flex-col justify-center gap-[18px] p-[clamp(28px,4vw,48px)]">
        <Eyebrow>Visite a gente</Eyebrow>
        <h2 className="font-title text-[clamp(36px,4.8vw,56px)]">{title}</h2>
        <div className="flex flex-col gap-3 text-[15px] text-soft">
          <p className="flex gap-3">
            <MapPin className="size-5 shrink-0 text-primary" />
            <span>
              {address.street} — {address.neighborhood}
              <br />
              {address.city} - {address.state}, {address.zip}
            </span>
          </p>
          <p className="flex gap-3">
            <Clock className="size-5 shrink-0 text-primary" />
            <span>{hours.short}</span>
          </p>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-2.5">
          <Button href={address.mapsUrl} external size="lg" className="px-[22px] hover:translate-y-0 hover:shadow-none">
            <Navigation className="size-[17px]" />
            Traçar rota
          </Button>
          <Button
            href={whatsappLink("Olá! Quero agendar uma visita à loja.")}
            external
            variant="secondary"
            size="lg"
            className="px-[22px]"
          >
            <WhatsAppIcon className="size-[17px] text-primary" />
            Agendar visita
          </Button>
        </div>
      </div>
      <div className="min-h-[340px] bg-surface-3">
        <MapEmbed className="block size-full min-h-[340px]" />
      </div>
    </div>
  );
}

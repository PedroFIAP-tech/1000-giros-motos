import { Headset, MapPin, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { whatsappLink } from "@/lib/whatsapp";

/** Faixa vermelho-escura acima do rodapé: ajuda, WhatsApp, telefone e endereço. */
export function ContactStrip() {
  const { address, phone } = siteConfig;
  return (
    <section className="border-t border-primary/35 bg-[linear-gradient(90deg,#3d0a0d,#250709_60%,#1a0608)]">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-8 gap-y-6 px-6 py-[26px]">
        <div className="flex flex-[1_1_240px] items-center gap-3.5">
          <Headset className="size-9 shrink-0 text-primary" />
          <div>
            <p className="text-[15px] font-bold uppercase">Precisa de ajuda?</p>
            <p className="text-[13px] leading-[1.4] text-soft">
              Nossa equipe está pronta para te atender no WhatsApp.
            </p>
          </div>
        </div>

        <Button href={whatsappLink()} external size="lg" className="flex-none hover:shadow-none">
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </Button>

        <div className="flex flex-[1_1_200px] items-center gap-3.5 pl-1">
          <PhoneCall className="size-7 shrink-0 text-primary" />
          <div>
            <a href={phone.href} className="text-[17px] font-bold">
              {phone.display}
            </a>
            <p className="text-[13px] text-soft">Fale com a nossa equipe</p>
          </div>
        </div>

        <div className="flex flex-[1_1_260px] items-center gap-3.5">
          <MapPin className="size-[30px] shrink-0 text-primary" />
          <div>
            <p className="text-[15px] font-bold">
              {address.neighborhood} - {address.state}
            </p>
            <p className="text-[13px] leading-[1.4] text-soft">
              {address.street}
              <br />
              {address.city} - {address.state}, {address.zip}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

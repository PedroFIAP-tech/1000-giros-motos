"use client";

import { useState } from "react";
import { Calculator, Calendar, FileCheck, Gauge, MapPin, ShieldCheck, Wrench } from "lucide-react";
import { motoNome, type Moto } from "@/data/motos";
import { Button } from "@/components/ui/Button";
import { Seal } from "@/components/ui/Chip";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Eyebrow, Hl } from "@/components/ui/SectionTitle";
import { siteConfig } from "@/lib/config";
import { FINANCE_RATE, formatNumber, formatPrice, installment } from "@/lib/format";
import { interestMessage, whatsappLink } from "@/lib/whatsapp";
import { FavoriteButton } from "./FavoriteButton";
import { FinanceSimulator, maxEntrada, type Prazo } from "./FinanceSimulator";
import { ShareButton } from "./ShareButton";

/** Coluna de compra: título, preço, selos, CTAs e simulador (estado compartilhado). */
export function MotoPurchase({ moto }: { moto: Moto }) {
  const [entrada, setEntrada] = useState(() => Math.min(10000, maxEntrada(moto.preco)));
  const [prazo, setPrazo] = useState<Prazo>(48);
  const nome = motoNome(moto);
  const palavras = nome.split(" ");
  const destaque = palavras.pop();
  const parcela48 = installment(moto.preco - entrada, FINANCE_RATE, 48);

  return (
    <div className="flex min-w-0 flex-col gap-[18px]">
      <Eyebrow>
        {moto.tipo} · {moto.marca}
      </Eyebrow>
      <h1 className="-mt-1.5 font-title text-[clamp(44px,6vw,64px)]">
        {palavras.join(" ")} <Hl>{destaque}</Hl>
      </h1>

      <ul className="flex flex-wrap gap-x-[18px] gap-y-2 text-sm text-soft">
        <li className="flex items-center gap-1.5">
          <Calendar className="size-3.5 text-primary" />
          {moto.ano}/{moto.anoModelo}
        </li>
        <li className="flex items-center gap-1.5">
          <Gauge className="size-3.5 text-primary" />
          {formatNumber(moto.km)} km
        </li>
        <li className="flex items-center gap-1.5">
          <MapPin className="size-3.5 text-primary" />
          {siteConfig.address.city}
        </li>
      </ul>

      <div className="rounded-lg border border-white/8 bg-surface px-5 py-[18px]">
        <p className="text-xs uppercase tracking-[0.06em] text-muted">Preço à vista</p>
        <p className="font-display text-5xl font-extrabold leading-[1.05]">{formatPrice(moto.preco)}</p>
        <p className="text-sm text-soft">
          ou <strong className="text-white">48x de R$ {formatNumber(parcela48)}</strong> com entrada de R${" "}
          {formatNumber(entrada)}*
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Seal icon={Wrench}>Revisada</Seal>
        <Seal icon={ShieldCheck}>Procedência garantida</Seal>
        <Seal icon={FileCheck}>IPVA 2026 pago</Seal>
      </div>

      <Button
        href={whatsappLink(interestMessage(moto))}
        external
        className="h-[58px] gap-2.5 whitespace-normal text-center text-xl leading-none shadow-[0_10px_30px_-10px_rgba(229,22,29,0.7)] hover:shadow-[0_10px_30px_-10px_rgba(229,22,29,0.7)]"
      >
        <WhatsAppIcon className="size-[22px]" />
        Tenho interesse — falar no WhatsApp
      </Button>

      <div className="grid grid-cols-[1fr_auto_auto] gap-2.5">
        <Button href="#simulador" variant="secondary" size="lg" className="px-3">
          <Calculator className="size-[18px] text-primary" />
          Simular financiamento
        </Button>
        <FavoriteButton
          slug={moto.slug}
          nome={nome}
          iconClassName="size-5"
          idleColor="text-white"
          className="size-[50px] rounded-md border-[1.5px] border-white/20 bg-transparent transition-colors hover:border-primary"
        />
        <ShareButton title={`${nome} ${moto.ano}`} text={interestMessage(moto)} />
      </div>

      <FinanceSimulator
        id="simulador"
        preco={moto.preco}
        entrada={entrada}
        prazo={prazo}
        onEntradaChange={setEntrada}
        onPrazoChange={setPrazo}
      />
    </div>
  );
}

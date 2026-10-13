"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Bike, House } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow, Hl } from "@/components/ui/SectionTitle";

/**
 * 404 do Claude Design: "Essa rota não tem saída". A faixa tracejada da pista
 * corre em loop e a moto entra deslizando da direita.
 */
export function NotFoundRoad() {
  return (
    <section className="relative flex min-h-[clamp(560px,52vw,680px)] w-full items-center overflow-hidden">
      <p
        aria-hidden="true"
        className="pointer-events-none absolute right-[-2vw] top-1/2 -translate-y-1/2 select-none font-display text-[clamp(220px,40vw,520px)] font-black italic leading-[0.8] tracking-[-0.04em] text-transparent [-webkit-text-stroke:2px_rgba(229,22,29,0.35)]"
      >
        404
      </p>
      <motion.div
        initial={{ x: 160, opacity: 0 }}
        animate={{ x: 0, opacity: 0.9 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 aspect-[1004/736] w-[min(62%,820px)] [mask-image:linear-gradient(90deg,transparent,#000_35%)]"
      >
        <Image src="/images/hero-moto.png" alt="Moto parada" fill preload sizes="(min-width: 1320px) 820px, 62vw" />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0b_30%,rgba(10,10,11,0.5)_60%,transparent),linear-gradient(0deg,#0a0a0b,transparent_30%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-14 h-1 overflow-hidden opacity-50">
        <div className="h-full w-[calc(100%+70px)] bg-[repeating-linear-gradient(90deg,#e5161d_0_40px,transparent_40px_70px)] motion-safe:animate-[road-dash_0.6s_linear_infinite]" />
      </div>

      <div className="container-site relative w-full py-14">
        <Eyebrow>Erro 404 · página não encontrada</Eyebrow>
        <h1 className="mt-3 max-w-[640px] font-title text-[clamp(52px,8vw,100px)] leading-[0.88]">
          Essa rota <Hl>não tem saída.</Hl>
        </h1>
        <p className="mt-[18px] max-w-[440px] text-pretty text-[clamp(15px,1.6vw,18px)] leading-normal text-soft">
          Parece que você pegou a contramão. A página que procurava saiu para dar um giro — mas o estoque continua
          aqui, cheio de motos.
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          <Button href="/" className="h-[54px] gap-2.5 px-[26px] text-lg hover:shadow-none">
            <House className="size-[19px]" />
            Voltar para a home
          </Button>
          <Button href="/estoque" variant="secondary" className="h-[54px] gap-2.5 border-white/60 px-[26px] text-lg">
            <Bike className="size-[19px] text-primary" />
            Ver estoque
          </Button>
        </div>
      </div>
    </section>
  );
}

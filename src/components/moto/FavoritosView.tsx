"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Bike, Heart, Trash2 } from "lucide-react";
import { motoNome, type Moto } from "@/data/motos";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Hl } from "@/components/ui/SectionTitle";
import { useFavorites, useHydrated } from "@/hooks/useFavorites";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";
import { MotoCard } from "./MotoCard";

function listMessage(motos: Moto[]) {
  const itens = motos.map((m) => `- ${motoNome(m)} ${m.ano} (${formatPrice(m.preco)})`).join("\n");
  return `Olá! Separei estas motos no site da 1000 Giros:\n${itens}`;
}

const action =
  "flex h-10 items-center gap-2 rounded-md border border-white/14 bg-transparent px-3.5 text-[13px] font-semibold transition-all duration-200";

export function FavoritosView({ motos }: { motos: Moto[] }) {
  const hydrated = useHydrated();
  const { favorites, clear } = useFavorites();
  const saved = favorites.map((slug) => motos.find((m) => m.slug === slug)).filter((m): m is Moto => !!m);

  // Antes de ler o aparelho, não mostra nada (evita piscar a garagem vazia).
  if (!hydrated) return <div className="min-h-[420px]" />;

  if (saved.length === 0) return <EmptyGarage />;

  return (
    <>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/7 pb-4">
        <p className="text-[15px] text-soft" aria-live="polite">
          <strong className="text-lg text-white">{saved.length}</strong>{" "}
          {saved.length === 1 ? "moto salva" : "motos salvas"}
        </p>
        <div className="flex flex-wrap gap-2">
          <a
            href={whatsappLink(listMessage(saved))}
            target="_blank"
            rel="noopener noreferrer"
            className={`${action} text-ink hover:border-primary hover:text-white`}
          >
            <WhatsAppIcon className="size-4 text-primary" />
            Enviar lista no WhatsApp
          </a>
          <button type="button" onClick={clear} className={`${action} text-muted hover:border-white hover:text-white`}>
            <Trash2 className="size-4" />
            Limpar tudo
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,160px),1fr))] gap-4 md:grid-cols-[repeat(auto-fill,minmax(min(100%,240px),1fr))]">
        <AnimatePresence initial={false}>
          {saved.map((moto) => (
            <motion.li
              key={moto.slug}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <MotoCard moto={moto} showSelo={false} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>
  );
}

function EmptyGarage() {
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-[clamp(48px,8vw,96px)] text-center">
      <div aria-hidden="true" className="relative flex size-[200px] items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-dashed border-primary/30" />
        <div className="absolute inset-7 rounded-full border border-primary/25 bg-[radial-gradient(circle,rgba(229,22,29,0.18),transparent_70%)]" />
        <div className="absolute inset-[62px] flex items-center justify-center rounded-full border-[1.5px] border-primary bg-surface">
          <Heart className="size-[34px] text-primary" />
        </div>
        <div className="absolute right-[30px] top-[18px] size-2.5 rounded-full bg-primary" />
        <div className="absolute bottom-[34px] left-4 size-1.5 rounded-full bg-primary/60" />
      </div>
      <h2 className="mt-2 font-title text-[clamp(32px,4.6vw,48px)] leading-[0.95]">
        Sua garagem <Hl>está vazia</Hl>
      </h2>
      <p className="max-w-[420px] text-pretty text-[15px] leading-[1.55] text-muted">
        Toque no coração das motos que curtir para guardar aqui e comparar com calma depois.
      </p>
      <Button href="/estoque" className="mt-2 h-[52px] gap-2.5 px-[26px] text-lg hover:shadow-none">
        <Bike className="size-5" />
        Explorar estoque
        <ArrowRight className="size-4" />
      </Button>
    </div>
  );
}

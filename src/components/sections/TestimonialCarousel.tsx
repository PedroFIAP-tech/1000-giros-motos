"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bike, ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Depoimento = { nome: string; iniciais: string; moto: string; texto: string };

const arrow =
  "flex size-[46px] items-center justify-center rounded-full border border-white/18 bg-transparent text-white transition-all duration-200 hover:border-primary hover:bg-primary";

/** Cards com estrelas, texto e quem comprou; setas + dots. 3 por vez (1 no mobile). */
export function TestimonialCarousel({ items, heading }: { items: Depoimento[]; heading: ReactNode }) {
  const [state, setState] = useState({ index: 0, dir: 1 });
  const { index, dir } = state;
  const go = (to: number, d: number) => setState({ index: (to + items.length) % items.length, dir: d });
  const visible = [0, 1, 2].map((j) => items[(index + j) % items.length]);

  return (
    <>
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        {heading}
        <div className="flex gap-2">
          <button type="button" aria-label="Depoimento anterior" onClick={() => go(index - 1, -1)} className={arrow}>
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" aria-label="Próximo depoimento" onClick={() => go(index + 1, 1)} className={arrow}>
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: `${d * 12}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: `${d * -12}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {visible.map((d, j) => (
              <figure
                key={`${d.nome}-${j}`}
                className={cn(
                  "flex flex-col gap-4 rounded-lg border border-white/8 bg-surface p-6",
                  j > 0 && "max-md:hidden",
                )}
              >
                <div className="flex gap-[3px] text-primary" aria-label="5 estrelas">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="size-4" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="flex-1 text-pretty text-[15px] leading-[1.6] text-[#e4e4e7]">
                  “{d.texto}”
                </blockquote>
                <figcaption className="flex items-center gap-3 border-t border-white/7 pt-3.5">
                  <div className="flex size-[46px] shrink-0 items-center justify-center rounded-full border-[1.5px] border-primary bg-[repeating-linear-gradient(135deg,#1f1f24_0_5px,#26262c_5px_10px)] text-sm font-bold">
                    {d.iniciais}
                  </div>
                  <div>
                    <p className="text-[15px] font-bold">{d.nome}</p>
                    <p className="flex items-center gap-[5px] text-xs text-muted">
                      <Bike className="size-3 text-primary" />
                      Comprou uma {d.moto}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-[22px] flex justify-center gap-1.5">
        {items.map((d, j) => (
          <button
            key={d.nome}
            type="button"
            aria-label={`Ir para o depoimento ${j + 1}`}
            aria-current={j === index}
            onClick={() => go(j, j >= index ? 1 : -1)}
            className={cn(
              "h-1.5 rounded-[3px] transition-all duration-300",
              j === index ? "w-6 bg-primary" : "w-1.5 bg-white/25",
            )}
          />
        ))}
      </div>
    </>
  );
}

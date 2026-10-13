"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

/** FAQ: +/−, borda vermelha no item aberto, abre com altura animada (250ms). */
export function Accordion({ items, defaultOpen = 0 }: { items: { pergunta: string; resposta: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = i === open;
        return (
          <div
            key={item.pergunta}
            className={cn(
              "overflow-hidden rounded-lg border bg-surface transition-colors duration-200",
              isOpen ? "border-primary/50" : "border-white/8",
            )}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`${id}-${i}`}
              onClick={() => setOpen(isOpen ? -1 : i)}
              className="flex w-full items-center justify-between gap-3 bg-transparent p-[18px] text-left text-[15px] font-semibold text-white"
            >
              {item.pergunta}
              {isOpen ? (
                <Minus className="size-[18px] shrink-0 text-primary" />
              ) : (
                <Plus className="size-[18px] shrink-0 text-primary" />
              )}
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-pretty px-[18px] pb-[18px] text-sm leading-[1.6] text-muted">{item.resposta}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState, ViewTransition } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { GalleryItem } from "@/data/motos";
import { cn } from "@/lib/utils";

const overlayBtn =
  "flex items-center justify-center bg-[rgba(10,10,11,0.75)] text-white transition-colors hover:bg-primary";
const lightboxBtn =
  "flex size-11 items-center justify-center rounded-full border border-white/20 bg-transparent text-white transition-colors";

/** Foto da galeria ou o placeholder listrado do design. */
function Slide({
  item,
  alt,
  sizes,
  fit = "cover",
  stripe = 12,
  label = "text-xs",
  preload,
}: {
  item: GalleryItem;
  alt: string;
  sizes: string;
  fit?: "cover" | "contain";
  stripe?: number;
  label?: string;
  preload?: boolean;
}) {
  if ("placeholder" in item) {
    return (
      <div
        className={cn("flex size-full items-center justify-center font-mono text-dim", label)}
        style={{
          background: `repeating-linear-gradient(135deg,#141417 0 ${stripe}px,${stripe === 12 ? "#18181c" : "#1b1b1f"} ${stripe}px ${stripe * 2}px)`,
        }}
      >
        {item.placeholder}
      </div>
    );
  }
  return (
    <Image
      src={item.src}
      alt={alt}
      fill
      sizes={sizes}
      preload={preload}
      className={fit === "cover" ? "object-cover" : "object-contain"}
      style={
        fit === "cover"
          ? { objectPosition: item.position, transform: `scale(${item.zoom ?? 1})`, transition: "object-position .4s" }
          : undefined
      }
    />
  );
}

/** Imagem principal com setas, contador, miniaturas e tela cheia. */
export function Gallery({
  items,
  alt,
  selo,
  transitionName,
}: {
  items: GalleryItem[];
  alt: string;
  selo?: string;
  /** Mesmo nome do card: a foto "voa" do card para a galeria. */
  transitionName: string;
}) {
  const [index, setIndex] = useState(0);
  const [full, setFull] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const count = items.length;

  const go = useCallback((delta: number) => setIndex((i) => (i + delta + count) % count), [count]);
  const label = `${index + 1} / ${count}`;

  // Lightbox: trava o scroll, Esc fecha, setas navegam.
  useEffect(() => {
    if (!full) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFull(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [full, go]);

  return (
    <div className="flex min-w-0 flex-col gap-2.5">
      <ViewTransition name={transitionName} share="morph" default="none">
        <div className="relative aspect-4/3 overflow-hidden rounded-[10px] border border-white/8 bg-surface-2">
          <Slide item={items[index]} alt={alt} sizes="(min-width: 1240px) 600px, (min-width: 760px) 50vw, 100vw" preload />
          {selo && (
            <span className="absolute left-3.5 top-3.5 rounded bg-primary px-2.5 py-[5px] text-xs font-bold uppercase">
              {selo}
            </span>
          )}
          <button
            type="button"
            title="Tela cheia"
            aria-label="Ver em tela cheia"
            onClick={() => setFull(true)}
            className={cn(overlayBtn, "absolute right-3 top-3 size-10 rounded-md")}
          >
            <Maximize2 className="size-[18px]" />
          </button>
          <button
            type="button"
            aria-label="Foto anterior"
            onClick={() => go(-1)}
            className={cn(overlayBtn, "absolute left-3 top-1/2 size-11 -translate-y-1/2 rounded-full")}
          >
            <ChevronLeft className="size-[22px]" />
          </button>
          <button
            type="button"
            aria-label="Próxima foto"
            onClick={() => go(1)}
            className={cn(overlayBtn, "absolute right-3 top-1/2 size-11 -translate-y-1/2 rounded-full")}
          >
            <ChevronRight className="size-[22px]" />
          </button>
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-[rgba(10,10,11,0.75)] px-2.5 py-1 text-xs">
            <Camera className="size-[13px]" />
            {label}
          </span>
        </div>
      </ViewTransition>

      <div className="grid grid-cols-5 gap-2">
        {items.map((item, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Foto ${i + 1}`}
            aria-current={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "relative aspect-4/3 overflow-hidden rounded-md border-2 bg-surface-2 transition-[opacity,border-color] duration-200 hover:opacity-100",
              i === index ? "border-primary opacity-100" : "border-transparent opacity-60",
            )}
          >
            <Slide item={item} alt="" sizes="120px" stripe={6} label="text-[9px]" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {full && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Fotos: ${alt}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-[rgba(5,5,6,0.96)] p-6"
          >
            <button
              ref={closeRef}
              type="button"
              aria-label="Fechar"
              onClick={() => setFull(false)}
              className={cn(lightboxBtn, "absolute right-[18px] top-[18px] size-[46px] hover:border-primary hover:bg-primary")}
            >
              <X className="size-[22px]" />
            </button>
            <motion.div
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative aspect-4/3 max-h-[78vh] w-[min(1100px,100%)] overflow-hidden rounded-lg bg-surface-2"
            >
              <Slide item={items[index]} alt={alt} sizes="1100px" fit="contain" label="text-[13px]" />
            </motion.div>
            <div className="flex items-center gap-4">
              <button type="button" aria-label="Foto anterior" onClick={() => go(-1)} className={lightboxBtn}>
                <ChevronLeft className="size-4" />
              </button>
              <span className="text-sm text-soft">{label}</span>
              <button type="button" aria-label="Próxima foto" onClick={() => go(1)} className={lightboxBtn}>
                <ChevronRight className="size-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

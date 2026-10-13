"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * Exceção ao design (pedido do cliente): atalho fixo para o WhatsApp, com a
 * cor, o raio e a sombra do botão primário. Páginas com barra fixa no rodapé
 * sobem o botão com a variável --float-offset.
 */
export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a gente no WhatsApp"
      style={{ viewTransitionName: "whatsapp-float" }}
      className="group fixed bottom-[calc(var(--float-offset,0px)+20px)] right-5 z-40 inline-flex size-14 items-center justify-center rounded-md bg-primary text-white shadow-[0_10px_24px_-8px_rgba(229,22,29,0.7)] transition-colors hover:bg-primary-hover hover:text-white md:bottom-6 md:right-6"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-md bg-primary opacity-60 motion-safe:animate-ping [animation-duration:2.5s]"
      />
      <WhatsAppIcon className="relative size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md border border-white/8 bg-surface-2 px-3 py-1.5 text-[13px] font-semibold text-white opacity-0 shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-opacity group-hover:opacity-100 md:block">
        Fale no WhatsApp
      </span>
    </motion.a>
  );
}

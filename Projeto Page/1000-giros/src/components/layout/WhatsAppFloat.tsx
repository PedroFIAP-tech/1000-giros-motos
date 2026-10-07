"use client";

import { motion } from "motion/react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a gente no WhatsApp"
      style={{ viewTransitionName: "whatsapp-float" }}
      className="group fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/50 sm:bottom-6 sm:right-6 sm:size-16"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-whatsapp opacity-60 motion-safe:animate-ping [animation-duration:2.5s]"
      />
      <WhatsAppIcon className="relative size-7 sm:size-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-black opacity-0 shadow-lg transition-opacity group-hover:opacity-100 sm:block">
        Fale no WhatsApp
      </span>
    </motion.a>
  );
}

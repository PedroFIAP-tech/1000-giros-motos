"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "./icons";
import { Button } from "./Button";

/** Check com anéis pulsando, título, texto, botão do WhatsApp e "enviar outra". */
export function SuccessState({
  title,
  children,
  whatsappHref,
  ctaLabel = "Continuar no WhatsApp",
  resetLabel,
  onReset,
}: {
  title: ReactNode;
  children: ReactNode;
  whatsappHref: string;
  ctaLabel?: string;
  resetLabel: string;
  onReset: () => void;
}) {
  return (
    <div role="status" className="flex flex-col items-center gap-3.5 px-1 py-7 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className="relative flex size-[88px] items-center justify-center rounded-full bg-primary shadow-[0_0_0_10px_rgba(229,22,29,0.15),0_0_0_22px_rgba(229,22,29,0.06)]"
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/30 motion-safe:animate-ping [animation-duration:1.8s]"
        />
        <Check className="relative size-11 text-white" strokeWidth={2.5} />
      </motion.div>
      <h3 className="mt-3.5 font-title text-[clamp(32px,4vw,42px)] leading-none">{title}</h3>
      <p className="max-w-[380px] text-pretty text-[15px] leading-[1.55] text-soft">{children}</p>
      <Button
        href={whatsappHref}
        external
        className="mt-2 h-[52px] gap-2.5 px-6 text-lg hover:translate-y-0 hover:shadow-none"
      >
        <WhatsAppIcon className="size-5" />
        {ctaLabel}
      </Button>
      <button type="button" onClick={onReset} className="text-[13px] text-muted underline">
        {resetLabel}
      </button>
    </div>
  );
}

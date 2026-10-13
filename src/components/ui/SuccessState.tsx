"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
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
  compact = false,
}: {
  title: ReactNode;
  children: ReactNode;
  whatsappHref: string;
  ctaLabel?: string;
  resetLabel: string;
  onReset: () => void;
  /** Versão do formulário de contato: um anel só e textos um pouco menores. */
  compact?: boolean;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center gap-3.5 text-center",
        compact ? "h-full min-h-[380px] justify-center" : "px-1 py-7",
      )}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 18 }}
        className={cn(
          "relative flex items-center justify-center rounded-full bg-primary",
          compact
            ? "size-[84px] shadow-[0_0_0_10px_rgba(229,22,29,0.15)]"
            : "size-[88px] shadow-[0_0_0_10px_rgba(229,22,29,0.15),0_0_0_22px_rgba(229,22,29,0.06)]",
        )}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full bg-primary/30 motion-safe:animate-ping [animation-duration:1.8s]"
        />
        <Check className={cn("relative text-white", compact ? "size-10" : "size-11")} strokeWidth={2.5} />
      </motion.div>
      <h3 className={cn("font-title leading-none", compact ? "mt-3 text-[38px]" : "mt-3.5 text-[clamp(32px,4vw,42px)]")}>
        {title}
      </h3>
      <p
        className={cn(
          "text-pretty text-[15px] text-soft",
          compact ? "max-w-[340px] leading-normal" : "max-w-[380px] leading-[1.55]",
        )}
      >
        {children}
      </p>
      <Button
        href={whatsappHref}
        external
        className={cn(
          "gap-2.5 hover:translate-y-0 hover:shadow-none",
          compact ? "h-[50px] px-[22px] text-[17px]" : "mt-2 h-[52px] px-6 text-lg",
        )}
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

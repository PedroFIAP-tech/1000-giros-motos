"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

/** Compartilha pelo menu nativo; sem ele, copia o link. */
export function ShareButton({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        // Cancelado pelo usuário.
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Sem permissão de área de transferência.
    }
  }

  return (
    <button
      type="button"
      title={copied ? "Link copiado" : "Compartilhar"}
      aria-label={copied ? "Link copiado" : "Compartilhar"}
      onClick={share}
      className="flex size-[50px] items-center justify-center rounded-md border-[1.5px] border-white/20 bg-transparent text-white transition-colors hover:border-primary"
    >
      {copied ? <Check className="size-5 text-success" /> : <Share2 className="size-5" />}
    </button>
  );
}

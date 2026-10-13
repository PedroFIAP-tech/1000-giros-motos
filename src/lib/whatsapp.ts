import { siteConfig } from "./config";

/** Monta o link do WhatsApp da loja, opcionalmente com uma mensagem pronta. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/**
 * Mensagem pronta a partir de um formulário: "Olá! Quero X. Nome: Y, Moto: Z".
 * Campos vazios ficam de fora.
 */
export function formMessage(intro: string, fields: Record<string, string | undefined>) {
  const details = Object.entries(fields)
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `${label}: ${value!.trim()}`)
    .join(", ");
  return details ? `${intro} ${details}.` : intro;
}

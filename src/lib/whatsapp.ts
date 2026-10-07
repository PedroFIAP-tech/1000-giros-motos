import { siteConfig } from "./config";

/** Monta o link do WhatsApp da loja, opcionalmente com uma mensagem pronta. */
export function whatsappLink(message: string = siteConfig.whatsapp.defaultMessage) {
  return `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

import { Gauge, Handshake, Landmark, ShieldCheck, type LucideIcon } from "lucide-react";

export type NavLink = {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
};

export type NavItem = NavLink & {
  /** Quando presente, o item vira um dropdown (desktop) / acordeão (mobile). */
  children?: NavLink[];
};

export const servicesNav: NavLink[] = [
  {
    label: "Financiamento",
    icon: Landmark,
    href: "/servicos/financiamento",
    description: "Facilitamos a compra da sua moto.",
  },
  {
    label: "Seguro",
    icon: ShieldCheck,
    href: "/servicos/seguro",
    description: "Mais segurança para você e sua moto.",
  },
  {
    label: "Consignação",
    icon: Handshake,
    href: "/servicos/consignacao",
    description: "Venda sua moto com a gente.",
  },
  {
    label: "Avaliação",
    icon: Gauge,
    href: "/servicos/avaliacao",
    description: "Seu usado na troca com a melhor avaliação.",
  },
];

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Estoque", href: "/estoque" },
  { label: "Serviços", href: "/servicos", children: servicesNav },
  { label: "Contato", href: "/contato" },
];

/** Rodapé: "Serviços" aponta para o primeiro serviço (não existe /servicos). */
export const footerNav: NavLink[] = [
  ...mainNav.map((item) => (item.children ? { label: item.label, href: item.children[0].href } : item)),
  { label: "Favoritos", href: "/favoritos" },
];

/** "/" só é ativo na home; os demais também ficam ativos nas sub-rotas. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

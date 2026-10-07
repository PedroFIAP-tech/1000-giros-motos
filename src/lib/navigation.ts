export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  /** Quando presente, o item vira um dropdown (desktop) / acordeão (mobile). */
  children?: NavLink[];
};

export const servicesNav: NavLink[] = [
  {
    label: "Financiamento",
    href: "/servicos/financiamento",
    description: "Facilitamos a compra da sua moto.",
  },
  {
    label: "Seguro",
    href: "/servicos/seguro",
    description: "Mais segurança para você e sua moto.",
  },
  {
    label: "Consignação",
    href: "/servicos/consignacao",
    description: "Venda sua moto com a gente.",
  },
  {
    label: "Avaliação",
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

/** "/" só é ativo na home; os demais também ficam ativos nas sub-rotas. */
export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

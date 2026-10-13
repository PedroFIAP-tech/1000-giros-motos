import { Eye, Flame, Handshake, ShieldCheck } from "lucide-react";

/** Conteúdo institucional (Sobre e home). Textos do Claude Design. */

export const numeros = [
  { valor: "+10", label: "anos de mercado" },
  { valor: "+500", label: "motos vendidas" },
  { valor: "98%", label: "clientes satisfeitos" },
  { valor: "120", label: "itens na vistoria" },
];

export const valores = [
  {
    icon: ShieldCheck,
    titulo: "Procedência",
    texto: "Histórico checado, documentação limpa e laudo cautelar em todas as motos.",
  },
  {
    icon: Eye,
    titulo: "Transparência",
    texto: "Preço claro, fotos reais e tudo o que a moto tem — e não tem — dito antes.",
  },
  {
    icon: Handshake,
    titulo: "Atendimento",
    texto: "Gente que entende de moto, do primeiro “oi” no WhatsApp ao pós-venda.",
  },
  {
    icon: Flame,
    titulo: "Paixão por motos",
    texto: "A gente pilota, cuida e escolhe cada moto como se fosse nossa.",
  },
];

export const depoimentos = [
  {
    nome: "Rafael Souza",
    iniciais: "RS",
    moto: "CB 500F",
    texto: "Fui atendido no WhatsApp num domingo e na segunda já estava com a moto. Tudo explicado, sem surpresa no documento.",
  },
  {
    nome: "Juliana Martins",
    iniciais: "JM",
    moto: "MT-03",
    texto: "Primeira moto e eu estava insegura. Me ajudaram a escolher, simular e ainda fizeram o seguro na hora.",
  },
  {
    nome: "Carlos Henrique",
    iniciais: "CH",
    moto: "XRE 300",
    texto: "Deixei minha antiga na troca com avaliação justa. Loja séria, moto impecável.",
  },
  {
    nome: "André Lima",
    iniciais: "AL",
    moto: "Z 400",
    texto: "Moto exatamente como nas fotos. Revisada, pneus novos e pós-venda que responde.",
  },
  {
    nome: "Patrícia Gomes",
    iniciais: "PG",
    moto: "CG 160 Titan",
    texto: "Financiei com entrada baixa e parcela que coube no bolso. Recomendo de olhos fechados.",
  },
  {
    nome: "Bruno Alves",
    iniciais: "BA",
    moto: "CB 500F",
    texto: "Vendi minha moto em consignação em 12 dias. Cuidaram de tudo.",
  },
];

/** Fotos que ainda faltam (placeholders do design em "Nosso espaço"). */
export const galeriaLoja = [
  "foto: fachada da loja",
  "foto: oficina / vistoria",
  "foto: entrega de moto",
  "foto: equipe",
];

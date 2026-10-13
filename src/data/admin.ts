import { motoNome, motos } from "./motos";

/**
 * Dados mockados do painel (só visual). Status e views das motos ficam aqui,
 * e não em motos.ts, para o site público continuar igual ao design.
 */

export type StatusMoto = "Disponível" | "Reservada" | "Vendida";
export type StatusLead = "Novo" | "Em atendimento" | "Finalizado";
export type OrigemLead = "Financiamento" | "Seguro" | "Consignação" | "Avaliação" | "Contato";

export const metricas = [
  { label: "Motos no estoque", valor: "32", icon: "bike", delta: "+3 esta semana", up: true },
  { label: "Vendidas no mês", valor: "11", icon: "vendidas", delta: "+22% vs set", up: true },
  { label: "Leads novos", valor: "27", icon: "leads", delta: "+8 hoje", up: true },
  { label: "Visualizações", valor: "4.812", icon: "views", delta: "−4% vs set", up: false },
] as const;

/** Leads por dia (últimos 14 dias). */
export const leadsPorDia = [6, 9, 5, 11, 8, 13, 7, 10, 14, 9, 12, 16, 11, 15];

export const origens: { label: OrigemLead; pct: number }[] = [
  { label: "Financiamento", pct: 38 },
  { label: "Contato", pct: 24 },
  { label: "Avaliação", pct: 17 },
  { label: "Consignação", pct: 12 },
  { label: "Seguro", pct: 9 },
];

const painel: { status: StatusMoto; views: number }[] = [
  { status: "Disponível", views: 412 },
  { status: "Reservada", views: 388 },
  { status: "Disponível", views: 301 },
  { status: "Disponível", views: 276 },
  { status: "Vendida", views: 198 },
  { status: "Disponível", views: 164 },
  { status: "Reservada", views: 143 },
];

export type MotoAdmin = {
  id: string;
  nome: string;
  marca: string;
  ano: number;
  km: number;
  preco: number;
  imagem: string;
  placa: string;
  views: number;
  status: StatusMoto;
};

export const motosAdmin: MotoAdmin[] = painel.map(({ status, views }, i) => {
  const m = motos[i];
  return {
    id: m.slug,
    nome: motoNome(m),
    marca: m.marca,
    ano: m.ano,
    km: m.km,
    preco: m.preco,
    imagem: m.imagem,
    placa: m.finalPlaca,
    views,
    status,
  };
});

export type Lead = {
  id: string;
  nome: string;
  iniciais: string;
  telefone: string;
  origem: OrigemLead;
  assunto: string;
  quando: string;
  status: StatusLead;
};

export const leads: Lead[] = [
  { id: "l1", nome: "Rafael Souza", iniciais: "RS", telefone: "(11) 98812-4410", origem: "Financiamento", assunto: "Honda CB 500F", quando: "há 12 min", status: "Novo" },
  { id: "l2", nome: "Juliana Martins", iniciais: "JM", telefone: "(11) 97321-0098", origem: "Seguro", assunto: "Yamaha MT-03", quando: "há 40 min", status: "Novo" },
  { id: "l3", nome: "Carlos Henrique", iniciais: "CH", telefone: "(11) 96655-7741", origem: "Avaliação", assunto: "Fazer 250 2019", quando: "há 2 h", status: "Em atendimento" },
  { id: "l4", nome: "Patrícia Gomes", iniciais: "PG", telefone: "(11) 99102-3365", origem: "Consignação", assunto: "Kawasaki Z 300 2018", quando: "há 3 h", status: "Novo" },
  { id: "l5", nome: "André Lima", iniciais: "AL", telefone: "(11) 98440-1120", origem: "Contato", assunto: "Dúvida sobre visita", quando: "ontem", status: "Em atendimento" },
  { id: "l6", nome: "Bruno Alves", iniciais: "BA", telefone: "(11) 97788-5521", origem: "Financiamento", assunto: "Honda XRE 300", quando: "ontem", status: "Finalizado" },
  { id: "l7", nome: "Fernanda Rocha", iniciais: "FR", telefone: "(11) 96012-8874", origem: "Avaliação", assunto: "CB 300F 2016", quando: "2 dias", status: "Finalizado" },
];

export const leadsNovos = leads.filter((l) => l.status === "Novo").length;

export const opcionaisCadastro = [
  "Freios ABS",
  "Painel digital",
  "Farol LED",
  "Manual e chave reserva",
  "Protetor de motor",
  "Baú",
  "Único dono",
  "Garantia",
];

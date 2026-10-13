import {
  BadgePercent,
  Banknote,
  CalendarRange,
  ChartLine,
  ClipboardCheck,
  FileText,
  Gauge,
  Handshake,
  Landmark,
  Lock,
  Megaphone,
  Percent,
  Repeat,
  Scale,
  Shield,
  ShieldCheck,
  Siren,
  Store,
  Wallet,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** Conteúdo das 4 páginas de serviço (template único do Claude Design). */

export type ServicoKey = "financiamento" | "seguro" | "consignacao" | "avaliacao";

export type Mask = "cpf" | "phone" | "money" | "cep" | "km";

export type Campo = {
  name: string;
  label: string;
  type: "text" | "select" | "file";
  placeholder?: string;
  options?: string[];
  /** Ocupa a linha inteira. */
  full?: boolean;
  mask?: Mask;
  required?: boolean;
  /** Opções vêm do estoque (moto de interesse). */
  fromStock?: boolean;
};

export type Servico = {
  key: ServicoKey;
  nome: string;
  icon: LucideIcon;
  pre: string;
  hl: string;
  sub: string;
  cta: string;
  formT: string;
  formHl: string;
  ok: string;
  /** Abertura da mensagem do WhatsApp gerada pelo formulário. */
  intro: string;
  passos: { titulo: string; texto: string }[];
  vantagens: { icon: LucideIcon; titulo: string; texto: string }[];
  campos: Campo[];
  faq: { pergunta: string; resposta: string }[];
};

const marcas = ["Honda", "Yamaha", "Kawasaki", "Suzuki", "BMW", "Triumph", "Outra"];
const anos = ["2025", "2024", "2023", "2022", "2021", "2020", "2019 ou anterior"];

const nome: Campo = { name: "nome", label: "Nome completo", type: "text", placeholder: "Seu nome", full: true, required: true };
const telefone: Campo = {
  name: "telefone",
  label: "Telefone / WhatsApp",
  type: "text",
  placeholder: "(11) 90000-0000",
  mask: "phone",
  required: true,
};
const fotos: Campo = { name: "fotos", label: "Fotos da moto", type: "file", full: true };

export const servicos: Record<ServicoKey, Servico> = {
  financiamento: {
    key: "financiamento",
    nome: "Financiamento",
    icon: Landmark,
    pre: "Financie sua moto",
    hl: "sem complicação",
    sub: "Simulação em minutos com os principais bancos. Entrada facilitada e parcelas que cabem no seu bolso.",
    cta: "Simular financiamento",
    formT: "Simule seu",
    formHl: "financiamento",
    ok: "Recebemos seus dados e já estamos consultando as melhores taxas para você.",
    intro: "Olá! Quero simular financiamento.",
    passos: [
      { titulo: "Escolha a moto", texto: "Encontre no estoque ou conte qual moto você procura." },
      { titulo: "Envie seus dados", texto: "Preencha o formulário com renda e entrada desejada." },
      { titulo: "Receba as propostas", texto: "Comparamos bancos e trazemos a melhor taxa." },
      { titulo: "Saia pilotando", texto: "Aprovou? Assina e sai com a moto no mesmo dia." },
    ],
    vantagens: [
      { icon: Percent, titulo: "Taxas competitivas", texto: "Trabalhamos com vários bancos parceiros." },
      { icon: Zap, titulo: "Aprovação rápida", texto: "Resposta de crédito no mesmo dia." },
      { icon: Wallet, titulo: "Entrada flexível", texto: "A partir de 0% para perfis aprovados." },
      { icon: CalendarRange, titulo: "Até 48x", texto: "Escolha o prazo ideal para você." },
    ],
    campos: [
      nome,
      { name: "cpf", label: "CPF", type: "text", placeholder: "000.000.000-00", mask: "cpf" },
      telefone,
      { name: "renda", label: "Renda mensal", type: "text", placeholder: "R$ 0,00", mask: "money" },
      { name: "moto", label: "Moto de interesse", type: "select", fromStock: true },
      { name: "entrada", label: "Valor de entrada", type: "text", placeholder: "R$ 0,00", mask: "money", full: true },
    ],
    faq: [
      {
        pergunta: "Posso financiar com nome restrito?",
        resposta: "Analisamos cada caso. Alguns bancos parceiros aceitam perfis com restrição, mediante entrada maior.",
      },
      {
        pergunta: "Qual é a entrada mínima?",
        resposta: "Depende do perfil de crédito. Há aprovações com entrada a partir de 0%.",
      },
      {
        pergunta: "Posso usar minha moto como entrada?",
        resposta: "Sim! Avaliamos sua moto e o valor entra direto no financiamento.",
      },
      { pergunta: "Quanto tempo leva a aprovação?", resposta: "Normalmente sai no mesmo dia, em poucas horas." },
      { pergunta: "Quais documentos preciso?", resposta: "RG, CPF, comprovante de residência e de renda." },
    ],
  },
  seguro: {
    key: "seguro",
    nome: "Seguro",
    icon: ShieldCheck,
    pre: "Seguro para rodar",
    hl: "tranquilo",
    sub: "Cotação com as principais seguradoras em poucos minutos. Proteção contra roubo, furto e colisão.",
    cta: "Cotar seguro",
    formT: "Faça sua",
    formHl: "cotação",
    ok: "Sua cotação está sendo preparada com as seguradoras parceiras.",
    intro: "Olá! Quero cotar seguro para minha moto.",
    passos: [
      { titulo: "Conte sobre a moto", texto: "Modelo, ano e onde ela dorme." },
      { titulo: "Cotamos para você", texto: "Comparamos várias seguradoras." },
      { titulo: "Escolha o plano", texto: "Cobertura e franquia do seu jeito." },
      { titulo: "Moto protegida", texto: "Apólice emitida e assistência 24h." },
    ],
    vantagens: [
      { icon: Scale, titulo: "Comparação real", texto: "Várias seguradoras numa só cotação." },
      { icon: Siren, titulo: "Assistência 24h", texto: "Guincho e socorro onde você estiver." },
      { icon: Lock, titulo: "Roubo e furto", texto: "Cobertura completa para a sua moto." },
      { icon: BadgePercent, titulo: "Desconto", texto: "Condições especiais para clientes da loja." },
    ],
    campos: [
      nome,
      telefone,
      { name: "cep", label: "CEP de pernoite", type: "text", placeholder: "00000-000", mask: "cep", required: true },
      { name: "moto", label: "Moto", type: "text", placeholder: "Ex: Honda CB 500F", required: true },
      { name: "ano", label: "Ano", type: "select", options: anos },
    ],
    faq: [
      { pergunta: "A cotação tem custo?", resposta: "Não. A cotação é gratuita e sem compromisso." },
      { pergunta: "Preciso ter comprado a moto aqui?", resposta: "Não, cotamos seguro para qualquer moto." },
      { pergunta: "O CEP muda o valor?", resposta: "Sim, o local de pernoite influencia bastante no preço." },
      { pergunta: "Quanto tempo para a apólice?", resposta: "Em geral de 1 a 3 dias úteis após a vistoria." },
      {
        pergunta: "Tem cobertura para terceiros?",
        resposta: "Sim, é possível incluir danos materiais e corporais a terceiros.",
      },
    ],
  },
  consignacao: {
    key: "consignacao",
    nome: "Consignação",
    icon: Handshake,
    pre: "Venda sua moto",
    hl: "com a gente",
    sub: "Sua moto exposta no nosso salão e nos nossos canais. Cuidamos do anúncio, das visitas e da papelada.",
    cta: "Quero consignar",
    formT: "Consigne sua",
    formHl: "moto",
    ok: "Recebemos os dados da sua moto e vamos retornar com a proposta de consignação.",
    intro: "Olá! Quero consignar minha moto.",
    passos: [
      { titulo: "Envie os dados", texto: "Fotos e informações da sua moto." },
      { titulo: "Avaliação e preço", texto: "Definimos juntos o valor de venda." },
      { titulo: "Exposição", texto: "Fotos profissionais, salão e redes sociais." },
      { titulo: "Venda e repasse", texto: "Vendeu, você recebe com segurança." },
    ],
    vantagens: [
      { icon: Store, titulo: "Salão físico", texto: "Moto exposta para quem visita a loja." },
      { icon: Megaphone, titulo: "Divulgação", texto: "Anúncios nos principais portais e redes." },
      { icon: FileText, titulo: "Sem burocracia", texto: "Cuidamos de toda a documentação." },
      { icon: Shield, titulo: "Segurança", texto: "Nada de estranhos na sua casa." },
    ],
    campos: [
      nome,
      telefone,
      { name: "marca", label: "Marca", type: "select", options: marcas, required: true },
      { name: "modelo", label: "Modelo", type: "text", placeholder: "Ex: CB 500F", required: true },
      { name: "ano", label: "Ano", type: "select", options: anos },
      { name: "km", label: "Quilometragem", type: "text", placeholder: "Ex: 12.000", mask: "km" },
      { name: "valor", label: "Valor pretendido", type: "text", placeholder: "R$ 0,00", mask: "money" },
      fotos,
    ],
    faq: [
      { pergunta: "Quanto custa consignar?", resposta: "Cobramos uma comissão apenas quando a moto é vendida." },
      { pergunta: "A moto fica na loja?", resposta: "Sim, ela fica exposta no salão com segurança." },
      {
        pergunta: "Em quanto tempo vende?",
        resposta: "A média é de 15 a 30 dias, dependendo do modelo e preço.",
      },
      { pergunta: "Posso retirar a moto?", resposta: "Pode, a qualquer momento, sem multa." },
      {
        pergunta: "Vocês aceitam moto financiada?",
        resposta: "Sim, fazemos a quitação junto ao banco na venda.",
      },
    ],
  },
  avaliacao: {
    key: "avaliacao",
    nome: "Avaliação",
    icon: Gauge,
    pre: "Avaliação justa",
    hl: "da sua moto",
    sub: "Use sua moto como entrada ou venda direto para a gente. Avaliação transparente com base no mercado.",
    cta: "Avaliar minha moto",
    formT: "Avalie sua",
    formHl: "moto",
    ok: "Nossa equipe já está analisando as fotos e informações da sua moto.",
    intro: "Olá! Quero avaliar minha moto.",
    passos: [
      { titulo: "Envie fotos e dados", texto: "Quanto mais detalhes, mais precisa a avaliação." },
      { titulo: "Pré-avaliação", texto: "Resposta com faixa de valor em até 1h útil." },
      { titulo: "Vistoria na loja", texto: "Confirmamos o estado da moto pessoalmente." },
      { titulo: "Proposta final", texto: "Pagamento à vista ou como entrada na troca." },
    ],
    vantagens: [
      { icon: ChartLine, titulo: "Preço de mercado", texto: "Base FIPE e histórico de vendas reais." },
      { icon: Repeat, titulo: "Troca facilitada", texto: "Use o valor como entrada em outra moto." },
      { icon: Banknote, titulo: "Pagamento rápido", texto: "Venda direta com pagamento à vista." },
      { icon: ClipboardCheck, titulo: "Laudo completo", texto: "Vistoria detalhada e explicada." },
    ],
    campos: [
      nome,
      telefone,
      { name: "marca", label: "Marca", type: "select", options: marcas, required: true },
      { name: "modelo", label: "Modelo", type: "text", placeholder: "Ex: MT-03", required: true },
      { name: "ano", label: "Ano", type: "select", options: anos },
      { name: "km", label: "Quilometragem", type: "text", placeholder: "Ex: 12.000", mask: "km" },
      {
        name: "estado",
        label: "Estado da moto",
        type: "select",
        full: true,
        options: ["Excelente — sem detalhes", "Bom — pequenos detalhes", "Regular — precisa de reparos"],
      },
      fotos,
    ],
    faq: [
      { pergunta: "A avaliação é gratuita?", resposta: "Sim, sem custo e sem compromisso." },
      {
        pergunta: "Como o valor é calculado?",
        resposta: "Consideramos tabela FIPE, estado, km e demanda do modelo.",
      },
      {
        pergunta: "Preciso levar a moto na loja?",
        resposta: "A pré-avaliação é online; a final é feita na loja.",
      },
      { pergunta: "Aceitam moto com multa?", resposta: "Sim, os débitos são descontados do valor." },
      {
        pergunta: "Posso trocar por uma moto mais barata?",
        resposta: "Pode, e a diferença é paga para você.",
      },
    ],
  },
};

export const servicoKeys = Object.keys(servicos) as ServicoKey[];

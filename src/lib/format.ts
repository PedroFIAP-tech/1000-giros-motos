const number = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });

/** 8200 → "8.200" */
export function formatNumber(value: number) {
  return number.format(Math.round(value));
}

/** 37900 → "R$ 37.900" */
export function formatPrice(value: number) {
  return `R$ ${formatNumber(value)}`;
}

/** Parcela pela tabela Price: valor financiado, taxa ao mês e número de parcelas. */
export function installment(principal: number, monthlyRate: number, months: number) {
  if (principal <= 0) return 0;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

/** Taxa usada nas simulações do site (1,89% a.m., como no design). */
export const FINANCE_RATE = 0.0189;

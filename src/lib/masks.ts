import type { Mask } from "@/data/servicos";

const digits = (v: string) => v.replace(/\D/g, "");

/** Máscaras simples de digitação (CPF, telefone, CEP, dinheiro e km). */
export function applyMask(mask: Mask | undefined, value: string) {
  if (!mask) return value;
  const d = digits(value);
  switch (mask) {
    case "cpf":
      return d
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    case "phone": {
      const p = d.slice(0, 11);
      if (p.length <= 2) return p ? `(${p}` : "";
      if (p.length <= 6) return `(${p.slice(0, 2)}) ${p.slice(2)}`;
      if (p.length <= 10) return `(${p.slice(0, 2)}) ${p.slice(2, 6)}-${p.slice(6)}`;
      return `(${p.slice(0, 2)}) ${p.slice(2, 7)}-${p.slice(7)}`;
    }
    case "cep":
      return d.slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
    case "money": {
      if (!d) return "";
      const n = Number(d.slice(0, 11)) / 100;
      return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }).replace(/ /g, " ");
    }
    case "km":
      return d ? Number(d.slice(0, 7)).toLocaleString("pt-BR") : "";
  }
}

/** Mensagem de erro do campo, ou null se estiver ok. */
export function validate(mask: Mask | undefined, value: string, required = false): string | null {
  const v = value.trim();
  if (!v) return required ? "Campo obrigatório" : null;
  const d = digits(v);
  if (mask === "cpf" && d.length !== 11) return "CPF incompleto";
  if (mask === "phone" && d.length < 10) return "Telefone incompleto";
  if (mask === "cep" && d.length !== 8) return "CEP incompleto";
  if (!mask && required && v.length < 2) return "Campo obrigatório";
  return null;
}

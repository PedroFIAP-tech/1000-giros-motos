import { faixasCilindrada, type Moto, type MotoTipo } from "@/data/motos";

/** Filtros da página de estoque. Também são lidos da URL (busca da home). */
export type Filters = {
  marcas: string[];
  modelo: string;
  de: number;
  ate: number;
  precoMin: number;
  preco: number;
  km: number;
  cils: string[];
  tipos: MotoTipo[];
};

export type Ordem = "recentes" | "menor-preco" | "maior-preco" | "menor-km";

export const ordens: { value: Ordem; label: string }[] = [
  { value: "recentes", label: "Ordenar: Mais novas" },
  { value: "menor-preco", label: "Menor preço" },
  { value: "maior-preco", label: "Maior preço" },
  { value: "menor-km", label: "Menor km" },
];

export const PRECO = { min: 10000, max: 80000, step: 1000 };
export const KM = { min: 0, max: 60000, step: 1000 };
export const ANOS = { min: 2018, max: 2025 };
export const POR_PAGINA = 9;

export const defaultFilters: Filters = {
  marcas: [],
  modelo: "",
  de: ANOS.min,
  ate: ANOS.max,
  precoMin: 0,
  preco: PRECO.max,
  km: KM.max,
  cils: [],
  tipos: [],
};

export function anos(motos: Moto[]) {
  const min = Math.min(ANOS.min, ...motos.map((m) => m.ano));
  const max = Math.max(ANOS.max, ...motos.map((m) => m.ano));
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
}

export function modelos(motos: Moto[]) {
  return [...new Set(motos.map((m) => m.modelo))];
}

export function filterMotos(motos: Moto[], f: Filters) {
  const faixas = faixasCilindrada.filter((c) => f.cils.includes(c.label));
  return motos.filter(
    (m) =>
      m.status === "disponivel" &&
      (f.marcas.length === 0 || f.marcas.includes(m.marca)) &&
      (!f.modelo || m.modelo === f.modelo) &&
      m.ano >= f.de &&
      m.ano <= f.ate &&
      m.preco >= f.precoMin &&
      (f.preco >= PRECO.max || m.preco <= f.preco) &&
      (f.km >= KM.max || m.km <= f.km) &&
      (faixas.length === 0 || faixas.some((c) => m.cilindrada >= c.min && m.cilindrada <= c.max)) &&
      (f.tipos.length === 0 || f.tipos.includes(m.tipo)),
  );
}

export function sortMotos(motos: Moto[], ordem: Ordem) {
  const sorted = [...motos];
  switch (ordem) {
    case "menor-preco":
      return sorted.sort((a, b) => a.preco - b.preco);
    case "maior-preco":
      return sorted.sort((a, b) => b.preco - a.preco);
    case "menor-km":
      return sorted.sort((a, b) => a.km - b.km);
    default:
      return sorted.sort((a, b) => b.chegada.localeCompare(a.chegada));
  }
}

/* ---------- URL ---------- */

const list = (v: string | null) => (v ? v.split(",").filter(Boolean) : []);
const num = (v: string | null, fallback: number) => {
  const n = Number(v);
  return v && Number.isFinite(n) ? n : fallback;
};

export function filtersFromParams(params: URLSearchParams): Filters {
  return {
    marcas: list(params.get("marca")),
    modelo: params.get("modelo") ?? "",
    de: num(params.get("de"), defaultFilters.de),
    ate: num(params.get("ate"), defaultFilters.ate),
    precoMin: num(params.get("precoMin"), defaultFilters.precoMin),
    preco: num(params.get("preco"), defaultFilters.preco),
    km: num(params.get("km"), defaultFilters.km),
    cils: list(params.get("cil")),
    tipos: list(params.get("tipo")) as MotoTipo[],
  };
}

export function ordemFromParams(params: URLSearchParams): Ordem {
  const v = params.get("ordem");
  return ordens.some((o) => o.value === v) ? (v as Ordem) : "recentes";
}

/** Só grava na URL o que difere do padrão. */
export function filtersToQuery(f: Filters, ordem: Ordem) {
  const p = new URLSearchParams();
  if (f.marcas.length) p.set("marca", f.marcas.join(","));
  if (f.modelo) p.set("modelo", f.modelo);
  if (f.de !== defaultFilters.de) p.set("de", String(f.de));
  if (f.ate !== defaultFilters.ate) p.set("ate", String(f.ate));
  if (f.precoMin !== defaultFilters.precoMin) p.set("precoMin", String(f.precoMin));
  if (f.preco !== defaultFilters.preco) p.set("preco", String(f.preco));
  if (f.km !== defaultFilters.km) p.set("km", String(f.km));
  if (f.cils.length) p.set("cil", f.cils.join(","));
  if (f.tipos.length) p.set("tipo", f.tipos.join(","));
  if (ordem !== "recentes") p.set("ordem", ordem);
  return p.toString();
}

/** Texto dos filtros para a mensagem "Avise-me quando chegar". */
export function describeFilters(f: Filters) {
  return [
    ...f.marcas,
    f.modelo,
    ...f.tipos,
    ...f.cils,
    f.preco < PRECO.max ? `até R$ ${f.preco.toLocaleString("pt-BR")}` : "",
  ]
    .filter(Boolean)
    .join(", ");
}

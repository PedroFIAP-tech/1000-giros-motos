"use client";

import { useSearchParams } from "next/navigation";
import type { Moto } from "@/data/motos";
import { filtersFromParams, ordemFromParams } from "@/lib/estoque";
import { EstoqueView } from "./EstoqueView";

/** Lê os filtros da URL (ex.: busca da home) e monta o estoque com eles. */
export function EstoqueFromUrl({ motos }: { motos: Moto[] }) {
  const params = useSearchParams();
  return (
    <EstoqueView
      motos={motos}
      initialFilters={filtersFromParams(params)}
      initialOrdem={ordemFromParams(params)}
    />
  );
}

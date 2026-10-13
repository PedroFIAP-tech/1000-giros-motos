"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { marcas, type Moto } from "@/data/motos";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { anos, defaultFilters, filtersToQuery, modelos } from "@/lib/estoque";
import { formatNumber } from "@/lib/format";

const precosDe = [10000, 15000, 20000, 25000, 30000, 40000];
const precosAte = [20000, 25000, 30000, 35000, 40000, 50000, 80000];

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-semibold text-soft">{label}</span>
      {children}
    </label>
  );
}

/** "Encontre sua moto": leva para o estoque com os filtros na URL. */
export function SearchPanel({ motos }: { motos: Moto[] }) {
  const router = useRouter();
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [de, setDe] = useState("");
  const [ate, setAte] = useState("");

  const modelosDaMarca = modelos(marca ? motos.filter((m) => m.marca === marca) : motos);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const query = filtersToQuery(
      {
        ...defaultFilters,
        marcas: marca ? [marca] : [],
        modelo,
        de: ano ? +ano : defaultFilters.de,
        ate: ano ? +ano : defaultFilters.ate,
        precoMin: de ? +de : defaultFilters.precoMin,
        preco: ate ? +ate : defaultFilters.preco,
      },
      "recentes",
    );
    router.push(query ? `/estoque?${query}` : "/estoque");
  }

  return (
    <form
      onSubmit={buscar}
      role="search"
      className="grid gap-5 rounded-[10px] border border-white/10 bg-[rgba(18,18,21,0.92)] p-5 shadow-[0_20px_40px_rgba(0,0,0,0.5)] backdrop-blur-[8px] md:p-6 lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)_auto] lg:items-end"
    >
      <div className="flex items-center gap-4 self-center">
        <Search className="size-10 shrink-0 text-primary" strokeWidth={2.5} />
        <div>
          <p className="font-title text-2xl leading-[normal]">Encontre sua moto</p>
          <p className="text-xs text-muted">Use os filtros para encontrar a moto ideal para você.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Labeled label="Marca">
          <Select
            value={marca}
            onChange={(e) => {
              setMarca(e.target.value);
              setModelo("");
            }}
          >
            <option value="">Selecione</option>
            {marcas.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
        </Labeled>
        <Labeled label="Modelo">
          <Select value={modelo} onChange={(e) => setModelo(e.target.value)}>
            <option value="">Selecione</option>
            {modelosDaMarca.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </Select>
        </Labeled>
        <Labeled label="Ano">
          <Select value={ano} onChange={(e) => setAno(e.target.value)}>
            <option value="">Selecione</option>
            {[...anos(motos)].reverse().map((y) => (
              <option key={y}>{y}</option>
            ))}
          </Select>
        </Labeled>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className="text-xs font-semibold text-soft">Faixa de preço</span>
          <div className="grid grid-cols-2 gap-2">
            <Select aria-label="Preço mínimo" value={de} onChange={(e) => setDe(e.target.value)}>
              <option value="">De</option>
              {precosDe.map((p) => (
                <option key={p} value={p}>
                  R$ {formatNumber(p)}
                </option>
              ))}
            </Select>
            <Select aria-label="Preço máximo" value={ate} onChange={(e) => setAte(e.target.value)}>
              <option value="">Até</option>
              {precosAte.map((p) => (
                <option key={p} value={p}>
                  R$ {formatNumber(p)}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <Button type="submit" className="h-[50px] gap-2.5 px-7 text-[17px] hover:shadow-none">
        <Search className="size-[18px]" />
        Buscar
      </Button>
    </form>
  );
}

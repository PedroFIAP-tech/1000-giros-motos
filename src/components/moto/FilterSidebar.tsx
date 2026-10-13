"use client";

import { Search } from "lucide-react";
import { faixasCilindrada, marcas, tipos, type Moto } from "@/data/motos";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Chip } from "@/components/ui/Chip";
import { Hl } from "@/components/ui/SectionTitle";
import { Select } from "@/components/ui/Select";
import { anos, KM, modelos, PRECO, type Filters } from "@/lib/estoque";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

const groupLabel = "text-xs font-semibold uppercase tracking-[0.06em] text-muted";

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

type FilterSidebarProps = {
  motos: Moto[];
  filters: Filters;
  onChange: (filters: Filters) => void;
  onClear: () => void;
  onApply: () => void;
  className?: string;
};

export function FilterSidebar({ motos, filters, onChange, onClear, onApply, className }: FilterSidebarProps) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });
  const years = anos(motos);

  return (
    <aside
      aria-label="Filtros"
      className={cn("flex-col gap-[22px] rounded-lg border border-white/8 bg-surface p-5", className)}
    >
      <div className="flex items-center justify-between">
        <p className="font-title text-[22px] leading-[normal]">
          Filtrar <Hl>motos</Hl>
        </p>
        <button type="button" onClick={onClear} className="text-xs font-semibold uppercase text-primary">
          Limpar
        </button>
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className={cn(groupLabel, "mb-2.5")}>Marca</legend>
        {marcas.map((marca) => (
          <Checkbox
            key={marca}
            checked={filters.marcas.includes(marca)}
            onChange={() => set({ marcas: toggle(filters.marcas, marca) })}
            aside={motos.filter((m) => m.marca === marca && m.status === "disponivel").length}
          >
            {marca}
          </Checkbox>
        ))}
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className={groupLabel}>Modelo</span>
        <Select value={filters.modelo} onChange={(e) => set({ modelo: e.target.value })}>
          <option value="">Todos os modelos</option>
          {modelos(motos).map((modelo) => (
            <option key={modelo}>{modelo}</option>
          ))}
        </Select>
      </label>

      <div className="flex flex-col gap-2">
        <span className={groupLabel}>Ano</span>
        <div className="grid grid-cols-2 gap-2">
          <Select aria-label="Ano mínimo" value={filters.de} onChange={(e) => set({ de: +e.target.value })}>
            {years.map((y) => (
              <option key={y} value={y}>
                De {y}
              </option>
            ))}
          </Select>
          <Select aria-label="Ano máximo" value={filters.ate} onChange={(e) => set({ ate: +e.target.value })}>
            {[...years].reverse().map((y) => (
              <option key={y} value={y}>
                Até {y}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <label className="flex flex-col gap-2.5">
        <span className={cn(groupLabel, "flex justify-between")}>
          <span>Faixa de preço</span>
          <span className="normal-case tracking-normal text-white">até R$ {formatNumber(filters.preco)}</span>
        </span>
        <input
          type="range"
          min={PRECO.min}
          max={PRECO.max}
          step={PRECO.step}
          value={filters.preco}
          onChange={(e) => set({ preco: +e.target.value })}
          className="w-full"
        />
        <span className="flex justify-between text-[11px] text-dim">
          <span>R$ 10 mil</span>
          <span>R$ 80 mil</span>
        </span>
      </label>

      <label className="flex flex-col gap-2.5">
        <span className={cn(groupLabel, "flex justify-between")}>
          <span>Quilometragem</span>
          <span className="normal-case tracking-normal text-white">até {formatNumber(filters.km)} km</span>
        </span>
        <input
          type="range"
          min={KM.min}
          max={KM.max}
          step={KM.step}
          value={filters.km}
          onChange={(e) => set({ km: +e.target.value })}
          className="w-full"
        />
      </label>

      <fieldset className="flex flex-col">
        <legend className={cn(groupLabel, "mb-2.5")}>Cilindrada</legend>
        <div className="flex flex-wrap gap-1.5">
          {faixasCilindrada.map(({ label }) => (
            <Chip
              key={label}
              selected={filters.cils.includes(label)}
              onClick={() => set({ cils: toggle(filters.cils, label) })}
            >
              {label}
            </Chip>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col">
        <legend className={cn(groupLabel, "mb-2.5")}>Tipo</legend>
        <div className="flex flex-wrap gap-1.5">
          {tipos.map((tipo) => (
            <Chip
              key={tipo}
              selected={filters.tipos.includes(tipo)}
              onClick={() => set({ tipos: toggle(filters.tipos, tipo) })}
            >
              {tipo}
            </Chip>
          ))}
        </div>
      </fieldset>

      <Button onClick={onApply} className="h-[46px] hover:translate-y-0 hover:shadow-none">
        <Search className="size-[17px]" />
        Aplicar filtros
      </Button>
    </aside>
  );
}

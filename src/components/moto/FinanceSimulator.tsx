"use client";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Hl } from "@/components/ui/SectionTitle";
import { FINANCE_RATE, formatNumber, installment } from "@/lib/format";
import { cn } from "@/lib/utils";

export const PRAZOS = [12, 24, 36, 48] as const;
export type Prazo = (typeof PRAZOS)[number];

/** Entrada máxima do slider: R$ 30.000 (design) ou 80% do preço, o que for menor. */
export function maxEntrada(preco: number) {
  return Math.min(30000, Math.floor((preco * 0.8) / 500) * 500);
}

type FinanceSimulatorProps = {
  preco: number;
  entrada: number;
  prazo: Prazo;
  onEntradaChange: (value: number) => void;
  onPrazoChange: (value: Prazo) => void;
  id?: string;
  className?: string;
};

/** Slider de entrada, parcelas 12/24/36/48 e parcela estimada. */
export function FinanceSimulator({
  preco,
  entrada,
  prazo,
  onEntradaChange,
  onPrazoChange,
  id,
  className,
}: FinanceSimulatorProps) {
  const max = maxEntrada(preco);
  const parcela = installment(preco - entrada, FINANCE_RATE, prazo);

  return (
    <div
      id={id}
      className={cn(
        "flex flex-col gap-4 rounded-lg border border-primary/25 bg-[linear-gradient(160deg,#1a0a0c,#121215_55%)] p-5",
        className,
      )}
    >
      <p className="font-title text-2xl leading-[normal]">
        Simule sua <Hl>parcela</Hl>
      </p>

      <label className="flex flex-col gap-2">
        <span className="flex justify-between text-[13px] text-muted">
          <span>Entrada</span>
          <strong className="text-[15px] text-white">R$ {formatNumber(entrada)}</strong>
        </span>
        <input
          type="range"
          min={0}
          max={max}
          step={500}
          value={entrada}
          onChange={(e) => onEntradaChange(+e.target.value)}
          className="w-full"
        />
        <span className="flex justify-between text-[11px] text-dim">
          <span>R$ 0</span>
          <span>R$ {formatNumber(max)}</span>
        </span>
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] text-muted">Número de parcelas</span>
        <div className="grid grid-cols-4 gap-1.5" role="group" aria-label="Número de parcelas">
          {PRAZOS.map((n) => (
            <button
              key={n}
              type="button"
              aria-pressed={n === prazo}
              onClick={() => onPrazoChange(n)}
              className={cn(
                "h-10 rounded-md border font-bold text-white transition-colors",
                n === prazo ? "border-primary bg-primary" : "border-white/16 bg-transparent",
              )}
            >
              {n}x
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-between gap-2.5 border-t border-white/8 pt-3.5">
        <div>
          <p className="text-xs uppercase tracking-[0.06em] text-muted">Parcela estimada</p>
          <p className="font-display text-4xl font-extrabold leading-none text-white" aria-live="polite">
            {prazo}x R$ <AnimatedNumber value={parcela} format={formatNumber} />
          </p>
        </div>
        <span className="text-right text-[11px] text-dim">
          *Taxa 1,89% a.m.
          <br />
          sujeito a análise
        </span>
      </div>
    </div>
  );
}

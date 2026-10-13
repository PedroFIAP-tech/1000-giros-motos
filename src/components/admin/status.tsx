import { Gauge, Handshake, Landmark, Mail, ShieldCheck, type LucideIcon } from "lucide-react";
import type { OrigemLead, StatusLead, StatusMoto } from "@/data/admin";
import { cn } from "@/lib/utils";

type Status = StatusMoto | StatusLead;

/** Cor do texto/borda e do fundo de cada status (design: verde, âmbar, cinza, vermelho). */
export const statusTone: Record<Status, { text: string; bg: string; border: string }> = {
  Disponível: { text: "text-success", bg: "bg-success/12", border: "border-success" },
  Reservada: { text: "text-warning", bg: "bg-warning/12", border: "border-warning" },
  Vendida: { text: "text-muted", bg: "bg-white/7", border: "border-muted" },
  Novo: { text: "text-danger", bg: "bg-primary/14", border: "border-danger" },
  "Em atendimento": { text: "text-warning", bg: "bg-warning/12", border: "border-warning" },
  Finalizado: { text: "text-success", bg: "bg-success/12", border: "border-success" },
};

export const origemIcon: Record<OrigemLead, LucideIcon> = {
  Financiamento: Landmark,
  Seguro: ShieldCheck,
  Consignação: Handshake,
  Avaliação: Gauge,
  Contato: Mail,
};

export function StatusBadge({ status, dot = false }: { status: Status; dot?: boolean }) {
  const tone = statusTone[status];
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center gap-1.5 justify-self-start rounded-full px-2.5 text-xs font-semibold",
        tone.text,
        tone.bg,
      )}
    >
      {dot && <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />}
      {status}
    </span>
  );
}

export function OrigemChip({ origem }: { origem: OrigemLead }) {
  const Icon = origemIcon[origem];
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-full border border-white/12 px-2.5 text-xs text-soft">
      <Icon className="size-[13px] text-primary" />
      {origem}
    </span>
  );
}

export function Avatar({ iniciais, size = "size-9" }: { iniciais: string; size?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex shrink-0 items-center justify-center rounded-full bg-[#1f1f24] text-xs font-bold", size)}
    >
      {iniciais}
    </span>
  );
}

/** Filtro segmentado (Todas · Disponível · ...). */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { value: T; count: number }[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex max-w-full gap-1 overflow-x-auto rounded-lg border border-white/8 bg-surface p-[3px]"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
          className={cn(
            "h-8 flex-none rounded-md px-3 text-xs font-semibold text-white transition-colors",
            o.value === value ? "bg-primary" : "bg-transparent hover:bg-white/5",
          )}
        >
          {o.value} <span className="opacity-60">{o.count}</span>
        </button>
      ))}
    </div>
  );
}

import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/** Pílula selecionável (tipo, cilindrada, opcionais). */
export function Chip({
  selected,
  onClick,
  children,
  className,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-8 rounded-full border px-3 text-xs font-medium text-white transition-colors duration-200",
        selected ? "border-primary bg-primary" : "border-white/16 bg-transparent",
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Chip de filtro ativo, com X para remover. */
export function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="flex h-[30px] items-center gap-1.5 rounded border border-primary/35 bg-primary/12 px-2.5 text-xs">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remover filtro ${label}`}
        className="text-[#ff6b70]"
      >
        <X className="size-[13px]" />
      </button>
    </span>
  );
}

/** Selo com ícone (Revisada, Procedência garantida, IPVA pago). */
export function Seal({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) {
  return (
    <span className="flex h-8 items-center gap-1.5 rounded-full border border-primary/40 bg-primary/8 px-3 text-[13px]">
      <Icon className="size-3.5 text-primary" />
      {children}
    </span>
  );
}

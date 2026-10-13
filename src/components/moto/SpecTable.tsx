import type { LucideIcon } from "lucide-react";

export type Spec = { label: string; value: string; icon: LucideIcon };

/** Linhas zebradas com ícone, chave e valor (ficha técnica). */
export function SpecTable({ specs }: { specs: Spec[] }) {
  return (
    <dl className="overflow-hidden rounded-lg border border-white/8">
      {specs.map(({ label, value, icon: Icon }, i) => (
        <div
          key={label}
          className={i % 2 ? "grid grid-cols-[44%_1fr] bg-[#0f0f12] text-sm" : "grid grid-cols-[44%_1fr] bg-surface-2 text-sm"}
        >
          <dt className="flex items-center gap-2.5 px-4 py-3 text-muted">
            <Icon className="size-4 shrink-0 text-primary" />
            {label}
          </dt>
          <dd className="px-4 py-3 font-semibold">{value}</dd>
        </div>
      ))}
    </dl>
  );
}

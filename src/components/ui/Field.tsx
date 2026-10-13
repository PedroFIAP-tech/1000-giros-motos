import { CircleAlert } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Campos dos formulários: fundo escuro, foco com anel vermelho (150ms), erro em vermelho claro. */
export const fieldClasses = (error?: string | null) =>
  cn(
    "w-full rounded-md border bg-field text-sm text-white outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[#6b6b74] focus-visible:outline-none",
    error
      ? "border-danger focus:shadow-[0_0_0_3px_rgba(255,77,83,0.18)]"
      : "border-white/12 focus:border-primary focus:shadow-[0_0_0_3px_rgba(229,22,29,0.18)]",
  );

export function FieldLabel({ children }: { children: ReactNode }) {
  return <span className="text-xs font-semibold uppercase tracking-[0.04em] text-soft">{children}</span>;
}

export function FieldError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <span id={id} className="flex items-center gap-1.5 text-xs text-danger">
      <CircleAlert className="size-3.5" />
      {children}
    </span>
  );
}

type FieldProps = {
  label: string;
  error?: string | null;
  errorId: string;
  className?: string;
  children: ReactNode;
};

/** Label em caixa alta + controle + mensagem de erro. */
export function Field({ label, error, errorId, className, children }: FieldProps) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <FieldLabel>{label}</FieldLabel>
      {children}
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </label>
  );
}

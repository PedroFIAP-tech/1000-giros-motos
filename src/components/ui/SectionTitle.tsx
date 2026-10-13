import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Traço vermelho + texto em caixa alta, acima dos títulos. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.04em] text-primary",
        className,
      )}
    >
      <span aria-hidden="true" className="h-0.5 w-[26px] shrink-0 bg-primary" />
      {children}
    </p>
  );
}

/** Palavra em destaque (vermelha) dentro dos títulos. */
export function Hl({ children }: { children: ReactNode }) {
  return <span className="text-primary">{children}</span>;
}

/** Título grande das seções institucionais (Sobre, Serviços). */
export const titleLg = "mt-2.5 text-[clamp(34px,4.6vw,52px)] leading-[0.95]";

type SectionTitleProps = {
  eyebrow?: ReactNode;
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  /** Tamanho e margens do título (padrão: 36px, como nas seções do design). */
  titleClassName?: string;
  className?: string;
};

export function SectionTitle({
  eyebrow,
  children,
  as: Tag = "h2",
  titleClassName,
  className,
}: SectionTitleProps) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className={cn("mt-2 font-title text-4xl leading-none", titleClassName)}>{children}</Tag>
    </div>
  );
}

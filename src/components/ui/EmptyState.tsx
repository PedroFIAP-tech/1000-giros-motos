import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Ícone em anel, título, texto e 1–2 ações. */
export function EmptyState({
  icon: Icon,
  title,
  children,
  actions,
  className,
}: {
  icon: LucideIcon;
  title: ReactNode;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3.5 rounded-[10px] border border-dashed border-white/14 bg-[radial-gradient(ellipse_at_top,rgba(229,22,29,0.12),transparent_60%)] px-6 py-16 text-center",
        className,
      )}
    >
      <div className="flex size-[84px] items-center justify-center rounded-full border-[1.5px] border-primary/50">
        <Icon className="size-9 text-primary" />
      </div>
      <h2 className="mt-1.5 font-title text-[clamp(28px,4vw,40px)] leading-none">{title}</h2>
      <p className="max-w-[420px] text-pretty text-[15px] leading-normal text-muted">{children}</p>
      {actions && <div className="mt-2 flex flex-wrap justify-center gap-2.5">{actions}</div>}
    </div>
  );
}

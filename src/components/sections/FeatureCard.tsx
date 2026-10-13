import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ícone vermelho + título + texto, com hover.
 * "title" (valores do Sobre) ou "center" (vantagens dos serviços).
 */
export function FeatureCard({
  icon: Icon,
  title,
  variant = "title",
  children,
}: {
  icon: LucideIcon;
  title: string;
  variant?: "title" | "center";
  children: React.ReactNode;
}) {
  const center = variant === "center";
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-lg border border-white/8 bg-surface px-[22px] transition-all duration-250 hover:-translate-y-1 hover:border-primary/60",
        center ? "items-center gap-2.5 py-6 text-center" : "gap-3 py-[26px] hover:bg-[#16161a]",
      )}
    >
      <Icon className="size-[34px] text-primary" />
      <h3 className={center ? "text-[17px] font-bold" : "font-title text-2xl leading-[normal]"}>{title}</h3>
      <p className={cn("text-pretty text-sm text-muted", center ? "leading-normal" : "leading-[1.55]")}>{children}</p>
    </div>
  );
}

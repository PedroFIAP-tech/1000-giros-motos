import type { LucideIcon } from "lucide-react";

/** Ícone vermelho + título + texto (valores, vantagens), com hover. */
export function FeatureCard({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col gap-3 rounded-lg border border-white/8 bg-surface px-[22px] py-[26px] transition-all duration-250 hover:-translate-y-1 hover:border-primary/60 hover:bg-[#16161a]">
      <Icon className="size-[34px] text-primary" />
      <h3 className="font-title text-2xl leading-[normal]">{title}</h3>
      <p className="text-pretty text-sm leading-[1.55] text-muted">{children}</p>
    </div>
  );
}

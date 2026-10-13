import { cn } from "@/lib/utils";

/** Select nativo com o visual dos filtros (40px, fundo escuro). */
export function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-10 rounded-md border border-white/12 bg-field px-2.5 text-[13px] text-white",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}

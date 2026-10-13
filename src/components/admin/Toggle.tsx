import { cn } from "@/lib/utils";

/** Interruptor (selos no cadastro). Visual do design: trilho 38×22, botão 16px. */
export function ToggleTrack({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn("relative h-[22px] w-[38px] shrink-0 rounded-full transition-colors", on ? "bg-primary" : "bg-[#2a2a30]")}
    >
      <span
        className={cn(
          "absolute top-[3px] size-4 rounded-full bg-white transition-[left] duration-200",
          on ? "left-[19px]" : "left-[3px]",
        )}
      />
    </span>
  );
}

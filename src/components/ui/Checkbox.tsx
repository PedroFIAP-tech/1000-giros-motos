import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/** Checkbox quadrado do design (marca no filtro, aceite nos formulários). */
export function Checkbox({
  checked,
  onChange,
  children,
  aside,
  className,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  /** Texto à direita (ex.: quantidade). */
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("flex cursor-pointer items-center gap-2.5 text-sm", className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="peer sr-only"
      />
      <span
        aria-hidden="true"
        className={cn(
          "flex size-[18px] shrink-0 items-center justify-center rounded border-[1.5px] transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
          checked ? "border-primary bg-primary" : "border-white/30 bg-transparent",
        )}
      >
        {checked && <Check className="size-3 text-white" strokeWidth={3} />}
      </span>
      <span className="flex-1">{children}</span>
      {aside !== undefined && <span className="text-xs text-dim">{aside}</span>}
    </label>
  );
}

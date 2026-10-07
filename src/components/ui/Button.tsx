import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-primary";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-white shadow-[0_8px_30px_-8px_rgba(225,6,0,0.7)] hover:bg-primary-hover",
  outline: "border border-white/40 text-white hover:border-white hover:bg-white/5",
  "outline-primary": "border border-primary text-white hover:bg-primary",
};

const sizes: Record<Size, string> = {
  sm: "h-10 gap-2 px-4 text-sm",
  md: "h-12 gap-2.5 px-6 text-base",
  lg: "h-14 gap-3 px-8 text-lg",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Formato pílula (ex.: botão do header). */
  pill?: boolean;
  /** Abre em nova aba (WhatsApp, mapas, redes sociais). */
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  pill = false,
  external = false,
  className,
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center whitespace-nowrap font-display font-bold uppercase italic tracking-wide transition-colors duration-200",
    pill ? "rounded-full" : "rounded-md",
    variants[variant],
    sizes[size],
    className,
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} onClick={onClick}>
      {children}
    </Link>
  );
}

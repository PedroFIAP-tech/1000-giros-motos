import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "whatsapp" | "ghost" | "icon";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center whitespace-nowrap text-white transition-[background-color,border-color,color,transform,box-shadow] duration-200 hover:text-white disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "rounded-md bg-primary font-cta hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-[0_10px_24px_-8px_rgba(229,22,29,0.7)]",
  secondary:
    "rounded-md border-[1.5px] border-white/55 font-cta hover:border-white hover:bg-white/6",
  whatsapp:
    "h-10 gap-2 rounded-full border-[1.5px] border-primary px-[18px] text-[13px] font-semibold hover:bg-primary",
  ghost:
    "gap-1.5 border-b border-primary pb-0.5 text-[13px] font-bold uppercase text-primary hover:text-primary-hover",
  icon: "shrink-0 rounded-md border-[1.5px] border-white/20 hover:border-primary",
};

/* whatsapp e ghost têm medida própria no design; os tamanhos valem para os demais. */
const sizes: Record<Size, string> = {
  sm: "h-10 gap-2 px-4 text-[15px]",
  md: "h-12 gap-2 px-[22px] text-[17px]",
  lg: "h-[50px] gap-2.5 px-[26px] text-[17px]",
};

const iconSizes: Record<Size, string> = {
  sm: "size-10",
  md: "size-11",
  lg: "size-[50px]",
};

type Common = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type AsLink = Common &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
    /** Abre em nova aba (WhatsApp, mapas, redes sociais). */
    external?: boolean;
  };

type AsButton = Common &
  Omit<ComponentProps<"button">, "className" | "children"> & {
    href?: undefined;
    external?: undefined;
  };

export type ButtonProps = AsLink | AsButton;

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Pick<Common, "variant" | "size" | "className">) {
  const sized =
    variant === "icon" ? iconSizes[size] : variant === "primary" || variant === "secondary" ? sizes[size] : "";
  return cn(base, variants[variant], sized, className);
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
  const classes = buttonClasses({ variant, size, className });

  if (props.href !== undefined) {
    const { external, ...linkProps } = props as Omit<AsLink, keyof Common>;
    if (external) {
      return (
        <a
          href={linkProps.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={linkProps.onClick}
          aria-label={linkProps["aria-label"]}
          title={linkProps.title}
        >
          {children}
        </a>
      );
    }
    return (
      <Link {...linkProps} className={classes}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as Omit<AsButton, keyof Common>;
  return (
    <button type={type} {...buttonProps} className={classes}>
      {children}
    </button>
  );
}

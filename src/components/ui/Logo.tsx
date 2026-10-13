import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import logo from "../../../public/brand/logo-1000-giros.png";

/** A altura vem do `className` (h-11 por padrão); a largura acompanha. */
export function Logo({
  className,
  onClick,
  preload,
}: {
  className?: string;
  onClick?: () => void;
  preload?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} - página inicial`}
      className={cn(
        "inline-flex h-11 shrink-0 rounded-sm transition-[filter,transform] duration-300 hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary",
        className,
      )}
      onClick={onClick}
    >
      <Image
        src={logo}
        alt=""
        sizes="160px"
        preload={preload}
        className="h-full w-auto"
      />
    </Link>
  );
}

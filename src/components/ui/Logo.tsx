import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/** Logo provisório em texto. Trocar por <Image> quando o arquivo da marca chegar. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} - página inicial`}
      className={cn("group inline-flex flex-col leading-none", className)}
      onClick={onClick}
    >
      <span className="font-title text-3xl">
        <span className="bg-linear-to-b from-yellow-300 to-orange-500 bg-clip-text pr-1 text-transparent">
          1000
        </span>
        <span className="text-primary transition-colors group-hover:text-primary-hover">GIROS</span>
      </span>
      <span className="self-end font-display text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-muted">
        Motos
      </span>
    </Link>
  );
}

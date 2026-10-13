import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/** Home > Estoque > ... (o último item é a página atual). */
export function Breadcrumb({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Você está em" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {last || !item.href ? (
                <span aria-current={last ? "page" : undefined} className={cn(last && "text-white")}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="text-muted">
                  {item.label}
                </Link>
              )}
              {!last && <ChevronRight aria-hidden="true" className="size-3 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

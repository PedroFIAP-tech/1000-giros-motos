import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const box = "flex size-10 items-center justify-center rounded-md border transition-colors duration-200";

/** Botões numerados com o ativo em vermelho. */
export function Pagination({
  page,
  pages,
  onChange,
}: {
  page: number;
  pages: number;
  onChange: (page: number) => void;
}) {
  return (
    <nav aria-label="Paginação" className="mt-4 flex justify-center gap-1.5">
      <button
        type="button"
        aria-label="Página anterior"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        className={cn(box, "border-white/12", page <= 1 ? "text-dim" : "text-white")}
      >
        <ChevronLeft className="size-4" />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-current={n === page ? "page" : undefined}
          onClick={() => onChange(n)}
          className={cn(
            box,
            "text-[13px] font-semibold text-white hover:border-primary",
            n === page ? "border-primary bg-primary" : "border-white/12 bg-transparent",
          )}
        >
          {n}
        </button>
      ))}
      <button
        type="button"
        aria-label="Próxima página"
        disabled={page >= pages}
        onClick={() => onChange(page + 1)}
        className={cn(box, "border-white/12", page >= pages ? "text-dim" : "text-white")}
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  );
}

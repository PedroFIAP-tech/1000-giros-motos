/** Card de carregamento (filtros aplicando). */
export function MotoCardSkeleton() {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-lg border border-white/8 bg-surface">
      <div className="aspect-[175/131] animate-pulse bg-surface-3" />
      <div className="space-y-3 p-3.5">
        <div className="h-4 w-3/4 animate-pulse rounded bg-white/8" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-white/6" />
        <div className="h-5 w-2/5 animate-pulse rounded bg-white/8" />
        <div className="h-9 animate-pulse rounded bg-white/6" />
      </div>
    </div>
  );
}

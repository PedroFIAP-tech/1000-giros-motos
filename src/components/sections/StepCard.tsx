/** Número grande vazado + título + texto ("Como funciona"). */
export function StepCard({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="relative h-full overflow-hidden rounded-lg border border-white/8 bg-surface px-[22px] py-6">
      <p
        aria-hidden="true"
        className="font-display text-[64px] font-black italic leading-[0.8] text-transparent [-webkit-text-stroke:1.5px_#e5161d]"
      >
        {String(n).padStart(2, "0")}
      </p>
      <h3 className="mt-4 text-[17px] font-bold">
        <span className="sr-only">Passo {n}: </span>
        {title}
      </h3>
      <p className="mt-1.5 text-pretty text-sm leading-[1.55] text-muted">{children}</p>
    </div>
  );
}

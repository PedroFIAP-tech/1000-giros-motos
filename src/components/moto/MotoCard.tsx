import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motoNome, type Moto } from "@/data/motos";
import { formatNumber, formatPrice } from "@/lib/format";
import { FavoriteButton } from "./FavoriteButton";

type MotoCardProps = {
  moto: Moto;
  /** Layout em lista (página de estoque). */
  list?: boolean;
  /** Mostra o selo vermelho ("Destaque", "Baixo km"...). */
  showSelo?: boolean;
};

function Meta({ moto, className }: { moto: Moto; className: string }) {
  return (
    <p className={className}>
      {moto.ano}
      <span aria-hidden="true" className="opacity-40">
        |
      </span>
      {formatNumber(moto.km)} km
    </p>
  );
}

export function MotoCard({ moto, list = false, showSelo = true }: MotoCardProps) {
  const nome = motoNome(moto);
  const href = `/estoque/${moto.slug}`;

  if (list) {
    return (
      <article className="grid grid-cols-[minmax(120px,240px)_1fr] overflow-hidden rounded-lg border border-white/8 bg-surface transition-[border-color,box-shadow] duration-250 hover:border-primary/60 hover:shadow-[0_18px_40px_-12px_rgba(229,22,29,0.3)]">
        <Link href={href} tabIndex={-1} className="relative aspect-[175/131] bg-surface-3">
          <Image src={moto.imagem} alt={nome} fill sizes="240px" className="object-cover" />
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3 px-[18px] py-4">
          <div>
            <h3 className="text-[17px] font-semibold">{nome}</h3>
            <Meta moto={moto} className="mt-1.5 flex gap-2 text-[13px] text-muted" />
            <p className="mt-2.5 text-[22px] font-bold">{formatPrice(moto.preco)}</p>
          </div>
          <div className="flex gap-2">
            <FavoriteButton
              slug={moto.slug}
              nome={nome}
              className="size-10 rounded-md border border-white/14 bg-transparent"
            />
            <Link
              href={href}
              className="flex h-10 items-center gap-1.5 rounded bg-primary px-4 text-xs font-bold uppercase text-white hover:text-white"
            >
              Ver detalhes
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="h-full overflow-hidden rounded-lg border border-white/8 bg-surface transition-[transform,border-color,box-shadow] duration-250 ease-out hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_18px_40px_-12px_rgba(229,22,29,0.35)]">
      <div className="relative aspect-[175/131] overflow-hidden bg-surface-3">
        <Link href={href} prefetch tabIndex={-1} aria-hidden="true">
          <ViewTransition name={`moto-${moto.slug}`} share="morph" default="none">
            <Image
              src={moto.imagem}
              alt={nome}
              fill
              sizes="(min-width: 760px) 280px, 50vw"
              className="object-cover"
            />
          </ViewTransition>
        </Link>
        <FavoriteButton
          slug={moto.slug}
          nome={nome}
          className="absolute right-1.5 top-1.5 size-[34px] rounded-full bg-[#1a1a1d] shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        />
        {showSelo && moto.selo && (
          <span className="absolute bottom-2 left-2 rounded bg-primary px-2 py-[3px] text-[11px] font-bold uppercase tracking-[0.03em]">
            {moto.selo}
          </span>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="text-[15px] font-semibold">{nome}</h3>
        <Meta moto={moto} className="mt-1.5 flex gap-2 text-xs text-muted" />
        <p className="mt-3 text-[19px] font-bold">{formatPrice(moto.preco)}</p>
        <Link
          href={href}
          prefetch
          className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded bg-primary text-xs font-bold uppercase tracking-[0.02em] text-white transition-colors duration-200 hover:bg-primary-hover hover:text-white"
        >
          Ver detalhes
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

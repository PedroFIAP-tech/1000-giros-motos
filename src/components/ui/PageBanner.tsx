import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { Eyebrow, Hl } from "./SectionTitle";

type PageBannerProps = {
  eyebrow: string;
  /** Título: `pre` em branco e `hl` em vermelho. */
  pre: string;
  hl: string;
  sub?: ReactNode;
  crumbs: Crumb[];
  /** object-position da foto (ex.: "70% center"). */
  position?: string;
};

/** Topo curto das páginas internas: breadcrumb, eyebrow, título e foto escurecida. */
export function PageBanner({ eyebrow, pre, hl, sub, crumbs, position = "center" }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/6 bg-bg">
      <div className="absolute inset-y-0 right-0 w-[62%] opacity-55">
        <Image
          src="/images/hero-moto.png"
          alt=""
          fill
          preload
          sizes="62vw"
          className="object-cover"
          style={{ objectPosition: position }}
        />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0a0b_38%,rgba(10,10,11,0.75)_60%,rgba(10,10,11,0.2))]" />
      <div className="container-site relative pb-[clamp(32px,5vw,56px)] pt-[clamp(36px,6vw,64px)]">
        <Breadcrumb items={crumbs} className="mb-[18px]" />
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-2.5 font-title text-[clamp(40px,7vw,76px)]">
          {pre} <Hl>{hl}</Hl>
        </h1>
        {sub && (
          <p className="mt-3.5 max-w-[520px] text-pretty text-[clamp(15px,1.6vw,17px)] leading-normal text-soft">
            {sub}
          </p>
        )}
      </div>
    </section>
  );
}

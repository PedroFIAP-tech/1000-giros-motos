"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

const arrow =
  "absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[rgba(10,10,11,0.75)] text-white transition-colors hover:border-primary hover:bg-primary lg:flex";

/** Faixa horizontal de cards com setas (desktop) e arraste (mobile). */
export function FeaturedCarousel({ children }: { children: ReactNode }) {
  const track = useRef<HTMLUListElement>(null);

  function scroll(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    const atStart = el.scrollLeft <= 4;
    if (dir === 1 && atEnd) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && atStart) el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
    else el.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <button type="button" aria-label="Anteriores" onClick={() => scroll(-1)} className={`${arrow} -left-2 xl:-left-14`}>
        <ChevronLeft className="size-5" />
      </button>
      <ul
        ref={track}
        className="-mx-6 grid snap-x snap-mandatory auto-cols-[72%] grid-flow-col gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] md:auto-cols-[calc((100%-32px)/3)] lg:mx-0 lg:auto-cols-[calc((100%-64px)/5)] lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ul>
      <button type="button" aria-label="Próximas" onClick={() => scroll(1)} className={`${arrow} -right-2 xl:-right-14`}>
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

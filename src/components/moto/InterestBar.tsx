"use client";

import { useEffect } from "react";
import { WhatsAppIcon } from "@/components/ui/icons";

/** Barra fixa de interesse no mobile; sobe o botão flutuante para não cobri-la. */
export function InterestBar({ label, price, href }: { label: string; price: string; href: string }) {
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--float-offset", "72px");
    return () => {
      root.style.removeProperty("--float-offset");
    };
  }, []);

  return (
    <div className="sticky bottom-0 z-30 flex items-center gap-3 border-t border-primary/35 bg-[rgba(10,10,11,0.96)] px-4 py-3 md:hidden">
      <div className="flex-1">
        <p className="text-[11px] text-muted">{label}</p>
        <p className="font-display text-2xl font-extrabold leading-none">{price}</p>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-12 items-center gap-2 rounded-md bg-primary px-[18px] font-cta text-base text-white hover:text-white"
      >
        <WhatsAppIcon className="size-[18px]" />
        Tenho interesse
      </a>
    </div>
  );
}

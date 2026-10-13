"use client";

import { Suspense, useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

/*
 * O pathname é dado de runtime em rotas dinâmicas (/estoque/[slug]). Só os
 * componentes que destacam o link ativo o leem, dentro de <Suspense>, para o
 * resto do header continuar no shell estático.
 */
function ActiveDesktopNav() {
  return <DesktopNav pathname={usePathname()} />;
}

function ActiveMobileMenu(props: { open: boolean; onClose: () => void }) {
  return <MobileMenu {...props} pathname={usePathname()} />;
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-white/7 bg-bg/92 backdrop-blur-[8px]"
    >
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-6 px-[18px] lg:h-[72px] lg:px-8">
        <Logo preload className="h-9 lg:h-11" />

        <Suspense fallback={<DesktopNav pathname="" />}>
          <ActiveDesktopNav />
        </Suspense>

        <Button href={whatsappLink()} external variant="whatsapp" className="hidden lg:inline-flex">
          <WhatsAppIcon className="size-[17px]" />
          Fale no WhatsApp
          <ArrowRight className="size-3.5" />
        </Button>

        <div className="flex gap-2 lg:hidden">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fale no WhatsApp"
            className="flex size-11 items-center justify-center rounded-lg border border-primary text-ink hover:text-ink"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className={cn(
              "flex size-11 items-center justify-center rounded-lg border border-white/15 text-white transition-colors",
              menuOpen ? "bg-primary" : "bg-transparent",
            )}
          >
            {menuOpen ? <X className="size-[22px]" /> : <Menu className="size-[22px]" />}
          </button>
        </div>
      </div>

      <Suspense fallback={null}>
        <ActiveMobileMenu open={menuOpen} onClose={closeMenu} />
      </Suspense>
    </header>
  );
}

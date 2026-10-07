"use client";

import { Suspense, useCallback, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { MenuIcon, WhatsAppIcon, ArrowRightIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

const SCROLL_THRESHOLD = 16;

function subscribeToScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  return () => window.removeEventListener("scroll", callback);
}

function useScrolled() {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > SCROLL_THRESHOLD,
    () => false,
  );
}

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
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header
        style={{ viewTransitionName: "site-header" }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-b border-line bg-bg/95 shadow-lg shadow-black/40 backdrop-blur-md"
            : "border-b border-transparent bg-linear-to-b from-black/80 to-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:h-20 lg:px-8">
          <Logo />

          <Suspense fallback={<DesktopNav pathname="" />}>
            <ActiveDesktopNav />
          </Suspense>

          <div className="flex items-center gap-3">
            <Button
              href={whatsappLink()}
              external
              variant="outline-primary"
              size="sm"
              pill
              className="hidden font-sans not-italic normal-case tracking-normal sm:inline-flex"
            >
              <WhatsAppIcon className="size-4" />
              Fale no WhatsApp
              <ArrowRightIcon className="size-4" />
            </Button>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="menu-mobile"
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden"
            >
              <MenuIcon className="size-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Fora do <header>: o backdrop-blur criaria um containing block e prenderia o painel fixo. */}
      <Suspense fallback={null}>
        <ActiveMobileMenu open={menuOpen} onClose={closeMenu} />
      </Suspense>
    </>
  );
}

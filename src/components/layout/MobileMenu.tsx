"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/icons";
import { siteConfig } from "@/lib/config";
import { isActivePath, mainNav } from "@/lib/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

/** Painel do menu mobile: abre logo abaixo do header, ocupando a tela. */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  // Trava o scroll do fundo e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.nav
          id="menu-mobile"
          aria-label="Principal"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute inset-x-0 top-full flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto border-t border-white/7 bg-bg px-[18px] pb-7 pt-5 lg:hidden"
        >
          {mainNav.map((item) => {
            const active = isActivePath(pathname, item.href);
            const href = item.children ? item.children[0].href : item.href;
            return (
              <div key={item.href}>
                <Link
                  href={href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between border-b border-white/7 px-1 py-3.5 font-title text-[28px] leading-[normal]",
                    active ? "text-white hover:text-white" : "text-[#c4c4c8] hover:text-[#c4c4c8]",
                  )}
                >
                  {item.label}
                  <ChevronRight className="size-5 text-primary" />
                </Link>
                {item.children && (
                  <div className="grid grid-cols-2 gap-2 py-3">
                    {item.children.map(({ href: childHref, label, icon: Icon }) => (
                      <Link
                        key={childHref}
                        href={childHref}
                        onClick={onClose}
                        aria-current={isActivePath(pathname, childHref) ? "page" : undefined}
                        className="flex items-center gap-2 rounded-lg border border-white/8 bg-surface-2 p-3 text-sm"
                      >
                        {Icon && <Icon className="size-[18px] shrink-0 text-primary" />}
                        {label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="mt-5 flex h-[52px] shrink-0 items-center justify-center gap-2.5 rounded-lg bg-primary font-cta text-lg text-white hover:text-white"
          >
            <WhatsAppIcon className="size-5" />
            Fale no WhatsApp
          </a>
          <p className="mt-4 text-[13px] leading-[1.6] text-muted">
            {siteConfig.phone.display} · {siteConfig.address.street} — {siteConfig.address.city},{" "}
            {siteConfig.address.state}
          </p>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

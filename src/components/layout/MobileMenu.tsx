"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { ChevronDownIcon, CloseIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/config";
import { isActivePath, mainNav, type NavItem } from "@/lib/navigation";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { SocialLinks } from "./SocialLinks";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const listVariants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.12 } },
  closed: {},
};

const itemVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: 24 },
};

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Trava o scroll do fundo, fecha com Esc e leva o foco para dentro do painel.
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

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
        <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-bg shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 38 }}
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4">
              <Logo onClick={onClose} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Fechar menu"
                className="-mr-2 inline-flex size-11 items-center justify-center rounded-md hover:bg-white/10"
              >
                <CloseIcon className="size-6" />
              </button>
            </div>

            <nav aria-label="Principal" className="flex-1 overflow-y-auto px-4 py-6">
              <motion.ul variants={listVariants} initial="closed" animate="open" className="space-y-1">
                {mainNav.map((item) => (
                  <motion.li key={item.href} variants={itemVariants}>
                    {item.children ? (
                      <Accordion item={item} pathname={pathname} onNavigate={onClose} />
                    ) : (
                      <MobileLink
                        href={item.href}
                        active={isActivePath(pathname, item.href)}
                        onNavigate={onClose}
                      >
                        {item.label}
                      </MobileLink>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            <div className="space-y-5 border-t border-line px-4 py-6">
              <Button href={whatsappLink()} external className="w-full" onClick={onClose}>
                <WhatsAppIcon className="size-5" />
                Fale no WhatsApp
              </Button>
              <div className="space-y-3 text-sm text-muted">
                <a href={siteConfig.phone.href} className="flex items-center gap-3 hover:text-white">
                  <PhoneIcon className="size-4 shrink-0 text-primary" />
                  {siteConfig.phone.display}
                </a>
                <a
                  href={siteConfig.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 hover:text-white"
                >
                  <MapPinIcon className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span>
                    {siteConfig.address.street}
                    <br />
                    {siteConfig.address.city} - {siteConfig.address.state}
                  </span>
                </a>
              </div>
              <SocialLinks />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function MobileLink({
  href,
  active,
  onNavigate,
  children,
}: {
  href: string;
  active: boolean;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-3 font-title text-3xl transition-colors",
        active ? "text-primary" : "text-white hover:bg-white/5",
      )}
    >
      {active && <span aria-hidden="true" className="h-6 w-1 rounded-full bg-primary" />}
      {children}
    </Link>
  );
}

function Accordion({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const active = isActivePath(pathname, item.href);
  const [expanded, setExpanded] = useState(active);
  const panelId = `mobile-submenu-${item.href.replace(/\W/g, "")}`;

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        aria-controls={panelId}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-md px-3 py-3 font-title text-3xl transition-colors hover:bg-white/5",
          active ? "text-primary" : "text-white",
        )}
      >
        <span className="flex items-center gap-3">
          {active && <span aria-hidden="true" className="h-6 w-1 rounded-full bg-primary" />}
          {item.label}
        </span>
        <ChevronDownIcon
          className={cn("size-6 transition-transform duration-200", expanded && "rotate-180")}
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="ml-4 overflow-hidden border-l border-line"
          >
            {item.children?.map((child) => {
              const childActive = isActivePath(pathname, child.href);
              return (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    onClick={onNavigate}
                    aria-current={childActive ? "page" : undefined}
                    className={cn(
                      "block py-2.5 pl-5 text-lg font-medium transition-colors",
                      childActive ? "text-primary" : "text-white/80 hover:text-white",
                    )}
                  >
                    {child.label}
                  </Link>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { isActivePath, mainNav, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const linkBase =
  "relative flex h-[72px] items-center gap-1 text-sm font-medium transition-colors duration-200";

function linkColor(active: boolean) {
  return active ? "text-white hover:text-white" : "text-[#c4c4c8] hover:text-[#c4c4c8]";
}

/** Traço vermelho de 2px na base do header, desliza entre os links. */
function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active-bar"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}

export function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <ul className="flex items-center gap-[30px]">
        {mainNav.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              {item.children ? (
                <Dropdown item={item} active={active} pathname={pathname} />
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(linkBase, linkColor(active))}
                >
                  {item.label}
                  {active && <ActiveBar />}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function Dropdown({ item, active, pathname }: { item: NavItem; active: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = `submenu-${item.href.replace(/\W/g, "")}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          buttonRef.current?.focus();
        }
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
        className={cn(linkBase, linkColor(active))}
      >
        {item.label}
        <ChevronDown className="size-[13px]" />
        {active && <ActiveBar />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute -left-4 top-[70px] flex w-[260px] flex-col rounded-lg border border-white/8 bg-surface-2 p-2 shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            {item.children?.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={isActivePath(pathname, href) ? "page" : undefined}
                  className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ink hover:bg-[#1f1f24] hover:text-white"
                >
                  {Icon && <Icon className="size-[18px] text-primary" />}
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

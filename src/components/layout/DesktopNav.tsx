"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDownIcon } from "@/components/ui/icons";
import { isActivePath, mainNav, type NavItem } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const linkBase =
  "relative inline-flex h-10 items-center gap-1 px-1 text-[0.95rem] font-medium transition-colors";

function ActiveBar() {
  return (
    <motion.span
      layoutId="nav-active-bar"
      aria-hidden="true"
      className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-primary"
      transition={{ type: "spring", stiffness: 500, damping: 40 }}
    />
  );
}

export function DesktopNav({ pathname }: { pathname: string }) {
  return (
    <nav aria-label="Principal" className="hidden lg:block">
      <ul className="flex items-center gap-8">
        {mainNav.map((item) => (
          <li key={item.href}>
            {item.children ? (
              <Dropdown item={item} pathname={pathname} />
            ) : (
              <Link
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className={cn(
                  linkBase,
                  isActivePath(pathname, item.href) ? "text-primary" : "text-white/85 hover:text-white",
                )}
              >
                {item.label}
                {isActivePath(pathname, item.href) && <ActiveBar />}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Dropdown({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const active = isActivePath(pathname, item.href);
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
        className={cn(linkBase, active ? "text-primary" : "text-white/85 hover:text-white")}
      >
        {item.label}
        <ChevronDownIcon
          className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
        />
        {active && <ActiveBar />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            initial={{ opacity: 0, y: 8, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 8, x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full pt-3"
          >
            <ul className="w-72 overflow-hidden rounded-lg border border-line bg-surface/95 p-2 shadow-2xl shadow-black/60 backdrop-blur-md">
              {item.children?.map((child) => {
                const childActive = isActivePath(pathname, child.href);
                return (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={() => setOpen(false)}
                      aria-current={childActive ? "page" : undefined}
                      className={cn(
                        "block rounded-md border-l-2 px-3 py-2.5 transition-colors hover:bg-white/5",
                        childActive ? "border-primary bg-white/5" : "border-transparent",
                      )}
                    >
                      <span className={cn("block font-semibold", childActive && "text-primary")}>
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-0.5 block text-sm text-muted">{child.description}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

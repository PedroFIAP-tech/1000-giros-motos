"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Bike,
  CirclePlus,
  ExternalLink,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Search,
  Settings,
  X,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { leadsNovos } from "@/data/admin";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/motos", label: "Motos", icon: Bike },
  { href: "/admin/motos/nova", label: "Cadastrar moto", icon: CirclePlus },
  { href: "/admin/leads", label: "Leads", icon: Inbox, badge: leadsNovos },
];

const titles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/motos": "Motos",
  "/admin/motos/nova": "Cadastrar moto",
  "/admin/leads": "Leads",
};

const groupLabel = "px-2.5 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#5f5f68]";
const item = "flex h-[42px] items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors";

function NavLinks({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  return (
    <>
      {nav.map(({ href, label, icon: Icon, badge }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              item,
              active ? "bg-primary/14 text-white hover:text-white" : "text-muted hover:bg-surface-3 hover:text-white",
            )}
          >
            <Icon className={cn("size-[18px]", active && "text-primary")} />
            <span className="flex-1">{label}</span>
            {badge ? (
              <span className="flex h-5 min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5 text-[11px] font-bold text-white">
                {badge}
              </span>
            ) : null}
          </Link>
        );
      })}
    </>
  );
}

function Title() {
  const pathname = usePathname();
  return <>{titles[pathname] ?? "Painel"}</>;
}

/** Base do painel: sidebar (overlay no mobile) + topbar. */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative grid min-h-dvh grid-cols-1 admin:grid-cols-[244px_minmax(0,1fr)]">
      <aside
        aria-label="Menu do painel"
        className={cn(
          "inset-y-0 left-0 z-40 min-h-dvh w-[244px] flex-col gap-1 border-r border-white/7 bg-[#0e0e10] px-3.5 py-5 max-admin:fixed admin:sticky admin:top-0 admin:flex admin:h-dvh",
          open ? "flex" : "hidden",
        )}
      >
        <div className="flex items-center justify-between px-1.5 pb-5">
          <Logo className="h-9" />
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={close}
            className="flex size-9 items-center justify-center text-white admin:hidden"
          >
            <X className="size-5" />
          </button>
        </div>
        <p className={groupLabel}>Gestão</p>
        <Suspense fallback={null}>
          <NavLinks onNavigate={close} />
        </Suspense>
        <p className={cn(groupLabel, "pt-[18px]")}>Loja</p>
        <Link href="/" className={cn(item, "text-muted hover:bg-surface-3 hover:text-white")}>
          <ExternalLink className="size-[18px]" />
          Ver site
        </Link>
        <span aria-disabled="true" className={cn(item, "cursor-not-allowed text-muted")}>
          <Settings className="size-[18px]" />
          Configurações
        </span>
        <div className="mt-auto flex items-center gap-2.5 rounded-lg border border-white/7 bg-surface-2 p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-[13px] font-bold">
            MG
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-semibold">Marcos Giro</p>
            <p className="text-[11px] text-dim">Administrador</p>
          </div>
          <Link href="/admin/login" title="Sair" aria-label="Sair" className="text-muted hover:text-white">
            <LogOut className="size-[17px]" />
          </Link>
        </div>
      </aside>

      {open && <div aria-hidden="true" onClick={close} className="fixed inset-0 z-35 bg-black/60 admin:hidden" />}

      <div className="flex min-w-0 flex-col">
        <header className="flex h-16 items-center gap-3.5 border-b border-white/7 bg-bg px-[clamp(16px,3vw,32px)]">
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="flex size-10 items-center justify-center rounded-md border border-white/14 text-white admin:hidden"
          >
            <Menu className="size-5" />
          </button>
          <h1 className="min-w-0 flex-1 truncate font-title text-2xl leading-[normal]">
            <Suspense fallback="Painel">
              <Title />
            </Suspense>
          </h1>
          <label className="relative hidden w-[280px] admin:block">
            <span className="sr-only">Buscar</span>
            <Search className="absolute left-3 top-[11px] size-4 text-dim" />
            <input
              placeholder="Buscar moto, lead, placa…"
              className="h-[38px] w-full rounded-md border border-white/10 bg-surface pl-9 pr-3 text-[13px] text-white outline-none focus:border-primary"
            />
          </label>
          <button
            type="button"
            aria-label="Notificações"
            className="relative flex size-10 items-center justify-center rounded-md border border-white/10 text-white"
          >
            <Bell className="size-[18px]" />
            <span className="absolute right-[9px] top-2 size-2 rounded-full bg-primary" />
          </button>
          <Link
            href="/admin/motos/nova"
            aria-label="Nova moto"
            className="flex h-10 items-center gap-1.5 rounded-md bg-primary px-3.5 text-[13px] font-bold uppercase text-white transition-colors hover:bg-primary-hover hover:text-white"
          >
            <Plus className="size-4" />
            <span className="hidden admin:inline">Nova moto</span>
          </Link>
        </header>
        <main className="flex flex-col gap-5 p-[clamp(16px,3vw,32px)]">{children}</main>
      </div>
    </div>
  );
}

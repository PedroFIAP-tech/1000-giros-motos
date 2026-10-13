"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BadgeCheck, Pencil, Search, Trash2 } from "lucide-react";
import { motosAdmin, type MotoAdmin, type StatusMoto } from "@/data/admin";
import { marcas } from "@/data/motos";
import { formatNumber, formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Segmented, StatusBadge } from "./status";

type Filtro = "Todas" | StatusMoto;
const cols = "grid-cols-[minmax(0,1fr)_auto] admin:grid-cols-[2.4fr_.7fr_.9fr_1fr_1fr_140px]";
const action =
  "flex size-[34px] items-center justify-center rounded-md border border-white/10 bg-transparent text-soft transition-colors";

/** Tabela de motos (vira cards no mobile): filtro, busca, vender e excluir. */
export function MotosTable() {
  const [rows, setRows] = useState<MotoAdmin[]>(motosAdmin);
  const [filtro, setFiltro] = useState<Filtro>("Todas");
  const [busca, setBusca] = useState("");
  const [marca, setMarca] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const count = (s: Filtro) => (s === "Todas" ? rows.length : rows.filter((r) => r.status === s).length);
  const visible = rows.filter(
    (r) =>
      (filtro === "Todas" || r.status === filtro) &&
      (!marca || r.marca === marca) &&
      (!busca || `${r.nome} ${r.placa}`.toLowerCase().includes(busca.toLowerCase())),
  );

  function vender(id: string) {
    setRows((all) => all.map((r) => (r.id === id ? { ...r, status: "Vendida" } : r)));
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 700);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="relative flex-[1_1_240px]">
          <span className="sr-only">Buscar por nome ou placa</span>
          <Search className="absolute left-3 top-3 size-4 text-dim" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome ou placa"
            className="h-10 w-full rounded-md border border-white/10 bg-surface pl-9 pr-3 text-[13px] text-white outline-none focus:border-primary"
          />
        </label>
        <Segmented
          label="Status"
          value={filtro}
          onChange={setFiltro}
          options={(["Todas", "Disponível", "Reservada", "Vendida"] as Filtro[]).map((v) => ({ value: v, count: count(v) }))}
        />
        <select
          aria-label="Marca"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          className="h-10 rounded-md border border-white/10 bg-surface px-3 text-[13px] text-white"
        >
          <option value="">Todas as marcas</option>
          {marcas.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/7 bg-surface">
        <div
          className={cn(
            "hidden gap-3 border-b border-white/7 px-[18px] py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-dim admin:grid",
            cols,
          )}
        >
          <span>Moto</span>
          <span>Ano</span>
          <span>KM</span>
          <span>Preço</span>
          <span>Status</span>
          <span className="text-right">Ações</span>
        </div>
        <ul>
          <AnimatePresence initial={false}>
            {visible.map((r) => (
              <motion.li
                key={r.id}
                layout
                exit={{ opacity: 0, height: 0 }}
                animate={{ backgroundColor: flash === r.id ? "rgba(229,22,29,0.14)" : "rgba(0,0,0,0)" }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "grid items-center gap-3 border-b border-white/5 px-[18px] py-3 hover:bg-[#16161a]",
                  cols,
                  r.status === "Vendida" && "opacity-60",
                )}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="relative h-12 w-16 flex-none overflow-hidden rounded">
                    <Image src={r.imagem} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">{r.nome}</p>
                    <p className="text-xs text-dim">
                      Placa final {r.placa} · {r.views} views
                    </p>
                  </div>
                </div>
                <span className="hidden text-sm admin:block">{r.ano}</span>
                <span className="hidden text-sm text-soft admin:block">{formatNumber(r.km)} km</span>
                <span className="hidden text-sm font-bold admin:block">{formatPrice(r.preco)}</span>
                <StatusBadge status={r.status} dot />
                <div className="col-span-full flex justify-end gap-1 admin:col-span-1">
                  <Link href="/admin/motos/nova" title="Editar" aria-label={`Editar ${r.nome}`} className={cn(action, "hover:border-white hover:text-white")}>
                    <Pencil className="size-[15px]" />
                  </Link>
                  <button
                    type="button"
                    title="Marcar como vendida"
                    aria-label={`Marcar ${r.nome} como vendida`}
                    onClick={() => vender(r.id)}
                    className={cn(action, "hover:border-success hover:text-success")}
                  >
                    <BadgeCheck className="size-[15px]" />
                  </button>
                  <button
                    type="button"
                    title="Excluir"
                    aria-label={`Excluir ${r.nome}`}
                    onClick={() => setRows((all) => all.filter((x) => x.id !== r.id))}
                    className={cn(action, "hover:border-primary hover:text-danger")}
                  >
                    <Trash2 className="size-[15px]" />
                  </button>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
        <div className="flex items-center justify-between px-[18px] py-3 text-xs text-dim">
          <span>
            Mostrando {visible.length} de {rows.length}
          </span>
          <div className="flex gap-1">
            <button type="button" aria-current="page" className="size-[30px] rounded-md bg-primary text-[13px] font-semibold text-white">
              1
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

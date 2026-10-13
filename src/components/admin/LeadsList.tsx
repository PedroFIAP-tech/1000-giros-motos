"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { leads as initial, type Lead, type OrigemLead, type StatusLead } from "@/data/admin";
import { WhatsAppIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { Avatar, origemIcon, Segmented, statusTone } from "./status";

type Filtro = "Todos" | StatusLead;
const statusList: StatusLead[] = ["Novo", "Em atendimento", "Finalizado"];
const origensList: OrigemLead[] = ["Financiamento", "Seguro", "Consignação", "Avaliação", "Contato"];

function leadWhatsapp(l: Lead) {
  const digits = l.telefone.replace(/\D/g, "");
  const msg = `Olá, ${l.nome.split(" ")[0]}! Aqui é da 1000 Giros Motos, sobre o seu contato (${l.origem.toLowerCase()}).`;
  return `https://wa.me/55${digits}?text=${encodeURIComponent(msg)}`;
}

/** Leads com filtro por status/origem, troca de status e atalho para o WhatsApp do cliente. */
export function LeadsList() {
  const [rows, setRows] = useState(initial);
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [origem, setOrigem] = useState("");
  const [flash, setFlash] = useState<string | null>(null);

  const count = (s: Filtro) => (s === "Todos" ? rows.length : rows.filter((r) => r.status === s).length);
  const visible = rows.filter((r) => (filtro === "Todos" || r.status === filtro) && (!origem || r.origem === origem));

  function setStatus(id: string, status: StatusLead) {
    setRows((all) => all.map((r) => (r.id === id ? { ...r, status } : r)));
    setFlash(id);
    setTimeout(() => setFlash((f) => (f === id ? null : f)), 700);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <Segmented
          label="Status"
          value={filtro}
          onChange={setFiltro}
          options={(["Todos", ...statusList] as Filtro[]).map((v) => ({ value: v, count: count(v) }))}
        />
        <select
          aria-label="Origem"
          value={origem}
          onChange={(e) => setOrigem(e.target.value)}
          className="h-10 rounded-md border border-white/10 bg-surface px-3 text-[13px] text-white"
        >
          <option value="">Todas as origens</option>
          {origensList.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </div>

      <ul className="flex flex-col gap-2">
        {visible.map((l) => {
          const Icon = origemIcon[l.origem];
          const tone = statusTone[l.status];
          const novo = l.status === "Novo";
          return (
            <motion.li
              key={l.id}
              layout
              animate={{ backgroundColor: flash === l.id ? "rgba(229,22,29,0.14)" : "rgba(18,18,21,1)" }}
              transition={{ duration: 0.3 }}
              className={cn(
                "flex flex-wrap items-center gap-x-[18px] gap-y-3 rounded-lg border px-[18px] py-3.5 transition-colors hover:border-primary/50",
                novo ? "border-primary/30" : "border-white/7",
              )}
            >
              <div className="flex min-w-0 flex-[1_1_220px] items-center gap-3">
                <Avatar iniciais={l.iniciais} size="size-10 text-[13px]" />
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-[15px] font-semibold">
                    {l.nome}
                    {novo && <span aria-label="novo" className="size-[7px] rounded-full bg-primary" />}
                  </p>
                  <p className="text-xs text-dim">
                    {l.telefone} · {l.quando}
                  </p>
                </div>
              </div>
              <div className="min-w-0 flex-[1_1_180px] text-[13px]">
                <p className="flex items-center gap-1.5 font-semibold text-white">
                  <Icon className="size-4 text-primary" />
                  {l.origem}
                </p>
                <p className="text-xs text-dim">{l.assunto}</p>
              </div>
              <select
                aria-label={`Status de ${l.nome}`}
                value={l.status}
                onChange={(e) => setStatus(l.id, e.target.value as StatusLead)}
                className={cn("h-[34px] cursor-pointer rounded-full border px-2.5 text-xs font-semibold outline-none", tone.text, tone.bg, tone.border)}
              >
                {statusList.map((s) => (
                  <option key={s} className="bg-surface text-white">
                    {s}
                  </option>
                ))}
              </select>
              <a
                href={leadWhatsapp(l)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 items-center gap-1.5 rounded-md bg-primary px-3.5 text-xs font-bold uppercase text-white transition-colors hover:bg-primary-hover hover:text-white"
              >
                <WhatsAppIcon className="size-[15px]" />
                WhatsApp
              </a>
            </motion.li>
          );
        })}
      </ul>
    </>
  );
}

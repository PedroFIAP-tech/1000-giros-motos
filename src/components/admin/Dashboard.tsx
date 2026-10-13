"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, Bike, Eye, Inbox, TrendingDown, TrendingUp } from "lucide-react";
import { leads, leadsPorDia, metricas, origens } from "@/data/admin";
import { cn } from "@/lib/utils";
import { Avatar, OrigemChip, StatusBadge } from "./status";

const card = "rounded-lg border border-white/7 bg-surface";
const icons = { bike: Bike, vendidas: BadgeCheck, leads: Inbox, views: Eye };

export function MetricCards() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
      {metricas.map((m) => {
        const Icon = icons[m.icon];
        const Trend = m.up ? TrendingUp : TrendingDown;
        return (
          <div key={m.label} className={cn(card, "flex flex-col gap-2.5 p-[18px]")}>
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted">{m.label}</span>
              <span className="flex size-[34px] items-center justify-center rounded-lg bg-primary/12">
                <Icon className="size-[17px] text-primary" />
              </span>
            </div>
            <p className="font-display text-[38px] font-bold leading-none">{m.valor}</p>
            <p className={cn("flex items-center gap-1 text-xs", m.up ? "text-success" : "text-danger")}>
              <Trend className="size-3.5" />
              {m.delta}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/** Barras crescem do zero ao aparecer. */
export function LeadsChart() {
  const max = Math.max(...leadsPorDia);
  return (
    <div className={cn(card, "p-5")}>
      <div className="mb-[18px] flex items-center justify-between">
        <div>
          <p className="text-[15px] font-bold">Leads por dia</p>
          <p className="text-xs text-dim">Últimos 14 dias</p>
        </div>
        <select
          aria-label="Período"
          className="h-[34px] rounded-md border border-white/12 bg-field px-2.5 text-xs text-white"
        >
          <option>14 dias</option>
          <option>30 dias</option>
        </select>
      </div>
      <div className="flex h-[180px] items-end gap-1.5 border-b border-white/8" role="img" aria-label="Gráfico de leads por dia">
        {leadsPorDia.map((v, i) => (
          <motion.div
            key={i}
            title={`${v} leads`}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.6, delay: i * 0.03, ease: "easeOut" }}
            style={{ height: `${(v / max) * 100}%` }}
            className={cn(
              "flex-1 origin-bottom rounded-t-[3px] transition-colors hover:bg-primary-hover",
              i === leadsPorDia.length - 1 ? "bg-primary" : "bg-primary/45",
            )}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-dim">
        <span>30/set</span>
        <span>06/out</span>
        <span>Hoje</span>
      </div>
    </div>
  );
}

export function OriginBars() {
  const max = Math.max(...origens.map((o) => o.pct));
  return (
    <div className={cn(card, "p-5")}>
      <p className="text-[15px] font-bold">Origem dos leads</p>
      <p className="mb-[18px] text-xs text-dim">Outubro</p>
      <ul className="flex flex-col gap-3.5">
        {origens.map((o, i) => (
          <li key={o.label}>
            <div className="mb-1.5 flex justify-between text-[13px]">
              <span className="text-soft">{o.label}</span>
              <strong>{o.pct}%</strong>
            </div>
            <div className="h-1.5 rounded-[3px] bg-[#1f1f24]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(o.pct / max) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: "easeOut" }}
                className="h-full rounded-[3px] bg-primary"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LatestLeads() {
  return (
    <div className={card}>
      <div className="flex items-center justify-between border-b border-white/7 px-5 py-4">
        <p className="text-[15px] font-bold">Últimos leads</p>
        <Link href="/admin/leads" className="flex items-center gap-1 text-[13px] font-semibold text-primary">
          Ver todos
          <ArrowRight className="size-4" />
        </Link>
      </div>
      <ul>
        {leads.slice(0, 5).map((l) => (
          <li
            key={l.id}
            className="flex flex-wrap items-center gap-x-4 gap-y-2.5 border-b border-white/5 px-5 py-3 last:border-b-0"
          >
            <Avatar iniciais={l.iniciais} />
            <div className="min-w-0 flex-[1_1_160px]">
              <p className="text-sm font-semibold">{l.nome}</p>
              <p className="text-xs text-dim">
                {l.assunto} · {l.quando}
              </p>
            </div>
            <OrigemChip origem={l.origem} />
            <StatusBadge status={l.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

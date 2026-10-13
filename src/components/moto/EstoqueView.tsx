"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BellRing,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  RotateCcw,
  SearchX,
  SlidersHorizontal,
} from "lucide-react";
import type { Moto } from "@/data/motos";
import { Button } from "@/components/ui/Button";
import { FilterChip } from "@/components/ui/Chip";
import { EmptyState } from "@/components/ui/EmptyState";
import { Pagination } from "@/components/ui/Pagination";
import { Hl } from "@/components/ui/SectionTitle";
import { Select } from "@/components/ui/Select";
import {
  defaultFilters,
  describeFilters,
  filterMotos,
  filtersToQuery,
  ordens,
  POR_PAGINA,
  sortMotos,
  type Filters,
  type Ordem,
} from "@/lib/estoque";
import { whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { FilterSidebar } from "./FilterSidebar";
import { MotoCard } from "./MotoCard";
import { MotoCardSkeleton } from "./MotoCardSkeleton";

/** Tempo do skeleton ao aplicar filtros (design: 300ms). */
const SKELETON_MS = 300;

const gridCols =
  "grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(100%,160px),1fr))] md:grid-cols-[repeat(auto-fill,minmax(min(100%,230px),1fr))]";

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

type EstoqueViewProps = {
  motos: Moto[];
  initialFilters?: Filters;
  initialOrdem?: Ordem;
};

export function EstoqueView({ motos, initialFilters = defaultFilters, initialOrdem = "recentes" }: EstoqueViewProps) {
  const [filters, setFilters] = useState(initialFilters);
  const [ordem, setOrdem] = useState(initialOrdem);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const loadingTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const resultsRef = useRef<HTMLElement>(null);

  const results = useMemo(() => sortMotos(filterMotos(motos, filters), ordem), [motos, filters, ordem]);
  const pages = Math.max(1, Math.ceil(results.length / POR_PAGINA));
  const visible = results.slice((page - 1) * POR_PAGINA, page * POR_PAGINA);

  // Mantém a URL em sincronia (sem navegar), para recarregar/compartilhar a busca.
  useEffect(() => {
    const query = filtersToQuery(filters, ordem);
    const timer = setTimeout(() => {
      window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    }, 400);
    return () => clearTimeout(timer);
  }, [filters, ordem]);

  useEffect(() => () => clearTimeout(loadingTimer.current), []);

  function showSkeleton() {
    setLoading(true);
    clearTimeout(loadingTimer.current);
    loadingTimer.current = setTimeout(() => setLoading(false), SKELETON_MS);
  }

  function update(next: Filters) {
    setFilters(next);
    setPage(1);
    showSkeleton();
  }

  const clear = () => update(defaultFilters);

  const active = [
    ...filters.marcas.map((v) => ({ label: v, remove: () => update({ ...filters, marcas: filters.marcas.filter((x) => x !== v) }) })),
    ...filters.tipos.map((v) => ({ label: v, remove: () => update({ ...filters, tipos: filters.tipos.filter((x) => x !== v) }) })),
    ...filters.cils.map((v) => ({ label: v, remove: () => update({ ...filters, cils: filters.cils.filter((x) => x !== v) }) })),
  ];

  const empty = results.length === 0;
  const resultKey = `${filtersToQuery(filters, ordem)}|${page}`;
  const avise = describeFilters(filters);

  return (
    <div className="container-site grid grid-cols-1 items-start gap-7 pb-[72px] pt-8 md:grid-cols-[272px_minmax(0,1fr)]">
      <button
        type="button"
        onClick={() => setFiltersOpen((o) => !o)}
        aria-expanded={filtersOpen}
        aria-controls="filtros-estoque"
        className="flex h-12 items-center justify-center gap-2.5 rounded-md border border-white/14 bg-surface-2 text-[15px] font-semibold text-white md:hidden"
      >
        <SlidersHorizontal className="size-[18px] text-primary" />
        Filtros
        <span className="flex h-[22px] min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5 text-xs">
          {active.length}
        </span>
        {filtersOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
      </button>

      <div id="filtros-estoque" className={cn(filtersOpen ? "block" : "hidden", "md:block")}>
        <FilterSidebar
          motos={motos}
          filters={filters}
          onChange={update}
          onClear={clear}
          onApply={() => {
            setFiltersOpen(false);
            showSkeleton();
            resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="flex"
        />
      </div>

      <section ref={resultsRef} aria-label="Motos" className="flex min-w-0 flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/7 pb-4">
          <p className="text-[15px] text-soft" aria-live="polite">
            <strong className="text-lg text-white">{results.length}</strong>{" "}
            {results.length === 1 ? "moto encontrada" : "motos encontradas"}
          </p>
          <div className="flex items-center gap-2.5">
            <Select
              aria-label="Ordenar"
              value={ordem}
              onChange={(e) => {
                setOrdem(e.target.value as Ordem);
                setPage(1);
              }}
              className="bg-surface px-3"
            >
              {ordens.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
            <div className="hidden overflow-hidden rounded-md border border-white/12 md:flex">
              {(
                [
                  ["grid", "Grade", LayoutGrid],
                  ["list", "Lista", List],
                ] as const
              ).map(([value, label, Icon]) => (
                <button
                  key={value}
                  type="button"
                  title={label}
                  aria-label={label}
                  aria-pressed={view === value}
                  onClick={() => setView(value)}
                  className={cn(
                    "flex h-[38px] w-10 items-center justify-center text-white",
                    view === value ? "bg-primary" : "bg-transparent",
                  )}
                >
                  <Icon className="size-[17px]" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {active.length > 0 && !empty && (
          <div className="flex flex-wrap gap-2">
            {active.map((a) => (
              <FilterChip key={a.label} label={a.label} onRemove={a.remove} />
            ))}
          </div>
        )}

        {loading ? (
          <div className={gridCols} aria-busy="true">
            {Array.from({ length: Math.min(Math.max(visible.length, 3), POR_PAGINA) }, (_, i) => (
              <MotoCardSkeleton key={i} />
            ))}
          </div>
        ) : empty ? (
          <EmptyState
            icon={SearchX}
            title={
              <>
                Nenhuma moto <Hl>nessa rota</Hl>
              </>
            }
            actions={
              <>
                <Button onClick={clear} className="hover:translate-y-0 hover:shadow-none">
                  <RotateCcw className="size-[17px]" />
                  Limpar filtros
                </Button>
                <Button
                  href={whatsappLink(
                    `Olá! Quero ser avisado quando chegar uma moto${avise ? ` com: ${avise}` : ""}.`,
                  )}
                  external
                  variant="secondary"
                  className="border-white/60"
                >
                  <BellRing className="size-[17px] text-primary" />
                  Avise-me quando chegar
                </Button>
              </>
            }
          >
            Não encontramos motos com esses filtros agora. Limpe a busca ou deixe seu contato — avisamos
            assim que chegar uma do jeito que você quer.
          </EmptyState>
        ) : (
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <motion.ul
                key={resultKey}
                variants={listVariants}
                initial="hidden"
                animate="show"
                className={view === "list" ? "flex flex-col gap-3" : gridCols}
              >
                {visible.map((moto) => (
                  <motion.li key={moto.slug} variants={itemVariants}>
                    <MotoCard moto={moto} list={view === "list"} />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        )}

        {!empty && (
          <Pagination
            page={page}
            pages={pages}
            onChange={(n) => {
              setPage(n);
              resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        )}
      </section>
    </div>
  );
}

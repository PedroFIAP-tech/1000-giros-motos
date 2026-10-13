"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CloudUpload, FileCheck, Rocket, ShieldCheck, Wrench } from "lucide-react";
import { opcionaisCadastro } from "@/data/admin";
import { marcas, tipos } from "@/data/motos";
import { Chip } from "@/components/ui/Chip";
import { FieldLabel, fieldClasses } from "@/components/ui/Field";
import { FileDropzone, type Photo } from "@/components/ui/FileDropzone";
import { cn } from "@/lib/utils";
import { ToggleTrack } from "./Toggle";

const card = "rounded-lg border border-white/7 bg-surface p-5";
const cardTitle = "text-[15px] font-bold";

type Campo = { label: string; placeholder?: string; options?: string[] };

const grupos: { titulo: string; campos: Campo[] }[] = [
  {
    titulo: "Informações principais",
    campos: [
      { label: "Marca", options: marcas.filter((m) => m !== "Outra") },
      { label: "Modelo", placeholder: "CB 500F" },
      { label: "Ano fab./modelo", placeholder: "2023/2023" },
      { label: "Quilometragem", placeholder: "8.200" },
      { label: "Cor", placeholder: "Vermelho" },
      { label: "Preço (R$)", placeholder: "37.900" },
      { label: "Tipo", options: ["Naked", ...tipos.filter((t) => t !== "Naked")] },
      { label: "Status", options: ["Disponível", "Reservada", "Vendida"] },
    ],
  },
  {
    titulo: "Ficha técnica",
    campos: [
      { label: "Cilindrada", placeholder: "471 cc" },
      { label: "Combustível", options: ["Gasolina", "Flex"] },
      { label: "Câmbio", options: ["Manual", "Automático"] },
      { label: "Partida", options: ["Elétrica", "Pedal", "Elétrica e pedal"] },
      { label: "Freios", options: ["Disco c/ ABS", "Disco", "Tambor", "Disco/Tambor"] },
      { label: "Final da placa", placeholder: "7" },
    ],
  },
];

const selos = [
  { label: "Revisada", icon: Wrench },
  { label: "Procedência", icon: ShieldCheck },
  { label: "IPVA pago", icon: FileCheck },
];

const fotosExemplo: Photo[] = [
  { id: "ex-1", src: "/images/hero-moto.png", name: "Foto 1" },
  { id: "ex-2", src: "/images/motos/cb500.png", name: "Foto 2" },
  { id: "ex-3", src: "/images/motos/cb500.png", name: "Foto 3" },
  { id: "ex-4", src: "/images/hero-moto.png", name: "Foto 4" },
];

/** Cadastro de moto (só visual até o banco entrar). */
export function MotoForm() {
  const router = useRouter();
  const [photos, setPhotos] = useState(fotosExemplo);
  const [ativos, setAtivos] = useState<Record<string, boolean>>({ Revisada: true, Procedência: true, "IPVA pago": false });
  const [opcionais, setOpcionais] = useState(["Freios ABS", "Painel digital"]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/admin/motos");
      }}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-4"
    >
      <div className="flex flex-col gap-4">
        <section className={card}>
          <h2 className={cn(cardTitle, "mb-1")}>Fotos</h2>
          <p className="mb-3.5 text-xs text-dim">Arraste para reordenar. A primeira é a capa.</p>
          <FileDropzone
            photos={photos}
            onChange={setPhotos}
            max={20}
            sortable
            icon={CloudUpload}
            title="Arraste e solte as fotos aqui"
            hint={
              <>
                ou <u>clique para selecionar</u> · JPG/PNG até 8 MB
              </>
            }
          />
        </section>

        <section className={card}>
          <h2 className={cn(cardTitle, "mb-3.5")}>Selos e descrição</h2>
          <div className="mb-4 flex flex-col gap-2.5">
            {selos.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                role="switch"
                aria-checked={ativos[label]}
                onClick={() => setAtivos((a) => ({ ...a, [label]: !a[label] }))}
                className="flex items-center justify-between rounded-md border border-white/8 bg-field px-3 py-2.5 text-sm text-white"
              >
                <span className="flex items-center gap-2.5">
                  <Icon className="size-4 text-primary" />
                  {label}
                </span>
                <ToggleTrack on={ativos[label]} />
              </button>
            ))}
          </div>
          <label className="flex flex-col gap-1.5">
            <FieldLabel>Descrição</FieldLabel>
            <textarea
              rows={4}
              placeholder="Estado, revisões, histórico, diferenciais…"
              className={cn(fieldClasses(), "resize-y px-3.5 py-3")}
            />
          </label>
          <p className="mb-2 mt-3.5">
            <FieldLabel>Opcionais</FieldLabel>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {opcionaisCadastro.map((o) => (
              <Chip
                key={o}
                selected={opcionais.includes(o)}
                onClick={() => setOpcionais((all) => (all.includes(o) ? all.filter((x) => x !== o) : [...all, o]))}
                className="h-[30px] font-normal"
              >
                {o}
              </Chip>
            ))}
          </div>
        </section>
      </div>

      <div className="flex flex-col gap-4">
        {grupos.map((g) => (
          <section key={g.titulo} className={card}>
            <h2 className={cn(cardTitle, "mb-3.5")}>{g.titulo}</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,160px),1fr))] gap-3">
              {g.campos.map((c) => (
                <label key={c.label} className="flex flex-col gap-1.5">
                  <FieldLabel>{c.label}</FieldLabel>
                  {c.options ? (
                    <select className={cn(fieldClasses(), "h-[42px] px-2.5")}>
                      {c.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input placeholder={c.placeholder} className={cn(fieldClasses(), "h-[42px] px-3")} />
                  )}
                </label>
              ))}
            </div>
          </section>
        ))}

        <div className="sticky bottom-0 flex flex-wrap justify-end gap-2 rounded-lg border border-primary/30 bg-surface-2 p-3.5">
          <button
            type="button"
            onClick={() => router.push("/admin/motos")}
            className="h-11 rounded-md px-4 text-[13px] font-semibold text-muted hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="h-11 rounded-md border-[1.5px] border-white/40 px-4 text-[13px] font-semibold text-white hover:border-white"
          >
            Salvar rascunho
          </button>
          <button
            type="submit"
            className="flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-[13px] font-bold uppercase text-white transition-colors hover:bg-primary-hover"
          >
            <Rocket className="size-4" />
            Publicar moto
          </button>
        </div>
      </div>
    </form>
  );
}

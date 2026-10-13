"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { GripVertical, ImagePlus, Plus, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type Photo = { id: string; src: string; name: string };

let seq = 0;
function fromFiles(list: FileList | null): Photo[] {
  if (!list) return [];
  return [...list]
    .filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type))
    .map((f) => ({ id: `foto-${++seq}`, src: URL.createObjectURL(f), name: f.name }));
}

const revoke = (p: Photo) => p.src.startsWith("blob:") && URL.revokeObjectURL(p.src);

type FileDropzoneProps = {
  photos: Photo[];
  onChange: (photos: Photo[]) => void;
  max?: number;
  title?: ReactNode;
  hint?: ReactNode;
  icon?: LucideIcon;
  /** Admin: arrastar miniaturas para reordenar; a primeira vira a capa. */
  sortable?: boolean;
  className?: string;
};

/** Arrastar e soltar fotos (ou clicar), com miniaturas; no admin, capa e reordenação. */
export function FileDropzone({
  photos,
  onChange,
  max = 10,
  title = "Arraste as fotos ou clique para enviar",
  hint = "Até 10 fotos · JPG ou PNG · lateral, painel e documento",
  icon: Icon = ImagePlus,
  sortable = false,
  className,
}: FileDropzoneProps) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const dragFrom = useRef<number | null>(null);
  const latest = useRef(photos);

  useEffect(() => {
    latest.current = photos;
  }, [photos]);
  // Libera as prévias locais ao sair da página.
  useEffect(() => () => latest.current.forEach(revoke), []);

  function add(list: FileList | null) {
    const added = fromFiles(list);
    const room = Math.max(0, max - photos.length);
    added.slice(room).forEach(revoke);
    onChange([...photos, ...added.slice(0, room)]);
  }

  function remove(id: string) {
    const photo = photos.find((p) => p.id === id);
    if (photo) revoke(photo);
    onChange(photos.filter((p) => p.id !== id));
  }

  function move(from: number, to: number) {
    if (from === to) return;
    const next = [...photos];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
          if (dragFrom.current !== null) return;
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          add(e.dataTransfer.files);
        }}
        className={cn(
          "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-[1.5px] border-dashed text-center transition-all duration-200 hover:bg-primary/10",
          sortable ? "p-7" : "p-[22px]",
          dragging ? "animate-pulse border-primary bg-primary/14" : "border-primary/45 bg-primary/4",
        )}
      >
        <Icon className={cn("text-primary", sortable ? "size-8" : "size-7")} />
        <span className="text-sm font-semibold normal-case tracking-normal text-ink">{title}</span>
        <span className="text-xs normal-case tracking-normal text-muted">{hint}</span>
        <input
          id={inputId}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="sr-only"
          onChange={(e) => {
            add(e.target.files);
            e.target.value = "";
          }}
        />
      </label>

      {(photos.length > 0 || sortable) && (
        <ul
          className={cn(
            "mt-3 grid gap-2",
            sortable ? "grid-cols-[repeat(auto-fill,minmax(96px,1fr))]" : "grid-cols-[repeat(auto-fill,minmax(72px,1fr))]",
          )}
        >
          {photos.map((photo, i) => (
            <li
              key={photo.id}
              draggable={sortable}
              onDragStart={() => (dragFrom.current = i)}
              onDragEnd={() => (dragFrom.current = null)}
              onDragOver={(e) => sortable && e.preventDefault()}
              onDrop={(e) => {
                if (!sortable || dragFrom.current === null) return;
                e.preventDefault();
                e.stopPropagation();
                move(dragFrom.current, i);
                dragFrom.current = null;
              }}
              className={cn(
                "relative aspect-4/3 overflow-hidden rounded-md border-2 bg-surface-2",
                sortable && "cursor-grab active:cursor-grabbing",
                sortable && i === 0 ? "border-primary" : "border-transparent",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- prévia local (blob:) ou foto do mock */}
              <img src={photo.src} alt={photo.name} className="size-full object-cover" />
              {sortable && i === 0 && (
                <span className="absolute left-1 top-1 rounded-[3px] bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase">
                  Capa
                </span>
              )}
              <button
                type="button"
                aria-label={`Remover ${photo.name}`}
                onClick={() => remove(photo.id)}
                className="absolute right-1 top-1 flex size-[22px] items-center justify-center rounded-full bg-[rgba(10,10,11,0.8)] text-white hover:bg-primary"
              >
                <X className="size-3" />
              </button>
              {sortable && <GripVertical aria-hidden="true" className="absolute bottom-1 left-1 size-3.5 text-white opacity-80" />}
            </li>
          ))}
          {sortable && photos.length < max && (
            <li>
              <label
                htmlFor={inputId}
                aria-label="Adicionar fotos"
                className="flex aspect-4/3 cursor-pointer items-center justify-center rounded-md border border-dashed border-white/20 text-dim hover:border-primary hover:text-primary"
              >
                <Plus className="size-5" />
              </label>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

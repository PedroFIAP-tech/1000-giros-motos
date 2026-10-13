"use client";

import { useEffect, useId, useMemo, useState, type ReactNode } from "react";
import { ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";

type FileDropzoneProps = {
  files: File[];
  onChange: (files: File[]) => void;
  max?: number;
  title?: ReactNode;
  hint?: ReactNode;
  /** Conteúdo extra sobre cada miniatura (ex.: selo "Capa" no admin). */
  renderBadge?: (index: number) => ReactNode;
  className?: string;
};

/** Arrastar e soltar fotos (ou clicar); mostra as miniaturas com botão de remover. */
export function FileDropzone({
  files,
  onChange,
  max = 10,
  title = "Arraste as fotos ou clique para enviar",
  hint = "Até 10 fotos · JPG ou PNG · lateral, painel e documento",
  renderBadge,
  className,
}: FileDropzoneProps) {
  const inputId = useId();
  const [dragging, setDragging] = useState(false);
  const previews = useMemo(() => files.map((f) => URL.createObjectURL(f)), [files]);

  useEffect(() => () => previews.forEach((url) => URL.revokeObjectURL(url)), [previews]);

  function add(list: FileList | null) {
    if (!list) return;
    const images = [...list].filter((f) => /^image\/(jpeg|png|webp)$/.test(f.type));
    onChange([...files, ...images].slice(0, max));
  }

  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <label
        htmlFor={inputId}
        onDragOver={(e) => {
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
          "flex cursor-pointer flex-col items-center gap-1.5 rounded-lg border-[1.5px] border-dashed p-[22px] text-center transition-colors duration-200 hover:bg-primary/10",
          dragging ? "animate-pulse border-primary bg-primary/10" : "border-primary/45 bg-primary/4",
        )}
      >
        <ImagePlus className="size-7 text-primary" />
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

      {files.length > 0 && (
        <ul className="grid grid-cols-[repeat(auto-fill,minmax(72px,1fr))] gap-2">
          {previews.map((src, i) => (
            <li key={src} className="relative aspect-4/3 overflow-hidden rounded-md border border-white/10 bg-surface-2">
              {/* eslint-disable-next-line @next/next/no-img-element -- prévia local (blob:) */}
              <img src={src} alt={files[i].name} className="size-full object-cover" />
              {renderBadge?.(i)}
              <button
                type="button"
                aria-label={`Remover ${files[i].name}`}
                onClick={() => onChange(files.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 flex size-6 items-center justify-center rounded-full bg-[rgba(10,10,11,0.8)] text-white hover:bg-primary"
              >
                <X className="size-3.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

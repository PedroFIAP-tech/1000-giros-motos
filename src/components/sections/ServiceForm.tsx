"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";
import type { Campo } from "@/data/servicos";
import { Field, FieldLabel, fieldClasses } from "@/components/ui/Field";
import { FileDropzone, type Photo } from "@/components/ui/FileDropzone";
import { Hl } from "@/components/ui/SectionTitle";
import { SuccessState } from "@/components/ui/SuccessState";
import { applyMask, validate } from "@/lib/masks";
import { formMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type ServiceFormProps = {
  campos: Campo[];
  /** Opções de "Moto de interesse" (estoque). */
  stockOptions: string[];
  formT: string;
  formHl: string;
  cta: string;
  ok: string;
  intro: string;
};

/** Formulário do serviço: valida, mostra o sucesso e monta a mensagem pronta do WhatsApp. */
export function ServiceForm({ campos, stockOptions, formT, formHl, cta, ok, intro }: ServiceFormProps) {
  const initial = () =>
    Object.fromEntries(campos.filter((c) => c.fromStock).map((c) => [c.name, stockOptions[0] ?? ""]));
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [consent, setConsent] = useState(false);
  const [touched, setTouched] = useState(false);
  const [sentHref, setSentHref] = useState<string | null>(null);

  const errors = Object.fromEntries(
    campos.filter((c) => c.type === "text").map((c) => [c.name, validate(c.mask, values[c.name] ?? "", c.required)]),
  );
  for (const c of campos) {
    if (c.type === "select" && c.required && !values[c.name]) errors[c.name] = "Selecione uma opção";
  }
  const consentError = !consent ? "Autorize o contato para continuar" : null;
  const valid = Object.values(errors).every((e) => !e) && !consentError;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!valid) {
      const first = campos.find((c) => errors[c.name]);
      if (first) document.getElementById(`campo-${first.name}`)?.focus();
      return;
    }
    const fields = Object.fromEntries(
      campos.filter((c) => c.type !== "file").map((c) => [c.label.replace(" / WhatsApp", ""), values[c.name]]),
    );
    if (photos.length) fields.Fotos = `${photos.length} (envio por aqui)`;
    setSentHref(whatsappLink(formMessage(intro, fields)));
  }

  function reset() {
    setValues(initial());
    setPhotos([]);
    setConsent(false);
    setTouched(false);
    setSentHref(null);
  }

  if (sentHref) {
    return (
      <SuccessState
        title={
          <>
            Solicitação <Hl>enviada!</Hl>
          </>
        }
        whatsappHref={sentHref}
        resetLabel="Enviar outra solicitação"
        onReset={reset}
      >
        {ok} Quer agilizar? Chame a gente direto no WhatsApp.
      </SuccessState>
    );
  }

  return (
    <form noValidate onSubmit={submit}>
      <p className="font-title text-[clamp(28px,3.4vw,36px)] leading-none">
        {formT} <Hl>{formHl}</Hl>
      </p>
      <p className="mb-[22px] mt-2 text-sm text-muted">Responderemos em até 1 hora útil pelo WhatsApp.</p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        {campos.map((c) => {
          const error = touched ? errors[c.name] : null;
          const span = c.full && "col-span-full";
          const common = {
            id: `campo-${c.name}`,
            name: c.name,
            "aria-invalid": !!error,
            "aria-describedby": error ? `erro-${c.name}` : undefined,
            required: c.required,
          };

          if (c.type === "file") {
            return (
              <div key={c.name} className={cn("flex flex-col gap-1.5", span)}>
                <FieldLabel>{c.label}</FieldLabel>
                <FileDropzone photos={photos} onChange={setPhotos} />
              </div>
            );
          }

          return (
            <Field key={c.name} label={c.label} error={error} errorId={`erro-${c.name}`} className={span || undefined}>
              {c.type === "select" ? (
                <select
                  {...common}
                  value={values[c.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [c.name]: e.target.value }))}
                  className={cn(fieldClasses(error), "h-[46px] px-3")}
                >
                  {!c.fromStock && <option value="">Selecione</option>}
                  {(c.fromStock ? stockOptions : c.options ?? []).map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              ) : (
                <input
                  {...common}
                  type={c.mask === "phone" ? "tel" : "text"}
                  inputMode={c.mask ? "numeric" : undefined}
                  autoComplete={c.name === "nome" ? "name" : c.mask === "phone" ? "tel" : c.mask === "cep" ? "postal-code" : "off"}
                  placeholder={c.placeholder}
                  value={values[c.name] ?? ""}
                  onChange={(e) => setValues((v) => ({ ...v, [c.name]: applyMask(c.mask, e.target.value) }))}
                  className={cn(fieldClasses(error), "h-[46px] px-3.5")}
                />
              )}
            </Field>
          );
        })}
      </div>

      <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-xs leading-normal text-muted">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="peer sr-only" />
        <span
          aria-hidden="true"
          className={cn(
            "flex size-[18px] shrink-0 items-center justify-center rounded border-[1.5px] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary",
            consent ? "border-primary bg-primary" : touched ? "border-danger" : "border-white/30",
          )}
        >
          {consent && <Check className="size-3 text-white" strokeWidth={3} />}
        </span>
        Autorizo a 1000 Giros a entrar em contato pelo WhatsApp e concordo com a política de privacidade.
      </label>

      <button
        type="submit"
        className="mt-5 flex h-[54px] w-full items-center justify-center gap-2.5 rounded-md bg-primary font-cta text-[19px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
      >
        <Send className="size-[18px]" />
        {cta}
      </button>
    </form>
  );
}

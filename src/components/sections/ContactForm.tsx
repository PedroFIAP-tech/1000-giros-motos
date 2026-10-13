"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { Field, fieldClasses } from "@/components/ui/Field";
import { Hl } from "@/components/ui/SectionTitle";
import { SuccessState } from "@/components/ui/SuccessState";
import { applyMask, validate } from "@/lib/masks";
import { formMessage, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

const assuntos = [
  "Quero comprar uma moto",
  "Financiamento",
  "Vender / consignar minha moto",
  "Seguro",
  "Outro assunto",
];

const empty = { nome: "", telefone: "", email: "", assunto: assuntos[0], mensagem: "" };

function emailError(v: string) {
  return v.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "E-mail inválido" : null;
}

/** "Mande sua mensagem": valida e entrega a mensagem pronta no WhatsApp. */
export function ContactForm() {
  const [v, setV] = useState(empty);
  const [touched, setTouched] = useState(false);
  const [sentHref, setSentHref] = useState<string | null>(null);

  const errors = {
    nome: validate(undefined, v.nome, true),
    telefone: validate("phone", v.telefone, true),
    email: emailError(v.email),
  };
  const set = (key: keyof typeof empty, value: string) => setV((prev) => ({ ...prev, [key]: value }));
  const err = (key: keyof typeof errors) => (touched ? errors[key] : null);
  const a11y = (key: keyof typeof errors) => ({
    id: `contato-${key}`,
    "aria-invalid": !!err(key),
    "aria-describedby": err(key) ? `contato-erro-${key}` : undefined,
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const first = (Object.keys(errors) as (keyof typeof errors)[]).find((k) => errors[k]);
    if (first) {
      document.getElementById(`contato-${first}`)?.focus();
      return;
    }
    setSentHref(
      whatsappLink(
        formMessage(`Olá! Vim pelo site — ${v.assunto}.`, {
          Nome: v.nome,
          Telefone: v.telefone,
          "E-mail": v.email,
          Mensagem: v.mensagem,
        }),
      ),
    );
  }

  if (sentHref) {
    return (
      <SuccessState
        compact
        title={
          <>
            Mensagem <Hl>enviada!</Hl>
          </>
        }
        whatsappHref={sentHref}
        ctaLabel="Abrir WhatsApp"
        resetLabel="Enviar outra"
        onReset={() => {
          setV(empty);
          setTouched(false);
          setSentHref(null);
        }}
      >
        Já recebemos. Se preferir, continue a conversa pelo WhatsApp.
      </SuccessState>
    );
  }

  return (
    <form noValidate onSubmit={submit}>
      <p className="font-title text-[clamp(28px,3.4vw,36px)] leading-none">
        Mande sua <Hl>mensagem</Hl>
      </p>
      <p className="mb-[22px] mt-2 text-sm text-muted">
        Respondemos em horário comercial, normalmente em menos de 1 hora.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3.5">
        <Field label="Nome" error={err("nome")} errorId="contato-erro-nome" className="col-span-full">
          <input
            {...a11y("nome")}
            autoComplete="name"
            placeholder="Seu nome"
            value={v.nome}
            onChange={(e) => set("nome", e.target.value)}
            className={cn(fieldClasses(err("nome")), "h-[46px] px-3.5")}
          />
        </Field>
        <Field label="Telefone" error={err("telefone")} errorId="contato-erro-telefone">
          <input
            {...a11y("telefone")}
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            placeholder="(11) 90000-0000"
            value={v.telefone}
            onChange={(e) => set("telefone", applyMask("phone", e.target.value))}
            className={cn(fieldClasses(err("telefone")), "h-[46px] px-3.5")}
          />
        </Field>
        <Field label="E-mail" error={err("email")} errorId="contato-erro-email">
          <input
            {...a11y("email")}
            type="email"
            autoComplete="email"
            placeholder="voce@email.com"
            value={v.email}
            onChange={(e) => set("email", e.target.value)}
            className={cn(fieldClasses(err("email")), "h-[46px] px-3.5")}
          />
        </Field>
        <Field label="Assunto" errorId="contato-erro-assunto" className="col-span-full">
          <select
            value={v.assunto}
            onChange={(e) => set("assunto", e.target.value)}
            className={cn(fieldClasses(), "h-[46px] px-3")}
          >
            {assuntos.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </Field>
        <Field label="Mensagem" errorId="contato-erro-mensagem" className="col-span-full">
          <textarea
            rows={5}
            placeholder="Como podemos ajudar?"
            value={v.mensagem}
            onChange={(e) => set("mensagem", e.target.value)}
            className={cn(fieldClasses(), "resize-y px-3.5 py-3")}
          />
        </Field>
      </div>

      <button
        type="submit"
        className="mt-5 flex h-[54px] w-full items-center justify-center gap-2.5 rounded-md bg-primary font-cta text-[19px] text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary-hover"
      >
        <Send className="size-[18px]" />
        Enviar mensagem
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { FieldLabel, fieldClasses } from "@/components/ui/Field";
import { Hl } from "@/components/ui/SectionTitle";
import { cn } from "@/lib/utils";

/** Login só visual: "Entrar" abre o painel (autenticação entra com o banco). */
export function LoginForm() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [keep, setKeep] = useState(true);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push("/admin");
      }}
      className="w-full rounded-[10px] border border-white/8 bg-surface px-7 py-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]"
    >
      <h1 className="font-title text-[32px] leading-none">
        Painel <Hl>admin</Hl>
      </h1>
      <p className="mb-6 mt-1.5 text-sm text-muted">Entre para gerenciar estoque e leads.</p>
      <div className="flex flex-col gap-3.5">
        <label className="flex flex-col gap-1.5">
          <FieldLabel>E-mail</FieldLabel>
          <span className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-3.5 size-[17px] text-dim" />
            <input
              type="email"
              autoComplete="username"
              placeholder="admin@1000giros.com.br"
              className={cn(fieldClasses(), "h-[46px] pl-[42px] pr-3.5")}
            />
          </span>
        </label>
        <div className="flex flex-col gap-1.5">
          <span className="flex justify-between">
            <label htmlFor="admin-senha">
              <FieldLabel>Senha</FieldLabel>
            </label>
            <a href="#" className="text-xs font-medium text-primary">
              Esqueci a senha
            </a>
          </span>
          <span className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-3.5 size-[17px] text-dim" />
            <input
              id="admin-senha"
              type={show ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              className={cn(fieldClasses(), "h-[46px] pl-[42px] pr-11")}
            />
            <button
              type="button"
              aria-label={show ? "Ocultar senha" : "Mostrar senha"}
              onClick={() => setShow((s) => !s)}
              className="absolute right-1.5 top-1.5 flex size-[34px] items-center justify-center text-muted hover:text-white"
            >
              {show ? <EyeOff className="size-[17px]" /> : <Eye className="size-[17px]" />}
            </button>
          </span>
        </div>
        <Checkbox checked={keep} onChange={setKeep} className="text-[13px] text-soft">
          Manter conectado
        </Checkbox>
        <button
          type="submit"
          className="mt-1.5 flex h-[50px] items-center justify-center gap-2.5 rounded-md bg-primary font-cta text-lg text-white transition-colors hover:bg-primary-hover"
        >
          Entrar
          <ArrowRight className="size-4" />
        </button>
      </div>
    </form>
  );
}

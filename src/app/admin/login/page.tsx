import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Entrar",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-bg bg-[radial-gradient(ellipse_at_50%_0%,rgba(229,22,29,0.16),transparent_55%)] px-[18px] py-8">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-[26px]">
        <Logo className="h-14" />
        <LoginForm />
        <Link href="/" className="flex items-center gap-1.5 text-[13px] text-muted">
          <ArrowLeft className="size-4" />
          Voltar para o site
        </Link>
      </div>
    </main>
  );
}

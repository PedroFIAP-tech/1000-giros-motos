import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { NotFoundScene } from "@/components/not-found/NotFoundScene";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="relative isolate flex flex-1 overflow-hidden">
        <NotFoundScene />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/ui/icons";
import { whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Página não encontrada",
};

/**
 * Fica na raiz do app (fora do grupo (site)), então renderiza Header/Footer
 * por conta própria para manter o visual em qualquer URL inexistente.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="conteudo" className="relative isolate flex flex-1 items-center overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.2),transparent_65%)]"
        />
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 select-none text-center font-title text-[40vw] leading-none text-white/[0.03] lg:text-[28rem]"
        >
          404
        </p>

        <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-32 text-center sm:px-6 lg:px-8">
          <p className="mb-4 inline-flex items-center gap-3 font-display text-sm font-bold uppercase tracking-widest text-primary">
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
            Erro 404
            <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          </p>
          <h1 className="font-title text-5xl sm:text-6xl lg:text-8xl">
            Saiu da <span className="text-primary">pista!</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted">
            A página que você procura não existe ou mudou de endereço. Mas a sua próxima moto
            continua esperando por você.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button href="/estoque">
              Ver estoque
              <ArrowRightIcon className="size-5" />
            </Button>
            <Button href={whatsappLink()} external variant="outline">
              <WhatsAppIcon className="size-5" />
              Fale no WhatsApp
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

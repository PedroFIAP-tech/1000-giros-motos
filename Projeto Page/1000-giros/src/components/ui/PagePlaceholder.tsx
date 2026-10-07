import { ArrowRightIcon } from "./icons";
import { Button } from "./Button";

type PagePlaceholderProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
};

/** Página provisória: só o título, até a fase que implementa a rota. */
export function PagePlaceholder({
  eyebrow = "1000 Giros Motos",
  title,
  description = "Página em construção. Em breve, novidades por aqui.",
}: PagePlaceholderProps) {
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(225,6,0,0.18),transparent_60%)]"
      />
      <div className="mx-auto flex min-h-[70dvh] max-w-7xl flex-col justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
        <p className="mb-4 flex items-center gap-3 font-display text-sm font-bold uppercase tracking-widest text-primary">
          <span aria-hidden="true" className="h-0.5 w-8 bg-primary" />
          {eyebrow}
        </p>
        <h1 className="font-title text-5xl sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{description}</p>
        <div className="mt-10">
          <Button href="/" variant="outline">
            Voltar para a home
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

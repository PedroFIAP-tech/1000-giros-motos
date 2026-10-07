import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export default function HomePage() {
  return (
    <PagePlaceholder
      title={
        <>
          Sua próxima
          <br />
          <span className="text-primary">moto</span> está aqui.
        </>
      }
      description="A home completa chega na Fase 3."
    />
  );
}

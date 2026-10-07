import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Estoque",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Nosso estoque" title={<>Motos <span className="text-primary">seminovas</span></>} />;
}

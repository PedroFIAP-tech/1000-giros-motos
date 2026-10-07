import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Contato",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Contato" title={<>Fale <span className="text-primary">com a gente</span></>} />;
}

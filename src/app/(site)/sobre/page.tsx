import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Sobre Nós",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Sobre nós" title={<>Mais que uma loja, <span className="text-primary">uma paixão</span></>} />;
}

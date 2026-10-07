import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Favoritos",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Favoritos" title={<>Suas motos <span className="text-primary">favoritas</span></>} />;
}

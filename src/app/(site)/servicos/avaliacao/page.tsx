import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { servicos } from "@/data/servicos";

export const metadata: Metadata = {
  title: "Avaliação",
  description: servicos.avaliacao.sub,
};

export default function AvaliacaoPage() {
  return <ServicePage servico="avaliacao" />;
}

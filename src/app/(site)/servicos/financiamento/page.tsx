import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { servicos } from "@/data/servicos";

export const metadata: Metadata = {
  title: "Financiamento",
  description: servicos.financiamento.sub,
};

export default function FinanciamentoPage() {
  return <ServicePage servico="financiamento" />;
}

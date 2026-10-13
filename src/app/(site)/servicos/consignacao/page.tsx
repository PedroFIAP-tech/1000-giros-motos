import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { servicos } from "@/data/servicos";

export const metadata: Metadata = {
  title: "Consignação",
  description: servicos.consignacao.sub,
};

export default function ConsignacaoPage() {
  return <ServicePage servico="consignacao" />;
}

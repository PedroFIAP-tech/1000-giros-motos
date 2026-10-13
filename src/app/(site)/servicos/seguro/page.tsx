import type { Metadata } from "next";
import { ServicePage } from "@/components/sections/ServicePage";
import { servicos } from "@/data/servicos";

export const metadata: Metadata = {
  title: "Seguro",
  description: servicos.seguro.sub,
};

export default function SeguroPage() {
  return <ServicePage servico="seguro" />;
}

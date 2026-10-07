import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Financiamento",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Serviços" title={<span className="text-primary">Financiamento</span>} />;
}

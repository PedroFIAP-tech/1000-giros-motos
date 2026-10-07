import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/ui/PagePlaceholder";

export const metadata: Metadata = {
  title: "Consignação",
};

export default function Page() {
  return <PagePlaceholder eyebrow="Serviços" title={<span className="text-primary">Consignação</span>} />;
}

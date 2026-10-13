import type { Metadata } from "next";
import { MotoForm } from "@/components/admin/MotoForm";

export const metadata: Metadata = {
  title: "Cadastrar moto",
};

export default function AdminNovaMotoPage() {
  return <MotoForm />;
}

import type { Metadata } from "next";
import { MotosTable } from "@/components/admin/MotosTable";

export const metadata: Metadata = {
  title: "Motos",
};

export default function AdminMotosPage() {
  return <MotosTable />;
}

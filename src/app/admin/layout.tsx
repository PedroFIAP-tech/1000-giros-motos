import type { Metadata } from "next";

/**
 * Painel admin: só visual por enquanto (dados mockados, sem login real).
 * Fora do grupo (site), então não herda header/rodapé públicos. Nada no
 * site público aponta para cá, e nenhuma página do painel é indexada.
 */
export const metadata: Metadata = {
  title: {
    default: "Painel admin",
    template: "%s | Painel 1000 Giros",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}

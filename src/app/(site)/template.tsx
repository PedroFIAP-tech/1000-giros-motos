import { ViewTransition } from "react";

/**
 * O template remonta a cada navegação (o layout não), então é aqui que
 * as animações de entrada/saída de página disparam. CSS em globals.css.
 */
export default function SiteTemplate({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}

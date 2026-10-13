"use client";

import { Heart } from "lucide-react";
import { motion, useAnimationControls } from "motion/react";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";

/** Coração que alterna o favorito; faz "pop" (1 → 1.3 → 1) ao favoritar. */
export function FavoriteButton({
  slug,
  nome,
  className,
  iconClassName = "size-[17px]",
  activeColor = "text-primary",
  idleColor = "text-soft",
}: {
  slug: string;
  nome: string;
  className?: string;
  iconClassName?: string;
  activeColor?: string;
  idleColor?: string;
}) {
  const { isFavorite, toggle } = useFavorites();
  const controls = useAnimationControls();
  const active = isFavorite(slug);

  return (
    <button
      type="button"
      title="Favoritar"
      aria-label={active ? `Remover ${nome} dos favoritos` : `Favoritar ${nome}`}
      aria-pressed={active}
      onClick={() => {
        if (!active) controls.start({ scale: [1, 1.3, 1], transition: { duration: 0.35 } });
        toggle(slug);
      }}
      className={cn("flex cursor-pointer items-center justify-center", active ? activeColor : idleColor, className)}
    >
      <motion.span animate={controls} className="flex">
        <Heart className={iconClassName} />
      </motion.span>
    </button>
  );
}

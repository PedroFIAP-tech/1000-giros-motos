import { twMerge } from "tailwind-merge";

/** Junta classes condicionais; em conflito (ex.: h-11 + h-9), vence a última. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}

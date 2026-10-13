"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform, motion } from "motion/react";

/** Número que "conta" até o novo valor quando muda (ex.: parcela do simulador). */
export function AnimatedNumber({
  value,
  format,
  duration = 0.4,
}: {
  value: number;
  format: (n: number) => string;
  duration?: number;
}) {
  const mv = useMotionValue(value);
  const text = useTransform(mv, format);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const controls = animate(mv, value, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [mv, value, duration]);

  return <motion.span>{text}</motion.span>;
}

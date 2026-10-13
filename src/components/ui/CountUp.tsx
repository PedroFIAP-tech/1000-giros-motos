"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "motion/react";

/** "+500", "98%": conta de 0 até o número quando entra na tela (prefixo/sufixo mantidos). */
export function CountUp({ value, duration = 1.4 }: { value: string; duration?: number }) {
  const match = value.match(/^(\D*)(\d+)(\D*)$/);
  const [, prefix = "", digits = "0", suffix = ""] = match ?? [];
  const target = Number(digits);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const text = useTransform(mv, (n) => `${prefix}${Math.round(n)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, target, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, mv, target, duration]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <motion.span aria-hidden="true">{text}</motion.span>
    </span>
  );
}

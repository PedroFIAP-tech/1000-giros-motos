"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

/** Lista cujos itens entram em sequência quando aparecem na tela. */
export function RevealList({
  as = "ul",
  className,
  children,
}: {
  as?: "ul" | "ol";
  className?: string;
  children: ReactNode;
}) {
  const Tag = as === "ol" ? motion.ol : motion.ul;
  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <motion.li variants={item} className={className}>
      {children}
    </motion.li>
  );
}

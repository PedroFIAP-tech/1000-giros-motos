"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";

/** Foto de fundo do hero com parallax leve ao rolar. */
export function ParallaxImage({ src, alt, position }: { src: string; alt: string; position?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <Image src={src} alt={alt} fill preload sizes="100vw" className="object-cover" style={{ objectPosition: position }} />
      </motion.div>
    </div>
  );
}

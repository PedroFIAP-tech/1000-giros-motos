"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

const TERMINAL_TEXT = "ERRO 404 // SINAL PERDIDO";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

type Star = { x: number; y: number; z: number; r: number; tw: number };

function Starfield({
  pointer,
  reduced,
}: {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let raf = 0;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const { x: px, y: py } = pointer.current;

      for (const star of stars) {
        if (!reduced) {
          star.y += star.z * 0.15;
          if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
          }
        }

        const offsetX = -px * 40 * star.z;
        const offsetY = -py * 40 * star.z;
        const twinkle = reduced ? 1 : Math.abs(Math.sin(time * 1.5 + star.tw));
        const alpha = 0.25 + 0.75 * twinkle * star.z;

        ctx.beginPath();
        ctx.arc(star.x + offsetX, star.y + offsetY, star.r * star.z + 0.2, 0, Math.PI * 2);
        ctx.fillStyle =
          star.z > 0.88 ? `rgba(255, 70, 60, ${alpha})` : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.floor((width * height) / 3500), 450);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.4 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));

      if (reduced) draw();
    };

    const loop = () => {
      time += 0.016;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    if (!reduced) loop();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [pointer, reduced]);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 -z-10 size-full" />;
}

function GlitchDigit({
  children,
  delay,
  reduced,
}: {
  children: ReactNode;
  delay: number;
  reduced: boolean;
}) {
  const glitch = (direction: 1 | -1) =>
    reduced
      ? undefined
      : {
          x: [0, -8 * direction, 5 * direction, -3 * direction, 0, 0],
          opacity: [0, 0.9, 0.8, 0.9, 0, 0],
        };

  const transition = {
    duration: 0.45,
    repeat: Infinity,
    repeatDelay: 2.4 + delay,
    ease: "linear" as const,
  };

  return (
    <span className="relative inline-block">
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 text-primary mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={glitch(1)}
        transition={transition}
      >
        {children}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 text-cyan-400 mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={glitch(-1)}
        transition={transition}
      >
        {children}
      </motion.span>
      <span className="relative">{children}</span>
    </span>
  );
}

function Planet({ reduced }: { reduced: boolean }) {
  return (
    <motion.span
      aria-hidden="true"
      className="relative mx-[0.06em] inline-block size-[0.72em] align-middle"
      animate={reduced ? undefined : { y: [0, -12, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ff5a4f_0%,#b30500_45%,#2a0100_100%)] shadow-[0_0_80px_rgba(225,6,0,0.55),inset_-18px_-18px_40px_rgba(0,0,0,0.6)]" />
      <span className="absolute left-[22%] top-[30%] size-[14%] rounded-full bg-black/30" />
      <span className="absolute left-[55%] top-[58%] size-[10%] rounded-full bg-black/25" />
      <span className="absolute left-[60%] top-[22%] size-[6%] rounded-full bg-black/20" />

      <motion.span
        className="absolute -inset-[28%] rounded-full border-2 border-white/25"
        style={{ rotateX: 72 }}
        animate={reduced ? undefined : { rotateZ: 360 }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      >
        <span className="absolute -top-[0.06em] left-1/2 size-[0.1em] -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_6px_rgba(255,255,255,0.6)]" />
      </motion.span>
    </motion.span>
  );
}

function TerminalLine({ reduced }: { reduced: boolean }) {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    if (reduced) {
      setTyped(TERMINAL_TEXT);
      return;
    }
    let index = 0;
    const id = setInterval(() => {
      index += 1;
      setTyped(TERMINAL_TEXT.slice(0, index));
      if (index >= TERMINAL_TEXT.length) clearInterval(id);
    }, 55);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <p className="font-mono text-xs tracking-[0.3em] text-primary sm:text-sm" aria-label={TERMINAL_TEXT}>
      <span aria-hidden="true">
        {typed}
        <motion.span
          className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-primary"
          animate={reduced ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: "steps(1)" as never }}
        />
      </span>
    </p>
  );
}

export function NotFoundScene() {
  const reduced = useReducedMotion() ?? false;
  const router = useRouter();
  const pathname = usePathname();
  const pointer = useRef({ x: 0, y: 0 });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  const moveX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const moveY = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-14, 14]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      pointer.current = { x, y };
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY, reduced]);

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center px-4 pb-20 pt-32 sm:px-6 lg:px-8">
      <Starfield pointer={pointer} reduced={reduced} />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.18),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-black to-transparent"
      />

      <motion.div
        className="mx-auto flex w-full max-w-4xl flex-col items-center text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <TerminalLine reduced={reduced} />
        </motion.div>

        <motion.div variants={item} className="my-6" style={{ perspective: 1000 }}>
          <motion.h1
            className="select-none font-title text-[clamp(7rem,24vw,17rem)] leading-none"
            style={{ x: moveX, y: moveY, rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <span className="sr-only">Erro 404</span>
            <span aria-hidden="true" className="inline-flex items-center">
              <GlitchDigit delay={0} reduced={reduced}>
                4
              </GlitchDigit>
              <Planet reduced={reduced} />
              <GlitchDigit delay={0.7} reduced={reduced}>
                4
              </GlitchDigit>
            </span>
          </motion.h1>
        </motion.div>

        <motion.h2 variants={item} className="font-title text-3xl sm:text-4xl lg:text-5xl">
          Essa página saiu da <span className="text-primary">órbita.</span>
        </motion.h2>

        <motion.p variants={item} className="mx-auto mt-5 max-w-md text-base text-muted sm:text-lg">
          O link pode estar quebrado ou a página mudou de endereço. Relaxa, a gente te leva de volta.
        </motion.p>

        <motion.p
          variants={item}
          className="mt-4 max-w-full truncate rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-white/50"
        >
          rota não encontrada: <span className="text-white/80">{pathname}</span>
        </motion.p>

        <motion.div variants={item} className="mt-10 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Button href="/">
            Voltar para a home
            <ArrowRightIcon className="size-5" />
          </Button>
          <button
            type="button"
            onClick={goBack}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-display text-sm font-bold uppercase tracking-wide text-white transition hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Página anterior
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
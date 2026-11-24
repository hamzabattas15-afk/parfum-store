"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ProductViewer from "@/components/product/ProductViewer";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBottle = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* halo décoratif */}
      <div
        aria-hidden
        className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(17,17,17,0.06),transparent_70%)] dark:bg-[radial-gradient(circle,rgba(245,241,234,0.07),transparent_70%)] blur-2xl"
      />

      <div className="container-lux grid items-center gap-12 pt-36 pb-24 lg:grid-cols-2 lg:pt-44 lg:pb-36">
        <motion.div style={{ y: yText, opacity }} className="order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
            className="text-xs uppercase tracking-[0.35em] opacity-50"
          >
            Maison de parfum · Paris
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.35 }}
            className="font-serif-display mt-6 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl"
          >
            L&apos;art du parfum,
            <br />
            <em className="italic opacity-80">à l&apos;état pur.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.55 }}
            className="mt-8 max-w-md text-base leading-relaxed opacity-60"
          >
            Des eaux de parfum d&apos;exception, composées à partir des matières
            premières les plus rares. Faites tourner le flacon — chaque
            détail compte.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/boutique" className="btn-primary">
              Découvrir la collection
            </Link>
            <Link href="/a-propos" className="btn-outline">
              Notre histoire
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: yBottle }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="order-1 lg:order-2"
        >
          <ProductViewer
            framesPath="/products/nuit-dombre"
            frameCount={24}
            autoplay
            autoplaySpeed={9}
            eager
            className="shadow-2xl shadow-primary/10"
          />
        </motion.div>
      </div>
    </section>
  );
}

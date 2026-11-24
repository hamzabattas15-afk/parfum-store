"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice, collections } from "@/data/products";

/**
 * Carte produit avec effet tilt + zoom au survol.
 */
export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 150, damping: 20 });

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const collectionLabel = collections.find((c) => c.key === product.collection)?.label;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 }}
      style={{ perspective: 900 }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          mx.set(0.5);
          my.set(0.5);
        }}
        style={{ rotateX, rotateY }}
        className="group relative rounded-2xl bg-white/50 dark:bg-white/5 shadow-sm hover:shadow-xl transition-shadow duration-500"
      >
        <Link href={`/produit/${product.slug}`} className="block">
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl">
            <motion.div
              animate={{ scale: hovered ? 1.06 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="h-full w-full"
            >
              <Image
                src={product.images[0]}
                alt={`${product.name} — flacon`}
                fill
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover"
              />
            </motion.div>
            <span className="absolute left-3 top-3 rounded-full bg-secondary/90 dark:bg-primary/80 px-3 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur">
              {collectionLabel}
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-5">
            <div>
              <h3 className="font-serif-display text-lg">{product.name}</h3>
              <p className="mt-1 text-xs opacity-50 line-clamp-1">
                {product.notes.heart.slice(0, 2).join(" · ")}
              </p>
            </div>
            <span className="text-sm whitespace-nowrap font-medium">
              {formatPrice(product.sizes.find((s) => s.ml === 50)?.price ?? product.price)}
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

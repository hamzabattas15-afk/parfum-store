"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { collections, type Collection } from "@/data/products";

/**
 * Barre de filtres boutique — liens vers /boutique?collection=…
 * (filtrage serveur, partageable et SEO-friendly).
 */
export default function ShopFilter({ active }: { active?: Collection }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const buildHref = (key?: Collection) => {
    const params = new URLSearchParams(searchParams.toString());
    if (key) params.set("collection", key);
    else params.delete("collection");
    const qs = params.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="container-lux pb-10">
      <motion.nav
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        aria-label="Filtrer par famille olfactive"
        className="flex flex-wrap justify-center gap-3"
      >
        <Link
          href={buildHref()}
          className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
            !active
              ? "bg-primary text-secondary dark:bg-secondary dark:text-primary"
              : "border border-primary/20 dark:border-secondary/20 hover:border-primary dark:hover:border-secondary"
          }`}
        >
          Tout
        </Link>
        {collections.map((c) => (
          <Link
            key={c.key}
            href={buildHref(c.key)}
            className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
              active === c.key
                ? "bg-primary text-secondary dark:bg-secondary dark:text-primary"
                : "border border-primary/20 dark:border-secondary/20 hover:border-primary dark:hover:border-secondary"
            }`}
          >
            {c.label}
          </Link>
        ))}
      </motion.nav>
    </div>
  );
}

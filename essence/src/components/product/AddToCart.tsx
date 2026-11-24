"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/data/products";
import { formatPrice } from "@/data/products";
import { useCart } from "@/lib/store";

/**
 * Sélecteur de format + ajout au panier.
 */
export default function AddToCart({ product }: { product: Product }) {
  const [sizeMl, setSizeMl] = useState(50);
  const size =
    product.sizes.find((s) => s.ml === sizeMl) ?? product.sizes[0];
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const onAdd = () => {
    addItem(product, size, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <div>
      {/* sélection du format */}
      <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
        Choisir le format
      </p>
      <div className="mt-3 flex flex-wrap gap-3">
        {product.sizes.map((s) => {
          const selected = s.ml === size.ml;
          return (
            <button
              key={s.ml}
              onClick={() => setSizeMl(s.ml)}
              disabled={s.stock === 0}
              className={`relative rounded-2xl px-5 py-3 text-sm transition-all duration-300 ${
                selected
                  ? "bg-primary text-secondary dark:bg-secondary dark:text-primary shadow-lg"
                  : "border border-primary/20 dark:border-secondary/20 hover:border-primary dark:hover:border-secondary"
              } ${s.stock === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              {s.ml} ml
              <span className="ml-2 text-xs opacity-60">
                {formatPrice(s.price)}
              </span>
              {s.stock === 0 && (
                <span className="absolute -top-2 -right-2 rounded-full bg-primary text-secondary dark:bg-secondary dark:text-primary px-2 py-0.5 text-[9px] uppercase tracking-wider">
                  Épuisé
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* bouton d'achat */}
      <div className="mt-8 flex items-center gap-6">
        <button
          onClick={onAdd}
          disabled={size.stock === 0}
          className="btn-primary flex-1 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed"
        >
          {size.stock === 0
            ? "Format épuisé"
            : justAdded
              ? "Ajouté au panier ✓"
              : `Ajouter — ${formatPrice(size.price)}`}
        </button>
        <AnimatePresence>
          {justAdded && (
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs opacity-60"
            >
              Le panier s&apos;est ouvert
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

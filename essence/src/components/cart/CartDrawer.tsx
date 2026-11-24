"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart, cartTotal } from "@/lib/store";
import { formatPrice } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";

const spring = { type: "spring" as const, stiffness: 300, damping: 32 };

export default function CartDrawer() {
  const { items, isOpen, close, removeItem, setQuantity } = useCart();
  const total = cartTotal(items);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={close}
            className="fixed inset-0 z-[60] bg-primary/40 backdrop-blur-sm"
            aria-hidden
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={spring}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-secondary dark:bg-primary shadow-2xl"
            role="dialog"
            aria-label="Panier"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-primary/10 dark:border-secondary/10">
              <h2 className="font-serif-display text-xl">Votre panier</h2>
              <button
                onClick={close}
                aria-label="Fermer le panier"
                className="rounded-2xl p-2 hover:bg-primary/5 dark:hover:bg-secondary/10 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                  <p className="opacity-50">Votre panier est vide.</p>
                  <Link href="/boutique" onClick={close} className="btn-outline text-xs">
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <motion.li
                      key={`${item.productSlug}-${item.sizeMl}`}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      className="flex gap-4"
                    >
                      <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl bg-primary/5 dark:bg-secondary/10">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-serif-display text-base">{item.name}</h3>
                            <button
                              onClick={() => removeItem(item.productSlug, item.sizeMl)}
                              className="text-xs opacity-40 hover:opacity-100 transition-opacity"
                              aria-label={`Retirer ${item.name}`}
                            >
                              Retirer
                            </button>
                          </div>
                          <p className="text-xs opacity-50 mt-0.5">Eau de parfum · {item.sizeMl} ml</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 rounded-full border border-primary/15 dark:border-secondary/15 px-3 py-1">
                            <button
                              onClick={() => setQuantity(item.productSlug, item.sizeMl, item.quantity - 1)}
                              className="text-sm opacity-60 hover:opacity-100"
                              aria-label="Diminuer la quantité"
                            >
                              −
                            </button>
                            <span className="text-sm tabular-nums">{item.quantity}</span>
                            <button
                              onClick={() => setQuantity(item.productSlug, item.sizeMl, item.quantity + 1)}
                              className="text-sm opacity-60 hover:opacity-100"
                              aria-label="Augmenter la quantité"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-primary/10 dark:border-secondary/10 px-6 py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="opacity-60">Sous-total</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <p className="text-xs opacity-40">
                  {total < siteConfig.shipping.freeThreshold
                    ? `Livraison offerte dès ${formatPrice(siteConfig.shipping.freeThreshold)} d'achat.`
                    : "Livraison offerte 🎉"}
                </p>
                <Link
                  href="/commande"
                  onClick={close}
                  className="btn-primary w-full"
                >
                  Passer commande
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

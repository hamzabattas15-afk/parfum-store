"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart, cartTotal } from "@/lib/store";
import { formatPrice } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import Reveal from "@/components/Reveal";

const inputCls =
  "w-full rounded-2xl border border-primary/15 dark:border-secondary/15 bg-white/60 dark:bg-white/5 px-5 py-3.5 text-sm outline-none focus:border-primary/50 dark:focus:border-secondary/50 transition-colors placeholder:opacity-40";

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", city: "", address: "", note: "" });
  const [sent, setSent] = useState(false);

  const total = cartTotal(items);
  const shipping = total >= siteConfig.shipping.freeThreshold || total === 0 ? 0 : siteConfig.shipping.flatRate;
  const grandTotal = total + shipping;

  const orderText = useMemo(() => {
    if (items.length === 0) return "";
    const lines = items.map(
      (i) => `• ${i.name} — ${i.sizeMl} ml × ${i.quantity} : ${formatPrice(i.price * i.quantity)}`
    );
    return [
      `Bonjour, je souhaite commander chez ${siteConfig.storeName} :`,
      "",
      ...lines,
      "",
      `Sous-total : ${formatPrice(total)}`,
      `Livraison : ${shipping === 0 ? "offerte" : formatPrice(shipping)}`,
      `Total : ${formatPrice(grandTotal)}`,
      "",
      `Nom : ${form.name || "—"}`,
      `Téléphone : ${form.phone || "—"}`,
      `Ville : ${form.city || "—"}`,
      `Adresse : ${form.address || "—"}`,
      form.note ? `Note : ${form.note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  }, [items, form, total, shipping, grandTotal]);

  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(orderText)}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    window.open(whatsappUrl, "_blank", "noopener");
    setSent(true);
  };

  if (sent) {
    return (
      <section className="container-lux pt-36 pb-24 flex flex-col items-center text-center min-h-[60vh] justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-5xl">✓</p>
          <h1 className="font-serif-display mt-6 text-4xl">Commande envoyée</h1>
          <p className="mt-4 max-w-md text-sm opacity-60">
            Votre récapitulatif a été transmis via WhatsApp. Notre équipe vous
            confirme la commande et la livraison sous peu.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Rouvrir WhatsApp
            </a>
            <button
              onClick={() => {
                clear();
                setSent(false);
              }}
              className="btn-primary"
            >
              Vider le panier
            </button>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="container-lux pt-36 pb-24">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] opacity-50">Finaliser</p>
        <h1 className="font-serif-display mt-4 text-4xl sm:text-5xl">Votre commande</h1>
        <p className="mt-4 text-sm opacity-50">
          Commande par WhatsApp — paiement à la livraison.
        </p>
      </Reveal>

      {items.length === 0 ? (
        <Reveal className="mt-16 text-center">
          <p className="opacity-50">Votre panier est vide.</p>
          <Link href="/boutique" className="btn-outline mt-6">
            Découvrir la boutique
          </Link>
        </Reveal>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          {/* formulaire */}
          <Reveal>
            <form onSubmit={submit} className="card-lux p-8 space-y-5">
              <h2 className="font-serif-display text-xl">Livraison</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <input
                  required
                  placeholder="Nom complet *"
                  className={inputCls}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                  required
                  type="tel"
                  placeholder="Téléphone *"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <input
                required
                placeholder="Ville *"
                className={inputCls}
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
              <input
                required
                placeholder="Adresse complète *"
                className={inputCls}
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              <textarea
                placeholder="Note (optionnel) — étage, heure de livraison…"
                rows={3}
                className={`${inputCls} resize-none`}
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
              />
              <button type="submit" className="btn-primary w-full">
                Envoyer la commande via WhatsApp
              </button>
              <p className="text-xs opacity-40 text-center">
                Un récapitulatif complet sera généré automatiquement.
              </p>
            </form>
          </Reveal>

          {/* récapitulatif */}
          <Reveal delay={0.1}>
            <div className="card-lux p-8 h-fit lg:sticky lg:top-28">
              <h2 className="font-serif-display text-xl">Récapitulatif</h2>
              <ul className="mt-6 space-y-5">
                {items.map((item) => (
                  <li key={`${item.productSlug}-${item.sizeMl}`} className="flex gap-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl bg-primary/5 dark:bg-secondary/10">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-serif-display text-base">{item.name}</p>
                      <p className="text-xs opacity-50">
                        {item.sizeMl} ml × {item.quantity}
                      </p>
                    </div>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 space-y-2 border-t border-primary/10 dark:border-secondary/10 pt-6 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-60">Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">Livraison</span>
                  <span>{shipping === 0 ? "Offerte 🎉" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-medium text-base pt-2">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes("@")) setDone(true);
  };

  return (
    <form onSubmit={submit} className="w-full">
      {done ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-primary/70 dark:text-secondary/70"
        >
          Merci — vous recevrez nos nouveautés en avant-première.
        </motion.p>
      ) : (
        <div className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre e-mail"
            aria-label="Adresse e-mail"
            className="w-full rounded-2xl border border-primary/15 dark:border-secondary/15 bg-transparent px-4 py-3 text-sm placeholder:opacity-40 focus:outline-none focus:ring-1 focus:ring-primary/40 dark:focus:ring-secondary/40"
          />
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={compact ? "btn-outline text-xs px-5 py-3" : "btn-primary text-xs px-6 py-3"}
          >
            {compact ? "OK" : "S'inscrire"}
          </motion.button>
        </div>
      )}
    </form>
  );
}

import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contactez ${siteConfig.storeName} — e-mail, téléphone et WhatsApp.`,
};

export default function ContactPage() {
  const waHref = `https://wa.me/${siteConfig.whatsapp.number}?text=${encodeURIComponent(
    siteConfig.whatsapp.message
  )}`;

  return (
    <section className="container-lux pt-36 pb-24 max-w-2xl mx-auto">
      <Reveal className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] opacity-50">Nous écrire</p>
        <h1 className="font-serif-display mt-4 text-5xl">Contact</h1>
        <p className="mt-6 text-sm leading-relaxed opacity-60">
          Une question sur une création, une commande, un conseil olfactif ?
          Notre équipe vous répond sous 24 h.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <a href={`mailto:${siteConfig.contact.email}`} className="card-lux block p-8 h-full hover:shadow-lg transition-shadow">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">E-mail</p>
            <p className="font-serif-display mt-2 text-lg break-all">{siteConfig.contact.email}</p>
          </a>
        </Reveal>
        <Reveal delay={0.15}>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="card-lux block p-8 h-full hover:shadow-lg transition-shadow">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">WhatsApp</p>
            <p className="font-serif-display mt-2 text-lg">{siteConfig.contact.phone}</p>
          </a>
        </Reveal>
        <Reveal delay={0.2} className="sm:col-span-2">
          <div className="card-lux p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">Boutique</p>
            <p className="font-serif-display mt-2 text-lg">{siteConfig.contact.address}</p>
            <p className="mt-2 text-xs opacity-50">Sur rendez-vous, du lundi au samedi.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

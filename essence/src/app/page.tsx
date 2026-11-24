import Hero from "@/components/home/Hero";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";
import NewsletterForm from "@/components/home/NewsletterForm";
import { getFeatured, collections } from "@/data/products";
import Link from "next/link";

const testimonials = [
  {
    quote:
      "« Nuit d'Ombre est le seul parfum qu'on me demande d'identifier. Un sillage magnétique. »",
    author: "Camille R.",
    city: "Paris",
  },
  {
    quote:
      "« Jardin Blanc, c'est mon jardin d'enfance en bouteille. D'une élégance rare. »",
    author: "Salma B.",
    city: "Casablanca",
  },
  {
    quote:
      "« Le flacon est un objet d'art. Je le fais tourner sur mon étagère comme un trophée. »",
    author: "Thomas L.",
    city: "Lyon",
  },
];

export default function HomePage() {
  const featured = getFeatured().slice(0, 4);

  return (
    <>
      <Hero />

      {/* Parfums vedettes */}
      <section className="container-lux py-24">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] opacity-50">Sélection</p>
          <h2 className="font-serif-display mt-4 text-4xl sm:text-5xl">
            Les parfums <em className="italic">signature</em>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
        <Reveal className="mt-14 text-center" delay={0.15}>
          <Link href="/boutique" className="btn-outline">
            Voir toute la boutique
          </Link>
        </Reveal>
      </section>

      {/* Collections */}
      <section className="bg-primary text-secondary dark:bg-white/5 py-24">
        <div className="container-lux">
          <Reveal className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] opacity-50">Univers</p>
            <h2 className="font-serif-display mt-4 text-4xl sm:text-5xl">
              Cinq familles olfactives
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {collections.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.08}>
                <Link
                  href={`/boutique?collection=${c.key}`}
                  className="block rounded-2xl border border-secondary/15 p-6 h-full transition-all duration-500 hover:bg-secondary/5 hover:border-secondary/40"
                >
                  <h3 className="font-serif-display text-2xl">{c.label}</h3>
                  <p className="mt-3 text-xs leading-relaxed opacity-60">{c.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="container-lux py-24">
        <Reveal className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] opacity-50">Ils portent Essence</p>
          <h2 className="font-serif-display mt-4 text-4xl sm:text-5xl">Paroles de clients</h2>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author} delay={i * 0.1}>
              <figure className="card-lux h-full p-8 flex flex-col justify-between gap-6">
                <blockquote className="font-serif-display text-lg leading-relaxed italic">
                  {t.quote}
                </blockquote>
                <figcaption className="text-xs uppercase tracking-[0.2em] opacity-50">
                  {t.author} — {t.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-lux pb-24">
        <Reveal>
          <div className="rounded-2xl bg-primary text-secondary dark:bg-white/5 px-8 py-16 sm:px-16 text-center">
            <h2 className="font-serif-display text-3xl sm:text-4xl">
              Restez dans la confidence
            </h2>
            <p className="mt-4 text-sm opacity-60 max-w-md mx-auto">
              Nouveautés, éditions limitées et invitations privées — une fois
              par mois, jamais plus.
            </p>
            <div className="mt-8 mx-auto max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

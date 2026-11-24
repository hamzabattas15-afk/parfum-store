import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "À propos",
  description: `L'histoire de ${siteConfig.storeName} — une maison de parfum dédiée aux matières rares et au minimalisme de luxe.`,
};

const values = [
  {
    title: "Matières rares",
    text: "Santal de Mysore, rose de Damas, oud du Laos : nous sélectionnons chaque matière première à la source, sans compromis.",
  },
  {
    title: "Concentration généreuse",
    text: "Toutes nos eaux de parfum sont composées à 20 % de concentration — un sillage qui traverse la journée.",
  },
  {
    title: "Flacons-objets",
    text: "Designés comme des pièces d'art contemporain, nos flacons se posent et se regardent. Faites-les pivoter en 360°.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="container-lux pt-36 pb-20 text-center max-w-3xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] opacity-50">Notre histoire</p>
          <h1 className="font-serif-display mt-4 text-5xl sm:text-6xl leading-[1.05]">
            Le parfum, <em className="italic">avant tout</em> une matière
          </h1>
          <p className="mt-8 text-base leading-relaxed opacity-60">
            {siteConfig.storeName} est née d&apos;une conviction simple : un grand
            parfum ne se décore pas, il se compose. Nos créations sont élaborées
            à Grasse, façonnées autour de matières premières d&apos;exception, puis
            laissées à maturation plusieurs mois avant la mise en flacon.
          </p>
        </Reveal>
      </section>

      <section className="container-lux pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="card-lux h-full p-8">
                <h2 className="font-serif-display text-xl">{v.title}</h2>
                <p className="mt-4 text-sm leading-relaxed opacity-60">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary text-secondary dark:bg-white/5 py-24">
        <div className="container-lux text-center">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] opacity-50">L&apos;atelier</p>
            <h2 className="font-serif-display mt-4 text-3xl sm:text-4xl max-w-2xl mx-auto">
              « Un parfum réussi est celui qu&apos;on remarque sans le nommer. »
            </h2>
            <p className="mt-6 text-xs uppercase tracking-[0.2em] opacity-40">
              — La signature {siteConfig.storeName}
            </p>
            <div className="mt-12">
              <Link href="/boutique" className="btn-primary">
                Découvrir les créations
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

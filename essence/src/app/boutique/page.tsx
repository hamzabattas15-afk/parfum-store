import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { products, collections, type Collection } from "@/data/products";
import ProductCard from "@/components/product/ProductCard";
import Reveal from "@/components/Reveal";
import ShopFilter from "@/components/shop/ShopFilter";
import { siteConfig } from "@/data/siteConfig";

export const metadata: Metadata = {
  title: "Boutique",
  description: `Découvrez les ${products.length} eaux de parfum ${siteConfig.storeName} — collections florales, boisées, orientales, fraîches et gourmandes.`,
};

function ShopContent({ collection }: { collection?: Collection }) {
  const filtered = collection
    ? products.filter((p) => p.collection === collection)
    : products;
  const activeLabel = collections.find((c) => c.key === collection)?.label;

  return (
    <section className="container-lux pb-24">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif-display text-3xl">
          {activeLabel ? `Collection ${activeLabel}` : "Tous nos parfums"}
        </h2>
        <span className="text-xs uppercase tracking-[0.2em] opacity-40">
          {filtered.length} créations
        </span>
      </Reveal>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center opacity-50">
          Aucun parfum dans cette collection pour le moment.
        </p>
      )}

      {collection && (
        <Reveal className="mt-14 text-center">
          <Link href="/boutique" className="btn-outline">
            Voir toutes les collections
          </Link>
        </Reveal>
      )}
    </section>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { collection?: string };
}) {
  const valid = collections.some((c) => c.key === searchParams.collection);
  const collection = valid ? (searchParams.collection as Collection) : undefined;

  return (
    <>
      {/* En-tête */}
      <section className="container-lux pt-36 pb-14 text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] opacity-50">La boutique</p>
          <h1 className="font-serif-display mt-4 text-5xl sm:text-6xl">
            L&apos;art du <em className="italic">parfum</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed opacity-60">
            Chaque création est une œuvre : matières rares, concentrations
            généreuses et flacons pensés comme des objets. Faites tourner les
            flacons en 360° sur chaque page produit.
          </p>
        </Reveal>
      </section>

      {/* Filtres par famille olfactive */}
      <ShopFilter active={collection} />

      <Suspense>
        <ShopContent collection={collection} />
      </Suspense>
    </>
  );
}

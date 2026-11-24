import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct, collections, formatPrice } from "@/data/products";
import { siteConfig } from "@/data/siteConfig";
import ProductViewer from "@/components/product/ProductViewer";
import ProductCard from "@/components/product/ProductCard";
import AddToCart from "@/components/product/AddToCart";
import Reveal from "@/components/Reveal";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — ${siteConfig.storeName}`,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

const noteLabels: { key: "top" | "heart" | "base"; label: string; sub: string }[] = [
  { key: "top", label: "Notes de tête", sub: "L'éclat initial" },
  { key: "heart", label: "Notes de cœur", sub: "L'âme du parfum" },
  { key: "base", label: "Notes de fond", sub: "Le sillage" },
];

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const collection = collections.find((c) => c.key === product.collection);
  const related = products
    .filter((p) => p.collection === product.collection && p.id !== product.id)
    .slice(0, 3);

  return (
    <>
      <section className="container-lux pt-32 pb-16">
        {/* fil d'ariane */}
        <Reveal className="text-xs uppercase tracking-[0.2em] opacity-40 mb-8">
          <Link href="/boutique" className="hover:opacity-80">
            Boutique
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/boutique?collection=${product.collection}`} className="hover:opacity-80">
            {collection?.label}
          </Link>
          <span className="mx-2">/</span>
          <span className="opacity-80">{product.name}</span>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* visualiseur 360° */}
          <Reveal>
            <ProductViewer
              framesPath={`/products/${product.slug}`}
              frameCount={siteConfig.viewer.framesPerProduct}
              autoplay
              eager
              aspectRatio={600 / 760}
            />
            <p className="mt-4 text-center text-xs opacity-40">
              Glissez, molette ou flèches ← → pour faire pivoter le flacon
            </p>
          </Reveal>

          {/* infos + achat */}
          <div className="flex flex-col">
            <Reveal delay={0.1}>
              <p className="text-xs uppercase tracking-[0.35em] opacity-50">
                Eau de parfum · {collection?.label}
              </p>
              <h1 className="font-serif-display mt-3 text-4xl sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-6 text-sm leading-relaxed opacity-70 max-w-md">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.2} className="mt-10">
              <AddToCart product={product} />
            </Reveal>

            {/* pyramide olfactive */}
            <div className="mt-12 space-y-6">
              {noteLabels.map((n, i) => (
                <Reveal key={n.key} delay={0.25 + i * 0.08}>
                  <div className="border-t border-primary/10 dark:border-secondary/10 pt-5">
                    <p className="text-[10px] uppercase tracking-[0.3em] opacity-40">
                      {n.sub}
                    </p>
                    <h3 className="font-serif-display text-lg mt-1">{n.label}</h3>
                    <p className="mt-2 text-sm opacity-70">
                      {product.notes[n.key].join(" · ")}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-10 text-xs leading-relaxed opacity-50 space-y-1">
              <p>· Livraison offerte dès {formatPrice(siteConfig.shipping.freeThreshold)} d&apos;achat</p>
              <p>· Échantillon offert avec chaque commande</p>
              <p>· Paiement à la livraison disponible</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* produits associés */}
      {related.length > 0 && (
        <section className="container-lux pb-24">
          <Reveal className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] opacity-50">Dans le même esprit</p>
            <h2 className="font-serif-display mt-4 text-3xl">
              Collection {collection?.label}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

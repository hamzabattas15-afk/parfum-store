import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-lux pt-40 pb-24 text-center min-h-[70vh] flex flex-col justify-center">
      <p className="font-serif-display text-7xl opacity-15">404</p>
      <h1 className="font-serif-display mt-6 text-4xl">Cette page s&apos;est évaporée</h1>
      <p className="mt-4 text-sm opacity-50">
        Comme un fond de parfum, elle a disparu sans laisser de sillage.
      </p>
      <div className="mt-10">
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}

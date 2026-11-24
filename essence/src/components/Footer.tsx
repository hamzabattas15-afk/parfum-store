import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import NewsletterForm from "@/components/home/NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 dark:border-secondary/10 mt-24">
      <div className="container-lux py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-serif-display text-2xl tracking-[0.25em] uppercase">
              {siteConfig.storeName}
            </h3>
            <p className="mt-4 max-w-sm text-sm opacity-60 leading-relaxed">
              {siteConfig.seo.description}
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/boutique" className="hover:opacity-60 transition-opacity">Boutique</Link></li>
              <li><Link href="/a-propos" className="hover:opacity-60 transition-opacity">À propos</Link></li>
              <li><Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link></li>
              <li><Link href="/commande" className="hover:opacity-60 transition-opacity">Commande</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] opacity-50 mb-4">Restons en contact</h4>
            <NewsletterForm compact />
          </div>
        </div>
        <div className="mt-14 pt-6 border-t border-primary/10 dark:border-secondary/10 flex flex-col sm:flex-row justify-between gap-2 text-xs opacity-40">
          <span>© {new Date().getFullYear()} {siteConfig.storeName}. Tous droits réservés.</span>
          <span>{siteConfig.contact.address}</span>
        </div>
      </div>
    </footer>
  );
}

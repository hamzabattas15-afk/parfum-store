/**
 * ═══════════════════════════════════════════════════════════════
 *  ESSENCE — CONFIGURATION DU SITE
 *  ─────────────────────────────────────────────────────────────
 *  Modifier UNIQUEMENT ce fichier pour re-brander tout le site :
 *  nom, couleurs, langue, devise, WhatsApp, mode du visualiseur…
 * ═══════════════════════════════════════════════════════════════
 */

export const siteConfig = {
  /** Nom de la boutique affiché partout (navbar, footer, SEO) */
  storeName: "Essence",

  /** Type de produits (utilisé dans les métadonnées / descriptions) */
  productType: "Parfums de luxe (eaux de parfum)",

  /** Style de la marque */
  brandStyle: "minimalisme de luxe, titres serif élégants, beaucoup d'espace blanc",

  /** Couleurs principales — changer ici change tout le site */
  colors: {
    primary: "#111111",
    secondary: "#F5F1EA",
  },

  /** Langue du site (fr). L'architecture est i18n/RTL-ready :
   *  ajouter un dossier /messages et RTL est prêt pour l'arabe. */
  locale: "fr",
  language: "Français",

  /** Devise + formatage */
  currency: {
    code: "EUR",
    symbol: "€",
    /** Format : "89,00 €" (français) */
    format: (price: number) =>
      new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(price),
  },

  /** Visualiseur produit */
  viewer: {
    mode: "image-sequence" as const,
    framesPerProduct: 24,
  },

  /** WhatsApp (placeholder — remplacer par le vrai numéro) */
  whatsapp: {
    number: "212600000000",
    message: "Bonjour, j'aimerais des informations sur vos parfums.",
  },

  /** Contact / réseaux */
  contact: {
    email: "contact@essence-parfums.com",
    phone: "+212 600 000 000",
    address: "12 Rue de la Paix, 75002 Paris, France",
  },

  /** SEO / Open Graph */
  seo: {
    title: "Essence — Parfums de luxe",
    description:
      "Essence crée des eaux de parfum d'exception. Découvrez nos collections florales, boisées, orientales, fraîches et gourmandes.",
    ogImage: "/og-image.png",
    url: "https://essence-parfums.com",
  },

  /** Frais de livraison (EUR) */
  shipping: {
    freeThreshold: 120,
    flatRate: 6.9,
  },
} as const;

export type SiteConfig = typeof siteConfig;

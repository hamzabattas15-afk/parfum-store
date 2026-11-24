import { siteConfig } from "./siteConfig";

/**
 * ═══════════════════════════════════════════════════════════════
 *  PRODUITS — 10 parfums d'exemple
 *  ─────────────────────────────────────────────────────────────
 *  Pour ajouter un parfum : dupliquer une entrée et adapter.
 *  Pour les images : placer les fichiers dans
 *  /public/products/[slug]/ (viewer-01.jpg … viewer-24.jpg + hero.jpg)
 * ═══════════════════════════════════════════════════════════════
 */

export type Collection = "floral" | "woody" | "oriental" | "fresh" | "gourmand";

export interface ProductSize {
  /** Volume en ml */
  ml: number;
  /** Prix EUR */
  price: number;
  /** Stock disponible */
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Prix d'affichage (50 ml) — les variantes ont leur propre prix */
  price: number;
  images: string[];
  collection: Collection;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  sizes: ProductSize[];
  featured?: boolean;
}

export const collections: { key: Collection; label: string; description: string }[] = [
  {
    key: "floral",
    label: "Floral",
    description: "Bouquets délicats et pétales rares, une élégance intemporelle.",
  },
  {
    key: "woody",
    label: "Boisé",
    description: "Cèdre, santal et vétiver — la profondeur des grandes forêts.",
  },
  {
    key: "oriental",
    label: "Oriental",
    description: "Épices précieuses, ambre et oud, un sillage envoûtant.",
  },
  {
    key: "fresh",
    label: "Fraîche",
    description: "Agrumes éclatants et notes aquatiques, la pureté absolue.",
  },
  {
    key: "gourmand",
    label: "Gourmand",
    description: "Vanille, caramel et fèves tonka, une gourmandise raffinée.",
  },
];

export const products: Product[] = [
  {
    id: "ess-001",
    slug: "nuit-dombre",
    name: "Nuit d'Ombre",
    price: 128,
    images: ["/products/nuit-dombre/hero.jpg", "/products/nuit-dombre/detail-1.jpg", "/products/nuit-dombre/detail-2.jpg"],
    collection: "oriental",
    description:
      "Un oriental profond où l'ambre rencontre l'oud rare. Nuit d'Ombre est un parfum de caractère, porté par ceux qui n'ont rien à prouver.",
    notes: {
      top: ["Bergamote de Calabre", "Poivre rose", "Cardamome"],
      heart: ["Rose de Damas", "Iris", "Safran"],
      base: ["Oud du Laos", "Ambre gris", "Cuir"],
    },
    sizes: [
      { ml: 30, price: 89, stock: 15 },
      { ml: 50, price: 128, stock: 8 },
      { ml: 100, price: 189, stock: 4 },
    ],
    featured: true,
  },
  {
    id: "ess-002",
    slug: "jardin-blanc",
    name: "Jardin Blanc",
    price: 115,
    images: ["/products/jardin-blanc/hero.jpg", "/products/jardin-blanc/detail-1.jpg", "/products/jardin-blanc/detail-2.jpg"],
    collection: "floral",
    description:
      "Une promenade à l'aube dans un jardin de fleurs blanches. Sambac, tubéreuse et néroli dansent dans une composition d'une pureté rare.",
    notes: {
      top: ["Néroli", "Mandarine verte", "Poire"],
      heart: ["Jasmin Sambac", "Tubéreuse", "Fleur d'oranger"],
      base: ["Musc blanc", "Bois de cachemire", "Vanille bourbon"],
    },
    sizes: [
      { ml: 30, price: 79, stock: 20 },
      { ml: 50, price: 115, stock: 12 },
      { ml: 100, price: 169, stock: 6 },
    ],
    featured: true,
  },
  {
    id: "ess-003",
    slug: "bois-sacre",
    name: "Bois Sacré",
    price: 138,
    images: ["/products/bois-sacre/hero.jpg", "/products/bois-sacre/detail-1.jpg", "/products/bois-sacre/detail-2.jpg"],
    collection: "woody",
    description:
      "Un hommage aux forêts anciennes. Le santal crémeux et le cèdre de l'Atlas s'unissent dans une signature boisée d'une élégance absolue.",
    notes: {
      top: ["Élémi", "Baie de genièvre"],
      heart: ["Santal de Mysore", "Cèdre de l'Atlas", "Cyprès"],
      base: ["Vétiver d'Haïti", "Mousse de chêne", "Ambroxan"],
    },
    sizes: [
      { ml: 30, price: 95, stock: 10 },
      { ml: 50, price: 138, stock: 9 },
      { ml: 100, price: 199, stock: 3 },
    ],
    featured: true,
  },
  {
    id: "ess-004",
    slug: "lumiere-dete",
    name: "Lumière d'Été",
    price: 98,
    images: ["/products/lumiere-dete/hero.jpg", "/products/lumiere-dete/detail-1.jpg", "/products/lumiere-dete/detail-2.jpg"],
    collection: "fresh",
    description:
      "L'éclat du midi. Un cocktail d'agrumes pétillants posé sur un fond minéral, comme une brise marine sur la peau encore chaude.",
    notes: {
      top: ["Citron de Sicile", "Pamplemousse", "Menthe glaciale"],
      heart: ["Fleur de sel", "Thé blanc", "Néroli"],
      base: ["Musc", "Ambre minéral", "Bois blond"],
    },
    sizes: [
      { ml: 30, price: 69, stock: 25 },
      { ml: 50, price: 98, stock: 18 },
      { ml: 100, price: 145, stock: 10 },
    ],
    featured: true,
  },
  {
    id: "ess-005",
    slug: "vanille-intense",
    name: "Vanille Intense",
    price: 122,
    images: ["/products/vanille-intense/hero.jpg", "/products/vanille-intense/detail-1.jpg", "/products/vanille-intense/detail-2.jpg"],
    collection: "gourmand",
    description:
      "La vanille comme vous ne l'avez jamais sentie. Riche, sombre, presque addictive — sublimée par le fève tonka et une touche de rhum.",
    notes: {
      top: ["Rhum brun", "Cannelle"],
      heart: ["Vanille de Madagascar", "Fève tonka", "Héliotrope"],
      base: ["Benjoin", "Cacao amer", "Musc"],
    },
    sizes: [
      { ml: 30, price: 85, stock: 14 },
      { ml: 50, price: 122, stock: 11 },
      { ml: 100, price: 179, stock: 5 },
    ],
    featured: true,
  },
  {
    id: "ess-006",
    slug: "rose-insolente",
    name: "Rose Insolente",
    price: 132,
    images: ["/products/rose-insolente/hero.jpg", "/products/rose-insolente/detail-1.jpg", "/products/rose-insolente/detail-2.jpg"],
    collection: "floral",
    description:
      "Une rose qui ne s'excuse jamais. Le fruité framboisé rencontre la rose de Grasse dans un écrin patchouli velouté.",
    notes: {
      top: ["Framboise", "Litchi", "Poivre"],
      heart: ["Rose de Grasse", "Pivoine", "Géranium"],
      base: ["Patchouli", "Musc", "Cuir suédé"],
    },
    sizes: [
      { ml: 30, price: 92, stock: 9 },
      { ml: 50, price: 132, stock: 7 },
      { ml: 100, price: 195, stock: 4 },
    ],
  },
  {
    id: "ess-007",
    slug: "cuir-fume",
    name: "Cuir Fumé",
    price: 145,
    images: ["/products/cuir-fume/hero.jpg", "/products/cuir-fume/detail-1.jpg", "/products/cuir-fume/detail-2.jpg"],
    collection: "woody",
    description:
      "Le souvenir d'un fauteuil de cuir devant un feu de bois. Fumé, animal, magnétique — pour les soirs qui comptent.",
    notes: {
      top: ["Fumée", "Bergamote noire"],
      heart: ["Cuir", "Gaiac", "Girofle"],
      base: ["Styrax", "Vanille sombre", "Cade"],
    },
    sizes: [
      { ml: 30, price: 99, stock: 7 },
      { ml: 50, price: 145, stock: 5 },
      { ml: 100, price: 210, stock: 2 },
    ],
  },
  {
    id: "ess-008",
    slug: "ambre-royal",
    name: "Ambre Royal",
    price: 158,
    images: ["/products/ambre-royal/hero.jpg", "/products/ambre-royal/detail-1.jpg", "/products/ambre-royal/detail-2.jpg"],
    collection: "oriental",
    description:
      "L'ambre dans toute sa splendeur. Une matière première d'exception, façonnée comme un joyau olfactif digne des palais.",
    notes: {
      top: ["Safran", "Mandarine"],
      heart: ["Ambre", "Labdanum", "Myrrhe"],
      base: ["Oud", "Vanille fumée", "Bois de rose"],
    },
    sizes: [
      { ml: 30, price: 108, stock: 6 },
      { ml: 50, price: 158, stock: 4 },
      { ml: 100, price: 228, stock: 2 },
    ],
  },
  {
    id: "ess-009",
    slug: "figue-fig",
    name: "Figue & Fig",
    price: 108,
    images: ["/products/figue-fig/hero.jpg", "/products/figue-fig/detail-1.jpg", "/products/figue-fig/detail-2.jpg"],
    collection: "fresh",
    description:
      "La sève de figuier, verte et laiteuse, sur un lit de noix de coco blanche. Un depart très naturel, uneTenue surprenante.",
    notes: {
      top: ["Feuille de figuier", "Verveine"],
      heart: ["Lait de figue", "Noix de coco", "Fleur d'iris"],
      base: ["Cèdre blanc", "Musc doux"],
    },
    sizes: [
      { ml: 30, price: 75, stock: 16 },
      { ml: 50, price: 108, stock: 13 },
      { ml: 100, price: 156, stock: 8 },
    ],
  },
  {
    id: "ess-010",
    slug: "cafe-noir",
    name: "Café Noir",
    price: 126,
    images: ["/products/cafe-noir/hero.jpg", "/products/cafe-noir/detail-1.jpg", "/products/cafe-noir/detail-2.jpg"],
    collection: "gourmand",
    description:
      "Un espresso serré au comptoir d'un café parisien. Torréfaction profonde, caramel salé, et cette signature qui vous suit toute la journée.",
    notes: {
      top: ["Café torréfié", "Cardamome"],
      heart: ["Caramel", "Praline", "Fève tonka"],
      base: ["Vanille", "Bois de santal", "Musc"],
    },
    sizes: [
      { ml: 30, price: 88, stock: 12 },
      { ml: 50, price: 126, stock: 10 },
      { ml: 100, price: 185, stock: 6 },
    ],
  },
];

/** Helpers */
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getFeatured = () => products.filter((p) => p.featured);
export const getByCollection = (c: Collection) => products.filter((p) => p.collection === c);
export const formatPrice = siteConfig.currency.format;

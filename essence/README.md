# Essence — Boutique de parfums de luxe

Site e-commerce de parfumerie haut de gamme : visualiseur de flacons **360°**,
panier persistant, commande par WhatsApp, design minimaliste (serif + beaucoup
d'espace blanc), mode sombre, entièrement en français.

## Stack

- **Next.js 14** (App Router, SSG pour les pages produits)
- **React 18** + **TypeScript**
- **Tailwind CSS 3** (thème clair/sombre, composants `.btn-*`, `.card-lux`, `.container-lux`)
- **Framer Motion** (animations, révélations au scroll, drawer, inertie du viewer)
- **Zustand** (panier persisté en `localStorage`)

## Pages

| Route | Description |
|---|---|
| `/` | Accueil : hero 360° autoplay, sélection vedette, collections, témoignages, newsletter |
| `/boutique` | Catalogue avec filtres par famille olfactive (`?collection=floral…`) |
| `/produit/[slug]` | Fiche produit : viewer 360°, pyramide olfactive, formats 30/50/100 ml, produits associés |
| `/commande` | Checkout : formulaire de livraison + récapitulatif → envoi WhatsApp |
| `/a-propos`, `/contact` | Contenu de marque et coordonnées |

## Le visualiseur 360°

Chaque produit a 24 frames dans `public/products/[slug]/`
(`viewer-01.svg` … `viewer-24.svg`). Interactions : **glisser** (souris/tactile,
avec inertie), **molette horizontale**, **flèches clavier** ← →, autoplay lent
optionnel. Les frames se préchargent au passage à la vue.

Régénérer les frames : `node scripts/generate-frames.js`.

## Configuration

Tout le branding (nom, couleurs, devise, WhatsApp, livraison, SEO) se règle
dans **un seul fichier** : `src/data/siteConfig.ts`.

Ajouter un parfum : dupliquer une entrée dans `src/data/products.ts` et
déposer les images dans `public/products/[slug]/`.

> Pour la mise en production, remplacer le numéro WhatsApp placeholder
> (`212600000000`) dans `siteConfig.whatsapp.number`.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production (SSG)
npm start       # sert le build
npm run lint    # ESLint
```

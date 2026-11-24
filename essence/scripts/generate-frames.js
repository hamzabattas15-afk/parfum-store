/**
 * generate-frames.js — Générateur d'images placeholder pour le visualiseur 360°.
 *
 * Pour chaque produit de products.ts, génère N frames SVG stylisées
 * (silhouette de flacon : corps en verre, capuchon, dégradé + reflet
 * qui se déplacent avec l'angle) + une image hero.
 *
 * Usage :  node scripts/generate-frames.js
 * Les fichiers sortent dans  public/products/[slug]/
 * (viewer-01.svg … viewer-24.svg, hero.svg, detail-1.svg, detail-2.svg)
 *
 * Remplacez ces SVG par de vrais rendus 360° (jpg/png) quand vous en aurez :
 * mêmes noms de fichiers, et le visualiseur marchera sans autre changement.
 */

const fs = require("fs");
const path = require("path");

const slugs = [
  "nuit-dombre", "jardin-blanc", "bois-sacre", "lumiere-dete", "vanille-intense",
  "rose-insolente", "cuir-fume", "ambre-royal", "figue-fig", "cafe-noir",
];

const FRAMES = 24;
const OUT = path.join(__dirname, "..", "public", "products");

/* Palette par collection — le flacon change subtilement de teinte */
const palettes = {
  oriental: { glass: "#3d2b1f", tint: "#8a5a2b", accent: "#d4a76a" },
  floral:   { glass: "#f3e7ef", tint: "#d8a7c4", accent: "#b76e94" },
  woody:    { glass: "#2e2a24", tint: "#6b5b45", accent: "#a8967a" },
  fresh:    { glass: "#eaf4f6", tint: "#a3cfd8", accent: "#5e9ead" },
  gourmand: { glass: "#3b2a20", tint: "#96683f", accent: "#d9b08c" },
};
const paletteFor = (slug) => {
  const map = {
    "nuit-dombre": "oriental", "ambre-royal": "oriental",
    "jardin-blanc": "floral", "rose-insolente": "floral",
    "bois-sacre": "woody", "cuir-fume": "woody",
    "lumiere-dete": "fresh", "figue-fig": "fresh",
    "vanille-intense": "gourmand", "cafe-noir": "gourmand",
  };
  return palettes[map[slug] || "floral"];
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

/**
 * Dessine un flacon vu sous un angle `deg` (0-360).
 * Le reflet principal et le dégradé du verre glissent horizontalement
 * avec l'angle, et une légère perspective rétrécit le corps.
 */
function bottleSVG({ deg, w = 600, h = 760, label, pal, showAngle = false }) {
  const rad = (deg * Math.PI) / 180;
  const cos = Math.cos(rad);
  // perspective douce : ±6% de largeur
  const persp = 1 - 0.06 * Math.abs(Math.sin(rad));
  // position du reflet : glisse de gauche à droite puis revient
  const shift = Math.sin(rad); // -1..1
  const hlX = 210 + shift * 90; // centre du reflet
  const bodyW = 300 * persp;
  const bodyX = (w - bodyW) / 2;
  const bodyY = 210;
  const bodyH = 440;
  const neckW = 70 * persp;
  const neckX = (w - neckW) / 2;
  const r = 26;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F5F1EA"/>
      <stop offset="1" stop-color="#E9E2D6"/>
    </linearGradient>
    <linearGradient id="glass" x1="${0.15 + shift * 0.35}" y1="0" x2="${0.85 + shift * 0.2}" y2="1">
      <stop offset="0" stop-color="${pal.glass}" stop-opacity="0.92"/>
      <stop offset="0.45" stop-color="${pal.tint}" stop-opacity="0.85"/>
      <stop offset="1" stop-color="${pal.glass}" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#2b2b2b"/>
      <stop offset="0.5" stop-color="#4a4a4a"/>
      <stop offset="1" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="14" stdDeviation="22" flood-color="#111111" flood-opacity="0.18"/>
    </filter>
  </defs>

  <!-- fond -->
  <rect width="${w}" height="${h}" fill="url(#bg)"/>

  <!-- cap -->
  <g filter="url(#soft)">
    <rect x="${(w - 92 * persp) / 2}" y="72" width="${92 * persp}" height="88" rx="10" fill="url(#cap)"/>
    <rect x="${(w - 78 * persp) / 2}" y="160" width="${78 * persp}" height="10" rx="4" fill="#111111"/>
  </g>

  <!-- col -->
  <rect x="${neckX}" y="166" width="${neckW}" height="52" fill="url(#glass)"/>

  <!-- corps -->
  <g filter="url(#soft)">
    <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="${r}" fill="url(#glass)" stroke="#111111" stroke-opacity="0.12"/>
  </g>

  <!-- reflet principal qui glisse -->
  <rect x="${hlX - 26}" y="${bodyY + 24}" width="30" height="${bodyH - 60}" rx="15" fill="url(#shine)"/>
  <!-- reflet secondaire opposé -->
  <rect x="${w - hlX - 26 + shift * 40}" y="${bodyY + 60}" width="14" height="${bodyH - 140}" rx="7" fill="#ffffff" opacity="0.18"/>

  <!-- étiquette -->
  <g opacity="0.9">
    <rect x="${bodyX + bodyW / 2 - 62}" y="${bodyY + bodyH / 2 - 30}" width="124" height="60" rx="4" fill="#F5F1EA" stroke="#111111" stroke-opacity="0.25"/>
    <text x="${bodyX + bodyW / 2}" y="${bodyY + bodyH / 2 - 6}" font-family="Georgia, serif" font-size="17" letter-spacing="3" fill="#111111" text-anchor="middle">ESSENCE</text>
    <text x="${bodyX + bodyW / 2}" y="${bodyY + bodyH / 2 + 18}" font-family="Georgia, serif" font-size="11" letter-spacing="1.5" fill="${esc(pal.accent)}" text-anchor="middle">${esc(label.toUpperCase())}</text>
  </g>

  <!-- reflet du liquide au sol -->
  <ellipse cx="${w / 2}" cy="${bodyY + bodyH + 34}" rx="${bodyW * 0.55}" ry="16" fill="#111111" opacity="0.10"/>

  ${
    showAngle
      ? `<text x="16" y="${h - 14}" font-family="Helvetica, Arial, sans-serif" font-size="14" fill="#111111" opacity="0.45">${deg}°</text>`
      : ""
  }
</svg>`;
}

for (const slug of slugs) {
  const pal = paletteFor(slug);
  const label = slug.replace(/-/g, " ");
  const dir = path.join(OUT, slug);
  fs.mkdirSync(dir, { recursive: true });

  for (let i = 0; i < FRAMES; i++) {
    const deg = Math.round((360 / FRAMES) * i);
    fs.writeFileSync(
      path.join(dir, `viewer-${String(i + 1).padStart(2, "0")}.svg`),
      bottleSVG({ deg, label, pal, showAngle: true })
    );
  }
  // hero + détails
  fs.writeFileSync(path.join(dir, "hero.svg"), bottleSVG({ deg: 12, label, pal }));
  fs.writeFileSync(path.join(dir, "detail-1.svg"), bottleSVG({ deg: 100, label, pal }));
  fs.writeFileSync(path.join(dir, "detail-2.svg"), bottleSVG({ deg: 250, label, pal }));

  console.log(`✓ ${slug} (${FRAMES} frames + hero + détails)`);
}
console.log("\nTerminé. Frames dans public/products/");

"use client";

/**
 * Reste invisible : force la réhydratation du store Zustand
 * au premier montage client (évite les mismatch de rendu).
 */
export default function StoreHydration() {
  return null;
}

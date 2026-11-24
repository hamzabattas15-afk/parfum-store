"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export interface ProductViewerProps {
  /** Chemin du dossier contenant les frames, ex: "/products/nuit-dombre" */
  framesPath: string;
  /** Nombre total de frames (viewer-01 … viewer-N) */
  frameCount?: number;
  /** Rotation automatique lente (luxury feel) */
  autoplay?: boolean;
  /** Vitesse d'autoplay : degrés par seconde */
  autoplaySpeed?: number;
  /** Ratio de l'image (w/h) */
  aspectRatio?: number;
  /** Force le chargement de toutes les frames (sinon lazy après visibilité) */
  eager?: boolean;
  className?: string;
}

/**
 * Visualiseur 360° — drag / swipe / molette / flèches clavier.
 * Inertie élégante, débounce fluide via rAF.
 */
export default function ProductViewer({
  framesPath,
  frameCount = 24,
  autoplay = false,
  autoplaySpeed = 12, // degrés/s — lent et élégant
  aspectRatio = 600 / 760,
  eager = false,
  className = "",
}: ProductViewerProps) {
  const frames = useMemo(
    () =>
      Array.from({ length: frameCount }, (_, i) =>
        `${framesPath}/viewer-${String(i + 1).padStart(2, "0")}.svg`
      ),
    [framesPath, frameCount]
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const degRef = useRef(0); // angle courant (0-360, continu)
  const velRef = useRef(0); // vélocité degrés/frame
  const draggingRef = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [deg, setDeg] = useState(0);
  const [loaded, setLoaded] = useState(eager);
  const [isDragging, setIsDragging] = useState(false);
  const inViewRef = useRef(false);

  const inView = useInView(containerRef, { once: true, margin: "200px" });
  useEffect(() => {
    if (inView || eager) setLoaded(true);
  }, [inView, eager]);

  const frameIndex = Math.floor((((deg % 360) + 360) % 360) / (360 / frameCount)) % frameCount;

  /* ---- boucle d'animation : inertie + autoplay ---- */
  const tick = useCallback(() => {
    if (draggingRef.current) {
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    // inertie (amortie doucement — luxe)
    if (Math.abs(velRef.current) > 0.05) {
      degRef.current += velRef.current;
      velRef.current *= 0.94;
      setDeg(degRef.current);
    } else if (autoplay && inViewRef.current) {
      degRef.current += autoplaySpeed / 60;
      setDeg(degRef.current);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [autoplay, autoplaySpeed]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  /* ---- drag / swipe ---- */
  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    setIsDragging(true);
    lastXRef.current = e.clientX;
    velRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    const delta = (dx / Math.max(containerRef.current?.clientWidth || 1, 1)) * 540; // full drag = 1.5 tours
    degRef.current += delta;
    velRef.current = delta; // vélocité pour l'inertie
    setDeg(degRef.current);
  };
  const endDrag = () => {
    draggingRef.current = false;
    setIsDragging(false);
  };

  /* ---- molette (horizontal OU vertical) ---- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const rect = el.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) return;
      // n'intercepte pas le scroll vertical de la page sauf si shift/molette horizontale
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        degRef.current += e.deltaX * 0.15;
        setDeg(degRef.current);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ---- clavier ---- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== el && !el.contains(document.activeElement)) return;
      const step = 360 / frameCount;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        degRef.current += e.key === "ArrowLeft" ? -step : step;
        velRef.current = 0;
        setDeg(degRef.current);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [frameCount]);

  /* tracking inView pour autoplay */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="slider"
      aria-label="Visualiseur 360 degrés — glissez pour faire tourner le flacon"
      aria-valuenow={Math.round(((deg % 360) + 360) % 360)}
      aria-valuemin={0}
      aria-valuemax={360}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={endDrag}
      className={`relative select-none overflow-hidden rounded-2xl bg-secondary/60 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 dark:bg-white/5 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      } ${className}`}
      style={{ aspectRatio: String(aspectRatio) }}
    >
      {/* frames — seules 2 frames adjacentes sont rendues en <Image>, le reste est préchargé via <link> */}
      {loaded ? (
        <>
          <Image
            key={frameIndex}
            src={frames[frameIndex]}
            alt={`Flacon vu sous ${Math.round(((deg % 360) + 360) % 360)} degrés`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={eager}
            draggable={false}
            className="no-drag object-cover pointer-events-none"
          />
          {/* préchargement silencieux des autres frames */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <span className="hidden" aria-hidden>
            {frames.map((f) => (
              <img key={f} src={f} alt="" width={1} height={1} />
            ))}
          </span>
        </>
      ) : (
        <div className="skeleton absolute inset-0" />
      )}

      {/* étiquette d'angle */}
      <span className="absolute left-3 bottom-2 text-[11px] font-medium tracking-widest text-primary/40 dark:text-secondary/40">
        {Math.round(((deg % 360) + 360) % 360)}°
      </span>

      {/* hint */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute right-3 bottom-2 text-[11px] uppercase tracking-widest text-primary/35 dark:text-secondary/35 pointer-events-none"
      >
        Glisser pour pivoter
      </motion.span>
    </div>
  );
}

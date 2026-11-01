"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Looping, muted background video from /public/video/<name>.{webm,mp4}.
 * Skipped on phones, reduced-motion and data-saver (callers show a poster image underneath).
 * Pauses when scrolled out of view.
 */
export function BackgroundVideo({ name, className = "" }: { name: string; className?: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setEnabled(
      window.matchMedia("(min-width: 768px)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        !conn?.saveData,
    );
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!enabled || !v) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {});
      else v.pause();
    });
    io.observe(v);
    return () => io.disconnect();
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      autoPlay muted loop playsInline preload="auto" aria-hidden="true"
      poster={`/video/${name}-poster.jpg`}
      onCanPlay={() => setReady(true)}
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${className}`}
    >
      <source src={`/video/${name}.webm`} type="video/webm" />
      <source src={`/video/${name}.mp4`} type="video/mp4" />
    </video>
  );
}

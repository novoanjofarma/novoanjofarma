"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { CountUp } from "./CountUp";
import { Flag } from "./Flag";
import { Icon } from "./Icons";

const CARDS = [
  { key: "portfolio", img: "/images/products.webp", pos: "50% 50%", href: "/products" },
  { key: "sourcing", img: "/images/warehouse-2.webp", pos: "35% 50%", href: "/about" },
  { key: "quality", img: "/images/pharmacy.webp", pos: "50% 25%", href: "/about" },
  { key: "coverage", img: "/images/delivery.webp", pos: "60% 50%", href: "/contact" },
] as const;

type Key = (typeof CARDS)[number]["key"];
const INTERVAL = 3500;
const pad = (n: number) => String(n).padStart(2, "0");

export function NumbersCarousel() {
  const t = useTranslations("numbers");
  const c = useTranslations("sourcing.countries");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % CARDS.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, inView, reduced, active]);

  const go = (d: number) => setActive((a) => (a + d + CARDS.length) % CARDS.length);
  const cols = CARDS.map((_, i) => (i === active ? "2.6fr" : "1fr")).join(" ");

  const spot = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const number = (key: Key, on: boolean) => {
    const size = on ? "text-4xl md:text-6xl" : "text-3xl";
    const num = `font-display font-bold leading-none transition-[font-size] duration-700 ${size}`;
    switch (key) {
      case "portfolio":
        return <span className={num}>{on ? <CountUp key={`p${active}`} to={1000} suffix="+" duration={1600} /> : "1000+"}</span>;
      case "sourcing":
        return (
          <span className="flex items-center gap-3">
            <span className={num}>{on ? <CountUp key={`s${active}`} to={3} duration={900} /> : 3}</span>
            <span className="flex gap-1">
              <Flag code="in" label={c("india")} className="h-4 w-6 md:h-5 md:w-7" />
              <Flag code="pt" label={c("portugal")} className="h-4 w-6 md:h-5 md:w-7" />
              <Flag code="cn" label={c("china")} className="h-4 w-6 md:h-5 md:w-7" />
            </span>
          </span>
        );
      case "quality":
        return (
          <span className="flex items-center gap-3">
            <span className={num}>WHO</span>
            <Icon name="shield" className={`text-accent transition-all duration-700 ${on ? "h-8 w-8 md:h-10 md:w-10" : "h-6 w-6"}`} />
          </span>
        );
      case "coverage":
        return (
          <span className="flex items-center gap-3">
            <span className={num}>Angola</span>
            <Flag code="ao" label="Angola" className={on ? "h-5 w-8 md:h-6 md:w-9" : "h-4 w-6"} />
          </span>
        );
    }
  };

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("title")}
      onFocusCapture={(e) => setPaused(e.target instanceof HTMLElement && e.target.matches(":focus-visible"))}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="flex items-end justify-between gap-6">
        <div data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{t("eyebrow")}</p>
          <h2 className="mt-3 max-w-xl font-display text-2xl font-semibold leading-tight md:text-[1.75rem]">{t("title")}</h2>
        </div>
        <div className="flex items-center gap-4">
          <p className="hidden font-display text-sm tabular-nums text-white/60 sm:block" aria-live="polite">
            <span className="text-3xl font-bold text-white">{pad(active + 1)}</span> / {pad(CARDS.length)}
          </p>
          <div className="flex gap-2">
            {([-1, 1] as const).map((d) => (
              <button key={d} type="button" onClick={() => go(d)} aria-label={t(d < 0 ? "prev" : "next")}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 text-white transition hover:border-accent hover:bg-white/10 hover:text-accent">
                <Icon name="arrow" className={`h-5 w-5 ${d < 0 ? "rotate-180" : ""}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{ "--cols": cols } as React.CSSProperties}
        className="mt-8 flex flex-col gap-3 md:grid md:gap-4 md:[grid-template-columns:var(--cols)] md:transition-[grid-template-columns] md:duration-[700ms] md:ease-[cubic-bezier(0.2,0.7,0.2,1)]"
      >
        {CARDS.map((card, i) => {
          const on = i === active;
          const label = t(`cards.${card.key}.label`);
          const desc = t(`cards.${card.key}.desc`);
          return (
            <article
              key={card.key}
              onMouseMove={spot}
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${CARDS.length}`}
              className={`group relative overflow-hidden rounded-lg ring-1 backdrop-blur-md transition-[height,background-color,box-shadow] duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] md:h-[26rem] ${on ? "h-[30rem] bg-white/10 ring-accent/50 shadow-2xl shadow-black/30" : "h-28 bg-white/[0.08] ring-white/20 hover:bg-white/[0.14]"}`}
            >
              {/* photo, revealed on the active card */}
              <Image src={card.img} alt="" fill sizes="(min-width:768px) 45vw, 100vw"
                className={`object-cover transition-all duration-[1400ms] ease-out ${on ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}
                style={{ objectPosition: card.pos }} />
              <div className={`absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/65 to-brand-deep/45 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-0"}`} />
              {/* cursor spotlight */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),rgba(255,255,255,0.16),transparent_65%)]" />

              <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
                <div className="flex items-start justify-between">
                  <p className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-500 ${on ? "text-white" : "text-accent"}`}>{label}</p>
                  <span className="font-display text-sm font-bold tabular-nums text-white/50">{pad(i + 1)}</span>
                </div>

                {/* highlight (active only) */}
                <p className={`max-w-md font-display text-base font-semibold leading-snug transition-all duration-700 md:text-xl ${on ? "translate-y-0 opacity-100 delay-300" : "pointer-events-none absolute translate-y-4 opacity-0"}`}>
                  {t(`cards.${card.key}.highlight`)}
                </p>

                <div>
                  {number(card.key, on)}
                  <p className="mt-2 text-xs text-white/70 md:text-sm">{desc}</p>
                  {on && (
                    <Link href={card.href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-accent hover:gap-3">
                      {t("more")} <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>

              {!on && (
                <button type="button" onClick={() => setActive(i)} aria-label={`${label}: ${desc}`} className="absolute inset-0 z-10 cursor-pointer" />
              )}
              {on && !reduced && (
                <span key={active} aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 bg-accent"
                  style={{ animation: `progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? "paused" : "running" }} />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

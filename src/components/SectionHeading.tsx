export function SectionHeading({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <div data-reveal>
      <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-accent" : "text-brand"}`}>{eyebrow}</p>
      <h2 className={`mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight md:text-[1.75rem] ${light ? "text-white" : "text-brand-deep"}`}>{title}</h2>
      {intro && <p className={`mt-3 max-w-xl leading-relaxed ${light ? "text-white/75" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}

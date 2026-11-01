export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-gradient-to-br from-brand-deep via-brand-dark to-brand text-white">
      <div className="hero-in mx-auto max-w-6xl px-4 pb-12 pt-28 sm:px-6 md:pb-16 md:pt-32">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold leading-tight md:text-4xl">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-base text-white/80">{intro}</p>}
      </div>
    </section>
  );
}

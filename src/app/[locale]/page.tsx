import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { SITE, waLink } from "@/lib/site";
import { Icon } from "@/components/Icons";
import { BackgroundVideo } from "@/components/BackgroundVideo";
import { NumbersCarousel } from "@/components/NumbersCarousel";
import { SupplyRoute } from "@/components/SupplyRoute";
import { CategoryGrid } from "@/components/CategoryGrid";
import { SectionHeading } from "@/components/SectionHeading";

const SECTION = "mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20";

export default function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate overflow-hidden bg-brand-deep text-white">
        <Image src="/images/hero.webp" alt={t("images.hero")} fill priority sizes="100vw" className="kenburns -z-20 object-cover object-[80%_40%]" />
        <BackgroundVideo name="hero-network" className="-z-[15]" />
        <div className="absolute inset-0 -z-10 bg-brand-deep/75 lg:bg-gradient-to-r lg:from-brand-deep/95 lg:from-0% lg:via-brand-deep/70 lg:via-40% lg:to-transparent lg:to-75%" />
        <div className="hero-in mx-auto flex min-h-[30rem] max-w-6xl flex-col justify-center px-4 pb-16 pt-28 sm:px-6 md:min-h-[34rem] md:pb-20 md:pt-32">
          <p className="inline-flex w-fit items-center gap-2 rounded-md border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-medium backdrop-blur">
            <Icon name="shield" className="h-4 w-4 text-accent" /> {t("hero.badge")}
          </p>
          <h1 className="mt-5 max-w-2xl font-display text-[1.7rem] font-bold leading-[1.18] sm:text-4xl lg:text-5xl">{t("hero.title")}</h1>
          <p className="mt-5 max-w-lg leading-relaxed text-white/85">{t("hero.subtitle")}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-semibold text-brand-deep transition hover:brightness-110">
              {t("hero.primary")} <Icon name="arrow" className="h-5 w-5" />
            </Link>
            <Link href="/products" className="rounded-md border border-white/50 px-6 py-3 font-semibold backdrop-blur transition hover:bg-white/10">{t("hero.secondary")}</Link>
          </div>
          <p className="mt-8 text-xs text-white/65">{t("hero.registered")} · NIF {SITE.nif}</p>
        </div>
      </section>

      {/* 2. What we supply */}
      <section className={SECTION}>
        <SectionHeading eyebrow={t("categories.eyebrow")} title={t("categories.title")} intro={t("categories.subtitle")} />
        <div className="mt-10"><CategoryGrid /></div>
        <p data-reveal className="mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 font-semibold text-brand hover:gap-3">{t("categories.link")} <Icon name="arrow" className="h-5 w-5" /></Link>
        </p>
      </section>

      {/* 3. At a glance */}
      <section className="relative isolate overflow-hidden bg-brand-deep py-16 text-white md:py-20">
        <Image src="/video/capsules-poster.jpg" alt="" fill sizes="100vw" className="-z-30 object-cover" />
        <BackgroundVideo name="capsules" className="-z-20" />
        <div className="absolute inset-0 -z-10 bg-brand/55 mix-blend-multiply" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-deep/80 via-brand-deep/35 to-brand-deep/85" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <NumbersCarousel />
        </div>
      </section>

      {/* 4. Who we are + who we supply */}
      <section className="bg-mint/50">
        <div className={`${SECTION} grid items-center gap-10 md:grid-cols-2 md:gap-14`}>
          <div data-reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">{t("about.eyebrow")}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-brand-deep md:text-[1.75rem]">{t("about.title")}</h2>
            <p className="mt-5 leading-relaxed text-muted">{t("about.p1")}</p>
            <p className="mt-3 leading-relaxed text-muted">{t("about.p2")}</p>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 font-semibold text-brand hover:gap-3">{t("about.link")} <Icon name="arrow" className="h-5 w-5" /></Link>
          </div>
          <div>
            <p data-reveal className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">{t("clients.title")}</p>
            <ul data-reveal-stagger className="grid grid-cols-2 gap-3 md:gap-4">
              {([["hospitals", "hospital"], ["centers", "medical"], ["clinics", "clinic"], ["pharmacies", "pharmacy"]] as const).map(([k, img]) => (
                <li key={k} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image src={`/images/client-${img}.webp`} alt="" fill sizes="(min-width:768px) 270px, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-deep/90 via-brand-deep/30 to-transparent" />
                  <p className="absolute inset-x-0 bottom-0 p-3.5 text-sm font-semibold leading-snug text-white">{t(`clients.items.${k}`)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. Where products come from */}
      <section className="bg-brand-deep text-white">
        <div className={`${SECTION} grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14`}>
          <div>
            <SectionHeading light eyebrow={t("sourcing.eyebrow")} title={t("sourcing.title")} intro={t("sourcing.text")} />
          </div>
          <SupplyRoute />
        </div>
      </section>

      {/* 6. Storage and delivery */}
      <section className={SECTION}>
        <SectionHeading eyebrow={t("operations.eyebrow")} title={t("operations.title")} />
        <div data-reveal-stagger className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {([["warehouse", 1800, 1344], ["delivery", 1500, 1120], ["products", 1500, 1120]] as const).map(([k, w, h]) => (
            <figure key={k} className="group">
              <div className="overflow-hidden rounded-lg">
                <Image src={`/images/${k}.webp`} alt={t(`images.${k}`)} width={w} height={h} sizes="(min-width:768px) 33vw, 100vw" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105 md:aspect-[4/3]" />
              </div>
              <figcaption className="mt-4">
                <h3 className="font-semibold text-brand-deep">{t(`operations.items.${k}.title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{t(`operations.items.${k}.text`)}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 7. Call to action */}
      <section className={SECTION}>
        <div data-reveal className="grid overflow-hidden rounded-lg bg-gradient-to-br from-brand to-brand-dark text-white lg:grid-cols-2">
          <div className="p-8 md:p-12">
            <h2 className="max-w-md font-display text-2xl font-semibold leading-tight md:text-[1.75rem]">{t("cta.title")}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-white/80">{t("cta.text")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-6 py-3 font-semibold text-brand-deep hover:brightness-110">{t("cta.primary")}</a>
              <Link href="/contact" className="rounded-md border border-white/40 px-6 py-3 font-semibold hover:bg-white/10">{t("cta.secondary")}</Link>
            </div>
            <p className="mt-6 text-sm text-white/70">{SITE.phones.join("  ·  ")}</p>
          </div>
          <Image src="/images/partners-2.webp" alt={t("images.partners")} width={1800} height={1005} sizes="(min-width:1024px) 50vw, 100vw" className="hidden h-full w-full object-cover object-center lg:block" />
        </div>
      </section>
    </>
  );
}

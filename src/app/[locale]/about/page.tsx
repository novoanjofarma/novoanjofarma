import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export default function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("aboutPage");
  const ti = useTranslations("images");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-6xl space-y-14 px-4 py-14 sm:px-6 md:py-16">
        <Image src="/images/warehouse.webp" alt={ti("warehouse")} width={1800} height={1344} sizes="(min-width:1152px) 1152px, 100vw"
          className="aspect-[3/1] w-full rounded-lg object-cover object-[50%_60%]" />
        <section data-reveal-stagger className="grid gap-6 md:grid-cols-2">
          {(["mission", "vision"] as const).map((k) => (
            <div key={k} className="rounded-lg bg-mint p-6">
              <h2 className="font-display text-2xl font-semibold text-brand-deep">{t(`${k}Title`)}</h2>
              <p className="mt-3 leading-relaxed text-muted">{t(`${k}Text`)}</p>
            </div>
          ))}
        </section>

        <section data-reveal>
          <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("authorizedTitle")}</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-muted">{t("authorizedText")}</p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("valuesTitle")}</h2>
          <ul data-reveal-stagger className="mt-6 grid gap-4 sm:grid-cols-2">
            {(["zero", "affordable", "reputation", "demand"] as const).map((k, i) => (
              <li key={k} className="flex items-start gap-4 rounded-lg border border-brand/10 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-semibold text-white">{i + 1}</span>
                <span className="pt-1 font-medium">{t(`values.${k}`)}</span>
              </li>
            ))}
          </ul>
        </section>

        <section data-reveal className="rounded-lg border border-brand/10 p-6">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("legalTitle")}</h2>
          <dl className="mt-5 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-[auto_1fr]">
            <dt className="font-semibold">{t("legal.name")}</dt>
            <dd className="text-muted">NOVO ANJO FARMA – COMÉRCIO E PRESTAÇÃO DE SERVIÇOS, (SU), LDA</dd>
            <dt className="font-semibold">{t("legal.nif")}</dt>
            <dd className="text-muted">{SITE.nif}</dd>
            <dt className="font-semibold">{t("legal.registry")}</dt>
            <dd className="text-muted">{SITE.registry}</dd>
            <dt className="font-semibold">{t("legal.address")}</dt>
            <dd className="text-muted">{SITE.mapsQuery}</dd>
          </dl>
        </section>
      </div>
    </>
  );
}

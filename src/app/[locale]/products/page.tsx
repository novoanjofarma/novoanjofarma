import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { use } from "react";
import { waLink } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { Icon } from "@/components/Icons";

export default function Products({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("productsPage");
  const ti = useTranslations("images");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-16">
        <CategoryGrid />
        <div data-reveal-stagger className="mt-12 grid gap-6 md:grid-cols-2">
          <Image src="/images/products.webp" alt={ti("products")} width={1500} height={1120} sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
          <Image src="/images/equipment.webp" alt={ti("equipment")} width={1500} height={1120} sizes="(min-width:768px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover" />
        </div>
        <section data-reveal className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-brand-deep">{t("equipmentTitle")}</h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {(["hospital", "consumables", "surgical", "lab"] as const).map((k) => (
              <li key={k} className="inline-flex items-center gap-2 rounded-md bg-mint px-5 py-2.5 font-medium text-brand-dark">
                <Icon name="flask" className="h-5 w-5" /> {t(`equipment.${k}`)}
              </li>
            ))}
          </ul>
        </section>
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-lg bg-brand-deep p-6 text-white md:flex-row md:items-center">
          <p className="max-w-xl text-white/85">{t("note")}</p>
          <a href={waLink()} target="_blank" rel="noopener noreferrer" className="rounded-md bg-accent px-6 py-3 font-semibold text-brand-deep hover:brightness-110">{t("cta")}</a>
        </div>
      </div>
    </>
  );
}

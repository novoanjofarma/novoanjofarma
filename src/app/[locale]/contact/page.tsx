import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { use } from "react";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icons";

export default function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations("contactPage");
  const ti = useTranslations("images");
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE.mapsQuery)}`;

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-16">
        <div data-reveal className="space-y-8">
          <div className="flex gap-4">
            <Icon name="pin" className="h-7 w-7 shrink-0 text-brand" />
            <div>
              <h2 className="font-semibold text-brand-deep">{t("addressTitle")}</h2>
              <p className="mt-1 text-muted">{t("address")}</p>
              <a href={maps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-semibold text-brand hover:underline">{t("openMaps")}</a>
            </div>
          </div>
          <div className="flex gap-4">
            <Icon name="phone" className="h-7 w-7 shrink-0 text-brand" />
            <div>
              <h2 className="font-semibold text-brand-deep">{t("phoneTitle")}</h2>
              {SITE.phones.map((p) => (
                <p key={p}><a href={`tel:+244${p.replace(/\s/g, "")}`} className="text-muted hover:text-brand">+244 {p}</a></p>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <Icon name="chat" className="h-7 w-7 shrink-0 text-brand" />
            <div>
              <h2 className="font-semibold text-brand-deep">Email</h2>
              <a href={`mailto:${SITE.email}`} className="text-muted hover:text-brand">{SITE.email}</a>
            </div>
          </div>
          <Image src="/images/pharmacy.webp" alt={ti("pharmacy")} width={1100} height={1473} sizes="(min-width:768px) 40vw, 100vw" className="aspect-[4/3] w-full rounded-lg object-cover object-[50%_30%]" />
        </div>
        <div data-reveal><ContactForm /></div>
      </div>
    </>
  );
}

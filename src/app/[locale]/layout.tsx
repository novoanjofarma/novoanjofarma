import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const heading = Montserrat({ variable: "--font-heading", subsets: ["latin"], display: "swap" });

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://novoanjofarma.vercel.app"),
    icons: { icon: "/brand/icon.png", apple: "/brand/apple-icon.png" },
    title: t("title"),
    description: t("description"),
    alternates: { canonical: `/${locale}`, languages: { pt: "/pt", en: "/en" } },
    openGraph: { title: t("title"), description: t("description"), locale: locale === "pt" ? "pt_AO" : "en", type: "website", siteName: "Novo Anjo Farma", images: [{ url: "/brand/og.jpg", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", images: ["/brand/og.jpg"] },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "cta" });

  return (
    <html lang={locale} className={`${inter.variable} ${heading.variable}`}>
      <body className="flex min-h-screen flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton label={t("primary")} />
          <ScrollReveal />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

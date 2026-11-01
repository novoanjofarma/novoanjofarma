"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Icon } from "./Icons";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/products", key: "products" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Transparent over the dark page hero; solid white once scrolled or when the mobile menu is open.
  const solid = scrolled || open;

  const lang = (
    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase" role="group" aria-label={t("language")}>
      {(["pt", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className={solid ? "text-ink/25" : "text-white/30"}>/</span>}
          <Link href={pathname} locale={l} hrefLang={l} aria-current={locale === l ? "true" : undefined}
            className={`transition-colors ${locale === l ? (solid ? "text-brand" : "text-white") : solid ? "text-ink/50 hover:text-brand" : "text-white/55 hover:text-white"}`}>
            {l}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,box-shadow,border-color] duration-300 ${solid ? "border-brand/10 bg-white/95 shadow-sm backdrop-blur" : "border-transparent bg-transparent"}`}>
      <div className="mx-auto grid h-16 max-w-6xl grid-cols-[auto_1fr] items-center gap-4 px-4 sm:px-6 md:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="Novo Anjo Farma" className="justify-self-start"><Logo light={!solid} /></Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} aria-current={active ? "page" : undefined}
                className={`group relative py-2 text-sm font-medium transition-colors ${solid ? (active ? "text-brand-deep" : "text-ink/70 hover:text-brand-deep") : active ? "text-white" : "text-white/75 hover:text-white"}`}>
                {t(l.key)}
                <span className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left bg-accent transition-transform duration-300 ${solid ? "!bg-brand" : ""} ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 justify-self-end">
          <a href={`tel:+244${SITE.phones[0].replace(/\s/g, "")}`}
            className={`hidden items-center gap-2 text-sm font-semibold transition-colors xl:flex ${solid ? "text-brand-deep hover:text-brand" : "text-white hover:text-accent"}`}>
            <Icon name="phone" className="h-4 w-4" /> {SITE.phones[0]}
          </a>
          <div className="hidden sm:block">{lang}</div>
          <Link href="/contact"
            className={`hidden rounded-md px-5 py-2 text-sm font-semibold transition-colors lg:inline-block ${solid ? "bg-brand text-white hover:bg-brand-dark" : "bg-accent text-brand-deep hover:brightness-110"}`}>
            {t("cta")}
          </Link>
          <button className={`-mr-2 rounded-md p-2 md:hidden ${solid ? "text-brand-deep" : "text-white"}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t("menu")}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand/10 bg-white px-4 pb-5 pt-2 shadow-lg md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}
              className={`flex items-center justify-between border-b border-brand/10 py-4 text-base font-medium ${pathname === l.href ? "text-brand" : "text-ink"}`}>
              {t(l.key)} <Icon name="arrow" className="h-4 w-4 text-brand/60" />
            </Link>
          ))}
          <div className="mt-4 flex items-center justify-between">
            <a href={`tel:+244${SITE.phones[0].replace(/\s/g, "")}`} className="flex items-center gap-2 text-sm font-semibold text-brand-deep">
              <Icon name="phone" className="h-4 w-4 text-brand" /> {SITE.phones[0]}
            </a>
            {lang}
          </div>
          <Link href="/contact" className="mt-4 block rounded-md bg-brand px-5 py-3 text-center font-semibold text-white">{t("cta")}</Link>
        </nav>
      )}
    </header>
  );
}

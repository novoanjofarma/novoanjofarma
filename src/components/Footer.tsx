import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const n = useTranslations("nav");
  const c = useTranslations("contactPage");
  return (
    <footer className="bg-brand-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">{t("tagline")}</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">{t("links")}</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {([["/", "home"], ["/about", "about"], ["/products", "products"], ["/contact", "contact"]] as const).map(([h, k]) => (
              <li key={h}><Link href={h} className="hover:text-accent">{n(k)}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">{t("contact")}</h3>
          <address className="mt-4 space-y-2 text-sm not-italic">
            <p>{c("address")}</p>
            <p><a href={`mailto:${SITE.email}`} className="hover:text-accent">{SITE.email}</a></p>
            {SITE.phones.map((p) => (
              <p key={p}><a href={`tel:+244${p.replace(/\s/g, "")}`} className="hover:text-accent">{p}</a></p>
            ))}
          </address>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Novo Anjo Farma – Comércio e Prestação de Serviços, (SU), Lda. {t("rights")}
      </div>
    </footer>
  );
}

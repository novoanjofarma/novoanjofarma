import Image from "next/image";
import { useTranslations } from "next-intl";

const cats = ["essential", "antimalarial", "antibiotic", "antiinflammatory", "cardio", "forms", "nutrition", "hospital"] as const;

export function CategoryGrid() {
  const t = useTranslations("categories.items");
  return (
    <div data-reveal-stagger className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
      {cats.map((k) => (
        <article key={k} className="group overflow-hidden rounded-lg border border-brand/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-lg">
          <div className="overflow-hidden">
            <Image src={`/images/cat-${k}.webp`} alt="" width={1200} height={896} sizes="(min-width:1024px) 280px, 50vw"
              className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
          <div className="p-3.5 sm:p-5">
            <h3 className="text-sm font-semibold leading-snug text-brand-deep sm:text-base">{t(`${k}.title`)}</h3>
            <p className="mt-2 hidden text-sm leading-relaxed text-muted sm:block">{t(`${k}.text`)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

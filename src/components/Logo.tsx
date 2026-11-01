import Image from "next/image";

/** `light` = for dark / transparent backgrounds (white emblem and text). */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      {light ? (
        <Image src="/brand/logo-mark-white.png" alt="" width={720} height={553} className="h-9 w-auto" priority />
      ) : (
        <Image src="/brand/logo-mark.png" alt="" width={584} height={433} className="h-9 w-auto" priority />
      )}
      <span className={`font-display text-[15px] font-bold uppercase leading-none tracking-wide ${light ? "text-white" : "text-brand-deep"}`}>
        Novo Anjo <span className={light ? "text-accent" : "text-brand"}>Farma</span>
      </span>
    </span>
  );
}

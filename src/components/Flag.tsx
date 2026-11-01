import Image from "next/image";

export type FlagCode = "ao" | "in" | "pt" | "cn";

export function Flag({ code, label, className = "h-6 w-8" }: { code: FlagCode; label: string; className?: string }) {
  return (
    <Image src={`/flags/${code}.svg`} alt={label} width={40} height={30} unoptimized
      className={`${className} rounded-[2px] object-cover shadow-sm ring-1 ring-black/10`} />
  );
}

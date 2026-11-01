import { useTranslations } from "next-intl";
import { ANGOLA_MAP as M } from "@/lib/angola-map";
import { Flag, type FlagCode } from "./Flag";

const origins: { code: FlagCode; key: "india" | "portugal" | "china"; y: number }[] = [
  { code: "in", key: "india", y: 60 },
  { code: "pt", key: "portugal", y: 180 },
  { code: "cn", key: "china", y: 300 },
];

/** Schematic (not geographic) route: three origin countries -> Angola, Luanda marked. */
export function SupplyRoute() {
  const t = useTranslations("sourcing.countries");
  const [lx, ly] = M.lu;
  const mapX = 430, mapY = 20, s = 0.85;
  const px = mapX + Number(lx) * s, py = mapY + Number(ly) * s;

  return (
    <div data-reveal className="relative w-full max-w-3xl">
      <svg viewBox="0 0 800 400" className="w-full" role="img" aria-label="India, Portugal, China → Luanda, Angola">
        {origins.map((o) => (
          <path key={o.code} d={`M 200 ${o.y} C 330 ${o.y}, 340 ${py}, ${px - 6} ${py}`} fill="none"
            className="dash-flow" stroke="#7cc5a0" strokeWidth="2" strokeDasharray="6 6" opacity="0.9" />
        ))}
        <g transform={`translate(${mapX} ${mapY}) scale(${s})`}>
          <path d={M.d} fill="#ffffff" fillOpacity="0.14" stroke="#7cc5a0" strokeWidth="1.5" strokeLinejoin="round" />
        </g>
        <circle cx={px} cy={py} r="16" fill="#7cc5a0" opacity="0.25">
          <animate attributeName="r" values="8;22;8" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={px} cy={py} r="6" fill="#7cc5a0" stroke="#fff" strokeWidth="2" />
        <text x={px + 14} y={py - 12} fill="#fff" fontSize="18" fontWeight="700">Luanda</text>
        <text x={mapX + 140} y={mapY + 370} fill="#fff" fillOpacity="0.6" fontSize="14" letterSpacing="2">ANGOLA</text>
      </svg>
      <ul className="pointer-events-none absolute left-0 top-0 h-full w-[25%]">
        {origins.map((o) => (
          <li key={o.code} className="absolute left-0 flex -translate-y-1/2 items-center gap-2.5 rounded-md bg-white/10 px-3 py-2 backdrop-blur ring-1 ring-white/20"
            style={{ top: `${(o.y / 400) * 100}%` }}>
            <Flag code={o.code} label="" className="h-5 w-7" />
            <span className="text-sm font-semibold">{t(o.key)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

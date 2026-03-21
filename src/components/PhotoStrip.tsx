import { IMAGES } from "@/lib/constants";
import type { Dictionary } from "@/lib/i18n/en";

export function PhotoStrip({ dict }: { dict: Dictionary }) {
  return (
    <div className="flex overflow-hidden bg-dark">
      {IMAGES.photoStrip.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={src}
          alt={dict.photoStrip.alts[i]}
          className="flex-1 min-w-0 h-[220px] max-md:h-[140px] object-cover brightness-90 transition-all duration-400 hover:brightness-105 hover:flex-[1.4] max-[480px]:w-1/2 max-[480px]:flex-none max-[480px]:h-[120px]"
        />
      ))}
    </div>
  );
}

import { ArrowRight } from "lucide-react";
import { IMAGES, CONTACT } from "@/lib/constants";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

export function CTABanner({ dict }: { dict: Dictionary }) {
  const d = dict.cta;
  const uc = useUC();
  return (
    <section
      id="contact"
      className="text-center text-warm-white py-20 px-6 md:px-12"
      style={{
        background: `linear-gradient(160deg, rgba(26,26,26,0.75), rgba(74,14,26,0.45)), url('${IMAGES.ctaBanner}') center/cover`,
      }}
    >
      <div>
        <span className="font-[family-name:var(--font-nav)] inline-block text-[0.68rem] tracking-[0.3em] uppercase text-[#E2C87E] mb-4">
          {uc(d.tag)}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] text-white mb-3">
          {d.title}
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-[0.92rem] text-[rgba(255,255,255,0.85)] mb-8 max-w-[480px] mx-auto leading-[1.7] font-light">
          {d.subtitle}
        </p>
        <a
          href={CONTACT.whatsappUrl(d.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-nav)] inline-flex items-center gap-3 py-3.5 px-8 bg-[#C9A84C] text-[#1A1A1A] no-underline text-[0.75rem] font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#E2C87E] hover:gap-4"
        >
          {uc(d.button)}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

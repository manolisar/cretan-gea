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
        background: `linear-gradient(160deg, rgba(44,36,22,0.72), rgba(92,107,60,0.5)), url('${IMAGES.ctaBanner}') center/cover`,
      }}
    >
      <div>
        <span className="inline-block text-[0.68rem] tracking-[0.3em] uppercase text-gold mb-4">
          {uc(d.tag)}
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.2] text-white mb-3">
          {d.title}
        </h2>
        <p className="text-base text-[rgba(255,255,255,0.88)] mb-8 max-w-[480px] mx-auto leading-[1.7]">
          {d.subtitle}
        </p>
        <a
          href={CONTACT.whatsappUrl(d.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 py-3.5 px-8 bg-earth text-warm-white no-underline text-[0.82rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-earth-dark hover:gap-4"
        >
          {uc(d.button)}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

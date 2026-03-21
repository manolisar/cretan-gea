import { ArrowRight } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

export function Hero({ dict }: { dict: Dictionary }) {
  const h = dict.hero;
  const uc = useUC();
  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden parallax-bg"
      style={{
        backgroundImage: `url('${IMAGES.hero}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Cinematic gradient — darker bottom, vignette edges */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(44,36,22,0.3)] via-[rgba(44,36,22,0.15)] to-[rgba(44,36,22,0.7)]" />
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse at center, transparent 50%, rgba(44,36,22,0.35) 100%)",
      }} />

      {/* Olive branch decorative SVG — positioned top-right, semi-transparent */}
      <svg
        className="absolute top-32 right-8 md:right-16 opacity-[0.07] pointer-events-none"
        width="180"
        height="320"
        viewBox="0 0 180 320"
        fill="none"
      >
        <path
          d="M90 0V320"
          stroke="rgba(250,248,244,1)"
          strokeWidth="1"
        />
        <ellipse cx="70" cy="60" rx="20" ry="32" fill="rgba(250,248,244,1)" transform="rotate(-20 70 60)" />
        <ellipse cx="110" cy="100" rx="20" ry="32" fill="rgba(250,248,244,1)" transform="rotate(20 110 100)" />
        <ellipse cx="65" cy="150" rx="18" ry="28" fill="rgba(250,248,244,1)" transform="rotate(-25 65 150)" />
        <ellipse cx="115" cy="200" rx="18" ry="28" fill="rgba(250,248,244,1)" transform="rotate(25 115 200)" />
        <ellipse cx="70" cy="250" rx="16" ry="24" fill="rgba(250,248,244,1)" transform="rotate(-20 70 250)" />
      </svg>

      <div className="relative z-[2] max-w-[720px] px-6 md:px-12 mt-8">
        {/* Thin gold decorative line above badge */}
        <div
          className="w-10 h-px bg-gold mb-6 animate-[fadeIn_0.6s_0.2s_forwards] opacity-0"
        />

        <div className="inline-block text-[0.72rem] tracking-[0.3em] uppercase text-[rgba(250,248,244,0.85)] border border-[rgba(250,248,244,0.35)] py-1.5 px-5 mb-6 animate-[fadeUp_0.8s_0.5s_forwards] opacity-0">
          {uc(h.location)}
        </div>
        <h1 className="font-[family-name:var(--font-display)] hero-title text-[clamp(2.2rem,4.2vw,3.8rem)] font-normal text-white leading-[1.2] mb-5 [text-shadow:0_2px_25px_rgba(0,0,0,0.4),0_1px_4px_rgba(0,0,0,0.3)] animate-[fadeUp_0.8s_0.8s_forwards] opacity-0">
          {h.titleLine1}
          <br />
          {h.titleLine2}{" "}
          <em className="italic underline decoration-[rgba(197,165,90,0.7)] underline-offset-[6px] decoration-2">
            {h.titleHighlight}
          </em>
          <br />
          {h.titleLine3}
        </h1>
        <p className="text-[0.97rem] text-[rgba(255,255,255,0.92)] leading-[1.7] max-w-[480px] mb-8 [text-shadow:0_1px_10px_rgba(0,0,0,0.3)] animate-[fadeUp_0.8s_1.1s_forwards] opacity-0">
          {h.subtitle}
        </p>
        <a
          href="#activities"
          className="inline-flex items-center gap-3 py-3.5 px-8 border border-[rgba(250,248,244,0.6)] bg-transparent text-warm-white no-underline text-[0.82rem] font-semibold tracking-[0.12em] uppercase transition-all duration-300 hover:bg-earth hover:border-earth hover:gap-4 animate-[fadeUp_0.8s_1.4s_forwards] opacity-0"
        >
          {uc(h.cta)}
          <ArrowRight size={18} className="transition-transform duration-300" />
        </a>
      </div>

      {/* Scroll indicator — thin line with pulsing dot */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0">
        <div className="w-[1.5px] h-12 bg-gradient-to-b from-[rgba(250,248,244,0.4)] to-transparent relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[rgba(250,248,244,0.8)]"
            style={{ animation: "pulseDot 2s ease-in-out infinite" }}
          />
        </div>
        <span className="text-[rgba(250,248,244,0.4)] text-[0.6rem] tracking-[0.25em] uppercase mt-3">
          {uc(h.scroll)}
        </span>
      </div>
    </section>
  );
}

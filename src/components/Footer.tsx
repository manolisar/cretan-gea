import { IMAGES, SITE, SOCIAL } from "@/lib/constants";
import { Facebook, Instagram, ChevronUp } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/en";

interface FooterProps {
  dict: Dictionary;
  locale: string;
}

export function Footer({ dict, locale }: FooterProps) {
  const d = dict.footer;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-dark text-[rgba(250,248,244,0.6)] pt-14 pb-8 px-6 md:px-12">
      {/* Gradient top border: transparent -> gold -> transparent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.2fr] gap-12 max-w-[1100px] mb-10">
        {/* Brand */}
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMAGES.logo}
            alt="Cretan Gea"
            className="h-11 mb-4"
            style={{ filter: "brightness(0) invert(1)" }}
          />
          <p className="text-[0.88rem] leading-[1.7] max-w-[280px]">
            {d.brandDescription}
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold text-warm-white mb-4">
            {d.explore}
          </h4>
          <ul className="space-y-2">
            <li>
              <a href={`/${locale}/#activities`} className="text-[rgba(250,248,244,0.5)] no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold">
                {d.cooking}
              </a>
            </li>
            <li>
              <a href={`/${locale}/#activities`} className="text-[rgba(250,248,244,0.5)] no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold">
                {d.ceramics}
              </a>
            </li>
            <li>
              <a href={`/${locale}/#workshops`} className="text-[rgba(250,248,244,0.5)] no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold">
                {d.workshops}
              </a>
            </li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold text-warm-white mb-4">
            {d.info}
          </h4>
          <ul className="space-y-2">
            <li>
              <a href={`/${locale}/#faq`} className="text-[rgba(250,248,244,0.5)] no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold">
                {d.faq}
              </a>
            </li>
            <li>
              <a href={`/${locale}/#contact`} className="text-[rgba(250,248,244,0.5)] no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold">
                {d.contact}
              </a>
            </li>
          </ul>
        </div>

        {/* Visit */}
        <div>
          <h4 className="font-[family-name:var(--font-display)] text-[1.05rem] font-semibold text-warm-white mb-4">
            {d.visitUs}
          </h4>
          <p className="text-[0.85rem] leading-[1.8]">
            {d.address1}
            <br />
            {d.address2}
          </p>
          <p className="mt-2.5">
            <a
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold no-underline text-[0.85rem] transition-colors duration-300 hover:text-gold"
            >
              {d.viewOnMaps} &rarr;
            </a>
          </p>
        </div>
      </div>

      <div className="border-t border-[rgba(250,248,244,0.08)] pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.75rem]">
        <span>&copy; {new Date().getFullYear()} {d.copyright}</span>

        <div className="flex items-center gap-4">
          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="w-8 h-8 flex items-center justify-center border border-[rgba(250,248,244,0.15)] rounded-full text-[rgba(250,248,244,0.5)] transition-all duration-300 hover:border-gold hover:text-gold cursor-pointer bg-transparent"
            aria-label="Back to top"
          >
            <ChevronUp size={14} />
          </button>

          <a
            href={SOCIAL.facebook}
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="w-8 h-8 flex items-center justify-center border border-[rgba(250,248,244,0.15)] rounded-full text-[0.8rem] transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <Facebook size={14} />
          </a>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="w-8 h-8 flex items-center justify-center border border-[rgba(250,248,244,0.15)] rounded-full text-[0.8rem] transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <Instagram size={14} />
          </a>
          <a
            href={SOCIAL.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            title="TikTok"
            className="w-8 h-8 flex items-center justify-center border border-[rgba(250,248,244,0.15)] rounded-full text-[0.8rem] transition-all duration-300 hover:border-gold hover:text-gold"
          >
            <span className="text-xs font-bold">T</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

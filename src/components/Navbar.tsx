"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { IMAGES, CONTACT } from "@/lib/constants";
import { routeHref } from "@/utils/assetUrl";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useUC } from "@/hooks/useGreekUpperCase";
import type { Dictionary } from "@/lib/i18n/en";

interface NavbarProps {
  dict: Dictionary;
  locale: string;
}

export function Navbar({ dict, locale }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const uc = useUC();

  const navLinks = [
    { href: routeHref(`/${locale}/#experiences`), label: dict.nav.experiences },
    { href: routeHref(`/${locale}/recipes`), label: dict.nav.recipes },
    { href: routeHref(`/${locale}/#gallery`), label: dict.nav.gallery },
    { href: routeHref(`/${locale}/#testimonials`), label: dict.nav.reviews },
    { href: routeHref(`/${locale}/#faq`), label: dict.nav.faq },
    { href: routeHref(`/${locale}/#contact`), label: dict.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-500 ease-in-out ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-[rgba(26,26,26,0.97)] backdrop-blur-[16px] border-b border-[rgba(201,168,76,0.15)] shadow-[0_2px_20px_rgba(0,0,0,0.15)]"
          : "py-5 px-6 md:px-12 bg-transparent border-b border-transparent"
      }`}
    >
      <a
        href={routeHref(`/${locale}`)}
        className="transition-all duration-300 flex items-center justify-center rounded-full border border-[rgba(201,168,76,0.35)] hover:border-[rgba(201,168,76,0.6)]"
        style={{
          width: scrolled ? 52 : 68,
          height: scrolled ? 52 : 68,
          background: scrolled
            ? "rgba(26,26,26,0.85)"
            : "rgba(26,26,26,0.45)",
          backdropFilter: "blur(8px)",
          padding: scrolled ? 6 : 8,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.logo}
          alt="Cretan Gea Logo"
          className="transition-all duration-300 w-full h-full object-contain"
        />
      </a>

      {/* Desktop nav */}
      <div className="hidden lg:flex gap-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`font-[family-name:var(--font-nav)] text-[0.7rem] font-medium tracking-[0.12em] uppercase no-underline relative transition-all duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-[width] after:duration-300 hover:after:w-full ${
              scrolled
                ? "text-[rgba(226,200,126,0.6)] hover:text-[#E2C87E] after:bg-[#C9A84C]"
                : "text-white/90 hover:text-white after:bg-white/70"
            }`}
          >
            {uc(link.label)}
          </a>
        ))}
        <LanguageSwitcher locale={locale} scrolled={scrolled} />
        <a
          href={CONTACT.whatsappUrl(dict.whatsapp.defaultMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-[family-name:var(--font-nav)] py-2.5 px-6 text-[0.7rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:-translate-y-[1px] ${
            scrolled
              ? "bg-[#C9A84C] text-[#1A1A1A] hover:bg-[#E2C87E]"
              : "bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1A1A1A]"
          }`}
        >
          {uc(dict.nav.bookNow)}
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`lg:hidden transition-colors duration-300 ${scrolled ? "text-[#E2C87E]" : "text-white"}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-[rgba(26,26,26,0.98)] backdrop-blur-[16px] border-b border-[rgba(201,168,76,0.15)] shadow-lg lg:hidden">
          <div className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-nav)] py-3 text-[0.78rem] font-medium text-[rgba(226,200,126,0.6)] tracking-[0.12em] uppercase no-underline border-b border-[rgba(201,168,76,0.1)] transition-colors duration-300 hover:text-[#E2C87E]"
              >
                {uc(link.label)}
              </a>
            ))}
            <div className="py-3 border-b border-[rgba(201,168,76,0.1)]">
              <LanguageSwitcher locale={locale} scrolled={scrolled} />
            </div>
            <a
              href={CONTACT.whatsappUrl(dict.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-nav)] mt-3 py-3 px-6 bg-[#C9A84C] text-[#1A1A1A] text-center text-[0.78rem] tracking-[0.15em] uppercase font-medium transition-all duration-300 hover:bg-[#E2C87E]"
            >
              {uc(dict.nav.bookNow)}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

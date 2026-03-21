"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { IMAGES, CONTACT } from "@/lib/constants";
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
    { href: `/${locale}/#activities`, label: dict.nav.activities },
    { href: `/${locale}/#workshops`, label: dict.nav.workshops },
    { href: `/${locale}/#gallery`, label: dict.nav.gallery },
    { href: `/${locale}/#testimonials`, label: dict.nav.reviews },
    { href: `/${locale}/#faq`, label: dict.nav.faq },
    { href: `/${locale}/#contact`, label: dict.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between transition-all duration-300 ease-in-out ${
        scrolled
          ? "py-3 px-6 md:px-12 bg-[rgba(250,248,244,0.95)] backdrop-blur-[12px] border-b border-[rgba(139,111,71,0.1)] shadow-[0_2px_20px_rgba(44,36,22,0.06)]"
          : "py-5 px-6 md:px-12 bg-transparent border-b border-transparent"
      }`}
    >
      <a href={`/${locale}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMAGES.logo}
          alt="Cretan Gea Logo"
          className="transition-all duration-300"
          style={{
            height: scrolled ? 48 : 64,
            width: "auto",
            filter: scrolled ? "none" : "brightness(0) invert(1)",
          }}
        />
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-8 items-center">
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={`text-[0.82rem] font-medium tracking-[0.06em] uppercase no-underline relative transition-all duration-300 after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:transition-[width] after:duration-300 hover:after:w-full ${
              scrolled
                ? "text-dark hover:text-earth after:bg-earth"
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
          className={`py-2.5 px-6 text-[0.78rem] tracking-[0.12em] uppercase font-medium rounded-sm transition-all duration-300 hover:-translate-y-[1px] ${
            scrolled
              ? "bg-earth text-warm-white hover:bg-earth-dark"
              : "bg-transparent border border-gold text-gold hover:bg-gold hover:text-dark"
          }`}
        >
          {uc(dict.nav.bookNow)}
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className={`md:hidden transition-colors duration-300 ${scrolled ? "text-dark" : "text-white"}`}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-warm-white border-b border-cream-dark shadow-lg md:hidden">
          <div className="flex flex-col py-4 px-6 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-[0.88rem] font-medium text-dark tracking-[0.06em] uppercase no-underline border-b border-cream-dark/50 transition-colors duration-300 hover:text-earth"
              >
                {uc(link.label)}
              </a>
            ))}
            <div className="py-3 border-b border-cream-dark/50">
              <LanguageSwitcher locale={locale} scrolled={scrolled} />
            </div>
            <a
              href={CONTACT.whatsappUrl(dict.whatsapp.defaultMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 py-3 px-6 bg-earth text-warm-white text-center text-[0.82rem] tracking-[0.12em] uppercase font-medium rounded-sm transition-all duration-300 hover:bg-earth-dark"
            >
              {uc(dict.nav.bookNow)}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

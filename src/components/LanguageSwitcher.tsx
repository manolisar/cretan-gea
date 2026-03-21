import { useLocation } from "react-router-dom";
import { routeHref } from "@/utils/assetUrl";

interface LanguageSwitcherProps {
  locale: string;
  scrolled?: boolean;
}

export function LanguageSwitcher({ locale, scrolled = true }: LanguageSwitcherProps) {
  const location = useLocation();

  const switchTo = locale === "en" ? "gr" : "en";
  const label = locale === "en" ? "GR" : "EN";

  const newPath = location.pathname.replace(/^\/(en|gr)/, `/${switchTo}`);

  return (
    <a
      href={routeHref(newPath)}
      className={`font-[family-name:var(--font-nav)] text-[0.7rem] font-medium tracking-[0.12em] uppercase py-1 px-3 transition-all duration-300 no-underline ${
        scrolled
          ? "text-[#E2C87E] border border-[rgba(201,168,76,0.3)] hover:bg-[#C9A84C] hover:text-[#1A1A1A]"
          : "text-white/80 border border-white/40 hover:bg-white/20 hover:text-white"
      }`}
    >
      {label}
    </a>
  );
}

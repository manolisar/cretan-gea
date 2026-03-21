import { useLocation } from "react-router-dom";

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
      href={newPath}
      className={`text-[0.78rem] font-semibold tracking-[0.06em] uppercase py-1 px-3 rounded-sm transition-all duration-300 no-underline ${
        scrolled
          ? "text-earth border border-earth/30 hover:bg-earth hover:text-warm-white"
          : "text-white/80 border border-white/40 hover:bg-white/20 hover:text-white"
      }`}
    >
      {label}
    </a>
  );
}

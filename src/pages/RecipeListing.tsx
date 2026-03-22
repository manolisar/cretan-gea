import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Clock, Users, ArrowRight } from "lucide-react";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { STATIC_RECIPES } from "@/lib/recipe-data";
import { localizeRecipe } from "@/utils/localizeRecipe";
import { routeHref } from "@/utils/assetUrl";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { greekUpperCase } from "@/utils/greekUpperCase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function RecipeListing() {
  const { locale = "en" } = useParams<{ locale: string }>();
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    document.documentElement.lang = locale === "gr" ? "el" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);

  if (!isValidLocale(locale)) return <Navigate to="/en" replace />;

  const dict = getDictionary(locale as Locale);
  const d = dict.recipes;
  const uc = (text: string) => locale === "gr" ? greekUpperCase(text) : text;

  const recipes = STATIC_RECIPES.map((r) => localizeRecipe(r, locale));
  const filtered = filter === "all" ? recipes : recipes.filter((r) => r.category === filter);

  const categories = [
    { key: "all", label: d.categories.all },
    { key: "appetizer", label: d.categories.appetizer },
    { key: "main", label: d.categories.main },
    { key: "pie", label: d.categories.pie },
  ];

  return (
    <LocaleProvider value={locale}>
      <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
        <Navbar dict={dict} locale={locale} />

        {/* Hero */}
        <section
          className="pt-32 pb-16 px-6 md:px-12 text-center"
          style={{ background: "#4A0E1A" }}
        >
          <span className="font-[family-name:var(--font-nav)] inline-block text-[0.68rem] tracking-[0.3em] uppercase text-gold mb-4">
            {uc(d.tag)}
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.5rem)] font-normal text-[#F5EDDA] leading-[1.15] mb-4">
            {d.title}
          </h1>
          <p className="font-[family-name:var(--font-sans)] text-[0.95rem] text-[rgba(245,237,218,0.6)] max-w-[520px] mx-auto leading-[1.7]">
            {d.subtitle}
          </p>
        </section>

        {/* Category filter */}
        <div className="bg-[#F9F5EE] border-b border-[rgba(201,168,76,0.15)]">
          <div className="max-w-[1100px] mx-auto px-6 py-4 flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className="transition-all duration-200 cursor-pointer"
                style={{
                  padding: "8px 20px",
                  borderRadius: 20,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                  border: filter === cat.key ? "1.5px solid #6B1D2A" : "1.5px solid #E8DFD0",
                  background: filter === cat.key ? "#6B1D2A" : "transparent",
                  color: filter === cat.key ? "#FAF8F4" : "#2C2416",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe cards */}
        <section className="py-16 px-6 md:px-12">
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((recipe) => (
              <a
                key={recipe.slug}
                href={routeHref(`/${locale}/recipes/${recipe.slug}`)}
                className="group block rounded-lg overflow-hidden bg-[#FFFCF5] border border-[rgba(201,168,76,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(44,36,22,0.1)]"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(44,36,22,0.5)] to-transparent" />
                  {/* Difficulty badge */}
                  <span
                    className="absolute top-3 right-3 text-[0.7rem] font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(44,36,22,0.7)",
                      backdropFilter: "blur(6px)",
                      color: "#E2C87E",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {d.difficultyLabels[recipe.difficulty]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-[family-name:var(--font-display)] text-[1.4rem] font-semibold text-[#1A1A1A] mb-2 leading-tight">
                    {recipe.title}
                  </h3>
                  <p className="text-[0.85rem] text-[#8A8075] leading-[1.6] mb-4" style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {recipe.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex gap-4 text-[0.78rem] text-[#8A8075] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-gold" />
                      {recipe.prepTime}
                    </span>
                    {recipe.cookTime !== "—" && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-burgundy" />
                        {recipe.cookTime}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <Users size={14} className="text-gold" />
                      {recipe.servings}
                    </span>
                  </div>

                  {/* Read more */}
                  <span className="font-[family-name:var(--font-nav)] inline-flex items-center gap-2 text-burgundy text-[0.72rem] font-semibold tracking-[0.12em] uppercase group-hover:gap-3 transition-all duration-300">
                    {uc(d.readMore)}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <Footer dict={dict} locale={locale} />
        <WhatsAppFloat dict={dict} />
      </div>
    </LocaleProvider>
  );
}

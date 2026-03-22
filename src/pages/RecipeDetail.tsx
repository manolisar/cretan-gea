import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, ChefHat, Lightbulb, ArrowRight } from "lucide-react";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { STATIC_RECIPES } from "@/lib/recipe-data";
import { RECIPE_CONTENT } from "@/lib/recipe-content";
import { RECIPE_CONTENT_GR } from "@/lib/i18n/recipe-content.gr";
import { localizeRecipe } from "@/utils/localizeRecipe";
import { routeHref } from "@/utils/assetUrl";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { greekUpperCase } from "@/utils/greekUpperCase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function RecipeDetail() {
  const { locale = "en", slug } = useParams<{ locale: string; slug: string }>();

  useEffect(() => {
    document.documentElement.lang = locale === "gr" ? "el" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);

  if (!isValidLocale(locale)) return <Navigate to="/en" replace />;

  const rawRecipe = STATIC_RECIPES.find((r) => r.slug === slug);
  if (!rawRecipe) return <Navigate to={`/${locale}/recipes`} replace />;

  const recipe = localizeRecipe(rawRecipe, locale);
  const contentMap = locale === "gr" ? RECIPE_CONTENT_GR : RECIPE_CONTENT;
  const content = contentMap[recipe.slug];
  if (!content) return <Navigate to={`/${locale}/recipes`} replace />;

  const dict = getDictionary(locale as Locale);
  const d = dict.recipeDetail;
  const rd = dict.recipes;
  const uc = (text: string) => locale === "gr" ? greekUpperCase(text) : text;

  return (
    <LocaleProvider value={locale}>
      <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
        <Navbar dict={dict} locale={locale} />

        {/* Hero */}
        <section
          style={{
            height: "50vh",
            minHeight: 360,
            display: "flex",
            alignItems: "flex-end",
            position: "relative",
            background: `linear-gradient(to top, rgba(44,36,22,0.8) 0%, rgba(44,36,22,0.3) 40%, rgba(44,36,22,0.15) 100%), url('${content.heroImage}') center/cover`,
          }}
        >
          <a
            href={routeHref(`/${locale}/recipes`)}
            style={{ position: "absolute", top: 96, left: 24, zIndex: 10, display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", textDecoration: "none" }}
          >
            <ArrowLeft size={16} />
            {d.backToRecipes}
          </a>

          <div style={{ position: "relative", zIndex: 10, padding: "0 24px 48px", maxWidth: 900 }}>
            <h1
              className="font-[family-name:var(--font-display)]"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: 12 }}
            >
              {recipe.title}
            </h1>
          </div>
        </section>

        {/* Meta bar */}
        <section style={{ background: "#F5F0E8", borderBottom: "1px solid #E8DFD0" }}>
          <div style={{ maxWidth: 960, margin: "0 auto", padding: "20px 24px" }}>
            <div className="flex flex-wrap gap-6 md:gap-10">
              <MetaItem label={d.prepTime} value={recipe.prepTime} />
              {recipe.cookTime !== "—" && <MetaItem label={d.cookTime} value={recipe.cookTime} />}
              <MetaItem label={d.servings} value={String(recipe.servings)} />
              <MetaItem label={d.difficulty} value={rd.difficultyLabels[recipe.difficulty]} />
            </div>
          </div>
        </section>

        {/* Main content */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>

          {/* Introduction */}
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            {content.introduction.map((p, i) => (
              <p key={i} style={{ fontSize: "0.95rem", color: "rgba(44,36,22,0.8)", lineHeight: 1.85, marginBottom: 16 }}>
                {p}
              </p>
            ))}
          </section>

          {/* Ingredients */}
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2
              className="font-[family-name:var(--font-display)]"
              style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}
            >
              <ChefHat size={22} style={{ color: "#6B1D2A" }} />
              {d.ingredients}
            </h2>
            {content.ingredients.map((group, gi) => (
              <div key={gi} style={{ marginBottom: group.group ? 20 : 0 }}>
                {group.group && (
                  <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 10, color: "#6B1D2A" }}>
                    {group.group}
                  </h3>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {group.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 10, fontSize: "0.92rem", color: "rgba(44,36,22,0.75)", lineHeight: 1.7, marginBottom: 8 }}>
                      <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: 2 }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Instructions */}
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2
              className="font-[family-name:var(--font-display)]"
              style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}
            >
              {d.instructions}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {content.steps.map((step, i) => (
                <div key={i}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#6B1D2A",
                        color: "#F5EDDA",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        flexShrink: 0,
                        marginTop: 2,
                      }}
                    >
                      {i + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "0.92rem", color: "rgba(44,36,22,0.8)", lineHeight: 1.75 }}>
                        {step.instruction}
                      </p>
                      {step.tip && (
                        <div
                          style={{
                            marginTop: 12,
                            padding: "12px 16px",
                            background: "rgba(201,168,76,0.08)",
                            borderLeft: "3px solid #C9A84C",
                            borderRadius: "0 6px 6px 0",
                          }}
                        >
                          <p style={{ fontSize: "0.85rem", color: "#8B7332", lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                            <Lightbulb size={16} style={{ flexShrink: 0, marginTop: 2, color: "#C9A84C" }} />
                            <span><strong>{d.tip}:</strong> {step.tip}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chef's Notes */}
          {content.chefNotes && content.chefNotes.length > 0 && (
            <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
              <h2
                className="font-[family-name:var(--font-display)]"
                style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}
              >
                {d.chefNotes}
              </h2>
              <div style={{ background: "#F5F0E8", borderRadius: 10, padding: 24 }}>
                {content.chefNotes.map((note, i) => (
                  <p key={i} style={{ fontSize: "0.9rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.7, marginBottom: i < content.chefNotes!.length - 1 ? 12 : 0, display: "flex", gap: 10 }}>
                    <span style={{ color: "#6B1D2A", flexShrink: 0 }}>✦</span>
                    {note}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* CTA — Learn to make this */}
          {content.relatedActivity && (
            <section style={{ padding: "48px 0 56px" }}>
              <div style={{ background: "#4A0E1A", borderRadius: 16, padding: "40px 32px", textAlign: "center" }}>
                <h2
                  className="font-[family-name:var(--font-display)]"
                  style={{ fontSize: "1.4rem", fontWeight: 600, color: "#F5EDDA", marginBottom: 12 }}
                >
                  {d.tryItAt}
                </h2>
                <p style={{ fontSize: "0.88rem", color: "rgba(245,237,218,0.55)", marginBottom: 28, maxWidth: 480, margin: "0 auto 28px" }}>
                  {d.tryItDescription}
                </p>
                <a
                  href={routeHref(`/${locale}/activities/${content.relatedActivity}`)}
                  className="font-[family-name:var(--font-nav)] inline-flex items-center gap-3 py-3.5 px-8 bg-[#C9A84C] text-[#1A1A1A] no-underline text-[0.75rem] font-semibold tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[#E2C87E] hover:gap-4"
                >
                  {uc(d.tryItButton)}
                  <ArrowRight size={18} />
                </a>
              </div>
            </section>
          )}
        </div>

        <Footer dict={dict} locale={locale} />
        <WhatsAppFloat dict={dict} />
      </div>
    </LocaleProvider>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "#7A7263", marginBottom: 2 }}>{label}</p>
      <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#2C2416" }}>{value}</p>
    </div>
  );
}

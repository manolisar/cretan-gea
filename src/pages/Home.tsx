import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { TESTIMONIALS, FAQ_ITEMS, LOCAL_AREA_LINKS } from "@/lib/constants";
import { TESTIMONIALS_GR, FAQ_ITEMS_GR, LOCAL_AREA_LINKS_GR } from "@/lib/i18n/constants.gr";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { OurStory } from "@/components/OurStory";
import { SectionDivider } from "@/components/SectionDivider";
import { Activities } from "@/components/Activities";
import { Workshops } from "@/components/Workshops";
import { Gallery } from "@/components/Gallery";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { Testimonials } from "@/components/Testimonials";
import { ElfsightWidget } from "@/components/ElfsightWidget";
import { FAQ } from "@/components/FAQ";
import { CTABanner } from "@/components/CTABanner";
import { LocalArea } from "@/components/LocalArea";
import { Footer } from "@/components/Footer";
import { AboutTeam } from "@/components/AboutTeam";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export default function Home() {
  const { locale = "en" } = useParams<{ locale: string }>();

  useEffect(() => {
    document.documentElement.lang = locale === "gr" ? "el" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);

  if (!isValidLocale(locale)) {
    return <Navigate to="/en" replace />;
  }

  const dict = getDictionary(locale as Locale);
  const testimonials = locale === "gr" ? TESTIMONIALS_GR : TESTIMONIALS;
  const faqItems = locale === "gr" ? FAQ_ITEMS_GR : FAQ_ITEMS;
  const localAreaLinks = locale === "gr" ? LOCAL_AREA_LINKS_GR : LOCAL_AREA_LINKS;

  return (
    <LocaleProvider value={locale}>
      <Navbar dict={dict} locale={locale} />
      <Hero dict={dict} />
      <OurStory dict={dict} />
      <AboutTeam dict={dict} />
      <SectionDivider variant="leaf" />
      <Activities dict={dict} locale={locale} />
      <Workshops dict={dict} locale={locale} />
      <Gallery dict={dict} />
      <SectionDivider variant="dots" />
      <AvailabilityCalendar dict={dict} />
      <Testimonials dict={dict} testimonials={testimonials} />
      <SectionDivider variant="line" />
      <ElfsightWidget dict={dict} />
      <FAQ dict={dict} faqItems={faqItems} />
      <CTABanner dict={dict} />
      <LocalArea dict={dict} links={localAreaLinks} />
      <Footer dict={dict} locale={locale} />
      <WhatsAppFloat dict={dict} />
    </LocaleProvider>
  );
}

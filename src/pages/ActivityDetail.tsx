import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import {
  ArrowLeft, Clock, Users, MapPin, Euro, Phone,
  MessageCircle, Mail, ChefHat, Check, Star, Info,
} from "lucide-react";
import { isValidLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { CONTACT, SITE } from "@/lib/constants";
import { ACTIVITY_CONTENT } from "@/lib/activity-content";
import { ACTIVITY_CONTENT_GR } from "@/lib/i18n/activity-content.gr";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { greekUpperCase } from "@/utils/greekUpperCase";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

interface Activity {
  id: string;
  name: string;
  type: string;
  description: string;
  price: number;
  capacity: number;
  duration: string;
  imageUrl: string;
  active: boolean;
}

export default function ActivityDetail() {
  const { locale = "en", id } = useParams<{ locale: string; id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale === "gr" ? "el" : "en";
    return () => { document.documentElement.lang = "en"; };
  }, [locale]);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/activities/${id}`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data) {
          if (!data.active) { setNotFound(true); }
          else { setActivity(data); }
          setLoading(false);
        }
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  if (!isValidLocale(locale)) return <Navigate to="/en" replace />;
  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}><p>{locale === "gr" ? "Φόρτωση..." : "Loading..."}</p></div>;
  if (notFound || !activity) return <Navigate to={`/${locale}`} replace />;

  const dict = getDictionary(locale as Locale);
  const d = dict.activityDetail;
  const contentMap = locale === "gr" ? ACTIVITY_CONTENT_GR : ACTIVITY_CONTENT;
  const content = contentMap[activity.id];
  const bookingMessage = `${d.bookingPrefix} ${activity.name} ${d.bookingSuffix}`;
  const uc = (text: string) => locale === "gr" ? greekUpperCase(text) : text;

  return (
    <LocaleProvider value={locale}>
    <div style={{ minHeight: "100vh", background: "#FAF8F4" }}>
      <Navbar dict={dict} locale={locale} />

      {/* Hero */}
      <section
        style={{
          height: "60vh",
          minHeight: 400,
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
          background: `linear-gradient(to top, rgba(44,36,22,0.75) 0%, rgba(44,36,22,0.3) 40%, rgba(44,36,22,0.15) 100%), url('${content?.heroImage || activity.imageUrl}') center/cover`,
        }}
      >
        <a
          href={`/${locale}`}
          style={{ position: "absolute", top: 96, left: 24, zIndex: 10, display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", textDecoration: "none" }}
        >
          <ArrowLeft size={16} />
          {d.backToHome}
        </a>

        <div style={{ position: "relative", zIndex: 10, padding: "0 24px 48px", maxWidth: 900 }}>
          <span className="uppercase" style={{ display: "inline-block", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#C5A55A", marginBottom: 12 }}>
            . {uc(activity.type)} .
          </span>
          <h1
            className="font-[family-name:var(--font-display)]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: 12 }}
          >
            {activity.name}
          </h1>
          {content?.subtitle && (
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.8)", maxWidth: 560 }}>
              {content.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Key Details Bar */}
      <section style={{ background: "#F5F0E8", borderBottom: "1px solid #E8DFD0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px 24px" }}>
          <div className="details-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
            <DetailItem icon={<MapPin size={18} />} label={d.location} value={d.locationArea} />
            <DetailItem icon={<Clock size={18} />} label={d.duration} value={activity.duration} />
            <DetailItem icon={<Users size={18} />} label={d.groupSize} value={`${d.guestsPrefix}${activity.capacity}${d.guestsSuffix}`} />
            <DetailItem
              icon={<Euro size={18} />}
              label={d.cost}
              value={`€${activity.price} ${d.perPerson}`}
              sub={content?.childPrice ? `${d.childrenPrefix}${content.childPrice}` : undefined}
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px" }}>

        {/* Image Gallery */}
        {content && content.gallery.length > 1 && (
          <section style={{ padding: "40px 0" }}>
            <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {content.gallery.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 10,
                    height: i === 0 && content.gallery.length > 2 ? 360 : 220,
                    gridColumn: i === 0 && content.gallery.length > 2 ? "1 / -1" : undefined,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Description */}
        <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
          {(content?.description || [activity.description]).map((p, i) => (
            <p key={i} style={{ fontSize: "0.95rem", color: "rgba(44,36,22,0.8)", lineHeight: 1.85, marginBottom: 16, maxWidth: 720 }}>
              {p}
            </p>
          ))}
        </section>

        {/* Experience Highlights */}
        {content?.highlights && content.highlights.length > 0 && (
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>
              {d.whatYoullExperience}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 720 }}>
              {content.highlights.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Check size={18} style={{ color: "#5C6B3C", flexShrink: 0, marginTop: 3 }} />
                  <p style={{ fontSize: "0.92rem", color: "rgba(44,36,22,0.75)", lineHeight: 1.7 }}>{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Menu Section */}
        {content?.menu && (
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <ChefHat size={22} style={{ color: "#8B6F47" }} />
              {d.menu}
            </h2>
            <div className="menu-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 720 }}>
              {content.menu.map((section, i) => (
                <div key={i} style={{ background: "#F5F0E8", borderRadius: 10, padding: 20 }}>
                  <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 12 }}>
                    {section.title}
                  </h3>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {section.items.map((item, j) => (
                      <li key={j} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.6, marginBottom: 6 }}>
                        <span style={{ color: "#C5A55A", flexShrink: 0 }}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {content.alternativeMenu && (
              <div style={{ marginTop: 24, background: "rgba(245,240,232,0.6)", borderRadius: 10, padding: 20, maxWidth: 720, border: "1px solid #E8DFD0" }}>
                <h3 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 12 }}>
                  {content.alternativeMenu.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {content.alternativeMenu.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", gap: 8, fontSize: "0.85rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.6, marginBottom: 6 }}>
                      <span style={{ color: "#C5A55A", flexShrink: 0 }}>•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* Reasons */}
        {content?.reasons && (
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>
              {d.whyParticipate}
            </h2>
            <div className="reasons-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 720 }}>
              {content.reasons.map((reason, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", background: "#F5F0E8", borderRadius: 10, padding: 16 }}>
                  <Star size={18} style={{ color: "#C5A55A", flexShrink: 0, marginTop: 2 }} />
                  <p style={{ fontSize: "0.92rem", color: "rgba(44,36,22,0.75)", lineHeight: 1.6 }}>{reason}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Important Info */}
        {content?.importantInfo && (
          <section style={{ padding: "40px 0", borderBottom: "1px solid #E8DFD0" }}>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <Info size={20} style={{ color: "#8B6F47" }} />
              {d.importantInfo}
            </h2>
            <div className="info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 720 }}>
              {content.importantInfo.map((info, i) => (
                <div key={i} style={{ background: "#F5F0E8", borderRadius: 10, padding: 20 }}>
                  <p className="uppercase" style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "#8B6F47", fontWeight: 600, marginBottom: 6 }}>
                    {uc(info.label)}
                  </p>
                  <p style={{ fontSize: "0.88rem", color: "rgba(44,36,22,0.7)", lineHeight: 1.65 }}>{info.text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Location */}
        <section style={{ padding: "48px 0", borderBottom: "1px solid #E8DFD0" }}>
          <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>
            {d.locationSection}
          </h2>
          <div style={{ width: "100%", height: 320, borderRadius: 14, overflow: "hidden", background: "#F5F0E8", marginBottom: 24 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12917!2d24.1344!3d35.4484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149b7f9b926583f1%3A0xbd48e5813114c9b8!2sCretan%20Gea!5e0!3m2!1sen!2sgr!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cretan Gea location"
            />
          </div>
          <div style={{ background: "#F5F0E8", borderRadius: 14, padding: 24, maxWidth: 720 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(139,111,71,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <MapPin size={20} style={{ color: "#8B6F47" }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4, color: "#2C2416" }}>{d.locationName}</p>
                <p style={{ fontSize: "0.9rem", color: "#2C2416", marginBottom: 4 }}>{d.locationArea}</p>
                <p style={{ fontSize: "0.9rem", color: "#7A7263", marginBottom: 12 }}>{d.locationRegion}</p>
                <p style={{ fontSize: "0.85rem", color: "#7A7263", lineHeight: 1.65, marginBottom: 16 }}>{d.locationDirections}</p>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "#8B6F47", color: "#FAF8F4", borderRadius: 8, fontSize: "0.82rem", fontWeight: 600, textDecoration: "none", letterSpacing: "0.03em" }}
                >
                  <MapPin size={15} />
                  {d.openInMaps}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Booking CTA */}
        <section style={{ padding: "48px 0 56px" }}>
          <div style={{ background: "#2C2416", borderRadius: 16, padding: "40px 32px", textAlign: "center", maxWidth: 720, margin: "0 auto" }}>
            <h2 className="font-[family-name:var(--font-display)]" style={{ fontSize: "1.5rem", fontWeight: 600, color: "white", marginBottom: 8 }}>
              {d.bookExperience}
            </h2>
            <p style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
              {activity.name} · {d.fromPrice}{activity.price} {d.perPerson}
              {content?.childPrice && ` · ${d.childrenPrefix}${content.childPrice}`}
            </p>
            <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.45)", marginBottom: 32 }}>{d.bookDescription}</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href={CONTACT.whatsappUrl(bookingMessage)} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 28px", background: "#25D366", color: "white", borderRadius: 10, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
                <MessageCircle size={18} />{d.whatsapp}
              </a>
              <a href={`tel:${CONTACT.phone}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 28px", background: "#8B6F47", color: "#FAF8F4", borderRadius: 10, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
                <Phone size={18} />{d.callUs}
              </a>
              <a href={`mailto:${CONTACT.email}?subject=Booking: ${activity.name}&body=${encodeURIComponent(bookingMessage)}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "14px 28px", background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 10, fontSize: "0.875rem", fontWeight: 500, textDecoration: "none" }}>
                <Mail size={18} />{d.email}
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer dict={dict} locale={locale} />
      <WhatsAppFloat dict={dict} />
    </div>
    </LocaleProvider>
  );
}

function DetailItem({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(139,111,71,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#8B6F47" }}>
        {icon}
      </div>
      <div>
        <p className="uppercase" style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "#7A7263", marginBottom: 2 }}>{label}</p>
        <p style={{ fontSize: "0.9rem", fontWeight: 500, color: "#2C2416" }}>{value}</p>
        {sub && <p style={{ fontSize: "0.75rem", color: "#7A7263", marginTop: 2 }}>{sub}</p>}
      </div>
    </div>
  );
}

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import { ScrollReveal } from "./ScrollReveal";
import type { Dictionary } from "@/lib/i18n/en";

const GALLERY_IMAGES = [
  "/images/cooking-1-1.webp",
  "/images/2L1A6120.webp",
  "/images/2L1A5970-1.webp",
  "/images/7H8A5212.webp",
  "/images/2L1A6177.webp",
  "/images/102.webp",
  "/images/2L1A6257-Edit.webp",
  "/images/7H8A4896.webp",
  "/images/2L1A6260-Edit-Edit.webp",
  "/images/095.webp",
  "/images/2L1A6318-Edit.webp",
  "/images/2L1A6354-Edit.webp",
  "/images/0018.webp",
  "/images/2L1A6367-Edit.jpg",
  "/images/2L1A6394-HDR.webp",
  "/images/7H8A5046-scaled.webp",
  "/images/2L1A6435.webp",
  "/images/2L1A6454-Edit.webp",
  "/images/2L1A6489.webp",
  "/images/2L1A6500.webp",
  "/images/2L1A6754.webp",
  "/images/2L1A6795.jpg",
  "/images/2L1A6803.webp",
  "/images/2L1A7165.webp",
  "/images/2L1A6052-1.webp",
];

interface GalleryProps {
  dict: Dictionary;
}

export function Gallery({ dict }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const d = dict.gallery;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));
  }, []);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, prev, next]);

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-cream">
      <ScrollReveal>
        <SectionHeader tag={d.tag} title={d.title} subtitle={d.subtitle} />
      </ScrollReveal>

      {/* Masonry grid */}
      <div
        style={{
          columns: "4 220px",
          columnGap: 10,
          maxWidth: 1200,
        }}
      >
        {GALLERY_IMAGES.map((src, i) => (
          <ScrollReveal key={src} delay={(i % 6) * 0.05}>
            <div
              onClick={() => openLightbox(i)}
              style={{
                breakInside: "avoid",
                marginBottom: 10,
                overflow: "hidden",
                borderRadius: 4,
                cursor: "zoom-in",
                position: "relative",
              }}
              className="group"
            >
              <img
                src={src}
                alt={`Cretan Gea gallery photo ${i + 1}`}
                loading="lazy"
                style={{ display: "block", width: "100%", height: "auto" }}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(44,36,22,0)",
                  transition: "background 0.3s",
                }}
                className="group-hover:!bg-[rgba(44,36,22,0.18)]"
              />
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            background: "rgba(10,8,5,0.94)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={closeLightbox}
        >
          {/* Close */}
          <button
            onClick={closeLightbox}
            style={{
              position: "absolute",
              top: 20,
              right: 24,
              background: "none",
              border: "none",
              color: "rgba(250,248,244,0.8)",
              cursor: "pointer",
              padding: 8,
            }}
            aria-label="Close"
          >
            <X size={28} />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            style={{
              position: "absolute",
              left: 16,
              background: "rgba(44,36,22,0.5)",
              border: "none",
              color: "#FAF8F4",
              cursor: "pointer",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Image */}
          <img
            src={GALLERY_IMAGES[lightboxIndex]}
            alt={`Cretan Gea gallery photo ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 4,
              boxShadow: "0 25px 80px rgba(0,0,0,0.6)",
            }}
          />

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            style={{
              position: "absolute",
              right: 16,
              background: "rgba(44,36,22,0.5)",
              border: "none",
              color: "#FAF8F4",
              cursor: "pointer",
              borderRadius: "50%",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>

          {/* Counter */}
          <div
            style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(250,248,244,0.5)",
              fontSize: "0.8rem",
              letterSpacing: "0.1em",
            }}
          >
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}

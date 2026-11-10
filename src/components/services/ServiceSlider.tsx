"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceItem } from "@/lib/mockData";
import {
  FaChevronLeft,
  FaChevronRight,
  FaShieldAlt,
  FaCheckCircle,
  FaWater,
  FaSnowflake,
  FaBolt,
  FaFireExtinguisher,
  FaIndustry,
  FaExpand,
} from "react-icons/fa";

interface ServiceSliderProps {
  service: ServiceItem;
}

interface SlideItem {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
}

// Curated realistic engineering slides per flagship service
const DEFAULT_SLIDES_BY_SERVICE: Record<string, SlideItem[]> = {
  wts: [
    {
      title: "Industrial Effluent Treatment Plant (ETP & ZLD)",
      subtitle:
        "Biological aeration, chemical coagulation & Zero Liquid Discharge systems compliant with DoE Bangladesh.",
      badge: "DoE Compliant • ZLD Technology",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Industrial Reverse Osmosis (RO) & Demineralization (DM)",
      subtitle:
        "High-capacity TFC spiral wound membranes and Grundfos high-pressure pumps for boiler feed and process water.",
      badge: "High TDS Reduction • 99% Purity",
      image:
        "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Sewage Treatment Plants (STP) with MBBR & MBR",
      subtitle:
        "Odor-free, compact biological sewage recycling for cooling towers, flush water, and landscape irrigation.",
      badge: "BNBC & WHO Standards",
      image:
        "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Iron Removal & Multi-Grade Filtration Skids",
      subtitle:
        "Automatic backwash manganese greensand and activated carbon filtration eliminating iron and heavy turbidity.",
      badge: "Automated Backwash • Zero Scaling",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop",
    },
  ],
  hvac: [
    {
      title: "Central Chilled Water Plant & Cooling Towers",
      subtitle:
        "Centrifugal & screw chillers with automated VFD pumping and variable primary flow architecture.",
      badge: "ASHRAE 90.1 Compliant",
      image:
        "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Variable Refrigerant Flow (VRF / VRV) Systems",
      subtitle:
        "Tropical high-ambient COP multi-split systems with independent zone temperature control.",
      badge: "High Energy Efficiency",
      image:
        "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Cleanroom AHU & Precision Climate Control",
      subtitle:
        "ISO Class 5-8 positive airlock HEPA terminal filtration for pharmaceuticals and clean assembly.",
      badge: "GMP & ISO Standard",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1600&auto=format&fit=crop",
    },
  ],
  ffps: [
    {
      title: "Automatic Wet Pipe Sprinkler Networks",
      subtitle:
        "UL/FM listed fire pump skids, zone control valves, and quick-response glass bulb sprinklers.",
      badge: "NFPA 13 & BNBC Certified",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Clean Agent Fire Suppression (FM200 / Novec)",
      subtitle:
        "Residue-free rapid gaseous extinguishing systems for data centers, battery rooms, and switchgear.",
      badge: "Zero Ozone Depletion",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop",
    },
  ],
  pdcp: [
    {
      title: "Main LT Switchgear & Distribution Switchboards",
      subtitle:
        "Form-4 type-tested modular busbar power distribution panels up to 4000A with ABB/Schneider ACBs.",
      badge: "IEC 61439 Type Tested",
      image:
        "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: "Automatic Power Factor Correction (PFI / APFC) Plant",
      subtitle:
        "Heavy-duty detuned reactor capacitor banks maintaining stable 0.99 power factor without harmonic surges.",
      badge: "0.99 PF Guarantee",
      image:
        "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1600&auto=format&fit=crop",
    },
  ],
};

export default function ServiceSlider({ service }: ServiceSliderProps) {
  const serviceKey = (service.slug || service.code || "")
    .toLowerCase()
    .replace("-systems", "");

  // Build slides: use custom gallery if provided in DB, otherwise use default curated slides
  const slides: SlideItem[] = React.useMemo(() => {
    // If service has explicit gallery images
    if ((service as any).gallery && Array.isArray((service as any).gallery) && (service as any).gallery.length > 0) {
      return (service as any).gallery.map((g: any, i: number) => ({
        title: g.title || `${service.title} Installation #${i + 1}`,
        subtitle: g.description || service.shortDescription || "",
        badge: `${service.code} Engineering`,
        image: g.image || g.url || service.bannerImage,
      }));
    }

    // Default curated slides
    if (DEFAULT_SLIDES_BY_SERVICE[serviceKey]) {
      return DEFAULT_SLIDES_BY_SERVICE[serviceKey];
    }

    // Fallback: create dynamic slides from service data
    return [
      {
        title: service.title,
        subtitle: service.shortDescription || service.subtitle || "",
        badge: `${service.code} Solutions`,
        image: service.bannerImage || "/images/company-info.png",
      },
      {
        title: `${service.title} - Turnkey Engineering Execution`,
        subtitle:
          service.fullDescription ||
          "Precision MEP engineering conforming to BNBC, NFPA, and international standards.",
        badge: "Turnkey Execution • 24/7 Support",
        image:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
      },
    ];
  }, [service, serviceKey]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Autoplay timer
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides.length]);

  const activeSlide = slides[currentIdx] || slides[0];

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-slate-50 to-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header Pill */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Field Engineering & System Showcase
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
              {service.title} <span className="text-gradient">Infrastructure</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold font-mono text-slate-600 shadow-sm">
              0{currentIdx + 1} / 0{slides.length}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={prevSlide}
                className="w-8 h-8 rounded-lg bg-white hover:bg-brand-950 hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm active:scale-95"
                title="Previous Slide"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="w-8 h-8 rounded-lg bg-white hover:bg-brand-950 hover:text-white border border-slate-200 text-slate-700 flex items-center justify-center transition-colors shadow-sm active:scale-95"
                title="Next Slide"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Slider Canvas */}
        <div
          className="relative h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 group"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Active Image with Fade & Scale Animation */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </motion.div>
          </AnimatePresence>

          {/* Cinematic Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/35 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-950/80 via-transparent to-transparent pointer-events-none hidden sm:block" />

          {/* Left / Right Floating Circular Navigation Arrows */}
          {slides.length > 1 && (
            <>
              <button
                type="button"
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/70 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95 z-20 opacity-80 group-hover:opacity-100"
                aria-label="Previous Slide"
              >
                <FaChevronLeft className="text-sm" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/70 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95 z-20 opacity-80 group-hover:opacity-100"
                aria-label="Next Slide"
              >
                <FaChevronRight className="text-sm" />
              </button>
            </>
          )}

          {/* Bottom Floating Glass Caption Card */}
          <div className="absolute bottom-6 left-4 sm:left-8 right-4 sm:right-8 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-2xl bg-brand-950/85 backdrop-blur-md p-5 sm:p-6 rounded-2xl border border-white/15 shadow-2xl text-white space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-accent text-brand-950 shadow-sm">
                  {service.code} System
                </span>
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold text-slate-200 bg-white/10 border border-white/15">
                  {activeSlide.badge}
                </span>
              </div>

              <h3 className="font-heading text-lg sm:text-2xl font-extrabold text-white leading-snug drop-shadow-md">
                {activeSlide.title}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-2 font-normal">
                {activeSlide.subtitle}
              </p>
            </div>

            {/* Pagination Dots & Navigation Indicators */}
            {slides.length > 1 && (
              <div className="flex items-center gap-2 self-start md:self-end bg-brand-950/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/15">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIdx(idx)}
                    className={`transition-all rounded-full ${
                      currentIdx === idx
                        ? "w-8 h-2.5 bg-accent shadow-sm"
                        : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


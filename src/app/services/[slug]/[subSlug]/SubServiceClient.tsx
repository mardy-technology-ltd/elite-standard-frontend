"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaFilePdf,
  FaPhoneAlt,
  FaEnvelope,
  FaHourglassHalf,
  FaThumbsUp,
  FaShieldAlt,
  FaRegClock,
  FaExclamationTriangle,
  FaLightbulb,
  FaChevronDown,
  FaTools,
  FaAward,
  FaArrowRight,
  FaProjectDiagram,
  FaExpand,
  FaTimes,
  FaCogs,
  FaBoxes,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
} from "react-icons/fa";

interface SubServiceClientProps {
  service: ServiceItem;
  sub: SubServiceDetail;
}

// Zod Schema for the lead capture quote form
const quoteSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(2, "Company name is required"),
  projectScale: z.string().min(1, "Please select a project scale"),
  message: z.string().min(10, "Please provide some project details"),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

// Slide item interface
interface SubServiceSlide {
  image: string;
  title: string;
  caption: string;
}

// Fallback curated slides per sub-service if not uploaded yet
const DEFAULT_SUB_SLIDES: Record<string, SubServiceSlide[]> = {
  // WTS
  irp: [
    {
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
      title: "Iron & Manganese Catalytic Oxidation Unit",
      caption: "Birm & Manganese Greensand dual-media pressurized filtration vessel.",
    },
    {
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
      title: "Automatic Backwash & Aeration Tower",
      caption: "Continuous compressed air injection eliminating dissolved ferrous ions.",
    },
    {
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop",
      title: "Industrial Grade Multi-Port Control Valve",
      caption: "PLC controlled automatic regeneration preventing piping clogging.",
    },
  ],
  ro: [
    {
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1600&auto=format&fit=crop",
      title: "High-Recovery Reverse Osmosis Skid",
      caption: "Multi-stage TFC spiral wound membranes delivering <10 µS/cm conductivity.",
    },
    {
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
      title: "Grundfos High-Pressure Multi-Stage Pump Array",
      caption: "Stainless steel SS316 impellers engineered for 24/7 continuous operation.",
    },
    {
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop",
      title: "Clean-In-Place (CIP) Chemical Flushing Skid",
      caption: "Automated membrane descaling maintaining design flux rates.",
    },
  ],
  netmetering: [
    {
      image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop",
      title: "Bi-Directional 3-Phase Smart Grid Net Meter",
      caption: "BREB / DPDC / DESCO certified utility-grade bi-directional metering system.",
    },
    {
      image: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?q=80&w=1600&auto=format&fit=crop",
      title: "Commercial Rooftop Tier-1 Solar PV Array",
      caption: "High-efficiency monocrystalline PERC panels with 25-year performance warranty.",
    },
    {
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=1600&auto=format&fit=crop",
      title: "Utility Protection Relay Testing & SCADA Clearance",
      caption: "Reverse power relay and automated monthly tariff export monitoring.",
    },
  ],
};

export default function SubServiceClient({ service, sub }: SubServiceClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Build slides list: custom sliderImages > fallback defaults > single image
  const slides: SubServiceSlide[] = React.useMemo(() => {
    if (Array.isArray(sub.sliderImages) && sub.sliderImages.length > 0) {
      return sub.sliderImages.map((imgUrl, i) => ({
        image: imgUrl,
        title: `${sub.title} • Technical View #${i + 1}`,
        caption: `Certified engineering implementation for ${sub.title}`,
      }));
    }

    const defaultList = DEFAULT_SUB_SLIDES[sub.slug] || DEFAULT_SUB_SLIDES[sub.id];
    if (defaultList && defaultList.length > 0) {
      return defaultList;
    }

    // Default 3-slide realistic progression with the sub.image as primary
    return [
      {
        image: sub.image || "/images/company-info.png",
        title: `${sub.title} • Primary Architecture`,
        caption: sub.shortDesc || "Turnkey engineered setup and field deployment.",
      },
      {
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
        title: `${sub.title} • Field Commissioning & Safety`,
        caption: "Built to BNBC, NFPA, and international engineering standards.",
      },
      {
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
        title: `${sub.title} • Turnkey Equipment Testing`,
        caption: "Comprehensive performance verification with full OEM documentation.",
      },
    ];
  }, [sub]);

  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlideIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setActiveSlideIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  // Autoplay slider every 5 seconds
  useEffect(() => {
    if (slides.length <= 1 || isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length, isPaused, nextSlide]);

  const currentSlide = slides[activeSlideIdx] || slides[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectScale: "",
      message: `We would like to request an engineering consultation / BOQ estimate for "${sub.title}". Please advise on technical specifications and deployment timeline.`,
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          facility: data.company,
          productName: `Sub-Service: ${sub.title} (${data.projectScale || "Scale not specified"})`,
          type: "quotation",
          message: data.message,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to submit request");
      }

      setFormSubmitted(true);
      reset();
    } catch (err: any) {
      console.error("Submission error:", err);
      alert(err.message || "Failed to submit quotation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Safe sibling services list
  const siblingSubServices = (service.subServices || []).filter(
    (item) => item.slug !== sub.slug
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans">
      {/* ============================================================== */}
      {/* 1. HERO SECTION WITH AMBIENT GRADIENT & METADATA STRIP */}
      {/* ============================================================== */}
      <section className="relative bg-brand-950 text-white pt-24 pb-28 sm:pb-36 overflow-hidden">
        {/* Subtle Ambient Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${currentSlide.image || sub.image || "/images/company-info.png"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/85 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Back Link */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all active:scale-95"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Back to {service.title}</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/services" className="hover:text-white transition-colors">
                Services
              </Link>
              <span>/</span>
              <Link href={`/services/${service.slug}`} className="hover:text-white transition-colors">
                {service.code || service.title}
              </Link>
              <span>/</span>
              <span className="text-accent font-bold truncate max-w-[200px] sm:max-w-none">
                {sub.title}
              </span>
            </nav>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent backdrop-blur-md">
              {service.code || "MEP"} DIVISION
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-blue-600/90 text-white shadow-sm border border-blue-400/40">
              Technical Specification
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1.5">
              <FaAward className="text-accent text-[11px]" />
              Industrial Grade Turnkey
            </span>
            {slides.length > 1 && (
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1.5">
                <FaImages className="text-accent text-[11px]" />
                {slides.length} Slider Slides
              </span>
            )}
          </div>

          {/* Title & Short Description */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
            {sub.title}
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-3xl leading-relaxed">
            {sub.shortDesc}
          </p>

          {/* Key Facts Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/15 max-w-5xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base shrink-0 border border-accent/30">
                <FaCogs />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Service Category
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block truncate">
                  {service.title}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center text-base shrink-0 border border-blue-500/30">
                <FaTools />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Execution Mode
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block truncate">
                  Turnkey EPC / Supply & Install
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-base shrink-0 border border-emerald-500/30">
                <FaShieldAlt />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Safety Standard
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block truncate">
                  {Array.isArray(service.compliance) && service.compliance.length > 0
                    ? service.compliance.slice(0, 2).join(", ")
                    : "BNBC, NFPA, ASHRAE"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center text-base shrink-0 border border-amber-500/30">
                <FaRegClock />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Maintenance Support
                </span>
                <span className="text-xs sm:text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                  24/7 Corporate SLA
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 2. DYNAMIC SLIDER IMAGE SHOWCASE (Full Width Container) */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-18 relative z-20">
        <div
          className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Showcase Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-sm border border-accent/30">
                <FaProjectDiagram />
              </div>
              <div>
                <h2 className="font-heading text-sm sm:text-base font-bold text-brand-950">
                  Engineering Deployment & System Architecture
                </h2>
                <p className="text-[11px] text-slate-500">
                  Interactive multi-slide field documentation for {sub.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {slides.length > 1 && (
                <span className="px-3 py-1 rounded-full bg-slate-100 text-brand-950 font-mono text-xs font-bold border border-slate-200">
                  Slide {activeSlideIdx + 1} of {slides.length}
                </span>
              )}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-950 hover:bg-accent text-white hover:text-brand-950 text-xs font-bold transition-all shadow-sm active:scale-95"
                title="Fullscreen Zoom"
              >
                <FaExpand className="text-[10px]" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Active Big Photo Display (Cinematic & Large Slider) */}
          <div className="relative h-80 sm:h-[460px] md:h-[520px] w-full rounded-2xl overflow-hidden bg-slate-950 group shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlideIdx}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentSlide.image || sub.image || "/images/company-info.png"}
                  alt={currentSlide.title || sub.title}
                  fill
                  className="object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-700"
                  onClick={() => setIsLightboxOpen(true)}
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Photo Caption Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
              <div className="max-w-2xl bg-brand-950/80 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">
                  Verified Engineering Blueprint • {service.title}
                </span>
                <p className="text-sm sm:text-base font-bold text-white drop-shadow leading-snug">
                  {currentSlide.title}
                </p>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {currentSlide.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="pointer-events-auto self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-accent text-white hover:text-brand-950 text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                <FaExpand className="text-[10px]" />
                <span>Click image to zoom</span>
              </button>
            </div>

            {/* Slider Navigation Arrows (Left / Right) */}
            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95 z-10"
                  aria-label="Previous Slide"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95 z-10"
                  aria-label="Next Slide"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation Strip */}
          {slides.length > 1 && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 hidden sm:inline-block">
                Slider Frames:
              </span>
              {slides.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`group relative w-24 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeSlideIdx === idx
                      ? "border-accent scale-105 shadow-md shadow-accent/20 ring-2 ring-accent/40"
                      : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title || `Thumb ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 right-1.5 px-1 py-0.2 bg-brand-950/85 text-[9px] font-mono font-bold text-white rounded">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================== */}
      {/* 3. CONTENT CARDS DISPLAYED BELOW IMAGE (8 Cols Left / 4 Cols Right) */}
      {/* ============================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================== */}
          {/* LEFT 8 COLUMNS: TECHNICAL CARDS */}
          {/* ========================================================== */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Card 1: Engineering Overview */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <FaTools />
                  <span>Technical Blueprint</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Division: <strong className="text-brand-950">{service.code || "MEP"}</strong>
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-950">
                Engineering Overview
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-accent pl-4 py-1 whitespace-pre-line">
                {sub.fullDesc || sub.shortDesc}
              </p>

              {/* Engineering Assurance Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Standards
                    </span>
                    <span className="text-xs font-bold text-brand-950">
                      BNBC & NFPA Compliant
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-accent/20 text-brand-950 flex items-center justify-center text-sm shrink-0">
                    <FaAward />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Warranty
                    </span>
                    <span className="text-xs font-bold text-brand-950">
                      OEM Verified Guarantee
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm shrink-0">
                    <FaRegClock />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">
                      Support
                    </span>
                    <span className="text-xs font-bold text-brand-950">
                      24/7 Rapid Response
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Scope of Work & Technical Deployments */}
            {Array.isArray(sub.features) && sub.features.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                    <FaCheckCircle />
                    <span>Technical Deliverables</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    {sub.features.length} Certified Scope Items
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-950">
                  Scope of Work & Technical Deployments
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {sub.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-colors flex items-start gap-3.5 group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                        <FaCheckCircle />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card 3: Challenges & Engineered Solutions */}
            {((Array.isArray(service.problems) && service.problems.length > 0) ||
              (Array.isArray(service.solutions) && service.solutions.length > 0)) && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                    <FaLightbulb />
                    <span>Engineering Problem-Solving</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Industrial Optimization
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-950">
                  Challenges & Engineered Solutions
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
                  {/* Problems */}
                  {Array.isArray(service.problems) && service.problems.length > 0 && (
                    <div className="p-5 rounded-2xl bg-rose-50/40 border border-rose-200/70 flex flex-col gap-3.5">
                      <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                        <FaExclamationTriangle />
                        <span>Client Pain Points & Vulnerabilities</span>
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {service.problems.map((prob, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                          >
                            <span className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Solutions */}
                  {Array.isArray(service.solutions) && service.solutions.length > 0 && (
                    <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 flex flex-col gap-3.5">
                      <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs uppercase tracking-wider">
                        <FaLightbulb />
                        <span>Engineered Turnkey Solutions</span>
                      </div>
                      <ul className="flex flex-col gap-2.5">
                        {service.solutions.map((sol, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed"
                          >
                            <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                            <span>{sol}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Card 4: Packages & Capacities (if available) */}
            {sub.packages && sub.packages.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold border border-purple-100">
                    <FaBoxes />
                    <span>Tiered Capacities</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Standard & Custom Options
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-950">
                  Available Capacities & Modular Tiers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
                  {sub.packages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-brand-900 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-0.5 rounded-md inline-block mb-2">
                          {pkg.level}
                        </span>
                        <h4 className="font-extrabold text-brand-950 text-base mb-1">
                          {pkg.capacity}
                        </h4>
                        <p className="font-semibold text-slate-700 text-xs">{pkg.name}</p>
                        <p className="text-slate-500 text-[11px] mt-2 leading-relaxed">
                          {pkg.target}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-slate-200/60">
                        <span className="text-[11px] font-bold text-brand-950 flex items-center gap-1">
                          Deployable Turnkey <FaArrowRight className="text-[9px] text-accent" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Card 5: FAQs */}
            {Array.isArray(service.faqs) && service.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                    <FaShieldAlt />
                    <span>Technical Support</span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500">
                    Frequently Asked Questions
                  </span>
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold text-brand-950">
                  Technical Clarifications & Project Execution
                </h3>

                <div className="flex flex-col gap-3 pt-1">
                  {service.faqs.map((faq, idx) => {
                    const isOpen = openFaqIdx === idx;
                    return (
                      <div
                        key={idx}
                        className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                          className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-brand-950 hover:text-accent transition-colors"
                        >
                          <span>{faq.question}</span>
                          <FaChevronDown
                            className={`text-xs text-slate-400 shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180 text-accent" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden border-t border-slate-100"
                            >
                              <div className="p-4 sm:p-5 text-slate-600 text-xs sm:text-sm leading-relaxed bg-slate-50/70">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Compliance Banner */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-4 sm:gap-5 shadow-lg border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 text-accent flex items-center justify-center text-2xl shrink-0">
                <FaShieldAlt />
              </div>
              <div className="text-xs leading-relaxed text-slate-300 text-center sm:text-left">
                <strong className="text-white font-bold block sm:inline text-sm sm:text-xs">
                  Mandatory Engineering Compliance:
                </strong>{" "}
                Designed and executed strictly following{" "}
                <span className="text-accent font-semibold">
                  {Array.isArray(service.compliance) && service.compliance.length > 0
                    ? service.compliance.join(", ")
                    : "BNBC, NFPA, ASHRAE, ASME"}
                </span>{" "}
                and Bangladesh utility codes. Every commissioning includes third-party calibration certificates.
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT 4 COLUMNS: SLEEK SIDEBAR CARDS */}
          {/* ========================================================== */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            {/* CARD A: Compact, High-Conversion Consultation Form */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="mb-5 pb-3 border-b border-slate-100 flex flex-col gap-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start">
                  Quick Quotation
                </span>
                <h3 className="font-heading font-extrabold text-brand-950 text-base sm:text-lg">
                  Request Technical BOQ
                </h3>
                <p className="text-slate-500 text-xs">
                  Fill in your project scale to get an engineered proposal.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="sub-quote-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-3.5 text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Full Name</label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="e.g. Engr. Tanvir Ahmed"
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      />
                      {errors.fullName && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.fullName.message}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Corporate Email</label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="tanvir@company.com"
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Contact Number</label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="+880 17XXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.phone.message}</span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Company / Factory</label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="Elite Apparels & Textiles Ltd."
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      />
                      {errors.company && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.company.message}</span>
                      )}
                    </div>

                    {/* Project Scale */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Estimated Scale</label>
                      <select
                        {...register("projectScale")}
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all"
                      >
                        <option value="">Select Scale</option>
                        <option value="residential-complex">Residential High-Rise Complex</option>
                        <option value="commercial-office">Commercial Tower / Mall</option>
                        <option value="industrial-plant">Industrial Plant / Textile Mill</option>
                        <option value="pharmaceutical-cleanroom">Pharma / Sterile Cleanroom</option>
                        <option value="infrastructure">Heavy Infrastructure / Metro</option>
                      </select>
                      {errors.projectScale && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.projectScale.message}</span>
                      )}
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-700 text-xs">Specific Requirements</label>
                      <textarea
                        rows={3}
                        {...register("message")}
                        className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all resize-none"
                      />
                      {errors.message && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.message.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-950 hover:bg-accent hover:text-brand-950 text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 shadow-md active:scale-95 text-xs sm:text-sm mt-1"
                    >
                      {isSubmitting ? (
                        <>
                          <FaHourglassHalf className="animate-spin text-xs" />
                          <span>Generating Estimate...</span>
                        </>
                      ) : (
                        <span>Request Engineered BOQ Proposal</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center p-6 bg-emerald-50 rounded-2xl border border-emerald-200"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-3 shadow-md text-lg">
                      <FaThumbsUp />
                    </div>
                    <h4 className="font-heading font-extrabold text-emerald-950 text-sm mb-1">
                      Inquiry Received!
                    </h4>
                    <p className="text-[11px] text-emerald-800 leading-relaxed mb-4">
                      Thank you for contacting us regarding <strong>{sub.title}</strong>. Our lead project engineer will get in touch with your initial specification audit within 24 hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs bg-white text-emerald-900 border border-emerald-200 font-bold px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Submit Another Inquire
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CARD B: 24/7 Corporate Helpline & Profile Download */}
            <div className="bg-brand-950 text-white p-6 sm:p-7 rounded-3xl border border-brand-900 flex flex-col gap-4 relative overflow-hidden shadow-xl">
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-accent/15 rounded-full blur-2xl" />
              <div className="flex items-center gap-2 text-accent text-xs font-bold uppercase tracking-wider">
                <FaRegClock />
                <span>24/7 Corporate Helpline</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                Need immediate engineering clarification or emergency project consultation? Connect directly with our chief technical officer.
              </p>
              <div className="flex flex-col gap-2 pt-2 border-t border-white/10 text-xs">
                <a
                  href="tel:+8801313663311"
                  className="flex items-center gap-2.5 font-bold text-white hover:text-accent transition-colors py-1"
                >
                  <FaPhoneAlt className="text-accent text-sm" />
                  <span>+880 1313-663311</span>
                </a>
                <a
                  href="mailto:elitestandardlimited@gmail.com"
                  className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors py-1 truncate"
                >
                  <FaEnvelope className="text-accent text-sm shrink-0" />
                  <span className="truncate">elitestandardlimited@gmail.com</span>
                </a>
              </div>
              <a
                href="/elite-standard-profile.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white font-bold text-xs py-2.5 rounded-xl transition-all mt-1"
              >
                <FaFilePdf className="text-accent" />
                <span>Download Corporate Profile (PDF)</span>
              </a>
            </div>

            {/* CARD C: Division Navigator (Sibling Services) */}
            {siblingSubServices.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <h4 className="font-heading font-bold text-brand-950 text-sm">
                    Related {service.code || "Division"} Solutions
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    {siblingSubServices.length} Options
                  </span>
                </div>

                <div className="flex flex-col gap-2.5">
                  {siblingSubServices.map((sibling) => (
                    <Link
                      key={sibling.slug}
                      href={`/services/${service.slug}/${sibling.slug}`}
                      className="p-3 rounded-2xl bg-slate-50 hover:bg-accent/10 border border-slate-200/80 hover:border-accent transition-all group flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <span className="font-bold text-brand-950 group-hover:text-brand-900 text-xs block truncate">
                          {sibling.title}
                        </span>
                        <span className="text-[10px] text-slate-500 line-clamp-1 block">
                          {sibling.shortDesc}
                        </span>
                      </div>
                      <FaArrowRight className="text-slate-400 group-hover:text-accent group-hover:translate-x-1 text-xs shrink-0 transition-transform" />
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="block text-center text-xs font-bold text-accent hover:text-brand-950 pt-2 transition-colors"
                >
                  View All {service.title} Services →
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 4. LIGHTBOX MODAL FOR FULLSCREEN PREVIEW */}
      {/* ============================================================== */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-md"
          >
            {/* Lightbox Topbar */}
            <div className="flex items-center justify-between gap-4 text-white">
              <div>
                <h3 className="font-heading text-sm sm:text-base font-bold text-white">
                  {currentSlide.title || sub.title}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {service.title} • Turnkey Engineering Field Showcase (Photo {activeSlideIdx + 1} of {slides.length})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-base transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Lightbox Active Image */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] max-w-6xl mx-auto my-auto">
              <Image
                src={currentSlide.image || sub.image || "/images/company-info.png"}
                alt={currentSlide.title || sub.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Lightbox Footer with navigation */}
            <div className="flex items-center justify-between text-xs text-slate-400 max-w-6xl mx-auto w-full">
              <span>{currentSlide.caption}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

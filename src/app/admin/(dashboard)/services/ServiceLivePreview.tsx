"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
  FaFilePdf,
  FaLightbulb,
  FaExclamationTriangle,
  FaTools,
  FaAward,
  FaRegClock,
  FaChevronDown,
  FaProjectDiagram,
  FaCogs,
  FaChevronLeft,
  FaChevronRight,
  FaImages,
  FaExpand,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

interface ServiceLivePreviewProps {
  formData: {
    title: string;
    code: string;
    slug: string;
    category: string;
    subtitle: string;
    shortDescription: string;
    fullDescription: string;
    bannerImage: string;
    sliderImages?: string[];
    complianceText: string;
    problemsText: string;
    solutionsText: string;
    scopeText: string;
    faqs: { question: string; answer: string }[];
  };
}

export default function ServiceLivePreview({ formData }: ServiceLivePreviewProps) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  // Build slides: sliderImages > bannerImage > fallback
  const slides: string[] =
    formData.sliderImages && formData.sliderImages.length > 0
      ? formData.sliderImages
      : [
          formData.bannerImage ||
            "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1600&auto=format&fit=crop",
        ];

  const complianceList = formData.complianceText
    ? formData.complianceText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : ["BNBC", "ASHRAE", "NFPA", "DoE"];

  const scopeList = formData.scopeText
    ? formData.scopeText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        "Inverter compressor staging up to 64 HP per outdoor modular bank",
        "R-410A / R-32 eco-friendly refrigerant compliance",
        "Individual touch-screen thermostat controllers per zone",
        "Centralized Modbus/BACnet BMS gateway interface",
      ];

  const problemsList = formData.problemsText
    ? formData.problemsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        "High energy consumption in conventional cooling systems",
        "Uneven temperature distribution and humidity issues",
        "Inadequate ventilation causing compliance & health risks",
      ];

  const solutionsList = formData.solutionsText
    ? formData.solutionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean)
    : [
        "Custom VRF/VRV system integration with smart thermostats",
        "Precision air handling units (AHU) with HEPA filtration",
        "Automated building management system (BMS) integration",
      ];

  const faqsList =
    formData.faqs && formData.faqs.length > 0
      ? formData.faqs
      : [
          {
            question: "What types of engineering systems do you specialize in?",
            answer:
              "We specialize in turnkey central VRF/VRV multi-split systems, industrial chillers, precision cleanroom systems, and substation automation.",
          },
          {
            question: "Do you offer energy audit and retrofit services?",
            answer:
              "Yes, our certified engineers conduct thorough psychrometric and energy efficiency audits for factories and commercial towers.",
          },
        ];

  return (
    <div className="bg-slate-50 text-slate-800 text-xs font-sans pb-16 select-none pointer-events-auto">
      {/* ============================================================== */}
      {/* 1. TOP HEADER & BREADCRUMBS */}
      {/* ============================================================== */}
      <div className="bg-brand-950 text-white px-5 sm:px-8 pt-8 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle Ambient Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 scale-105 pointer-events-none"
          style={{
            backgroundImage: `url('${slides[activeSlideIdx] || "/images/company-info.png"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/85 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 mb-4 font-medium">
            <span className="text-accent font-bold">
              ← Back to {formData.category?.toUpperCase() || "MEP"} Division
            </span>
            <div className="flex items-center gap-1.5">
              <span>Home</span>
              <span>/</span>
              <span>Services</span>
              <span>/</span>
              <span className="capitalize">{formData.category || "mechanical"}</span>
              <span>/</span>
              <span className="text-accent font-bold truncate max-w-[140px]">
                {formData.title || "Service Title"}
              </span>
            </div>
          </div>

          {/* Badges Strip */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent">
              {formData.code || "ESL-MEP"} DIVISION
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider bg-blue-600/90 text-white shadow-sm">
              Technical Specification
            </span>
            <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1">
              <FaAward className="text-accent text-[8px]" />
              Industrial Grade Turnkey
            </span>
            {slides.length > 1 && (
              <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1">
                <FaImages className="text-accent text-[8px]" />
                {slides.length} Slider Slides
              </span>
            )}
          </div>

          {/* Service Title & Subtitle */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
            {formData.title || "Service Title Preview"}
          </h1>
          <p className="text-slate-300 text-[11px] sm:text-xs mt-2 max-w-2xl leading-relaxed">
            {formData.subtitle ||
              formData.shortDescription ||
              "Tropical high-COP outdoor units engineered for variable loads and certified safety standards."}
          </p>

          {/* Quick Metrics Fact Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5 pt-4 border-t border-white/15 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-accent/20 text-accent flex items-center justify-center text-[10px] shrink-0">
                <FaCogs />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] text-slate-400 block uppercase">Category</span>
                <span className="font-bold text-white block truncate capitalize">
                  {formData.category || "Mechanical"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] shrink-0">
                <FaTools />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] text-slate-400 block uppercase">Execution</span>
                <span className="font-bold text-white block truncate">Turnkey EPC</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] shrink-0">
                <FaShieldAlt />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] text-slate-400 block uppercase">Standard</span>
                <span className="font-bold text-white block truncate">
                  {complianceList.slice(0, 2).join(", ")}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] shrink-0">
                <FaRegClock />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] text-slate-400 block uppercase">SLA Support</span>
                <span className="font-bold text-amber-300 block truncate">24/7 Corporate SLA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. CINEMATIC LARGE SLIDER SHOWCASE (Full Width Container) */}
      {/* ============================================================== */}
      <div className="px-4 sm:px-6 -mt-8 sm:-mt-10 relative z-20 max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 border border-slate-200/90 shadow-xl space-y-3">
          {/* Slider Header */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-accent/15 text-accent flex items-center justify-center text-xs">
                <FaProjectDiagram />
              </div>
              <div>
                <h3 className="font-bold text-brand-950 text-xs sm:text-sm leading-tight">
                  Engineering Deployment & System Architecture
                </h3>
                <p className="text-[10px] text-slate-500">
                  Interactive field documentation for {formData.title || "this service"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-brand-950 font-mono text-[10px] font-bold border border-slate-200">
                Slide {activeSlideIdx + 1} of {slides.length}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-950 text-white text-[10px] font-bold">
                <FaExpand className="text-[8px]" /> Fullscreen
              </span>
            </div>
          </div>

          {/* Big Cinema Image Frame */}
          <div className="relative h-56 sm:h-80 md:h-96 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 group shadow-inner">
            <Image
              src={slides[activeSlideIdx] || "/images/company-info.png"}
              alt="Slide Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent flex flex-col justify-end p-4 pointer-events-none">
              <span className="text-[9px] uppercase font-bold text-accent tracking-wider">
                Verified Engineering Blueprint • {formData.title}
              </span>
              <p className="text-white font-bold text-sm sm:text-base leading-snug">
                {formData.title} — Primary Commissioned Field Phase
              </p>
            </div>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setActiveSlideIdx((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 flex items-center justify-center text-xs shadow-md transition-all"
                  aria-label="Previous Slide"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSlideIdx((prev) => (prev + 1) % slides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 flex items-center justify-center text-xs shadow-md transition-all"
                  aria-label="Next Slide"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {slides.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
                Slider Frames:
              </span>
              {slides.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`relative w-16 sm:w-20 h-10 sm:h-12 rounded-lg overflow-hidden border-2 cursor-pointer shrink-0 transition-all ${
                    activeSlideIdx === idx
                      ? "border-accent scale-105 shadow-md shadow-accent/20"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image src={img} alt="Thumb" fill className="object-cover" />
                  <span className="absolute bottom-0.5 right-1 px-1 bg-black/80 text-[8px] font-mono font-bold text-white rounded">
                    {idx + 1}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. DETAILS CONTENT (8 Cols Left : 4 Cols Right) */}
      {/* ============================================================== */}
      <div className="px-4 sm:px-6 mt-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* ========================================================== */}
          {/* LEFT 8 COLUMNS: TECHNICAL SPECIFICATIONS & CHALLENGES */}
          {/* ========================================================== */}
          <div className="md:col-span-8 space-y-5">
            {/* Card 1: Engineering Overview */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                  <FaTools className="text-[8px]" />
                  <span>Technical Blueprint</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Division: <strong className="text-brand-950">{formData.code || "ESL-MEP"}</strong>
                </span>
              </div>

              <h2 className="font-bold text-brand-950 text-sm sm:text-base">
                Engineering Overview
              </h2>

              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed border-l-3 border-accent pl-3 py-0.5 whitespace-pre-line">
                {formData.fullDescription ||
                  formData.shortDescription ||
                  "Variable Refrigerant Flow (VRF) technology allows individual zone climate control with inverter compressor staging. Ideal for multi-story corporate headquarters, commercial towers, and hotels."}
              </p>

              {/* Badges Grid */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-[10px]">
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />
                  <div>
                    <span className="text-[8px] uppercase font-bold text-slate-400 block">
                      Standards
                    </span>
                    <span className="font-bold text-brand-950 block truncate">
                      {complianceList.slice(0, 1).join("") || "BNBC"} Compliant
                    </span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <FaAward className="text-accent text-xs shrink-0" />
                  <div>
                    <span className="text-[8px] uppercase font-bold text-slate-400 block">
                      Warranty
                    </span>
                    <span className="font-bold text-brand-950 block truncate">OEM Guarantee</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2">
                  <FaRegClock className="text-blue-500 text-xs shrink-0" />
                  <div>
                    <span className="text-[8px] uppercase font-bold text-slate-400 block">
                      Support
                    </span>
                    <span className="font-bold text-brand-950 block truncate">24/7 Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Scope of Work & Technical Deployments */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-1">
                  <FaCheckCircle className="text-[8px]" />
                  <span>Technical Deliverables</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  {scopeList.length} Certified Scope Items
                </span>
              </div>

              <h3 className="font-bold text-brand-950 text-sm sm:text-base">
                Scope of Work & Technical Deployments
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {scopeList.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 transition-colors flex items-start gap-2.5"
                  >
                    <div className="w-5 h-5 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                      <FaCheck />
                    </div>
                    <span className="text-[11px] sm:text-xs font-semibold text-slate-800 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Challenges & Engineered Solutions */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 flex items-center gap-1">
                  <FaLightbulb className="text-[8px]" />
                  <span>Engineering Problem-Solving</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Industrial Optimization
                </span>
              </div>

              <h3 className="font-bold text-brand-950 text-sm sm:text-base">
                Challenges & Engineered Solutions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Client Pain Points */}
                <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-rose-700 font-bold text-[10px] uppercase tracking-wider">
                    <FaExclamationTriangle className="text-[9px]" />
                    <span>Client Pain Points & Vulnerabilities</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-700">
                    {problemsList.map((p, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Engineered Solutions */}
                <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-[10px] uppercase tracking-wider">
                    <FaLightbulb className="text-[9px]" />
                    <span>Engineered Turnkey Solutions</span>
                  </div>
                  <ul className="space-y-1.5 text-[11px] text-slate-700">
                    {solutionsList.map((s, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 leading-snug">
                        <FaCheckCircle className="text-emerald-500 text-[9px] mt-0.5 shrink-0" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Card 4: FAQs */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[9px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 flex items-center gap-1">
                  <FaShieldAlt className="text-[8px]" />
                  <span>Technical Support</span>
                </span>
                <span className="text-[10px] text-slate-500 font-semibold">
                  Frequently Asked Questions
                </span>
              </div>

              <h3 className="font-bold text-brand-950 text-sm sm:text-base">
                Technical Clarifications & Project Execution
              </h3>

              <div className="space-y-2 pt-1">
                {faqsList.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-200/90 bg-white overflow-hidden shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full p-3 text-left flex items-center justify-between gap-2 text-xs font-bold text-brand-950 hover:text-accent transition-colors"
                      >
                        <span>{faq.question}</span>
                        <FaChevronDown
                          className={`text-[10px] text-slate-400 shrink-0 transition-transform ${
                            isOpen ? "rotate-180 text-accent" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="p-3 pt-0 text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Compliance Banner */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center gap-3 shadow-md border border-slate-800">
              <div className="w-9 h-9 rounded-xl bg-accent/20 text-accent flex items-center justify-center text-lg shrink-0">
                <FaShieldAlt />
              </div>
              <div className="text-[11px] leading-relaxed text-slate-300">
                <strong className="text-white font-bold block sm:inline">
                  Mandatory Engineering Compliance:
                </strong>{" "}
                Designed and executed strictly following{" "}
                <span className="text-accent font-semibold">{complianceList.join(", ")}</span> and
                Bangladesh safety codes.
              </div>
            </div>
          </div>

          {/* ========================================================== */}
          {/* RIGHT 4 COLUMNS: QUOTATION LEAD FORM & HELPLINE */}
          {/* ========================================================== */}
          <div className="md:col-span-4 space-y-4">
            {/* Consultation Card */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-md space-y-3">
              <div className="border-b border-slate-100 pb-2.5">
                <span className="text-[8px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 inline-block mb-1">
                  Quick Quotation
                </span>
                <h4 className="font-bold text-brand-950 text-xs sm:text-sm">
                  Request Technical BOQ
                </h4>
                <p className="text-slate-400 text-[10px]">
                  Fill in your project scale to get an engineered proposal.
                </p>
              </div>

              <div className="space-y-2 text-[10px]">
                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Full Name</label>
                  <input
                    type="text"
                    disabled
                    placeholder="e.g. Engr. Tanvir Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Corporate Email</label>
                  <input
                    type="email"
                    disabled
                    placeholder="tanvir@company.com"
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Contact Number</label>
                  <input
                    type="tel"
                    disabled
                    placeholder="+880 17XXXXXXXX"
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Company / Factory</label>
                  <input
                    type="text"
                    disabled
                    placeholder="Elite Apparels & Textiles Ltd."
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px]"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Estimated Scale</label>
                  <select
                    disabled
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px]"
                  >
                    <option>Select Scale</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-0.5">Specific Requirements</label>
                  <textarea
                    rows={2}
                    disabled
                    placeholder={`We would like to request an engineering consultation / BOQ estimate for "${formData.title}"...`}
                    className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-[10px] resize-none"
                  />
                </div>

                <button
                  type="button"
                  disabled
                  className="w-full bg-brand-950 text-white font-bold py-2 rounded-lg text-[10px] shadow-sm flex items-center justify-center gap-1"
                >
                  Request Engineered BOQ Proposal
                </button>
              </div>
            </div>

            {/* Helpline Box */}
            <div className="bg-brand-950 text-white p-4 rounded-2xl border border-brand-900 space-y-2.5 shadow-md">
              <div className="flex items-center gap-1.5 text-accent text-[10px] font-bold uppercase tracking-wider">
                <FaRegClock />
                <span>24/7 Corporate Helpline</span>
              </div>
              <p className="text-slate-300 text-[10px] leading-relaxed">
                Need immediate engineering clarification or emergency project consultation?
              </p>
              <div className="space-y-1.5 pt-1 text-[10px]">
                <div className="flex items-center gap-2 font-bold text-white">
                  <FaPhoneAlt className="text-accent text-[10px]" />
                  <span>+880 1313-663311</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300 truncate">
                  <FaEnvelope className="text-accent text-[10px] shrink-0" />
                  <span className="truncate">elitestandardlimited@gmail.com</span>
                </div>
              </div>
              <div className="pt-1">
                <span className="inline-flex items-center justify-center gap-1.5 w-full bg-white/10 border border-white/15 text-white font-bold text-[9px] py-1.5 rounded-lg">
                  <FaFilePdf className="text-accent" />
                  <span>Download Corporate Profile (PDF)</span>
                </span>
              </div>
            </div>

            {/* Related Division Solutions Navigator */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-2 text-[10px]">
              <span className="font-bold text-brand-950 text-[11px] block">
                Related {formData.category?.toUpperCase() || "MEP"} Solutions
              </span>
              <div className="space-y-1.5">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-brand-950 truncate">Central Chiller Plant Setup</span>
                  <FaArrowRight className="text-[8px] text-accent shrink-0" />
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-brand-950 truncate">Cleanroom AHU & HEPA Filtration</span>
                  <FaArrowRight className="text-[8px] text-accent shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaQuoteLeft,
  FaBuilding,
  FaHandshake,
  FaChevronLeft,
  FaChevronRight,
  FaCheckCircle,
  FaUserCircle,
} from "react-icons/fa";
import ThreeDCard from "@/components/ui/ThreeDCard";

const testimonials = [
  {
    quote:
      "Elite Standard Limited executed our 1200 TR cleanroom HVAC and BMS system with flawless precision. Their engineering team passed all ISO 7 particle audits on the first attempt.",
    clientName: "Engr. Monirul Islam",
    designation: "VP of Engineering & Projects",
    company: "Square Pharmaceuticals Ltd.",
    stars: 5,
    initials: "MI",
    badge: "Verified Client",
  },
  {
    quote:
      "Their NFPA fire sprinkler and pump installation for our 400,000 sq.ft factory complex was top-tier. They handled the entire Fire Service authorization clearance seamlessly.",
    clientName: "Tariqul Rahman",
    designation: "Director of Operations",
    company: "Apex Spinning & Textiles",
    stars: 5,
    initials: "TR",
    badge: "Verified Client",
  },
  {
    quote:
      "The 3200A LT panels and PFI plant designed by Elite Standard improved our power factor from 0.78 to 0.99, saving us millions in annual utility penalties.",
    clientName: "Syed Al-Mansur",
    designation: "Head of Infrastructure",
    company: "Dhaka Financial Tower",
    stars: 5,
    initials: "SA",
    badge: "Verified Client",
  },
  {
    quote:
      "Excellent company for electrical, Water Treatment and heavy machinery work. Professional team, reliable service, and great attention to detail. Highly recommended!",
    clientName: "Md Rubel Talukder",
    designation: "Executive Director",
    company: "Standard Machinery Ltd.",
    stars: 5,
    initials: "RT",
    badge: "Verified Client",
  },
  {
    quote:
      "Your work is truly on another level. Thank you for taking such great care of our MEP infrastructure deployment.",
    clientName: "Ratul Khan",
    designation: "Project Coordinator",
    company: "RK Infrastructure",
    stars: 5,
    initials: "RK",
    badge: "Verified Client",
  },
  {
    quote:
      "The work was completed on time as promised. The quality, precision, and safety compliance are truly commendable.",
    clientName: "Bijoy Barkatulla",
    designation: "Managing Partner",
    company: "BB MEP Associates",
    stars: 5,
    initials: "BB",
    badge: "Verified Client",
  },
];

const brandPartners = [
  { name: "Daikin", category: "HVAC Chillers & VRF" },
  { name: "Grundfos", category: "Pumps & Hydro-booster" },
  { name: "Siemens", category: "PLC & Switchgear" },
  { name: "ABB", category: "Circuit Breakers & Automation" },
  { name: "Cummins", category: "Power Generators" },
  { name: "Schneider", category: "Energy & Control Panels" },
];

export default function TestimonialsAndPartners() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  // Maximum starting index based on visible items (showing 3 cards on desktop)
  const totalSlides = testimonials.length;

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide effect every 5 seconds (paused on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, currentIndex]);

  // Compute 3 items to show starting from currentIndex
  const visibleTestimonials = [
    testimonials[currentIndex % totalSlides],
    testimonials[(currentIndex + 1) % totalSlides],
    testimonials[(currentIndex + 2) % totalSlides],
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 text-white relative overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-accent/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-800/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Slider Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-xs font-extrabold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              <span>Client Endorsements</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              What Our <span className="text-gradient-accent">Clients Say</span>
            </h2>

            <p className="text-slate-300 text-sm sm:text-base mt-2 leading-relaxed">
              Trusted by top pharmaceutical conglomerates, commercial towers, and industrial leaders across Bangladesh.
            </p>
          </div>

          {/* Slider Prev / Next Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={prevSlide}
              aria-label="Previous Testimonial"
              className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-slate-700 hover:border-accent text-slate-300 hover:text-accent flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-md"
            >
              <FaChevronLeft className="text-sm" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Testimonial"
              className="w-12 h-12 rounded-2xl bg-accent text-brand-950 hover:bg-amber-400 font-bold flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-accent/20"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Premium Testimonial Cards Carousel Viewport */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[380px]"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 40 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {visibleTestimonials.map((test, idx) => (
                <ThreeDCard key={`${test.company}-${idx}`} maxTilt={8} className="h-full">
                  <div className="group relative h-full bg-slate-800/95 border border-slate-700/80 rounded-3xl p-7 sm:p-8 flex flex-col justify-between hover:border-accent hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 overflow-hidden cursor-pointer">
                    {/* Background Quote Watermark */}
                    <FaQuoteLeft className="absolute top-6 right-6 text-5xl text-slate-700/30 group-hover:text-accent/20 transition-colors pointer-events-none" />

                    <div>
                      {/* Rating & Verified Badge */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-1 text-amber-400 text-xs bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-700/80">
                          {[...Array(test.stars)].map((_, i) => (
                            <FaStar key={i} />
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-800/60">
                          <FaCheckCircle className="text-[9px]" />
                          <span>{test.badge}</span>
                        </span>
                      </div>

                      {/* Quote Text */}
                      <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-light italic mb-8 relative z-10">
                        &quot;{test.quote}&quot;
                      </p>
                    </div>

                    {/* Client Info Footer */}
                    <div className="pt-5 border-t border-slate-700/60 flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent to-amber-500 text-brand-950 font-black text-sm flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                        {test.initials}
                      </div>

                      <div className="flex flex-col">
                        <h4 className="font-heading font-extrabold text-sm text-white group-hover:text-accent transition-colors">
                          {test.clientName}
                        </h4>
                        <span className="text-[11px] text-accent font-semibold line-clamp-1">
                          {test.designation}
                        </span>
                        <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                          <FaBuilding className="text-[9px] text-slate-500" />
                          <span className="line-clamp-1">{test.company}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </ThreeDCard>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "w-8 bg-accent shadow-md shadow-accent/40"
                  : "w-2.5 bg-slate-700 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Part B: Official Brand & OEM Equipment Partners */}
        <div className="mt-20 pt-12 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <FaHandshake className="text-accent text-sm" />
              <span>Official Brand & OEM Equipment Partners</span>
            </span>
          </div>

          {/* Premium Equipment Brand Badges Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {brandPartners.map((partner, idx) => (
              <div
                key={idx}
                className="group bg-slate-800/80 hover:bg-brand-900 border border-slate-700/80 hover:border-accent p-5 rounded-2xl text-center transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
              >
                <span className="font-heading font-black text-base sm:text-lg text-slate-300 group-hover:text-accent tracking-wider uppercase transition-colors block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-200 font-medium block mt-1">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


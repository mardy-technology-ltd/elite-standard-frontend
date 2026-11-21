"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import {
  FaCheckCircle,
  FaPaperPlane,
  FaCog,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface ServiceSubSpecialtiesProps {
  service: ServiceItem;
}

function SubServiceSliderMedia({
  sub,
  service,
}: {
  sub: SubServiceDetail;
  service: ServiceItem;
}) {
  const images: string[] =
    Array.isArray(sub.sliderImages) && sub.sliderImages.length > 0
      ? sub.sliderImages
      : sub.image
      ? [sub.image]
      : ["/images/placeholder.jpg"];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-72 sm:h-88 lg:h-96 w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-slate-950 group">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === currentIdx ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
          }`}
        >
          <Image
            src={img}
            alt={`${sub.title} image ${i + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
            sizes="(max-width: 1024px) 100vw, 45vw"
          />
        </div>
      ))}

      {/* Ambient gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent pointer-events-none" />

      {/* Interactive Controls if multiple images */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20 shadow-lg"
            title="Previous slide"
          >
            <FaChevronLeft className="text-[10px]" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentIdx((prev) => (prev + 1) % images.length);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-white/20 shadow-lg"
            title="Next slide"
          >
            <FaChevronRight className="text-[10px]" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setCurrentIdx(dotIdx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  dotIdx === currentIdx ? "w-4 bg-accent" : "w-1.5 bg-white/50 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Bottom Title Pill */}
      <Link
        href={`/services/${service.category}/${service.slug}/${sub.slug}`}
        className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between"
      >
        <span className="bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-bold text-accent border border-accent/30 shadow-md truncate max-w-[75%]">
          {service.code} / {sub.title}
        </span>
        <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 shrink-0">
          <span>Details</span>
          <FaArrowRight className="text-[9px]" />
        </span>
      </Link>
    </div>
  );
}

export default function ServiceSubSpecialties({ service }: ServiceSubSpecialtiesProps) {
  if (!service.subServices || service.subServices.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-b border-slate-200/60">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-10 2xl:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Engineered Solutions
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              {service.title} <span className="text-gradient">Solutions & Services</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Explore our turnkey engineered solutions, technical scope, and equipment setups for this discipline.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
            <FaCog className="text-accent text-sm" />
            <span>{service.subServices.length} Engineered Solutions</span>
          </div>
        </div>

        {/* Sub-Specialties Stacked Grid */}
        <div className="flex flex-col gap-12">
          {service.subServices.map((sub: SubServiceDetail, idx: number) => (
            <motion.div
              key={sub.id || idx}
              id={sub.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="scroll-mt-28 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center"
            >
              {/* Left Column: Details & Features (55% width on desktop) */}
              <div className="w-full lg:w-[55%] flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-900 text-accent font-extrabold text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-md border border-brand-100">
                    Solution #{idx + 1}
                  </span>
                </div>

                {/* 1. Title */}
                <Link href={`/services/${service.category}/${service.slug}/${sub.slug}`}>
                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-950 hover:text-accent transition-colors tracking-tight leading-snug">
                    {sub.title}
                  </h3>
                </Link>

                {/* 2. Subtitle / Description */}
                {(sub.shortDesc || sub.fullDesc || (sub as any).subtitle) && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {(sub as any).subtitle || sub.shortDesc || sub.fullDesc}
                  </p>
                )}

                {/* 3. Technical Solution / Bullet Items */}
                {Array.isArray(sub.features) && sub.features.length > 0 && (
                  <div className="pt-2 flex flex-col gap-2.5">
                    <h4 className="text-xs font-extrabold text-brand-950 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span>Solutions we cover:</span>
                    </h4>
                    <div className="flex flex-col gap-2">
                      {sub.features.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2.5 bg-brand-950 text-white px-4 py-3 rounded-xl border border-brand-900 shadow-sm hover:border-accent/50 transition-colors"
                        >
                          <span className="text-accent text-xs font-bold">›</span>
                          <span className="text-xs sm:text-sm font-semibold tracking-wide">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/services/${service.category}/${service.slug}/${sub.slug}`}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md transition-all active:scale-95 group/btn"
                  >
                    <span>View Technical Specifications →</span>
                  </Link>
                  <Link
                    href={`/contact?service=${service.slug}&sub=${sub.slug}&type=quotation`}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-accent text-brand-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-sm transition-colors border border-slate-200"
                  >
                    <span>Request Quote</span>
                    <FaPaperPlane className="text-[10px]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Image Showcase / Multi-image Slider (45% width on desktop) */}
              <div className="w-full lg:w-[45%]">
                <SubServiceSliderMedia sub={sub} service={service} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

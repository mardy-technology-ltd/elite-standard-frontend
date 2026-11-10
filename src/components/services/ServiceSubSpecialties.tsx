"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import { FaCheckCircle, FaPaperPlane, FaCog, FaArrowRight } from "react-icons/fa";

interface ServiceSubSpecialtiesProps {
  service: ServiceItem;
}

export default function ServiceSubSpecialties({ service }: ServiceSubSpecialtiesProps) {
  if (!service.subServices || service.subServices.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Engineered Solutions
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              {service.title} <span className="text-gradient">Solutions & Services</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore our turnkey engineered solutions, technical scope, and equipment setups for this discipline.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-500 bg-white px-4 py-2.5 rounded-lg border border-slate-200 shadow-sm">
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
              className="scroll-mt-28 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Column: Details & Features */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-brand-900 text-accent font-extrabold text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-800 bg-brand-50 px-3 py-1 rounded-md border border-brand-100">
                    Solution #{idx + 1}
                  </span>
                </div>

                {/* 1. Title */}
                <Link href={`/services/${service.slug}/${sub.slug}`}>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-brand-950 hover:text-accent transition-colors tracking-tight leading-snug">
                    {sub.title}
                  </h3>
                </Link>

                {/* 2. Subtitle / Description */}
                {(sub.shortDesc || sub.fullDesc || (sub as any).subtitle) && (
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {(sub as any).subtitle || sub.shortDesc || sub.fullDesc}
                  </p>
                )}

                {/* 3. Technical Solution */}
                {Array.isArray(sub.features) && sub.features.length > 0 && (
                  <div className="pt-2 flex flex-col gap-2.5">
                    <h4 className="text-xs font-extrabold text-brand-950 uppercase tracking-wider flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent" />
                      <span>Technical Solution:</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {sub.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <FaCheckCircle className="text-emerald-500 text-xs shrink-0 mt-0.5" />
                          <span className="text-slate-700 text-xs font-medium leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    href={`/services/${service.slug}/${sub.slug}`}
                    className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-all active:scale-95 group/btn"
                  >
                    <span>View Technical Specifications</span>
                    <FaArrowRight className="text-[10px] text-accent group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    href={`/contact?service=${service.slug}&sub=${sub.slug}&type=quotation`}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-accent text-brand-950 font-bold text-xs px-5 py-3 rounded-xl shadow-sm transition-colors border border-slate-200"
                  >
                    <span>Request Quote</span>
                    <FaPaperPlane className="text-[10px]" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Image Showcase / Banner */}
              <div className="lg:col-span-5">
                <Link
                  href={`/services/${service.slug}/${sub.slug}`}
                  className="relative block h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100 group/img cursor-pointer"
                >
                  <Image
                    src={sub.image || "/images/placeholder.jpg"}
                    alt={sub.title}
                    fill
                    className="object-cover group-hover/img:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-accent border border-accent/30">
                      {service.code} / {sub.title}
                    </span>
                    <span className="text-[11px] font-bold text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1">
                      Details <FaArrowRight className="text-[9px]" />
                    </span>
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

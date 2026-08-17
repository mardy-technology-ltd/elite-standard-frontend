"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData, ServiceItem } from "@/lib/mockData";
import {
  FaSnowflake,
  FaFireExtinguisher,
  FaBolt,
  FaMicrochip,
  FaLightbulb,
  FaIndustry,
  FaShower,
  FaWater,
  FaSun,
  FaArrowRight,
  FaTools,
} from "react-icons/fa";

// Helper to resolve icon components from string keys safely
const renderServiceIcon = (iconName: string) => {
  switch (iconName) {
    case "FaSnowflake":
      return <FaSnowflake className="text-2xl text-accent" />;
    case "FaFireExtinguisher":
      return <FaFireExtinguisher className="text-2xl text-accent" />;
    case "FaBolt":
      return <FaBolt className="text-2xl text-accent" />;
    case "FaMicrochip":
      return <FaMicrochip className="text-2xl text-accent" />;
    case "FaLightbulb":
      return <FaLightbulb className="text-2xl text-accent" />;
    case "FaIndustry":
      return <FaIndustry className="text-2xl text-accent" />;
    case "FaShower":
      return <FaShower className="text-2xl text-accent" />;
    case "FaWater":
      return <FaWater className="text-2xl text-accent" />;
    case "FaSun":
      return <FaSun className="text-2xl text-accent" />;
    default:
      return <FaTools className="text-2xl text-accent" />;
  }
};

export default function OurServices() {
  return (
    <section className="py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Our Engineering Expertise
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Comprehensive <span className="text-gradient">MEP & Engineering</span> Services
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We provide end-to-end design, procurement, installation, and commissioning for 9 major MEP and industrial utility domains.
            </p>
          </div>

          <Link
            href="/services"
            className="group hidden md:inline-flex items-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-brand-50 hover:bg-brand-900 px-5 py-3 rounded-lg transition-all duration-300"
          >
            <span>Explore All 9 Services</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 9 Services Grid (3 Columns Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service: ServiceItem, idx: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group bg-slate-50 hover:bg-brand-950 p-8 rounded-2xl border border-slate-200/80 hover:border-brand-800/60 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Icon & Code Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-brand-900 group-hover:bg-brand-900/90 flex items-center justify-center shadow-md border border-brand-800/40">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <span className="text-xs font-mono font-extrabold text-brand-800 group-hover:text-accent bg-white group-hover:bg-brand-900/90 px-3 py-1 rounded-md border border-slate-200 group-hover:border-brand-800/60 uppercase tracking-widest transition-colors">
                    {service.code}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading text-xl font-bold text-brand-950 group-hover:text-white mb-2 transition-colors">
                  {service.title}
                </h3>

                {/* Subtitle */}
                <span className="block text-xs font-semibold text-accent mb-3 uppercase tracking-wider">
                  {service.subtitle}
                </span>

                {/* Short Description */}
                <p className="text-slate-600 group-hover:text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3 transition-colors">
                  {service.shortDescription}
                </p>
              </div>

              {/* Read More Link */}
              <div className="pt-4 border-t border-slate-200/70 group-hover:border-slate-800/80 transition-colors">
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-800 group-hover:text-accent tracking-wider uppercase group/link"
                >
                  <span>Read Full Scope</span>
                  <FaArrowRight className="text-[10px] group-hover/link:translate-x-1.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All CTA Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/services"
            className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-sm bg-brand-900 py-3.5 rounded-lg shadow-md"
          >
            <span>Explore All 9 Services</span>
            <FaArrowRight className="text-xs text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
}

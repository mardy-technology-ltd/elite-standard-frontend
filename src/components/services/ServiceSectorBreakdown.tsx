"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaBuilding, FaHome, FaIndustry } from "react-icons/fa";
import { ServiceItem } from "@/lib/mockData";

interface ServiceSectorBreakdownProps {
  service: ServiceItem;
}

type SectorKey = "residential" | "commercial" | "industrial";

export default function ServiceSectorBreakdown({ service }: ServiceSectorBreakdownProps) {
  const [activeSector, setActiveSector] = useState<SectorKey>("commercial");

  if (!service.sectors) return null;

  const sectors = service.sectors;

  const getSectorIcon = (key: SectorKey) => {
    switch (key) {
      case "residential":
        return <FaHome className="text-lg" />;
      case "commercial":
        return <FaBuilding className="text-lg" />;
      case "industrial":
        return <FaIndustry className="text-lg" />;
    }
  };

  const sectorColors = {
    residential: {
      btnActive: "bg-blue-600 text-white border-blue-600",
      accent: "text-blue-600",
      bgLight: "bg-blue-50/50",
      border: "border-blue-100",
    },
    commercial: {
      btnActive: "bg-brand-900 text-white border-brand-900",
      accent: "text-accent",
      bgLight: "bg-brand-50/20",
      border: "border-brand-100",
    },
    industrial: {
      btnActive: "bg-amber-600 text-white border-amber-600",
      accent: "text-amber-600",
      bgLight: "bg-amber-50/30",
      border: "border-amber-100",
    },
  };

  const currentTheme = sectorColors[activeSector];

  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Sector-Wise Solutions
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            Tailored Engineering for <span className="text-gradient">Every Sector</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            We adapt our {service.title} services to meet the strict demands of residential, commercial, and industrial facilities.
          </p>
        </div>

        {/* Tab Buttons Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-2">
            {(["residential", "commercial", "industrial"] as SectorKey[]).map((key) => {
              const isActive = activeSector === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveSector(key)}
                  className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide uppercase transition-all duration-300 ${
                    isActive
                      ? sectorColors[key].btnActive + " shadow-md"
                      : "text-slate-500 hover:text-brand-950 hover:bg-slate-50 border border-transparent"
                  }`}
                >
                  {getSectorIcon(key)}
                  <span>{key} Solutions</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Cards */}
        <div className="relative min-h-[320px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSector}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-lg grid grid-cols-1 lg:grid-cols-12 gap-10 items-center`}
            >
              {/* Left Column: Overview Details */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${currentTheme.bgLight} ${currentTheme.accent} border ${currentTheme.border}`}>
                    {getSectorIcon(activeSector)}
                  </div>
                  <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-950">
                    {sectors[activeSector].title}
                  </h3>
                </div>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {sectors[activeSector].overview}
                </p>
              </div>

              {/* Right Column: Key Features checklist */}
              <div className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl ${currentTheme.bgLight} border ${currentTheme.border} self-stretch flex flex-col justify-center`}>
                <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-950 mb-4">
                  Key Specifications:
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {sectors[activeSector].features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <FaCheckCircle className={`text-sm mt-0.5 shrink-0 ${currentTheme.accent}`} />
                      <span className="text-slate-700 text-xs sm:text-sm leading-tight font-medium">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

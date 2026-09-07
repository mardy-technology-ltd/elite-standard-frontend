"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCogs,
  FaBolt,
  FaWater,
  FaDraftingCompass,
  FaTools,
  FaCheckCircle,
  FaShieldAlt,
  FaWrench,
  FaTruck,
  FaArrowRight,
  FaChevronRight,
  FaShieldVirus,
  FaStar,
} from "react-icons/fa";
import { framework369Data, servicesData } from "@/lib/mockData";

export default function Framework369() {
  const [activeCategory, setActiveCategory] = useState<"all" | "mechanical" | "electrical" | "plumbing">("all");

  const filteredServices = servicesData.filter(
    (service) => activeCategory === "all" || service.category === activeCategory
  );

  const getSolutionIcon = (iconName: string) => {
    switch (iconName) {
      case "FaCogs":
        return <FaCogs className="w-7 h-7 text-blue-400" />;
      case "FaBolt":
        return <FaBolt className="w-7 h-7 text-amber-400" />;
      case "FaWater":
        return <FaWater className="w-7 h-7 text-cyan-400" />;
      default:
        return <FaCogs className="w-7 h-7 text-accent" />;
    }
  };

  const getActionIcon = (iconName: string) => {
    switch (iconName) {
      case "FaDraftingCompass":
        return <FaDraftingCompass className="w-5 h-5 text-accent" />;
      case "FaTools":
        return <FaTools className="w-5 h-5 text-blue-400" />;
      case "FaCheckCircle":
        return <FaCheckCircle className="w-5 h-5 text-emerald-400" />;
      case "FaShieldAlt":
        return <FaShieldAlt className="w-5 h-5 text-purple-400" />;
      case "FaWrench":
        return <FaWrench className="w-5 h-5 text-amber-400" />;
      case "FaTruck":
        return <FaTruck className="w-5 h-5 text-cyan-400" />;
      default:
        return <FaTools className="w-5 h-5 text-accent" />;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-brand-950 to-slate-900 text-white overflow-hidden relative">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-800/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30 text-accent font-semibold text-xs uppercase tracking-widest mb-4 shadow-sm"
          >
            <FaStar className="w-3.5 h-3.5" />
            {framework369Data.badge}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4"
          >
            {framework369Data.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-300 leading-relaxed font-light"
          >
            {framework369Data.description}
          </motion.p>
        </div>

        {/* --- PART 1: THE 3 INTEGRATED SOLUTIONS (MEP) --- */}
        <div className="mb-20">
          <div className="mb-8">
            <span className="text-accent font-extrabold text-xs uppercase tracking-widest block mb-1">
              Integrated Engineering Solutions
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Mechanical, Electrical & Plumbing (MEP) Pillars
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {framework369Data.solutions.map((sol, idx) => (
              <motion.div
                key={sol.code}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative bg-slate-800/80 backdrop-blur-xl border border-slate-700/60 rounded-2xl p-6 sm:p-8 hover:border-accent/60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-bl-full pointer-events-none group-hover:bg-accent/10 transition-colors" />

                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-xl bg-slate-900/90 border border-slate-700 flex items-center justify-center shadow-inner">
                    {getSolutionIcon(sol.icon)}
                  </div>
                  <span className="text-4xl font-black text-slate-700/80 group-hover:text-accent/40 transition-colors">
                    {sol.code}
                  </span>
                </div>

                <h4 className="text-xl font-extrabold text-white mb-1 group-hover:text-accent transition-colors">
                  {sol.title}
                </h4>
                <p className="text-xs text-slate-400 font-medium mb-4">{sol.subtitle}</p>

                <div className="mb-6">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    International Codes & Compliance:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {sol.compliance.map((code) => (
                      <span
                        key={code}
                        className="px-2.5 py-0.5 rounded-md bg-slate-900/90 text-slate-300 text-xs font-mono font-semibold border border-slate-700/80"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">{sol.servicesCount} Flagship Services</span>
                  <Link
                    href={`/services?category=${sol.categoryKey}`}
                    className="inline-flex items-center gap-1.5 text-accent font-semibold hover:underline"
                  >
                    Explore <FaChevronRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PART 2: THE 6 CORE ACTIONS --- */}
        <div className="mb-20">
          <div className="mb-10">
            <span className="text-accent font-extrabold text-xs uppercase tracking-widest block mb-1">
              Core Execution Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              End-to-End Engineering Execution
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              From concept blueprinting to long-term operational supply & maintenance
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {framework369Data.actions.map((act, idx) => (
              <motion.div
                key={act.step}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between hover:bg-slate-800 hover:border-accent/50 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-full bg-accent/20 text-accent font-bold text-xs flex items-center justify-center border border-accent/40">
                      0{act.step}
                    </span>
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-700/80 group-hover:scale-110 transition-transform">
                      {getActionIcon(act.icon)}
                    </div>
                  </div>
                  <h4 className="text-base font-extrabold text-white mb-1 group-hover:text-accent transition-colors">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-accent/80 font-semibold mb-2">{act.subtitle}</p>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-3 font-light">
                    {act.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- PART 3: THE 9 FLAGSHIP SERVICES --- */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-accent font-extrabold text-xs uppercase tracking-widest block mb-1">
                Flagship Service Portfolio
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Comprehensive Engineering Services
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Each service covers Residential, Commercial, and Industrial sectors
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 bg-slate-800/90 p-1.5 rounded-xl border border-slate-700">
              {(
                [
                  { id: "all", label: "All Services (9)" },
                  { id: "mechanical", label: "Mechanical (3)" },
                  { id: "electrical", label: "Electrical (3)" },
                  { id: "plumbing", label: "Plumbing (3)" },
                ] as const
              ).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                    activeCategory === tab.id
                      ? "bg-accent text-slate-950 font-bold shadow-md"
                      : "text-slate-300 hover:text-white hover:bg-slate-700/60"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, idx) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 hover:border-accent/70 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-md bg-slate-900 border border-slate-700 text-accent font-mono font-bold text-xs">
                        {service.code}
                      </span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-700">
                        {service.category}
                      </span>
                    </div>

                    <h4 className="text-lg font-extrabold text-white mb-2 group-hover:text-accent transition-colors line-clamp-1">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                      {service.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {service.compliance.map((c) => (
                        <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/80 text-slate-400">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center justify-between w-full pt-4 border-t border-slate-700/60 text-xs font-bold text-accent group-hover:text-white transition-colors"
                  >
                    <span>View Service & Sectors</span>
                    <FaArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

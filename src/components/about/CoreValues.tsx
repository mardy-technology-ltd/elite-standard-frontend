"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaAward, FaLeaf, FaHandshake } from "react-icons/fa";

export interface ValueCard {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
}

export const coreValuesData: ValueCard[] = [
  {
    icon: <FaShieldAlt className="text-2xl text-accent" />,
    title: "Safety Above All",
    subtitle: "NFPA & BNBC Compliance",
    description: "Every blueprint and field installation strictly enforces zero-compromise fire safety and life-protection codes.",
  },
  {
    icon: <FaAward className="text-2xl text-accent" />,
    title: "Engineering Excellence",
    subtitle: "ISO 9001 Quality Standards",
    description: "Factory acceptance testing (FAT), thermal imaging, and pressure validation ensure precision performance.",
  },
  {
    icon: <FaLeaf className="text-2xl text-accent" />,
    title: "Sustainable Innovation",
    subtitle: "Green Building & Rooftop Solar",
    description: "We optimize HVAC COP ratings, integrate solar PV net metering, and lower industrial carbon footprints.",
  },
  {
    icon: <FaHandshake className="text-2xl text-accent" />,
    title: "Unwavering Integrity",
    subtitle: "Client Trust & Transparency",
    description: "Transparent BOQ estimates, genuine branded equipment supply, and dedicated post-commissioning maintenance.",
  },
];

export default function CoreValues() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Core Principles
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            The Values That Drive <span className="text-gradient">Elite Standard</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Our corporate culture is built on four core pillars that guide every MEP design, equipment import, and site installation.
          </p>
        </div>

        {/* 4 Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValuesData.map((val: ValueCard, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:scale-105 transition-all duration-200 shrink-0">
                  {val.icon}
                </div>

                <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-800 bg-brand-50 px-2.5 py-1 rounded-md border border-brand-100 mb-2 inline-block">
                  {val.subtitle}
                </span>

                <h3 className="font-heading font-extrabold text-xl text-brand-950 group-hover:text-brand-800 transition-colors mb-3">
                  {val.title}
                </h3>

                <p className="text-slate-600 text-xs leading-relaxed">
                  {val.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

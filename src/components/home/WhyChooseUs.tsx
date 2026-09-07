"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaProjectDiagram,
  FaUserCheck,
  FaHeadset,
  FaBoxes,
  FaChartLine,
} from "react-icons/fa";

const trustPillars = [
  {
    icon: FaShieldAlt,
    title: "100% Code & Standard Compliance",
    description: "Every engineering blueprint and field installation strictly complies with BNBC, NFPA, ASHRAE, SMACNA, IEC, IEEE, NEC, and IPC standards.",
    badge: "Safety & Quality",
  },
  {
    icon: FaProjectDiagram,
    title: "Turnkey Single-Point Responsibility",
    description: "From concept design, heat load calculation, and CAD/BIM modeling to procurement, installation, commissioning, and maintenance — all under one umbrella.",
    badge: "End-to-End Execution",
  },
  {
    icon: FaUserCheck,
    title: "Certified Veteran MEP Engineers",
    description: "Our core engineering team comprises seasoned electro-mechanical professionals with extensive expertise across high-rise, commercial, and pharmaceutical facilities.",
    badge: "Engineering Excellence",
  },
  {
    icon: FaHeadset,
    title: "24/7 SLA & Rapid Emergency Response",
    description: "Dedicated round-the-clock technical support, quick fault diagnostics, and rapid emergency breakdown recovery teams to ensure zero operational downtime.",
    badge: "Zero Downtime SLA",
  },
  {
    icon: FaBoxes,
    title: "Direct OEM Sourcing & Authentic Parts",
    description: "We procure UL/FM certified switchgear, VRF outdoor units, chillers, and pumps directly from tier-1 manufacturers with genuine OEM warranties.",
    badge: "Genuine Procurement",
  },
  {
    icon: FaChartLine,
    title: "Energy Audit & Cost Efficiency Optimization",
    description: "Smart VFD motor controls, psychrometric balancing, and BMS telemetry designed to minimize energy consumption and maximize facility ROI.",
    badge: "Sustainability & ROI",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Why Elite Standard Limited
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight">
            Why Industry Leaders <span className="text-gradient">Trust Us</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We deliver uncompromising electro-mechanical engineering solutions backed by international safety compliance, certified technical leadership, and round-the-clock facility support.
          </p>
        </div>

        {/* 6 Trust Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Border Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-800 to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-50 group-hover:bg-brand-900 flex items-center justify-center text-brand-800 group-hover:text-accent transition-colors duration-300 shadow-inner">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-800 bg-brand-50 group-hover:bg-accent/20 group-hover:text-brand-900 px-3 py-1 rounded-full uppercase tracking-wider transition-colors">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-brand-950 mb-3 group-hover:text-brand-800 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

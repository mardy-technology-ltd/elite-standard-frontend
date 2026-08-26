"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaPencilRuler,
  FaTools,
  FaClipboardCheck,
  FaShieldAlt,
  FaHeadset,
  FaBoxes,
} from "react-icons/fa";

const pillars = [
  {
    icon: FaPencilRuler,
    title: "1. Designing",
    description: "We develop efficient, safe, and future-ready designs based on facility requirements, complying with BNBC, NFPA, ASHRAE, and international codes.",
    badge: "Core Action 1",
  },
  {
    icon: FaTools,
    title: "2. Installing",
    description: "We ensure accurate and reliable installations of Mechanical, Electrical, and Plumbing systems using modern technology and skilled engineering professionals.",
    badge: "Core Action 2",
  },
  {
    icon: FaClipboardCheck,
    title: "3. Commissioning",
    description: "We perform complete testing and verification before system handover to ensure optimal performance and absolute safety compliance.",
    badge: "Core Action 3",
  },
  {
    icon: FaShieldAlt,
    title: "4. Maintaining",
    description: "We provide regular preventive and predictive maintenance programs to ensure long-term system reliability, safety, and operational efficiency.",
    badge: "Core Action 4",
  },
  {
    icon: FaHeadset,
    title: "5. Servicing",
    description: "We deliver prompt and dependable engineering services to resolve critical issues quickly and maintain smooth, uninterrupted facility operations.",
    badge: "Core Action 5",
  },
  {
    icon: FaBoxes,
    title: "6. Supplying",
    description: "We source and supply high-quality materials and trusted equipment to support durable, energy-efficient, and long-term engineering solutions.",
    badge: "Core Action 6",
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
            Our engineering workflow is built on 6 Core Project Actions, executed in strict compliance with BNBC, NFPA, ASHRAE, SMACNA, IEC, IEEE, NEC, and IPC standards.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
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

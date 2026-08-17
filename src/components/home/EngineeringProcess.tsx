"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardCheck,
  FaDraftingCompass,
  FaCogs,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    stepNumber: "01",
    icon: FaClipboardCheck,
    title: "Consultation & Audit",
    subtitle: "Site Survey & Requirements Mapping",
    description: "Detailed heat load analysis, electrical load calculation, site feasibility study, and BNBC/NFPA compliance gap audit.",
    deliverable: "Feasibility Report & Budget Estimate",
  },
  {
    stepNumber: "02",
    icon: FaDraftingCompass,
    title: "Design & Simulation",
    subtitle: "3D BIM & Detailed Blueprinting",
    description: "CAD drafting, Dialux lighting simulation, SMACNA duct sizing, hydraulic pipe calculations, and panel schematic design.",
    deliverable: "Approved Shop Drawings & Specs",
  },
  {
    stepNumber: "03",
    icon: FaCogs,
    title: "Procurement & Assembly",
    subtitle: "Turnkey Installation & Erection",
    description: "Procurement of UL-listed equipment, in-house LT/HT panel fabrication, ductwork erection, cable tray laying, and piping installation.",
    deliverable: "Quality Controlled Assembly & Wiring",
  },
  {
    stepNumber: "04",
    icon: FaCheckCircle,
    title: "Testing & Handover",
    subtitle: "FAT / SAT & Fire Certification",
    description: "Pressure testing, insulation resistance testing, cleanroom particle validation, generator load-bank sync, and authority approval handover.",
    deliverable: "As-Built Drawings & Operations Manual",
  },
];

export default function EngineeringProcess() {
  return (
    <section className="py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              How We Execute
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight">
            Our Structured <span className="text-gradient">Engineering Process</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            A rigorous 4-stage engineering lifecycle ensuring zero safety compromises, transparent milestone tracking, and seamless project commissioning.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="group bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Step Number Top Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-900 text-accent font-mono font-extrabold text-lg flex items-center justify-center shadow-md">
                    {step.stepNumber}
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-brand-50 group-hover:bg-accent/20 flex items-center justify-center text-brand-800 transition-colors">
                    <Icon className="text-lg" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
                    {step.title}
                  </h3>
                  <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                    {step.subtitle}
                  </span>
                  <p className="text-slate-600 text-xs leading-relaxed mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Deliverable Footer */}
                <div className="mt-6 pt-4 border-t border-slate-100 bg-slate-50/80 -mx-7 -mb-7 p-4 px-7 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-bold text-slate-700">
                    Key Output: {step.deliverable}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

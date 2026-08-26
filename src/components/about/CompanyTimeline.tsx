"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  highlight: string;
}

export const timelineData: TimelineItem[] = [
  {
    year: "2012",
    title: "Company Founding & MEP Licensing",
    description: "Elite Standard Limited was incorporated in Banani, Dhaka, as a specialized electrical and plumbing contracting firm.",
    highlight: "Incorporated with IEB & FSCD Licensing",
  },
  {
    year: "2016",
    title: "Pharmaceutical Cleanroom HVAC Expansion",
    description: "Expanded engineering capabilities to design Class 10,000 cleanroom HVAC and HEPA air handling units for Square & Beximco Pharma.",
    highlight: "First ISO 7 Cleanroom Validation",
  },
  {
    year: "2019",
    title: "NFPA Fire Safety & Substation Division",
    description: "Established dedicated High Tension (HT) substation assembly unit and NFPA-compliant fire pump fabrication facility.",
    highlight: "100+ Factory Fire Clearances Issued",
  },
  {
    year: "2022",
    title: "Industrial Automation & BMS Launch",
    description: "Launched smart factory PLC/SCADA automation and building management system (BMS) integration division.",
    highlight: "Siemens & Schneider Automation Partner",
  },
  {
    year: "2024",
    title: "Dhaka Metro Rail Project Selection",
    description: "Secured key contracts for the Dhaka Mass Rapid Transit Development Project (DMRTDP Line 6, CP-3&4) to install Building Automation (IBA Designing) and Rainwater Harvesting Systems (RHS Servicing).",
    highlight: "National Infrastructure Project Partner",
  },
  {
    year: "2026",
    title: "Rooftop Solar & Enterprise Expansion",
    description: "Pioneered net-metered rooftop solar PV installations and expanded turnkey MEP operations nationwide.",
    highlight: "Over 250 Megawatts Clean Energy Installed",
  },
];

export default function CompanyTimeline() {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Milestones & Growth
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Our Growth <span className="text-gradient">Timeline</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Tracking over a decade of engineering breakthroughs, safety certifications, and infrastructure milestones across Bangladesh.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-brand-900 bg-brand-50 px-4 py-2.5 rounded-lg border border-brand-100">
            <FaCalendarAlt className="text-accent text-sm" />
            <span>2012 &ndash; 2026 Corporate Achievements</span>
          </div>
        </div>

        {/* Timeline Horizontal / Vertical Cards */}
        <div className="relative border-l-2 border-brand-900/20 ml-4 sm:ml-8 pl-6 sm:pl-10 flex flex-col gap-10">
          {timelineData.map((item: TimelineItem, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Year Dot Marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-6 w-6 h-6 rounded-full bg-brand-900 border-4 border-white text-accent flex items-center justify-center shadow-md">
                <div className="w-2 h-2 rounded-full bg-accent" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-950">
                  {item.year}
                </span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-accent/20 px-3 py-1 rounded-md border border-accent/40 w-fit">
                  {item.highlight}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-brand-900 mb-2">
                {item.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

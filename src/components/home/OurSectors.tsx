"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaBuilding,
  FaFlaskVial,
  FaIndustry,
  FaHospital,
  FaServer,
  FaSun,
  FaArrowRight,
} from "react-icons/fa6";

const sectors = [
  {
    id: "sec1",
    title: "Commercial & Corporate Towers",
    description: "Centralized HVAC, high-speed BBT power distribution, and NFPA life safety for multi-story office complexes.",
    icon: FaBuilding,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    projectsCount: "140+ Projects",
  },
  {
    id: "sec2",
    title: "Pharmaceuticals & Cleanrooms",
    description: "ISO 7 cleanroom HVAC, HEPA filtration, positive pressure control, and purified water piping.",
    icon: FaFlaskVial,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    projectsCount: "65+ Projects",
  },
  {
    id: "sec3",
    title: "Industrial Plants & Textiles",
    description: "Heavy-duty power distribution panels, high-pressure fire hydrants, biological ETPs, and SCADA automation.",
    icon: FaIndustry,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    projectsCount: "180+ Projects",
  },
  {
    id: "sec4",
    title: "Healthcare & Hospitals",
    description: "Medical gas pipelines, isolated power systems (IPS), emergency generator sync, and laminar airflow operating rooms.",
    icon: FaHospital,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop",
    projectsCount: "45+ Projects",
  },
  {
    id: "sec5",
    title: "Data Centers & Telecom",
    description: "Precision AC cooling, N+1 redundant generator banks, FM200 gas suppression, and power monitoring.",
    icon: FaServer,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    projectsCount: "35+ Projects",
  },
  {
    id: "sec6",
    title: "Renewable Energy & Solar",
    description: "Industrial rooftop solar PV arrays, net metering integration, and high-efficiency inverter synchronization.",
    icon: FaSun,
    image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop",
    projectsCount: "50+ Projects",
  },
];

export default function OurSectors() {
  return (
    <section className="py-24 bg-brand-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-accent uppercase tracking-widest">
              Sectors & Industries
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineering Solutions Across <span className="text-gradient-accent">Key Sectors</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            From high-rise commercial hubs to high-precision pharmaceutical cleanrooms, we deliver specialized MEP engineering tailored to unique industry standards.
          </p>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative h-[360px] rounded-2xl overflow-hidden border border-brand-800/60 shadow-xl"
              >
                {/* Background Image */}
                <Image
                  src={sector.image}
                  alt={sector.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/75 to-brand-950/30 group-hover:from-brand-950 group-hover:via-brand-950/90 transition-all duration-300" />

                {/* Top Badge */}
                <div className="absolute top-5 right-5 bg-brand-900/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-accent/30 text-[11px] font-bold text-accent">
                  {sector.projectsCount}
                </div>

                {/* Card Content (Bottom Aligned) */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-brand-950 transition-all duration-300">
                    <Icon className="text-xl" />
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white group-hover:text-accent transition-colors">
                    {sector.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {sector.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={`/sectors`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider group/link"
                    >
                      <span>Explore Industry Scope</span>
                      <FaArrowRight className="text-[10px] group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

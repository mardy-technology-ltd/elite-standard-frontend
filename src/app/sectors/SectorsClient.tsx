"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaHome,
  FaBuilding,
  FaIndustry,
  FaCheckCircle,
  FaChevronRight,
  FaTools,
  FaShieldAlt,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";

interface SectorData {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgGrad: string;
  themeColor: string;
  description: string;
  specs: string[];
  projects: string[];
  standards: string[];
}

const sectorsList: SectorData[] = [
  {
    id: "residential",
    title: "Residential Sector",
    subtitle: "High-Rise Apartments, Condos & Premium Housing Societies",
    icon: <FaHome className="text-3xl" />,
    bgGrad: "from-emerald-50 to-teal-50/30",
    themeColor: "emerald",
    description: "Our residential MEP designs prioritize occupant safety, acoustics (low-noise HVAC solutions), and extreme energy efficiency. We create smart water distribution systems and modular lighting layouts tailored for modern urban living.",
    specs: [
      "Variable Refrigerant Flow (VRF/VRV) centralized cooling with zoned temperature controls.",
      "NFPA Wet Pipe fire sprinklers, hose reels, and addressable smoke detection.",
      "Hydro-pneumatic booster pump water supply to maintain uniform pressure at all floors.",
      "Prepaid power distribution panels and low-resistance earthing grids.",
      "Corrosion-resistant PPR and HDPE plumbing riser networks."
    ],
    projects: [
      "Premium Condominium towers (Dhaka)",
      "Luxury Villa HVAC and plumbing design"
    ],
    standards: [
      "BNBC (Bangladesh National Building Code)",
      "NFPA 13 (Standard for Sprinkler Systems)",
      "ASHRAE 15 (Refrigeration Safety)"
    ]
  },
  {
    id: "commercial",
    title: "Commercial Sector",
    subtitle: "Corporate Towers, Shopping Malls, Hotels & Public Facilities",
    icon: <FaBuilding className="text-3xl" />,
    bgGrad: "from-blue-50 to-indigo-50/30",
    themeColor: "blue",
    description: "For commercial spaces, Elite Standard Limited designs massive centralized HVAC plants, automated electrical switchgears, and building management networks. We focus on scalability, system redundancy, and 24/7 load-sharing continuity.",
    specs: [
      "Water-cooled Centrifugal Chiller plants, AHUs, and customized duct networks.",
      "Main LT/HT substation switchgears up to 4000A and micro-processor PFI plants (0.99 PF).",
      "High-conductivity copper Busbar Trunking Systems (BBT) for vertical power runs.",
      "Siemens/Schneider Building Management Systems (BMS) with real-time energy telemetry.",
      "Stormwater harvesting networks and rainwater filtration storage setups."
    ],
    projects: [
      "IFIC Bank Corporate Offices",
      "Padma Bank Building MEP planning",
      "Dhaka Metro Rail (Line 6, CP-3&4) Station Buildings"
    ],
    standards: [
      "ASHRAE 90.1 (Energy Standard for Buildings)",
      "NFPA 72 (National Fire Alarm Code)",
      "IEC / IEEE Substation Standards"
    ]
  },
  {
    id: "industrial",
    title: "Industrial Sector",
    subtitle: "Pharmaceutical Cleanrooms, RMG Factories & Process Utilities",
    icon: <FaIndustry className="text-3xl" />,
    bgGrad: "from-amber-50 to-yellow-50/30",
    themeColor: "amber",
    description: "Industrial environments demand heavy-duty process plumbing, sterile air filtration, and specialized gas distribution manifolds. We build robust systems that comply with strict international regulatory bodies and environmental codes.",
    specs: [
      "ISO Class 5-8 positive-pressure cleanroom AHUs and HEPA filtration arrays.",
      "High-pressure LPG/Natural Gas manifolds and single/multi-stage Regulating Stations.",
      "Biological Effluent Treatment Plants (ETP) and MBBR Sewage Treatment Plants (STP).",
      "FM200, Novec-1230, and CO2 clean agent automatic gas suppression networks.",
      "Industrial Rooftop on-grid Solar PV systems with net-metering approvals."
    ],
    projects: [
      "Mansons Pharma Cleanroom HVAC",
      "Biotech Associates Utility pipelines",
      "RMG / Textile spinning plants load synchronization grids"
    ],
    standards: [
      "WHO / US FDA Cleanroom Guidelines",
      "SMACNA (Duct Construction Standards)",
      "NFPA 2001 (Clean Agent Fire Suppression)",
      "DoE (Department of Environment) ETP Guidelines"
    ]
  }
];

export default function SectorsClient() {
  // Handle smooth scroll on anchor load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-brand-950 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1e36_1px,transparent_1px),linear-gradient(to_bottom,#0f1e36_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-brand-900/60 px-4.5 py-1.5 rounded-full border border-brand-800 shadow-sm">
            MEP Engineering Sectors
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            Industry Sectors We Serve
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Delivering customized, code-compliant, and energy-efficient Mechanical, Electrical, and Plumbing engineering layouts across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. Sectors Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col gap-16">
        {sectorsList.map((sector, sIdx) => {
          const isEven = sIdx % 2 === 0;

          return (
            <motion.div
              key={sector.id}
              id={sector.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className={`scroll-mt-24 bg-white rounded-[32px] border border-slate-200/80 shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12`}
            >
              {/* Left/Right Text Column */}
              <div className={`p-8 sm:p-12 lg:col-span-7 flex flex-col justify-center gap-6 ${!isEven && "lg:order-2"}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent flex items-center justify-center shadow-sm">
                    {sector.icon}
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-brand-950 text-2xl sm:text-3xl leading-none">
                      {sector.title}
                    </h2>
                    <span className="text-slate-500 text-xs sm:text-sm font-semibold mt-1.5 block">
                      {sector.subtitle}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-accent pl-4">
                  {sector.description}
                </p>

                {/* System Specs List */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-bold text-xs sm:text-sm text-brand-950 uppercase tracking-wider">
                    Core Technical Specifications
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {sector.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-normal">
                        <FaCheckCircle className="text-brand-950 mt-1 shrink-0 text-[13px]" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right/Left Meta Panel (Dark Slate / Gradients) */}
              <div className={`lg:col-span-5 bg-gradient-to-br ${sector.bgGrad} p-8 sm:p-12 border-t lg:border-t-0 border-slate-200 flex flex-col justify-between gap-8 ${!isEven && "lg:order-1 lg:border-r border-slate-200"}`}>
                {/* Project References */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-extrabold tracking-widest text-brand-900 uppercase block">
                    Key Project References
                  </span>
                  <div className="flex flex-col gap-3">
                    {sector.projects.map((proj, pIdx) => (
                      <div key={pIdx} className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs font-bold text-brand-950">{proj}</span>
                          <span className="text-[9px] text-slate-400 uppercase font-semibold">Elite Project Scope</span>
                        </div>
                        <FaChevronRight className="text-[10px] text-slate-300 group-hover:text-accent transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Codes */}
                <div className="flex flex-col gap-4">
                  <span className="text-[10px] font-extrabold tracking-widest text-brand-900 uppercase block">
                    Sector Compliance Codes
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {sector.standards.map((std, idx) => (
                      <span key={idx} className="text-[10px] sm:text-xs font-bold text-brand-950 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{std}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </section>

      {/* 3. Footer B2B Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-brand-950 text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden flex flex-col lg:flex-row justify-between items-center gap-8 shadow-xl border border-brand-900">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1e36_1px,transparent_1px),linear-gradient(to_bottom,#0f1e36_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-25" />
          
          <div className="flex flex-col gap-2.5 max-w-xl text-center lg:text-left relative z-10">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Need Sector-Specific Engineering Consulting?
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our engineering division can draft specialized system designs conforming strictly to your specific industry compliance protocols.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 w-full sm:w-auto">
            <Link
              href="/contact?type=consultation"
              className="w-full sm:w-auto text-center bg-accent hover:bg-amber-600 text-brand-950 font-extrabold text-xs px-6 py-4 rounded-xl shadow-md transition-colors"
            >
              <span>Get Free Consultation</span>
            </Link>

            <Link
              href="/contact"
              className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-4 rounded-xl transition-all duration-200 border border-brand-800"
            >
              <FaPaperPlane className="text-xs text-accent" />
              <span>Submit BOQ Requirements</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

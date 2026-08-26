"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaAward,
  FaBuilding,
  FaCertificate,
  FaCheckCircle,
  FaFileAlt,
  FaBookOpen,
} from "react-icons/fa";

export interface AccreditationItem {
  code: string;
  title: string;
  issuer: string;
  description: string;
  icon: React.ReactNode;
}

export interface EngineeringCodeItem {
  code: string;
  name: string;
  scope: string;
  category: string;
}

export const accreditationsData: AccreditationItem[] = [
  {
    code: "ISO 9001:2015",
    title: "Quality Management System Certification",
    issuer: "International Organization for Standardization",
    description: "Certified Quality System governing turnkey MEP design, equipment procurement, and field commissioning.",
    icon: <FaAward className="text-2xl text-accent" />,
  },
  {
    code: "FSCD Certified",
    title: "Fire Safety License & Enlistment",
    issuer: "Bangladesh Fire Service & Civil Defence",
    description: "Authorized contractor for installing active NFPA fire hydrant, sprinkler, and detection networks.",
    icon: <FaShieldAlt className="text-2xl text-accent" />,
  },
  {
    code: "BNBC 2020",
    title: "National Building Code Compliance",
    issuer: "Ministry of Housing & Public Works",
    description: "All structural, electrical, and HVAC blueprints fully conform to BNBC safety and environmental codes.",
    icon: <FaBuilding className="text-2xl text-accent" />,
  },
  {
    code: "IEB Corporate Member",
    title: "Institution of Engineers Bangladesh",
    issuer: "The Institution of Engineers, Bangladesh",
    description: "Corporate membership assuring all project engineers hold licensed PE credentials.",
    icon: <FaCertificate className="text-2xl text-accent" />,
  },
];

const engineeringCodesData: EngineeringCodeItem[] = [
  {
    code: "NFPA",
    name: "National Fire Protection Association",
    scope: "NFPA 13, 14, 20, and 2001 fire suppression, hydrant, and sprinkler installation compliance.",
    category: "Fire Safety",
  },
  {
    code: "ASHRAE",
    name: "American Society of Heating, Refrigerating & A/C Engineers",
    scope: "VRF/VRV system loads, chiller staging, cleanroom air changes, and indoor air quality standards.",
    category: "HVAC Systems",
  },
  {
    code: "BNBC",
    name: "Bangladesh National Building Code",
    scope: "Local electrical distribution, structural safety, fire separation walls, and plumbing guidelines.",
    category: "National Codes",
  },
  {
    code: "SMACNA",
    name: "Sheet Metal & A/C Contractors' National Association",
    scope: "Low/medium pressure galvanized iron duct fabrication, sheet gauges, and support systems.",
    category: "Mechanical",
  },
  {
    code: "IEC / IEEE",
    name: "International Electrotechnical Commission / IEEE",
    scope: "Switchgear operations, busbar sizing, power factor correction, and earthing grid testing.",
    category: "Electrical",
  },
  {
    code: "IPC / UPC",
    name: "International Plumbing Code / Uniform Plumbing Code",
    scope: "PPR/UPVC sanitary drainage systems, rainwater harvesting storage sizing, and public safety water systems.",
    category: "Plumbing",
  },
];

export default function Accreditations() {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
        
        {/* Section 1: Certified Accreditations */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Safety & Compliance
              </span>
              <span className="w-8 h-0.5 bg-accent" />
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Certified <span className="text-gradient">Accreditations</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              We hold national and international licenses ensuring full regulatory compliance and audit-ready project execution.
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {accreditationsData.map((item: AccreditationItem, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:border-brand-800/40 shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-5 shrink-0">
                    {item.icon}
                  </div>

                  <span className="text-xs font-extrabold uppercase tracking-wider text-brand-800 bg-accent/20 px-2.5 py-1 rounded-md border border-accent/30 mb-2 inline-block">
                    {item.code}
                  </span>

                  <h3 className="font-heading font-extrabold text-base text-brand-950 mb-1 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[10px] font-bold text-slate-500 mb-3">
                    Issuer: {item.issuer}
                  </p>

                  <p className="text-slate-600 text-xs leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <FaCheckCircle className="text-xs" />
                  <span>Verified License & Accreditation</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Engineering Codes & Standards */}
        <div>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Compliance Standards
              </span>
              <span className="w-8 h-0.5 bg-accent" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Engineering Codes & <span className="text-gradient">Design Guidelines</span>
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Our engineering divisions design and execute all projects in strict compliance with globally accepted safety and material standards.
            </p>
          </div>

          {/* 6 Standards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {engineeringCodesData.map((item: EngineeringCodeItem, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4 group hover:border-brand-900/30"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-extrabold text-brand-950 group-hover:text-accent transition-colors font-heading tracking-tight bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
                      {item.code}
                    </span>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-slate-500 bg-slate-100 border border-slate-200/50 px-2 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="font-heading font-extrabold text-xs sm:text-sm text-slate-800 leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {item.scope}
                  </p>
                </div>

                <div className="pt-3.5 border-t border-slate-100 flex items-center gap-2 text-[10px] text-brand-900 font-bold uppercase tracking-wider">
                  <FaBookOpen className="text-slate-400 text-xs shrink-0" />
                  <span>Compliant Reference Book Code</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

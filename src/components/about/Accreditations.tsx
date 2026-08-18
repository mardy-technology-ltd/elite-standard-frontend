"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaAward, FaBuilding, FaCertificate, FaCheckCircle } from "react-icons/fa";

export interface AccreditationItem {
  code: string;
  title: string;
  issuer: string;
  description: string;
  icon: React.ReactNode;
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
    description: "Corporate membership assuring all project engineers hold licensed PE credentials.",
    issuer: "The Institution of Engineers, Bangladesh",
    icon: <FaCertificate className="text-2xl text-accent" />,
  },
];

export default function Accreditations() {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

                <h3 className="font-heading font-extrabold text-base text-brand-950 mb-1">
                  {item.title}
                </h3>

                <p className="text-[11px] font-bold text-slate-500 mb-3">
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
    </section>
  );
}

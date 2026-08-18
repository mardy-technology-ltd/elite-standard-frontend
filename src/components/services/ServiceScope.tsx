"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/mockData";
import { FaClipboardList, FaCheck } from "react-icons/fa";

interface ServiceScopeProps {
  service: ServiceItem;
}

export default function ServiceScope({ service }: ServiceScopeProps) {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Technical Execution
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Detailed <span className="text-gradient">Scope of Work</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Every project follows rigorous engineering protocols from initial design calculation to final authority commissioning.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-brand-900 bg-brand-50 px-4 py-2.5 rounded-lg border border-brand-100">
            <FaClipboardList className="text-accent text-sm" />
            <span>Turnkey Project Deliverables</span>
          </div>
        </div>

        {/* Scope Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.scopeOfWork.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group bg-slate-50 p-6 rounded-2xl border border-slate-200/80 hover:bg-brand-950 hover:text-white hover:border-brand-800 shadow-sm transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Number Badge */}
                <div className="w-10 h-10 rounded-xl bg-brand-900 text-accent font-extrabold text-sm flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-brand-950 transition-colors">
                  0{idx + 1}
                </div>

                <h3 className="font-heading font-bold text-base text-brand-950 group-hover:text-white transition-colors mb-3 leading-snug">
                  {item}
                </h3>
              </div>

              <div className="pt-4 border-t border-slate-200/60 group-hover:border-slate-800 flex items-center gap-2 text-xs text-slate-500 group-hover:text-slate-400">
                <FaCheck className="text-accent text-xs shrink-0" />
                <span>Fully Monitored Deliverable</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

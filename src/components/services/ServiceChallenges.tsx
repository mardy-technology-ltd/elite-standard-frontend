"use client";

import React from "react";
import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/mockData";
import { FaExclamationTriangle, FaCheckCircle, FaLightbulb } from "react-icons/fa";

interface ServiceChallengesProps {
  service: ServiceItem;
}

export default function ServiceChallenges({ service }: ServiceChallengesProps) {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Industry Challenges & Solutions
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            The Challenges We Solve in <span className="text-gradient">{service.code} Engineering</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Industrial and commercial enterprises face severe operational risks without engineered solutions. Here is how Elite Standard transforms technical challenges into operational excellence.
          </p>
        </div>

        {/* 2-Column Side-by-Side Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Box: The Challenges (Problems) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm flex flex-col gap-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-red-50 pb-4">
              <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <FaExclamationTriangle className="text-lg" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">Industry Pain Points</h3>
                <p className="text-xs text-slate-500">Common risks faced by un-optimized facilities</p>
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              {service.problems.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-3.5 bg-red-50/50 p-4 rounded-xl border border-red-100/60">
                  <span className="w-6 h-6 rounded-full bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    !
                  </span>
                  <span className="text-slate-700 text-sm font-medium leading-relaxed">{prob}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Box: Our Solutions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-brand-950 text-white p-8 rounded-2xl border border-brand-900 shadow-xl flex flex-col gap-6 relative overflow-hidden"
          >
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <FaLightbulb className="text-lg" />
              </div>
              <div>
                <h3 className="font-heading font-extrabold text-xl text-white">Elite Standard Engineered Solutions</h3>
                <p className="text-xs text-slate-400">Our proven technical interventions</p>
              </div>
            </div>

            <ul className="flex flex-col gap-4">
              {service.solutions.map((sol, idx) => (
                <li key={idx} className="flex items-start gap-3.5 bg-brand-900/80 p-4 rounded-xl border border-brand-800">
                  <FaCheckCircle className="text-emerald-400 text-base shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-sm font-medium leading-relaxed">{sol}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

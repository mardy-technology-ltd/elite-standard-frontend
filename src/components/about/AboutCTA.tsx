"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";

export default function AboutCTA() {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-950 text-white relative overflow-hidden">
      {/* Subtle Glow background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-brand-900/80 backdrop-blur-xl p-8 sm:p-12 lg:p-16 rounded-3xl border border-brand-800 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="px-3 py-1 rounded-md bg-accent/20 border border-accent/40 text-accent font-extrabold text-xs tracking-wider uppercase w-fit">
              Partner With Engineering Leaders
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Engineer Your <span className="text-accent">Next Landmark Project?</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Consult with our senior engineering directors for turnkey MEP design, cleanroom HVAC, and industrial power distribution solutions.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-accent" />
                <span>Sales Hotline: +880 1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-accent" />
                <span>info@elitestandard.com</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 shrink-0">
            <Link
              href="/contact?type=quotation"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-cta hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
            >
              <span>Request Consultation</span>
              <FaPaperPlane className="text-xs" />
            </Link>

            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-3 bg-transparent hover:bg-white/10 text-white border-2 border-slate-600 hover:border-accent font-bold text-sm sm:text-base px-8 py-4 rounded-xl transition-all duration-300 whitespace-nowrap"
            >
              <FaBuilding className="text-accent text-sm" />
              <span>Explore Projects</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

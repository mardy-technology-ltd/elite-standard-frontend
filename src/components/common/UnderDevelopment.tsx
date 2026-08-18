"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaTools,
  FaArrowLeft,
  FaPhoneAlt,
  FaEnvelope,
  FaHome,
  FaCogs,
  FaPaperPlane,
} from "react-icons/fa";

interface UnderDevelopmentProps {
  title?: string;
  subtitle?: string;
  categoryName?: string;
}

export default function UnderDevelopment({
  title = "Section Under Active Development",
  subtitle = "We are currently populating this section with full engineering specifications, product catalogs, and project case studies.",
  categoryName = "Under Development",
}: UnderDevelopmentProps) {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl flex flex-col items-center gap-6 relative overflow-hidden"
        >
          {/* Top Decorative Engineering Badge */}
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-accent bg-brand-950 px-4 py-1.5 rounded-full border border-brand-900 shadow-sm">
            <FaTools className="text-accent text-xs animate-pulse" />
            <span>{categoryName} &bull; Feature Notice</span>
          </div>

          {/* Animated Gear Icon */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-brand-900 text-accent flex items-center justify-center shadow-lg border border-brand-800 shrink-0 my-2">
            <FaCogs className="text-4xl sm:text-5xl animate-spin-slow text-accent" />
          </div>

          {/* Title & Description */}
          <div className="flex flex-col gap-3 max-w-xl">
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Client Info Banner */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 w-full max-w-lg text-left flex items-start gap-3 text-xs text-slate-700">
            <span className="w-6 h-6 rounded-full bg-accent/20 text-brand-950 font-extrabold flex items-center justify-center shrink-0 mt-0.5">
              i
            </span>
            <div>
              <span className="font-bold text-brand-950 block">Notice for Reviewers & Clients:</span>
              <span className="text-slate-500">
                This module is being integrated with our backend CMS. All core MEP services, company details, and layout components are fully operational.
              </span>
            </div>
          </div>

          {/* Action Navigation Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white font-bold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all duration-200"
            >
              <FaHome className="text-xs text-accent" />
              <span>Return to Home Page</span>
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-extrabold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all duration-200"
            >
              <span>Explore Available Services</span>
              <FaArrowLeft className="text-xs rotate-180" />
            </Link>

            <Link
              href="/contact?type=quotation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-brand-950 font-bold text-xs px-5 py-3.5 rounded-xl transition-all duration-200 border border-slate-200"
            >
              <FaPaperPlane className="text-xs text-brand-900" />
              <span>Request Quotation</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

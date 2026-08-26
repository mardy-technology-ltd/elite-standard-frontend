"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaShieldAlt,
  FaCheckCircle,
  FaPaperPlane,
  FaBuilding,
  FaAward,
  FaUsers,
  FaDownload,
} from "react-icons/fa";

const stats = [
  {
    icon: FaBuilding,
    value: "500+",
    label: "Projects Completed",
    description: "Commercial & Industrial",
  },
  {
    icon: FaAward,
    value: "15+",
    label: "Years Experience",
    description: "Industry Leadership",
  },
  {
    icon: FaUsers,
    value: "120+",
    label: "Certified Engineers",
    description: "MEP & Automation Specialists",
  },
  {
    icon: FaShieldAlt,
    value: "100%",
    label: "Safety & Compliance",
    description: "NFPA & BNBC Standard",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-between bg-brand-950 text-white overflow-hidden">
      {/* Background Image with Dark Engineering Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1920&auto=format&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-900/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/15 via-transparent to-transparent pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 flex-grow flex items-center">
        <div className="max-w-3xl flex flex-col gap-6">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 bg-brand-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-accent/30 text-xs font-semibold text-accent w-fit shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <FaShieldAlt className="text-accent" />
            <span className="uppercase tracking-wider">Premier MEP & Engineering Firm</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] text-white"
          >
            Drive for Innovation and <span className="text-gradient-accent">Excellence</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl"
          >
            Elite Standard Limited delivers integrated Mechanical, Electrical, Plumbing (MEP), HVAC, Fire Safety, and Building Automation engineering solutions, driving infrastructure growth in Bangladesh.
          </motion.p>

          {/* Bullet Points */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 pt-1"
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-accent shrink-0 text-sm" />
              <span>NFPA & BNBC Compliant Safety Engineering</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-accent shrink-0 text-sm" />
              <span>Energy-Efficient HVAC & Cleanroom Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-accent shrink-0 text-sm" />
              <span>Smart Building & Factory Automation</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-accent shrink-0 text-sm" />
              <span>Turnkey Substation & LT/HT Power Distribution</span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href="/contact?type=quotation"
              className="group bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-bold text-sm px-7 py-4 rounded-lg shadow-cta hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3"
            >
              <span>Request Quotation</span>
              <FaPaperPlane className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/services"
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-sm px-7 py-4 rounded-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center gap-3"
            >
              <span>Explore Services</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="/elite-standard-profile.pdf"
              download="Elite_Standard_Limited_Profile.pdf"
              className="group bg-white/5 hover:bg-white/15 backdrop-blur-md text-slate-200 hover:text-white font-semibold text-sm px-7 py-4 rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center gap-3"
            >
              <span>Download Profile</span>
              <FaDownload className="text-xs group-hover:scale-110 transition-transform text-accent" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Floating Statistics Counter Bar */}
      <div className="relative z-10 bg-brand-900/90 backdrop-blur-lg border-t border-brand-800/80 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-800/80">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex items-center gap-4 ${idx !== 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0">
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-heading text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-slate-200 uppercase tracking-wide">
                      {stat.label}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {stat.description}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

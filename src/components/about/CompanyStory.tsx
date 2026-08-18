"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaBullseye, FaEye, FaHistory } from "react-icons/fa";

export default function CompanyStory() {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Company Story & Vision/Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Our Corporate Journey
              </span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Pioneering <span className="text-gradient">MEP & Industrial Engineering</span> Solutions Since 2012
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              Founded over a decade ago, Elite Standard Limited has evolved into a leading MEP contractor and industrial machinery integrator in Bangladesh. We combine rigorous mathematical modeling, international safety standards (NFPA, BNBC, SMACNA), and turnkey field execution.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-brand-900 font-extrabold text-sm">
                  <FaBullseye className="text-accent text-base" />
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To deliver zero-defect MEP systems, cleanroom HVAC, and industrial power grids that safeguard lives, optimize energy usage, and drive national infrastructure growth.
                </p>
              </div>

              <div className="bg-brand-950 text-white p-5 rounded-2xl border border-brand-900 flex flex-col gap-2 shadow-md">
                <div className="flex items-center gap-2 text-accent font-extrabold text-sm">
                  <FaEye className="text-accent text-base" />
                  <span>Our Vision 2030</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  To be South Asia&apos;s most trusted MEP engineering conglomerate, pioneering green building solar integration and smart factory BMS automation.
                </p>
              </div>
            </div>

            {/* Key Statistics */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-900 block">14+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Years of Mastery</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-accent block">250+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Turnkey Projects</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-900 block">85+</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certified Engineers</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Res Image & Overlay Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1000&auto=format&fit=crop"
                alt="Elite Standard Engineers at Project Site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl border border-slate-200 max-w-xs hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-brand-900 text-accent flex items-center justify-center shrink-0">
                <FaHistory className="text-xl" />
              </div>
              <div>
                <span className="font-extrabold text-sm text-brand-950 block">Established 2012</span>
                <span className="text-xs text-slate-500">Banani, Dhaka, Bangladesh</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

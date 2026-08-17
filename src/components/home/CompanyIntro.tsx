"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCheckCircle, FaAward, FaBuilding, FaArrowRight } from "react-icons/fa";

export default function CompanyIntro() {
  return (
    <section className="py-20 bg-white text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Side: Graphic / Image Showcase with Floating Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
              {/* High-res Engineering Showcase Image */}
              <div className="relative h-[420px] sm:h-[480px] w-full">
                <Image
                  src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop"
                  alt="Elite Standard Limited Engineering Facility"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
              </div>
            </div>

            {/* Floating Experience Badge (Bottom Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-2 sm:right-6 bg-brand-900 text-white p-6 rounded-2xl shadow-xl border border-brand-800 max-w-[240px] hidden sm:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center text-brand-950 font-bold shrink-0">
                  <FaAward className="text-2xl" />
                </div>
                <div>
                  <span className="block font-heading text-2xl font-extrabold text-white">
                    15+ Years
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    Of Engineering Leadership in Bangladesh
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Secondary Badge (Top Left Overlay) */}
            <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-2.5">
              <FaBuilding className="text-brand-800 text-lg" />
              <span className="text-xs font-bold text-brand-950 uppercase tracking-wider">
                ISO 9001:2015 Certified
              </span>
            </div>
          </motion.div>

          {/* Right Side: Corporate Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            {/* Section Tag */}
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Company Introduction
              </span>
            </div>

            {/* Section Title */}
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Pioneering High-Performance <span className="text-gradient">MEP & Engineering</span> Solutions
            </h2>

            <p className="text-slate-600 text-base leading-relaxed">
              <strong>Elite Standard Limited</strong> is a full-service Mechanical, Electrical, Plumbing (MEP), HVAC, Fire Safety, and Automation engineering enterprise. We specialize in designing, fabricating, and installing mission-critical systems for commercial towers, pharmaceutical cleanrooms, power plants, and industrial manufacturing facilities across Bangladesh.
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              Engineered with rigorous adherence to NFPA, BNBC, and international safety codes, our multidisciplinary team of over 120 certified engineers ensures seamless execution, energy efficiency, and long-term asset reliability.
            </p>

            {/* Core Values List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-accent text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Turnkey Execution</h4>
                  <p className="text-xs text-slate-500">From concept & design to final commissioning.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-accent text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">NFPA Safety Code</h4>
                  <p className="text-xs text-slate-500">Strict adherence to fire protection safety standards.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-accent text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Energy Optimization</h4>
                  <p className="text-xs text-slate-500">High-COP chillers & VFD booster networks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-accent text-lg mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">24/7 Operations</h4>
                  <p className="text-xs text-slate-500">Dedicated emergency maintenance & monitoring.</p>
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 bg-brand-900 hover:bg-brand-800 text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <span>Learn More About Us</span>
                <FaArrowRight className="text-xs text-accent" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

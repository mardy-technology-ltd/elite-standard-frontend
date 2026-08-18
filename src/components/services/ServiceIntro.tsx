"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/mockData";
import { FaCheckCircle, FaAward, FaBuilding, FaCogs } from "react-icons/fa";

interface ServiceIntroProps {
  service: ServiceItem;
}

export default function ServiceIntro({ service }: ServiceIntroProps) {
  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Typography & Engineering Values */}
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
                Service Overview
              </span>
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Comprehensive Engineering Solutions for <span className="text-gradient">{service.code} Systems</span>
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
              {service.fullDescription}
            </p>

            {/* Key Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <FaCheckCircle className="text-accent text-lg shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">Turnkey Execution</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Design, procurement, testing & commissioning under one roof.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                <FaAward className="text-accent text-lg shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm text-brand-950">International Codes</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Compliant with NFPA, ASHRAE, BNBC & SMACNA standards.</p>
                </div>
              </div>
            </div>

            {/* Stat Row */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-center sm:text-left">
              <div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-900 block">150+</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Projects Completed</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-accent block">99.8%</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">System Uptime</span>
              </div>
              <div>
                <span className="font-heading font-extrabold text-2xl sm:text-3xl text-brand-900 block">24/7</span>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Emergency Support</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: High-Res Image with Overlay Badge */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative h-[340px] sm:h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <Image
                src={service.bannerImage}
                alt={service.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
            </div>

            {/* Floating Card Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-brand-900 text-white p-5 rounded-2xl shadow-xl border border-brand-800 max-w-xs hidden sm:flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent text-brand-950 flex items-center justify-center shrink-0">
                <FaCogs className="text-xl" />
              </div>
              <div>
                <span className="font-bold text-sm block text-white">Precision Engineering</span>
                <span className="text-xs text-slate-300">Customized according to factory load & floor architecture</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

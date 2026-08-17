"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCog,
  FaClock,
  FaShieldAlt,
  FaHeadset,
  FaLeaf,
  FaMedal,
} from "react-icons/fa";

const pillars = [
  {
    icon: FaUserCog,
    title: "Expert Engineering Team",
    description: "Over 120+ certified PE & PMP engineers with decades of combined experience in MEP, HVAC, and industrial power engineering.",
    badge: "Certified Experts",
  },
  {
    icon: FaClock,
    title: "Timely Project Delivery",
    description: "Structured project management methodologies ensuring all engineering milestones and handovers are completed strictly on schedule.",
    badge: "100% On-Time",
  },
  {
    icon: FaShieldAlt,
    title: "NFPA & BNBC Compliance",
    description: "Every blueprint and active fire suppression system meets strict national Fire Service standards and international safety codes.",
    badge: "Safety Guaranteed",
  },
  {
    icon: FaLeaf,
    title: "Energy & Cost Efficiency",
    description: "Cutting-edge VRF HVAC design, automatic PFI plants, and solar integrations designed to cut operational power expenditure by up to 30%.",
    badge: "Eco-Friendly",
  },
  {
    icon: FaHeadset,
    title: "24/7 Technical Support",
    description: "Round-the-clock emergency maintenance response teams ensuring minimum facility downtime and maximum system reliability.",
    badge: "24/7 Helpline",
  },
  {
    icon: FaMedal,
    title: "ISO 9001 Quality Assurance",
    description: "Rigorous factory acceptance testing (FAT), site acceptance testing (SAT), and strict material procurement quality control.",
    badge: "Certified Quality",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Why Elite Standard Limited
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight">
            Why Industry Leaders <span className="text-gradient">Trust Us</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We blend technical precision, global safety standards, and robust project execution to power Bangladesh&apos;s leading commercial and industrial developments.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent Top Border Bar on Hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-800 to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                <div>
                  {/* Icon & Badge Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-xl bg-brand-50 group-hover:bg-brand-900 flex items-center justify-center text-brand-800 group-hover:text-accent transition-colors duration-300 shadow-inner">
                      <Icon className="text-2xl" />
                    </div>
                    <span className="text-[11px] font-bold text-brand-800 bg-brand-50 group-hover:bg-accent/20 group-hover:text-brand-900 px-3 py-1 rounded-full uppercase tracking-wider transition-colors">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-brand-950 mb-3 group-hover:text-brand-800 transition-colors">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

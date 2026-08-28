"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaBuilding, FaHandshake, FaShieldAlt } from "react-icons/fa";

const testimonials = [
  {
    quote:
      "Elite Standard Limited executed our 1200 TR cleanroom HVAC and BMS system with flawless precision. Their engineering team passed all ISO 7 particle audits on the first attempt.",
    clientName: "Engr. Monirul Islam",
    designation: "VP of Engineering & Projects",
    company: "Square Pharmaceuticals Ltd.",
    stars: 5,
  },
  {
    quote:
      "Their NFPA fire sprinkler and pump installation for our 400,000 sq.ft factory complex was top-tier. They handled the entire Fire Service authorization clearance seamlessly.",
    clientName: "Tariqul Rahman",
    designation: "Director of Operations",
    company: "Apex Spinning & Textiles",
    stars: 5,
  },
  {
    quote:
      "The 3200A LT panels and PFI plant designed by Elite Standard improved our power factor from 0.78 to 0.99, saving us millions in annual utility penalties.",
    clientName: "Syed Al-Mansur",
    designation: "Head of Infrastructure",
    company: "Dhaka Financial Tower",
    stars: 5,
  },
  {
    quote:
      "Excellent company for electrical, Water Treatment and heavy machinery work. Professional team, reliable service, and great attention to detail. Highly recommended!",
    clientName: "Md Rubel Talukder",
    designation: "Executive Director",
    company: "Standard Machinery Ltd.",
    stars: 5,
  },
  {
    quote:
      "Your work is truly on another level. Thank you for taking such great care of my work.",
    clientName: "Ratul khan",
    designation: "Project Coordinator",
    company: "RK Infrastructure",
    stars: 5,
  },
  {
    quote:
      "The work was completed on time as promised. The quality and professionalism are truly commendable.",
    clientName: "Bijoy Barkatulla",
    designation: "Managing Partner",
    company: "BB MEP Associates",
    stars: 5,
  },
];

const brandPartners = [
  { name: "Daikin", category: "HVAC Chillers & VRF" },
  { name: "Grundfos", category: "Pumps & Hydro-booster" },
  { name: "Siemens", category: "PLC & Switchgear" },
  { name: "ABB", category: "Circuit Breakers & Automation" },
  { name: "Cummins", category: "Power Generators" },
  { name: "Schneider", category: "Energy & Control Panels" },
];

export default function TestimonialsAndPartners() {
  return (
    <section className="py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Part A: Client Testimonials */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-3 mb-16">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Client Endorsements
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Trusted by top pharmaceutical conglomerates, commercial developers, and textile manufacturers.
          </p>
        </div>

        {/* 6 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-slate-50 p-8 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-between relative overflow-hidden"
            >
              <FaQuoteLeft className="text-4xl text-brand-800/15 mb-4" />

              <p className="text-slate-700 text-sm leading-relaxed italic mb-6">
                &quot;{test.quote}&quot;
              </p>

              <div>
                {/* 5-Star Rating */}
                <div className="flex items-center gap-1 text-amber-400 text-xs mb-3">
                  {[...Array(test.stars)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>

                <h4 className="font-heading font-bold text-base text-brand-950">
                  {test.clientName}
                </h4>
                <p className="text-xs text-brand-800 font-semibold">{test.designation}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                  <FaBuilding className="text-[10px]" />
                  <span>{test.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Part B: Brand Partners */}
        <div className="pt-12 border-t border-slate-200">
          <div className="text-center mb-8">
            <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <FaHandshake className="text-accent text-sm" />
              <span>Official Brand & OEM Equipment Partners</span>
            </span>
          </div>

          {/* Grayscale Brand Logos Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            {brandPartners.map((partner, idx) => (
              <div
                key={idx}
                className="group bg-slate-50 hover:bg-brand-950 border border-slate-200/80 hover:border-brand-800 p-5 rounded-xl text-center transition-all duration-300 shadow-sm"
              >
                <span className="font-heading font-black text-lg text-slate-500 group-hover:text-accent tracking-wider uppercase transition-colors block">
                  {partner.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-300 font-medium block mt-0.5">
                  {partner.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

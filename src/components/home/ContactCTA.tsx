"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaPaperPlane, FaWhatsapp, FaHeadset, FaShieldAlt } from "react-icons/fa";

export default function ContactCTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 text-white relative overflow-hidden border-t border-brand-800">
      {/* Background Accent Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-800/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-brand-900/80 backdrop-blur-xl border border-brand-800 p-8 sm:p-12 lg:p-16 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          {/* Left Text Column */}
          <div className="max-w-2xl flex flex-col gap-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-accent w-fit mx-auto lg:mx-0">
              <FaHeadset className="text-accent text-sm" />
              <span>Free Engineering Consultation & Estimate</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Start Your Next <span className="text-gradient-accent">MEP Project?</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Connect with our principal engineering architects today for custom heat load calculations, NFPA fire safety design, or turnkey LT panel quotes.
            </p>
          </div>

          {/* Right Action Column */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0 justify-center">
            <Link
              href="/contact?type=quotation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-extrabold text-sm px-8 py-4 rounded-xl shadow-cta hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FaPaperPlane className="text-xs" />
              <span>Request Quotation</span>
            </Link>

            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <FaWhatsapp className="text-lg" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

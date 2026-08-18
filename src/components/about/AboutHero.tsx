"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaChevronRight, FaShieldAlt } from "react-icons/fa";

export default function AboutHero() {
  return (
    <section className="relative min-h-[400px] sm:min-h-[480px] flex items-center bg-brand-950 text-white overflow-hidden">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop"
          alt="Elite Standard Engineering Infrastructure"
          fill
          className="object-cover object-center opacity-25 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[10px] text-slate-500" />
          <span className="text-accent font-bold">About Us</span>
        </nav>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-brand-900/80 px-3.5 py-1.5 rounded-md border border-brand-800 w-fit">
            <FaShieldAlt className="text-accent text-xs" />
            <span>ISO 9001:2015 & Fire Safety Certified Enterprise</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Excellence, <span className="text-gradient">Building Tomorrow</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed max-w-2xl">
            Elite Standard Limited is Bangladesh&apos;s premier engineering conglomerate specializing in turnkey MEP design, industrial automation, cleanroom HVAC, and power distribution infrastructure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

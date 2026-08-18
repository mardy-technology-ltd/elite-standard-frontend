"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ServiceItem } from "@/lib/mockData";
import { FaChevronRight, FaShieldAlt } from "react-icons/fa";

interface ServiceBannerProps {
  service: ServiceItem;
}

export default function ServiceBanner({ service }: ServiceBannerProps) {
  return (
    <section className="relative min-h-[380px] sm:min-h-[460px] flex items-center bg-brand-950 text-white overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={service.bannerImage}
          alt={service.title}
          fill
          className="object-cover object-center opacity-25 scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/90 to-brand-950/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-300 mb-6 flex-wrap">
          <Link href="/" className="hover:text-accent transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[10px] text-slate-500" />
          <Link href="/services" className="hover:text-accent transition-colors">
            Services
          </Link>
          <FaChevronRight className="text-[10px] text-slate-500" />
          <span className="text-accent font-bold">{service.code} Engineering</span>
        </nav>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl flex flex-col gap-4"
        >
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-md bg-accent text-brand-950 font-extrabold text-xs tracking-wider uppercase">
              Code: {service.code}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold bg-brand-900/80 px-3 py-1 rounded-md border border-brand-800">
              <FaShieldAlt className="text-accent text-xs" />
              <span>BNBC & ISO Certified</span>
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {service.title}
          </h1>

          <p className="text-slate-300 text-base sm:text-lg font-medium leading-relaxed">
            {service.subtitle}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

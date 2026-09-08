"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { servicesData, ServiceItem } from "@/lib/mockData";
import {
  FaSnowflake,
  FaFireExtinguisher,
  FaBolt,
  FaMicrochip,
  FaLightbulb,
  FaIndustry,
  FaShower,
  FaWater,
  FaSun,
  FaArrowRight,
  FaShieldAlt,
  FaSearch,
} from "react-icons/fa";

const iconMap: Record<string, React.ReactNode> = {
  FaSnowflake: <FaSnowflake />,
  FaFireExtinguisher: <FaFireExtinguisher />,
  FaBolt: <FaBolt />,
  FaMicrochip: <FaMicrochip />,
  FaLightbulb: <FaLightbulb />,
  FaIndustry: <FaIndustry />,
  FaShower: <FaShower />,
  FaWater: <FaWater />,
  FaSun: <FaSun />,
};

function ServicesOverviewContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<"all" | "mechanical" | "electrical" | "plumbing">("all");

  useEffect(() => {
    if (
      categoryParam === "mechanical" ||
      categoryParam === "electrical" ||
      categoryParam === "plumbing"
    ) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  const filteredServices = servicesData.filter((s: ServiceItem) => {
    const matchesCategory = activeCategory === "all" || s.category === activeCategory;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Banner */}
      <section className="bg-brand-950 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop"
            alt="Engineering Services"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold bg-brand-900/80 px-3 py-1 rounded-md border border-brand-800">
            <FaShieldAlt className="text-accent text-xs" />
            <span>Signature "3-6-9 Law" Framework Services</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Our 9 Flagship <span className="text-gradient">MEP Services</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Mechanical, Electrical & Plumbing solutions compliant with BNBC, ASHRAE, NFPA, IEC, IEEE, and IPC standards across Residential, Commercial & Industrial sectors.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-md mt-4 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword or code (HVAC, FDPS, PDCP)..."
              className="w-full bg-brand-900/90 border border-slate-700/80 rounded-xl px-4 py-3 pl-11 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-accent transition-colors"
            />
            <FaSearch className="absolute left-4 top-3.5 text-slate-400 text-sm" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap p-1.5 bg-white rounded-2xl border border-slate-200 shadow-sm gap-2">
            {[
              { id: "all", label: "All Services (9)" },
              { id: "mechanical", label: "⚙️ Mechanical (3)" },
              { id: "electrical", label: "⚡ Electrical (3)" },
              { id: "plumbing", label: "🚰 Plumbing (3)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all duration-200 ${
                  activeCategory === tab.id
                    ? "bg-brand-900 text-white shadow-md"
                    : "text-slate-600 hover:text-brand-950 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service: ServiceItem, idx: number) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200/80 hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image Header */}
              <div className="relative h-48 w-full overflow-hidden shrink-0">
                <Image
                  src={service.bannerImage}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-brand-900/90 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono font-bold text-accent border border-accent/30">
                    {service.code}
                  </span>
                  <span className="bg-slate-900/80 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-2 text-accent text-lg mb-2">
                    {iconMap[service.icon] || <FaIndustry />}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-brand-950 group-hover:text-brand-800 transition-colors mb-2">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4">
                    {service.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {service.compliance?.map((c) => (
                      <span key={c} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold border border-slate-200">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-800 group-hover:text-accent transition-colors">
                  <span>Explore Service & 3 Sectors</span>
                  <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <Link href={`/services/${service.slug}`} className="absolute inset-0 z-10" aria-label={service.title} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function ServicesOverviewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 py-20 text-center text-slate-500 font-medium">Loading Services...</div>}>
      <ServicesOverviewContent />
    </Suspense>
  );
}

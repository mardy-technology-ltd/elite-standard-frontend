"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaWater,
  FaFilter,
  FaCheckCircle,
  FaArrowRight,
  FaBoxes,
  FaShieldAlt,
  FaSnowflake,
  FaFireExtinguisher,
  FaMicrochip,
  FaBolt,
  FaLayerGroup,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { catalogDataList } from "@/lib/mockData";

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Water Treatment",
    "HVAC & Climate",
    "Power & Switchgear",
    "Fire Protection",
  ];

  const featuredProducts = [
    {
      id: "irp",
      slug: "iron-removal-plant",
      title: "Iron Removal Plant (IRP)",
      category: "Water Treatment",
      badge: "High Capacity Water Purification",
      description:
        "High-efficiency automatic Iron Removal Plants engineered for residential, commercial towers, and industrial manufacturing blocks to eliminate dissolved iron, manganese, and turbidity.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Capacity range: 500 LPH to 50,000+ LPH",
        "Multi-grade sand & manganese dioxide media bed",
        "Automatic backwash & rinse control valves",
        "Corrosion-resistant FRP / Stainless Steel vessel options",
      ],
      packagesCount: "9 Customized Package Levels",
      href: "/products/iron-removal-plant",
      icon: FaWater,
      accentColor: "text-cyan-500",
      borderColor: "hover:border-cyan-500/50",
    },
    {
      id: "ro",
      slug: "ro-system",
      title: "Reverse Osmosis (RO) System",
      category: "Water Treatment",
      badge: "Pure Water Membrane Technology",
      description:
        "High-pressure Reverse Osmosis desalination and purification plants delivering pure, de-mineralized water for pharmaceuticals, textile dyeing, and commercial drinking systems.",
      image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Capacity range: 75 LPD to 100,000+ LPD",
        "High-rejection TFC spiral wound RO membranes",
        "SS316 high-pressure booster pump assembly",
        "Real-time online TDS & Conductivity telemetry",
      ],
      packagesCount: "9 Specialized Package Levels",
      href: "/products/ro-system",
      icon: FaMicrochip,
      accentColor: "text-blue-500",
      borderColor: "hover:border-blue-500/50",
    },
    {
      id: "vrf",
      slug: "vrf-climate",
      title: "VRF/VRV Tropical Multi-Split Systems",
      category: "HVAC & Climate",
      badge: "Industrial & Commercial Climate",
      description:
        "High-COP Inverter Variable Refrigerant Flow (VRF) outdoor units engineered for high ambient temperatures up to 52°C with Modbus BMS gateways.",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Modular outdoor banks up to 64 HP per system",
        "R-410A / R-32 eco-refrigerant compliance",
        "Individual zone touch-screen thermostats",
        "Centralized Modbus/BACnet BMS gateway interface",
      ],
      packagesCount: "Custom Engineered Capacity",
      href: "/services/hvac/vrf",
      icon: FaSnowflake,
      accentColor: "text-sky-500",
      borderColor: "hover:border-sky-500/50",
    },
    {
      id: "pump",
      slug: "fire-pump-skid",
      title: "UL/FM Certified Fire Pump Skids",
      category: "Fire Protection",
      badge: "Life Safety & Protection",
      description:
        "NFPA 20 compliant packaged fire pump stations featuring main electric motor pumps, standby diesel engine pumps, and pressure-sustaining jockey pumps.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Flow capacities: 500 GPM to 2500 GPM",
        "UL-Listed & FM-Approved pump & controller skids",
        "Automatic engine cranking & dual battery chargers",
        "FSCD & BNBC safety compliance clearance support",
      ],
      packagesCount: "Packaged Skids",
      href: "/services/fdps/hydrant",
      icon: FaFireExtinguisher,
      accentColor: "text-red-500",
      borderColor: "hover:border-red-500/50",
    },
    {
      id: "lt",
      slug: "lt-switchgear",
      title: "Form-4 Type Tested LT Switchgear Panels",
      category: "Power & Switchgear",
      badge: "Power Distribution",
      description:
        "Low Voltage main switchboards fabricated from 2.0mm electro-galvanized sheet steel with Form-4 compartmentation and high-purity ETP copper busbars.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      highlights: [
        "Current ratings up to 4000A with ABB/Schneider ACBs",
        "99.9% pure copper busbars with heat shrink sleeves",
        "Automatic PFI capacitor banks for 0.99 PF",
        "IP54 / IP65 dust-proof & splash-proof enclosures",
      ],
      packagesCount: "Custom Assembly",
      href: "/services/pdcp/lt",
      icon: FaBolt,
      accentColor: "text-amber-500",
      borderColor: "hover:border-amber-500/50",
    },
  ];

  const filteredProducts = featuredProducts.filter((product) => {
    if (selectedCategory === "All") return true;
    return product.category === selectedCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Hero Banner */}
      <section className="relative bg-brand-950 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/80 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest">
            <FaBoxes />
            <span>Official Equipment & Products Catalog</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Industrial Equipment & <span className="text-gradient-accent">Products Catalog</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Explore certified water purification plants, reverse osmosis systems, VRF climate units, UL/FM fire pumps, and Form-4 switchgear panels sourced directly from OEM Tier-1 manufacturers.
          </p>
        </div>
      </section>

      {/* 2. Main Reseller Products Showcase (IRP & RO Featured Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-16">
        <div className="bg-brand-900 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-brand-800">
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2">
                Official Reseller & Water Treatment Division
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Featured Water Purification Systems
              </h2>
            </div>
            <div className="flex items-center gap-2 bg-brand-950/80 px-4 py-2 rounded-xl border border-brand-700 text-xs font-bold text-slate-300">
              <FaShieldAlt className="text-accent" />
              <span>Full OEM Warranty & Special Reseller Pricing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Iron Removal Plant Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between hover:border-cyan-500/60 transition-all duration-300 group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs border border-cyan-500/30">
                    IRP Division
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    500 LPH - 50,000+ LPH
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors mb-3">
                  Iron Removal Plant (IRP)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Complete water treatment plants for residential, commercial buildings, and industrial plants to remove dissolved iron, manganese, and odor.
                </p>

                <div className="space-y-2 mb-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Solution Offerings:
                  </span>
                  <div className="flex flex-col gap-2.5 text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-cyan-400 text-xs shrink-0" />
                      <span>Residential Package (500-2000 LPH)</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-cyan-400 text-xs shrink-0" />
                      <span>Commercial Package (3000-10,000 LPH)</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-cyan-400 text-xs shrink-0" />
                      <span>Industrial Mega Plant (20,000-50,000+ LPH)</span>
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/products/iron-removal-plant"
                className="w-full inline-flex items-center justify-between bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg"
              >
                <span>View IRP Packages & Pricing Table</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* RO System Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-8 flex flex-col justify-between hover:border-blue-500/60 transition-all duration-300 group shadow-xl">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-md bg-blue-500/20 text-blue-400 font-mono font-bold text-xs border border-blue-500/30">
                    RO Division
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-3 py-1 rounded-full">
                    75 LPD - 100,000+ LPD
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold text-white group-hover:text-blue-400 transition-colors mb-3">
                  Reverse Osmosis (RO) Plant
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  High-rejection membrane desalination and pure water systems for homes, corporate offices, and heavy industrial production.
                </p>

                <div className="space-y-2 mb-8">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Solution Offerings:
                  </span>
                  <div className="flex flex-col gap-2.5 text-xs text-slate-300">
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                      <span>Residential RO Package (75-2000 LPD)</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                      <span>Commercial RO Package (3000-10,000 LPD)</span>
                    </span>
                    <span className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-400 text-xs shrink-0" />
                      <span>Industrial RO Mega Plant (20,000-100,000+ LPD)</span>
                    </span>
                  </div>
                </div>
              </div>

              <Link
                href="/products/ro-system"
                className="w-full inline-flex items-center justify-between bg-blue-600 hover:bg-blue-500 text-slate-950 font-bold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg"
              >
                <span>View RO Packages & Pricing Table</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div>
            <h3 className="font-heading text-2xl font-bold text-brand-950">
              Complete Products & Equipment Line
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Select a category to filter equipment across MEP divisions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                  selectedCategory === cat
                    ? "bg-brand-900 text-white shadow-md"
                    : "text-slate-600 hover:text-brand-900 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Equipment Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl ${product.borderColor} transition-all duration-300 flex flex-col justify-between overflow-hidden h-full`}
              >
                <div>
                  {/* Image Header */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-200 text-[10px] font-extrabold text-brand-900 uppercase">
                      {product.category}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[10px] font-bold text-accent bg-slate-900/90 px-2.5 py-0.5 rounded border border-slate-700">
                        {product.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`text-base ${product.accentColor}`} />
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {product.packagesCount}
                      </span>
                    </div>

                    <h4 className="font-heading text-xl font-bold text-brand-950 mb-3 group-hover:text-brand-800 transition-colors">
                      {product.title}
                    </h4>

                    <p className="text-slate-600 text-xs leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Specifications & Highlights:
                      </span>
                      {product.highlights.map((item, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-7 pt-0">
                  <Link
                    href={product.href}
                    className="w-full inline-flex items-center justify-between bg-slate-100 hover:bg-brand-900 hover:text-white text-brand-950 font-bold text-xs px-5 py-3 rounded-xl transition-all duration-200 group/btn"
                  >
                    <span>Explore Product Specifications</span>
                    <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. Direct Order & Partnership CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <FaFileInvoiceDollar className="text-2xl" />
            </div>
            <div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Reseller & Bulk OEM Equipment Procurement
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Elite Standard Limited works directly with Tier-1 manufacturers to supply genuine VRF systems, chillers, fire pump skids, and water purification units at special reseller pricing.
              </p>
            </div>
          </div>

          <Link
            href="/contact?type=quotation"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-bold text-sm px-8 py-4 rounded-xl shadow-cta hover:shadow-2xl transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Request Quotation / Pricing</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </main>
  );
}

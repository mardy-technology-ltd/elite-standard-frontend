"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSitemap,
  FaCogs,
  FaArrowDown,
  FaUsers,
  FaShieldAlt,
  FaServer,
  FaChartLine,
  FaUserShield,
} from "react-icons/fa";

type TabKey = "organizational" | "operational";

export default function CorporateStructure() {
  const [activeTab, setActiveTab] = useState<TabKey>("organizational");

  return (
    <section className="py-20 sm:py-24 bg-white text-slate-800 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Corporate Hierarchy
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            Our Corporate & <span className="text-gradient">Operational Structure</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Elite Standard Limited is structured to ensure operational precision, safety compliance, and maximum client satisfaction.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 shadow-inner">
            <button
              onClick={() => setActiveTab("organizational")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "organizational"
                  ? "bg-brand-900 text-white shadow-md"
                  : "text-slate-500 hover:text-brand-950"
              }`}
            >
              <FaSitemap className="text-sm" />
              <span>Organizational Structure</span>
            </button>
            <button
              onClick={() => setActiveTab("operational")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === "operational"
                  ? "bg-brand-900 text-white shadow-md"
                  : "text-slate-500 hover:text-brand-950"
              }`}
            >
              <FaCogs className="text-sm" />
              <span>Operational Structure</span>
            </button>
          </div>
        </div>

        {/* Diagrams Display */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === "organizational" ? (
              <motion.div
                key="organizational"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* 1. Chairman Level */}
                <div className="bg-brand-950 text-white p-6 rounded-2xl shadow-lg border border-brand-800 text-center max-w-[280px] w-full z-10 hover:scale-105 transition-transform">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-brand-900 px-3 py-1 rounded-full border border-accent/20">
                    Chairman
                  </span>
                  <h3 className="font-heading font-bold text-lg mt-3 text-white">
                    Engr. Mamun Prodhan
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Strategic Corporate Vision</p>
                </div>

                {/* Connector Arrow */}
                <div className="h-8 w-0.5 bg-brand-900/30 flex items-center justify-center my-1 relative">
                  <FaArrowDown className="text-brand-950/60 text-xs absolute -bottom-1" />
                </div>

                {/* 2. MD Level */}
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 text-center max-w-[280px] w-full z-10 hover:scale-105 transition-transform">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-900 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                    Managing Director
                  </span>
                  <h3 className="font-heading font-bold text-lg mt-3 text-brand-950">
                    Engr. Shipan Bala
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">Turnkey Operations Control</p>
                </div>

                {/* Horizontal branch line wrapper on desktop */}
                <div className="hidden lg:flex flex-col items-center w-full mt-6">
                  {/* Branch Line */}
                  <div className="w-[70%] h-0.5 bg-brand-900/30 relative">
                    {/* Left Drop Line */}
                    <div className="absolute left-0 top-0 w-0.5 h-8 bg-brand-900/30" />
                    {/* Center Drop Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-8 bg-brand-900/30" />
                    {/* Right Drop Line */}
                    <div className="absolute right-0 top-0 w-0.5 h-8 bg-brand-900/30" />
                  </div>
                </div>

                {/* Mobile Connectors */}
                <div className="lg:hidden h-10 w-0.5 bg-brand-900/30 relative my-2">
                  <FaArrowDown className="text-brand-950/60 text-xs absolute -bottom-1" />
                </div>

                {/* 3. Department Level Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-6 w-full lg:mt-8">
                  {/* Mechanical Dept */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-inner mb-4">
                      <FaCogs className="text-lg" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md mb-2">
                      Mechanical Department
                    </span>
                    <h4 className="font-bold text-sm text-brand-950">Director (Mechanical)</h4>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <h5 className="font-semibold text-xs text-slate-700">Supervisor</h5>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-lg">
                      <FaUsers className="text-slate-400 text-xs" />
                      <span>Mechanical Team</span>
                    </div>
                  </div>

                  {/* Electrical Dept */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-800 flex items-center justify-center border border-brand-100 shadow-inner mb-4">
                      <FaServer className="text-lg" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-brand-900 bg-brand-50 px-2.5 py-1 rounded-md mb-2">
                      Electrical Department
                    </span>
                    <h4 className="font-bold text-sm text-brand-950">Director (Electrical)</h4>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <h5 className="font-semibold text-xs text-slate-700">Supervisor</h5>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-lg">
                      <FaUsers className="text-slate-400 text-xs" />
                      <span>Electrical Team</span>
                    </div>
                  </div>

                  {/* Plumbing Dept */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 shadow-inner mb-4">
                      <FaUserShield className="text-lg" />
                    </div>
                    <span className="text-[9px] font-extrabold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-md mb-2">
                      Plumbing Department
                    </span>
                    <h4 className="font-bold text-sm text-brand-950">Director (Plumbing)</h4>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <h5 className="font-semibold text-xs text-slate-700">Supervisor</h5>
                    <FaArrowDown className="text-slate-400 text-[10px] my-3" />
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white border border-slate-200 px-4 py-2 rounded-lg">
                      <FaUsers className="text-slate-400 text-xs" />
                      <span>Plumbing Team</span>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-50 text-brand-950 p-4 rounded-xl border border-brand-100/50 mt-10 text-center text-xs font-semibold max-w-2xl leading-relaxed">
                  Elite Standard Limited’s hierarchy is structured to ensure 100% client satisfaction without any issues. It clearly defines roles, responsibilities, and reporting lines.
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="operational"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center"
              >
                {/* Board of Elite Standard Ltd. */}
                <div className="bg-brand-900 text-white p-5 rounded-2xl shadow-lg border border-brand-800 text-center max-w-[280px] w-full z-10 hover:scale-105 transition-transform">
                  <h3 className="font-heading font-extrabold text-sm tracking-widest text-white uppercase">
                    Board of Elite Standard Ltd.
                  </h3>
                </div>

                {/* Connector Arrow */}
                <div className="h-6 w-0.5 bg-brand-900/30 flex items-center justify-center my-1 relative">
                  <FaArrowDown className="text-brand-950/60 text-xs absolute -bottom-1" />
                </div>

                {/* Managing Director */}
                <div className="bg-white p-5 rounded-2xl shadow-lg border border-slate-200 text-center max-w-[280px] w-full z-10 hover:scale-105 transition-transform">
                  <h3 className="font-heading font-bold text-base text-brand-950 uppercase tracking-wider">
                    Managing Director
                  </h3>
                </div>

                {/* Horizontal branch line wrapper on desktop */}
                <div className="hidden lg:flex flex-col items-center w-full mt-6">
                  {/* Branch Line */}
                  <div className="w-[80%] h-0.5 bg-brand-900/30 relative">
                    {/* Left Drop Line */}
                    <div className="absolute left-0 top-0 w-0.5 h-8 bg-brand-900/30" />
                    {/* Center Drop Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-8 bg-brand-900/30" />
                    {/* Right Drop Line */}
                    <div className="absolute right-0 top-0 w-0.5 h-8 bg-brand-900/30" />
                  </div>
                </div>

                {/* Mobile Connectors */}
                <div className="lg:hidden h-8 w-0.5 bg-brand-900/30 relative my-2">
                  <FaArrowDown className="text-brand-950/60 text-xs absolute -bottom-1" />
                </div>

                {/* 3 Column Operations Division */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8 w-full lg:mt-8">
                  {/* Soft Facilities Management */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-900 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg text-center font-heading">
                      Soft Facilities Management
                    </span>
                    <div className="flex flex-col gap-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Executive Officer (CEO)</span>
                          <FaChartLine className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Vision, Leadership, Strategy</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Financial Officer (CFO)</span>
                          <FaShieldAlt className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Planning, Reporting, Risk Management</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Marketing Officer (CMO)</span>
                          <FaUsers className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Branding, Communications, Promotion</span>
                      </div>
                    </div>
                  </div>

                  {/* Core Support (HRM / CS) */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 justify-center">
                    <div className="bg-white p-5 rounded-xl border border-slate-200 flex flex-col gap-1.5 shadow-sm text-center">
                      <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wide">HRM</h4>
                      <p className="text-[11px] text-slate-500">Human Resource Management</p>
                    </div>
                    <div className="bg-accent/15 border border-accent/30 p-5 rounded-xl flex flex-col gap-1.5 shadow-sm text-center">
                      <h4 className="font-bold text-sm text-brand-950 uppercase tracking-wide">Customer Service</h4>
                      <p className="text-[11px] text-brand-900 font-bold">24/7 Executive Support Hotline</p>
                    </div>
                  </div>

                  {/* Technical Facilities Management */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-900 bg-brand-50 border border-brand-100 px-3 py-1.5 rounded-lg text-center font-heading">
                      Technical Facilities Management
                    </span>
                    <div className="flex flex-col gap-3">
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Information Officer (CIO)</span>
                          <FaServer className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Register, Data Security, IT Governance</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Operating Officer (COO)</span>
                          <FaCogs className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Operations, Efficiency, Field Execution</span>
                      </div>
                      <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-1 shadow-sm">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-brand-950">Chief Technology Officer (CTO)</span>
                          <FaUserShield className="text-brand-900 text-xs shrink-0" />
                        </div>
                        <span className="text-[10px] text-slate-500">Research, Innovation, Product Development</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

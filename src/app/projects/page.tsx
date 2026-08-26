"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUser,
  FaCheckCircle,
  FaFolderOpen,
  FaBuilding,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";
import { projectsData, ProjectItem } from "@/lib/mockData";

const clientReferences = [
  { name: "Projukti International", type: "Technology & Power Integration" },
  { name: "Padma Bank Limited", type: "Banking & Infrastructure" },
  { name: "IFIC Bank Limited", type: "Banking & Corporate Offices" },
  { name: "Bank Asia Limited", type: "Banking & Corporate Offices" },
  { name: "Aarong (BRAC Enterprise)", type: "Retail & Commercial MEP" },
  { name: "Sky Air", type: "Aviation & Logistics Setup" },
  { name: "Sonargaon University", type: "Educational Facility HVAC" },
  { name: "Dhaka College", type: "Public Institution Lighting" },
  { name: "MIST (Military Institute of Science and Technology)", type: "Institutional MEP Research" },
  { name: "Mansons Pharma", type: "Pharmaceutical Cleanroom HVAC" },
  { name: "Biotech Associates", type: "Healthcare Equipment Utilities" },
  { name: "Global Health BD", type: "Medical Facility Automation" },
];

export default function ProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Filter Categories list
  const categories = ["All", "Infrastructure", "HVAC & Cleanroom", "Power Distribution", "Fire Protection"];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "Infrastructure") return project.category.includes("Infrastructure");
    if (selectedFilter === "HVAC & Cleanroom") return project.category.includes("HVAC");
    if (selectedFilter === "Power Distribution") return project.category.includes("Power");
    if (selectedFilter === "Fire Protection") return project.category.includes("Fire");
    return true;
  });

  // Extract Dhaka Metro Rail as main showcase project
  const metroRailProject = projectsData.find((p) => p.slug === "dhaka-metro-rail-mep");
  // The rest of the projects
  const standardProjects = filteredProjects.filter((p) => p.slug !== "dhaka-metro-rail-mep");

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Page Hero Banner */}
      <section className="relative bg-brand-950 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/80 to-brand-950 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-3 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest">
            <FaFolderOpen />
            <span>Projects & References</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Our Landmark <span className="text-gradient-accent">Case Studies</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
            Explore our engineering milestones across industrial, commercial, and national infrastructure projects in Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. Main Featured Case Study: Dhaka Metro Rail */}
      {metroRailProject && (selectedFilter === "All" || selectedFilter === "Infrastructure") && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Project Image */}
            <div
              className="lg:col-span-6 min-h-[300px] lg:min-h-[480px] bg-cover bg-center relative"
              style={{
                backgroundImage: `url('${metroRailProject.image}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white flex flex-col gap-2">
                <span className="w-fit text-[10px] font-extrabold uppercase tracking-widest text-brand-950 bg-accent px-3 py-1.5 rounded-md">
                  Landmark National Infrastructure
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Dhaka Metro Rail DMRTDP Line 6
                </h2>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {metroRailProject.category}
                  </span>
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-950 leading-snug">
                  Substation Automation & RHS System Installation
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Elite Standard Limited was selected for the design, instrumentation, utility management, and Rainwater Harvesting Systems (RHS) installation for station infrastructure and depots across CP-3 and CP-4.
                </p>

                {/* Scope checklist */}
                <div className="mt-2">
                  <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-brand-950 mb-3">
                    Project Scope & Execution:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                    {metroRailProject.scope.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FaCheckCircle className="text-accent text-sm mt-0.5 shrink-0" />
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Meta tags details */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-500 font-semibold">
                <div className="flex items-center gap-2">
                  <FaUser className="text-slate-400 text-sm" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase">Client</span>
                    <span className="text-slate-800 font-bold truncate max-w-[140px]">
                      {metroRailProject.client}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-slate-400 text-sm" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase">Location</span>
                    <span className="text-slate-800 font-bold">{metroRailProject.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <FaCalendarAlt className="text-slate-400 text-sm" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase">Year</span>
                    <span className="text-slate-800 font-bold">{metroRailProject.completionDate}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 3. Category Filter buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-extrabold text-xl text-brand-950">
              Completed Project Portfolio
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Filter case studies by mechanical, electrical, plumbing, or infrastructure category.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedFilter === cat
                    ? "bg-brand-950 text-white border-brand-950 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:text-brand-950 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[250px]">
        <AnimatePresence mode="wait">
          {standardProjects.length > 0 ? (
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {standardProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between group"
                >
                  <div className="flex flex-col">
                    {/* Project Image banner */}
                    <div
                      className="h-56 bg-cover bg-center relative"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
                      <span className="absolute bottom-4 left-4 text-[10px] font-extrabold uppercase tracking-widest text-brand-950 bg-accent px-2.5 py-1 rounded-md">
                        {project.category}
                      </span>
                    </div>

                    {/* Content area */}
                    <div className="p-6 flex flex-col gap-4">
                      <h4 className="font-heading font-bold text-lg text-brand-950 group-hover:text-accent transition-colors leading-snug">
                        {project.title}
                      </h4>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Specs */}
                      <div className="pt-2 flex flex-col gap-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                          Deliverables:
                        </span>
                        <ul className="flex flex-col gap-1.5 text-xs text-slate-700">
                          {project.scope.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <FaCheckCircle className="text-accent shrink-0 text-xs" />
                              <span className="font-medium line-clamp-1">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Metadata footer */}
                  <div className="p-5 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-500 font-semibold rounded-b-2xl">
                    <div className="flex items-center gap-1.5 truncate">
                      <FaBuilding className="text-slate-400 shrink-0" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-end">
                      <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white border border-slate-200 rounded-2xl flex flex-col items-center gap-3"
            >
              <FaFolderOpen className="text-slate-300 text-4xl" />
              <h4 className="font-heading font-bold text-lg text-brand-950">
                No standard projects in this category
              </h4>
              <p className="text-slate-500 text-sm">
                Try selecting a different filter category from the filter list above.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 5. Corporate References (Logos / Badge grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Client References
              </span>
              <span className="w-8 h-0.5 bg-accent" />
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Corporate Experience & References
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Elite Standard Limited is trusted by leading commercial banks, public institutions, and retail brands.
            </p>
          </div>

          {/* Grid list of 12 corporate references */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {clientReferences.map((client, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col justify-center gap-1 min-h-[90px] text-center hover:border-accent/40 group hover:bg-slate-50/50"
              >
                <h4 className="font-bold text-xs sm:text-sm text-brand-950 group-hover:text-accent transition-colors leading-tight">
                  {client.name}
                </h4>
                <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
                  {client.type}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Footer Callout */}
          <div className="mt-10 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-brand-900">
              <FaShieldAlt className="text-2xl text-accent shrink-0" />
              <div className="flex flex-col">
                <span className="font-bold text-sm text-brand-950">Strict Quality Inspections</span>
                <span className="text-[11px] text-slate-500">
                  All references are fully backed by project performance logs and technical audit BOQs.
                </span>
              </div>
            </div>
            <a
              href="/contact?type=consultation"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent bg-brand-950 hover:bg-brand-900 text-white px-5 py-3 rounded-lg shadow transition-colors shrink-0"
            >
              <span>Consult Our Project Engineers</span>
              <FaArrowRight className="text-[10px]" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

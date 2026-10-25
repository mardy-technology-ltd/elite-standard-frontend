"use client";

import React, { useState, useEffect } from "react";
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
  FaUniversity,
  FaGraduationCap,
  FaShoppingBag,
  FaPlane,
  FaBriefcase,
  FaCapsules,
  FaDna,
  FaHeartbeat,
  FaNetworkWired,
  FaSearch,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import Image from "next/image";
import { projectsData, ProjectItem } from "@/lib/mockData";

const clientReferences = [
  {
    name: "Projukti International",
    type: "Technology & Power Integration",
    monogram: "PI",
    icon: FaNetworkWired,
    bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    logo: "/images/clients/projukti-international.jpeg",
  },
  {
    name: "Padma Bank Limited",
    type: "Banking & Infrastructure",
    monogram: "PBL",
    icon: FaUniversity,
    bgColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
    logo: "/images/clients/padma-bank.webp",
  },
  {
    name: "IFIC Bank Limited",
    type: "Banking & Corporate Offices",
    monogram: "IFIC",
    icon: FaUniversity,
    bgColor: "bg-cyan-50 text-cyan-600 border-cyan-100",
    logo: "/images/clients/ific-bank.jpg",
  },
  {
    name: "Bank Asia Limited",
    type: "Banking & Corporate Offices",
    monogram: "BAL",
    icon: FaUniversity,
    bgColor: "bg-indigo-50 text-indigo-600 border-indigo-100",
    logo: "/images/clients/bank-asia.jpg",
  },
  {
    name: "Aarong (BRAC Enterprise)",
    type: "Retail & Commercial MEP",
    monogram: "AAR",
    icon: FaShoppingBag,
    bgColor: "bg-amber-50 text-amber-700 border-amber-100",
    logo: "/images/clients/aarong.jpg",
  },
  {
    name: "Sky Air",
    type: "Aviation & Logistics Setup",
    monogram: "SA",
    icon: FaPlane,
    bgColor: "bg-sky-50 text-sky-600 border-sky-100",
    logo: "/images/clients/sky-air.jpg",
  },
  {
    name: "Sonargaon University",
    type: "Educational Facility HVAC",
    monogram: "SU",
    icon: FaGraduationCap,
    bgColor: "bg-violet-50 text-violet-600 border-violet-100",
    logo: "/images/clients/sonargaon-university.png",
  },
  {
    name: "Dhaka College",
    type: "Public Institution Lighting",
    monogram: "DC",
    icon: FaGraduationCap,
    bgColor: "bg-rose-50 text-rose-600 border-rose-100",
    logo: "/images/clients/dhaka-college.webp",
  },
  {
    name: "MIST (Military Institute of Science and Technology)",
    type: "Institutional MEP Research",
    monogram: "MIST",
    icon: FaShieldAlt,
    bgColor: "bg-lime-50 text-lime-700 border-lime-200",
    logo: "/images/clients/mist.jpg",
  },
  {
    name: "Mansons Pharma",
    type: "Pharmaceutical Cleanroom HVAC",
    monogram: "MP",
    icon: FaCapsules,
    bgColor: "bg-teal-50 text-teal-600 border-teal-100",
    logo: "/images/clients/mansons-pharma.png",
  },
  {
    name: "Biotech Associates",
    type: "Healthcare Equipment Utilities",
    monogram: "BA",
    icon: FaDna,
    bgColor: "bg-purple-50 text-purple-600 border-purple-100",
    logo: "/images/clients/biotech-associates.jpg",
  },
  {
    name: "Global Health BD",
    type: "Medical Facility Automation",
    monogram: "GH",
    icon: FaHeartbeat,
    bgColor: "bg-red-50 text-red-600 border-red-100",
    logo: "/images/clients/global-health.png",
  },
];

export default function ProjectsClient({
  initialProjects = projectsData,
}: {
  initialProjects?: ProjectItem[];
}) {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Sectors");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setProjectsList(initialProjects);
    }
  }, [initialProjects]);

  const categories = [
    "All Sectors",
    "HVAC & Cleanroom",
    "Fire Protection",
    "Power Distribution",
    "Infrastructure MEP & Automation",
  ];

  // Extract Dhaka Metro Rail as main showcase project
  const metroRailProject = projectsList.find((p) => p.slug === "dhaka-metro-rail-mep") || projectsData[0];

  // Automatic slideshow timer (3.5 seconds)
  useEffect(() => {
    if (!metroRailProject?.gallery || metroRailProject.gallery.length === 0) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % (metroRailProject.gallery?.length || 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [metroRailProject]);

  const activeMetroImage =
    metroRailProject?.gallery?.[activeIdx]?.image || "/images/projects/metro-rail/IBAESL.png";

  const filteredProjects = projectsList.filter((project) => {
    const matchesCategory =
      selectedCategory === "All Sectors" || project.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      project.title.toLowerCase().includes(q) ||
      project.client.toLowerCase().includes(q) ||
      project.location.toLowerCase().includes(q) ||
      project.category.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

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
      {metroRailProject && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-0"
          >
            {/* Project Image & Gallery Switcher */}
            <div className="lg:col-span-6 min-h-[340px] lg:min-h-[500px] flex flex-col justify-between p-6 relative overflow-hidden bg-slate-900">
              {/* Animated Background preview image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMetroImage}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${activeMetroImage}')`,
                  }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-black/30 pointer-events-none" />

              {/* Top Category Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-950 bg-accent px-3 py-1.5 rounded-md shadow-md">
                  Landmark National Infrastructure
                </span>
              </div>

              {/* Bottom Info & Thumbnail Gallery Selector */}
              <div className="relative z-10 flex flex-col gap-3">
                <div>
                  <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                    Dhaka Metro Rail DMRTDP Line 6
                  </h2>
                  <p className="text-xs text-slate-300 font-medium">CP-3 & CP-4 Station Infrastructure & Depots</p>
                </div>

                {/* Interactive Thumbnails (IBA & RHS) */}
                {metroRailProject.gallery && (
                  <div className="pt-2 border-t border-white/15">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-2">
                      Auto-Sliding Field Site Photos (IBA & RHS):
                    </span>
                    <div className="grid grid-cols-6 gap-2">
                      {metroRailProject.gallery.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveIdx(idx)}
                          className={`relative rounded-lg overflow-hidden border-2 h-12 transition-all duration-200 ${
                            activeIdx === idx
                              ? "border-accent scale-105 shadow-lg shadow-accent/30 ring-2 ring-accent/40"
                              : "border-white/30 opacity-70 hover:opacity-100 hover:border-white"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 inset-x-0 bg-brand-950/80 text-[8px] text-white font-bold text-center py-0.5 uppercase truncate">
                            {item.category} {idx % 3 + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
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

      {/* 3. Related Engineering Projects Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Comprehensive Engineering Portfolio
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Related <span className="text-gradient">Engineering Projects</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
              Explore our turnkey MEP executions across pharmaceutical cleanrooms, high-voltage switchgear substations, NFPA fire safety, and corporate banking data centers.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search by client, sector, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-none focus:border-brand-800 shadow-sm bg-white"
            />
            <FaSearch className="absolute left-3 top-3.5 text-slate-400 text-xs" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-3 text-slate-400 hover:text-red-500"
              >
                <FaTimes className="text-xs" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200/80 scrollbar-none">
          {categories.map((cat) => {
            const count =
              cat === "All Sectors"
                ? projectsData.length
                : projectsData.filter((p) => p.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-brand-950 text-white shadow-md shadow-brand-950/20"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                    isSelected
                      ? "bg-accent text-brand-950 font-extrabold"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              id={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900 shrink-0">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/20 to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-3.5 left-3.5 bg-brand-950/90 backdrop-blur-md px-3 py-1 rounded-lg border border-accent/30 text-[11px] font-bold text-accent shadow-sm">
                    {project.category}
                  </div>

                  {/* Completion Date Tag */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-bold text-white flex items-center gap-1.5 drop-shadow">
                    <FaCalendarAlt className="text-accent text-[10px]" />
                    <span>{project.completionDate}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6">
                  {/* Client & Location Row */}
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-3 border-b border-slate-100 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 font-bold text-brand-900 truncate">
                      <FaBuilding className="text-accent text-xs shrink-0" />
                      <span className="truncate">{project.client}</span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0 text-slate-500 font-medium">
                      <FaMapMarkerAlt className="text-slate-400 text-[10px]" />
                      <span>{project.location}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base sm:text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors leading-snug mb-2 line-clamp-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 text-xs leading-relaxed mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Scope Checklist */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                      Key Deliverables & Scope:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {project.scope.slice(0, 3).map((item, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 leading-tight">
                          <FaCheckCircle className="text-emerald-600 text-xs mt-0.5 shrink-0" />
                          <span className="font-medium line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-6 pt-0">
                <a
                  href={`/contact?type=quotation&project=${encodeURIComponent(project.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-brand-950 text-brand-950 hover:text-accent font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-brand-950 shadow-sm"
                >
                  <FaPaperPlane className="text-[10px]" />
                  <span>Request Similar Solution / BOQ</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center flex flex-col items-center gap-3">
            <FaFolderOpen className="text-4xl text-slate-300" />
            <h4 className="font-heading text-lg font-bold text-slate-800">No matching projects found</h4>
            <p className="text-xs text-slate-500">
              No engineering projects match your search query &quot;{searchQuery}&quot;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Sectors");
              }}
              className="mt-2 text-xs font-bold text-emerald-700 underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* 4. Corporate References (Logos / Badge grid) */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {clientReferences.map((client, idx) => {
              const ClientIcon = client.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-50/50 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-4 text-center hover:border-brand-900/30 hover:bg-white hover:shadow-md group transition-all"
                >
                  {/* Styled Corporate Logo Badge */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-white border border-slate-200 shadow-sm flex items-center justify-center relative transition-transform group-hover:scale-105 group-hover:border-brand-800/40 group-hover:shadow-md overflow-hidden">
                    {client.logo ? (
                      <Image
                        src={client.logo}
                        alt={client.name}
                        width={72}
                        height={72}
                        className="max-h-full max-w-full object-contain"
                      />
                    ) : (
                      <div className={`w-full h-full rounded-xl flex flex-col items-center justify-center relative ${client.bgColor}`}>
                        <ClientIcon className="text-xl opacity-85" />
                        <span className="text-[9px] font-extrabold uppercase tracking-tighter absolute -bottom-1 px-1.5 py-0.5 rounded bg-brand-950 text-white leading-none scale-90 border border-brand-800 shadow-sm">
                          {client.monogram}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5 mt-1">
                    <h4 className="font-bold text-xs sm:text-sm text-brand-950 group-hover:text-accent transition-colors leading-snug">
                      {client.name}
                    </h4>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 font-semibold tracking-wide uppercase leading-tight">
                      {client.type}
                    </span>
                  </div>
                </motion.div>
              );
            })}
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

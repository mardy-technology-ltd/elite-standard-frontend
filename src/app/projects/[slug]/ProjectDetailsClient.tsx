"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaStar,
  FaPaperPlane,
  FaImages,
  FaChevronLeft,
  FaChevronRight,
  FaTools,
  FaShieldAlt,
  FaArrowRight,
  FaProjectDiagram,
  FaTimes,
  FaExpand,
} from "react-icons/fa";
import { ProjectItem } from "@/lib/mockData";

interface ProjectDetailsClientProps {
  project: ProjectItem;
  relatedProjects: ProjectItem[];
}

export default function ProjectDetailsClient({
  project,
  relatedProjects,
}: ProjectDetailsClientProps) {
  // Normalize gallery: if gallery array exists use it, otherwise use main image
  const gallery =
    Array.isArray(project.gallery) && project.gallery.length > 0
      ? project.gallery
      : [{ title: "Primary Installation", image: project.image }];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const activePhoto = gallery[activePhotoIdx] || gallery[0];

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % gallery.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  // Determine service link based on discipline
  const catLower = project.category?.toLowerCase() || "mechanical";
  const serviceSlug =
    catLower.includes("elect")
      ? "pdcp"
      : catLower.includes("plumb")
      ? "wts"
      : "hvac";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans">
      {/* 1. HERO SECTION WITH IMAGE BANNER & BREADCRUMBS */}
      <section className="relative bg-brand-950 text-white pt-24 pb-28 sm:pb-36 overflow-hidden">
        {/* Background Image with Ambient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('${project.image || "/images/company-info.png"}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/85 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-all active:scale-95"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Back to Projects Directory</span>
            </Link>

            <nav className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/projects" className="hover:text-white transition-colors">
                Projects
              </Link>
              <span>/</span>
              <span className="text-accent font-bold capitalize">
                {project.category}
              </span>
            </nav>
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-accent/20 border border-accent/40 text-accent backdrop-blur-md">
              {project.category} Engineering
            </span>

            {project.subCategory && (
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-blue-600/90 text-white shadow-sm border border-blue-400/40">
                {project.subCategory}
              </span>
            )}

            {project.isFeatured && (
              <span className="px-3 py-1 rounded-lg text-xs font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <FaStar className="text-[11px]" />
                Primary Landmark Showcase
              </span>
            )}

            {gallery.length > 1 && (
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-white/10 text-slate-200 border border-white/20 flex items-center gap-1.5">
                <FaImages className="text-accent text-[11px]" />
                {gallery.length} Field Photos
              </span>
            )}
          </div>

          {/* Project Title */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
            {project.title}
          </h1>

          {/* Key Facts Summary Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 pt-6 border-t border-white/15 max-w-5xl">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-accent/15 text-accent flex items-center justify-center text-base shrink-0 border border-accent/30">
                <FaBuilding />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Enterprise Client
                </span>
                <span
                  className="text-xs sm:text-sm font-bold text-white block truncate"
                  title={project.client}
                >
                  {project.client}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 text-red-400 flex items-center justify-center text-base shrink-0 border border-red-500/30">
                <FaMapMarkerAlt />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Site Location
                </span>
                <span
                  className="text-xs sm:text-sm font-bold text-white block truncate"
                  title={project.location}
                >
                  {project.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center text-base shrink-0 border border-amber-500/30">
                <FaCalendarAlt />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Completion Timeline
                </span>
                <span className="text-xs sm:text-sm font-bold text-white block truncate">
                  {project.completionDate}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center text-base shrink-0 border border-emerald-500/30">
                <FaShieldAlt />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                  Execution Status
                </span>
                <span className="text-xs sm:text-sm font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  Commissioned
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LARGE SHOWCASE: INTERACTIVE MULTI-PHOTO GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 sm:-mt-18 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-8 border border-slate-200/90 shadow-2xl">
          {/* Gallery Top Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-sm border border-accent/30">
                <FaImages />
              </div>
              <div>
                <h2 className="font-heading text-sm sm:text-base font-bold text-brand-950">
                  Site Installation & Engineering Photography
                </h2>
                <p className="text-[11px] text-slate-500">
                  High-resolution field documentation and commissioned system snapshots
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-brand-950 font-mono text-xs font-bold border border-slate-200">
                Photo {activePhotoIdx + 1} of {gallery.length}
              </span>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-brand-950 hover:bg-accent text-white hover:text-brand-950 text-xs font-bold transition-all shadow-sm active:scale-95"
                title="Fullscreen Zoom"
              >
                <FaExpand className="text-[10px]" />
                <span>Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Active Big Photo Display (Cinematic & Large) */}
          <div className="relative h-80 sm:h-[460px] md:h-[540px] lg:h-[620px] w-full rounded-2xl overflow-hidden bg-slate-950 group shadow-inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhotoIdx}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="relative w-full h-full"
              >
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title || project.title}
                  fill
                  className="object-cover cursor-pointer hover:scale-[1.02] transition-transform duration-700"
                  onClick={() => setIsLightboxOpen(true)}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/15 to-transparent pointer-events-none" />

            {/* Photo Caption Overlay */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pointer-events-none">
              <div className="max-w-2xl bg-brand-950/70 backdrop-blur-md px-4 py-3 rounded-xl border border-white/10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-accent block">
                  Verified Field Inspection Photo • {project.client}
                </span>
                <p className="text-sm sm:text-base font-bold text-white drop-shadow leading-snug">
                  {activePhoto.title || `Commissioned System Phase - Photo #${activePhotoIdx + 1}`}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="pointer-events-auto self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-accent text-white hover:text-brand-950 text-xs font-semibold backdrop-blur-md border border-white/20 transition-all"
              >
                <FaExpand className="text-[10px]" />
                <span>Click image to zoom</span>
              </button>
            </div>

            {/* Floating Navigation Arrows if more than 1 image */}
            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
                  aria-label="Previous Photo"
                >
                  <FaChevronLeft className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-brand-950/80 hover:bg-accent text-white hover:text-brand-950 backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
                  aria-label="Next Photo"
                >
                  <FaChevronRight className="text-sm" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Navigation Ribbon */}
          {gallery.length > 1 && (
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-thin">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 hidden sm:inline-block">
                All Photos:
              </span>
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePhotoIdx(idx)}
                  className={`group relative w-24 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activePhotoIdx === idx
                      ? "border-accent scale-105 shadow-md shadow-accent/20 ring-2 ring-accent/40"
                      : "border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title || `Thumb ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-brand-950/20 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 right-1.5 px-1 py-0.2 bg-brand-950/85 text-[9px] font-mono font-bold text-white rounded">
                    {idx + 1}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. DETAILS CONTENT CARDS DISPLAYED BELOW THE IMAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT 8 COLUMNS: NARRATIVE + SCOPE OF WORK CHECKLIST */}
          <div className="lg:col-span-8 space-y-8">
            {/* Card 1: Executive Case Study Narrative */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                  <FaProjectDiagram />
                  <span>Executive Case Study Narrative</span>
                </div>
                <span className="text-xs font-semibold text-slate-500">
                  Sector: <strong className="text-brand-950 capitalize">{project.category}</strong>
                </span>
              </div>

              <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-950">
                Engineering Challenge & Turnkey Solution
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-accent pl-4 py-1">
                {project.description ||
                  "Turnkey mechanical, electrical, and plumbing engineering execution delivering full compliance with Bangladesh National Building Code (BNBC) and international safety standards."}
              </p>

              {/* Engineering Standards & Certifications Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-brand-950 block">BNBC & NFPA</span>
                    <span className="text-[10px] text-slate-500">Full Standard Compliance</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm shrink-0">
                    <FaShieldAlt />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-brand-950 block">OEM Warranty</span>
                    <span className="text-[10px] text-slate-500">Tier-1 Certified Equipment</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-sm shrink-0">
                    <FaTools />
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-brand-950 block">24/7 Support</span>
                    <span className="text-[10px] text-slate-500">Dedicated Service Response</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Scope of Work Deliverables */}
            {project.scope && project.scope.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent/15 text-accent flex items-center justify-center text-sm border border-accent/30">
                      <FaTools />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-brand-950">
                        Scope of Work & Deliverables
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Executed technical milestones and turnkey deliverables
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-brand-950 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {project.scope.length} Milestones
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scope.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-slate-100 transition-colors"
                    >
                      <div className="w-6 h-6 rounded-full bg-emerald-500/15 text-emerald-600 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        <FaCheckCircle />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT 4 COLUMNS: PROJECT SPECIFICATIONS + BOQ CONSULTATION */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 3: Project Specifications */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <FaBuilding className="text-accent text-sm" />
                <h3 className="font-heading text-base font-bold text-brand-950">
                  Project Specifications
                </h3>
              </div>

              <dl className="space-y-3.5 text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                  <dt className="text-slate-500 font-medium shrink-0">Client:</dt>
                  <dd className="font-bold text-brand-950 text-right truncate min-w-0" title={project.client}>
                    {project.client}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                  <dt className="text-slate-500 font-medium shrink-0">Location:</dt>
                  <dd className="font-bold text-brand-950 text-right truncate min-w-0" title={project.location}>
                    {project.location}
                  </dd>
                </div>
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                  <dt className="text-slate-500 font-medium shrink-0">Sector:</dt>
                  <dd className="font-bold text-brand-950 capitalize text-right truncate min-w-0">{project.category}</dd>
                </div>
                {project.subCategory && (
                  <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                    <dt className="text-slate-500 font-medium shrink-0">Sub-Category:</dt>
                    <dd className="font-extrabold text-blue-600 uppercase text-[11px] text-right truncate min-w-0">{project.subCategory}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 gap-2">
                  <dt className="text-slate-500 font-medium shrink-0">Completion:</dt>
                  <dd className="font-bold text-brand-950 text-right">{project.completionDate}</dd>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <dt className="text-slate-500 font-medium shrink-0">Status:</dt>
                  <dd className="font-bold text-emerald-600 flex items-center gap-1.5 shrink-0">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Commissioned
                  </dd>
                </div>
              </dl>
            </div>

            {/* Card 4: Request BOQ CTA Card */}
            <div className="bg-gradient-to-br from-brand-950 to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-4 border border-brand-800">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent block">
                Turnkey Implementation
              </span>
              <h3 className="font-heading text-lg font-bold leading-snug">
                Planning a Similar Engineering Project?
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Our licensed senior MEP engineers can audit your facility blueprints, run load calculations, and prepare a full compliance BOQ within 48 hours.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`/contact?type=quotation&project=${encodeURIComponent(project.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-accent hover:bg-amber-400 text-brand-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg active:scale-95"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Request Project BOQ</span>
                </a>
                <Link
                  href={`/services/${serviceSlug}`}
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-colors"
                >
                  <span>Explore Related Service</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED LANDMARK CASE STUDIES CAROUSEL / GRID */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-accent mb-1">
                <FaProjectDiagram />
                <span>Portfolio Continuity</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950">
                Other Landmark Engineering Projects
              </h2>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-900 hover:text-accent transition-colors"
            >
              <span>View All Projects</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/projects/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.image || "/images/company-info.png"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-brand-950/90 text-accent border border-accent/30">
                        {item.category}
                      </span>
                      {item.subCategory && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-blue-600 text-white">
                          {item.subCategory}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="font-bold text-brand-900 truncate">
                        {item.client}
                      </span>
                      <span>{item.location}</span>
                    </div>
                    <h3 className="font-heading text-sm font-bold text-brand-950 group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between text-xs font-bold text-brand-900 border-t border-slate-100 mt-2">
                  <span>View Case Study</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 4. FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-6xl w-full h-[90vh] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Lightbox Top Bar */}
              <div className="flex items-center justify-between text-white pb-3 border-b border-white/15">
                <div>
                  <h3 className="text-sm sm:text-base font-bold truncate max-w-lg">
                    {activePhoto.title || project.title}
                  </h3>
                  <span className="text-xs text-slate-400">
                    Photo {activePhotoIdx + 1} of {gallery.length} • {project.client}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>

              {/* Lightbox Image */}
              <div className="relative flex-1 my-3 flex items-center justify-center overflow-hidden">
                <Image
                  src={activePhoto.image}
                  alt={activePhoto.title || project.title}
                  fill
                  className="object-contain"
                  priority
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={prevPhoto}
                      className="absolute left-3 p-3.5 rounded-full bg-black/60 hover:bg-accent text-white hover:text-brand-950 transition-all border border-white/20"
                    >
                      <FaChevronLeft className="text-base" />
                    </button>
                    <button
                      type="button"
                      onClick={nextPhoto}
                      className="absolute right-3 p-3.5 rounded-full bg-black/60 hover:bg-accent text-white hover:text-brand-950 transition-all border border-white/20"
                    >
                      <FaChevronRight className="text-base" />
                    </button>
                  </>
                )}
              </div>

              {/* Lightbox Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex items-center justify-center gap-2 overflow-x-auto pt-2 pb-1">
                  {gallery.map((g, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIdx === idx
                          ? "border-accent scale-105"
                          : "border-white/30 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={g.image}
                        alt="Thumb"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


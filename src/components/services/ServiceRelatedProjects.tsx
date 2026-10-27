"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectItem } from "@/lib/mockData";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaCheckCircle,
  FaProjectDiagram,
} from "react-icons/fa";

interface ServiceRelatedProjectsProps {
  projects: ProjectItem[];
  serviceCategory: string;
  serviceTitle: string;
}

export default function ServiceRelatedProjects({
  projects,
  serviceCategory,
  serviceTitle,
}: ServiceRelatedProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Proven Track Record
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Related <span className="text-gradient">Engineering Projects</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore key implementations and turnkey case studies executed under our{" "}
              <strong className="text-brand-950 font-bold">{serviceCategory}</strong> discipline.
            </p>
          </div>

          <Link
            href="/projects"
            className="group hidden md:inline-flex items-center gap-2 text-brand-950 hover:text-accent font-bold text-xs bg-white border border-slate-200 hover:bg-brand-950 hover:text-white px-5 py-3 rounded-xl shadow-sm transition-all duration-300"
          >
            <FaProjectDiagram className="text-xs" />
            <span>Explore All Projects</span>
            <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-800/40 transition-all duration-300 flex flex-col justify-between"
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
                  {project.scope && project.scope.length > 0 && (
                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 mb-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-2">
                        Key Deliverables & Execution:
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
                  )}
                </div>
              </div>

              {/* Bottom Action Bar */}
              <div className="p-6 pt-0">
                <Link
                  href={`/projects#${project.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-brand-950 text-brand-950 hover:text-accent font-bold text-xs py-2.5 px-4 rounded-xl transition-all duration-200 border border-slate-200 hover:border-brand-950 shadow-sm"
                >
                  <span>View Project Case Study</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="w-full inline-flex items-center justify-center gap-2 text-brand-950 font-bold text-xs bg-white border border-slate-200 py-3 rounded-xl shadow-sm"
          >
            <span>View All Engineering Projects</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projectsData, ProjectItem } from "@/lib/mockData";
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaArrowRight } from "react-icons/fa";

export default function FeaturedProjects() {
  return (
    <section className="py-24 bg-white text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Our Engineering Portfolio
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Featured <span className="text-gradient">Engineering Projects</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Explore our landmark MEP, cleanroom HVAC, and industrial power engineering projects executed across Bangladesh.
            </p>
          </div>

          <Link
            href="/projects"
            className="group hidden md:inline-flex items-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-brand-50 hover:bg-brand-900 px-5 py-3 rounded-lg transition-all duration-300"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projectsData.map((project: ProjectItem, idx: number) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group bg-brand-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 hover:border-brand-800 flex flex-col justify-between"
            >
              {/* Image Showcase (Fixed Aspect Ratio Container) */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-brand-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-accent/40 text-xs font-bold text-accent">
                  {project.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col gap-4 text-white flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold tracking-tight text-white group-hover:text-accent transition-colors leading-snug mb-3">
                    {project.title}
                  </h3>

                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Meta details */}
                <div className="pt-4 border-t border-slate-800 flex flex-col gap-2 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <FaBuilding className="text-accent shrink-0 text-xs" />
                    <span className="font-medium text-slate-300">Client: {project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-accent shrink-0 text-xs" />
                    <span>Location: {project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-accent shrink-0 text-xs" />
                    <span>Completed: {project.completionDate}</span>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="pt-2">
                  <Link
                    href={`/projects#${project.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider group/link"
                  >
                    <span>View Project Case Study</span>
                    <FaArrowRight className="text-[10px] group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All CTA Button */}
        <div className="mt-12 text-center md:hidden">
          <Link
            href="/projects"
            className="w-full inline-flex items-center justify-center gap-2 text-white font-bold text-sm bg-brand-900 py-3.5 rounded-lg shadow-md"
          >
            <span>View All Projects</span>
            <FaArrowRight className="text-xs text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
}

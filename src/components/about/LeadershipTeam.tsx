"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaLinkedinIn, FaEnvelope, FaUserTie } from "react-icons/fa";

export interface TeamMember {
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
}

export const teamData: TeamMember[] = [
  {
    name: "Engr. Mamun Prodhan",
    role: "Chairman",
    credentials: "B.Sc. Engineering, Senior MEP Consultant",
    bio: "Over 20 years of experience directing mega Mechanical, Electrical, and Plumbing engineering projects and guiding corporate vision in compliance with BNBC & NFPA standards.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Engr. Shipan Bala",
    role: "Managing Director",
    credentials: "B.Sc. Engineering, Industrial Facilities Specialist",
    bio: "Directs technical and soft facilities operations, overseeing execution of large-scale infrastructure, automated systems, and high-performance engineering client relations.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Engr. Farhana Ahmed",
    role: "Executive Director & CTO",
    credentials: "B.Sc. Electrical & Electronic Engineering (BUET), NFPA Member",
    bio: "Specialist in high-voltage substation switchgear, PFI power factor optimization, and industrial automation networks.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Engr. Tanvir Rahman",
    role: "Head of Fire Safety & Plumbing",
    credentials: "B.Sc. Civil & Environmental (DUET), FSCD Certified Safety Auditor",
    bio: "Pioneered UL/FM listed fire pump skid installations and hydraulic pipe calculations for major garment factories.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop",
  },
];

export default function LeadershipTeam() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Leadership & Expertise
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            Meet Our <span className="text-gradient">Executive Team</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Our board of directors and chief engineering leads bring decades of field experience and academic rigor to every project.
          </p>
        </div>

        {/* 4-Card Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member: TeamMember, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-card-hover border border-slate-200/80 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Showcase */}
              <div className="relative h-64 w-full overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Social Bar */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-brand-900/90 text-white hover:bg-accent hover:text-brand-950 flex items-center justify-center backdrop-blur-md transition-colors"
                  >
                    <FaLinkedinIn className="text-xs" />
                  </a>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-accent bg-brand-950 px-2.5 py-1 rounded-md mb-2 inline-block">
                    {member.role}
                  </span>

                  <h3 className="font-heading text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-[11px] font-semibold text-slate-500 mb-2 leading-tight">
                    {member.credentials}
                  </p>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-brand-800">
                  <FaUserTie className="text-accent text-xs" />
                  <span>Licensed PE Engineer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

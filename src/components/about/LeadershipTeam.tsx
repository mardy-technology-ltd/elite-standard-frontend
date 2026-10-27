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
];

export default function LeadershipTeam() {
  return (
    <section className="py-20 sm:py-24 bg-slate-50 text-slate-800 relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-0.5 bg-accent" />
            <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
              Leadership & Governance
            </span>
            <span className="w-8 h-0.5 bg-accent" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-brand-950 tracking-tight leading-tight">
            Meet Our <span className="text-gradient">Executive Leadership</span>
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Guided by visionary engineering leadership committed to innovation, safety standards, and excellence across Bangladesh.
          </p>
        </div>

        {/* 2-Card Executive Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {teamData.map((member: TeamMember, idx: number) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.15 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/80 hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Photo Showcase */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden shrink-0 bg-slate-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                {/* Social Bar */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-xl bg-brand-900/90 text-white hover:bg-accent hover:text-brand-950 flex items-center justify-center backdrop-blur-md transition-all shadow-md"
                    aria-label="LinkedIn Profile"
                  >
                    <FaLinkedinIn className="text-xs" />
                  </a>
                </div>

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-accent bg-brand-950/90 backdrop-blur-md px-3 py-1 rounded-md inline-block border border-accent/20">
                    {member.role}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 sm:p-7 flex flex-col gap-3 flex-grow justify-between">
                <div>
                  <h3 className="font-heading text-xl font-black text-brand-950 group-hover:text-accent transition-colors">
                    {member.name}
                  </h3>

                  <p className="text-xs font-bold text-slate-500 mb-3 leading-tight">
                    {member.credentials}
                  </p>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-brand-800">
                  <div className="flex items-center gap-2">
                    <FaUserTie className="text-accent text-sm" />
                    <span>Executive Board Member</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">Elite Standard Ltd.</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

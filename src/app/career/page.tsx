import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaGraduationCap,
  FaCheckCircle,
  FaPaperPlane,
  FaUsers,
  FaAward,
  FaHardHat,
  FaArrowRight,
  FaEnvelope,
  FaMoneyBillWave,
} from "react-icons/fa";

export const metadata: Metadata = {
  title: "Careers & Recruitment | Elite Standard Limited",
  description:
    "Join Bangladesh's premier MEP engineering firm. Explore career opportunities for Mechanical, Electrical, Fire Protection, and Automation engineers.",
  keywords: [
    "MEP Engineering Jobs Dhaka",
    "HVAC Engineer Career Bangladesh",
    "Switchgear Design Jobs",
    "Elite Standard Limited Recruitment",
  ],
};

const openPositions = [
  {
    id: "hvac-sr",
    title: "Senior Mechanical Engineer (HVAC & Cleanrooms)",
    department: "Mechanical Engineering (HVAC)",
    location: "Amtola / Banani, Dhaka",
    type: "Full Time",
    experience: "4 - 7 Years",
    salary: "BDT 75,000 - 1,10,000 / Month (Negotiable)",
    salaryBadge: "BDT 75,000 - 1,10,000 / Month",
    summary:
      "Lead HVAC heat load calculation (Carrier HAP), VRF system layout design, chiller plant piping schematics, and ISO Class 7/8 pharmaceutical cleanroom air balancing.",
    qualifications: [
      "B.Sc. in Mechanical Engineering from a recognized university (BUET/CUET/RUET/KUET/AUST preferred)",
      "Proficient in Carrier HAP, AutoCAD MEP, and duct sizing tools",
      "Hands-on experience in VRF multi-split installation and chilled water piping commissioning",
      "Knowledge of BNBC 2020 and ASHRAE 62.1 / 90.1 standards",
    ],
  },
  {
    id: "switchgear-eng",
    title: "Electrical Switchgear Design Engineer (LT/HT Panels)",
    department: "Power Distribution & Panels (PDCP)",
    location: "Dhaka Factory & Site",
    type: "Full Time",
    experience: "3 - 5 Years",
    salary: "BDT 55,000 - 85,000 / Month (Negotiable)",
    salaryBadge: "BDT 55,000 - 85,000 / Month",
    summary:
      "Design Form-4 type tested Low Voltage switchgear panels, HT 11kV VCB substations, Automatic PFI capacitor banks, and motor control centers (MCC).",
    qualifications: [
      "B.Sc. in Electrical & Electronic Engineering (EEE)",
      "Strong proficiency in single-line diagrams (SLD), busbar calculation, and AutoCAD Electrical",
      "Familiarity with ABB, Schneider, and Siemens circuit breakers & digital power meters",
      "Sound understanding of IEC 61439-1/2 and BNBC electrical safety codes",
    ],
  },
  {
    id: "fire-safety-eng",
    title: "Fire Protection & Life Safety Engineer (NFPA / FSCD)",
    department: "Fire Detection & Protection (FDPS)",
    location: "Project Sites (Dhaka & Environs)",
    type: "Full Time",
    experience: "3 - 6 Years",
    salary: "BDT 60,000 - 90,000 / Month (Negotiable)",
    salaryBadge: "BDT 60,000 - 90,000 / Month",
    summary:
      "Execute wet-pipe sprinkler hydraulic calculations, high-pressure hydrant network layout, clean-agent (FM200) gas suppression, and FSCD statutory clearance documentation.",
    qualifications: [
      "B.Sc. in Mechanical or Chemical Engineering",
      "In-depth working knowledge of NFPA 13, 14, 20, and BNBC Part 4 requirements",
      "Experience with UL/FM certified electric & diesel fire pump skid commissioning",
      "Track record of successful Fire Service & Civil Defence (FSCD) safety audits",
    ],
  },
  {
    id: "automation-eng",
    title: "BMS & Industrial Automation Engineer (PLC / SCADA)",
    department: "Industrial Building Automation (IBA)",
    location: "Amtola Headquarters, Dhaka",
    type: "Full Time",
    experience: "2 - 4 Years",
    salary: "BDT 50,000 - 75,000 / Month (Negotiable)",
    salaryBadge: "BDT 50,000 - 75,000 / Month",
    summary:
      "Program Siemens S7-1200/1500 and Schneider Modicon PLCs, develop SCADA graphics, and integrate IoT field transmitters with central building management systems.",
    qualifications: [
      "B.Sc. in EEE, Mechatronics, or CSE/ETE",
      "Proven experience in TIA Portal, WinCC SCADA, or Wonderware InTouch",
      "Hands-on configuration of Modbus RTU/TCP, BACnet, and Profibus communication protocols",
      "Knowledge of VFD speed modulation, energy telemetry, and automated damper interlocks",
    ],
  },
];

const culturePerks = [
  {
    icon: FaAward,
    title: "Landmark Engineering Projects",
    description:
      "Work on Bangladesh's most prestigious infrastructure projects — from Dhaka Metro Rail substations to Biman hangars and multi-story corporate towers.",
  },
  {
    icon: FaGraduationCap,
    title: "International Code Mastery",
    description:
      "Continuous on-the-job training in international engineering standards including BNBC 2020, NFPA, ASHRAE, SMACNA, IEC, and IEEE.",
  },
  {
    icon: FaHardHat,
    title: "Zero Compromise on Safety",
    description:
      "Strict workplace HSE protocols with mandatory personal protective equipment (PPE), hazard assessments, and OSHA compliance.",
  },
  {
    icon: FaUsers,
    title: "Collaborative Leadership",
    description:
      "Work directly alongside veteran chief engineers and project managers in an inspiring, meritocratic environment that values your innovation.",
  },
];

export default function CareerPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-950 text-white py-20 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/85 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest">
            <FaBriefcase />
            <span>Join Our Engineering Talent</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Build Your Career with <span className="text-gradient-accent">Elite Standard</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            We are looking for dedicated mechanical, electrical, and automation professionals ready to shape modern industrial infrastructure and MEP systems across Bangladesh.
          </p>
        </div>
      </section>

      {/* 2. Culture & Why Join Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePerks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col gap-3 group hover:border-brand-800/40"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                  <Icon />
                </div>
                <h3 className="font-heading font-extrabold text-base text-brand-950 group-hover:text-brand-800 transition-colors">
                  {perk.title}
                </h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                  {perk.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Open Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Current Openings
              </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950">
              Explore Available Engineering Roles
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            All positions offer competitive compensation, project incentives, professional development, and provident fund benefits.
          </p>
        </div>

        <div className="space-y-6">
          {openPositions.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-brand-800/40 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="flex flex-col gap-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-brand-50 border border-brand-100 text-[11px] font-bold text-brand-900">
                    {job.department}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                    {job.type}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold flex items-center gap-1.5 shadow-sm">
                    <FaMoneyBillWave className="text-xs text-amber-600" />
                    <span>{job.salaryBadge}</span>
                  </span>
                </div>

                <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-950 group-hover:text-brand-800 transition-colors">
                  {job.title}
                </h3>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {job.summary}
                </p>

                <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600 pt-1">
                  <span className="flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-accent" />
                    <span>{job.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaClock className="text-accent" />
                    <span>Experience: {job.experience}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-950 font-bold bg-slate-100 px-3 py-1 rounded-lg border border-slate-200/80">
                    <FaMoneyBillWave className="text-emerald-600 text-xs shrink-0" />
                    <span className="text-slate-500 font-normal">Salary:</span>
                    <span>{job.salary}</span>
                  </span>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Qualifications:
                  </span>
                  {job.qualifications.map((q, qIdx) => (
                    <div key={qIdx} className="flex items-start gap-2 text-xs text-slate-700">
                      <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="shrink-0 flex flex-col items-start lg:items-end gap-3 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                <div className="text-left lg:text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                    Monthly Salary Range
                  </span>
                  <span className="text-sm sm:text-base font-extrabold text-brand-950">
                    {job.salaryBadge}
                  </span>
                </div>

                <a
                  href={`mailto:elitestandardlimited@gmail.com?subject=Application%20for%20${encodeURIComponent(job.title)}`}
                  className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group/btn whitespace-nowrap"
                >
                  <span>Apply for this Position</span>
                  <FaPaperPlane className="text-xs text-accent group-hover/btn:translate-x-1 transition-transform" />
                </a>

                <span className="text-[10px] text-slate-400">
                  Direct submission to HR team
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. General Application / Internship Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-2xl shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Don't See Your Specialty Listed?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
                We are always eager to meet talented engineers, CAD/BIM modelers, and internship candidates. Send your updated CV and portfolio to our recruitment desk.
              </p>
            </div>
          </div>

          <a
            href="mailto:elitestandardlimited@gmail.com?subject=General%20Engineering%20Application%20-%20Elite%20Standard"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-bold text-sm px-8 py-4 rounded-xl shadow-cta hover:shadow-2xl transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Send General CV</span>
            <FaArrowRight className="text-xs" />
          </a>
        </div>
      </section>
    </main>
  );
}

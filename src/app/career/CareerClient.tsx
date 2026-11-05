"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
  FaSearch,
  FaTimes,
  FaSpinner,
  FaFileAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

export interface JobPositionItem {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  salaryBadge?: string;
  summary: string;
  qualifications: string[];
  responsibilities?: string[];
  bannerUrl?: string | null;
  isActive: boolean;
  deadline?: string;
}

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

export default function CareerClient({
  initialPositions,
  initialBanners = [],
  initialBanner = null,
}: {
  initialPositions: JobPositionItem[];
  initialBanners?: string[];
  initialBanner?: string | null;
}) {
  const [positions, setPositions] = useState<JobPositionItem[]>(initialPositions);
  const [search, setSearch] = useState("");
  // Banner slider state
  const rawBanners = initialBanners && initialBanners.length > 0
    ? initialBanners
    : (initialBanner ? [initialBanner] : []);
  const [banners, setBanners] = useState<string[]>(rawBanners);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slide effect (every 5 seconds)
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  const [direction, setDirection] = useState<number>(1);

  const handleNextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handlePrevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleDotClick = (idx: number) => {
    setDirection(idx > currentSlide ? 1 : -1);
    setCurrentSlide(idx);
  };
  
  // Application Modal State
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyingJob, setApplyingJob] = useState<JobPositionItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Application Form State
  const [applicant, setApplicant] = useState({
    fullName: "",
    email: "",
    phone: "",
    experience: "",
    resumeUrl: "",
    coverNote: "",
  });

  
  const filteredPositions = positions.filter((job) => {
    return (
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.summary.toLowerCase().includes(search.toLowerCase()) ||
      job.location.toLowerCase().includes(search.toLowerCase())
    );
  });

  const handleOpenApply = (job: JobPositionItem) => {
    setApplyingJob(job);
    setApplicant({
      fullName: "",
      email: "",
      phone: "",
      experience: job.experience,
      resumeUrl: "",
      coverNote: "",
    });
    setSubmittedSuccess(false);
    setApplyModalOpen(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyingJob) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobPositionId: applyingJob.id,
          positionTitle: applyingJob.title,
          fullName: applicant.fullName,
          email: applicant.email,
          phone: applicant.phone,
          experience: applicant.experience,
          resumeUrl: applicant.resumeUrl,
          coverNote: applicant.coverNote,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmittedSuccess(true);
    } catch (err: any) {
      alert(err.message || "Failed to submit application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans">
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Current Openings ({filteredPositions.length})
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

        {/* Filter and Search */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by job title or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-800 transition-colors"
            />
          </div>
        </div>

        {/* Position Cards List */}
        {filteredPositions.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FaBriefcase className="mx-auto text-4xl text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-800">
              No matching positions currently open
            </h3>
            <p className="text-slate-500 text-xs mt-1">
              Please check back soon or submit a general CV below.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPositions.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-brand-800/40 flex flex-col lg:flex-row items-stretch justify-between gap-8"
              >
                {/* LEFT SIDE: All Job Details + Salary + Apply Button + HR review note */}
                <div className="flex-1 flex flex-col justify-between gap-6 min-w-0">
                  <div className="flex flex-col gap-3.5">
                    {/* Header Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-bold">
                        {job.type}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                        <FaMoneyBillWave className="text-xs text-amber-600" />
                        <span>{job.salaryBadge || job.salary}</span>
                      </span>
                      {job.deadline && (
                        <span className="px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-bold flex items-center gap-1.5">
                          <FaClock className="text-[10px]" />
                          <span>Deadline: {job.deadline}</span>
                        </span>
                      )}
                    </div>

                    {/* Job Title */}
                    <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-950 group-hover:text-brand-800 transition-colors leading-tight">
                      {job.title}
                    </h3>

                    {/* Summary / Description */}
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {job.summary}
                    </p>

                    {/* Location, Exp, Salary tags */}
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-600 pt-1">
                      <span className="flex items-center gap-1.5 font-medium">
                        <FaMapMarkerAlt className="text-accent" />
                        <span>{job.location}</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium">
                        <FaClock className="text-accent" />
                        <span>Experience: {job.experience}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-brand-950 font-bold bg-slate-100/80 px-3 py-1 rounded-lg border border-slate-200/80">
                        <FaMoneyBillWave className="text-emerald-600 text-xs shrink-0" />
                        <span className="text-slate-500 font-normal">Salary:</span>
                        <span>{job.salary}</span>
                      </span>
                    </div>

                    {/* Key Responsibilities */}
                    {job.responsibilities && job.responsibilities.length > 0 && (
                      <div className="mt-2 pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          Key Responsibilities:
                        </span>
                        <div className="space-y-1.5">
                          {job.responsibilities.map((r, rIdx) => (
                            <div key={rIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand-800 mt-1.5 shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Key Qualifications */}
                    {job.qualifications && job.qualifications.length > 0 && (
                      <div className="mt-2 pt-3 border-t border-slate-100 space-y-2">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                          Key Qualifications:
                        </span>
                        <div className="space-y-1.5">
                          {job.qualifications.map((q, qIdx) => (
                            <div key={qIdx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                              <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                              <span>{q}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* LEFT SIDE BOTTOM: Salary and directly UNDER it Apply Button & HR Note */}
                  <div className="pt-5 border-t border-slate-100 flex flex-col items-start gap-4">
                    {/* Monthly Salary */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center text-lg shrink-0">
                        <FaMoneyBillWave />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">
                          Monthly Salary Range
                        </span>
                        <span className="text-base sm:text-lg font-black text-brand-950 tracking-tight">
                          {job.salaryBadge || job.salary}
                        </span>
                      </div>
                    </div>

                    {/* Directly UNDER Salary: Apply Button & HR Note aligned completely to the LEFT */}
                    <div className="flex flex-col items-start gap-1.5">
                      <button
                        onClick={() => handleOpenApply(job)}
                        className="inline-flex items-center justify-center gap-2.5 bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group/btn whitespace-nowrap cursor-pointer"
                      >
                        <span>Apply for this Position</span>
                        <FaPaperPlane className="text-xs text-amber-400 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform" />
                      </button>

                      <span className="text-[10px] text-slate-400 font-medium pl-1">
                        Immediate consideration & direct HR review
                      </span>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Dedicated Banner for this Position (Fallback to general banners if any) */}
                {(job.bannerUrl || banners.length > 0) && (
                  <div className="shrink-0 w-full lg:w-[400px] xl:w-[440px] flex flex-col justify-center">
                    <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white group/banner">
                      <div className="relative w-full h-64 sm:h-72 lg:h-80 overflow-hidden flex items-center justify-center bg-slate-50">
                        {job.bannerUrl ? (
                          <div className="w-full h-full relative">
                            <Image
                              src={job.bannerUrl}
                              alt={`${job.title} Recruitment Circular Banner`}
                              fill
                              className="object-contain p-1 hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        ) : (
                          <AnimatePresence initial={false} custom={direction} mode="wait">
                            <motion.div
                              key={currentSlide}
                              custom={direction}
                              variants={{
                                enter: (dir: number) => ({
                                  x: dir > 0 ? 50 : -50,
                                  opacity: 0,
                                }),
                                center: {
                                  x: 0,
                                  opacity: 1,
                                  transition: {
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 },
                                  },
                                },
                                exit: (dir: number) => ({
                                  x: dir > 0 ? -50 : 50,
                                  opacity: 0,
                                  transition: {
                                    x: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.2 },
                                  },
                                }),
                              }}
                              initial="enter"
                              animate="center"
                              exit="exit"
                              className="w-full h-full relative"
                            >
                              <Image
                                src={banners[currentSlide]}
                                alt="Recruitment Circular Banner"
                                fill
                                className="object-contain p-1"
                              />
                            </motion.div>
                          </AnimatePresence>
                        )}

                        {/* Navigation Buttons (only for general multi-banners when position has no specific banner) */}
                        {!job.bannerUrl && banners.length > 1 && (
                          <>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePrevSlide();
                              }}
                              aria-label="Previous Banner"
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center text-xs z-10 transition-colors shadow-md backdrop-blur-xs"
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNextSlide();
                              }}
                              aria-label="Next Banner"
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/75 hover:bg-slate-900 text-white flex items-center justify-center text-xs z-10 transition-colors shadow-md backdrop-blur-xs"
                            >
                              <FaChevronRight />
                            </button>
                          </>
                        )}

                        {/* Top badge */}
                        <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-brand-950/80 text-white text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm pointer-events-none border border-white/10">
                          Hiring Circular {!job.bannerUrl && banners.length > 1 ? `(${currentSlide + 1}/${banners.length})` : ''}
                        </div>
                      </div>

                      {/* Pagination dots (only for general multi-banners) */}
                      {!job.bannerUrl && banners.length > 1 && (
                        <div className="flex items-center justify-center gap-1.5 py-2 bg-slate-50 border-t border-slate-100">
                          {banners.map((_: string, idx: number) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleDotClick(idx)}
                              aria-label={`Go to banner ${idx + 1}`}
                              className={`h-1.5 rounded-full transition-all duration-300 ${
                                currentSlide === idx ? "w-6 bg-brand-950" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. General Application Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-2xl shrink-0">
              <FaEnvelope />
            </div>
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                Don&apos;t See Your Specialty Listed?
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

      {/* Online Candidate Application Modal */}
      {applyModalOpen && applyingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-brand-950 text-white p-6 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent">
                  Job Application
                </span>
                <h3 className="font-heading font-extrabold text-lg text-white mt-0.5">
                  {applyingJob.title}
                </h3>
                <span className="text-xs text-slate-300">
                  {applyingJob.location}
                </span>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-brand-900 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Body */}
            {submittedSuccess ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  <FaCheckCircle />
                </div>
                <h4 className="font-heading text-xl font-bold text-slate-900">
                  Application Submitted Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for applying for <strong>{applyingJob.title}</strong> at Elite Standard Limited. Our HR recruitment team will review your profile and contact you soon.
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-950 text-white font-bold text-xs hover:bg-brand-900 transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={applicant.fullName}
                    onChange={(e) => setApplicant({ ...applicant, fullName: e.target.value })}
                    placeholder="e.g. Engr. Tanvir Ahmed"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={applicant.email}
                      onChange={(e) => setApplicant({ ...applicant, email: e.target.value })}
                      placeholder="tanvir@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={applicant.phone}
                      onChange={(e) => setApplicant({ ...applicant, phone: e.target.value })}
                      placeholder="+880 1700 000000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Years of Relevant Experience
                  </label>
                  <input
                    type="text"
                    value={applicant.experience}
                    onChange={(e) => setApplicant({ ...applicant, experience: e.target.value })}
                    placeholder="e.g. 5 Years in HVAC VRF design"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    CV / Portfolio Link (Google Drive / LinkedIn / Dropbox)
                  </label>
                  <input
                    type="url"
                    value={applicant.resumeUrl}
                    onChange={(e) => setApplicant({ ...applicant, resumeUrl: e.target.value })}
                    placeholder="https://drive.google.com/file/... or LinkedIn URL"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Cover Note / Key Strengths
                  </label>
                  <textarea
                    rows={3}
                    value={applicant.coverNote}
                    onChange={(e) => setApplicant({ ...applicant, coverNote: e.target.value })}
                    placeholder="Briefly explain your key projects and why you're a great fit for this engineering role..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-brand-900 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <FaSpinner className="animate-spin text-accent" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <FaPaperPlane className="text-accent text-[10px]" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

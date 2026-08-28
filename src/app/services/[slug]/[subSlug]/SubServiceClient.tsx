"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaFilePdf,
  FaPhoneAlt,
  FaEnvelope,
  FaRegCalendarAlt,
  FaHourglassHalf,
  FaThumbsUp,
  FaShieldAlt,
  FaRegClock
} from "react-icons/fa";

interface SubServiceClientProps {
  service: ServiceItem;
  sub: SubServiceDetail;
}

// Zod Schema for the lead capture quote form
const quoteSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  company: z.string().min(2, "Company name is required"),
  projectScale: z.string().min(1, "Please select a project scale"),
  message: z.string().min(10, "Please provide some project details"),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export default function SubServiceClient({ service, sub }: SubServiceClientProps) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      projectScale: "",
      message: `We would like to request a quotation/proposal for "${sub.title}" systems. Specifically, we need assistance with designing, installing, or servicing...`,
    },
  });

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setFormSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20">
      {/* 1. Header Hero Panel */}
      <section className="bg-brand-950 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back button */}
          <Link
            href={`/services/${service.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <FaArrowLeft />
            <span>Back to {service.code} Division</span>
          </Link>

          <div className="max-w-4xl">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-accent bg-brand-900/80 px-3 py-1 rounded-full border border-accent/20">
              Technical Specialization
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              {sub.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
              {sub.shortDesc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Content & Lead Form Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Scope details (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            
            {/* Image showcase */}
            <div className="relative h-64 sm:h-96 w-full rounded-[32px] overflow-hidden shadow-lg border border-slate-200 bg-white">
              <Image
                src={sub.image}
                alt={sub.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/40 via-transparent to-transparent" />
            </div>

            {/* Detailed Description */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col gap-4">
              <h3 className="font-heading font-extrabold text-brand-950 text-xl">
                Engineering Specifications & Overview
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {sub.fullDesc}
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Elite Standard Limited supplies full turkey services for this discipline. From load calculation, pipe/duct hydraulic sizing, electrical load sharing layouts, and AutoCAD/BIM layouts to final commissioning audits, our engineering teams ensure flawless delivery and regulatory approvals.
              </p>
            </div>

            {/* Checklist of Features */}
            <div className="bg-white p-8 rounded-[32px] border border-slate-200/80 shadow-sm flex flex-col gap-6">
              <h4 className="font-heading font-extrabold text-brand-950 text-base uppercase tracking-wider">
                Key Technical Deployments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sub.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200/60 shadow-sm hover:scale-[1.02] transition-transform"
                  >
                    <FaCheckCircle className="text-emerald-500 text-sm shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-xs font-semibold leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Banner */}
            <div className="bg-brand-900 text-white p-6 rounded-2xl border border-brand-800 flex gap-4 items-center">
              <FaShieldAlt className="text-3xl text-accent shrink-0" />
              <div>
                <h5 className="font-bold text-sm text-white">Strict Compliance Standards</h5>
                <p className="text-slate-300 text-[11px] leading-relaxed mt-0.5">
                  All installations are designed, planned, and validated in complete adherence to **BNBC**, **NFPA**, **ASHRAE**, and relevant international engineering safety guidelines.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Pre-filled quotation form (5/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quote Form Card */}
            <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-200/80 shadow-lg">
              <div className="mb-6 flex flex-col gap-1.5 border-b border-slate-100 pb-4">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 self-start">
                  B2B Lead Portal
                </span>
                <h3 className="font-heading font-extrabold text-brand-950 text-lg">
                  Inquire For {sub.title}
                </h3>
                <p className="text-slate-400 text-xs">
                  Fill out our brief form to receive a structured BOQ estimate.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="sub-quote-form"
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        {...register("fullName")}
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
                      />
                      {errors.fullName && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.fullName.message}</span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Corporate Email</label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="john.doe@company.com"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
                      />
                      {errors.email && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.email.message}</span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Contact Number</label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="+880 17XXXXXXXX"
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.phone.message}</span>
                      )}
                    </div>

                    {/* Company Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Company / Organization</label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="Elite Builders Ltd."
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
                      />
                      {errors.company && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.company.message}</span>
                      )}
                    </div>

                    {/* Project Scale */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Estimated Project Scale</label>
                      <select
                        {...register("projectScale")}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900"
                      >
                        <option value="">Select Project Magnitude</option>
                        <option value="residential-building">Residential High-Rise Complex</option>
                        <option value="commercial-mall-office">Commercial Tower / Shopping Mall</option>
                        <option value="industrial-plant-spinning">Industrial Plant / Textile Spinning Mill</option>
                        <option value="pharmaceutical-cleanroom">Pharmaceutical Sterile Cleanroom Block</option>
                        <option value="metro-rail-infrastructure">Heavy Infrastructure / Metro Rail Station</option>
                      </select>
                      {errors.projectScale && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.projectScale.message}</span>
                      )}
                    </div>

                    {/* Project Details */}
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold text-slate-700">Project Specifics / Requirements</label>
                      <textarea
                        rows={4}
                        {...register("message")}
                        className="w-full bg-slate-50 border border-slate-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-900 resize-none"
                      />
                      {errors.message && (
                        <span className="text-red-500 text-[10px] font-semibold">{errors.message.message}</span>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-brand-950 hover:bg-brand-900 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2 shadow-md"
                    >
                      {isSubmitting ? (
                        <>
                          <FaHourglassHalf className="animate-spin text-xs" />
                          <span>Processing BOQ Form...</span>
                        </>
                      ) : (
                        <span>Request Estimations & Proposal</span>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-200/60 shadow-inner"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mb-4 shadow-md text-xl">
                      <FaThumbsUp />
                    </div>
                    <h4 className="font-heading font-extrabold text-emerald-950 text-base mb-2">
                      Proposal Request Submitted!
                    </h4>
                    <p className="text-[11px] text-emerald-800 leading-relaxed mb-6">
                      Thank you for your interest in our **{sub.title}** solutions. Our engineering division director will review your project parameters and get back to you with a draft estimation proposal within 24 business hours.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="text-xs bg-white text-emerald-900 border border-emerald-200/80 font-bold px-4 py-2.5 rounded-lg hover:bg-emerald-100 transition-colors"
                    >
                      Inquire Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Official Profile CTA Box */}
            <div className="bg-brand-950 text-white p-8 rounded-[32px] border border-brand-900 flex flex-col gap-4 relative overflow-hidden shadow-lg">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              <h4 className="font-heading font-extrabold text-sm text-accent uppercase tracking-wider flex items-center gap-1.5">
                <FaRegClock />
                <span>24/7 Corporate Helpline</span>
              </h4>
              <div className="flex flex-col gap-2.5 text-xs text-slate-300">
                <a href="tel:+8801313663311" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <FaPhoneAlt className="text-accent" />
                  <span className="font-bold text-white">+880 1313-663311</span>
                </a>
                <a href="mailto:elitestandardlimited@gmail.com" className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <FaEnvelope className="text-accent" />
                  <span>elitestandardlimited@gmail.com</span>
                </a>
              </div>
              <a
                href="/elite-standard-profile.pdf"
                download
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs py-3 rounded-lg transition-all mt-2"
              >
                <FaFilePdf className="text-accent" />
                <span>Download Corporate Profile (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaBuilding,
  FaUser,
  FaList,
  FaBriefcase,
} from "react-icons/fa";

// Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  company: z.string().min(2, "Company/Organization name is required"),
  service: z.string().min(1, "Please select an engineering category"),
  message: z.string().min(10, "Message/Scope details must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    reset();
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Header Banner */}
      <section className="bg-brand-950 text-white py-16 sm:py-24 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f1e36_1px,transparent_1px),linear-gradient(to_bottom,#0f1e36_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center gap-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-accent bg-brand-900/60 px-4.5 py-1.5 rounded-full border border-brand-800 shadow-sm">
            Contact & BOQ Request
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight">
            Connect With Our Engineering Team
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Have a project in mind or need an official BOQ estimation? Send us your requirements, and our MEP experts will get back to you within 24 hours.
          </p>
        </div>
      </section>

      {/* 2. Info Cards Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 relative z-20 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Head Office */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent flex items-center justify-center shrink-0 shadow-sm">
              <FaMapMarkerAlt className="text-xl" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-heading font-extrabold text-brand-950 text-base">Headquarters Address</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                House: 187/9, Kamal Soroni Road, Amtola, Dhaka-1216, Bangladesh.
              </p>
              <a
                href="https://maps.google.com/?q=Amtola,+Dhaka,+Bangladesh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-brand-800 hover:text-accent mt-1 transition-colors self-start"
              >
                View on Google Maps &rarr;
              </a>
            </div>
          </motion.div>

          {/* Card 2: Contact Numbers & Email */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent flex items-center justify-center shrink-0 shadow-sm">
              <FaPhoneAlt className="text-xl" />
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <h3 className="font-heading font-extrabold text-brand-950 text-base">Helpline & Email</h3>
              <div className="flex flex-col gap-1 text-slate-600 text-xs sm:text-sm">
                <a
                  href="tel:+8801313663311"
                  className="hover:text-accent transition-colors font-medium flex items-center gap-1.5"
                >
                  <span>+880 1313-663311</span>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100 uppercase">Active</span>
                </a>
                <a
                  href="mailto:elitestandardlimited@gmail.com"
                  className="hover:text-accent transition-colors block break-all"
                >
                  elitestandardlimited@gmail.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Business Hours */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-lg flex items-start gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-brand-900 text-accent flex items-center justify-center shrink-0 shadow-sm">
              <FaClock className="text-xl" />
            </div>
            <div className="flex flex-col gap-1.5">
              <h3 className="font-heading font-extrabold text-brand-950 text-base">Business Hours</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Sunday – Thursday:<br />
                <span className="font-semibold text-brand-950">9:00 AM – 6:00 PM</span>
              </p>
              <span className="text-slate-400 text-[10px] sm:text-xs font-semibold block mt-1">
                Friday & Saturday &bull; Closed
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Main Form & Map Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form (7/12 width on large screen) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg">
            <h2 className="font-heading font-extrabold text-brand-950 text-xl sm:text-2xl mb-2 flex items-center gap-2">
              <span>Request a Quote / Project Inquiry</span>
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mb-8">
              Complete the engineering questionnaire below to specify your system needs.
            </p>

            <AnimatePresence mode="wait">
              {!submitSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-6"
                >
                  {/* Name & Email Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                        <FaUser className="text-slate-400 text-[10px]" />
                        <span>Your Full Name *</span>
                      </label>
                      <input
                        type="text"
                        {...register("name")}
                        placeholder="e.g. John Doe"
                        className={`w-full text-sm px-4 py-3 rounded-xl border ${
                          errors.name ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                        } outline-none transition-all focus:ring-4 focus:ring-brand-900/10`}
                      />
                      {errors.name && (
                        <span className="text-red-500 text-[10px] font-bold">{errors.name.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                        <FaEnvelope className="text-slate-400 text-[10px]" />
                        <span>Email Address *</span>
                      </label>
                      <input
                        type="email"
                        {...register("email")}
                        placeholder="name@company.com"
                        className={`w-full text-sm px-4 py-3 rounded-xl border ${
                          errors.email ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                        } outline-none transition-all focus:ring-4 focus:ring-brand-900/10`}
                      />
                      {errors.email && (
                        <span className="text-red-500 text-[10px] font-bold">{errors.email.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Phone & Company Group */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                        <FaPhoneAlt className="text-slate-400 text-[10px]" />
                        <span>Phone Number *</span>
                      </label>
                      <input
                        type="tel"
                        {...register("phone")}
                        placeholder="e.g. +8801313663311"
                        className={`w-full text-sm px-4 py-3 rounded-xl border ${
                          errors.phone ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                        } outline-none transition-all focus:ring-4 focus:ring-brand-900/10`}
                      />
                      {errors.phone && (
                        <span className="text-red-500 text-[10px] font-bold">{errors.phone.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                        <FaBuilding className="text-slate-400 text-[10px]" />
                        <span>Company Name *</span>
                      </label>
                      <input
                        type="text"
                        {...register("company")}
                        placeholder="e.g. Elite Builders Ltd"
                        className={`w-full text-sm px-4 py-3 rounded-xl border ${
                          errors.company ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                        } outline-none transition-all focus:ring-4 focus:ring-brand-900/10`}
                      />
                      {errors.company && (
                        <span className="text-red-500 text-[10px] font-bold">{errors.company.message}</span>
                      )}
                    </div>
                  </div>

                  {/* Service Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                      <FaList className="text-slate-400 text-[10px]" />
                      <span>Required Service Category *</span>
                    </label>
                    <select
                      {...register("service")}
                      className={`w-full text-sm px-4 py-3 rounded-xl border bg-white ${
                        errors.service ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                      } outline-none transition-all focus:ring-4 focus:ring-brand-900/10`}
                    >
                      <option value="">Select a Category</option>
                      <option value="hvac">HVAC Systems (Heating, Ventilation & AC)</option>
                      <option value="fire">Fire Detection & Protection System (FDPS)</option>
                      <option value="gas">Gas & Utility Distribution System (GUDS)</option>
                      <option value="power">Power Distribution & Control Panels</option>
                      <option value="electrical">Electrical & Lighting Systems</option>
                      <option value="automation">Industrial Building Automation (PLC/BMS)</option>
                      <option value="plumbing">Water Supply & Drainage Systems</option>
                      <option value="water">Water Treatment Systems (ETP/STP/RO)</option>
                      <option value="solar">Renewable & Solar Power Solutions</option>
                      <option value="general">General Corporate Inquiry</option>
                    </select>
                    {errors.service && (
                      <span className="text-red-500 text-[10px] font-bold">{errors.service.message}</span>
                    )}
                  </div>

                  {/* Message Detail */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-extrabold text-brand-950 uppercase tracking-wide flex items-center gap-1.5">
                      <FaBriefcase className="text-slate-400 text-[10px]" />
                      <span>Project Details & Scope *</span>
                    </label>
                    <textarea
                      rows={5}
                      {...register("message")}
                      placeholder="Please outline system specifications, project location, or estimation requirements..."
                      className={`w-full text-sm px-4 py-3 rounded-xl border ${
                        errors.message ? "border-red-500 bg-red-50/20 focus:ring-red-500/20" : "border-slate-200 focus:border-brand-800"
                      } outline-none transition-all focus:ring-4 focus:ring-brand-900/10 resize-none`}
                    />
                    {errors.message && (
                      <span className="text-red-500 text-[10px] font-bold">{errors.message.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 w-full flex items-center justify-center gap-2.5 bg-brand-950 hover:bg-brand-900 text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <FaSpinner className="text-accent text-sm animate-spin" />
                        <span>Validating & Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit BOQ Request</span>
                        <FaPaperPlane className="text-accent text-[11px] group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50/50 border border-emerald-200/80 p-8 rounded-3xl text-center flex flex-col items-center gap-4 my-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md animate-bounce">
                    <FaCheckCircle className="text-3xl" />
                  </div>
                  <div className="flex flex-col gap-1.5 max-w-md">
                    <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      Thank you for contacting Elite Standard Limited. Our technical engineering division has logged your request and will follow up with you within one business day.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-2 bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs px-6 py-2.5 rounded-lg transition-colors border border-brand-900"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Google Map (5/12 width) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-lg overflow-hidden flex flex-col">
              <div className="px-4 py-3 flex items-center gap-2 border-b border-slate-100 mb-3.5">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" />
                <h3 className="font-heading font-extrabold text-xs sm:text-sm text-brand-950 uppercase tracking-wider">
                  Amtola HQ Map View
                </h3>
              </div>

              {/* Embedded Interactive Iframe */}
              <div className="w-full h-[320px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
                <iframe
                  title="Elite Standard Limited headquarters map locator"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.053150534241!2d90.388835!3d23.816694!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c71167b07ef9%3A0x6cfab0c8b05cf14e!2sAmtola%2C+Dhaka+1216!5e0!3m2!1sen!2sbd!4v1680000000000!5m2!1sen!2sbd"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                />
              </div>
            </div>

            {/* Quality Commitment Callout */}
            <div className="bg-brand-950 text-white p-8 rounded-3xl border border-brand-900 flex flex-col gap-3 relative overflow-hidden shadow-lg">
              <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-accent/10 rounded-full blur-xl" />
              <h4 className="font-heading font-extrabold text-sm text-accent uppercase tracking-wider">
                Engineering Integrity
              </h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Elite Standard Limited operates under strict ISO 9001:2015 specifications. All MEP design schematics and BOQ estimates are compiled in absolute compliance with NFPA guidelines, ASHRAE guidelines, and BNBC standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

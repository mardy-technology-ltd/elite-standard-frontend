"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaEnvelopeOpenText,
  FaPaperPlane,
  FaCheckCircle,
  FaShieldAlt,
  FaFileAlt,
  FaRegCalendarAlt,
  FaRegClock,
  FaDownload,
  FaArrowRight,
  FaBookOpen,
  FaIndustry,
  FaBolt,
  FaWater,
  FaSnowflake,
} from "react-icons/fa";

const bulletins = [
  {
    id: "b1",
    issue: "Bulletin #24 — Q3 Edition",
    title: "Tropical VRF Air Conditioning: Optimizing COP & Energy in High Ambient Temperatures",
    category: "HVAC & Thermal Dynamics",
    date: "October 2026",
    readTime: "6 min read",
    icon: FaSnowflake,
    iconColor: "text-sky-400",
    summary:
      "A deep dive into maintaining seasonal energy efficiency ratios (EER) and high COP in VRF multi-split systems operating under ambient temperatures exceeding 48°C in tropical Bangladesh conditions.",
    highlights: [
      "Inverter compressor frequency modulation curves",
      "Oil recovery cycle timing without thermal shock",
      "Modbus/BACnet BMS telemetry integration",
    ],
  },
  {
    id: "b2",
    issue: "Bulletin #23 — Q3 Edition",
    title: "BNBC 2020 & NFPA 20 Compliance: Fire Hydrant & Automatic Sprinkler Standards",
    category: "Life Safety & Protection",
    date: "September 2026",
    readTime: "8 min read",
    icon: FaShieldAlt,
    iconColor: "text-red-400",
    summary:
      "A comprehensive checklist for engineering consultants and facility managers to ensure commercial high-rises meet FSCD statutory clearances and NFPA wet-pipe sprinkler hydraulic calculations.",
    highlights: [
      "Standpipe hydraulic pressure balancing at upper levels",
      "UL/FM listed diesel vs electric main pump redundancy",
      "FSCD inspection clearance procedures in Dhaka",
    ],
  },
  {
    id: "b3",
    issue: "Bulletin #22 — Q2 Edition",
    title: "Industrial Groundwater Treatment: Iron Removal & Desalination for Textile Plants",
    category: "Water Treatment (WTS)",
    date: "August 2026",
    readTime: "7 min read",
    icon: FaWater,
    iconColor: "text-teal-400",
    summary:
      "Comparing catalytic oxidation filtration with ion-exchange aeration for removing dissolved Fe > 8 mg/L and high manganese across industrial zones in Gazipur, Savar, and Narayanganj.",
    highlights: [
      "Birm vs Manganese Greensand media longevity",
      "Backwash frequency calculation for 30,000 LPH plants",
      "Pure RO integration for boiler feedwater standards",
    ],
  },
  {
    id: "b4",
    issue: "Bulletin #21 — Q2 Edition",
    title: "Form-4 Type Tested Switchgear Panels: Protecting High-Capacity Production Lines",
    category: "Electrical & Switchgear",
    date: "July 2026",
    readTime: "5 min read",
    icon: FaBolt,
    iconColor: "text-amber-400",
    summary:
      "Why Form-4B compartmentation is vital in 2500A-4000A LT main distribution boards to prevent internal arc fault propagation and protect operating personnel in continuous factories.",
    highlights: [
      "Separation of busbars from functional units & terminals",
      "Automatic PFI capacitor bank thermal dissipation",
      "Type test verification according to IEC 61439-1/2",
    ],
  },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interest, setInterest] = useState("all");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid work email address");
      return;
    }
    setError("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: name || undefined,
          interest,
          source: "newsletter_page",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to process subscription. Please try again.");
      } else {
        setSubscribed(true);
        setSuccessMsg(data.message || "Thank you for subscribing to Elite Standard Limited engineering bulletins!");
        setEmail("");
        setName("");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Hero Section */}
      <section className="relative bg-brand-950 text-white py-20 lg:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/85 to-brand-950 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-4 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest">
            <FaEnvelopeOpenText />
            <span>Technical Engineering Bulletins</span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Engineering Insights & <span className="text-gradient-accent">Newsletter</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl leading-relaxed">
            Stay ahead with monthly MEP technical papers, BNBC & NFPA regulatory compliance updates, energy optimization guides, and equipment innovations curated by Elite Standard Limited engineers.
          </p>
        </div>
      </section>

      {/* 2. Interactive Subscription Card */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-800 block mb-2">
              Join 4,500+ Engineering Professionals
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950">
              Subscribe to Our Monthly Technical Digest
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
              Zero spam. High-value technical guides, code compliance changes, and HVAC/Fire/Electrical design benchmarks delivered straight to your inbox once a month.
            </p>
          </div>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center flex flex-col items-center gap-3"
            >
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl">
                <FaCheckCircle />
              </div>
              <h3 className="font-heading font-extrabold text-emerald-950 text-xl">
                Welcome to Elite Standard Engineering Insights!
              </h3>
              <p className="text-emerald-800 text-xs sm:text-sm max-w-md">
                {successMsg || "Thank you for subscribing. We have registered your email. You will receive our latest quarterly engineering bulletin in your inbox."}
              </p>
              <button
                onClick={() => setSubscribed(false)}
                className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
              >
                Subscribe another email address
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Engr. Rahim Ahmed"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-800 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Work Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-800 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Primary Engineering Interest
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-brand-800 transition-colors"
                >
                  <option value="all">All Disciplines (Complete MEP & Automation)</option>
                  <option value="hvac">Mechanical & HVAC (VRF, Chillers, Cleanrooms)</option>
                  <option value="fire">Fire Protection (NFPA Sprinklers, Hydrants, FSCD)</option>
                  <option value="electrical">Electrical & Substations (Form-4 Switchgear, PFI, BBT)</option>
                  <option value="water">Water Treatment (IRP, RO Plants, Plumbing Networks)</option>
                </select>
              </div>

              {error && <p className="text-xs text-red-500 font-semibold">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-950 text-white font-bold text-sm py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group mt-2"
              >
                <span>{isSubmitting ? "Subscribing..." : "Subscribe to Monthly Bulletins"}</span>
                <FaPaperPlane className="text-xs text-accent group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <FaShieldAlt className="text-emerald-500" />
                  <span>No Spam Guarantee</span>
                </span>
                <span>•</span>
                <span>One-Click Unsubscribe Anytime</span>
                <span>•</span>
                <span>Monthly Frequency</span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 3. Published Engineering Bulletins Archive */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Technical Knowledge Base
              </span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950">
              Recent Engineering Bulletins
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md">
            Explore whitepapers and research summaries written by our lead electro-mechanical engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bulletins.map((bulletin) => {
            const Icon = bulletin.icon;
            return (
              <div
                key={bulletin.id}
                className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-brand-800/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                      {bulletin.issue}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                      <FaRegCalendarAlt />
                      <span>{bulletin.date}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <Icon className={`text-base ${bulletin.iconColor}`} />
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">
                      {bulletin.category}
                    </span>
                  </div>

                  <h4 className="font-heading text-xl font-bold text-brand-950 group-hover:text-brand-800 transition-colors mb-3 leading-snug">
                    {bulletin.title}
                  </h4>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {bulletin.summary}
                  </p>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Key Engineering Insights:
                    </span>
                    {bulletin.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <FaCheckCircle className="text-emerald-500 text-[10px] shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                    <FaRegClock />
                    <span>{bulletin.readTime}</span>
                  </span>

                  <a
                    href="#subscribe"
                    onClick={(e) => {
                      e.preventDefault();
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 hover:text-accent transition-colors group/link"
                  >
                    <span>Receive in Full PDF</span>
                    <FaArrowRight className="text-[10px] group-link/hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Contact / Custom BOQ Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-3xl p-8 sm:p-12 text-white border border-brand-800 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-accent block mb-2">
              Have a Project Specification in Mind?
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Consult With Our Certified MEP Engineers
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-xl leading-relaxed">
              Submit your architectural layouts or heat load sheets to our engineering team for official BOQ estimation and technical consultation.
            </p>
          </div>

          <Link
            href="/contact?type=quotation"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-bold text-sm px-8 py-4 rounded-xl shadow-cta hover:shadow-2xl transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Request Engineering BOQ</span>
            <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </main>
  );
}

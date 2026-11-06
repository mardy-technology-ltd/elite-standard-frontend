"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  FaTimes,
  FaChevronDown,
  FaSearch,
  FaFilePdf,
} from "react-icons/fa";

interface BulletinItem {
  id: string;
  issue: string;
  title: string;
  category: string;
  date: string;
  readTime?: string | null;
  summary: string;
  highlights: string[];
  imageUrl?: string | null;
  pdfUrl?: string | null;
}

const getCategoryIcon = (category: string) => {
  const cat = category.toLowerCase();
  if (cat.includes("hvac") || cat.includes("air") || cat.includes("thermal")) {
    return { icon: FaSnowflake, color: "text-sky-400" };
  }
  if (cat.includes("fire") || cat.includes("safety") || cat.includes("protection")) {
    return { icon: FaShieldAlt, color: "text-red-400" };
  }
  if (cat.includes("water") || cat.includes("plumbing") || cat.includes("treatment")) {
    return { icon: FaWater, color: "text-teal-400" };
  }
  return { icon: FaBolt, color: "text-amber-400" };
};

export default function NewsletterPage() {
  const [bulletinList, setBulletinList] = useState<BulletinItem[]>([]);
  const [loadingBulletins, setLoadingBulletins] = useState(true);
  const [readingModalBulletin, setReadingModalBulletin] = useState<BulletinItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  React.useEffect(() => {
    async function loadBulletins() {
      try {
        const res = await fetch("/api/bulletins");
        if (res.ok) {
          const data = await res.json();
          if (data.bulletins) {
            setBulletinList(data.bulletins);
          }
        }
      } catch (err) {
        console.error("Failed to load bulletins:", err);
      } finally {
        setLoadingBulletins(false);
      }
    }
    loadBulletins();
  }, []);
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
                  <option value="all">All Disciplines (Complete MEP Engineering & Automation)</option>
                  <option value="mechanical">Mechanical Services (HVAC, Fire Protection & Gas Systems)</option>
                  <option value="electrical">Electrical Services (Switchgear, Automation & Lighting)</option>
                  <option value="plumbing">Plumbing Services (Water Distribution, Treatment & Harvesting)</option>
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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Technical Knowledge Base ({bulletinList.length})
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

        {/* Search & Filter Bar like Careers */}
        <div className="mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:max-w-md">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search bulletins by title, topic or issue..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-800 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {["all", "HVAC", "Safety", "Water", "Electrical"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-950 text-white shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                {cat === "all" ? "All Disciplines" : cat}
              </button>
            ))}
          </div>
        </div>

        {loadingBulletins ? (
          <div className="p-16 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-semibold">Loading technical bulletins...</span>
          </div>
        ) : bulletinList.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <FaBookOpen className="text-3xl text-slate-300 mx-auto mb-2" />
            <h4 className="text-sm font-bold text-slate-800">No bulletins currently available</h4>
            <p className="text-xs text-slate-500 mt-1">Please check back soon for our latest technical releases.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {bulletinList
              .filter((bulletin) => {
                const matchesSearch =
                  bulletin.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bulletin.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bulletin.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  bulletin.category.toLowerCase().includes(searchQuery.toLowerCase());
                const matchesCategory =
                  selectedCategory === "all" ||
                  bulletin.category.toLowerCase().includes(selectedCategory.toLowerCase());
                return matchesSearch && matchesCategory;
              })
              .map((bulletin) => {
                const { icon: Icon, color: iconColor } = getCategoryIcon(bulletin.category);
                return (
                  <div
                    key={bulletin.id}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group hover:border-brand-800/40 flex flex-col lg:flex-row items-stretch justify-between gap-8"
                  >
                    {/* LEFT SIDE: All Bulletin Details + Insights + Buttons */}
                    <div className="flex-1 flex flex-col justify-between gap-6 min-w-0">
                      <div className="flex flex-col gap-3.5">
                        {/* Header Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200/80 text-slate-800 text-[11px] font-bold font-mono">
                            {bulletin.issue}
                          </span>
                          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-[11px] font-bold flex items-center gap-1.5">
                            <Icon className={`text-xs ${iconColor}`} />
                            <span>{bulletin.category}</span>
                          </span>
                          <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-[11px] font-bold flex items-center gap-1.5 shadow-xs">
                            <FaRegClock className="text-xs text-amber-600" />
                            <span>{bulletin.readTime || "5 min read"}</span>
                          </span>
                          <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[11px] font-medium flex items-center gap-1.5">
                            <FaRegCalendarAlt className="text-[10px] text-slate-400" />
                            <span>{bulletin.date}</span>
                          </span>
                        </div>

                        {/* Bulletin Title */}
                        <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-950 group-hover:text-brand-800 transition-colors leading-tight">
                          {bulletin.title}
                        </h3>

                        {/* Summary / Description */}
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {bulletin.summary}
                        </p>

                        {/* Key Engineering Insights Bullet Points */}
                        {bulletin.highlights && bulletin.highlights.length > 0 && (
                          <div className="mt-2 pt-3 border-t border-slate-100 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                                Key Engineering Insights:
                              </span>
                              {bulletin.highlights.length > 3 && (
                                <span className="text-[10px] font-semibold text-brand-800 bg-brand-50 px-2 py-0.5 rounded-full border border-brand-100">
                                  {bulletin.highlights.length} Technical Points
                                </span>
                              )}
                            </div>
                            <div className="space-y-1.5">
                              {bulletin.highlights.slice(0, 3).map((h, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                                  <FaCheckCircle className="text-emerald-500 text-xs mt-0.5 shrink-0" />
                                  <span>{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Bottom Controls Aligned to the Left (like Careers Apply & Review) */}
                      <div className="pt-5 border-t border-slate-100 flex flex-col items-start gap-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setReadingModalBulletin(bulletin)}
                            className="inline-flex items-center justify-center gap-2 bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                          >
                            <FaBookOpen className="text-xs text-amber-400" />
                            <span>Read Full Article & Insights</span>
                          </button>

                          {bulletin.pdfUrl ? (
                            <a
                              href={bulletin.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl border border-slate-200 transition-all cursor-pointer"
                            >
                              <FaDownload className="text-xs text-slate-600" />
                              <span>Download PDF</span>
                            </a>
                          ) : (
                            <a
                              href="#subscribe"
                              onClick={(e) => {
                                e.preventDefault();
                                window.scrollTo({ top: 200, behavior: "smooth" });
                              }}
                              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
                            >
                              <span>Request Whitepaper (PDF)</span>
                              <FaArrowRight className="text-xs" />
                            </a>
                          )}
                        </div>

                        <span className="text-[10px] text-slate-400 font-medium pl-1">
                          Curated by Elite Standard Electro-Mechanical Technical Research Board
                        </span>
                      </div>
                    </div>

                    {/* RIGHT SIDE: Featured Article Banner Card (Matching Careers Card Right Banner Style) */}
                    <div className="shrink-0 w-full lg:w-[360px] xl:w-[400px] flex flex-col justify-center">
                      <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-br from-brand-950 via-brand-900 to-slate-900 text-white min-h-[220px] lg:min-h-[260px] flex flex-col justify-between group/card">
                        {bulletin.imageUrl ? (
                          <div className="relative w-full h-full min-h-[220px] lg:min-h-[260px] flex flex-col justify-between overflow-hidden">
                            <Image
                              src={bulletin.imageUrl}
                              alt={bulletin.title}
                              fill
                              className="object-cover group-hover/card:scale-105 transition-transform duration-500 brightness-75"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-950/95 via-brand-950/40 to-transparent" />

                            <div className="relative z-10 p-5 flex items-center justify-between">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-amber-300 border border-white/20">
                                {bulletin.issue}
                              </span>
                              <span className="px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 flex items-center gap-1.5">
                                <Icon className={`text-xs ${iconColor}`} />
                                <span>{bulletin.category}</span>
                              </span>
                            </div>

                            <div className="relative z-10 p-5 pt-0">
                              <h4 className="font-heading font-extrabold text-base sm:text-lg text-white line-clamp-2 leading-snug group-hover/card:text-accent transition-colors drop-shadow-md">
                                {bulletin.title}
                              </h4>
                              <div className="pt-3 mt-3 border-t border-white/20 flex items-center justify-between text-xs text-slate-200">
                                <span className="flex items-center gap-1.5 font-medium">
                                  <FaRegClock className="text-accent" />
                                  <span>{bulletin.readTime || "5 min read"}</span>
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setReadingModalBulletin(bulletin)}
                                  className="inline-flex items-center gap-1.5 text-accent font-bold hover:underline cursor-pointer"
                                >
                                  <span>Read Details</span>
                                  <FaArrowRight className="text-[10px]" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[220px] lg:min-h-[260px]">
                            <div className="relative z-10 flex flex-col gap-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/10 text-amber-300 border border-white/10">
                                  {bulletin.issue}
                                </span>
                                <Icon className={`text-xl ${iconColor}`} />
                              </div>
                              <div>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                                  Technical Whitepaper
                                </span>
                                <h4 className="font-heading font-extrabold text-base sm:text-lg text-white mt-1 line-clamp-3 leading-snug group-hover/card:text-accent transition-colors">
                                  {bulletin.title}
                                </h4>
                              </div>
                            </div>

                            <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                              <span className="flex items-center gap-1.5 font-medium">
                                <FaRegClock className="text-accent" />
                                <span>{bulletin.readTime || "5 min read"}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => setReadingModalBulletin(bulletin)}
                                className="inline-flex items-center gap-1.5 text-accent font-bold hover:underline cursor-pointer"
                              >
                                <span>Read Synopsis</span>
                                <FaArrowRight className="text-[10px]" />
                              </button>
                            </div>

                            {/* Subtle decorative background watermark icon */}
                            <Icon className="absolute -right-4 -bottom-4 text-8xl text-white/5 pointer-events-none transform -rotate-12" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* FULL ARTICLE & INSIGHTS READER MODAL */}
        {readingModalBulletin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[85vh] flex flex-col">
              {/* Header */}
              <div className="bg-brand-950 text-white p-6 sm:p-8 flex items-start justify-between gap-4 border-b border-brand-900 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-extrabold uppercase px-2.5 py-1 rounded-md bg-white/10 text-slate-300 border border-white/10">
                      {readingModalBulletin.issue}
                    </span>
                    <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                      {readingModalBulletin.category}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-lg sm:text-2xl text-white leading-snug">
                    {readingModalBulletin.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
                    <span className="flex items-center gap-1">
                      <FaRegCalendarAlt />
                      <span>{readingModalBulletin.date}</span>
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-1">
                      <FaRegClock />
                      <span>{readingModalBulletin.readTime || "5 min read"}</span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setReadingModalBulletin(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-brand-900 transition-colors shrink-0 cursor-pointer"
                  title="Close Reader"
                >
                  <FaTimes className="text-lg" />
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Executive Synopsis / Summary
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    {readingModalBulletin.summary}
                  </p>
                </div>

                {readingModalBulletin.highlights && readingModalBulletin.highlights.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Key Engineering Insights ({readingModalBulletin.highlights.length} Technical Points)
                      </h4>
                    </div>

                    <div className="space-y-3 bg-white p-5 rounded-2xl border border-slate-200">
                      {readingModalBulletin.highlights.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 leading-relaxed">
                          <FaCheckCircle className="text-emerald-500 text-sm mt-0.5 shrink-0" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 shrink-0">
                <button
                  type="button"
                  onClick={() => setReadingModalBulletin(null)}
                  className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Close Reader
                </button>

                {readingModalBulletin.pdfUrl ? (
                  <a
                    href={readingModalBulletin.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <FaDownload className="text-xs" />
                    <span>Download Full Engineering Document (PDF)</span>
                  </a>
                ) : (
                  <a
                    href="#subscribe"
                    onClick={(e) => {
                      e.preventDefault();
                      setReadingModalBulletin(null);
                      window.scrollTo({ top: 200, behavior: "smooth" });
                    }}
                    className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    <span>Subscribe to Receive Complete Whitepaper</span>
                    <FaArrowRight className="text-xs" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
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

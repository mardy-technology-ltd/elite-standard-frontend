"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { blogsData, BlogItem } from "@/lib/mockData";
import { FaCalendarAlt, FaUser, FaClock, FaArrowRight, FaFolderOpen, FaSearch } from "react-icons/fa";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(blogsData.map((blog) => blog.category)))];

  const filteredBlogs = blogsData.filter((blog) => {
    if (selectedCategory === "All") return true;
    return blog.category === selectedCategory;
  });

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Page Hero Banner */}
      <section className="relative bg-brand-950 text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1920&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/80 to-brand-950 pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <div className="inline-flex items-center gap-2 bg-accent/15 border border-accent/30 px-3 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest">
            <FaFolderOpen />
            <span>Editorial & Insights</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Technical Insights & <span className="text-gradient-accent">News</span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl">
            Stay updated with our technical guides, MEP energy saving strategies, and safety compliance news.
          </p>
        </div>
      </section>

      {/* 2. Category Filter buttons */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-10 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading font-extrabold text-xl text-brand-950">
              Explore Articles
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Filter technical blogs by category to find relevant insights.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat
                    ? "bg-brand-950 text-white border-brand-950 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:text-brand-950 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredBlogs.length > 0 ? (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredBlogs.map((blog: BlogItem, idx: number) => (
                <article
                  key={blog.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between group"
                >
                  <div className="flex flex-col h-full">
                    {/* Blog Image banner */}
                    <div className="h-56 relative overflow-hidden shrink-0">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 left-4 bg-brand-900/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-accent border border-accent/30 uppercase">
                        {blog.category}
                      </div>
                    </div>

                    {/* Content area */}
                    <div className="p-6 flex flex-col flex-grow gap-4">
                      <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
                        <span className="flex items-center gap-1.5">
                          <FaCalendarAlt className="text-accent" />
                          {blog.publishedAt}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <FaClock className="text-slate-400" />
                          {blog.readTime}
                        </span>
                      </div>

                      <h4 className="font-heading font-bold text-xl text-brand-950 group-hover:text-accent transition-colors leading-snug line-clamp-3">
                        {blog.title}
                      </h4>
                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-2 flex-grow">
                        {blog.summary}
                      </p>
                    </div>

                    {/* Footer Call to action */}
                    <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between rounded-b-2xl">
                      <span className="text-[11px] text-slate-500 flex items-center gap-1.5 font-bold uppercase tracking-wider">
                        <FaUser className="text-[12px] text-slate-400" />
                        <span className="truncate max-w-[120px]">{blog.author}</span>
                      </span>

                      <Link
                        href={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-900 group-hover:text-accent uppercase tracking-wider transition-colors"
                      >
                        <span>Read More</span>
                        <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 bg-white border border-slate-200 rounded-2xl flex flex-col items-center gap-3"
            >
              <FaSearch className="text-slate-300 text-4xl" />
              <h4 className="font-heading font-bold text-lg text-brand-950">
                No articles found
              </h4>
              <p className="text-slate-500 text-sm">
                Try selecting a different category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

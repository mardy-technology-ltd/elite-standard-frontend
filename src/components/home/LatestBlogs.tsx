"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { blogsData, BlogItem } from "@/lib/mockData";
import { FaCalendarAlt, FaUser, FaClock, FaArrowRight } from "react-icons/fa";

export default function LatestBlogs() {
  return (
    <section className="py-24 bg-slate-50 text-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-8 h-0.5 bg-accent" />
              <span className="text-xs font-extrabold text-brand-800 uppercase tracking-widest">
                Technical Insights & News
              </span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-950 tracking-tight leading-tight">
              Latest Engineering <span className="text-gradient">Articles & Blogs</span>
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Stay updated with technical guides, MEP energy saving strategies, and safety compliance news.
            </p>
          </div>

          <Link
            href="/blog"
            className="group hidden md:inline-flex items-center gap-2 text-brand-800 hover:text-accent font-bold text-sm bg-white border border-slate-200 hover:bg-brand-900 px-5 py-3 rounded-lg shadow-sm transition-all duration-300"
          >
            <span>View All Articles</span>
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogsData.map((blog: BlogItem, idx: number) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:border-brand-800/40 transition-all duration-300 flex flex-col sm:flex-row justify-between"
            >
              {/* Image Thumbnail */}
              <div className="relative h-56 sm:h-auto sm:w-5/12 overflow-hidden shrink-0">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 40vw"
                />
                <div className="absolute top-3 left-3 bg-brand-900/90 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-accent border border-accent/30 uppercase">
                  {blog.category}
                </div>
              </div>

              {/* Body */}
              <div className="p-7 sm:w-7/12 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-accent text-[11px]" />
                      {blog.publishedAt}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-slate-400 text-[11px]" />
                      {blog.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-brand-950 group-hover:text-brand-800 transition-colors mb-3 leading-snug line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-4">
                    {blog.summary}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 font-medium">
                    <FaUser className="text-[10px] text-slate-400" />
                    {blog.author}
                  </span>

                  <Link
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-800 group-hover:text-accent uppercase tracking-wider"
                  >
                    <span>Read Article</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

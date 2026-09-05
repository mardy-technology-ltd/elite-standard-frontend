import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogsData } from "@/lib/mockData";
import { FaCalendarAlt, FaUser, FaClock, FaArrowLeft } from "react-icons/fa";
import ShareButtons from "@/components/common/ShareButtons";

// Required for Next.js static export if needed, or simply typed props for dynamic routes
export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const blog = blogsData.find((b) => b.slug === params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* 1. Article Hero Banner */}
      <section className="relative bg-brand-950 text-white pt-24 pb-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('${blog.image}')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-brand-950/90 to-brand-950/80 pointer-events-none" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider mb-8"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Articles</span>
          </Link>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-widest backdrop-blur-sm">
              {blog.category}
            </span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <FaUser className="text-accent" />
              <span className="text-white font-bold">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-accent" />
              <span>{blog.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-accent" />
              <span>{blog.readTime} read</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Article Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-xl">
          {/* Summary / Lead paragraph */}
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed mb-10 border-l-4 border-accent pl-6 py-2">
            {blog.summary}
          </p>

          {/* Main Body */}
          <div className="prose prose-slate prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-brand-950 prose-a:text-accent hover:prose-a:text-brand-800 prose-img:rounded-xl">
            {/* Since mockData doesn't have a rich content field yet, we render a beautiful placeholder structure based on the summary */}
            <p>
              In the rapidly evolving landscape of engineering and infrastructure, {blog.title.toLowerCase()} has emerged as a critical focal point. As outlined in recent technical reviews, organizations must adapt to stringent requirements while maintaining operational efficiency.
            </p>
            
            <h3>Core Challenges & Methodologies</h3>
            <p>
              Implementing comprehensive solutions requires a multi-disciplinary approach. For <strong>{blog.category}</strong> projects, the integration of advanced diagnostic tools with traditional engineering robustness ensures a resilient architecture.
            </p>
            
            <ul>
              <li>Initial site assessment and technical audits.</li>
              <li>Compliance with national and international standards (e.g., BNBC, NFPA).</li>
              <li>Continuous monitoring and predictive maintenance strategies.</li>
            </ul>

            <h3>Conclusion</h3>
            <p>
              As Elite Standard Limited continues to pioneer advancements in this sector, our commitment to excellence remains unwavering. By prioritizing both innovation and safety, we deliver projects that stand the test of time.
            </p>
          </div>
          
          {/* Share & Footer */}
          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Share this article
            </p>
            <ShareButtons title={blog.title} />
          </div>
        </div>
      </section>
    </main>
  );
}

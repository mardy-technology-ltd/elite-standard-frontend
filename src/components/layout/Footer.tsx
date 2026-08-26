"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPaperPlane,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }
    setError("");
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-brand-950 text-slate-300 pt-16 pb-8 border-t border-brand-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Column 1: Brand Info & Accreditation (Col span 2 on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-4 group shrink-0">
              {/* Prominent White Background Badge (Enlarged to 80px) */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-white p-2.5 rounded-2xl shadow-lg border border-white/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/assets/logo.svg"
                  alt="Elite Standard Limited Logo"
                  width={80}
                  height={80}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-heading font-extrabold text-xl sm:text-2xl text-white tracking-tight leading-none group-hover:text-accent transition-colors">
                  ELITE STANDARD LIMITED
                </span>
                <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-slate-400 uppercase mt-1.5 animate-pulse">
                  Drive for Innovation & Excellence
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Elite Standard Limited is a premier engineering solutions provider specializing in comprehensive MEP (Mechanical, Electrical & Plumbing) design, HVAC, fire protection, industrial automation, and power distribution systems.
            </p>

            <div className="flex items-center gap-2 text-xs text-amber-400 bg-brand-900/60 p-3 rounded-lg border border-brand-800/50 w-fit">
              <FaShieldAlt className="text-accent text-sm" />
              <span className="font-semibold">ISO 9001:2015 & Fire Safety Certified Enterprise</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
              >
                <FaLinkedinIn className="text-sm" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
              >
                <FaFacebookF className="text-sm" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
              >
                <FaYoutube className="text-sm" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide border-l-2 border-accent pl-3">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  About Elite Standard
                </Link>
              </li>
              <li>
                <Link href="/sectors" className="hover:text-accent transition-colors">
                  Industries & Sectors
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-accent transition-colors">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-accent transition-colors">
                  Engineering Products
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-accent transition-colors">
                  News & Insights
                </Link>
              </li>
              <li>
                <Link href="/career" className="hover:text-accent transition-colors">
                  Careers & Hiring
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core MEP Services */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide border-l-2 border-accent pl-3">
              Core Services
            </h3>
            <ul className="flex flex-col gap-2.5 text-sm text-slate-400">
              <li>
                <Link href="/services/hvac" className="hover:text-accent transition-colors">
                  HVAC Systems Design
                </Link>
              </li>
              <li>
                <Link href="/services/fdps" className="hover:text-accent transition-colors">
                  Fire Detection & Protection
                </Link>
              </li>
              <li>
                <Link href="/services/guds" className="hover:text-accent transition-colors">
                  Gas & Utility Systems
                </Link>
              </li>
              <li>
                <Link href="/services/pdcp" className="hover:text-accent transition-colors">
                  Power Distribution Panels
                </Link>
              </li>
              <li>
                <Link href="/services/eels" className="hover:text-accent transition-colors">
                  Electrical & Lighting
                </Link>
              </li>
              <li>
                <Link href="/services/iba" className="hover:text-accent transition-colors">
                  Industrial Building Automation
                </Link>
              </li>
              <li>
                <Link href="/services/wts" className="hover:text-accent transition-colors">
                  Water Treatment Systems
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Direct Contact */}
          <div className="flex flex-col gap-4">
            <h3 className="font-heading font-bold text-white text-base tracking-wide border-l-2 border-accent pl-3">
              Stay Updated
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe to receive engineering updates, technical insights, and company news.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full bg-brand-900 border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-accent hover:bg-amber-600 text-brand-950 px-3 rounded-md font-bold text-xs flex items-center justify-center transition-colors"
                >
                  <FaPaperPlane className="text-xs" />
                </button>
              </div>

              {error && <span className="text-[11px] text-red-400">{error}</span>}
              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <FaCheckCircle />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>

            <div className="pt-2 flex flex-col gap-2 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="text-accent text-sm mt-0.5 shrink-0" />
                <span>House: 187/9, Kamal Soroni Road, Amtola, Dhaka-1216, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FaPhoneAlt className="text-accent text-xs shrink-0" />
                <a href="tel:+8801313663311" className="hover:text-accent transition-colors">+880 1313-663311</a>
              </div>
              <div className="flex items-center gap-2.5">
                <FaEnvelope className="text-accent text-xs shrink-0" />
                <a href="mailto:elitestandardlimited@gmail.com" className="hover:text-accent transition-colors">elitestandardlimited@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Elite Standard Limited. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap" className="hover:text-slate-300 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

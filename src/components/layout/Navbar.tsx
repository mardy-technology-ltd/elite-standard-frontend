"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaCog, FaBars, FaTimes, FaArrowRight, FaPhoneAlt, FaPaperPlane } from "react-icons/fa";

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Sectors", href: "/sectors" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-3"
          : "bg-white py-4 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-brand-800 to-brand-950 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
              <FaCog className="text-xl text-accent group-hover:rotate-90 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-lg sm:text-xl text-brand-900 tracking-tight leading-none group-hover:text-brand-800 transition-colors">
                ELITE STANDARD
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mt-0.5">
                Limited &bull; MEP Engineering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-all duration-150 relative ${
                    isActive
                      ? "text-brand-800 font-bold bg-brand-50"
                      : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact?type=quotation"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-semibold text-xs px-4 py-2.5 rounded-md shadow-cta hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Request Quotation</span>
              <FaPaperPlane className="text-[10px]" />
            </Link>

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-700 hover:text-brand-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <FaTimes className="text-xl text-brand-900" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 xl:hidden"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 xl:hidden overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                          isActive
                            ? "text-brand-800 bg-brand-50 border-l-4 border-accent"
                            : "text-slate-700 hover:bg-slate-50 hover:text-brand-800"
                        }`}
                      >
                        <span>{item.label}</span>
                        <FaArrowRight className={`text-xs ${isActive ? "text-accent" : "text-slate-300"}`} />
                      </Link>
                    );
                  })}
                </nav>

                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <Link
                    href="/contact?type=quotation"
                    className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold text-sm py-3 rounded-lg shadow-md transition-colors"
                  >
                    <span>Request Quotation</span>
                    <FaPaperPlane className="text-xs" />
                  </Link>

                  <a
                    href="tel:+8801700000000"
                    className="w-full flex items-center justify-center gap-2 bg-brand-900 text-white font-medium text-xs py-2.5 rounded-lg hover:bg-brand-800 transition-colors"
                  >
                    <FaPhoneAlt className="text-accent text-xs" />
                    <span>Call Sales: +880 1700-000000</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

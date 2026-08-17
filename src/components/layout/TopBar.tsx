import React from "react";
import { FaPhoneAlt, FaEnvelope, FaClock, FaLinkedinIn, FaFacebookF, FaTwitter, FaYoutube, FaMapMarkerAlt } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="bg-brand-950 text-slate-300 text-xs py-2 border-b border-brand-900/60 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left Side: Contact Information & Hours */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
          <a
            href="tel:+8801700000000"
            className="flex items-center gap-2 hover:text-accent transition-colors duration-150 group"
          >
            <FaPhoneAlt className="text-accent text-[11px] group-hover:scale-110 transition-transform" />
            <span className="font-medium">+880 1700-000000</span>
          </a>

          <a
            href="mailto:info@elitestandard.com"
            className="flex items-center gap-2 hover:text-accent transition-colors duration-150 group"
          >
            <FaEnvelope className="text-accent text-[11px] group-hover:scale-110 transition-transform" />
            <span>info@elitestandard.com</span>
          </a>

          <div className="hidden lg:flex items-center gap-2 text-slate-400">
            <FaClock className="text-slate-400 text-[11px]" />
            <span>Sun - Thu: 9:00 AM - 6:00 PM</span>
          </div>

          <div className="hidden xl:flex items-center gap-2 text-slate-400">
            <FaMapMarkerAlt className="text-slate-400 text-[11px]" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>

        {/* Right Side: Social Media Links */}
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-slate-400 font-sans tracking-wide">Follow Us:</span>
          <div className="flex items-center gap-2">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-6 h-6 rounded-full bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
            >
              <FaLinkedinIn className="text-[10px]" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-6 h-6 rounded-full bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
            >
              <FaFacebookF className="text-[10px]" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-6 h-6 rounded-full bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
            >
              <FaTwitter className="text-[10px]" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-6 h-6 rounded-full bg-brand-900 hover:bg-accent hover:text-brand-950 flex items-center justify-center transition-all duration-200"
            >
              <FaYoutube className="text-[10px]" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

export default function FloatingSocials() {
  const socials = [
    {
      id: "phone",
      name: "Call Us (+880 1313-663311)",
      icon: FaPhoneAlt,
      href: "tel:+8801313663311",
      style:
        "bg-white/90 text-amber-600 border-slate-200/80 hover:bg-amber-500 hover:text-white hover:border-amber-500 shadow-md hover:shadow-lg",
    },
    {
      id: "whatsapp",
      name: "Chat on WhatsApp",
      icon: FaWhatsapp,
      href: "https://wa.me/8801313663311",
      style:
        "bg-white/90 text-emerald-600 border-slate-200/80 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 shadow-md hover:shadow-lg",
    },
    {
      id: "email",
      name: "Send Email",
      icon: FaEnvelope,
      href: "mailto:elitestandardlimited@gmail.com",
      style:
        "bg-white/90 text-sky-600 border-slate-200/80 hover:bg-sky-500 hover:text-white hover:border-sky-500 shadow-md hover:shadow-lg",
    },
    {
      id: "linkedin",
      name: "LinkedIn Profile",
      icon: FaLinkedinIn,
      href: "https://linkedin.com",
      style:
        "bg-white/90 text-blue-600 border-slate-200/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 shadow-md hover:shadow-lg",
    },
    {
      id: "facebook",
      name: "Facebook Page",
      icon: FaFacebookF,
      href: "https://facebook.com",
      style:
        "bg-white/90 text-indigo-600 border-slate-200/80 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-md hover:shadow-lg",
    },
  ];

  return (
    <aside
      aria-label="Social Contacts"
      className="fixed right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center"
    >
      {/* Completely Transparent Container */}
      <div className="flex flex-col gap-3 items-center">
        {socials.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="relative group flex items-center">
              {/* Tooltip on left hover */}
              <div className="absolute right-full mr-3 hidden group-hover:flex items-center pointer-events-none z-50">
                <span className="bg-slate-900 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg border border-slate-800 shadow-xl whitespace-nowrap">
                  {item.name}
                </span>
                <span className="w-2 h-2 bg-slate-900 rotate-45 border-t border-r border-slate-800 -ml-1" />
              </div>

              {/* Icon Link Button */}
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : "_self"}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={item.name}
                className={`w-10 h-10 rounded-full border backdrop-blur-md ${item.style} flex items-center justify-center transition-all duration-300 hover:scale-115`}
              >
                <Icon className="text-base" />
              </a>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

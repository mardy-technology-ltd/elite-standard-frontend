import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FaSitemap, FaArrowLeft, FaChevronRight } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Sitemap | Elite Standard Limited",
  description: "Directory list of all pages and services provided by Elite Standard Limited.",
};

const mainLinks = [
  { label: "Home Page", href: "/", desc: "Elite Standard Limited corporate landing page." },
  { label: "About Us", href: "/about", desc: "Our story, corporate timeline, values, leadership team, and structure." },
  { label: "Industry Sectors", href: "/sectors", desc: "Residential, commercial, and industrial segments we serve." },
  { label: "Featured Projects", href: "/projects", desc: " Landmark engineering projects completed across Bangladesh." },
  { label: "Products Catalog", href: "/products", desc: "Premium MEP machinery, switchgear, fire safety pumps, and climate control units." },
  { label: "Engineering Blog", href: "/blog", desc: "Technical articles, guides, energy saving strategies, and news." },
  { label: "Careers & Hiring", href: "/career", desc: "Job openings and career opportunities for specialists." },
  { label: "Contact Us", href: "/contact", desc: "Get in touch or request a detailed BOQ quote." },
];

const serviceLinks = [
  { label: "HVAC Systems Design", href: "/services/hvac", desc: "VRF, central chillers, cleanroom AHUs, and precision ACs." },
  { label: "Fire Detection & Protection", href: "/services/fdps", desc: "NFPA addressable fire alarms, sprinklers, gas suppression, and hydrants." },
  { label: "Gas & Utility Systems", href: "/services/guds", desc: "LPG/Natural Gas networks, manifolds, and interlocking systems." },
  { label: "Power Distribution Panels", href: "/services/pdcp", desc: "LT/HT panels, PFI plants, substations, and VFD MCCs." },
  { label: "Electrical & Lighting", href: "/services/eels", desc: "Busbar trunking (BBT), ESE lightning grids, and DALI LED networks." },
  { label: "Industrial Building Automation", href: "/services/iba", desc: "Siemens/Schneider PLCs, SCADA setups, and BMS telemetry." },
  { label: "Water Supply & Drainage", href: "/services/wsds", desc: "Booster pump stations, risers, and stormwater harvesting." },
  { label: "Water Treatment Systems", href: "/services/wts", desc: "Effluent treatment (ETP/ZLD), sewage treatment (STP), RO, and DM plants." },
  { label: "Renewable & Solar Solutions", href: "/services/rhs", desc: "Mono PERC rooftop solar PV plants, net metering, and hybrid inverters." },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy", desc: "How we collect, manage, and secure your personal details." },
  { label: "Terms of Service", href: "/terms", desc: "Guidelines and rules governing the use of our services." },
  { label: "Sitemap Directory", href: "/sitemap", desc: "This directory page containing all active portal routes." },
];

export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-800 hover:text-accent uppercase tracking-wider mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col gap-8">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-900 text-accent flex items-center justify-center shadow-md">
              <FaSitemap className="text-xl" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
                Sitemap Directory
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Visual index of all sections and routes in the portal
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left: General Pages */}
            <div className="flex flex-col gap-6">
              <h2 className="font-heading font-extrabold text-lg text-brand-950 border-b border-slate-100 pb-2">
                Corporate Pages
              </h2>
              <div className="flex flex-col gap-4">
                {mainLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all"
                  >
                    <FaChevronRight className="text-accent text-[10px] mt-1.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                    <div>
                      <span className="font-bold text-sm text-brand-950 group-hover:text-brand-800 transition-colors block">
                        {link.label}
                      </span>
                      <span className="text-xs text-slate-500 block mt-0.5">
                        {link.desc}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Services & Legal */}
            <div className="flex flex-col gap-10">
              {/* Services Section */}
              <div className="flex flex-col gap-6">
                <h2 className="font-heading font-extrabold text-lg text-brand-950 border-b border-slate-100 pb-2">
                  Engineering Divisions
                </h2>
                <div className="flex flex-col gap-4">
                  {serviceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all"
                    >
                      <FaChevronRight className="text-accent text-[10px] mt-1.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <span className="font-bold text-sm text-brand-950 group-hover:text-brand-800 transition-colors block">
                          {link.label}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {link.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Legal Section */}
              <div className="flex flex-col gap-6">
                <h2 className="font-heading font-extrabold text-lg text-brand-950 border-b border-slate-100 pb-2">
                  Legal & Notices
                </h2>
                <div className="flex flex-col gap-4">
                  {legalLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/80 transition-all"
                    >
                      <FaChevronRight className="text-accent text-[10px] mt-1.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                      <div>
                        <span className="font-bold text-sm text-brand-950 group-hover:text-brand-800 transition-colors block">
                          {link.label}
                        </span>
                        <span className="text-xs text-slate-500 block mt-0.5">
                          {link.desc}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

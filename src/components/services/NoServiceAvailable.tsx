import React from "react";
import Link from "next/link";
import { FaTools, FaArrowLeft, FaPhoneAlt, FaEnvelope, FaChevronRight } from "react-icons/fa";

interface NoServiceAvailableProps {
  title?: string;
  slug?: string;
  message?: string;
}

const serviceNameMap: Record<string, string> = {
  hvac: "Heating, Ventilation & Air Conditioning (HVAC)",
  "hvac-systems": "Heating, Ventilation & Air Conditioning (HVAC)",
  fdps: "Fire Detection & Protection System (FDPS)",
  guds: "Gas & Utility Distribution System (GUDS)",
  pdcp: "Power Distribution & Control Panel (PDCP)",
  eels: "Electrical & Lighting Systems (EELS)",
  iba: "Industrial Building Automation (IBA)",
  wsds: "Water Supply & Drainage Systems (WSDS)",
  wts: "Water Treatment Systems (WTS)",
  rhs: "Renewable & Solar Solutions (RHS)",
  stas: "Substation, Transformer & Automation System (STAS)",
  elv: "Extra Low Voltage & Security (ELV)",
  bms: "Industrial Building Automation & BMS",
  "wtp-stp": "Water Treatment Systems (WTP / STP)",
  rwh: "Rainwater Harvesting & Renewable Solutions",
};

export function getServiceFullName(slugOrCode?: string): string {
  if (!slugOrCode) return "Engineering Service";
  const normalized = slugOrCode.toLowerCase().trim();
  if (serviceNameMap[normalized]) {
    return serviceNameMap[normalized];
  }
  // Handle sub-service routes e.g. "fdps/alarm" or "wts/irp"
  const parts = normalized.split("/");
  if (parts.length === 2 && serviceNameMap[parts[0]]) {
    const parent = serviceNameMap[parts[0]];
    const subClean = parts[1].replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${subClean} - ${parent}`;
  }
  return slugOrCode
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function NoServiceAvailable({
  title,
  slug,
  message,
}: NoServiceAvailableProps) {
  const displayName = title || getServiceFullName(slug);

  return (
    <main className="min-h-[80vh] flex flex-col justify-center bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-brand-900 transition-colors">
            Home
          </Link>
          <FaChevronRight className="text-[9px] text-slate-400" />
          <Link href="/services" className="hover:text-brand-900 transition-colors">
            Services
          </Link>
          <FaChevronRight className="text-[9px] text-slate-400" />
          <span className="text-brand-900 font-bold">{displayName}</span>
        </nav>
      </div>

      <div className="max-w-2xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 text-center flex flex-col items-center">
        {/* Engineering Icon Badge */}
        <div className="w-20 h-20 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-3xl mb-6 shadow-inner">
          <FaTools className="text-accent" />
        </div>

        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 mb-4">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>Status: No Service Available</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-950 tracking-tight mb-3">
          No Service Available: {displayName}
        </h1>

        {/* Informative Subtitle */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
          {message || (
            <>
              Technical specifications and BOQ packages for{" "}
              <strong className="font-bold text-brand-900">"{displayName}"</strong>{" "}
              have not been published yet or are currently under engineering review. No hardcoded or dummy specifications are displayed.
            </>
          )}
        </p>

        {/* Immediate Engineering Support Box */}
        <div className="w-full bg-slate-50 rounded-2xl p-4 border border-slate-200/60 mb-8 flex flex-col sm:flex-row items-center justify-around gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-accent" />
            <span className="font-semibold text-slate-800">+880 1713-248444</span>
          </div>
          <div className="hidden sm:block text-slate-300">•</div>
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-accent" />
            <span className="font-semibold text-slate-800">info@elitestandard.com</span>
          </div>
        </div>

        {/* Interactive Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-900 hover:bg-brand-950 text-white font-bold text-xs shadow-md transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Explore Published Services</span>
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-amber-400 text-brand-950 font-bold text-xs shadow-md transition-colors"
          >
            <span>Request Custom Consultation</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaArrowRight,
  FaPhoneAlt,
  FaPaperPlane,
  FaChevronDown,
  FaChevronRight,
  FaSnowflake,
  FaFireExtinguisher,
  FaBolt,
  FaMicrochip,
  FaLightbulb,
  FaIndustry,
  FaShower,
  FaWater,
  FaSun,
  FaShieldAlt,
  FaHome,
  FaBuilding,
} from "react-icons/fa";

export interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Products", href: "/products", hasDropdown: true },
  { label: "Sectors", href: "/sectors", hasDropdown: true },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Career", href: "/career" },
  { label: "Contact", href: "/contact" },
];

export interface SectorItem {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
}

export const sectorItems: SectorItem[] = [
  { title: "Residential Sector", desc: "Premium MEP services for high-rise condos & luxury apartments.", href: "/sectors#residential", icon: <FaHome className="text-emerald-500" /> },
  { title: "Commercial Sector", desc: "Central chiller systems & automated controls for corporate spaces.", href: "/sectors#commercial", icon: <FaBuilding className="text-blue-500" /> },
  { title: "Industrial Sector", desc: "Cleanrooms, substations, and automated lines for factories.", href: "/sectors#industrial", icon: <FaIndustry className="text-amber-500" /> },
];

export interface SubService {
  title: string;
  desc: string;
  href: string;
}

export interface ServiceCategory {
  id: string;
  slug: string;
  code: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  subServices: SubService[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "s1",
    slug: "hvac",
    code: "HVAC",
    title: "Heating, Ventilation & Air Conditioning",
    shortDesc: "VRF systems, chilled water plants, and cleanroom AHU.",
    icon: <FaSnowflake className="text-sky-500" />,
    subServices: [
      { title: "VRF/VRV Multi-Split Systems", desc: "Tropical high-COP outdoor units", href: "/services/hvac/vrf" },
      { title: "Chilled Water Plant Setup", desc: "Centrifugal chillers & cooling towers", href: "/services/hvac/chillers" },
      { title: "Cleanroom AHU & HEPA Filtration", desc: "ISO Class 5-8 positive pressure", href: "/services/hvac/cleanroom" },
      { title: "Data Center Precision AC", desc: "N+1 redundant precision cooling", href: "/services/hvac/precision" },
    ],
  },
  {
    id: "s2",
    slug: "fdps",
    code: "FDPS",
    title: "Fire Detection & Protection System",
    shortDesc: "NFPA-compliant sprinkler, hydrant & FM200 clean agent.",
    icon: <FaFireExtinguisher className="text-red-500" />,
    subServices: [
      { title: "Addressable Fire Alarm Systems", desc: "Central control panel & detector array", href: "/services/fdps/alarm" },
      { title: "Automatic Wet Pipe Sprinklers", desc: "UL/FM listed sprinkler heads & valves", href: "/services/fdps/sprinkler" },
      { title: "FM200 / Novec Gas Suppression", desc: "Clean agent protection for server rooms", href: "/services/fdps/gas" },
      { title: "High-Pressure Hydrant Network", desc: "Fire pump skids & landing valves", href: "/services/fdps/hydrant" },
    ],
  },
  {
    id: "s3",
    slug: "guds",
    code: "GUDS",
    title: "Gas & Utility Distribution System",
    shortDesc: "Natural/LPG distribution networks, industrial manifolds, and leak interlock controls.",
    icon: <FaFireExtinguisher className="text-amber-500" />,
    subServices: [
      { title: "LPG / Natural Gas Networks", desc: "Residential & commercial pipeline design", href: "/services/guds/networks" },
      { title: "Industrial Gas Manifolds", desc: "High-pressure multi-cylinder manifold systems", href: "/services/guds/manifolds" },
      { title: "Gas Leak Interlocking Systems", desc: "Smart sensors & automatic shutdown valves", href: "/services/guds/safety" },
      { title: "Pressure Regulating Stations", desc: "Single/multi-stage reduction manifolds", href: "/services/guds/prs" },
    ],
  },
  {
    id: "s4",
    slug: "pdcp",
    code: "PDCP",
    title: "Power Distribution & Control Panel",
    shortDesc: "Form-4 LT switchgear, PFI plants & smart MCC.",
    icon: <FaMicrochip className="text-blue-600" />,
    subServices: [
      { title: "Main LT Switchgear (up to 4000A)", desc: "Form-4 type tested ABB ACB boards", href: "/services/pdcp/lt" },
      { title: "HT Substation & VCB Panels", desc: "11kV / 33kV vacuum circuit breakers", href: "/services/pdcp/ht" },
      { title: "Automatic PFI Plants (0.99 PF)", desc: "Microprocessor PF correction banks", href: "/services/pdcp/pfi" },
      { title: "Smart VFD Motor Control Center", desc: "Modbus/Profibus automated MCC", href: "/services/pdcp/mcc" },
    ],
  },
  {
    id: "s5",
    slug: "eels",
    code: "EELS",
    title: "Electrical & Lighting Systems",
    shortDesc: "Busbar trunking, ESE lightning grid & DALI LED.",
    icon: <FaLightbulb className="text-yellow-500" />,
    subServices: [
      { title: "Compact Busbar Trunking (BBT)", desc: "High-conductivity copper/aluminum BBT", href: "/services/eels/bbt" },
      { title: "ESE Lightning Protection Grid", desc: "Certified early streamer arrestors", href: "/services/eels/lightning" },
      { title: "Industrial DALI LED Networks", desc: "Energy efficient high-bay luminaires", href: "/services/eels/led" },
      { title: "Earthing Grid Resistance Testing", desc: "Low resistance grounding (<1 Ohm)", href: "/services/eels/earthing" },
    ],
  },
  {
    id: "s6",
    slug: "iba",
    code: "IBA",
    title: "Industrial Building Automation",
    shortDesc: "Siemens/Schneider PLC, SCADA & BMS telemetry.",
    icon: <FaIndustry className="text-emerald-500" />,
    subServices: [
      { title: "Siemens & Schneider PLC Setup", desc: "S7-1500 & Modicon HMI automation", href: "/services/iba/plc" },
      { title: "Centralized SCADA Telemetry", desc: "Real-time remote facility dashboard", href: "/services/iba/scada" },
      { title: "Smart BMS Energy Analytics", desc: "Automated HVAC & power metering", href: "/services/iba/bms" },
      { title: "IoT Field Sensors & Actuators", desc: "Pressure, temp & humidity transmitters", href: "/services/iba/sensors" },
    ],
  },
  {
    id: "s7",
    slug: "wsds",
    code: "WSDS",
    title: "Water Supply & Drainage Systems",
    shortDesc: "VFD hydro-pneumatic pumps & PPR/HDPE risers.",
    icon: <FaShower className="text-cyan-500" />,
    subServices: [
      { title: "VFD Hydro-Pneumatic Booster Pumps", desc: "Constant water pressure boost sets", href: "/services/wsds/booster" },
      { title: "PPR & HDPE Plumbing Risers", desc: "Corrosion-resistant supply networks", href: "/services/wsds/piping" },
      { title: "Submersible Drainage Stations", desc: "Heavy-duty sump pumps with level floats", href: "/services/wsds/drainage" },
      { title: "Stormwater Harvesting Networks", desc: "Rainwater filtration & storage tanks", href: "/services/wsds/stormwater" },
    ],
  },
  {
    id: "s8",
    slug: "wts",
    code: "WTS",
    title: "Water Treatment Systems",
    shortDesc: "Effluent treatment (ETP/ZLD), STP & RO plants.",
    icon: <FaWater className="text-teal-500" />,
    subServices: [
      { title: "Iron Removal Plant", desc: "High-efficiency Iron Removal Plants for residential and commercial use.", href: "/services/wts/irp" },
      { title: "Reverse Osmosis Plant", desc: "High-pressure reverse osmosis plants", href: "/services/wts/ro" },
    ],
  },
  {
    id: "s9",
    slug: "rhs",
    code: "RHS",
    title: "Renewable & Solar Solutions",
    shortDesc: "Rooftop solar PV, net metering & hybrid inverters.",
    icon: <FaSun className="text-amber-500" />,
    subServices: [
      { title: "On-Grid Rooftop Solar PV Plants", desc: "Tier-1 Mono PERC solar panel arrays", href: "/services/rhs/solar" },
      { title: "Net Metering Setup & Approvals", desc: "Grid feed-in meter & utility clearance", href: "/services/rhs/netmetering" },
      { title: "Solar Hybrid Storage Inverters", desc: "Battery backup integration for outage continuity", href: "/services/rhs/inverters" },
      { title: "Remote Solar App Monitoring", desc: "Real-time energy generation telemetry", href: "/services/rhs/monitoring" },
    ],
  },
];

export interface MepPillar {
  id: string;
  code: "M" | "E" | "P";
  title: string;
  subtitle: string;
  compliance: string[];
  icon: React.ReactNode;
  categories: ServiceCategory[];
}

export const mepPillars: MepPillar[] = [
  {
    id: "mechanical",
    code: "M",
    title: "Mechanical Services",
    subtitle: "HVAC, Fire Protection & Gas Systems",
    compliance: ["BNBC", "ASHRAE", "SMACNA", "NFPA"],
    icon: <FaSnowflake className="text-sky-400" />,
    categories: [serviceCategories[0], serviceCategories[1], serviceCategories[2]],
  },
  {
    id: "electrical",
    code: "E",
    title: "Electrical Services",
    subtitle: "Switchgear, Automation & Lighting",
    compliance: ["BNBC", "IEC", "IEEE", "NEC"],
    icon: <FaBolt className="text-amber-400" />,
    categories: [serviceCategories[3], serviceCategories[4], serviceCategories[5]],
  },
  {
    id: "plumbing",
    code: "P",
    title: "Plumbing Services",
    subtitle: "Water Distribution, Treatment & Harvesting",
    compliance: ["BNBC", "IPC"],
    icon: <FaWater className="text-cyan-400" />,
    categories: [serviceCategories[6], serviceCategories[7], serviceCategories[8]],
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [sectorsDropdownOpen, setSectorsDropdownOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(serviceCategories[0]);
  const [activePillar, setActivePillar] = useState<MepPillar | null>(null);
  const [mobileServicesExpanded, setMobileServicesExpanded] = useState(false);
  const [mobileSectorsExpanded, setMobileSectorsExpanded] = useState(false);

  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sectorsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setSectorsDropdownOpen(false);
    setActivePillar(null);
  }, [pathname]);

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
      setActivePillar(null);
    }, 200);
  };

  const handleMouseEnterSectors = () => {
    if (sectorsTimeoutRef.current) clearTimeout(sectorsTimeoutRef.current);
    setSectorsDropdownOpen(true);
  };

  const handleMouseLeaveSectors = () => {
    sectorsTimeoutRef.current = setTimeout(() => {
      setSectorsDropdownOpen(false);
    }, 200);
  };

  const handleMouseEnterProducts = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setProductsDropdownOpen(true);
  };

  const handleMouseLeaveProducts = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setProductsDropdownOpen(false);
    }, 200);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-md py-2"
          : "bg-white py-3 border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-6">
          {/* Official Client Logo Badge + Company Name */}
          <Link href="/" className="flex items-center gap-3.5 sm:gap-4 group shrink-0">
            <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-[76px] md:h-[76px] shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/assets/logo.svg"
                alt="Elite Standard Limited Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-heading font-extrabold text-base sm:text-lg lg:text-xl text-brand-900 tracking-tight leading-none group-hover:text-brand-800 transition-colors whitespace-nowrap">
                ELITE STANDARD LIMITED
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1 hidden sm:block whitespace-nowrap">
                Engineering &bull; MEP Solutions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 shrink">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              if (item.label === "Services") {
                return (
                  <div
                    key={item.href}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-2 py-1.5 2xl:px-3 text-xs font-semibold rounded-md transition-all duration-150 inline-flex items-center gap-1.5 whitespace-nowrap ${
                        isActive || servicesDropdownOpen
                          ? "text-brand-800 font-bold bg-brand-50"
                          : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-accent" : "text-slate-400"
                        }`}
                      />
                    </Link>

                    {/* Multi-Level Mega Menu Dropdown */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute top-full left-0 mt-1 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 transition-all duration-300 flex ${
                            activePillar ? "w-[840px]" : "w-[360px]"
                          }`}
                        >
                          {/* Left Panel: 3 Core MEP Pillars */}
                          <div className="w-[360px] shrink-0 bg-white p-3 border-r border-slate-200/80 flex flex-col justify-between">
                            <div>
                              <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-900 flex items-center justify-between border-b border-slate-200 mb-2">
                                <span>3 Integrated Solutions</span>
                                <span className="text-accent text-[10px] font-mono font-bold">3-6-9 LAW</span>
                              </div>

                              <div className="flex flex-col gap-1">
                                {mepPillars.map((pillar) => {
                                  const isSelected = activePillar?.id === pillar.id;

                                  return (
                                    <div
                                      key={pillar.id}
                                      onMouseEnter={() => setActivePillar(pillar)}
                                      className={`group/item flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 border ${
                                        isSelected
                                          ? "bg-slate-100/90 border-slate-200/90 shadow-sm"
                                          : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200/50"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3 flex-grow">
                                        <div
                                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-base transition-colors ${
                                            isSelected
                                              ? "bg-white text-brand-900 shadow-sm"
                                              : "bg-slate-100 text-brand-800 group-hover/item:bg-slate-200/70"
                                          }`}
                                        >
                                          {pillar.icon}
                                        </div>
                                        <div className="flex flex-col">
                                          <span className="text-xs font-bold text-slate-900 group-hover/item:text-brand-950 transition-colors">
                                            {pillar.title}
                                          </span>
                                          <span className="text-[10px] text-slate-400 line-clamp-1 group-hover/item:text-slate-500 transition-colors">
                                            {pillar.subtitle}
                                          </span>
                                        </div>
                                      </div>

                                      <div className="pl-2 shrink-0">
                                        <span
                                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider transition-colors ${
                                            isSelected
                                              ? "bg-slate-200 text-slate-800"
                                              : "bg-slate-100 text-slate-500 group-hover/item:bg-slate-200 group-hover/item:text-slate-700"
                                          }`}
                                        >
                                          {pillar.code}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="pt-2 mt-2 border-t border-slate-200">
                              <Link
                                href="/services"
                                className="w-full inline-flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white text-xs font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                              >
                                <span>Explore All Services</span>
                                <FaArrowRight className="text-[10px] text-accent" />
                              </Link>
                            </div>
                          </div>

                          {/* Right Panel: Flyout 3 Flagship Services of Selected Pillar */}
                          <AnimatePresence>
                            {activePillar && (
                              <motion.div
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 480 }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.22 }}
                                className="overflow-hidden bg-white"
                              >
                                <div className="w-[480px] p-4 flex flex-col justify-between h-full bg-slate-50/50">
                                  <div>
                                    <div className="flex items-center justify-between pb-2.5 border-b border-slate-200/80 mb-3">
                                      <div className="flex items-center gap-2">
                                        <span className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-xs text-brand-800">
                                          {activePillar.icon}
                                        </span>
                                        <div>
                                          <h4 className="font-heading font-extrabold text-xs text-brand-950">
                                            {activePillar.title}
                                          </h4>
                                          <p className="text-[9px] text-slate-500 font-mono">
                                            Codes: {activePillar.compliance.join(", ")}
                                          </p>
                                        </div>
                                      </div>

                                      <Link
                                        href={`/services?category=${activePillar.id}`}
                                        className="text-[10px] font-bold text-brand-800 hover:text-accent flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 hover:border-accent transition-colors"
                                      >
                                        <span>View Category</span>
                                        <FaChevronRight className="text-[8px]" />
                                      </Link>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                      {activePillar.categories.map((cat) => (
                                        <Link
                                          key={cat.id}
                                          href={`/services/${cat.slug}`}
                                          className="group/sub flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 bg-white border border-slate-200/80 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
                                        >
                                          <div className="flex items-center gap-3 flex-grow">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover/sub:bg-brand-950 group-hover/sub:text-accent flex items-center justify-center shrink-0 text-base text-slate-700 transition-colors">
                                              {cat.icon}
                                            </div>
                                            <div className="flex flex-col">
                                              <span className="text-xs font-bold text-slate-900 group-hover/sub:text-brand-900 transition-colors">
                                                {cat.title}
                                              </span>
                                              <span className="text-[10px] text-slate-400 line-clamp-1">
                                                {cat.shortDesc}
                                              </span>
                                            </div>
                                          </div>
                                          <div className="pl-2 shrink-0">
                                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 group-hover/sub:bg-accent group-hover/sub:text-brand-950 transition-colors">
                                              {cat.code}
                                            </span>
                                          </div>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>

                                  <div className="pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                                    <span>Sectors: Residential • Commercial • Industrial</span>
                                    <span className="text-brand-900 font-bold">27 Sub-Sections</span>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.label === "Products") {
                return (
                  <div
                    key={item.href}
                    onMouseEnter={handleMouseEnterProducts}
                    onMouseLeave={handleMouseLeaveProducts}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-2 py-1.5 2xl:px-3 text-xs font-semibold rounded-md transition-all duration-150 inline-flex items-center gap-1.5 whitespace-nowrap ${
                        isActive || productsDropdownOpen
                          ? "text-brand-800 font-bold bg-brand-50"
                          : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-200 ${
                          productsDropdownOpen ? "rotate-180 text-accent" : "text-slate-400"
                        }`}
                      />
                    </Link>

                    <AnimatePresence>
                      {productsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 p-3 flex flex-col gap-1"
                        >
                          <div className="px-3 py-2 text-[11px] font-extrabold uppercase tracking-wider text-brand-900 flex items-center justify-between border-b border-slate-200 mb-1">
                            <span>Reseller Catalog</span>
                            <span className="text-accent text-[10px]">Select Product</span>
                          </div>
                          
                          <Link
                            href="/products/iron-removal-plant"
                            className="group/item flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 border border-transparent hover:bg-slate-50 hover:border-slate-200/60"
                          >
                            <div className="flex items-center gap-3 flex-grow">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-base text-cyan-600 group-hover/item:bg-slate-200/70 transition-colors">
                                <FaWater />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900 group-hover/item:text-brand-950 transition-colors">Iron Removal Plant</span>
                                <span className="text-[10px] text-slate-400 line-clamp-1 group-hover/item:text-slate-500 transition-colors">Residential & Commercial IR</span>
                              </div>
                            </div>
                            <div className="pl-2 shrink-0">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 group-hover/item:bg-slate-200 group-hover/item:text-slate-700 transition-colors">IRP</span>
                            </div>
                          </Link>

                          <Link
                            href="/products/ro-system"
                            className="group/item flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 border border-transparent hover:bg-slate-50 hover:border-slate-200/60"
                          >
                            <div className="flex items-center gap-3 flex-grow">
                              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-base text-blue-600 group-hover/item:bg-slate-200/70 transition-colors">
                                <FaMicrochip />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-900 group-hover/item:text-brand-950 transition-colors">RO System</span>
                                <span className="text-[10px] text-slate-400 line-clamp-1 group-hover/item:text-slate-500 transition-colors">Reverse Osmosis Packages</span>
                              </div>
                            </div>
                            <div className="pl-2 shrink-0">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 group-hover/item:bg-slate-200 group-hover/item:text-slate-700 transition-colors">RO</span>
                            </div>
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              if (item.label === "Sectors") {
                return (
                  <div
                    key={item.href}
                    onMouseEnter={handleMouseEnterSectors}
                    onMouseLeave={handleMouseLeaveSectors}
                    className="relative"
                  >
                    <Link
                      href={item.href}
                      className={`px-2 py-1.5 2xl:px-3 text-xs font-semibold rounded-md transition-all duration-150 inline-flex items-center gap-1.5 whitespace-nowrap ${
                        isActive || sectorsDropdownOpen
                          ? "text-brand-800 font-bold bg-brand-50"
                          : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
                      }`}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={`text-[10px] transition-transform duration-200 ${
                          sectorsDropdownOpen ? "rotate-180 text-accent" : "text-slate-400"
                        }`}
                      />
                    </Link>

                    {/* Sectors Standard Dropdown Menu */}
                    <AnimatePresence>
                      {sectorsDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 overflow-hidden z-50 p-3 flex flex-col gap-1"
                        >
                          {sectorItems.map((sec, idx) => (
                            <Link
                              key={idx}
                              href={sec.href}
                              className="group/sec flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all duration-150 border border-transparent hover:bg-slate-50 hover:border-slate-200/60"
                            >
                              <div className="flex items-center gap-3 flex-grow">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-base group-hover/sec:bg-slate-200/70 transition-colors">
                                  {sec.icon}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-slate-900 group-hover/sec:text-brand-950 transition-colors">
                                    {sec.title}
                                  </span>
                                  <span className="text-[10px] text-slate-400 line-clamp-1 group-hover/sec:text-slate-500 transition-colors">
                                    {sec.desc}
                                  </span>
                                </div>
                              </div>
                              <div className="pl-2 shrink-0">
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-500 group-hover/sec:bg-slate-200 group-hover/sec:text-slate-700 transition-colors">
                                  SEC
                                </span>
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-2 py-1.5 2xl:px-3 text-xs font-semibold rounded-md transition-all duration-150 relative whitespace-nowrap ${
                    isActive
                      ? "text-brand-800 font-bold bg-brand-50"
                      : "text-slate-600 hover:text-brand-800 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 left-2 right-2 2xl:left-3 2xl:right-3 h-0.5 bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact?type=quotation"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-accent to-amber-500 hover:from-amber-600 hover:to-accent text-brand-950 font-semibold text-xs px-3.5 py-2.5 rounded-md shadow-cta hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
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
              className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl z-50 xl:hidden max-h-[85vh] overflow-y-auto custom-scrollbar"
            >
              <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col gap-4">
                <nav className="flex flex-col gap-1">
                  {navItems.map((item) => {
                    const isActive =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);

                    if (item.label === "Services") {
                      return (
                        <div key={item.href} className="flex flex-col">
                          <button
                            onClick={() => setMobileServicesExpanded(!mobileServicesExpanded)}
                            className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                              isActive || mobileServicesExpanded
                                ? "text-brand-800 bg-brand-50 border-l-4 border-accent"
                                : "text-slate-700 hover:bg-slate-50 hover:text-brand-800"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.label}</span>
                              <span className="px-2 py-0.5 rounded bg-accent/20 text-brand-950 text-[10px] font-extrabold">
                                9 Categories
                              </span>
                            </span>
                            <FaChevronDown
                              className={`text-xs transition-transform duration-200 ${
                                mobileServicesExpanded ? "rotate-180 text-accent" : "text-slate-400"
                              }`}
                            />
                          </button>

                          {/* Expanding Mobile Accordion */}
                          <AnimatePresence>
                            {mobileServicesExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden pl-3 pr-2 py-2 flex flex-col gap-3 bg-slate-50 rounded-lg mt-1 border border-slate-100"
                              >
                                {mepPillars.map((pillar) => (
                                  <div key={pillar.id} className="flex flex-col border-b border-slate-200/80 pb-2.5 last:border-0 last:pb-0">
                                    <div className="flex items-center justify-between px-2.5 py-1.5 font-extrabold text-xs text-brand-950 bg-slate-200/70 rounded-md mb-1.5">
                                      <span className="flex items-center gap-2">
                                        <span className="text-xs">{pillar.icon}</span>
                                        <span>{pillar.title}</span>
                                      </span>
                                      <span className="px-1.5 py-0.5 rounded bg-brand-950 text-accent font-mono text-[9px] font-bold">
                                        {pillar.code}
                                      </span>
                                    </div>

                                    <div className="flex flex-col gap-1 pl-2">
                                      {pillar.categories.map((cat) => (
                                        <Link
                                          key={cat.id}
                                          href={`/services/${cat.slug}`}
                                          className="flex items-center justify-between p-1.5 rounded-md hover:bg-white text-xs font-semibold text-slate-800 hover:text-brand-900"
                                        >
                                          <span className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                            <span>{cat.title}</span>
                                          </span>
                                          <span className="text-[9px] font-mono px-1 py-0.5 rounded bg-slate-200 text-slate-600">
                                            {cat.code}
                                          </span>
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    if (item.label === "Sectors") {
                      return (
                        <div key={item.href} className="flex flex-col">
                          <button
                            onClick={() => setMobileSectorsExpanded(!mobileSectorsExpanded)}
                            className={`flex items-center justify-between px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
                              isActive || mobileSectorsExpanded
                                ? "text-brand-800 bg-brand-50 border-l-4 border-accent"
                                : "text-slate-700 hover:bg-slate-50 hover:text-brand-800"
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span>{item.label}</span>
                              <span className="px-2 py-0.5 rounded bg-accent/20 text-brand-950 text-[10px] font-extrabold">
                                3 Sectors
                              </span>
                            </span>
                            <FaChevronDown
                              className={`text-xs transition-transform duration-200 ${
                                mobileSectorsExpanded ? "rotate-180 text-accent" : "text-slate-400"
                              }`}
                            />
                          </button>

                          {/* Expanding Mobile Sectors Accordion */}
                          <AnimatePresence>
                            {mobileSectorsExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden pl-4 pr-2 py-2 flex flex-col gap-2 bg-slate-50 rounded-lg mt-1 border border-slate-100"
                              >
                                {sectorItems.map((sec, idx) => (
                                  <Link
                                    key={idx}
                                    href={sec.href}
                                    className="flex items-center justify-between p-2 rounded-md hover:bg-white text-xs font-bold text-brand-950"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="text-xs">{sec.icon}</span>
                                      <span>{sec.title}</span>
                                    </span>
                                    <FaArrowRight className="text-[10px] text-slate-400" />
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

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
                    href="tel:+8801313663311"
                    className="w-full flex items-center justify-center gap-2 bg-brand-900 text-white font-medium text-xs py-2.5 rounded-lg hover:bg-brand-800 transition-colors"
                  >
                    <FaPhoneAlt className="text-accent text-xs" />
                    <span>Call Sales: +880 1313-663311</span>
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

"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTh,
  FaList,
  FaFilter,
  FaTimes,
  FaUndo,
  FaSearch,
  FaCheck,
  FaArrowRight,
  FaShieldAlt,
  FaWater,
  FaSnowflake,
  FaFireExtinguisher,
  FaBolt,
  FaMicrochip,
  FaBoxes,
  FaHome,
  FaChevronRight,
  FaPhoneAlt,
  FaPaperPlane,
} from "react-icons/fa";

export interface ProductSpec {
  label: string;
  value: string;
}

export interface CatalogProduct {
  id: string;
  slug: string;
  code: string;
  title: string;
  category: "Water Treatment" | "HVAC & Climate" | "Fire Protection" | "Power & Switchgear";
  sector: ("Residential" | "Commercial" | "Industrial")[];
  price: number;
  priceFormatted: string;
  inStock: boolean;
  stockBadge?: string;
  image: string;
  variantsText: string;
  specs: ProductSpec[];
  href: string;
  iconName: string;
}

export const allProducts: CatalogProduct[] = [
  {
    id: "irp-01",
    slug: "iron-removal-plant",
    code: "ESL-WTS-IRP-01",
    title: "Iron Removal Plant (IRP) - Automatic Multi-Grade Media System",
    category: "Water Treatment",
    sector: ["Residential", "Commercial", "Industrial"],
    price: 48000,
    priceFormatted: "Tk 48,000",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    variantsText: "9 Capacity Levels Available",
    specs: [
      { label: "Capacity Range", value: "500 LPH - 50,000+ LPH" },
      { label: "Vessel Material", value: "Food-Grade FRP / SS304" },
      { label: "Filter Media", value: "Manganese Dioxide & Activated Birm" },
      { label: "Control Valve", value: "Automatic Digital Backwash & Rinse" },
      { label: "Target Water", value: "Iron < 0.3 ppm (BNBC & WHO Compliant)" },
      { label: "Warranty", value: "2 Years OEM Service Warranty" },
    ],
    href: "/products/iron-removal-plant",
    iconName: "FaWater",
  },
  {
    id: "ro-02",
    slug: "ro-system",
    code: "ESL-WTS-RO-02",
    title: "Commercial & Industrial Reverse Osmosis (RO) Purification Plant",
    category: "Water Treatment",
    sector: ["Commercial", "Industrial"],
    price: 85000,
    priceFormatted: "Tk 85,000",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
    variantsText: "9 Package Levels Available",
    specs: [
      { label: "Capacity Range", value: "250 LPH - 10,000+ LPH" },
      { label: "RO Membrane", value: "Dow Filmtec / Hydranautics TFC 8040" },
      { label: "High Pressure Pump", value: "CNP / Grundfos Multi-Stage SS316" },
      { label: "Telemetry", value: "Digital Online TDS & Conductivity Meter" },
      { label: "Recovery Rate", value: "65% - 75% Pure Water Output" },
      { label: "Application", value: "Pharma, Dyeing, Food & Drinking" },
    ],
    href: "/products/ro-system",
    iconName: "FaMicrochip",
  },
  {
    id: "ro-03",
    slug: "ro-system",
    code: "ESL-WTS-DRO-03",
    title: "Domestic Undersink RO Water Purifier with Alkaline Mineralizer",
    category: "Water Treatment",
    sector: ["Residential"],
    price: 24500,
    priceFormatted: "Tk 24,500",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop",
    variantsText: "2 Colors Available (Black / White)",
    specs: [
      { label: "Output Capacity", value: "75 - 100 Gallons Per Day (GPD)" },
      { label: "Purification Stages", value: "6-Stage Sediment + CTO + RO + UV" },
      { label: "Storage Tank", value: "3.2 Gallons Food-Grade Pressurized" },
      { label: "Booster Pump", value: "24V DC 100 PSI High Pressure" },
      { label: "Faucet Style", value: "Lead-Free SS304 Gooseneck" },
      { label: "Power Consumption", value: "30W Low Energy Eco Mode" },
    ],
    href: "/products/ro-system",
    iconName: "FaWater",
  },
  {
    id: "vrf-04",
    slug: "vrf-climate",
    code: "ESL-HVAC-VRF-04",
    title: "VRF/VRV Tropical Inverter Multi-Split Outdoor Air Conditioning Unit",
    category: "HVAC & Climate",
    sector: ["Commercial", "Industrial", "Residential"],
    price: 385000,
    priceFormatted: "Tk 3,85,000",
    inStock: true,
    stockBadge: "OEM Certified",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    variantsText: "8 HP to 64 HP Modular Banks",
    specs: [
      { label: "Capacity Range", value: "8 HP - 64 HP Modular Combination" },
      { label: "Compressor Type", value: "DC Inverter Scroll (Tropical 52°C)" },
      { label: "Refrigerant", value: "Eco-Friendly R-410A / R-32 Zero ODP" },
      { label: "Energy Ratio", value: "High COP Up to 4.85 / IPLV 7.2" },
      { label: "BMS Connectivity", value: "Modbus RTU / BACnet IP Native" },
      { label: "Coil Protection", value: "Hydrophilic Golden Anti-Corrosion Fin" },
    ],
    href: "/products/vrf-climate",
    iconName: "FaSnowflake",
  },
  {
    id: "pac-05",
    slug: "vrf-climate",
    code: "ESL-HVAC-PAC-05",
    title: "Precision Air Conditioning (PAC) Unit for Telecom & Data Centers",
    category: "HVAC & Climate",
    sector: ["Commercial", "Industrial"],
    price: 490000,
    priceFormatted: "Tk 4,90,000",
    inStock: true,
    stockBadge: "Custom Assembly",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    variantsText: "Downflow & Upflow Air Distribution",
    specs: [
      { label: "Cooling Capacity", value: "15 kW - 120 kW Sensible Heat Ratio >0.9" },
      { label: "Fan Assembly", value: "EC Backward Curved High-Efficiency Fan" },
      { label: "Humidity Control", value: "Electrode Steam Humidifier & Dehumidifier" },
      { label: "Air Filtration", value: "EU4 / G4 Pleated Washable Deep-Bed" },
      { label: "Display & Controller", value: "7-Inch Color Graphic Touch Interface" },
      { label: "Redundancy", value: "Dual Circuit Independent Compressors" },
    ],
    href: "/products/vrf-climate",
    iconName: "FaSnowflake",
  },
  {
    id: "pump-06",
    slug: "fire-pump-skid",
    code: "ESL-FDPS-PUMP-06",
    title: "UL/FM Certified Packaged Fire Fighting Pump Station Skid",
    category: "Fire Protection",
    sector: ["Commercial", "Industrial"],
    price: 750000,
    priceFormatted: "Tk 7,50,000",
    inStock: true,
    stockBadge: "UL/FM Approved",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    variantsText: "Electric + Diesel + Jockey Triplex Skid",
    specs: [
      { label: "Rated Flow", value: "500 GPM - 2500 GPM @ 10-16 Bar" },
      { label: "Standards Compliance", value: "NFPA 20, BNBC 2020 & FSCD Approved" },
      { label: "Certifications", value: "UL-Listed / FM-Approved Pump & Panel" },
      { label: "Driver Assembly", value: "Electric Motor + Standby Diesel Engine" },
      { label: "Controller Type", value: "Automatic Microprocessor Dual Battery Start" },
      { label: "Jockey Unit", value: "Vertical Multi-Stage Pressure Sustaining" },
    ],
    href: "/products/fire-pump-skid",
    iconName: "FaFireExtinguisher",
  },
  {
    id: "alv-07",
    slug: "fire-pump-skid",
    code: "ESL-FDPS-ALV-07",
    title: "Wet-Pipe Automatic Fire Sprinkler Alarm Check Valve Set",
    category: "Fire Protection",
    sector: ["Residential", "Commercial", "Industrial"],
    price: 65000,
    priceFormatted: "Tk 65,000",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
    variantsText: "4 Inch / 6 Inch Flanged Sizes",
    specs: [
      { label: "Nominal Size", value: "DN100 (4 Inch) & DN150 (6 Inch)" },
      { label: "Working Pressure", value: "175 PSI (12 Bar) Rated" },
      { label: "Body Construction", value: "Ductile Iron ASTM A536 Heavy Duty" },
      { label: "Included Accessories", value: "Retard Chamber, Water Motor Gong, Gauges" },
      { label: "Approval Tier", value: "UL Listed & FM Approved" },
      { label: "Standards", value: "NFPA 13 Automatic Sprinkler Compliance" },
    ],
    href: "/products/fire-pump-skid",
    iconName: "FaFireExtinguisher",
  },
  {
    id: "lt-08",
    slug: "lt-switchgear",
    code: "ESL-PDCP-LT-08",
    title: "Form-4 Type Tested Low Voltage (LT) Main Power Switchboard",
    category: "Power & Switchgear",
    sector: ["Commercial", "Industrial"],
    price: 320000,
    priceFormatted: "Tk 3,20,000",
    inStock: true,
    stockBadge: "Custom Built",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop",
    variantsText: "250A to 4000A Incomer Packages",
    specs: [
      { label: "Rated Current", value: "630A - 4000A with 50kA/1s Withstand" },
      { label: "Circuit Breakers", value: "ABB Emax2 / Schneider MasterPact MTZ" },
      { label: "Copper Busbar", value: "99.9% Pure ETP Copper with Heat Shrink" },
      { label: "Enclosure Sheet", value: "2.0mm Electro-Galvanized Powder Coated" },
      { label: "Protection Index", value: "IP54 Dust & Moisture Sealed Compartment" },
      { label: "Standards", value: "IEC 61439-1/2, IEEE & BNBC 2020 Part 8" },
    ],
    href: "/products/lt-switchgear",
    iconName: "FaBolt",
  },
  {
    id: "pfi-09",
    slug: "lt-switchgear",
    code: "ESL-PDCP-PFI-09",
    title: "Automatic Power Factor Improvement (PFI) Capacitor Bank",
    category: "Power & Switchgear",
    sector: ["Commercial", "Industrial"],
    price: 145000,
    priceFormatted: "Tk 1,45,000",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    variantsText: "100 kVAR to 800 kVAR Step Banks",
    specs: [
      { label: "Target Power Factor", value: "0.98 - 0.99 (Utility Penalty-Free)" },
      { label: "Step Regulator", value: "8 / 12 / 16 Step Microprocessor Controller" },
      { label: "Capacitor Unit", value: "Heavy-Duty Dry Type Gas-Filled Self-Healing" },
      { label: "Switching", value: "Damped Inrush Capacitor Duty Contactors" },
      { label: "Detuned Reactor", value: "7% / 14% Anti-Harmonic Reactor Protection" },
      { label: "Enclosure", value: "Form-2 Louvered Natural Convection Panel" },
    ],
    href: "/products/lt-switchgear",
    iconName: "FaBolt",
  },
  {
    id: "etp-10",
    slug: "iron-removal-plant",
    code: "ESL-WTS-ETP-10",
    title: "Industrial Effluent & Sewage Treatment Plant (ETP/STP Packaged Skid)",
    category: "Water Treatment",
    sector: ["Industrial"],
    price: 890000,
    priceFormatted: "Tk 8,90,000",
    inStock: false,
    stockBadge: "Made to Order",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    variantsText: "5 m³/hr to 100 m³/hr Treatment",
    specs: [
      { label: "Process Technology", value: "MBBR / MBR Biological Fixed Film System" },
      { label: "Capacity Range", value: "5 m³/hr - 100+ m³/hr Continuous" },
      { label: "Discharge Standard", value: "DoE (Department of Environment) Approved" },
      { label: "Automation", value: "Siemens PLC with Touchscreen HMI" },
      { label: "Sludge Handling", value: "Multi-Plate Screw Press / Chamber Filter" },
      { label: "Applications", value: "Textiles, Washing, Pharmaceuticals, Food" },
    ],
    href: "/products/iron-removal-plant",
    iconName: "FaWater",
  },
  {
    id: "duct-11",
    slug: "vrf-climate",
    code: "ESL-HVAC-DUCT-11",
    title: "Commercial Ducted Split Air Conditioner (High Static Pressure)",
    category: "HVAC & Climate",
    sector: ["Commercial", "Residential"],
    price: 175000,
    priceFormatted: "Tk 1,75,000",
    inStock: true,
    stockBadge: "In Stock",
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=800&auto=format&fit=crop",
    variantsText: "3.0 TR to 10.0 TR Capacity",
    specs: [
      { label: "Capacity Range", value: "3.0 TR - 10.0 TR (36,000 - 120,000 BTU/hr)" },
      { label: "External Static", value: "Up to 150 Pa High External Static Pressure" },
      { label: "Duct Connection", value: "Standard Rectangular Supply & Return Flange" },
      { label: "Air Filtration", value: "Washable Nylon Air Filter with Easy Draw" },
      { label: "Controller", value: "Backlit Wired Wall Remote with Diagnostic Code" },
      { label: "Condensate Drain", value: "Built-in High Head Condensate Lift Pump" },
    ],
    href: "/products/vrf-climate",
    iconName: "FaSnowflake",
  },
  {
    id: "fm200-12",
    slug: "fire-pump-skid",
    code: "ESL-FDPS-FM200-12",
    title: "FM-200 (HFC-227ea) Clean Agent Automatic Fire Suppression System",
    category: "Fire Protection",
    sector: ["Commercial", "Industrial"],
    price: 280000,
    priceFormatted: "Tk 2,80,000",
    inStock: true,
    stockBadge: "UL Listed",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    variantsText: "30L to 180L Seamless Cylinders",
    specs: [
      { label: "Suppression Agent", value: "Clean Agent HFC-227ea (Zero Ozone Depletion)" },
      { label: "Discharge Time", value: "< 10 Seconds Rapid Full Extinguishment" },
      { label: "Cylinder Standard", value: "DOT 4BW500 / TPED High Pressure Seamless" },
      { label: "Actuation Modes", value: "Electric Solenoid, Pneumatic & Manual Lever" },
      { label: "Protected Areas", value: "Server Rooms, Control Centers, Archives" },
      { label: "Compliance Code", value: "NFPA 2001 & BNBC 2020 Part 4 Clearance" },
    ],
    href: "/products/fire-pump-skid",
    iconName: "FaFireExtinguisher",
  },
];

export default function ProductsClient({
  initialProducts = allProducts,
}: {
  initialProducts?: CatalogProduct[];
}) {
  const [productsList, setProductsList] = useState<CatalogProduct[]>(initialProducts);

  useEffect(() => {
    if (initialProducts && initialProducts.length > 0) {
      setProductsList(initialProducts);
    }
  }, [initialProducts]);

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "name">("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Price input values for user typing
  const [minPriceInput, setMinPriceInput] = useState(0);
  const [maxPriceInput, setMaxPriceInput] = useState(1000000);

  // Category list with counts
  const categoryOptions = [
    { name: "Water Treatment", icon: FaWater },
    { name: "HVAC & Climate", icon: FaSnowflake },
    { name: "Fire Protection", icon: FaFireExtinguisher },
    { name: "Power & Switchgear", icon: FaBolt },
  ];

  const sectorOptions = ["Residential", "Commercial", "Industrial"] as const;

  // Toggle Category Filter
  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  // Toggle Sector Filter
  const toggleSector = (sec: string) => {
    setSelectedSectors((prev) =>
      prev.includes(sec) ? prev.filter((s) => s !== sec) : [...prev, sec]
    );
  };

  // Handle Price Range Submit
  const handlePriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPriceRange([minPriceInput, maxPriceInput]);
  };

  // Reset All Filters
  const handleResetFilters = () => {
    setSelectedCategories([]);
    setSelectedSectors([]);
    setExcludeOutOfStock(false);
    setPriceRange([0, 1000000]);
    setMinPriceInput(0);
    setMaxPriceInput(1000000);
    setSearchQuery("");
    setSortBy("featured");
  };

  // Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    return productsList
      .filter((product) => {
        // Search query
        if (
          searchQuery.trim() !== "" &&
          !product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !product.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category filter
        if (
          selectedCategories.length > 0 &&
          !selectedCategories.includes(product.category)
        ) {
          return false;
        }

        // Sector filter
        if (
          selectedSectors.length > 0 &&
          !selectedSectors.some((sec) => product.sector.includes(sec as any))
        ) {
          return false;
        }

        // Out of stock filter
        if (excludeOutOfStock && !product.inStock) {
          return false;
        }

        // Price range filter
        if (product.price < priceRange[0] || product.price > priceRange[1]) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0; // "featured" maintains default order
      });
  }, [productsList, selectedCategories, selectedSectors, excludeOutOfStock, priceRange, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-slate-800 pb-20">
      {/* 1. Ryans-Style Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-slate-600">
          <div className="flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-brand-900 flex items-center gap-1.5 font-medium">
              <FaHome className="text-slate-400" />
              <span>Home</span>
            </Link>
            <FaChevronRight className="text-[9px] text-slate-300" />
            <Link href="/products" className="hover:text-brand-900 font-medium">
              Products
            </Link>
            <FaChevronRight className="text-[9px] text-slate-300" />
            <span className="font-bold text-brand-900">
              {selectedCategories.length === 1
                ? selectedCategories[0]
                : "All MEP Engineering Equipment"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[11px] text-slate-500">
              Engineering Hotline: <strong className="text-brand-950 font-bold">+880 1313-663311</strong>
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Catalog Body with Sidebar and Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ======================================================== */}
          {/* LEFT SIDEBAR: RYANS-STYLE "FILTER BY" PANEL */}
          {/* ======================================================== */}
          <aside className="lg:col-span-3 lg:sticky lg:top-20 z-20 self-start">
            {/* Mobile Filter Toggle Button */}
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="w-full flex items-center justify-between bg-emerald-600 text-white px-4 py-3 rounded-lg font-bold text-sm shadow"
              >
                <span className="flex items-center gap-2">
                  <FaFilter />
                  <span>Filter Products ({filteredProducts.length})</span>
                </span>
                <span>{mobileFilterOpen ? "Hide Filters" : "Show Filters"}</span>
              </button>
            </div>

            <div
              className={`bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden ${
                mobileFilterOpen ? "block" : "hidden lg:block"
              } lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto`}
            >
              {/* Filter By Header Bar */}
              <div className="bg-[#10b981] px-4 py-3 flex items-center justify-between text-white sticky top-0 z-10 shadow-sm">
                <span className="font-bold text-sm uppercase tracking-wide flex items-center gap-2">
                  <FaFilter className="text-xs" />
                  <span>Filter By</span>
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-2.5 py-1 rounded transition-colors flex items-center gap-1"
                >
                  <FaUndo className="text-[10px]" />
                  <span>Reset</span>
                </button>
              </div>

              {/* Keyword Search Input */}
              <div className="p-4 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Search Equipment
                </span>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, model..."
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-md focus:outline-none focus:border-brand-800"
                  />
                  <FaSearch className="absolute left-2.5 top-3 text-slate-400 text-xs" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>
              </div>

              {/* Price Range Filter (Exact Ryans UI) */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-emerald-600 rounded"
                    />
                    <span>Price (BDT)</span>
                  </label>
                  <span className="text-slate-400 text-xs font-mono">&minus;</span>
                </div>

                <form onSubmit={handlePriceSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Min BDT</span>
                      <input
                        type="number"
                        value={minPriceInput}
                        onChange={(e) => setMinPriceInput(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-center text-xs font-mono font-medium focus:outline-none focus:border-brand-800"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block mb-0.5">Max BDT</span>
                      <input
                        type="number"
                        value={maxPriceInput}
                        onChange={(e) => setMaxPriceInput(Number(e.target.value))}
                        className="w-full px-2 py-1.5 border border-slate-200 rounded text-center text-xs font-mono font-medium focus:outline-none focus:border-brand-800"
                      />
                    </div>
                  </div>

                  {/* Slider Control */}
                  <div className="pt-1">
                    <input
                      type="range"
                      min={0}
                      max={1000000}
                      step={25000}
                      value={maxPriceInput}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setMaxPriceInput(val);
                        setPriceRange([minPriceInput, val]);
                      }}
                      className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#3b82f6] hover:bg-blue-600 text-white font-bold text-xs py-1.5 rounded transition-colors shadow-sm"
                  >
                    Submit
                  </button>
                </form>

                {/* Stock Status Checkbox */}
                <div className="pt-3 mt-3 border-t border-slate-100">
                  <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-brand-900 select-none">
                    <input
                      type="checkbox"
                      checked={excludeOutOfStock}
                      onChange={(e) => setExcludeOutOfStock(e.target.checked)}
                      className="accent-emerald-600 rounded"
                    />
                    <span>Exclude Out of Stock Items</span>
                  </label>
                </div>
              </div>

              {/* Category / Division Filter */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Equipment Division
                  </span>
                  <span className="text-slate-400 text-xs font-mono">&minus;</span>
                </div>

                <div className="space-y-2">
                  {categoryOptions.map((cat) => {
                    const count = productsList.filter((p) => p.category === cat.name).length;
                    const isChecked = selectedCategories.includes(cat.name);
                    return (
                      <label
                        key={cat.name}
                        className="flex items-center justify-between text-xs text-slate-700 hover:text-brand-900 cursor-pointer select-none py-0.5"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleCategory(cat.name)}
                            className="accent-emerald-600 rounded"
                          />
                          <span>{cat.name}</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px] font-bold">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Application Sector Filter */}
              <div className="p-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Application Sector
                  </span>
                  <span className="text-slate-400 text-xs font-mono">&minus;</span>
                </div>

                <div className="space-y-2">
                  {sectorOptions.map((sec) => {
                    const count = productsList.filter((p) => p.sector.includes(sec)).length;
                    const isChecked = selectedSectors.includes(sec);
                    return (
                      <label
                        key={sec}
                        className="flex items-center justify-between text-xs text-slate-700 hover:text-brand-900 cursor-pointer select-none py-0.5"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleSector(sec)}
                            className="accent-emerald-600 rounded"
                          />
                          <span>{sec} Sector</span>
                        </div>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-mono text-[10px] font-bold">
                          {count}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Engineering Standards Banner in Sidebar */}
              <div className="p-4 bg-slate-50 text-xs text-slate-600 flex flex-col gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-950 flex items-center gap-1.5">
                  <FaShieldAlt className="text-amber-500" />
                  <span>Code Certified Equipment</span>
                </span>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  All equipment strictly complies with BNBC 2020, NFPA, ASHRAE, and IEC 61439 electrical codes.
                </p>
                <div className="pt-2 border-t border-slate-200">
                  <Link
                    href="/contact?type=quotation"
                    className="w-full flex items-center justify-center gap-1.5 bg-brand-950 hover:bg-brand-900 text-white text-[11px] font-bold py-2 rounded transition-colors"
                  >
                    <span>Request Custom RFQ</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* MAIN CONTENT AREA: RYANS-STYLE HEADER & PRODUCT GRID */}
          {/* ======================================================== */}
          <main className="lg:col-span-9 flex flex-col gap-4">
            
            {/* Top Control Bar: Title, Count, Sort By & View Mode */}
            <div className="bg-white p-3.5 sm:p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-heading text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                  {selectedCategories.length === 1 ? selectedCategories[0] : "All Engineering Equipment"}{" "}
                  <span className="text-xs font-normal text-slate-500 font-sans">
                    ({filteredProducts.length} Products found)
                  </span>
                </h1>
              </div>

              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* Sort By Dropdown */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-slate-500 hidden sm:inline whitespace-nowrap">Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:border-brand-800 cursor-pointer"
                  >
                    <option value="featured">Customized / Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>

                {/* View Switcher: Grid vs List */}
                <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-slate-50 p-0.5">
                  <button
                    onClick={() => setViewMode("grid")}
                    title="Grid View"
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <FaTh className="text-xs" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    title="List View"
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-emerald-600 shadow-sm"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    <FaList className="text-xs" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Chips / Pills */}
            {(selectedCategories.length > 0 ||
              selectedSectors.length > 0 ||
              excludeOutOfStock ||
              priceRange[1] < 1000000 ||
              searchQuery) && (
              <div className="bg-white px-3.5 py-2.5 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2 flex-wrap text-xs">
                <span className="text-slate-400 font-semibold text-[11px]">Active Filters:</span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
                    <span>Keyword: &quot;{searchQuery}&quot;</span>
                    <button onClick={() => setSearchQuery("")} className="hover:text-red-500">
                      <FaTimes className="text-[9px]" />
                    </button>
                  </span>
                )}

                {selectedCategories.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium"
                  >
                    <span>{c}</span>
                    <button onClick={() => toggleCategory(c)} className="hover:text-red-500">
                      <FaTimes className="text-[9px]" />
                    </button>
                  </span>
                ))}

                {selectedSectors.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 font-medium"
                  >
                    <span>{s}</span>
                    <button onClick={() => toggleSector(s)} className="hover:text-red-500">
                      <FaTimes className="text-[9px]" />
                    </button>
                  </span>
                ))}

                {excludeOutOfStock && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                    <span>In Stock Only</span>
                    <button onClick={() => setExcludeOutOfStock(false)} className="hover:text-red-500">
                      <FaTimes className="text-[9px]" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-emerald-600 hover:text-emerald-700 font-bold ml-auto text-[11px] underline"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* ======================================================== */}
            {/* PRODUCT CARDS: GRID VIEW (Exact Ryans Aesthetics) */}
            {/* ======================================================== */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg border border-slate-200 p-12 text-center flex flex-col items-center gap-3">
                <FaBoxes className="text-4xl text-slate-300" />
                <h3 className="font-heading text-lg font-bold text-slate-800">No matching equipment found</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  We could not find any products matching your specific filters. Try resetting the filters or broadening your search criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-md transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* 1. Dedicated Top Meta Bar: Badge & Model Code (Completely separated from the image) */}
                    <div className="px-4 pt-3 pb-2 flex items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/60">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider inline-flex items-center gap-1.5 ${
                          !product.inStock
                            ? "bg-slate-200/80 text-slate-700 border border-slate-300"
                            : product.stockBadge === "UL/FM Approved"
                            ? "bg-red-50 text-red-700 border border-red-200"
                            : product.stockBadge === "Custom Built" || product.stockBadge === "Custom Assembly" || product.stockBadge === "Made to Order"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            !product.inStock
                              ? "bg-slate-500"
                              : product.stockBadge === "UL/FM Approved"
                              ? "bg-red-500"
                              : product.stockBadge === "Custom Built" || product.stockBadge === "Custom Assembly" || product.stockBadge === "Made to Order"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                          }`}
                        />
                        <span>{product.stockBadge || (product.inStock ? "In Stock" : "Out of Stock")}</span>
                      </span>

                      <span className="text-[10px] font-mono text-slate-400 font-medium">
                        {product.code}
                      </span>
                    </div>

                    {/* 2. Card Body */}
                    <div className="p-4 pt-3 flex flex-col flex-grow">
                      {/* Product Thumbnail (Clean Centered with No Overlapping Elements) */}
                      <Link
                        href={product.href}
                        className="relative h-44 w-full mb-3 flex items-center justify-center overflow-hidden bg-white rounded-md p-1 block"
                      >
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </Link>

                      {/* Product Title (Bold, Exact Ryans Styling) */}
                      <Link href={product.href || `/products/${product.slug}`} className="block mb-2">
                        <h2 className="font-heading text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 transition-colors leading-snug">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Bulleted Specifications List (Exact Ryans Card Feature List) */}
                      <ul className="text-[11px] text-slate-600 space-y-1 mb-4 flex-grow border-t border-slate-100 pt-2.5">
                        {(Array.isArray(product.specs) ? product.specs : []).slice(0, 5).map((spec, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5 leading-tight">
                            <span className="text-slate-400 shrink-0">•</span>
                            <span className="text-slate-500 font-medium shrink-0">{spec.label} -</span>
                            <span className="text-slate-800 font-semibold line-clamp-1">{spec.value}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Variants / Package Information */}
                      <div className="text-[11px] text-slate-500 text-center mb-1 font-medium">
                        {product.variantsText}
                      </div>

                      {/* Price Display */}
                      <div className="text-center mb-3">
                        <span className="text-sm sm:text-base font-extrabold text-slate-900 font-heading">
                          {product.priceFormatted}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Full-Width Action Button (Exact Ryans "Details / Add to Cart" Bar) */}
                    <Link
                      href={product.href || `/products/${product.slug}`}
                      className="w-full bg-[#e2e8f0]/80 hover:bg-brand-900 hover:text-white text-slate-800 py-2.5 text-xs font-bold text-center block transition-colors duration-200 border-t border-slate-200"
                    >
                      <span>Details & Specifications</span>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              /* ======================================================== */
              /* PRODUCT CARDS: LIST VIEW (Exact Horizontal Ryans Layout) */
              /* ======================================================== */
              <div className="space-y-3">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all p-4 flex flex-col md:flex-row items-center justify-between gap-6 group"
                  >
                    {/* Left: Product Image */}
                    <Link
                      href={product.href}
                      className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0 flex items-center justify-center overflow-hidden bg-slate-50 rounded-lg p-2"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                        sizes="160px"
                      />
                    </Link>

                    {/* Middle: Title, Code, & Specs */}
                    <div className="flex-grow flex flex-col gap-1 w-full">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                          {product.code}
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                          {product.category}
                        </span>
                        {!product.inStock && (
                          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      <Link href={product.href || `/products/${product.slug}`}>
                        <h2 className="font-heading text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {product.title}
                        </h2>
                      </Link>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 border-t border-slate-100 pt-2">
                        {(Array.isArray(product.specs) ? product.specs : []).slice(0, 4).map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-1.5">
                            <span className="text-slate-400">•</span>
                            <span className="text-slate-500 font-medium">{spec.label}:</span>
                            <span className="text-slate-800 font-semibold truncate">{spec.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-400 mt-1 font-medium">
                        {product.variantsText}
                      </div>
                    </div>

                    {/* Right: Price & CTA Column */}
                    <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between w-full md:w-44 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 gap-3">
                      <div className="text-left md:text-right">
                        <span className="text-xs text-slate-400 block">Unit Price:</span>
                        <span className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                          {product.priceFormatted}
                        </span>
                      </div>

                      <Link
                        href={product.href || `/products/${product.slug}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded transition-colors text-center shadow-sm w-fit"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* 3. Bottom Consultation & Quotation Ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-brand-950 rounded-2xl p-6 sm:p-8 text-white border border-brand-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent shrink-0">
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-white">
                Looking for Custom Bulk Procurement or Project Sizing?
              </h3>
              <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
                Our certified MEP engineering team provides heat load calculation, water test audits, and customized system fabrication.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <Link
              href="/contact?type=quotation"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold text-xs px-6 py-3 rounded-lg shadow-cta transition-colors"
            >
              <span>Request Quotation</span>
              <FaPaperPlane className="text-[10px]" />
            </Link>
            <a
              href="tel:+8801313663311"
              className="hidden sm:inline-flex items-center justify-center gap-2 bg-brand-800 hover:bg-brand-700 text-white font-medium text-xs px-4 py-3 rounded-lg border border-brand-700 transition-colors"
            >
              <FaPhoneAlt className="text-accent text-xs" />
              <span>Call Sales</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

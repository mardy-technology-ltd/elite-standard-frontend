"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  FaCheck,
  FaCheckCircle,
  FaStar,
  FaPhoneAlt,
  FaPaperPlane,
  FaDownload,
  FaWhatsapp,
  FaFacebookF,
  FaLinkedinIn,
  FaEnvelope,
  FaPrint,
  FaShieldAlt,
  FaBoxes,
  FaTachometerAlt,
  FaArrowRight,
  FaHome,
  FaChevronRight,
  FaPlus,
  FaMinus,
  FaQuestionCircle,
  FaTools,
  FaFileAlt,
  FaAward,
} from "react-icons/fa";

interface ProductDetailData {
  slug: string;
  code: string;
  title: string;
  brand: string;
  category: string;
  regularPrice: string;
  specialPrice: string;
  inStock: boolean;
  warranty: string;
  galleryImages: string[];
  quickSpecs: { label: string; value: string }[];
  fullSpecs: { attribute: string; value: string }[];
  descriptionBlocks: {
    heading: string;
    text: string;
    image: string;
    badge: string;
  }[];
  packages: {
    tier: string;
    capacity: string;
    application: string;
  }[];
}

const productDetailsMap: Record<string, ProductDetailData> = {
  "iron-removal-plant": {
    slug: "iron-removal-plant",
    code: "ESL-WTS-IRP-01",
    title: "Iron Removal Plant (IRP) - Automatic Multi-Grade Media Filtration System",
    brand: "Elite Standard Limited",
    category: "Water Treatment",
    regularPrice: "Tk 55,000",
    specialPrice: "Tk 48,000",
    inStock: true,
    warranty: "2 Years OEM Service Warranty & 24/7 Support",
    galleryImages: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
    ],
    quickSpecs: [
      { label: "Flow Capacity", value: "500 LPH - 50,000+ LPH" },
      { label: "Vessel Material", value: "Food-Grade FRP / SS304 Heavy Duty" },
      { label: "Media Bed", value: "Manganese Dioxide, Birm & Quartz Silica" },
      { label: "Control Valve", value: "Automatic Digital Multiport Backwash" },
      { label: "Target Quality", value: "Iron < 0.3 ppm (BNBC & WHO Standard)" },
      { label: "Applications", value: "Residential, Commercial & Industrial" },
    ],
    fullSpecs: [
      { attribute: "Brand", value: "Elite Standard Limited" },
      { attribute: "Model / Item Code", value: "ESL-WTS-IRP-01" },
      { attribute: "Equipment Category", value: "Water Treatment Systems (WTS)" },
      { attribute: "Flow Capacity Range", value: "500 Liters/Hour to 50,000+ Liters/Hour" },
      { attribute: "Vessel Type", value: "Structural FRP (Fiberglass Reinforced Polymer) / SS304" },
      { attribute: "Working Pressure", value: "2.0 Bar - 6.0 Bar (Tested to 10 Bar Burst)" },
      { attribute: "Media Bed Composition", value: "Manganese Green Sand, Catalytic Birm, Activated Anthracite, Coarse Gravel" },
      { attribute: "Valve Automation", value: "Runxin / Clack Digital Automatic Flow Timer Valve" },
      { attribute: "Backwash Frequency", value: "Automated Periodic Cycle (Configurable 1 - 7 Days)" },
      { attribute: "Inlet Raw Water Limits", value: "Dissolved Iron Up to 15.0 ppm, Turbidity < 20 NTU, pH 6.8 - 8.5" },
      { attribute: "Outlet Treated Water", value: "Dissolved Iron < 0.3 ppm, Manganese < 0.1 ppm, Turbidity < 1.0 NTU" },
      { attribute: "Pipe In/Out Connection", value: "1.0 Inch to 3.0 Inch Flanged / Threaded UPVC & CPVC" },
      { attribute: "Power Supply", value: "220V AC / 50Hz Single Phase (Low 15W standby consumption)" },
      { attribute: "Standard Compliance", value: "BNBC 2020 Part 8, WHO Drinking Water Quality Guidelines & DoE Standards" },
      { attribute: "Warranty", value: "2 Years Full Comprehensive Equipment & Media Warranty" },
    ],
    descriptionBlocks: [
      {
        heading: "Advanced Catalytic Oxidation & Multi-Grade Media Filtration",
        text: "The Elite Standard Iron Removal Plant utilizes catalytic manganese dioxide and activated birm media to oxidize soluble ferrous iron (Fe²⁺) into insoluble ferric hydroxide (Fe³⁺) precipitate. The multi-grade quartz sand strata then traps these precipitated particles down to 5 microns, delivering crystal-clear, non-staining water to overhead reservoirs.",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
        badge: "Pure Water Chemistry",
      },
      {
        heading: "Automated Digital Multiport Backwash & Zero Downtime Operation",
        text: "Equipped with state-of-the-art Runxin and Clack automatic digital control valves, the system automatically schedules reverse-flow hydraulic backwash cycles during non-peak hours (e.g. 2:00 AM). This continuously flushes accumulated iron sediment and regenerates the filter bed without requiring manual labor or intervention.",
        image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=800&auto=format&fit=crop",
        badge: "Smart Automation",
      },
      {
        heading: "Corrosion-Proof Structural FRP Vessel with 10-Bar Pressure Rating",
        text: "Fabricated from seamless food-grade polyethylene inner liners wound with continuous high-tensile fiberglass strands, our vessels resist chlorine, acidic raw water, and tropical humidity. They offer zero rust, zero maintenance painting, and provide over 15+ years of reliable structural life.",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
        badge: "Industrial Build",
      },
    ],
    packages: [
      { tier: "Level 3 - Residential", capacity: "500 - 2,000 LPH", application: "Single Family Duplex, 6-Flat Apartment Building" },
      { tier: "Level 6 - Commercial", capacity: "3,000 - 10,000 LPH", application: "Multi-Story Commercial Towers, Hotels, Hospitals" },
      { tier: "Level 9 - Industrial Mega", capacity: "20,000 - 50,000+ LPH", application: "Textile Mills, Pharmaceuticals & Manufacturing Plants" },
    ],
  },
  "ro-system": {
    slug: "ro-system",
    code: "ESL-WTS-RO-02",
    title: "Reverse Osmosis (RO) Water Purification Plant - Industrial Desalination & Demineralizer",
    brand: "Elite Standard Limited",
    category: "Water Treatment",
    regularPrice: "Tk 95,000",
    specialPrice: "Tk 85,000",
    inStock: true,
    warranty: "2 Years Comprehensive System Warranty",
    galleryImages: [
      "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    ],
    quickSpecs: [
      { label: "Flow Capacity", value: "250 LPH - 10,000+ LPH" },
      { label: "RO Membrane", value: "Dow Filmtec / Hydranautics TFC 8040" },
      { label: "High Pressure Pump", value: "CNP / Grundfos Vertical Multi-Stage SS316" },
      { label: "Recovery Rate", value: "65% - 75% Pure Permeate Output" },
      { label: "Telemetry", value: "Digital Online TDS & Conductivity Display" },
      { label: "Applications", value: "Pharma, Dyeing, Food & Commercial Drinking" },
    ],
    fullSpecs: [
      { attribute: "Brand", value: "Elite Standard Limited" },
      { attribute: "Model / Item Code", value: "ESL-WTS-RO-02" },
      { attribute: "Capacity Range", value: "250 LPH to 100,000+ LPD Permeate Output" },
      { attribute: "Membrane Brand", value: "Dow Filmtec (USA) / Toray / Hydranautics Spiral Wound TFC" },
      { attribute: "Membrane Housing", value: "SS304 / FRP High Pressure 300 - 450 PSI Vessel" },
      { attribute: "Booster Pump", value: "CNP / Grundfos Vertical Multi-Stage Centrifugal SS316" },
      { attribute: "Pre-Treatment Train", value: "Multi-Media Sand Filter + Activated Carbon + 5 Micron Spun Cartridge" },
      { attribute: "Dosing Skid", value: "Automatic Antiscalant Metering Dosing Pump with Chemical Tank" },
      { attribute: "Control Panel", value: "Microprocessor RO Controller with Auto-Flush & Low/High Pressure Cutoff" },
      { attribute: "Instrumentation", value: "Permeate Flowmeter, Concentrate Flowmeter, Dual Digital Pressure Gauges" },
      { attribute: "TDS Rejection Rate", value: "98.5% - 99.2% Dissolved Solids Removal" },
      { attribute: "Electrical Input", value: "380V - 415V, 3-Phase, 50Hz (Commercial / Industrial)" },
      { attribute: "Standards", value: "WHO Drinking Water Guidelines, BP/USP Purified Water Standards" },
      { attribute: "Warranty", value: "2 Years Service Warranty & 1 Year Membrane Performance Warranty" },
    ],
    descriptionBlocks: [
      {
        heading: "Sub-Micron Molecular Desalination with 99.2% Salt Rejection",
        text: "Engineered with genuine Dow Filmtec TFC cross-flow spiral-wound membranes, our RO plants remove heavy metals, dissolved arsenic, sodium, nitrates, bacteria, and virus molecules at 0.0001 micron resolution.",
        image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
        badge: "0.0001 Micron",
      },
      {
        heading: "Automated High-Pressure Safety & Low-Energy VFD Operation",
        text: "Equipped with automatic low-pressure cutoffs to prevent pump cavitation and high-pressure release valves to safeguard membrane life, this skid guarantees maximum permeate recovery with minimum utility power.",
        image: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=800&auto=format&fit=crop",
        badge: "Energy Efficient",
      },
    ],
    packages: [
      { tier: "Level 3 - Small Facility", capacity: "250 - 1,000 LPH", application: "Corporate Office Canteen, Dialysis Clinic, School" },
      { tier: "Level 6 - Commercial", capacity: "2,000 - 5,000 LPH", application: "Beverage Bottling, Hotel, Commercial Central Supply" },
      { tier: "Level 9 - Industrial Mega", capacity: "10,000 - 50,000+ LPH", application: "Textile Dyeing, Boiler Feed, Pharmaceutical Water for Injection" },
    ],
  },
  "vrf-climate": {
    slug: "vrf-climate",
    code: "ESL-HVAC-VRF-04",
    title: "VRF/VRV Tropical Climate Inverter Multi-Split Central Air Conditioning System",
    brand: "Elite Standard Limited",
    category: "HVAC & Climate",
    regularPrice: "Tk 4,10,000",
    specialPrice: "Tk 3,85,000",
    inStock: true,
    warranty: "5 Years Compressor & 2 Years Parts Warranty",
    galleryImages: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    ],
    quickSpecs: [
      { label: "Cooling Capacity", value: "8 HP - 64 HP Modular Combination" },
      { label: "Compressor Type", value: "DC Inverter Scroll (Tropical 52°C Rated)" },
      { label: "Refrigerant", value: "Eco-Friendly R-410A / R-32" },
      { label: "Efficiency (COP)", value: "High COP Up to 4.85 / IPLV 7.2" },
      { label: "BMS Connectivity", value: "Modbus RTU / BACnet IP Gateways" },
      { label: "Warranty", value: "5 Years Compressor Warranty" },
    ],
    fullSpecs: [
      { attribute: "Brand", value: "Elite Standard Limited OEM / Tier-1 Partner" },
      { attribute: "Model / Item Code", value: "ESL-HVAC-VRF-04" },
      { attribute: "Horsepower Range", value: "8 HP to 64 HP per Multi-Bank System" },
      { attribute: "Cooling Capacity (BTU)", value: "76,400 BTU/hr to 612,000 BTU/hr" },
      { attribute: "Compressor Model", value: "High-Efficiency DC Inverter Dual Twin Rotary / Scroll" },
      { attribute: "Ambient Operating Range", value: "-5°C to +52°C Tropicalized Ambient Rating" },
      { attribute: "Coil Protection", value: "Hydrophilic Golden Fin with Anti-Corrosion Salt Spray Coating" },
      { attribute: "Piping Length (Total)", value: "Up to 1,000 Meters Total Equivalent Piping Length" },
      { attribute: "Elevation Difference", value: "Up to 110 Meters Between Outdoor and Indoor Units" },
      { attribute: "Indoor Unit Compatibility", value: "4-Way Cassette, Concealed Duct, Floor Standing & Ceiling Suspended" },
      { attribute: "BMS Telemetry", value: "Native BACnet/IP, Modbus, LonWorks Energy Monitoring Gateways" },
      { attribute: "Power Supply", value: "380V - 415V, 3-Phase, 50Hz" },
      { attribute: "Standards", value: "ASHRAE 90.1, BNBC 2020 Part 8, AHRI 1230 Certified" },
      { attribute: "Warranty", value: "5 Years Compressor, 2 Years Comprehensive Electronics" },
    ],
    descriptionBlocks: [
      {
        heading: "Full DC Inverter Modulation with 4.85 Coefficient of Performance",
        text: "By steplessly varying compressor motor speed from 15Hz to 140Hz depending on room thermal demand, our VRF systems eliminate energy-wasting on/off cycles, reducing electricity bills by up to 40% compared to conventional chillers.",
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
        badge: "Smart Inverter",
      },
    ],
    packages: [
      { tier: "Level 3 - Luxury Villa", capacity: "4 - 10 HP", application: "Luxury Apartments, Duplex Residences & Penthouses" },
      { tier: "Level 6 - Commercial Office", capacity: "18 - 36 HP", application: "Corporate Floor Headquarters, Clinics & Banks" },
      { tier: "Level 9 - Multi-Story Tower", capacity: "40 - 64+ HP", application: "Commercial Towers, Hotels & Cleanrooms" },
    ],
  },
  "fire-pump-skid": {
    slug: "fire-pump-skid",
    code: "ESL-FDPS-PUMP-06",
    title: "UL/FM Certified Packaged Fire Fighting Pump Station Skid (Electric + Diesel + Jockey)",
    brand: "Elite Standard Limited",
    category: "Fire Protection",
    regularPrice: "Tk 8,20,000",
    specialPrice: "Tk 7,50,000",
    inStock: true,
    warranty: "3 Years NFPA Compliance Support & SLA",
    galleryImages: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    ],
    quickSpecs: [
      { label: "Flow Capacity", value: "500 GPM - 2500 GPM" },
      { label: "Working Pressure", value: "10 - 16 Bar (145 - 230 PSI)" },
      { label: "Drivers", value: "Main Electric Motor + Standby Diesel Engine" },
      { label: "Jockey Pump", value: "Vertical High-Pressure Pressure Sustaining" },
      { label: "Certifications", value: "UL-Listed & FM-Approved Skids" },
      { label: "Compliance", value: "NFPA 20, BNBC 2020 Part 4 & FSCD Clearance" },
    ],
    fullSpecs: [
      { attribute: "Brand", value: "Elite Standard Limited (Patterson / Peerless / Clarke OEM)" },
      { attribute: "Model / Item Code", value: "ESL-FDPS-PUMP-06" },
      { attribute: "Flow Capacity Range", value: "500 GPM, 750 GPM, 1000 GPM, 1500 GPM to 2500 GPM" },
      { attribute: "Pump Type", value: "Horizontal Split-Case / End-Suction Centrifugal" },
      { attribute: "Rated Pressure", value: "10 Bar to 16 Bar (145 PSI to 230 PSI)" },
      { attribute: "Electric Motor Driver", value: "TEFC Squirrel Cage Induction Motor (IP55) Class F" },
      { attribute: "Diesel Engine Driver", value: "Clarke / Cummins Industrial Diesel Engine with Heat Exchanger Cooling" },
      { attribute: "Jockey Pump Assembly", value: "Grundfos / CNP Vertical Multi-Stage (20 - 50 GPM)" },
      { attribute: "Control Panel Skids", value: "UL/FM Microprocessor Control Panels with Auto Battery Chargers" },
      { attribute: "Valves & Accessories", value: "OS&Y Gate Valves, Non-Slam Check Valves, Flow Meter & Relief Valve" },
      { attribute: "Standards", value: "NFPA 20, NFPA 13, BNBC 2020 Part 4 Fire Protection Code" },
      { attribute: "Warranty", value: "3 Years Comprehensive Support & Annual FSCD Audit Clearance" },
    ],
    descriptionBlocks: [
      {
        heading: "Full NFPA 20 Triplex Redundancy for Zero-Downtime Life Safety",
        text: "The skid integrates an electric duty pump, an autonomous diesel standby pump that cranks within 15 seconds during utility power failure, and a vertical jockey pump to maintain system hydraulic pressure.",
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
        badge: "NFPA 20 Certified",
      },
    ],
    packages: [
      { tier: "Level 3 - Commercial Mid-Rise", capacity: "500 - 750 GPM", application: "Commercial Buildings, Supermarkets & Low-Rise Towers" },
      { tier: "Level 6 - High-Rise Complex", capacity: "1000 - 1500 GPM", application: "Corporate Towers, Garment Factories & Hospitals" },
      { tier: "Level 9 - Industrial Mega", capacity: "2000 - 2500+ GPM", application: "Textile Hubs, Chemical Plants & Logistics Depots" },
    ],
  },
  "lt-switchgear": {
    slug: "lt-switchgear",
    code: "ESL-PDCP-LT-08",
    title: "Form-4 Type Tested Low Voltage (LT) Switchgear & Power Distribution Panel",
    brand: "Elite Standard Limited",
    category: "Power & Switchgear",
    regularPrice: "Tk 3,60,000",
    specialPrice: "Tk 3,20,000",
    inStock: true,
    warranty: "3 Years Comprehensive Engineering Guarantee",
    galleryImages: [
      "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    ],
    quickSpecs: [
      { label: "Current Rating", value: "630A - 4000A Main Incomer" },
      { label: "Short Circuit", value: "50 kA / 1s Fault Withstand" },
      { label: "Air Circuit Breakers", value: "ABB Emax2 / Schneider MasterPact MTZ" },
      { label: "Busbar Material", value: "99.9% Electrolytic Pure ETP Copper" },
      { label: "Enclosure Sheet", value: "2.0mm Electro-Galvanized Powder Coated (IP54)" },
      { label: "Standards", value: "IEC 61439-1/2, IEEE & BNBC 2020 Part 8" },
    ],
    fullSpecs: [
      { attribute: "Brand", value: "Elite Standard Limited Switchgear Fabrication" },
      { attribute: "Model / Item Code", value: "ESL-PDCP-LT-08" },
      { attribute: "Nominal Operating Voltage", value: "415V AC, 3-Phase 4-Wire + Earth" },
      { attribute: "Rated Current Range", value: "630A, 800A, 1250A, 1600A, 2500A, 3200A to 4000A" },
      { attribute: "Short-Time Withstand", value: "50 kA for 1 Second (Type-Tested Assembly)" },
      { attribute: "Separation Form", value: "Form-4b Internal Segregation for Operator Safety" },
      { attribute: "Incomer Breakers", value: "ABB Emax2 / Schneider MasterPact MTZ Air Circuit Breakers (ACB)" },
      { attribute: "Outgoing Feeders", value: "ABB Tmax XT / Schneider Compact NSX Moulded Case Circuit Breakers (MCCB)" },
      { attribute: "Busbar System", value: "99.9% High Conductivity Copper with Flame-Retardant Heat Shrink Sleeving" },
      { attribute: "Power Quality Module", value: "Built-in Automatic Power Factor Improvement (PFI) Steps for 0.99 PF" },
      { attribute: "Telemetry & Meters", value: "Digital Multi-Function Power Analyzer (Voltage, Current, THD, kWh, kVA)" },
      { attribute: "Enclosure Protection", value: "IP54 Dust & Splash-Proof (IP65 Available on Custom Request)" },
      { attribute: "Standards Compliance", value: "IEC 61439-1/2, IEC 60947-2, BNBC 2020 Part 8 & BREB Guidelines" },
      { attribute: "Warranty", value: "3 Years Comprehensive System & Busbar Warranty" },
    ],
    descriptionBlocks: [
      {
        heading: "Form-4 Compartmentalization for Zero Hazard & Seamless Maintenance",
        text: "Every busbar compartment, cable termination chamber, and breaker module is physically segregated with metallic barriers, enabling live feeder servicing while adjacent compartments remain energized.",
        image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop",
        badge: "Form-4 Safety",
      },
    ],
    packages: [
      { tier: "Level 3 - Commercial Floor", capacity: "250A - 630A", application: "Sub-Distribution Boards for Corporate Floors & Retail" },
      { tier: "Level 6 - Medium Facility", capacity: "800A - 1600A", application: "Main Distribution Boards for Towers & Commercial Plazas" },
      { tier: "Level 9 - Industrial Substation", capacity: "2000A - 4000A", application: "Factory Main Switchboards with Automatic PFI Plants" },
    ],
  },
};

export default function ProductDetailPage({ params }: { params: { category: string } }) {
  // If product not found in map, fallback to iron-removal-plant or default
  const product = productDetailsMap[params.category] || productDetailsMap["iron-removal-plant"];

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "description" | "packages" | "reviews" | "inquiry">("specs");

  // Inquiry form states
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquiryName("");
      setInquiryEmail("");
      setInquiryPhone("");
      setInquiryMessage("");
    }, 4000);
  };

  // Related equipment list for right sidebar (Exact Ryans layout)
  const relatedProducts = [
    {
      title: "Reverse Osmosis (RO) Purification Plant",
      code: "ESL-WTS-RO-02",
      price: "Tk 85,000",
      image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop",
      href: "/products/ro-system",
    },
    {
      title: "VRF/VRV Inverter Outdoor Unit",
      code: "ESL-HVAC-VRF-04",
      price: "Tk 3,85,000",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
      href: "/products/vrf-climate",
    },
    {
      title: "UL/FM Certified Packaged Fire Pump",
      code: "ESL-FDPS-PUMP-06",
      price: "Tk 7,50,000",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
      href: "/products/fire-pump-skid",
    },
    {
      title: "Form-4 LT Power Switchboard Panel",
      code: "ESL-PDCP-LT-08",
      price: "Tk 3,20,000",
      image: "https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?q=80&w=800&auto=format&fit=crop",
      href: "/products/lt-switchgear",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f6f8] text-slate-800 pb-20">
      
      {/* 1. Ryans Top Breadcrumbs Path */}
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
            <span className="text-slate-500 font-medium">{product.category}</span>
            <FaChevronRight className="text-[9px] text-slate-300" />
            <span className="font-bold text-brand-900 truncate max-w-xs sm:max-w-md">
              {product.code}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <span className="text-[11px] text-slate-500">
              Hotline: <strong className="text-brand-950 font-bold">+880 1313-663311</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* ======================================================== */}
        {/* 2. TOP HERO PRODUCT SHOWCASE (2 Columns: Gallery & Summary) */}
        {/* ======================================================== */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Vertical Thumbnails + Main Large Product Image */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-center sm:items-start">
              
              {/* Vertical Thumbnail Strip (Exact Ryans Gallery UI) */}
              <div className="flex sm:flex-col gap-2 shrink-0">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-md border overflow-hidden p-1 bg-white transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-contain"
                      sizes="64px"
                    />
                  </button>
                ))}
              </div>

              {/* Main Large Image Container */}
              <div className="relative w-full h-[320px] sm:h-[400px] rounded-xl border border-slate-200/90 bg-white flex items-center justify-center p-4 overflow-hidden group shadow-sm">
                <Image
                  src={product.galleryImages[activeImageIndex]}
                  alt={product.title}
                  fill
                  unoptimized
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Stock Tag on Image Top Corner */}
                <div className="absolute top-3 left-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock</span>
                </div>
              </div>
            </div>

            {/* Right Column: Title, Code, Quick Specs & Purchase CTA */}
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                {/* Title */}
                <h1 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight mb-2">
                  {product.title}
                </h1>

                {/* Sub-header meta tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1 pb-3.5 border-b border-slate-100 text-xs">
                  <span className="px-2.5 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-700 border border-slate-200 text-[11px]">
                    Model: {product.code}
                  </span>
                  <span className="text-slate-500 font-medium">
                    Brand: <strong className="text-slate-900">{product.brand}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 text-[11px]">
                    <FaCheck className="text-[9px]" />
                    <span>100% Genuine OEM</span>
                  </span>
                </div>

                {/* Price Display Block (Clean, Perfectly Aligned) */}
                <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-500">Special Offer Price:</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100/80 text-emerald-800 border border-emerald-200">
                        Special B2B Project Rate
                      </span>
                    </div>

                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading tracking-tight">
                        {product.specialPrice}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        Regular: <del className="font-mono text-slate-400">{product.regularPrice}</del>
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 shrink-0">
                    <span className="text-[11px] font-medium text-slate-500 block">Warranty Support</span>
                    <span className="text-xs font-bold text-slate-900 inline-flex items-center sm:justify-end gap-1.5 mt-0.5">
                      <FaShieldAlt className="text-emerald-600 text-xs" />
                      <span>2 Years Full OEM</span>
                    </span>
                  </div>
                </div>

                {/* Quick Technical Highlights (Clean, Uncluttered, No Truncation) */}
                <div className="bg-slate-50/90 rounded-xl p-4 border border-slate-200/80 mb-6">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200/60">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>Quick Technical Highlights</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">Standard Compliance</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    {product.quickSpecs.map((spec, sIdx) => (
                      <div
                        key={sIdx}
                        className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 leading-relaxed"
                      >
                        <span className="text-slate-600 font-bold sm:min-w-[130px] shrink-0 flex items-center gap-1.5">
                          <span className="text-emerald-500 text-[10px]">•</span>
                          <span>{spec.label}:</span>
                        </span>
                        <span className="text-slate-900 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quantity, RFQ & Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3">
                {/* Quantity Counter (Commented out per user request) */}
                {/* <div className="flex items-center border border-slate-200 rounded-md overflow-hidden bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <FaMinus className="text-[10px]" />
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-slate-900 font-mono">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-100 transition-colors"
                  >
                    <FaPlus className="text-[10px]" />
                  </button>
                </div> */}

                {/* Primary CTA: Request Quotation / Order */}
                <a
                  href={`/contact?type=quotation&product=${encodeURIComponent(product.title)}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#10b981] hover:bg-emerald-600 text-white font-bold text-sm py-3 px-6 rounded-md shadow-sm transition-colors text-center"
                >
                  <FaPaperPlane className="text-xs" />
                  <span>Request Quotation / BOQ</span>
                </a>

                {/* Datasheet Download (Commented out per user request) */}
                {/* <a
                  href="/elite-standard-profile.pdf"
                  download="Elite_Technical_Datasheet.pdf"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-4 py-3 rounded-md transition-colors whitespace-nowrap"
                >
                  <FaDownload className="text-xs text-slate-500" />
                  <span>Datasheet (PDF)</span>
                </a> */}
              </div>

              {/* Social Share & Direct Contact Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-2">
                  <span>Share:</span>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(product.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
                    title="Share via WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                    title="Share via Facebook"
                  >
                    <FaFacebookF />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-colors"
                    title="Share via LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </div>

                <div className="flex items-center gap-1.5 text-brand-900 font-bold text-xs">
                  <FaPhoneAlt className="text-emerald-600 text-[10px]" />
                  <span>Direct Sales: +880 1313-663311</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. STICKY TABS BAR (Specification | Description | Packages | Reviews) */}
        {/* ======================================================== */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm mb-6 sticky top-16 z-30 overflow-x-auto">
          <div className="flex items-center min-w-max border-b border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab("specs")}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "specs"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/30"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaTools className="text-xs" />
              <span>Technical Specification</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("description")}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "description"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/30"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaFileAlt className="text-xs" />
              <span>Description & Features</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("packages")}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "packages"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/30"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaBoxes className="text-xs" />
              <span>Capacity Packages ({product.packages.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("inquiry")}
              className={`px-5 py-3.5 text-xs font-bold transition-all border-b-2 flex items-center gap-2 ${
                activeTab === "inquiry"
                  ? "border-emerald-600 text-emerald-700 bg-emerald-50/30"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <FaQuestionCircle className="text-xs" />
              <span>Direct Quotation / Q&A</span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. MAIN DETAILS SECTION: SPEC TABLE & RELATED SIDEBAR */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Active Tab Content (Specs, Description, or Packages) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* TAB 1: TECHNICAL SPECIFICATION TABLE (Exact Ryans 2-Col Table) */}
            {activeTab === "specs" && (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 text-white px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Full Technical Specifications</span>
                  <span className="text-accent text-[11px] font-mono">{product.code}</span>
                </div>

                <div className="divide-y divide-slate-100 text-xs">
                  {product.fullSpecs.map((item, idx) => (
                    <div
                      key={idx}
                      className={`grid grid-cols-1 sm:grid-cols-12 p-3.5 gap-2 transition-colors ${
                        idx % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                      } hover:bg-emerald-50/30`}
                    >
                      <div className="sm:col-span-4 font-bold text-slate-700">
                        {item.attribute}
                      </div>
                      <div className="sm:col-span-8 text-slate-900 font-medium leading-relaxed">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: RICH PRODUCT DESCRIPTION & VISUAL BLOCKS */}
            {activeTab === "description" && (
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-8">
                <div className="border-b border-slate-100 pb-4">
                  <h2 className="font-heading text-lg font-bold text-slate-900">
                    Product Overview & Engineering Architecture
                  </h2>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Detailed technical overview and mechanical process specifications for {product.title}.
                  </p>
                </div>

                {product.descriptionBlocks.map((block, bIdx) => (
                  <div key={bIdx} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-emerald-600 rounded-full" />
                      <h3 className="font-heading text-base font-bold text-slate-900">
                        {block.heading}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {block.text}
                    </p>

                    <div className="relative h-64 sm:h-72 w-full rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                      <Image
                        src={block.image}
                        alt={block.heading}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 66vw"
                      />
                      <div className="absolute bottom-3 left-3 bg-brand-950/90 text-accent px-3 py-1 rounded text-[11px] font-bold border border-slate-700">
                        {block.badge}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: PACKAGES & SIZING MATRIX */}
            {activeTab === "packages" && (
              <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="bg-slate-900 text-white px-5 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                  <span>Available Package Sizing & Tiers</span>
                  <span className="text-accent text-[11px] font-mono">3-6-9 Framework</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200 text-slate-800 font-bold uppercase tracking-wider">
                        <th className="p-3.5">Tier Level</th>
                        <th className="p-3.5">Capacity / Flow Rate</th>
                        <th className="p-3.5">Recommended Facility</th>
                        <th className="p-3.5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {product.packages.map((pkg, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3.5 font-bold text-brand-950">
                            <span className="px-2 py-0.5 rounded bg-brand-50 border border-brand-200 text-brand-900 text-[11px]">
                              {pkg.tier}
                            </span>
                          </td>
                          <td className="p-3.5 font-extrabold text-slate-900 font-mono">
                            {pkg.capacity}
                          </td>
                          <td className="p-3.5 text-slate-600">
                            {pkg.application}
                          </td>
                          <td className="p-3.5 text-right">
                            <a
                              href={`/contact?type=quotation&tier=${encodeURIComponent(pkg.tier)}`}
                              className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors inline-block"
                            >
                              Get Quote
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: DIRECT INQUIRY & RFQ FORM */}
            {activeTab === "inquiry" && (
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
                <div className="border-b border-slate-100 pb-3 mb-5">
                  <h3 className="font-heading text-base font-bold text-slate-900">
                    Ask an Engineer or Request a Turnkey Quotation
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your facility parameters below and our MEP engineering department will respond within 4 business hours.
                  </p>
                </div>

                {inquirySubmitted ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center flex flex-col items-center gap-2">
                    <FaCheckCircle className="text-emerald-600 text-2xl" />
                    <span className="font-bold text-sm text-emerald-800">Inquiry Received Successfully!</span>
                    <p className="text-xs text-emerald-600">
                      Our technical sales team will contact you shortly regarding <strong>{product.title}</strong>.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Engr. Kabir Ahmed"
                          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-brand-800"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-700 block mb-1">Contact Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="e.g. +880 1711-XXXXXX"
                          className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-brand-800"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Corporate Email Address</label>
                      <input
                        type="email"
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="e.g. kabir@company.com"
                        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-brand-800"
                      />
                    </div>

                    <div>
                      <label className="font-bold text-slate-700 block mb-1">Facility Details / Required Capacity</label>
                      <textarea
                        rows={4}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                        placeholder="Please describe required flow rate (LPH/GPM), building type, raw water iron test value, or specific brand preferences..."
                        className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:border-brand-800"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-brand-950 hover:bg-brand-900 text-white font-bold text-xs px-6 py-2.5 rounded-md transition-colors flex items-center gap-2"
                    >
                      <FaPaperPlane className="text-xs" />
                      <span>Submit Inquiry to Engineering Team</span>
                    </button>
                  </form>
                )}
              </div>
            )}

          </div>

          {/* ======================================================== */}
          {/* Right Column: "Related Equipment / Popular Products" (Exact Ryans Sidebar) */}
          {/* ======================================================== */}
          <aside className="lg:col-span-4 flex flex-col gap-4">
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
              <div className="bg-slate-900 text-white px-4 py-3 font-bold text-xs uppercase tracking-wider flex items-center justify-between">
                <span>Related Equipment</span>
                <span className="text-[10px] text-accent">Popular in MEP</span>
              </div>

              <div className="divide-y divide-slate-100 p-2">
                {relatedProducts.map((rel, rIdx) => (
                  <Link
                    key={rIdx}
                    href={rel.href}
                    className="p-3 flex items-center gap-3 hover:bg-slate-50 transition-colors rounded-md group block"
                  >
                    <div className="relative w-16 h-16 rounded border border-slate-100 bg-white shrink-0 p-1">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        className="object-contain"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-grow">
                      <span className="text-[10px] font-mono text-slate-400 block">{rel.code}</span>
                      <h4 className="font-heading text-xs font-bold text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-tight">
                        {rel.title}
                      </h4>
                      <span className="text-xs font-extrabold text-slate-900 mt-1 block">
                        {rel.price}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-3 border-t border-slate-100 bg-slate-50/70 text-center">
                <Link
                  href="/products"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
                >
                  <span>View All Equipment Catalog</span>
                  <FaChevronRight className="text-[9px]" />
                </Link>
              </div>
            </div>

            {/* Engineering Assurance Card */}
            <div className="bg-gradient-to-br from-brand-950 to-brand-900 text-white p-5 rounded-lg border border-brand-800 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2 text-accent font-bold text-xs uppercase tracking-wider">
                <FaAward className="text-sm" />
                <span>Elite Standard Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All electro-mechanical installations include full site heat load testing, hydraulic calculation documentation, and 24/7 breakdown technical SLA.
              </p>
              <div className="pt-2 border-t border-brand-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>ISO 9001:2015 Process</span>
                <span className="text-accent font-mono font-bold">BNBC 2020 Compliant</span>
              </div>
            </div>
          </aside>

        </div>

      </div>
    </main>
  );
}

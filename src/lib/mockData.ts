export interface ServiceItem {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  bannerImage: string;
  problems: string[];
  solutions: string[];
  scopeOfWork: string[];
  faqs: { question: string; answer: string }[];
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
  relatedServiceSlug: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  completionDate: string;
  description: string;
  image: string;
  scope: string[];
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  summary: string;
  content: string;
  image: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: "s1",
    slug: "hvac",
    code: "HVAC",
    title: "Heating, Ventilation & Air Conditioning",
    subtitle: "Industrial & Commercial Climate Control",
    shortDescription: "End-to-end HVAC design, VRF installation, cleanroom ventilation, and energy-efficient ducting systems.",
    fullDescription: "Elite Standard Limited delivers state-of-the-art HVAC systems designed for industrial facilities, commercial towers, and pharmaceutical cleanrooms. Our solutions optimize indoor air quality, thermal comfort, and energy efficiency.",
    icon: "FaSnowflake",
    bannerImage: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "High energy consumption in conventional cooling systems",
      "Uneven temperature distribution and humidity control issues",
      "Inadequate ventilation causing compliance & health risks"
    ],
    solutions: [
      "Custom VRF/VRV system integration with smart thermostats",
      "Precision air handling units (AHU) with HEPA filtration",
      "Automated building management system (BMS) integration"
    ],
    scopeOfWork: [
      "Heat load calculation & psychrometric analysis",
      "Ductwork design & fabrication compliant with SMACNA",
      "Chillers, AHU, FCU installation & commissioning",
      "Cleanroom positive pressure validation"
    ],
    faqs: [
      {
        question: "What types of HVAC systems do you specialize in?",
        answer: "We specialize in VRF/VRV multi-split systems, chilled water systems, rooftop package units, and precision ACs for data centers."
      },
      {
        question: "Do you offer energy audit and retrofit services?",
        answer: "Yes, we perform comprehensive energy audits to upgrade aging HVAC infrastructures with high-COP chillers and inverter technology."
      }
    ]
  },
  {
    id: "s2",
    slug: "fdps",
    code: "FDPS",
    title: "Fire Detection & Protection System",
    subtitle: "NFPA-Compliant Life Safety Systems",
    shortDescription: "Automated fire sprinkler, addressable alarm, hydrant network, and gas suppression engineering.",
    fullDescription: "Protecting infrastructure and personnel with NFPA and BNBC certified fire detection and suppression engineering. We design turnkey active and passive fire safety networks.",
    icon: "FaFireExtinguisher",
    bannerImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Non-compliance with national BNBC and international NFPA codes",
      "False alarms disrupting factory operations",
      "Lack of automated gas suppression in high-value server rooms"
    ],
    solutions: [
      "Addressable smoke & heat detector arrays with central control panel",
      "FM200 / Novec 1230 clean agent gas suppression installation",
      "High-pressure fire hydrant & automatic wet pipe sprinkler network"
    ],
    scopeOfWork: [
      "Hydraulic calculation & fire safety risk assessment",
      "UL/FM listed fire pump station installation",
      "Fire alarm voice evacuation integration",
      "Authority inspection & safety certification support"
    ],
    faqs: [
      {
        question: "Are your fire protection designs certified by Bangladesh Fire Service?",
        answer: "Yes, all our engineering blueprints adhere strictly to BNBC, NFPA standards, and receive approvals from FSCD."
      }
    ]
  },
  {
    id: "s3",
    slug: "guds",
    code: "GUDS",
    title: "Generator & Utility Distribution System",
    subtitle: "Uninterrupted Industrial Power Infrastructure",
    shortDescription: "Heavy-duty diesel generator synchronization, acoustic canopy, busbar trunking, and fuel automation.",
    fullDescription: "Ensuring 100% power uptime for manufacturing plants and commercial complexes through synchronized generator banks, acoustic silencers, and automatic transfer switches (ATS).",
    icon: "FaBolt",
    bannerImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Power outages causing costly production downtime",
      "High noise pollution from unshielded industrial generators",
      "Inefficient load sharing across multiple power sources"
    ],
    solutions: [
      "Multi-megawatt generator synchronization panels",
      "Custom soundproof acoustic enclosures (<75 dBA @ 1 meter)",
      "Automated fuel delivery and day-tank monitoring"
    ],
    scopeOfWork: [
      "Generator sizing and transient load analysis",
      "Acoustic lining & exhaust chimney installation",
      "ATS & AMF panel commissioning",
      "Substation integration"
    ],
    faqs: [
      {
        question: "Can you synchronize generators of different manufacturers?",
        answer: "Yes, our automation engineers configure deep sea or ComAp controllers for seamless multi-brand synchronization."
      }
    ]
  },
  {
    id: "s4",
    slug: "pdcp",
    code: "PDCP",
    title: "Power Distribution & Control Panel",
    subtitle: "Custom Switchgear & Electrical Panels",
    shortDescription: "LT/HT panels, PFI plants, Motor Control Centers (MCC), and smart power distribution boards.",
    fullDescription: "In-house design and fabrication of type-tested LT panels, HT switchgear, Power Factor Improvement (PFI) plants, and MCC panels with international safety ratings.",
    icon: "FaMicrochip",
    bannerImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Low power factor resulting in utility surcharge penalties",
      "Overheating and electrical arc hazards in legacy switchboards",
      "Lack of centralized motor control in automated assembly lines"
    ],
    solutions: [
      "Automatic PFI plants achieving up to 0.99 power factor",
      "Form-4 segmented LT panels with busbar heat shrink sleeves",
      "VFD-integrated smart MCC panels with Modbus communication"
    ],
    scopeOfWork: [
      "Short-circuit thermal analysis & panel drafting",
      "Busbar fabrication & dielectric withstand testing",
      "Relay logic programming & digital metering",
      "On-site installation and thermography testing"
    ],
    faqs: [
      {
        question: "What IP ratings do your control panels support?",
        answer: "We build IP54 to IP65 weather-proof and dust-proof enclosures suitable for outdoor or harsh industrial environments."
      }
    ]
  },
  {
    id: "s5",
    slug: "eels",
    code: "EELS",
    title: "Electrical & Lighting Systems",
    subtitle: "Precision Industrial & Architectural Lighting",
    shortDescription: "Substation setup, cable tray routing, lightning protection, and smart LED lighting networks.",
    fullDescription: "Comprehensive electrical engineering including HT substations, transformer installation, earth grounding networks, and energy-saving smart lighting solutions.",
    icon: "FaLightbulb",
    bannerImage: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "High electricity bills from legacy HID fixtures",
      "Inadequate lightning protection threatening electronic gear",
      "Voltage fluctuations ruining sensitive production equipment"
    ],
    solutions: [
      "High-efficiency industrial LED luminaires with DALI dimming",
      "Early Streamer Emission (ESE) lightning protection systems",
      "Dry-type transformer and AVR stabilization networks"
    ],
    scopeOfWork: [
      "Dialux lighting simulation & illuminance mapping",
      "HT/LT cable laying & underground trenching",
      "Earthing grid resistance testing (<1 Ohm)",
      "Emergency lighting & exit sign network design"
    ],
    faqs: [
      {
        question: "Do you supply ESE lightning arrestors?",
        answer: "Yes, we install certified ESE lightning protection systems with coverage radii up to 107 meters."
      }
    ]
  },
  {
    id: "s6",
    slug: "iba",
    code: "IBA",
    title: "Industrial Building Automation",
    subtitle: "Smart Factory & BMS Integration",
    shortDescription: "PLC programming, SCADA monitoring, IoT sensors, and centralized facility management systems.",
    fullDescription: "Empowering modern industries with smart automation, real-time sensor tracking, centralized SCADA software, and building management systems (BMS).",
    icon: "FaIndustry",
    bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Manual equipment monitoring leading to human error",
      "Unplanned machine breakdowns due to lack of predictive maintenance",
      "Inability to monitor energy consumption across different production lines"
    ],
    solutions: [
      "Siemens / Schneider PLC & HMI automation",
      "Centralized SCADA dashboard for remote telemetry",
      "Smart energy meters linked to cloud analytics"
    ],
    scopeOfWork: [
      "Control philosophy definition & IO listing",
      "PLC code development & HMI graphics design",
      "Field sensor & actuator wiring",
      "System integration and FAT/SAT testing"
    ],
    faqs: [
      {
        question: "Which PLC brands do you support?",
        answer: "We work with leading automation platforms including Siemens S7-1200/1500, Schneider Electric, Mitsubishi, and Omron."
      }
    ]
  },
  {
    id: "s7",
    slug: "wsds",
    code: "WSDS",
    title: "Water Supply & Drainage Systems",
    subtitle: "Commercial & Industrial Plumbing Engineering",
    shortDescription: "Hydro-pneumatic pumping stations, hot/cold water supply, drainage networks, and stormwater harvest.",
    fullDescription: "Reliable plumbing and drainage engineering for high-rise residential, commercial hubs, and industrial factories, ensuring optimal pressure and hygienic water distribution.",
    icon: "FaShower",
    bannerImage: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Low water pressure on upper floors of multi-story buildings",
      "Frequent pipe corrosion and leakages",
      "Poor rainwater management leading to localized flooding"
    ],
    solutions: [
      "Booster pump sets with variable frequency drives (VFD)",
      "PPR & HDPE corrosion-resistant piping networks",
      "Submersible drainage pump stations with level sensors"
    ],
    scopeOfWork: [
      "Water demand calculation & riser diagram design",
      "Hydro-pneumatic booster system installation",
      "Plumbing fixture piping & backflow prevention",
      "Stormwater drainage and soakwell network"
    ],
    faqs: [
      {
        question: "Do you install constant pressure water boosting systems?",
        answer: "Yes, our VFD booster pumps maintain constant pressure across all taps while reducing energy consumption."
      }
    ]
  },
  {
    id: "s8",
    slug: "wts",
    code: "WTS",
    title: "Water Treatment Systems",
    subtitle: "ETP, STP & WTP Engineering Solutions",
    shortDescription: "Effluent treatment plants (ETP), sewage treatment (STP), and reverse osmosis (RO) purification.",
    fullDescription: "Sustainable environmental engineering offering industrial ETPs, bio-reactor STPs, and RO purification plants to meet strict DoE environmental discharge standards.",
    icon: "FaWater",
    bannerImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Strict government Department of Environment (DoE) penalties for untreated discharge",
      "High ground water salinity damaging industrial machinery",
      "Sludge disposal challenges in textile and chemical plants"
    ],
    solutions: [
      "Biological & Chemical ETP with Zero Liquid Discharge (ZLD) option",
      "MBBR / MBR technology compact Sewage Treatment Plants",
      "Industrial RO & De-mineralization (DM) plants"
    ],
    scopeOfWork: [
      "Wastewater sampling & chemical analysis",
      "Civil & electro-mechanical ETP/STP turnkey construction",
      "Dosing pumps, blowers, and membrane installation",
      "Operator training & DoE clearance documentation"
    ],
    faqs: [
      {
        question: "Can your ETP achieve Zero Liquid Discharge (ZLD)?",
        answer: "Yes, we integrate evaporators and crystallizers with RO systems for 95%+ water recovery."
      }
    ]
  },
  {
    id: "s9",
    slug: "rhs",
    code: "RHS",
    title: "Renewable & Solar Solutions",
    subtitle: "Rooftop Solar & Green Power Generation",
    shortDescription: "On-grid rooftop solar PV plants, net metering installation, and industrial solar integration.",
    fullDescription: "Empowering businesses to reduce electricity bills with high-efficiency rooftop solar PV installations, net metering, and clean solar power storage systems.",
    icon: "FaSun",
    bannerImage: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1200&auto=format&fit=crop",
    problems: [
      "Rising utility tariff costs impacting profit margins",
      "Corporate carbon footprint reduction targets",
      "Unused factory rooftop space"
    ],
    solutions: [
      "Tier-1 Mono PERC solar panel arrays with 25-year warranty",
      "High-efficiency string inverters with online monitoring",
      "Net Metering system setup for selling surplus energy back to the grid"
    ],
    scopeOfWork: [
      "Rooftop structural audit & shadow analysis",
      "Solar array mounting & DC/AC cable management",
      "Net meter installation & utility agreement support",
      "Remote monitoring app integration"
    ],
    faqs: [
      {
        question: "What is the typical ROI period for rooftop solar in Bangladesh?",
        answer: "With current commercial tariffs, industrial rooftop solar projects typically payback in 3 text to 4 years."
      }
    ]
  }
];

export const productsData: ProductItem[] = [
  {
    id: "p1",
    slug: "vrf-air-conditioner",
    name: "Industrial VRF Outdoor Unit (64 HP)",
    category: "HVAC Systems",
    brand: "Daikin / Midea",
    description: "High-COP variable refrigerant flow outdoor unit designed for tropical conditions up to 52°C ambient temperature.",
    specifications: {
      "Cooling Capacity": "180 kW",
      "Refrigerant": "R-410A / R-32",
      "COP": "4.65",
      "Power Supply": "380-415V / 3Ph / 50Hz"
    },
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=600&auto=format&fit=crop",
    relatedServiceSlug: "hvac"
  },
  {
    id: "p2",
    slug: "fire-pump-skid",
    name: "UL/FM Listed Electric Fire Pump Skid",
    category: "Fire Protection",
    brand: "Grundfos / Clarke",
    description: "Complete horizontal split-case fire pump set with electric motor, jockey pump, and automated NFPA-20 control panel.",
    specifications: {
      "Flow Rate": "1000 GPM",
      "Pressure Head": "12 Bar (175 PSI)",
      "Standard": "NFPA 20 / UL-FM Listed",
      "Motor Power": "125 HP"
    },
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=600&auto=format&fit=crop",
    relatedServiceSlug: "fdps"
  },
  {
    id: "p3",
    slug: "lt-switchgear-panel",
    name: "3200A Main LT Switchgear Panel",
    category: "Power Panels",
    brand: "Elite Standard Fabrications",
    description: "Form-4 type tested Low Voltage distribution panel equipped with ABB ACB breakers and digital power analyzer.",
    specifications: {
      "Rated Current": "3200 Amps",
      "Short Circuit Rating": "65 kA for 1 sec",
      "Protection Degree": "IP 54",
      "Enclosure": "2.0mm Electro-galvanized sheet"
    },
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    relatedServiceSlug: "pdcp"
  },
  {
    id: "p4",
    slug: "diesel-generator-500kva",
    name: "500 kVA Diesel Generator Set",
    category: "Generators",
    brand: "Cummins / Perkins",
    description: "Heavy-duty 500 kVA prime diesel generator fitted with Deep Sea controller and super silent canopy.",
    specifications: {
      "Prime Power": "500 kVA / 400 kW",
      "Engine Model": "Cummins KTA19-G4",
      "Noise Level": "72 dBA @ 7 meters",
      "Fuel Consumption": "95 L/hr @ 100% load"
    },
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=600&auto=format&fit=crop",
    relatedServiceSlug: "guds"
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "proj1",
    slug: "pharmaceutical-cleanroom-hvac",
    title: "Square Pharmaceuticals Cleanroom HVAC & MEP Setup",
    category: "HVAC & Cleanroom",
    client: "Square Pharmaceuticals Ltd.",
    location: "Gazipur, Bangladesh",
    completionDate: "November 2025",
    description: "Turnkey Class 10,000 cleanroom HVAC installation, positive pressure regulation, and chilled water network for sterile manufacturing block.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    scope: [
      "1200 TR Centrifugal Chiller Plant",
      "HEPA Air Handler Units (AHU) with ISO 7 classification",
      "BMS monitoring for temperature & differential pressure"
    ]
  },
  {
    id: "proj2",
    slug: "garments-fire-protection-system",
    title: "Apex Spinning & Textiles Fire Safety Upgrade",
    category: "Fire Protection",
    client: "Apex Group",
    location: "Shafipur, Kaliakoir",
    completionDate: "August 2025",
    description: "Comprehensive NFPA 13 sprinkler deployment, 1500 GPM fire pump house, and addressable smoke detector system for 400,000 sq.ft floor area.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
    scope: [
      "UL-Listed Electric & Diesel Fire Pump Skid",
      "4,200 Automatic Fire Sprinklers",
      "FSCD Safety Clearance Certification"
    ]
  },
  {
    id: "proj3",
    slug: "commercial-tower-power-distribution",
    title: "Dhaka Financial Tower 11kV Substation & LT Panels",
    category: "Power Distribution",
    client: "National Properties Ltd.",
    location: "Gulshan-2, Dhaka",
    completionDate: "January 2026",
    description: "Supply and commissioning of 2.5 MVA oil-immersed transformer, 4000A LT main panel, busbar trunking system (BBT), and PFI plant.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
    scope: [
      "2.5 MVA Transformer & HT Vacuum Circuit Breaker",
      "4000A Compact Copper Busbar Trunking",
      "Automatic PFI Plant with 0.99 PF achievement"
    ]
  }
];

export const blogsData: BlogItem[] = [
  {
    id: "b1",
    slug: "bms-energy-saving-guide-2026",
    title: "How Building Automation (BMS) Reduces Industrial Electricity Bills by 25%",
    category: "Automation & HVAC",
    author: "Engr. Mahmudul Hasan",
    publishedAt: "February 10, 2026",
    readTime: "5 min read",
    summary: "Discover how intelligent sensors, PLC control, and scheduled chiller staging drastically cut power waste in commercial facilities.",
    content: "Modern industrial facilities consume up to 60% of their electrical energy on HVAC chilled water plants and motor drives...",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "b2",
    slug: "nfpa-fire-safety-compliance-bangladesh",
    title: "Understanding BNBC & NFPA Standards for Factory Fire Safety Clearance",
    category: "Fire Safety",
    author: "Engr. Farhana Ahmed",
    publishedAt: "January 28, 2026",
    readTime: "7 min read",
    summary: "A practical guide to passing Bangladesh Fire Service inspections and implementing UL-listed active fire protection systems.",
    content: "Fire safety is not merely a legal requirement; it is the cornerstone of workforce safety and brand reputation...",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
  }
];

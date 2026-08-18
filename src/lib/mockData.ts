export interface SubServiceDetail {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  image: string;
}

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
  subServices: SubServiceDetail[];
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
    subServices: [
      {
        id: "ss-hvac-1",
        slug: "vrf",
        title: "VRF/VRV Multi-Split Systems",
        shortDesc: "Tropical high-COP outdoor units engineered for variable loads.",
        fullDesc: "Variable Refrigerant Flow (VRF) technology allows individual zone climate control with inverter compressor staging. Ideal for multi-story corporate headquarters, commercial towers, and hotels.",
        features: [
          "Inverter compressor staging up to 64 HP per outdoor modular bank",
          "R-410A / R-32 eco-friendly refrigerant compliance",
          "Individual touch screen thermostat controllers per zone",
          "Centralized Modbus/BACnet BMS gateway interface"
        ],
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-hvac-2",
        slug: "chillers",
        title: "Chilled Water Plant Setup",
        shortDesc: "Centrifugal chillers, cooling towers & primary/secondary pumps.",
        fullDesc: "High-efficiency central water chilling plants designed for heavy-duty industrial processing plants, textile mills, and mega commercial complexes.",
        features: [
          "Magnetic bearing oil-free centrifugal chillers",
          "Counter-flow induced draft cooling towers with FRP casing",
          "Variable Primary Flow (VPF) pumping automation",
          "Thermal energy storage (TES) integration options"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-hvac-3",
        slug: "cleanroom",
        title: "Cleanroom AHU & HEPA Filtration",
        shortDesc: "ISO Class 5-8 sterile air handling & positive pressure regulation.",
        fullDesc: "Specialized cleanroom HVAC engineering for pharmaceutical oral solid dosage (OSD), injectable blocks, biotech labs, and electronics cleanrooms.",
        features: [
          "Terminal H14 HEPA filter modules with 99.995% efficiency",
          "Dehumidification wheel units maintaining <40% RH",
          "Cascading room differential pressure monitoring",
          "DQ, IQ, OQ, PQ validation protocol execution"
        ],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-hvac-4",
        slug: "precision",
        title: "Data Center Precision AC",
        shortDesc: "N+1 redundant precision cooling for IT server rooms.",
        fullDesc: "Continuous 24/7/365 temperature and humidity stabilization for high-density server racks, telecom switches, and data processing centers.",
        features: [
          "EC fan technology with variable air volume supply",
          "Hot aisle / cold aisle containment containment design",
          "Dual circuit DX & Chilled Water emergency changeover",
          "SNMP remote monitoring & alarm notifications"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-fdps-1",
        slug: "alarm",
        title: "Addressable Fire Alarm Systems",
        shortDesc: "Central intelligence control panel & multi-sensor smoke detectors.",
        fullDesc: "Intelligent micro-processor fire alarm network with pinpoint location detection, voice evacuation speakers, and automatic emergency door release integration.",
        features: [
          "UL Listed 2 to 8 loop addressable main control panel",
          "Optical smoke, thermal heat, and duct smoke detectors",
          "Emergency voice evacuation & strobe sounder beacons",
          "BMS & elevator auto-homing relay interfaces"
        ],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-fdps-2",
        slug: "sprinkler",
        title: "Automatic Wet Pipe Sprinklers",
        shortDesc: "UL/FM listed sprinkler heads, alarm valves & flow switches.",
        fullDesc: "Active fire suppression coverage for industrial factories, warehouses, and commercial high-rises engineered to discharge water instantly upon temperature threshold breaches.",
        features: [
          "Pendent, upright, and sidewall 68°C / 79°C glass bulb sprinklers",
          "Wet alarm check valve assembly with water motor gong",
          "Zone control valve stations with tamper switches",
          "NFPA 13 hydraulic pipe sizing calculations"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-fdps-3",
        slug: "gas",
        title: "FM200 / Novec Gas Suppression",
        shortDesc: "Clean agent fire suppression for electrical rooms & data vaults.",
        fullDesc: "Waterless gas fire extinguishing systems designed to extinguish electrical fires within 10 seconds without damaging sensitive electronics or equipment.",
        features: [
          "Zero ozone depletion FM-200 (HFC-227ea) / Novec 1230 agent",
          "High-pressure seamless steel cylinders with electrical actuators",
          "Cross-zoned smoke detection for pre-discharge abort control",
          "Room integrity fan test & pressure relief damper setup"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-fdps-4",
        slug: "hydrant",
        title: "High-Pressure Hydrant Network",
        shortDesc: "Electric & diesel fire pump skids, hose reels & landing valves.",
        fullDesc: "Heavy-duty outdoor ring main hydrant networks and indoor hose cabinets providing continuous water pressure for firefighter intervention.",
        features: [
          "1000 to 2500 GPM UL/FM listed fire pump sets",
          "Seamless ASTM A53 Schedule 40 red painted steel piping",
          "2-way & 4-way breeching inlet connections (Breeching inlet)",
          "Landing valves, synthetic hoses, and jet/fog nozzles"
        ],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-guds-1",
        slug: "sync",
        title: "Multi-MW Generator Synchronization",
        shortDesc: "Automatic load sharing & peak shaving power control.",
        fullDesc: "Synchronizing multiple diesel or gas generator units to operate in parallel, automatically starting and stopping engines based on real-time plant power demand.",
        features: [
          "Deep Sea DSE8610 / ComAp InteliGen paralleling controllers",
          "Motorized ABB / Schneider ACB breakers with bus tie control",
          "Automatic frequency & voltage matching within milliseconds",
          "Peak shaving & grid export prevention logic"
        ],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-guds-2",
        slug: "canopy",
        title: "Acoustic Canopy Enclosures",
        shortDesc: "Soundproof acoustic treatment reducing noise <75 dBA.",
        fullDesc: "Custom-engineered weatherproof and sound-attenuated enclosures fitted with acoustic rockwool lining, residential mufflers, and motorized louvers.",
        features: [
          "100mm heavy-density rockwool acoustic insulation",
          "Dual residential grade exhaust silencers & stainless bellows",
          "Motorized intake & discharge acoustic louvers",
          "Vibration isolator spring dampers"
        ],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-guds-3",
        slug: "ats",
        title: "ATS & AMF Switch Panels",
        shortDesc: "Automatic Transfer Switches & Mains Failure panels.",
        fullDesc: "Seamless power transfer switchgear that detects grid failure and transfers critical loads to backup generator power within 5 to 10 seconds.",
        features: [
          "4-Pole motorized changover switches up to 3200A",
          "Mechanical & electrical interlocking safety protection",
          "Programmable mains voltage drop & phase imbalance sensing",
          "Manual override handle for emergency bypass"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-guds-4",
        slug: "fuel",
        title: "Automated Fuel System",
        shortDesc: "Bulk storage tanks, day tanks & digital level sensors.",
        fullDesc: "Turnkey fuel management networks ensuring continuous diesel fuel transfer from main underground tanks to day tanks with spill containment.",
        features: [
          "Duplex electric fuel transfer pumps with manual backup",
          "Ultrasonic digital level sensors & high/low level alarms",
          "Underground bulk tank cathodic protection",
          "Fuel water separator & inline filtration units"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-pdcp-1",
        slug: "lt",
        title: "Main LT Switchgear (up to 4000A)",
        shortDesc: "Form-4 type tested Low Voltage power distribution switchboards.",
        fullDesc: "Robust Low Voltage main switchboards fabricated from 2.0mm electro-galvanized sheet steel housing ABB/Schneider Air Circuit Breakers.",
        features: [
          "Form-4 separation separating busbars, breakers & cable terminals",
          "High-purity 99.9% ETP copper busbars with heat shrink insulation",
          "Digital multi-function power meters with RS485 Modbus",
          "IP54 / IP65 dust-proof and splash-proof enclosures"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-pdcp-2",
        slug: "ht",
        title: "HT Substation & VCB Panels",
        shortDesc: "11kV / 33kV Vacuum Circuit Breaker panels & transformers.",
        fullDesc: "Turnkey High Tension (HT) substation setups including 11kV VCB switchgear, dry-type or oil-immersed transformers, and protection relays.",
        features: [
          "11kV 28kV/1min dielectric withstand VCB units",
          "Microprocessor numerical protection relays (50/51/50N/51N)",
          "Cast resin dry-type transformers (F-Class insulation)",
          "SF6 ring main unit (RMU) grid connection panels"
        ],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-pdcp-3",
        slug: "pfi",
        title: "Automatic PFI Plants (0.99 PF)",
        shortDesc: "Microprocessor Power Factor Improvement capacitor banks.",
        fullDesc: "Automated capacitor switching banks that maintain near-unity power factor (0.99), eliminating utility low power factor penalty surcharges.",
        features: [
          "Heavy-duty self-healing metallic film capacitors",
          "Detuning reactors (7% / 14%) for harmonic mitigation",
          "Microprocessor automatic PF controller with digital display",
          "Thyristor switching modules for fast load fluctuations"
        ],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-pdcp-4",
        slug: "mcc",
        title: "Smart VFD Motor Control Center",
        shortDesc: "Automated motor starter & VFD speed regulation panels.",
        fullDesc: "Centralized Motor Control Centers (MCC) for industrial pumps, fans, and conveyor lines featuring direct-on-line (DOL), Star-Delta, and VFD starters.",
        features: [
          "Variable Frequency Drives (VFD) from Danfoss / ABB / Siemens",
          "Thermal overload protection & electronic phase failure relays",
          "Drawout modular compartment design for easy maintenance",
          "HMI touch panel interface for speed monitoring"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-eels-1",
        slug: "bbt",
        title: "Compact Busbar Trunking (BBT)",
        shortDesc: "High-conductivity copper & aluminum BBT distribution.",
        fullDesc: "Modern modular sandwich-type busbar trunking replacing bulky cable bundles in high-rise towers and industrial manufacturing floors.",
        features: [
          "100A to 5000A rated aluminum/copper conductors",
          "Plug-in tap-off boxes with MCCB protection",
          "IP68 cast resin waterproof option for outdoor risers",
          "Low voltage drop & halogen-free insulation"
        ],
        image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-eels-2",
        slug: "lightning",
        title: "ESE Lightning Protection Grid",
        shortDesc: "Early Streamer Emission lightning arrestors & grounding.",
        fullDesc: "Active lightning protection terminals offering extensive protection radius up to 107 meters against direct cloud-to-ground lightning strikes.",
        features: [
          "Stainless steel ESE air terminal (Ionization technology)",
          "Digital lightning strike counters",
          "Copper bonded earth rods & exothermic welding connections",
          "NFC 17-102 international compliance certification"
        ],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-eels-3",
        slug: "led",
        title: "Industrial DALI LED Networks",
        shortDesc: "Smart LED high-bay fixtures with motion & daylight sensors.",
        fullDesc: "Energy-efficient industrial LED luminaires with 160 lm/W efficacy, integrated daylight harvesting sensors, and central DALI dimming control.",
        features: [
          "IP66 / IK10 high-bay LED fixtures for factory floors",
          "DALI-2 protocol centralized lighting management",
          "Occupancy detection & daylight harvesting sensor integration",
          ">50,000 hours L80/B10 operational lifespan"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-eels-4",
        slug: "earthing",
        title: "Earthing Grid Resistance Testing",
        shortDesc: "Low-resistance grounding grids protecting personnel & gear.",
        fullDesc: "Complete electrical grounding grid design utilizing copper tape mesh, chemical earthing compounds, and ground resistance testing.",
        features: [
          "Chemical maintenance-free earthing electrodes",
          "Ground resistance measurement maintaining <1.0 Ohm",
          "Equipotential bonding busbars for equipment chassis",
          "Surge protection devices (SPD Class I+II)"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-iba-1",
        slug: "plc",
        title: "Siemens & Schneider PLC Setup",
        shortDesc: "Programmable Logic Controllers & interactive HMI screens.",
        fullDesc: "Custom PLC control system architecture for industrial processing lines, packaging plants, and material handling conveyors.",
        features: [
          "Siemens S7-1200/1500 & Schneider Modicon M241 PLCs",
          "High-resolution 7\" to 15\" HMI color touchscreens",
          "PID loop control for temperature & pressure regulation",
          "Fail-safe SIL3 emergency stop safety PLC logic"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-iba-2",
        slug: "scada",
        title: "Centralized SCADA Telemetry",
        shortDesc: "Real-time remote facility monitoring & trend logging.",
        fullDesc: "Industrial SCADA software solutions aggregating data across factory floors, generating automated alarm logs, and trend analysis charts.",
        features: [
          "WinCC / Wonderware / Ignition SCADA platform configuration",
          "Real-time historical data logging & SQL database export",
          "Automated SMS & Email alarm notifications for critical events",
          "Multi-user role access security"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-iba-3",
        slug: "bms",
        title: "Smart BMS Energy Analytics",
        shortDesc: "Automated HVAC, power & utility building management.",
        fullDesc: "Integrated Building Management System (BMS) linking chillers, generators, pumps, and energy meters into a single intelligent platform.",
        features: [
          "BACnet IP & MS/TP open protocol architecture",
          "Optimized start/stop scheduling for HVAC chillers",
          "Energy consumption dashboard tracking kWh per department",
          "Web browser & mobile app access control"
        ],
        image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-iba-4",
        slug: "sensors",
        title: "IoT Field Sensors & Actuators",
        shortDesc: "Precision transmitters for temp, humidity & differential pressure.",
        fullDesc: "Calibrated field instruments providing reliable telemetry data to PLC/BMS controllers across demanding industrial environments.",
        features: [
          "4-20mA & 0-10V analog pressure & flow transmitters",
          "Precision Pt100 RTD temperature sensors",
          "Modulated motorized control valves & dampers",
          "Water leak detection cable sensors"
        ],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-wsds-1",
        slug: "booster",
        title: "VFD Hydro-Pneumatic Booster Pumps",
        shortDesc: "Constant pressure water booster sets with VFD control.",
        fullDesc: "Triplex and duplex vertical multistage stainless steel pump sets maintaining constant tap pressure regardless of peak demand flow.",
        features: [
          "Grundfos / Lowara vertical multistage pumps",
          "Pressure diaphragm expansion vessels (10 Bar rated)",
          "VFD inverter motor control reducing power use by 40%",
          "Dry-run protection & auto-alternation logic"
        ],
        image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wsds-2",
        slug: "piping",
        title: "PPR & HDPE Plumbing Risers",
        shortDesc: "Corrosion-free hot & cold water supply pipe networks.",
        fullDesc: "Fittings and piping fabricated from PN20 PPR and high-density polyethylene (HDPE) welded joints guaranteed against corrosion and scale build-up.",
        features: [
          "Heat-fusion socket welded PPR joints (PN16 / PN20)",
          "Electrofusion welded HDPE underground mains",
          "Thermal insulation jacket for hot water lines",
          "Acoustic insulated PVC soil & waste stacks"
        ],
        image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wsds-3",
        slug: "drainage",
        title: "Submersible Drainage Stations",
        shortDesc: "Heavy-duty sump pumps for basement & sewage discharge.",
        fullDesc: "Automatic sump pit drainage systems equipped with cutter impeller pumps, check valves, and high water level alarm floats.",
        features: [
          "Cast iron vortex & cutter impeller pumps",
          "Dual guide rail retrieval system for easy maintenance",
          "Stainless steel level float switches & control panel",
          "Non-return check valves & flexible couplings"
        ],
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wsds-4",
        slug: "stormwater",
        title: "Stormwater Harvesting Networks",
        shortDesc: "Rainwater collection, filtration & underground recharge.",
        fullDesc: "Eco-friendly rainwater management collecting rooftop run-off through multi-stage sand filters for non-potable reuse and groundwater recharge.",
        features: [
          "Automatic first-flush rainwater diverter valves",
          "Underground Modular rainwater storage cells",
          "Sand & carbon pressure filtration units",
          "Recharge well percolation pits"
        ],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
      }
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
    subServices: [
      {
        id: "ss-wts-1",
        slug: "etp",
        title: "Industrial ETP with ZLD Option",
        shortDesc: "Effluent treatment plants for textile, chemical & pharma.",
        fullDesc: "Custom biological activated sludge and chemical coagulation ETP plants designed to treat toxic industrial effluent below DoE discharge limits.",
        features: [
          "Extended aeration tanks & fine bubble diffusers",
          "Coagulation & Flocculation clarification tanks",
          "Filter press sludge dewatering units",
          "Zero Liquid Discharge (ZLD) evaporator integration"
        ],
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wts-2",
        slug: "stp",
        title: "MBBR / MBR Sewage Treatment (STP)",
        shortDesc: "Compact bio-reactor sewage treatment plants.",
        fullDesc: "High-efficiency Moving Bed Biofilm Reactor (MBBR) and Membrane Bio-Reactor (MBR) STPs for commercial towers and residential townships.",
        features: [
          "Virgin polypropylene MBBR bio-carrier media",
          "Submerged hollow-fiber MBR ultrafiltration membranes",
          "Odorless operational design with acoustic blowers",
          "Treated water recycling for toilet flushing & gardening"
        ],
        image: "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wts-3",
        slug: "ro",
        title: "Reverse Osmosis (RO) Purification",
        shortDesc: "Industrial RO plants for boiler feed & drinking water.",
        fullDesc: "High-pressure reverse osmosis plants removing dissolved solids (TDS), heavy metals, and salinity for industrial process water.",
        features: [
          "Dow Filmtec / Toray TFC spiral wound membranes",
          "High-pressure stainless steel Grundfos pumps",
          "Antiscalant dosing & automatic membrane flush cycles",
          "Online TDS & Conductivity monitoring meters"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-wts-4",
        slug: "dm",
        title: "De-Mineralization (DM) Water Plant",
        shortDesc: "Ion exchange resin beds for ultra-pure water.",
        fullDesc: "Two-bed and mixed-bed deionizer systems producing high-purity water with conductivity <1.0 µS/cm for power plant boilers and labs.",
        features: [
          "Strong acid cation & strong base anion resin vessels",
          "Degasser towers for carbon dioxide removal",
          "Automated Acid / Caustic regeneration skids",
          "Resin trap filters & pH neutralization tanks"
        ],
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop"
      }
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
    bannerImage: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=1200&auto=format&fit=crop",
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
    subServices: [
      {
        id: "ss-rhs-1",
        slug: "solar",
        title: "On-Grid Rooftop Solar PV Plants",
        shortDesc: "Tier-1 Mono PERC solar panel arrays for factories.",
        fullDesc: "Turnkey engineering, procurement, and construction (EPC) of rooftop solar power plants converting idle roof space into clean energy.",
        features: [
          "Tier-1 Jinko / Longi 550W+ N-Type TOPCon solar panels",
          "Aluminum HDG elevated mounting structures (140 km/h wind rated)",
          "DC combiner boxes with surge protection & DC isolators",
          "25-Year performance warranty on solar module output"
        ],
        image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-rhs-2",
        slug: "netmetering",
        title: "Net Metering Setup & Approvals",
        shortDesc: "Bi-directional smart meter & utility grid approvals.",
        fullDesc: "Navigating utility approvals (REB/DPDC/DESCO) to export excess solar electricity during non-production hours and offset monthly bills.",
        features: [
          "Bi-directional 3-Phase smart net meter installation",
          "Utility protection relay testing & safety clearance",
          "Grid interconnection agreement documentation",
          "Automated monthly solar credit tracking"
        ],
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-rhs-3",
        slug: "inverters",
        title: "Solar Hybrid Storage Inverters",
        shortDesc: "Huawei / Sungrow string inverters & LiFePO4 battery banks.",
        fullDesc: "Hybrid solar inverters paired with Lithium Iron Phosphate (LiFePO4) energy storage systems providing continuous backup during grid outages.",
        features: [
          "98.6% peak efficiency string inverters (Huawei / Sungrow)",
          "LiFePO4 battery energy storage (6000+ cycle life)",
          "Zero-millisecond UPS emergency load transfer switch",
          "AFCI arc fault protection & IP66 weatherproofing"
        ],
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop"
      },
      {
        id: "ss-rhs-4",
        slug: "monitoring",
        title: "Remote Solar App Monitoring",
        shortDesc: "Real-time generation telemetry & performance monitoring.",
        fullDesc: "Cloud-connected telemetry monitoring daily solar kWh generation, CO2 savings, performance ratio (PR), and automated maintenance alerts.",
        features: [
          "Mobile iOS/Android app & desktop Web portal",
          "String-level current & voltage curve diagnostics",
          "Automated performance ratio (PR) report generation",
          "Remote firmware updates & fault troubleshooting"
        ],
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop"
      }
    ],
    faqs: [
      {
        question: "What is the typical ROI period for rooftop solar in Bangladesh?",
        answer: "With current commercial tariffs, industrial rooftop solar projects typically payback in 3 to 4 years."
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

export interface FlagshipDomainInfo {
  code: string;
  title: string;
  subtitle: string;
  description: string;
  bannerImage: string;
  compliance: string[];
  category: "mechanical" | "electrical" | "plumbing";
  icon: string;
}

export const FLAGSHIP_DOMAINS_OVERVIEW: Record<string, FlagshipDomainInfo> = {
  hvac: {
    code: "HVAC",
    title: "Heating, Ventilation & Air Conditioning (HVAC)",
    subtitle: "Central HVAC, VRF & Cleanroom AHU Systems",
    description:
      "Elite Standard Limited delivers end-to-end HVAC engineering designed to meet the highest standards of energy efficiency, indoor air quality, and thermal comfort. Our certified engineers design and execute turnkey systems compliant with ASHRAE, BNBC, and SMACNA guidelines.",
    bannerImage:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "ASHRAE", "SMACNA", "NFPA"],
    category: "mechanical",
    icon: "FaSnowflake",
  },
  fdps: {
    code: "FDPS",
    title: "Fire Detection & Protection System (FDPS)",
    subtitle: "Hydrant, Sprinkler & FM200 Clean Agent Suppression",
    description:
      "Complete life-safety and fire protection engineering compliant with NFPA codes, BNBC, and FSCD regulations. We execute addressable alarm systems, automatic wet-pipe sprinklers, high-pressure hydrant loops, and gaseous suppression for critical server infrastructure.",
    bannerImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "NFPA 13", "NFPA 72", "FSCD"],
    category: "mechanical",
    icon: "FaFireExtinguisher",
  },
  guds: {
    code: "GUDS",
    title: "Gas & Utility Distribution System (GUDS / PDCP)",
    subtitle: "Natural Gas & LPG Central Distribution Pipelines",
    description:
      "Engineered natural gas and LPG utility distribution networks with pressure reduction manifolds, smart gas leak interlocks, and emergency automatic shutoff valves for commercial kitchens, boilers, and industrial plants.",
    bannerImage:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "NFPA 54", "Titas Gas Guidelines"],
    category: "mechanical",
    icon: "FaIndustry",
  },
  pdcp: {
    code: "PDCP",
    title: "Power Distribution & Control Panel (PDCP / STAS)",
    subtitle: "Form-4 LT Switchgear, Substation & Smart MCC",
    description:
      "Heavy-duty HT/LT power distribution, automated switchgear, micro-processor PFI plants, and intelligent Motor Control Centers engineered for continuous industrial manufacturing uptime.",
    bannerImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "IEC 61439", "IEEE", "NEC"],
    category: "electrical",
    icon: "FaBolt",
  },
  eels: {
    code: "EELS",
    title: "Electrical & Lighting Systems (EELS / ELV)",
    subtitle: "Compact BBT, Early Streamer Lightning & Smart DALI LED",
    description:
      "Modern electrical infrastructure featuring copper/aluminum busbar trunking, active lightning protection grids, low-resistance earthing, and industrial DALI automated LED illumination.",
    bannerImage:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "IEC", "IEEE", "IESNA"],
    category: "electrical",
    icon: "FaLightbulb",
  },
  iba: {
    code: "IBA",
    title: "Industrial Building Automation (IBA / BMS)",
    subtitle: "Siemens/Schneider PLC, Central SCADA & Smart BMS",
    description:
      "Integrated automation architecture integrating HVAC, energy meters, pumps, and fire systems into unified SCADA dashboards and cloud IoT building telemetry for reduced operating costs.",
    bannerImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BACnet", "Modbus", "IEC 61131"],
    category: "electrical",
    icon: "FaMicrochip",
  },
  wsds: {
    code: "WSDS",
    title: "Water Supply & Drainage Systems (WSDS)",
    subtitle: "VFD Booster Pumps, PPR Risers & Stormwater Harvesting",
    description:
      "End-to-end municipal and industrial plumbing systems engineered with hydro-pneumatic booster sets, corrosion-proof PPR/HDPE risers, heavy-duty drainage sump stations, and rainwater harvesting networks.",
    bannerImage:
      "https://images.unsplash.com/photo-1542013936693-884638332954?q=80&w=1600&auto=format&fit=crop",
    compliance: ["BNBC", "IPC", "WASA Standards"],
    category: "plumbing",
    icon: "FaShower",
  },
  wts: {
    code: "WTS",
    title: "Water Treatment Systems (WTS / ETP / STP)",
    subtitle: "Effluent ETP, Sewage STP, ZLD, IRP & Reverse Osmosis",
    description:
      "Advanced biological, chemical, and membrane water treatment systems engineered for zero liquid discharge (ZLD), industrial effluent treatment (ETP), sewage treatment (STP), and high-capacity RO filtration.",
    bannerImage:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
    compliance: ["DoE Bangladesh", "WHO Drinking Standards", "BDS"],
    category: "plumbing",
    icon: "FaWater",
  },
  rhs: {
    code: "RHS",
    title: "Renewable & Solar Solutions (RHS)",
    subtitle: "Rooftop Solar PV Plants, Net Metering & Hybrid Storage",
    description:
      "Clean industrial energy generation utilizing Tier-1 monocrystalline PERC solar panels, smart net-metering grid synchronization, and battery storage solutions to drastically reduce factory utility bills.",
    bannerImage:
      "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=1600&auto=format&fit=crop",
    compliance: ["SREDA", "IEC 61215", "BREB Regulations"],
    category: "plumbing",
    icon: "FaSun",
  },
};

export function getFlagshipDomain(keyOrSlug: string): FlagshipDomainInfo | null {
  if (!keyOrSlug) return null;
  const clean = keyOrSlug.toLowerCase().trim().replace("-systems", "");
  return FLAGSHIP_DOMAINS_OVERVIEW[clean] || null;
}


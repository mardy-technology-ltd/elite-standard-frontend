import React from "react";
import { Metadata } from "next";
import prisma from "@/lib/prisma";
import CareerClient, { JobPositionItem } from "./CareerClient";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers & Recruitment | Elite Standard Limited",
  description:
    "Join Bangladesh's premier MEP engineering firm. Explore career opportunities for Mechanical, Electrical, Fire Protection, and Automation engineers.",
  keywords: [
    "MEP Engineering Jobs Dhaka",
    "HVAC Engineer Career Bangladesh",
    "Switchgear Design Jobs",
    "Elite Standard Limited Recruitment",
  ],
};

const fallbackPositions: JobPositionItem[] = [
  {
    id: "hvac-sr",
    slug: "senior-mechanical-engineer-hvac",
    title: "Senior Mechanical Engineer (HVAC & Cleanrooms)",
    department: "Mechanical Engineering (HVAC)",
    location: "Amtola / Banani, Dhaka",
    type: "Full Time",
    experience: "4 - 7 Years",
    salary: "BDT 75,000 - 1,10,000 / Month (Negotiable)",
    salaryBadge: "BDT 75,000 - 1,10,000 / Month",
    summary:
      "Lead HVAC heat load calculation (Carrier HAP), VRF system layout design, chiller plant piping schematics, and ISO Class 7/8 pharmaceutical cleanroom air balancing.",
    qualifications: [
      "B.Sc. in Mechanical Engineering from a recognized university (BUET/CUET/RUET/KUET/AUST preferred)",
      "Proficient in Carrier HAP, AutoCAD MEP, and duct sizing tools",
      "Hands-on experience in VRF multi-split installation and chilled water piping commissioning",
      "Knowledge of BNBC 2020 and ASHRAE 62.1 / 90.1 standards",
    ],
    isActive: true,
  },
  {
    id: "switchgear-eng",
    slug: "electrical-switchgear-design-engineer",
    title: "Electrical Switchgear Design Engineer (LT/HT Panels)",
    department: "Power Distribution & Panels (PDCP)",
    location: "Dhaka Factory & Site",
    type: "Full Time",
    experience: "3 - 5 Years",
    salary: "BDT 55,000 - 85,000 / Month (Negotiable)",
    salaryBadge: "BDT 55,000 - 85,000 / Month",
    summary:
      "Design Form-4 type tested Low Voltage switchgear panels, HT 11kV VCB substations, Automatic PFI capacitor banks, and motor control centers (MCC).",
    qualifications: [
      "B.Sc. in Electrical & Electronic Engineering (EEE)",
      "Strong proficiency in single-line diagrams (SLD), busbar calculation, and AutoCAD Electrical",
      "Familiarity with ABB, Schneider, and Siemens circuit breakers & digital power meters",
      "Sound understanding of IEC 61439-1/2 and BNBC electrical safety codes",
    ],
    isActive: true,
  },
  {
    id: "fire-safety-eng",
    slug: "fire-protection-life-safety-engineer",
    title: "Fire Protection & Life Safety Engineer (NFPA / FSCD)",
    department: "Fire Detection & Protection (FDPS)",
    location: "Project Sites (Dhaka & Environs)",
    type: "Full Time",
    experience: "3 - 6 Years",
    salary: "BDT 60,000 - 90,000 / Month (Negotiable)",
    salaryBadge: "BDT 60,000 - 90,000 / Month",
    summary:
      "Execute wet-pipe sprinkler hydraulic calculations, high-pressure hydrant network layout, clean-agent (FM200) gas suppression, and FSCD statutory clearance documentation.",
    qualifications: [
      "B.Sc. in Mechanical or Chemical Engineering",
      "In-depth working knowledge of NFPA 13, 14, 20, and BNBC Part 4 requirements",
      "Experience with UL/FM certified electric & diesel fire pump skid commissioning",
      "Track record of successful Fire Service & Civil Defence (FSCD) safety audits",
    ],
    isActive: true,
  },
  {
    id: "automation-eng",
    slug: "bms-industrial-automation-engineer",
    title: "BMS & Industrial Automation Engineer (PLC / SCADA)",
    department: "Industrial Building Automation (IBA)",
    location: "Amtola Headquarters, Dhaka",
    type: "Full Time",
    experience: "2 - 4 Years",
    salary: "BDT 50,000 - 75,000 / Month (Negotiable)",
    salaryBadge: "BDT 50,000 - 75,000 / Month",
    summary:
      "Program Siemens S7-1200/1500 and Schneider Modicon PLCs, develop SCADA graphics, and integrate IoT field transmitters with central building management systems.",
    qualifications: [
      "B.Sc. in EEE, Mechatronics, or CSE/ETE",
      "Proven experience in TIA Portal, WinCC SCADA, or Wonderware InTouch",
      "Hands-on configuration of Modbus RTU/TCP, BACnet, and Profibus communication protocols",
      "Knowledge of VFD speed modulation, energy telemetry, and automated damper interlocks",
    ],
    isActive: true,
  },
];

async function getOpenPositions(): Promise<JobPositionItem[]> {
  try {
    const jobs = await prisma.jobPosition.findMany({
      where: { isActive: true },
      orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
    });

    if (jobs && jobs.length > 0) {
      return jobs.map((j) => ({
        id: j.id,
        slug: j.slug,
        title: j.title,
        department: j.department,
        location: j.location,
        type: j.type,
        experience: j.experience,
        salary: j.salary,
        salaryBadge: j.salaryBadge || j.salary,
        summary: j.summary,
        qualifications: j.qualifications,
        responsibilities: j.responsibilities || [],
        isActive: j.isActive,
        deadline: j.deadline || undefined,
      }));
    }
  } catch (err) {
    console.error("DB positions fetch error:", err);
  }

  return fallbackPositions;
}

export default async function CareerPage() {
  const positions = await getOpenPositions();
  return <CareerClient initialPositions={positions} />;
}

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

async function getCareerBanner(): Promise<string | null> {
  try {
    const rows = await prisma.$queryRaw<Array<{ value: string }>>`
      SELECT value FROM "SiteSetting" WHERE key = 'career_banner' LIMIT 1
    `;
    return rows.length > 0 ? rows[0].value : null;
  } catch (err) {
    console.error("Career banner fetch error:", err);
    return null;
  }
}

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

  return [];
}

export default async function CareerPage() {
  const [positions, banner] = await Promise.all([
    getOpenPositions(),
    getCareerBanner(),
  ]);

  return <CareerClient initialPositions={positions} initialBanner={banner} />;
}

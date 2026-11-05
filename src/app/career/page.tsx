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

function parseBanners(rawValue: string | null): string[] {
  if (!rawValue) return [];
  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((b): b is string => typeof b === 'string' && b.trim().length > 0);
    }
  } catch {
    if (typeof rawValue === 'string' && rawValue.trim().length > 0) {
      return [rawValue.trim()];
    }
  }
  return [];
}

async function getCareerBanners(): Promise<string[]> {
  try {
    const rows = await prisma.$queryRaw<Array<{ key: string; value: string }>>`
      SELECT key, value FROM "SiteSetting" 
      WHERE key IN ('career_banners', 'career_banner', 'career_banners_active')
    `;

    const activeRow = rows.find(r => r.key === 'career_banners_active');
    const isActive = activeRow ? activeRow.value !== 'false' : true;
    if (!isActive) return [];

    const bannerRow = rows.find(r => r.key === 'career_banners') || rows.find(r => r.key === 'career_banner');
    return bannerRow ? parseBanners(bannerRow.value) : [];
  } catch (err) {
    console.error("Career banners fetch error:", err);
    return [];
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
        bannerUrl: (j as any).bannerUrl || null,
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
  const [positions, banners] = await Promise.all([
    getOpenPositions(),
    getCareerBanners(),
  ]);

  return <CareerClient initialPositions={positions} initialBanners={banners} />;
}

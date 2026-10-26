import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, ServiceItem } from "@/lib/mockData";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceIntro from "@/components/services/ServiceIntro";
import ServiceSectorBreakdown from "@/components/services/ServiceSectorBreakdown";
import ServiceSubSpecialties from "@/components/services/ServiceSubSpecialties";
import ServiceChallenges from "@/components/services/ServiceChallenges";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCTA from "@/components/services/ServiceCTA";

import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

async function getService(slug: string): Promise<ServiceItem | null> {
  try {
    const dbService = await prisma.service.findFirst({
      where: {
        OR: [{ slug }, { code: slug.toUpperCase() }],
      },
    });

    if (dbService) {
      return {
        id: dbService.id,
        slug: dbService.slug,
        code: dbService.code,
        category: dbService.category as any,
        compliance: dbService.compliance,
        title: dbService.title,
        subtitle: dbService.subtitle || "",
        shortDescription: dbService.shortDescription,
        fullDescription: dbService.fullDescription,
        icon: dbService.icon,
        bannerImage: dbService.bannerImage,
        problems: dbService.problems,
        solutions: dbService.solutions,
        scopeOfWork: dbService.scopeOfWork,
        subServices: (dbService.subServices as any) || [],
        faqs: (dbService.faqs as any) || [],
        sectors: (dbService.sectors as any) || undefined,
      };
    }
  } catch (e) {
    console.error("DB service lookup error:", e);
  }

  return (
    servicesData.find(
      (s: ServiceItem) =>
        s.slug === slug || s.code.toLowerCase() === slug.toLowerCase()
    ) || null
  );
}

// Dynamic SEO Metadata for Each Service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getService(params.slug);

  if (!service) {
    return {
      title: "Service Not Found | Elite Standard Limited",
    };
  }

  return {
    title: `${service.title} (${service.code}) | Elite Standard Limited`,
    description: service.shortDescription,
    keywords: [
      service.title,
      `${service.code} Bangladesh`,
      "MEP Engineering Dhaka",
      "Industrial HVAC",
      "Fire Safety Clearance",
      "Elite Standard Limited",
    ],
    openGraph: {
      title: `${service.title} | Elite Standard Limited`,
      description: service.shortDescription,
      images: [service.bannerImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const service = await getService(params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Service Banner (Hero) */}
      <ServiceBanner service={service} />

      {/* 2. Introduction */}
      <ServiceIntro service={service} />

      {/* Sector-Wise Solutions Tab Component */}
      <ServiceSectorBreakdown service={service} />

      {/* 3. Sub-Specialties Deep Dive (with HTML element id anchors matching /services/fdps#alarm, /services/hvac#vrf, etc.) */}
      <ServiceSubSpecialties service={service} />

      {/* 4. The Challenge (Problems) & Our Solutions */}
      <ServiceChallenges service={service} />

      {/* 5. Scope of Work */}
      <ServiceScope service={service} />

      {/* 6. Frequently Asked Questions */}
      <ServiceFaq service={service} />

      {/* 7. Action Buttons / CTA */}
      <ServiceCTA service={service} />
    </main>
  );
}

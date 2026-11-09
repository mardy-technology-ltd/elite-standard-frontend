import React from "react";
import { Metadata } from "next";
import { ServiceItem } from "@/lib/mockData";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceIntro from "@/components/services/ServiceIntro";
import ServiceSectorBreakdown from "@/components/services/ServiceSectorBreakdown";
import ServiceSubSpecialties from "@/components/services/ServiceSubSpecialties";
import ServiceChallenges from "@/components/services/ServiceChallenges";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceCTA from "@/components/services/ServiceCTA";
import ServiceRelatedProjects from "@/components/services/ServiceRelatedProjects";
import NoServiceAvailable, { getServiceFullName } from "@/components/services/NoServiceAvailable";
import { projectsData, ProjectItem } from "@/lib/mockData";

import prisma from "@/lib/prisma";
import { FLAGSHIP_DOMAINS_OVERVIEW } from "@/lib/flagshipDomains";

export const dynamic = "force-dynamic";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

async function getRelatedProjects(serviceCategory: string): Promise<ProjectItem[]> {
  try {
    const dbProjects = await prisma.project.findMany({
      where: {
        category: {
          equals: serviceCategory,
          mode: "insensitive",
        },
      },
      orderBy: { createdAt: "desc" },
      take: 6,
    });

    if (dbProjects && dbProjects.length > 0) {
      return dbProjects.map((p) => ({
        id: p.id,
        slug: p.slug,
        title: p.title,
        category: p.category,
        client: p.client,
        location: p.location,
        completionDate: p.completionDate,
        description: p.description,
        image: p.image,
        gallery: (Array.isArray(p.gallery) ? p.gallery : []) as any,
        scope: p.scope || [],
        isFeatured: p.isFeatured || false,
      }));
    }
  } catch (err) {
    console.error("Error fetching related projects from DB:", err);
  }

  // Fallback to mock projects matching category or first 3 projects
  const matched = projectsData.filter(
    (p) => p.category?.toLowerCase() === serviceCategory.toLowerCase()
  );
  return matched.length > 0 ? matched : projectsData.slice(0, 3);
}

async function getService(slug: string): Promise<ServiceItem | null> {
  try {
    const slugLower = slug.toLowerCase().trim();
    const cleanKey = slugLower.replace("-systems", "");
    const slugAliases = [
      slugLower,
      cleanKey,
      `${cleanKey}-systems`,
    ];

    // Find any direct service or flagship matching slug
    const dbService = await prisma.service.findFirst({
      where: {
        OR: [
          { slug: { in: slugAliases } },
          { code: slug.toUpperCase() },
          { code: `ESL-MEP-${slug.toUpperCase()}` },
        ],
      },
    });

    // Also find any services created in DB belonging to this flagship code (e.g. code includes "HVAC")
    const codeMatch = cleanKey.toUpperCase();
    const relatedDbServices = await prisma.service.findMany({
      where: {
        code: { contains: codeMatch },
      },
      orderBy: { orderIndex: "asc" },
    });

    const isFlagshipRequested = Boolean(FLAGSHIP_DOMAINS_OVERVIEW[cleanKey]);

    if (dbService || relatedDbServices.length > 0 || isFlagshipRequested) {
      const primary = dbService || relatedDbServices[0];
      const domainOverview = FLAGSHIP_DOMAINS_OVERVIEW[cleanKey];

      // Build subServices list by combining explicit subServices with services created under this flagship
      const combinedSubServices: any[] = primary && Array.isArray(primary.subServices) ? [...primary.subServices] : [];

      relatedDbServices.forEach((rel) => {
        const alreadyExists = combinedSubServices.some(
          (sub) => sub.title?.toLowerCase() === rel.title?.toLowerCase() || sub.slug === rel.slug
        );
        if (!alreadyExists && (!domainOverview || rel.title !== domainOverview.title)) {
          combinedSubServices.push({
            id: rel.id,
            slug: rel.slug,
            title: rel.title,
            shortDesc: rel.shortDescription || rel.subtitle || "",
            fullDesc: rel.fullDescription || rel.shortDescription || "",
            features: Array.isArray(rel.scopeOfWork) ? rel.scopeOfWork : [],
            image: rel.bannerImage || "/images/company-info.png",
          });
        }
      });

      // If viewing a core flagship page, present the Domain Overview
      if (isFlagshipRequested && domainOverview) {
        return {
          id: primary?.id || `flagship-${cleanKey}`,
          slug: slugLower,
          code: codeMatch,
          category: (primary?.category as any) || (["hvac", "fdps", "guds"].includes(cleanKey) ? "mechanical" : ["pdcp", "eels", "iba"].includes(cleanKey) ? "electrical" : "plumbing"),
          compliance: domainOverview.compliance,
          title: domainOverview.title,
          subtitle: domainOverview.subtitle,
          shortDescription: domainOverview.description,
          fullDescription: domainOverview.description,
          icon: primary?.icon || "FaIndustry",
          bannerImage: domainOverview.bannerImage,
          problems: primary?.problems && primary.problems.length > 0 ? primary.problems : [],
          solutions: primary?.solutions && primary.solutions.length > 0 ? primary.solutions : [],
          scopeOfWork: primary?.scopeOfWork && primary.scopeOfWork.length > 0 ? primary.scopeOfWork : [],
          subServices: combinedSubServices,
          faqs: (primary?.faqs as any) || [],
          sectors: (primary?.sectors as any) || undefined,
        };
      }

      // If viewing a specific service directly (e.g. /services/vrf-vrv-multi-split-systems)
      if (primary) {
        return {
          id: primary.id,
          slug: primary.slug,
          code: primary.code,
          category: primary.category as any,
          compliance: primary.compliance && primary.compliance.length > 0 ? primary.compliance : ["BNBC", "ASHRAE", "NFPA"],
          title: primary.title,
          subtitle: primary.subtitle || `Specialized ${primary.code} Engineering Solutions`,
          shortDescription: primary.shortDescription,
          fullDescription: primary.fullDescription,
          icon: primary.icon,
          bannerImage: primary.bannerImage || "/images/company-info.png",
          problems: primary.problems && primary.problems.length > 0 ? primary.problems : [],
          solutions: primary.solutions && primary.solutions.length > 0 ? primary.solutions : [],
          scopeOfWork: primary.scopeOfWork && primary.scopeOfWork.length > 0 ? primary.scopeOfWork : [],
          subServices: combinedSubServices,
          faqs: (primary.faqs as any) || [],
          sectors: (primary.sectors as any) || undefined,
        };
      }
    }
  } catch (e) {
    console.error("DB service lookup error:", e);
  }

  return null;
}

// Dynamic SEO Metadata for Each Service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = await getService(params.slug);

  if (!service) {
    const fullName = getServiceFullName(params.slug);
    return {
      title: `${fullName} - No Service Available | Elite Standard Limited`,
      description: `Technical specifications for ${fullName} are currently not published or under review.`,
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
    return <NoServiceAvailable slug={params.slug} />;
  }

  const relatedProjects = await getRelatedProjects(service.category);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Service Banner (Hero) */}
      <ServiceBanner service={service} />

      {/* 2. Introduction */}
      <ServiceIntro service={service} />

      {/* Sector-Wise Solutions Tab Component (Commented out as requested) */}
      {/* <ServiceSectorBreakdown service={service} /> */}

      {/* 3. Sub-Specialties / Services Deep Dive */}
      <ServiceSubSpecialties service={service} />

      {/* 4. The Challenge (Problems) & Our Solutions */}
      <ServiceChallenges service={service} />

      {/* 5. Scope of Work */}
      <ServiceScope service={service} />

      {/* 6. Related Engineering Projects (Excluded for WSDS as requested) */}
      {service.slug !== "wsds" && service.code?.toUpperCase() !== "WSDS" && (
        <ServiceRelatedProjects
          projects={relatedProjects}
          serviceCategory={service.category}
          serviceTitle={service.title}
        />
      )}

      {/* 7. Frequently Asked Questions */}
      <ServiceFaq service={service} />

      {/* 8. Action Buttons / CTA */}
      <ServiceCTA service={service} />
    </main>
  );
}

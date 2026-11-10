import React from "react";
import { Metadata } from "next";
import { ServiceItem, SubServiceDetail, servicesData } from "@/lib/mockData";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceSlider from "@/components/services/ServiceSlider";
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
import { FLAGSHIP_DOMAINS_OVERVIEW, getFlagshipDomain } from "@/lib/flagshipDomains";
import SubServiceClient from "./[subSlug]/SubServiceClient";

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

      // If no subServices found in DB, check fallback from mockData for this flagship service
      if (combinedSubServices.length === 0) {
        const mockFallback = servicesData.find(
          (s) =>
            s.slug?.toLowerCase() === slugLower ||
            s.code?.toLowerCase() === cleanKey ||
            s.slug?.toLowerCase().replace("-systems", "") === cleanKey
        );
        if (mockFallback && Array.isArray(mockFallback.subServices) && mockFallback.subServices.length > 0) {
          combinedSubServices.push(...mockFallback.subServices);
        }
      }

      // Check if custom category slider exists in DB
      let customGallery: any[] | undefined = undefined;
      try {
        const sliderSetting = await prisma.siteSetting.findUnique({
          where: { key: `category_slider_${cleanKey}` },
        });
        if (sliderSetting && sliderSetting.value) {
          const parsed = JSON.parse(sliderSetting.value);
          if (Array.isArray(parsed) && parsed.length > 0) {
            customGallery = parsed;
          }
        }
      } catch (err) {
        console.error("Error fetching category slider setting:", err);
      }

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
          gallery: customGallery || ((primary as any)?.gallery as any) || undefined,
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

// Helper to resolve whether a slug is an individual service or flagship domain overview
async function getDetailPageData(slug: string): Promise<
  | { type: "flagship"; service: ServiceItem }
  | { type: "subservice"; service: ServiceItem; sub: SubServiceDetail }
  | null
> {
  try {
    const slugLower = slug.toLowerCase().trim();
    const cleanKey = slugLower.replace("-systems", "");
    const isFlagship = Boolean(FLAGSHIP_DOMAINS_OVERVIEW[cleanKey]);

    // 1. If it's a Flagship Domain Landing Page (hvac, fdps, guds, pdcp, eels, iba, wsds, wts, rhs)
    if (isFlagship) {
      const service = await getService(slug);
      if (service) {
        return { type: "flagship", service };
      }
    }

    // 2. If it's an Individual Service: check DB first
    const dbService = await prisma.service.findFirst({
      where: {
        OR: [
          { slug: slugLower },
          { slug },
          { code: slug.toUpperCase() },
          { code: `ESL-MEP-${slug.toUpperCase()}` },
        ],
      },
    });

    if (dbService) {
      // Determine parent flagship
      const parentFlagshipKey = dbService.code
        ? dbService.code.replace("ESL-MEP-", "").toLowerCase()
        : "";
      const parentFlagship = getFlagshipDomain(parentFlagshipKey);

      const subDetail: SubServiceDetail = {
        id: dbService.id,
        slug: dbService.slug,
        title: dbService.title,
        shortDesc: dbService.shortDescription || dbService.subtitle || "",
        fullDesc: dbService.fullDescription || dbService.shortDescription || "",
        features: Array.isArray(dbService.scopeOfWork) ? (dbService.scopeOfWork as string[]) : [],
        image: dbService.bannerImage || parentFlagship?.bannerImage || "/images/company-info.png",
      };

      const parentItem: ServiceItem = {
        id: parentFlagship ? `flagship-${parentFlagship.code.toLowerCase()}` : dbService.id,
        slug: parentFlagshipKey || (parentFlagship?.code ? parentFlagship.code.toLowerCase() : "services"),
        code: parentFlagship?.code || (dbService.category ? dbService.category.toUpperCase() : "MEP"),
        category: (parentFlagship?.category || dbService.category || "mechanical") as any,
        compliance: (dbService.compliance && dbService.compliance.length > 0)
          ? dbService.compliance
          : (parentFlagship?.compliance || ["BNBC", "ASHRAE", "NFPA"]),
        title: parentFlagship?.title || `${dbService.category?.toUpperCase()} Engineering`,
        subtitle: parentFlagship?.subtitle || "",
        shortDescription: parentFlagship?.description || "",
        fullDescription: parentFlagship?.description || "",
        icon: parentFlagship?.icon || dbService.icon || "FaIndustry",
        bannerImage: parentFlagship?.bannerImage || dbService.bannerImage || "/images/company-info.png",
        problems: dbService.problems || [],
        solutions: dbService.solutions || [],
        scopeOfWork: dbService.scopeOfWork || [],
        subServices: [subDetail],
        faqs: (dbService.faqs as any) || [],
        sectors: (dbService.sectors as any) || undefined,
      };

      return { type: "subservice", service: parentItem, sub: subDetail };
    }

    // 3. Check mockData subServices
    for (const s of servicesData) {
      if (Array.isArray(s.subServices)) {
        const found = s.subServices.find(
          (sub) =>
            sub.slug?.toLowerCase() === slugLower ||
            sub.id?.toLowerCase() === slugLower ||
            sub.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-") === slugLower
        );
        if (found) {
          return { type: "subservice", service: s, sub: found };
        }
      }
    }

    // 4. Fallback: if getService returns something
    const fallbackService = await getService(slug);
    if (fallbackService) {
      return { type: "flagship", service: fallbackService };
    }
  } catch (err) {
    console.error("Error in getDetailPageData:", err);
  }

  return null;
}

// Dynamic SEO Metadata for Each Service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const pageData = await getDetailPageData(params.slug);

  if (!pageData) {
    const fullName = getServiceFullName(params.slug);
    return {
      title: `${fullName} - No Service Available | Elite Standard Limited`,
      description: `Technical specifications for ${fullName} are currently not published or under review.`,
    };
  }

  if (pageData.type === "subservice") {
    const { service, sub } = pageData;
    return {
      title: `${sub.title} | ${service.code} Engineering | Elite Standard Limited`,
      description: `${sub.fullDesc || sub.shortDesc} Provided by Elite Standard Limited, Dhaka, Bangladesh. Built in full compliance with BNBC, NFPA, and ASHRAE codes.`,
      keywords: [
        sub.title,
        `${sub.title} Bangladesh`,
        `${sub.title} Contractor Dhaka`,
        `${service.code} solutions`,
        "Elite Standard Limited MEP",
      ],
      openGraph: {
        title: `${sub.title} | Elite Standard Limited`,
        description: sub.fullDesc || sub.shortDesc,
        images: [sub.image || "/images/company-info.png"],
      },
    };
  }

  const { service } = pageData;
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
  const pageData = await getDetailPageData(params.slug);

  if (!pageData) {
    return <NoServiceAvailable slug={params.slug} />;
  }

  // If it's an individual service, ALWAYS render the rich SubServiceClient layout (Image 2)
  if (pageData.type === "subservice") {
    return <SubServiceClient service={pageData.service} sub={pageData.sub} />;
  }

  // Otherwise, render the flagship domain overview landing page (with division slider & services list)
  const service = pageData.service;
  const relatedProjects = await getRelatedProjects(service.category);

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Service Banner (Hero) */}
      <ServiceBanner service={service} />

      {/* 2. Interactive Media Showcase Slider representing the Service */}
      <ServiceSlider service={service} />

      {/* 3. Created Services Under this Discipline (Title, Subtitle, Technical Solution, Banner) */}
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

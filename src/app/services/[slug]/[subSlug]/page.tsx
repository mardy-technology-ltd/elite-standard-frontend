import React from "react";
import { Metadata } from "next";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import prisma from "@/lib/prisma";
import SubServiceClient from "./SubServiceClient";
import NoServiceAvailable, { getServiceFullName } from "@/components/services/NoServiceAvailable";
import { getFlagshipDomain } from "@/lib/flagshipDomains";

export const dynamic = "force-dynamic";

interface SubServicePageProps {
  params: {
    slug: string;
    subSlug: string;
  };
}

async function getSubServiceData(parentSlug: string, subSlug: string): Promise<{
  service: ServiceItem;
  sub: SubServiceDetail;
} | null> {
  try {
    const parentFlagship = getFlagshipDomain(parentSlug);

    // 1. Check if the sub-service exists as an individual record in DB
    const dbSubService = await prisma.service.findFirst({
      where: {
        OR: [
          { slug: subSlug },
          { code: subSlug.toUpperCase() },
          { code: `ESL-MEP-${subSlug.toUpperCase()}` },
        ],
      },
    });

    if (dbSubService) {
      const subDetail: SubServiceDetail = {
        id: dbSubService.id,
        slug: dbSubService.slug,
        title: dbSubService.title,
        shortDesc: dbSubService.shortDescription || dbSubService.subtitle || "",
        fullDesc: dbSubService.fullDescription || dbSubService.shortDescription || "",
        features: Array.isArray(dbSubService.scopeOfWork) ? (dbSubService.scopeOfWork as string[]) : [],
        image: dbSubService.bannerImage || parentFlagship?.bannerImage || "/images/company-info.png",
      };

      const parentItem: ServiceItem = {
        id: parentFlagship ? `flagship-${parentFlagship.code.toLowerCase()}` : dbSubService.id,
        slug: parentSlug,
        code: parentFlagship?.code || (dbSubService.category ? dbSubService.category.toUpperCase() : "MEP"),
        category: (parentFlagship?.category || dbSubService.category || "mechanical") as any,
        compliance: (dbSubService.compliance && dbSubService.compliance.length > 0)
          ? dbSubService.compliance
          : (parentFlagship?.compliance || ["BNBC", "ASHRAE", "NFPA"]),
        title: parentFlagship?.title || `${dbSubService.category?.toUpperCase()} Engineering`,
        subtitle: parentFlagship?.subtitle || "",
        shortDescription: parentFlagship?.description || "",
        fullDescription: parentFlagship?.description || "",
        icon: parentFlagship?.icon || dbSubService.icon || "FaIndustry",
        bannerImage: parentFlagship?.bannerImage || dbSubService.bannerImage || "/images/company-info.png",
        problems: dbSubService.problems || [],
        solutions: dbSubService.solutions || [],
        scopeOfWork: dbSubService.scopeOfWork || [],
        subServices: [subDetail],
        faqs: (dbSubService.faqs as any) || [],
        sectors: (dbSubService.sectors as any) || undefined,
      };

      return { service: parentItem, sub: subDetail };
    }

    // 2. Check if parent flagship service exists in DB and contains subSlug in its subServices array
    const dbParent = await prisma.service.findFirst({
      where: {
        OR: [{ slug: parentSlug }, { code: parentSlug.toUpperCase() }],
      },
    });

    if (dbParent && Array.isArray(dbParent.subServices)) {
      const foundSub = (dbParent.subServices as any[]).find(
        (s) => s.slug === subSlug || s.id === subSlug
      );
      if (foundSub) {
        const parentItem: ServiceItem = {
          id: dbParent.id,
          slug: dbParent.slug,
          code: dbParent.code,
          category: dbParent.category as any,
          compliance: dbParent.compliance,
          title: parentFlagship?.title || dbParent.title,
          subtitle: parentFlagship?.subtitle || dbParent.subtitle || "",
          shortDescription: parentFlagship?.description || dbParent.shortDescription,
          fullDescription: parentFlagship?.description || dbParent.fullDescription,
          icon: parentFlagship?.icon || dbParent.icon,
          bannerImage: parentFlagship?.bannerImage || dbParent.bannerImage,
          problems: dbParent.problems,
          solutions: dbParent.solutions,
          scopeOfWork: dbParent.scopeOfWork,
          subServices: dbParent.subServices as any,
          faqs: (dbParent.faqs as any) || [],
          sectors: (dbParent.sectors as any) || undefined,
        };

        return { service: parentItem, sub: foundSub };
      }
    }
  } catch (e) {
    console.error("Sub-service lookup error:", e);
  }

  return null;
}

// Dynamic SEO Metadata specific to each individual engineering specialty
export async function generateMetadata({ params }: SubServicePageProps): Promise<Metadata> {
  const data = await getSubServiceData(params.slug, params.subSlug);

  if (!data) {
    const fullParent = getServiceFullName(params.slug);
    const subClean = params.subSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${subClean} (${fullParent}) - No Service Available | Elite Standard Limited`,
    };
  }

  const { service, sub } = data;

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

export default async function SubServicePage({ params }: SubServicePageProps) {
  const data = await getSubServiceData(params.slug, params.subSlug);

  if (!data) {
    return (
      <NoServiceAvailable
        title={params.subSlug}
        slug={`${params.slug}/${params.subSlug}`}
        message="The requested specialized sub-discipline specifications have not been published yet in the system."
      />
    );
  }

  return <SubServiceClient service={data.service} sub={data.sub} />;
}

import React from "react";
import { Metadata } from "next";
import { ServiceItem, SubServiceDetail } from "@/lib/mockData";
import prisma from "@/lib/prisma";
import SubServiceClient from "./SubServiceClient";
import NoServiceAvailable, { getServiceFullName } from "@/components/services/NoServiceAvailable";

export const dynamic = "force-dynamic";

interface SubServicePageProps {
  params: {
    slug: string;
    subSlug: string;
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

  return null;
}

// Dynamic SEO Metadata specific to each individual engineering specialty
export async function generateMetadata({ params }: SubServicePageProps): Promise<Metadata> {
  const service = await getService(params.slug);
  const sub = service?.subServices?.find((sub: SubServiceDetail) => sub.slug === params.subSlug);

  if (!service || !sub) {
    const fullParent = getServiceFullName(params.slug);
    const subClean = params.subSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${subClean} (${fullParent}) - No Service Available | Elite Standard Limited`,
    };
  }

  return {
    title: `${sub.title} | ${service.code} Engineering | Elite Standard Limited`,
    description: `${sub.fullDesc} Provided by Elite Standard Limited, Dhaka, Bangladesh. Built in full compliance with BNBC, NFPA, and ASHRAE codes.`,
    keywords: [
      sub.title,
      `${sub.title} Bangladesh`,
      `${sub.title} Contractor Dhaka`,
      `${service.code} solutions`,
      "Elite Standard Limited MEP",
    ],
    openGraph: {
      title: `${sub.title} | Elite Standard Limited`,
      description: sub.fullDesc,
      images: [sub.image || "/images/company-info.png"],
    },
  };
}

export default async function SubServicePage({ params }: SubServicePageProps) {
  const service = await getService(params.slug);
  const sub = service?.subServices?.find((sub: SubServiceDetail) => sub.slug === params.subSlug);

  if (!service || !sub) {
    return (
      <NoServiceAvailable
        title={params.subSlug}
        slug={`${params.slug}/${params.subSlug}`}
        message="The requested specialized sub-discipline specifications have not been published yet in the system."
      />
    );
  }

  return <SubServiceClient service={service} sub={sub} />;
}

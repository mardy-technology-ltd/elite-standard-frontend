import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, ServiceItem, SubServiceDetail } from "@/lib/mockData";
import SubServiceClient from "./SubServiceClient";

interface SubServicePageProps {
  params: {
    slug: string;
    subSlug: string;
  };
}

// Generate static routes for all sub-services under all 9 flagship categories
export async function generateStaticParams() {
  const paths: { slug: string; subSlug: string }[] = [];
  
  servicesData.forEach((service: ServiceItem) => {
    if (service.subServices) {
      service.subServices.forEach((sub: SubServiceDetail) => {
        paths.push({
          slug: service.slug,
          subSlug: sub.slug,
        });
      });
    }
  });

  return paths;
}

// Dynamic SEO Metadata specific to each individual engineering specialty
export async function generateMetadata({ params }: SubServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s: ServiceItem) => s.slug === params.slug);
  const sub = service?.subServices?.find((sub: SubServiceDetail) => sub.slug === params.subSlug);

  if (!service || !sub) {
    return {
      title: "Sub-Service Not Found | Elite Standard Limited",
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
      images: [sub.image],
    },
  };
}

export default function SubServicePage({ params }: SubServicePageProps) {
  const service = servicesData.find((s: ServiceItem) => s.slug === params.slug);
  const sub = service?.subServices?.find((sub: SubServiceDetail) => sub.slug === params.subSlug);

  if (!service || !sub) {
    notFound();
  }

  return <SubServiceClient service={service} sub={sub} />;
}

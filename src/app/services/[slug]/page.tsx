import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData, ServiceItem } from "@/lib/mockData";
import ServiceBanner from "@/components/services/ServiceBanner";
import ServiceIntro from "@/components/services/ServiceIntro";
import ServiceSubSpecialties from "@/components/services/ServiceSubSpecialties";
import ServiceChallenges from "@/components/services/ServiceChallenges";
import ServiceScope from "@/components/services/ServiceScope";
import ServiceFaq from "@/components/services/ServiceFaq";
import ServiceRelatedProducts from "@/components/services/ServiceRelatedProducts";
import ServiceCTA from "@/components/services/ServiceCTA";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all 9 MEP services
export async function generateStaticParams() {
  return servicesData.map((service: ServiceItem) => ({
    slug: service.slug,
  }));
}

// Dynamic SEO Metadata for Each Service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = servicesData.find((s: ServiceItem) => s.slug === params.slug);

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

export default function ServiceDetailPage({ params }: ServicePageProps) {
  const service = servicesData.find((s: ServiceItem) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* 1. Service Banner (Hero) */}
      <ServiceBanner service={service} />

      {/* 2. Introduction */}
      <ServiceIntro service={service} />

      {/* 3. Sub-Specialties Deep Dive (with HTML element id anchors matching /services/fdps#alarm, /services/hvac#vrf, etc.) */}
      <ServiceSubSpecialties service={service} />

      {/* 4. The Challenge (Problems) & Our Solutions */}
      <ServiceChallenges service={service} />

      {/* 5. Scope of Work */}
      <ServiceScope service={service} />

      {/* 6. Frequently Asked Questions */}
      <ServiceFaq service={service} />

      {/* 7. Related Products */}
      <ServiceRelatedProducts serviceSlug={service.slug} />

      {/* 8. Action Buttons / CTA */}
      <ServiceCTA service={service} />
    </main>
  );
}

import React from "react";
import prisma from "@/lib/prisma";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntro from "@/components/home/CompanyIntro";
import Framework369 from "@/components/home/Framework369";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import OurSectors from "@/components/home/OurSectors";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ProductsSummary from "@/components/home/ProductsSummary";
import TestimonialsAndPartners from "@/components/home/TestimonialsAndPartners";
import LatestBlogs from "@/components/home/LatestBlogs";
import ContactCTA from "@/components/home/ContactCTA";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let partners: any[] = [];
  let clients: any[] = [];
  let services: any[] = [];
  try {
    const [dbPartners, dbClients, dbServices] = await Promise.all([
      prisma.clientReference.findMany({
        where: { isActive: true, category: "partner" },
        orderBy: { orderIndex: "asc" },
      }),
      prisma.clientReference.findMany({
        where: { isActive: true, category: "client" },
        orderBy: { orderIndex: "asc" },
      }),
      prisma.service.findMany({
        orderBy: [{ orderIndex: "asc" }, { createdAt: "desc" }],
      }),
    ]);
    if (dbPartners && dbPartners.length > 0) {
      partners = dbPartners;
    }
    if (dbClients && dbClients.length > 0) {
      clients = dbClients;
    }
    if (dbServices && dbServices.length > 0) {
      services = dbServices;
    }
  } catch (err) {
    console.error("Failed to load data for homepage:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Signature 3-6-9 Law Framework */}
      <Framework369 initialServices={services} />

      {/* 4. Why Choose Elite Standard Limited */}
      <WhyChooseUs />

      {/* 5. Our Sectors (Industries Served) */}
      <OurSectors />

      {/* 6. Featured Projects */}
      <FeaturedProjects />

      {/* 7. Products & Equipment Summary */}
      <ProductsSummary />

      {/* 8. Client Testimonials, Corporate Clients & Brand Partners */}
      <TestimonialsAndPartners initialPartners={partners} initialClients={clients} />

      {/* 9. Latest Engineering Blogs */}
      {/* <LatestBlogs /> */}

      {/* 10. Lead Generation Contact CTA */}
      <ContactCTA />
    </div>
  );
}

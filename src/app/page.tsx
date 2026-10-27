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
  let products: any[] = [];
  let projects: any[] = [];
  let sectors: any[] = [];
  try {
    const [dbPartners, dbClients, dbServices, dbProducts, dbProjects, dbSectors] = await Promise.all([
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
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
      }),
      prisma.project.findMany({
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        take: 6,
      }),
      prisma.industrySector.findMany({
        where: { isActive: true },
        orderBy: [{ orderIndex: "asc" }, { createdAt: "asc" }],
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
    if (dbProducts && dbProducts.length > 0) {
      products = dbProducts.map((p) => ({
        id: p.id,
        slug: p.slug,
        code: p.code,
        title: p.title,
        category: p.category as any,
        sector: (Array.isArray(p.sector) ? p.sector : [p.sector]) as any,
        price: p.price,
        priceFormatted: p.priceFormatted || `Tk ${p.price.toLocaleString()}`,
        inStock: p.inStock,
        stockBadge: p.stockBadge || undefined,
        image: p.image,
        variantsText: p.variantsText || "",
        specs: (Array.isArray(p.specs) ? p.specs : []) as any,
        href: p.href || `/products/${p.slug}`,
        iconName: p.iconName || "FaBoxes",
      }));
    }
    if (dbProjects && dbProjects.length > 0) {
      projects = dbProjects.map((p) => ({
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
    if (dbSectors && dbSectors.length > 0) {
      sectors = dbSectors.map((s) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        description: s.description,
        icon: s.icon,
        image: s.image,
        href: s.href || "/sectors",
      }));
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
      <OurSectors initialSectors={sectors} />

      {/* 6. Featured Projects */}
      <FeaturedProjects initialProjects={projects} />

      {/* 7. Products & Equipment Summary */}
      <ProductsSummary initialProducts={products} />

      {/* 8. Client Testimonials, Corporate Clients & Brand Partners */}
      <TestimonialsAndPartners initialPartners={partners} initialClients={clients} />

      {/* 9. Latest Engineering Blogs */}
      {/* <LatestBlogs /> */}

      {/* 10. Lead Generation Contact CTA */}
      <ContactCTA />
    </div>
  );
}

import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntro from "@/components/home/CompanyIntro";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import OurServices from "@/components/home/OurServices";
import OurSectors from "@/components/home/OurSectors";
import EngineeringProcess from "@/components/home/EngineeringProcess";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ProductsSummary from "@/components/home/ProductsSummary";
import TestimonialsAndPartners from "@/components/home/TestimonialsAndPartners";
import LatestBlogs from "@/components/home/LatestBlogs";
import ContactCTA from "@/components/home/ContactCTA";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Why Choose Elite Standard Limited */}
      <WhyChooseUs />

      {/* 4. Our Services (9 MEP Domains) */}
      <OurServices />

      {/* 5. Our Sectors (Industries Served) */}
      <OurSectors />

      {/* 6. Engineering Process (4-Step Workflow) */}
      <EngineeringProcess />

      {/* 7. Featured Projects */}
      <FeaturedProjects />

      {/* 8. Products & Equipment Summary */}
      <ProductsSummary />

      {/* 9. Client Testimonials & Brand Partners */}
      <TestimonialsAndPartners />

      {/* 10. Latest Engineering Blogs */}
      <LatestBlogs />

      {/* 11. Lead Generation Contact CTA */}
      <ContactCTA />
    </div>
  );
}

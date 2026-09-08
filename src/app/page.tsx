import React from "react";
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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Company Introduction */}
      <CompanyIntro />

      {/* 3. Signature 3-6-9 Law Framework */}
      <Framework369 />

      {/* 4. Why Choose Elite Standard Limited */}
      <WhyChooseUs />

      {/* 5. Our Sectors (Industries Served) */}
      <OurSectors />

      {/* 6. Featured Projects */}
      <FeaturedProjects />

      {/* 7. Products & Equipment Summary */}
      <ProductsSummary />

      {/* 8. Client Testimonials & Brand Partners */}
      <TestimonialsAndPartners />

      {/* 9. Latest Engineering Blogs */}
      {/* <LatestBlogs /> */}

      {/* 10. Lead Generation Contact CTA */}
      <ContactCTA />
    </div>
  );
}

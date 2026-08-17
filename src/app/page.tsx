import React from "react";
import HeroBanner from "@/components/home/HeroBanner";
import CompanyIntro from "@/components/home/CompanyIntro";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero Banner */}
      <HeroBanner />

      {/* Section 2: Company Introduction */}
      <CompanyIntro />

      {/* Section 3: Why Choose Elite Standard Limited */}
      <WhyChooseUs />
    </div>
  );
}

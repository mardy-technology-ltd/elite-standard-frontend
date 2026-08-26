import React from "react";
import { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import CompanyStory from "@/components/about/CompanyStory";
import CoreValues from "@/components/about/CoreValues";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import LeadershipTeam from "@/components/about/LeadershipTeam";
import CorporateStructure from "@/components/about/CorporateStructure";
import Accreditations from "@/components/about/Accreditations";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata: Metadata = {
  title: "About Us | Elite Standard Limited | MEP Engineering Leader",
  description:
    "Learn about Elite Standard Limited's history, mission, leadership team, ISO 9001 certifications, and 14+ years of MEP & industrial engineering excellence in Bangladesh.",
  keywords: [
    "About Elite Standard Limited",
    "MEP Contractor Dhaka",
    "Engineering Company Bangladesh",
    "ISO 9001 MEP Contractor",
    "HVAC Engineers Banani",
  ],
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. Hero Banner */}
      <AboutHero />

      {/* 2. Company Overview & Vision/Mission */}
      <CompanyStory />

      {/* 3. Core Corporate Values */}
      <CoreValues />

      {/* 4. Growth Milestone Timeline */}
      <CompanyTimeline />

      {/* 5. Executive Leadership Team */}
      <LeadershipTeam />

      {/* 5.5 Corporate Structure / Organogram Flowcharts */}
      <CorporateStructure />

      {/* 6. Accreditations & Safety Compliance */}
      <Accreditations />

      {/* 7. Conversion CTA */}
      <AboutCTA />
    </main>
  );
}

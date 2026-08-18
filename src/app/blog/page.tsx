import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Engineering Blog & Insights | Elite Standard Limited",
  description: "Read technical insights on BMS energy saving, NFPA fire safety, and industrial HVAC.",
};

export default function BlogPage() {
  return (
    <UnderDevelopment
      title="Engineering Blog & Technical Insights Under Development"
      subtitle="Articles on BMS energy optimization, BNBC 2020 fire clearance, and rooftop solar net metering are being drafted."
      categoryName="Editorial Insights"
    />
  );
}

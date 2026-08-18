import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Industry Sectors | Elite Standard Limited",
  description: "Pharmaceutical cleanrooms, textile mills, commercial towers, and data centers.",
};

export default function SectorsPage() {
  return (
    <UnderDevelopment
      title="Industry Sectors Showcase Under Development"
      subtitle="Detailed case studies for pharmaceutical cleanrooms, textile spinning plants, and commercial high-rises are being published."
      categoryName="Sectors Division"
    />
  );
}

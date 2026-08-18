import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Projects Portfolio | Elite Standard Limited",
  description: "View our completed MEP infrastructure, fire safety, and industrial power distribution projects.",
};

export default function ProjectsPage() {
  return (
    <UnderDevelopment
      title="Projects Portfolio Under Active Development"
      subtitle="High-resolution photo galleries and technical BOQ case studies of our landmark MEP projects in Bangladesh are currently being formatted."
      categoryName="Projects Division"
    />
  );
}

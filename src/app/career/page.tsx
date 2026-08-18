import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Careers & Recruitment | Elite Standard Limited",
  description: "Join Bangladesh's leading MEP engineering and industrial automation team.",
};

export default function CareerPage() {
  return (
    <UnderDevelopment
      title="Careers & Recruitment Portal Under Development"
      subtitle="Job openings for Licensed Mechanical Engineers, Electrical Switchgear Designers, and Automation Specialists will be posted shortly."
      categoryName="Human Resources"
    />
  );
}

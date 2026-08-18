import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Section Under Development | Elite Standard Limited",
  description: "This section is currently under active development by the Elite Standard engineering team.",
};

export default function NotFound() {
  return (
    <UnderDevelopment
      title="Section Under Active Development"
      subtitle="We are populating this section with full engineering specifications, equipment catalogs, and project case studies."
      categoryName="Page Notice"
    />
  );
}

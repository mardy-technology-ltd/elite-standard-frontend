import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Products & Equipment Catalog | Elite Standard Limited",
  description: "Browse industrial VRF chillers, fire pump skids, LT switchgear panels, and generator backup sets.",
};

export default function ProductsPage() {
  return (
    <UnderDevelopment
      title="Products & Equipment Catalog Under Development"
      subtitle="Our digital equipment showcase featuring VRF chillers, UL/FM fire pumps, and LT switchgear panels is currently being populated."
      categoryName="Products Division"
    />
  );
}

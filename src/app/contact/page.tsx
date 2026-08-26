import React from "react";
import { Metadata } from "next";
import UnderDevelopment from "@/components/common/UnderDevelopment";

export const metadata: Metadata = {
  title: "Contact Us & Quotation Request | Elite Standard Limited",
  description: "Get in touch with our Amtola, Dhaka headquarters or request an engineering BOQ estimate.",
};

export default function ContactPage() {
  return (
    <UnderDevelopment
      title="Contact & Quotation Portal Under Active Development"
      subtitle="For urgent inquiries, please call our executive helpline at +880 1313-663311 or email elitestandardlimited@gmail.com. Interactive map and quotation form being finalized."
      categoryName="Customer Relations"
    />
  );
}

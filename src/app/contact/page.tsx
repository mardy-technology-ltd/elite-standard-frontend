import React from "react";
import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us & Quotation Request | Elite Standard Limited",
  description:
    "Get in touch with our Amtola, Dhaka headquarters or request an engineering BOQ estimate for HVAC, Fire safety, Substations, and Water Treatment systems.",
  keywords: [
    "Contact Elite Standard",
    "Request BOQ Estimation",
    "Amtola Dhaka Headquarters",
    "MEP Quote Bangladesh",
  ],
};

export default function ContactPage() {
  return <ContactClient />;
}

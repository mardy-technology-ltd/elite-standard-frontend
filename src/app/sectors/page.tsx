import React from "react";
import { Metadata } from "next";
import SectorsClient from "./SectorsClient";

export const metadata: Metadata = {
  title: "Engineering Sectors We Serve | Elite Standard Limited",
  description:
    "MEP engineering layouts across Residential high-rises, Commercial towers/malls, and Industrial plants (pharmaceutical cleanrooms, textile spinning plants).",
  keywords: [
    "Residential MEP Bangladesh",
    "Commercial Chiller systems",
    "Industrial Cleanrooms Dhaka",
    "Gas manifolds safety",
  ],
};

export default function SectorsPage() {
  return <SectorsClient />;
}

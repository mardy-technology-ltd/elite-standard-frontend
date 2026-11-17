import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Elite Standard Limited | Engineering & MEP Solutions",
    template: "%s | Elite Standard Limited",
  },
  description:
    "Premier Engineering & MEP (Mechanical, Electrical, Plumbing) services provider in Bangladesh. Specializing in HVAC, Fire Safety, Automation, and Power Distribution.",
  keywords: [
    "MEP Engineering",
    "HVAC Systems",
    "Fire Detection",
    "Power Distribution",
    "Industrial Automation",
    "Elite Standard Limited",
    "Bangladesh Engineering",
  ],
  authors: [{ name: "Elite Standard Limited" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

import AppChrome from "@/components/layout/AppChrome";
import { Analytics } from "@vercel/analytics/react";
import NextTopLoader from "nextjs-toploader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
        <NextTopLoader
          color="#E59B24"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #E59B24,0 0 5px #E59B24"
          zIndex={99999}
        />
        <AppChrome>{children}</AppChrome>
        <Analytics />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
        <TopBar />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

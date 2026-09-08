import React from "react";
import { notFound } from "next/navigation";
import { catalogDataList } from "@/lib/mockData";
import {
  FaWater,
  FaCheckCircle,
  FaArrowRight,
  FaFileInvoiceDollar,
  FaBoxes,
  FaTachometerAlt,
} from "react-icons/fa";

export function generateStaticParams() {
  return catalogDataList.map((cat) => ({
    category: cat.slug,
  }));
}

export default function CatalogPage({ params }: { params: { category: string } }) {
  const catalog = catalogDataList.find((c) => c.slug === params.category);

  if (!catalog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Modern Glassmorphic Hero Banner */}
        <div className="bg-brand-950 text-white rounded-3xl p-8 sm:p-12 mb-12 relative overflow-hidden shadow-2xl border border-brand-900">
          {/* Subtle background glow & grid decorative overlays */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-brand-800/40 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-2 bg-brand-900/90 border border-brand-800 px-3.5 py-1.5 rounded-full text-xs font-bold text-accent uppercase tracking-widest w-fit shadow-sm">
              <FaWater className="text-xs text-accent" />
              <span>Engineering Product Catalog</span>
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {catalog.title}
            </h1>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore full technical package specifications, capacity ranges, and custom engineering options delivered by Elite Standard Limited.
            </p>
          </div>
        </div>

        {/* Modern Product Catalog Cards & Tables */}
        <div className="space-y-10">
          {catalog.categories.map((cat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl border border-slate-200/90 overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Category Header Bar */}
              <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 px-6 sm:px-8 py-5 border-b border-brand-800/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-accent text-lg shadow-inner">
                    <FaBoxes />
                  </div>
                  <div>
                    <h2 className="font-heading text-lg sm:text-xl font-bold text-white uppercase tracking-wide">
                      {cat.title}
                    </h2>
                    <span className="text-xs text-slate-400 font-medium">
                      Technical Specs & Capacity Options
                    </span>
                  </div>
                </div>

                <div className="bg-brand-900/80 px-3.5 py-1.5 rounded-full border border-brand-800 text-xs font-bold text-accent uppercase tracking-wider">
                  {cat.packages.length} Packages Available
                </div>
              </div>

              {/* Modern Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[650px]">
                  <thead>
                    <tr className="bg-slate-100/90 text-brand-950 text-xs uppercase tracking-wider font-extrabold border-b border-slate-200">
                      <th className="px-6 py-4 w-40">Package Tier</th>
                      <th className="px-6 py-4 w-52">Flow Rate / Capacity</th>
                      <th className="px-6 py-4">Application & Scope Range</th>
                      <th className="px-6 py-4 text-right w-44">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm">
                    {cat.packages.map((pkg, pIdx) => (
                      <tr
                        key={pIdx}
                        className="hover:bg-slate-50/80 transition-colors duration-200 group"
                      >
                        {/* Package Tier Badge */}
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-950 text-accent font-extrabold text-xs tracking-wide shadow-sm border border-brand-900">
                            {pkg.level}
                          </span>
                        </td>

                        {/* Quantity / Flow Rate */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 font-heading font-extrabold text-brand-950 text-sm">
                            <FaTachometerAlt className="text-slate-400 text-xs group-hover:text-accent transition-colors" />
                            <span>{pkg.quantity}</span>
                          </div>
                        </td>

                        {/* Description / Scope Range */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-2 text-slate-700 text-xs sm:text-sm font-medium">
                            <FaCheckCircle className="text-emerald-500 text-xs shrink-0" />
                            <span>{pkg.range}</span>
                          </div>
                        </td>

                        {/* Action CTA Link */}
                        <td className="px-6 py-5 text-right">
                          <a
                            href="/contact?type=quote"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-brand-950 hover:text-white font-bold text-xs transition-all duration-200 group/btn shadow-sm"
                          >
                            <span>Get Quote</span>
                            <FaArrowRight className="text-[10px] text-slate-400 group-hover/btn:text-accent group-hover/btn:translate-x-0.5 transition-all" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Footer Quote Card */}
        <div className="mt-14 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-brand-950 text-accent flex items-center justify-center shrink-0 shadow-lg border border-brand-900">
              <FaFileInvoiceDollar className="text-2xl" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-heading font-extrabold text-brand-950 text-lg">
                Custom Engineering & Turnkey BOQ Quotes
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xl">
                Need customized plant capacity calculations, commercial BOQs, or industrial water treatment system schematics? Consult with our engineering team.
              </p>
            </div>
          </div>
          <a
            href="/contact?type=quote"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-950 hover:bg-brand-900 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-2xl transition-all duration-300 shadow-xl hover:shadow-brand-950/20 shrink-0 border border-brand-900 group"
          >
            <span>Request Custom BOQ</span>
            <FaArrowRight className="text-xs text-accent group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </div>
  );
}

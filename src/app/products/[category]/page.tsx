import React from "react";
import { notFound } from "next/navigation";
import { catalogDataList } from "@/lib/mockData";
import { FaFileInvoiceDollar } from "react-icons/fa";

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
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-950 mb-4">{catalog.title}</h1>
          <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Elite Standard Limited will promote and sell your water purification solutions through our official website and physical marketing channels and you will provide us with a special reseller price for all confirmed orders.
          </p>
        </div>

        {/* Pricing Tables */}
        <div className="space-y-12">
          {catalog.categories.map((cat, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              {/* Category Header */}
              <div className="bg-[#5eaee5] px-6 py-4 border-b border-[#3081b7]">
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">{cat.title}</h2>
              </div>
              
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[700px]">
                  <thead>
                    <tr className="bg-slate-100 text-brand-950 text-[13px] uppercase tracking-wider">
                      <th className="px-6 py-4 border-b border-r border-slate-300 font-extrabold w-32">Packages</th>
                      <th className="px-6 py-4 border-b border-r border-slate-300 font-extrabold">Quantity</th>
                      <th className="px-6 py-4 border-b border-r border-slate-300 font-extrabold">Ranges</th>
                      <th className="px-6 py-4 border-b border-r border-slate-300 font-extrabold w-48 text-center bg-slate-50">Vendor Price/unit</th>
                      <th className="px-6 py-4 border-b border-slate-300 font-extrabold w-48 text-center bg-slate-50">Re-selling Price/unit</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {cat.packages.map((pkg, pIdx) => (
                      <tr key={pIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 border-b border-r border-slate-300 font-semibold text-brand-800 bg-white">
                          {pkg.level}
                        </td>
                        <td className="px-6 py-4 border-b border-r border-slate-300 font-medium text-slate-700 bg-white">
                          {pkg.quantity}
                        </td>
                        <td className="px-6 py-4 border-b border-r border-slate-300 text-slate-600 bg-white">
                          {pkg.range}
                        </td>
                        <td className="px-6 py-4 border-b border-r border-slate-300 text-center text-slate-400 font-mono text-xs bg-white">
                          {pkg.vendorPrice || "---"}
                        </td>
                        <td className="px-6 py-4 border-b border-slate-300 text-center text-slate-400 font-mono text-xs bg-white">
                          {pkg.resellingPrice || "---"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#5eaee5]/20 rounded-full flex items-center justify-center shrink-0">
              <FaFileInvoiceDollar className="text-[#3081b7] text-xl" />
            </div>
            <div>
              <h3 className="font-bold text-brand-950">Partnership Inquiry</h3>
              <p className="text-xs text-slate-500 mt-1">Please contact us to negotiate or update vendor pricing terms.</p>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-brand-900 hover:bg-brand-800 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap">
            Contact Sales Team
          </button>
        </div>

      </div>
    </div>
  );
}

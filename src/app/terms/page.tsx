import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FaFileContract, FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Terms of Service | Elite Standard Limited",
  description: "Read the Terms of Service for using Elite Standard Limited's engineering and B2B services.",
};

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold text-brand-800 hover:text-accent uppercase tracking-wider mb-8 transition-colors"
        >
          <FaArrowLeft />
          <span>Back to Home</span>
        </Link>

        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col gap-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-6">
            <div className="w-12 h-12 rounded-xl bg-brand-900 text-accent flex items-center justify-center shadow-md">
              <FaFileContract className="text-xl" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
                Terms of Service
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Last updated: August 29, 2026
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed flex flex-col gap-6">
            <p>
              Welcome to <strong>Elite Standard Limited</strong>. By accessing or using our website and B2B quotation services, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not access our services.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              1. B2B Quotations and Proposals
            </h3>
            <p>
              Any Bill of Quantities (BOQ) or proposal estimates generated through our online portal are draft approximations based on client-provided details. Formal commercial contracts, project timelines, and legally binding engineering covenants require signed physical agreements.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              2. Intellectual Property
            </h3>
            <p>
              All engineering designs, blueprints, diagrams, and CAD/BIM schemas showcased on this site are the intellectual property of Elite Standard Limited unless stated otherwise. Unauthorized duplication or commercial use without prior written consent is strictly prohibited.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              3. Limitation of Liability
            </h3>
            <p>
              Elite Standard Limited is not liable for any structural, mechanical, or electrical issues arising from decisions made solely based on the general informational content of this website. All active field deployments are verified and certified separately by our licensed engineers.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              4. Modifications to Services
            </h3>
            <p>
              We reserve the right to modify, suspend, or discontinue any aspect of our website catalog or online estimation forms at any time without notice.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              5. Governing Law
            </h3>
            <p>
              These Terms of Service shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

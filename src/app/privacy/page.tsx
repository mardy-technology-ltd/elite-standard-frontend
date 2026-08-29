import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { FaShieldAlt, FaArrowLeft } from "react-icons/fa";

export const metadata: Metadata = {
  title: "Privacy Policy | Elite Standard Limited",
  description: "Learn how Elite Standard Limited handles and protects your personal and corporate information.",
};

export default function PrivacyPolicyPage() {
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
              <FaShieldAlt className="text-xl" />
            </div>
            <div>
              <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-950 tracking-tight leading-tight">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Last updated: August 29, 2026
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-600 text-sm sm:text-base leading-relaxed flex flex-col gap-6">
            <p>
              At <strong>Elite Standard Limited</strong>, accessible from our corporate website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Elite Standard Limited and how we use it.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              1. Information We Collect
            </h3>
            <p>
              If you request a quotation or contact us directly, we may receive additional information about you such as your name, corporate email address, phone number, company name, project specifics, and the contents of any message or attachments you may send us.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              2. How We Use Your Information
            </h3>
            <p>
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-2">
              <li>Provide, operate, and maintain our engineering B2B services.</li>
              <li>Improve, personalize, and expand our digital portal capabilities.</li>
              <li>Understand and analyze how visitors interact with our project portfolio.</li>
              <li>Develop new products, services, features, and engineering solutions.</li>
              <li>Communicate with you to provide BOQ estimation quotes and updates.</li>
            </ul>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              3. Data Protection and Safety Compliance
            </h3>
            <p>
              All personal and corporate information shared through our quotation portal is stored securely. We take appropriate technical security measures to prevent unauthorized access, alteration, disclosure, or destruction of your data.
            </p>

            <h3 className="font-heading font-extrabold text-brand-950 text-lg sm:text-xl mt-4">
              4. Contact Us
            </h3>
            <p>
              If you have any questions or require more information about our Privacy Policy, do not hesitate to contact us at:
            </p>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mt-2 text-xs sm:text-sm text-slate-700 flex flex-col gap-1">
              <span className="font-bold text-brand-950">Elite Standard Limited</span>
              <span>Amtola, Dhaka-1216, Bangladesh</span>
              <span>Email: elitestandardlimited@gmail.com</span>
              <span>Helpline: +880 1313-663311</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

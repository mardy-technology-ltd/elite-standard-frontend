"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FaTimes,
  FaUpload,
  FaImage,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaPlus,
  FaQuestionCircle,
  FaSave,
  FaCogs,
} from "react-icons/fa";

interface CreateServiceModalProps {
  initialCategory: "mechanical" | "electrical" | "plumbing";
  initialDiscipline?: string;
  onClose: () => void;
  onSuccess: () => void;
}

const DISCIPLINES_BY_CATEGORY: Record<
  "mechanical" | "electrical" | "plumbing",
  { code: string; name: string; prefix: string; compliance: string; icon: string }[]
> = {
  mechanical: [
    {
      code: "HVAC",
      name: "Heating, Ventilation & Air Conditioning (HVAC)",
      prefix: "ESL-MEP-HVAC",
      compliance: "BNBC, ASHRAE, SMACNA, NFPA",
      icon: "FaSnowflake",
    },
    {
      code: "FDPS",
      name: "Fire Detection & Protection System (FDPS)",
      prefix: "ESL-MEP-FDPS",
      compliance: "BNBC, NFPA 13, NFPA 72, FSCD",
      icon: "FaFireExtinguisher",
    },
    {
      code: "GUDS",
      name: "Gas & Utility Distribution System (GUDS)",
      prefix: "ESL-MEP-GUDS",
      compliance: "BNBC, NFPA 54, Titas Gas",
      icon: "FaIndustry",
    },
  ],
  electrical: [
    {
      code: "PDCP",
      name: "Power Distribution & Control Panel (PDCP)",
      prefix: "ESL-MEP-PDCP",
      compliance: "BNBC, IEC 61439, IEEE, NEC",
      icon: "FaBolt",
    },
    {
      code: "EELS",
      name: "Electrical & Lighting Systems (EELS)",
      prefix: "ESL-MEP-EELS",
      compliance: "BNBC, IEC, IEEE, IESNA",
      icon: "FaLightbulb",
    },
    {
      code: "IBA",
      name: "Industrial Building Automation (IBA)",
      prefix: "ESL-MEP-IBA",
      compliance: "BNBC, BACnet, Modbus, IEC 61131",
      icon: "FaMicrochip",
    },
  ],
  plumbing: [
    {
      code: "WSDS",
      name: "Water Supply & Drainage Systems (WSDS)",
      prefix: "ESL-MEP-WSDS",
      compliance: "BNBC, IPC, WASA Standards",
      icon: "FaShower",
    },
    {
      code: "WTS",
      name: "Water Treatment Systems (WTS)",
      prefix: "ESL-MEP-WTS",
      compliance: "DoE, WHO Drinking Standards, BDS",
      icon: "FaWater",
    },
    {
      code: "RHS",
      name: "Renewable & Solar Solutions (RHS)",
      prefix: "ESL-MEP-RHS",
      compliance: "SREDA, IEC 61215, BREB",
      icon: "FaSun",
    },
  ],
};

export default function CreateServiceModal({
  initialCategory,
  initialDiscipline,
  onClose,
  onSuccess,
}: CreateServiceModalProps) {
  const [activeTab, setActiveTab] = useState<"general" | "banner" | "scope" | "faqs">("general");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const availableDisciplines = DISCIPLINES_BY_CATEGORY[initialCategory] || DISCIPLINES_BY_CATEGORY.mechanical;
  const defaultDiscipline = availableDisciplines.find((d) => d.code === initialDiscipline) || availableDisciplines[0];

  const [selectedDiscipline, setSelectedDiscipline] = useState<string>(defaultDiscipline.code);
  const [formData, setFormData] = useState({
    title: "",
    code: `${defaultDiscipline.prefix}-`,
    slug: "",
    category: initialCategory,
    subtitle: "",
    shortDescription: "",
    fullDescription: "",
    icon: defaultDiscipline.icon,
    bannerImage: "",
    complianceText: defaultDiscipline.compliance,
    problemsText: "",
    solutionsText: "",
    scopeText: "",
    faqs: [
      {
        question: "How long does turnkey project implementation take?",
        answer: "Project timelines depend on facility scale and design specifications, typically ranging from 4 to 12 weeks from technical blueprint approval.",
      },
      {
        question: "Do you provide safety compliance and warranty certifications?",
        answer: "Yes, all installations comply fully with BNBC, NFPA, and international standards, backed by full testing, commissioning, and warranty support.",
      },
    ],
  });

  const handleDisciplineChange = (code: string) => {
    setSelectedDiscipline(code);
    const disc = availableDisciplines.find((d) => d.code === code) || availableDisciplines[0];
    setFormData((prev) => ({
      ...prev,
      code: `${disc.prefix}-${prev.slug ? prev.slug.slice(0, 4).toUpperCase() : ""}`,
      complianceText: disc.compliance,
      icon: disc.icon,
    }));
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const autoSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const disc = availableDisciplines.find((d) => d.code === selectedDiscipline) || availableDisciplines[0];
    const slugSuffix = autoSlug ? autoSlug.slice(0, 4).toUpperCase() : "";

    setFormData((prev) => ({
      ...prev,
      title,
      slug: prev.slug === "" || prev.slug === autoSlug.slice(0, -1) ? autoSlug : prev.slug,
      code: prev.code.startsWith(disc.prefix) ? `${disc.prefix}-${slugSuffix}` : prev.code,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();
      if (data.url) {
        setFormData((prev) => ({ ...prev, bannerImage: data.url }));
      } else {
        alert(data.error || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index: number, field: "question" | "answer", val: string) => {
    setFormData((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, faqs: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Service Title is required");
      return;
    }

    setSubmitting(true);
    setNotification(null);

    try {
      const compliance = formData.complianceText
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean);

      const problems = formData.problemsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean);

      const solutions = formData.solutionsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean);

      const scopeOfWork = formData.scopeText
        .split("\n")
        .map((sc) => sc.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        code: formData.code,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        category: formData.category,
        subtitle: formData.subtitle,
        shortDescription: formData.shortDescription,
        fullDescription: formData.fullDescription,
        icon: formData.icon,
        bannerImage: formData.bannerImage,
        compliance,
        problems,
        solutions,
        scopeOfWork,
        subServices: [],
        faqs: formData.faqs.filter((f) => f.question.trim() && f.answer.trim()),
        orderIndex: 0,
      };

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to create service");
      }

      setNotification({ type: "success", message: "Service created successfully!" });
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 700);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message || "Failed to create service" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg font-bold border border-blue-500/30">
              <FaCogs />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white">Create New Service</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  {formData.category}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Configure engineering parameters, technical scope, and FAQs right here.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-slate-950/40 border-b border-slate-800/80 flex gap-2 overflow-x-auto shrink-0 py-2">
          {[
            { id: "general", label: "General & Specs" },
            { id: "banner", label: "Media & Banner" },
            { id: "scope", label: "Scope & Solutions" },
            { id: "faqs", label: "Technical FAQs" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Notification Alert */}
        {notification && (
          <div
            className={`mx-6 mt-4 p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
              notification.type === "success"
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
            }`}
          >
            {notification.type === "success" ? <FaCheckCircle /> : <FaExclamationTriangle />}
            <span>{notification.message}</span>
          </div>
        )}

        {/* Form Body (Scrollable) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: General Specs */}
          {activeTab === "general" && (
            <div className="space-y-4">
              {/* Discipline Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Flagship Discipline / Category Code <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {availableDisciplines.map((d) => {
                    const isSelected = selectedDiscipline === d.code;
                    return (
                      <button
                        key={d.code}
                        type="button"
                        onClick={() => handleDisciplineChange(d.code)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "bg-blue-600/15 border-blue-500 text-white shadow-sm"
                            : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "bg-slate-800 text-slate-400"
                            }`}
                          >
                            {d.code}
                          </span>
                          <span className="text-[10px] text-slate-500">{formData.category}</span>
                        </div>
                        <div className="text-xs font-semibold truncate text-slate-200">
                          {d.name.split("(")[0]}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Service Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={handleTitleChange}
                    placeholder="e.g. VRF/VRV Multi-Split Systems"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Service Code <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    placeholder={`e.g. ESL-MEP-${selectedDiscipline}-01`}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">URL Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="auto-generated-from-title"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">Category</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.category.toUpperCase()}
                    className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs font-semibold text-slate-400 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="e.g. Tropical high-COP outdoor units engineered for variable loads"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Overview</label>
                <textarea
                  rows={3}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief summary displayed on cards and overview sections..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Detailed Engineering Description</label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Comprehensive technical writeup explaining installation, specs, and operation..."
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* TAB 2: Banner Image */}
          {activeTab === "banner" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Banner Image URL</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.bannerImage}
                    onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                    placeholder="https://... or upload below"
                    className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50"
                  >
                    <FaUpload />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
              </div>

              {formData.bannerImage && (
                <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
                  <Image
                    src={formData.bannerImage}
                    alt="Service Banner Preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Scope & Solutions */}
          {activeTab === "scope" && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Scope of Work (one item per line)
                </label>
                <textarea
                  rows={4}
                  value={formData.scopeText}
                  onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                  placeholder="e.g.&#10;Heat load calculation & psychrometric analysis&#10;Ductwork design & fabrication compliant with SMACNA"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-rose-400 mb-1">
                    Client Challenges / Problems (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.problemsText}
                    onChange={(e) => setFormData({ ...formData, problemsText: e.target.value })}
                    placeholder="e.g.&#10;High energy consumption in conventional systems&#10;Uneven temperature distribution"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-rose-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-emerald-400 mb-1">
                    Turnkey Solutions (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.solutionsText}
                    onChange={(e) => setFormData({ ...formData, solutionsText: e.target.value })}
                    placeholder="e.g.&#10;Custom VRF/VRV system integration&#10;Automated BMS building integration"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-emerald-900/40 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Compliance Standards (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.complianceText}
                  onChange={(e) => setFormData({ ...formData, complianceText: e.target.value })}
                  placeholder="e.g. BNBC, ASHRAE, NFPA, SMACNA"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          )}

          {/* TAB 4: FAQs */}
          {activeTab === "faqs" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Frequently Asked Questions</span>
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <FaPlus className="text-[10px]" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {formData.faqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-400">FAQ #{idx + 1}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFaq(idx)}
                        className="text-red-400 hover:text-red-300 text-xs"
                      >
                        Remove
                      </button>
                    </div>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                      placeholder="Question..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                      placeholder="Answer..."
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all disabled:opacity-50 active:scale-95"
            >
              <FaSave />
              <span>{submitting ? "Saving Service..." : "Publish Service"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


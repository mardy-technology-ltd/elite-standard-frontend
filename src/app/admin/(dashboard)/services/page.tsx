"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCogs,
  FaUpload,
  FaImage,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShieldAlt,
  FaListOl,
  FaQuestionCircle,
  FaLayerGroup,
  FaSnowflake,
  FaFireExtinguisher,
  FaBolt,
  FaMicrochip,
  FaLightbulb,
  FaIndustry,
  FaShower,
  FaWater,
  FaSun,
} from "react-icons/fa";

interface SubService {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  features: string[];
  image: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface Service {
  id: string;
  slug: string;
  code: string;
  category: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  bannerImage: string;
  compliance: string[];
  problems: string[];
  solutions: string[];
  scopeOfWork: string[];
  subServices: SubService[];
  faqs: FaqItem[];
  orderIndex: number;
}

const AVAILABLE_ICONS = [
  { name: "FaIndustry", icon: <FaIndustry />, label: "Industry" },
  { name: "FaSnowflake", icon: <FaSnowflake />, label: "HVAC / Cooling" },
  { name: "FaFireExtinguisher", icon: <FaFireExtinguisher />, label: "Fire Safety" },
  { name: "FaBolt", icon: <FaBolt />, label: "Power & Switchgear" },
  { name: "FaMicrochip", icon: <FaMicrochip />, label: "Automation / BMS" },
  { name: "FaLightbulb", icon: <FaLightbulb />, label: "Lighting" },
  { name: "FaWater", icon: <FaWater />, label: "Water Treatment" },
  { name: "FaShower", icon: <FaShower />, label: "Plumbing / Sanitary" },
  { name: "FaSun", icon: <FaSun />, label: "Solar & Renewables" },
];

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "banner" | "scope" | "subservices">("general");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    slug: "",
    category: "mechanical",
    subtitle: "",
    shortDescription: "",
    fullDescription: "",
    icon: "FaIndustry",
    bannerImage: "",
    complianceText: "",
    problemsText: "",
    solutionsText: "",
    scopeText: "",
    subServices: [] as SubService[],
    faqs: [] as FaqItem[],
    orderIndex: 0,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch Services
  const fetchServices = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/services";
      const params = new URLSearchParams();
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (search) params.append("search", search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.services) {
        setServices(data.services);
      }
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [selectedCategory, search]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingService(null);
    setFormData({
      title: "",
      code: "ESL-MEP-",
      slug: "",
      category: "mechanical",
      subtitle: "",
      shortDescription: "",
      fullDescription: "",
      icon: "FaIndustry",
      bannerImage: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop",
      complianceText: "BNBC, ASHRAE, NFPA",
      problemsText: "High energy consumption\nFrequent operational downtime\nCompliance and safety risks",
      solutionsText: "Turnkey engineering execution\nAutomated monitoring integration\nInternational standard compliance validation",
      scopeText: "Engineering calculation & design blueprints\nEquipment sourcing & quality inspection\nCertified installation & site assembly\nTesting, commissioning & compliance signoff",
      subServices: [],
      faqs: [
        {
          question: "How long does the turnkey project implementation take?",
          answer: "Timeline varies based on facility capacity, typically between 4 to 12 weeks from design approval.",
        },
      ],
      orderIndex: services.length,
    });
    setActiveTab("general");
    setModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    setFormData({
      title: s.title,
      code: s.code,
      slug: s.slug,
      category: s.category,
      subtitle: s.subtitle || "",
      shortDescription: s.shortDescription || "",
      fullDescription: s.fullDescription || "",
      icon: s.icon || "FaIndustry",
      bannerImage: s.bannerImage || "",
      complianceText: Array.isArray(s.compliance) ? s.compliance.join(", ") : "",
      problemsText: Array.isArray(s.problems) ? s.problems.join("\n") : "",
      solutionsText: Array.isArray(s.solutions) ? s.solutions.join("\n") : "",
      scopeText: Array.isArray(s.scopeOfWork) ? s.scopeOfWork.join("\n") : "",
      subServices: Array.isArray(s.subServices) ? s.subServices : [],
      faqs: Array.isArray(s.faqs) && s.faqs.length > 0 ? s.faqs : [],
      orderIndex: typeof s.orderIndex === "number" ? s.orderIndex : 0,
    });
    setActiveTab("general");
    setModalOpen(true);
  };

  // Upload file from computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

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
        subServices: formData.subServices,
        faqs: formData.faqs.filter((f) => f.question.trim() && f.answer.trim()),
        orderIndex: Number(formData.orderIndex) || 0,
      };

      if (editingService) {
        const res = await fetch(`/api/admin/services/${editingService.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to update service");
        }
      } else {
        const res = await fetch("/api/admin/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create service");
        }
      }

      setModalOpen(false);
      fetchServices();
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Service
  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete service "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/services/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete service");
      }
      fetchServices();
    } catch (err: any) {
      alert(err.message || "Failed to delete service");
    }
  };

  // SubServices Helpers
  const handleAddSubService = () => {
    const newSub: SubService = {
      id: `ss-${Date.now()}`,
      slug: `sub-${formData.subServices.length + 1}`,
      title: "New Sub-Service",
      shortDesc: "Engineered high-performance module.",
      features: ["Certified components", "Standard compliance"],
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop",
    };
    setFormData((prev) => ({
      ...prev,
      subServices: [...prev.subServices, newSub],
    }));
  };

  const handleUpdateSubService = (index: number, field: keyof SubService, value: any) => {
    setFormData((prev) => {
      const updated = [...prev.subServices];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, subServices: updated };
    });
  };

  const handleRemoveSubService = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      subServices: prev.subServices.filter((_, i) => i !== index),
    }));
  };

  // FAQ Helpers
  const handleAddFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const handleUpdateFaq = (index: number, field: keyof FaqItem, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.faqs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, faqs: updated };
    });
  };

  const handleRemoveFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-2">
            <FaCogs />
            MEP Services & Solutions Management
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Services Catalog & Engineering Solutions
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Create, configure and manage all Mechanical, Electrical, and Plumbing engineering services with live website sync.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <FaPlus />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search service title, code, description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: "all", label: "All Disciplines" },
            { id: "mechanical", label: "Mechanical" },
            { id: "electrical", label: "Electrical" },
            { id: "plumbing", label: "Plumbing" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "bg-slate-800/80 hover:bg-slate-800 text-slate-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Table / Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-16">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : services.length === 0 ? (
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-12 text-center">
          <FaLayerGroup className="mx-auto text-4xl text-slate-600 mb-3" />
          <h3 className="text-base font-semibold text-white">No Services Found</h3>
          <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
            Try adjusting your search filter or click &quot;Add New Service&quot; to create one.
          </p>
        </div>
      ) : (
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3">Service & Discipline</th>
                  <th className="px-4 py-3">Code / Slug</th>
                  <th className="px-4 py-3">Compliance</th>
                  <th className="px-4 py-3">Sub-Services</th>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {services.map((s) => {
                  const categoryBadgeColor =
                    s.category === "mechanical"
                      ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                      : s.category === "electrical"
                      ? "bg-indigo-500/10 text-indigo-400 border-indigo-500/30"
                      : "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";

                  return (
                    <tr key={s.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                            {s.bannerImage ? (
                              <Image
                                src={s.bannerImage}
                                alt={s.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500">
                                <FaImage />
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm line-clamp-1">
                              {s.title}
                            </span>
                            <span className="text-slate-400 text-[11px] line-clamp-1">
                              {s.subtitle || s.shortDescription}
                            </span>
                            <div className="mt-1">
                              <span
                                className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold border capitalize ${categoryBadgeColor}`}
                              >
                                {s.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-mono text-xs font-bold text-slate-200">
                            {s.code}
                          </span>
                          <span className="font-mono text-[10px] text-slate-500">
                            /services/{s.slug}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {Array.isArray(s.compliance) && s.compliance.length > 0 ? (
                            s.compliance.slice(0, 3).map((comp, idx) => (
                              <span
                                key={idx}
                                className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-300 font-medium"
                              >
                                {comp}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-500 text-[10px]">None specified</span>
                          )}
                          {s.compliance?.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400">
                              +{s.compliance.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold">
                          {Array.isArray(s.subServices) ? s.subServices.length : 0} Modules
                        </span>
                      </td>

                      <td className="px-4 py-3 text-slate-400 font-mono text-xs">
                        #{s.orderIndex}
                      </td>

                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/services/${s.slug}`}
                            target="_blank"
                            title="View on Live Website"
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                          >
                            <FaExternalLinkAlt className="text-xs" />
                          </Link>
                          <button
                            onClick={() => handleOpenEdit(s)}
                            title="Edit Service"
                            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-colors"
                          >
                            <FaEdit className="text-xs" />
                          </button>
                          <button
                            onClick={() => handleDelete(s.id, s.title)}
                            title="Delete Service"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create / Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm font-bold">
                  <FaCogs />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editingService ? `Edit Service: ${editingService.title}` : "Add New Engineering Service"}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Configure service discipline, compliance standards, engineering scope, and sub-services.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-2 overflow-x-auto">
              {[
                { id: "general", label: "1. Basic Info & Category" },
                { id: "banner", label: "2. Visual Banner" },
                { id: "scope", label: "3. Scope & Compliance" },
                { id: "subservices", label: `4. Sub-Services (${formData.subServices.length})` },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-5">
              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Service Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                            slug: editingService
                              ? formData.slug
                              : e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                          })
                        }
                        placeholder="e.g. Heating, Ventilation & Air Conditioning"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Service Code <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.code}
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="e.g. ESL-MEP-HVAC"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 uppercase font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Discipline / Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="mechanical">Mechanical</option>
                        <option value="electrical">Electrical</option>
                        <option value="plumbing">Plumbing</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        URL Slug <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. hvac-systems"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Icon Symbol
                      </label>
                      <select
                        value={formData.icon}
                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      >
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic.name} value={ic.name}>
                            {ic.label} ({ic.name})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. High-efficiency VRF, central chillers & cleanroom HVAC engineering."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Short Description (Overview & SEO)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Short summary displayed on cards and overview grids..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Full Engineering Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Comprehensive description of engineering capabilities, methodologies, and technical credentials..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Visual Banner */}
              {activeTab === "banner" && (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                    <label className="block text-xs font-bold text-slate-300">
                      Upload Banner Image from Computer
                    </label>
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all disabled:opacity-50"
                      >
                        <FaUpload />
                        <span>{uploading ? "Uploading Image..." : "Choose Computer File"}</span>
                      </button>
                      <span className="text-slate-400 text-xs">
                        JPG, PNG, WebP supported (recommended 1920x1080)
                      </span>
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] font-bold text-slate-400 mb-1">
                        Or specify direct image URL:
                      </label>
                      <input
                        type="url"
                        value={formData.bannerImage}
                        onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Banner Preview */}
                  {formData.bannerImage && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-300">Live Banner Preview:</span>
                      <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-800 shadow-md">
                        <Image
                          src={formData.bannerImage}
                          alt="Banner Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                          <span className="text-xs font-bold text-blue-400 font-mono">
                            {formData.code || "ESL-MEP-CODE"}
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {formData.title || "Service Title Preview"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Scope & Compliance */}
              {activeTab === "scope" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Compliance Standards (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={formData.complianceText}
                      onChange={(e) => setFormData({ ...formData, complianceText: e.target.value })}
                      placeholder="e.g. BNBC, ASHRAE, SMACNA, NFPA 20, ISO 9001"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Client Pain Points / Problems (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.problemsText}
                        onChange={(e) => setFormData({ ...formData, problemsText: e.target.value })}
                        placeholder="High energy consumption in conventional systems&#10;Uneven temperature distribution and humidity issues&#10;Inadequate ventilation causing compliance risks"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Engineering Solutions (one per line)
                      </label>
                      <textarea
                        rows={4}
                        value={formData.solutionsText}
                        onChange={(e) => setFormData({ ...formData, solutionsText: e.target.value })}
                        placeholder="Custom VRF/VRV system integration with smart thermostats&#10;Precision air handling units (AHU) with HEPA filtration&#10;Automated building management system (BMS) integration"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Scope of Work Steps (one per line)
                    </label>
                    <textarea
                      rows={4}
                      value={formData.scopeText}
                      onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                      placeholder="Heat load calculation & psychrometric analysis&#10;Ductwork design & fabrication compliant with SMACNA&#10;Chillers, AHU, FCU installation & commissioning&#10;Cleanroom positive pressure validation"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 4: Sub-Services & FAQs */}
              {activeTab === "subservices" && (
                <div className="space-y-6">
                  {/* Sub-Services Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Sub-Service Modules ({formData.subServices.length})
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddSubService}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                      >
                        <FaPlus />
                        <span>Add Sub-Service</span>
                      </button>
                    </div>

                    {formData.subServices.length === 0 ? (
                      <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-xs text-slate-500">
                        No sub-services configured yet. Click &quot;Add Sub-Service&quot; to create modular services (e.g. VRF, Chillers, AHU).
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {formData.subServices.map((sub, idx) => (
                          <div
                            key={sub.id || idx}
                            className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-blue-400">
                                Sub-Service #{idx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveSubService(idx)}
                                className="text-red-400 hover:text-red-300 text-xs"
                              >
                                Remove
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <input
                                type="text"
                                value={sub.title}
                                onChange={(e) => handleUpdateSubService(idx, "title", e.target.value)}
                                placeholder="Sub-service Title (e.g. VRF/VRV Multi-Split Systems)"
                                className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                              />
                              <input
                                type="text"
                                value={sub.slug}
                                onChange={(e) => handleUpdateSubService(idx, "slug", e.target.value)}
                                placeholder="Slug (e.g. vrf)"
                                className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white font-mono"
                              />
                            </div>

                            <input
                              type="text"
                              value={sub.shortDesc}
                              onChange={(e) => handleUpdateSubService(idx, "shortDesc", e.target.value)}
                              placeholder="Short description..."
                              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                            />

                            <input
                              type="text"
                              value={sub.image}
                              onChange={(e) => handleUpdateSubService(idx, "image", e.target.value)}
                              placeholder="Image URL..."
                              className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* FAQ Section */}
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        Frequently Asked Questions (FAQs)
                      </h4>
                      <button
                        type="button"
                        onClick={handleAddFaq}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                      >
                        <FaPlus />
                        <span>Add FAQ</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {formData.faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-slate-400">
                              Question #{idx + 1}
                            </span>
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
                            onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                            placeholder="Question..."
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                            placeholder="Answer..."
                            className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 disabled:opacity-50"
                >
                  {submitting
                    ? "Saving to Database..."
                    : editingService
                    ? "Update Service"
                    : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

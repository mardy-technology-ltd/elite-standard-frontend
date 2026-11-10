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
  FaArrowLeft,
  FaSave,
  FaColumns,
  FaDesktop,
  FaMobileAlt,
  FaEye,
  FaSlidersH,
} from "react-icons/fa";
import ServiceLivePreview from "./ServiceLivePreview";
import DivisionSlidersScreen from "./DivisionSlidersScreen";

interface SubService {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc?: string;
  features: string[];
  image: string;
  sliderImages?: string[];
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

const MEP_SUB_CATEGORIES: Record<
  string,
  Array<{
    code: string;
    title: string;
    slug: string;
    icon: string;
    subtitle: string;
    compliance: string;
  }>
> = {
  mechanical: [
    {
      code: "HVAC",
      title: "Heating, Ventilation & Air Conditioning (HVAC)",
      slug: "hvac-systems",
      icon: "FaSnowflake",
      subtitle: "Central HVAC, VRF & Cleanroom AHU Systems",
      compliance: "BNBC, ASHRAE, SMACNA, NFPA",
    },
    {
      code: "FDPS",
      title: "Fire Detection & Protection System (FDPS)",
      slug: "fdps",
      icon: "FaFireExtinguisher",
      subtitle: "Addressable Alarms, Sprinklers & Hydrants",
      compliance: "BNBC, NFPA, FSCD",
    },
    {
      code: "GUDS",
      title: "Gas & Utility Distribution System (GUDS / PDCP)",
      slug: "guds",
      icon: "FaIndustry",
      subtitle: "LPG / Natural Gas Pipeline & Leak Interlock Controls",
      compliance: "BNBC, NFPA 54, Titas Gas",
    },
  ],
  electrical: [
    {
      code: "PDCP",
      title: "Power Distribution & Control Panel (PDCP / STAS)",
      slug: "pdcp",
      icon: "FaBolt",
      subtitle: "Form-4 LT Switchgear, Substation & Smart MCC",
      compliance: "BNBC, IEC 61439, IEEE",
    },
    {
      code: "EELS",
      title: "Electrical & Lighting Systems (EELS / ELV)",
      slug: "eels",
      icon: "FaLightbulb",
      subtitle: "Busbar Trunking, ESE Lightning Grid & DALI LED",
      compliance: "BNBC, IEC, IEEE, IESNA",
    },
    {
      code: "IBA",
      title: "Industrial Building Automation (IBA / BMS)",
      slug: "iba",
      icon: "FaMicrochip",
      subtitle: "Siemens/Schneider PLC, SCADA & BMS Telemetry",
      compliance: "BNBC, BACnet, Modbus, IEC 61131",
    },
  ],
  plumbing: [
    {
      code: "WSDS",
      title: "Water Supply & Drainage Systems (WSDS)",
      slug: "wsds",
      icon: "FaShower",
      subtitle: "VFD Booster Pumps & PPR Supply Networks",
      compliance: "BNBC, IPC, WASA",
    },
    {
      code: "WTS",
      title: "Water Treatment Systems (WTS / ETP / STP)",
      slug: "wts",
      icon: "FaWater",
      subtitle: "Effluent ETP, STP, ZLD, IRP & Reverse Osmosis",
      compliance: "BNBC, DoE, WHO, BDS",
    },
    {
      code: "RHS",
      title: "Renewable & Solar Solutions (RHS)",
      slug: "rhs",
      icon: "FaSun",
      subtitle: "Rooftop Solar PV Plants, Net Metering & Inverters",
      compliance: "SREDA, IEC 61215, BREB",
    },
  ],
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Screen View State: "list" | "create" | "edit" | "sliders"
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit" | "sliders">("list");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "banner" | "scope" | "faqs">("general");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [selectedSliderCategory, setSelectedSliderCategory] = useState("eels");

  // Live Split Screen Editor State
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [previewPageMode, setPreviewPageMode] = useState<"division" | "details">("division");
  const [previewSubIdx, setPreviewSubIdx] = useState(0);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    slug: "",
    category: "mechanical",
    parentFlagshipId: "",
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

      const res = await fetch(url, { cache: "no-store" });
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

  // Open Create Screen (Separate Screen, Not Pop-Up)
  const handleOpenCreate = () => {
    setEditingService(null);
    const defaultSub = MEP_SUB_CATEGORIES.mechanical[0];
    setFormData({
      title: "",
      code: `ESL-MEP-${defaultSub.code}`,
      slug: "",
      category: "mechanical",
      parentFlagshipId: defaultSub.code,
      subtitle: defaultSub.subtitle,
      shortDescription: "",
      fullDescription: "",
      icon: defaultSub.icon,
      bannerImage: "",
      complianceText: defaultSub.compliance,
      problemsText: "",
      solutionsText: "",
      scopeText: "",
      subServices: [],
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
      orderIndex: services.length,
    });
    setActiveTab("general");
    setViewMode("create");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/admin/services?action=create");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Edit Screen (Separate Screen, Not Pop-Up)
  const handleOpenEdit = (s: Service) => {
    setEditingService(s);
    const cat = s.category || "mechanical";
    const matchedSub = (MEP_SUB_CATEGORIES[cat] || []).find(
      (sub) => s.code?.toUpperCase().includes(sub.code) || s.slug?.toLowerCase().includes(sub.code.toLowerCase())
    );
    setFormData({
      title: s.title || "",
      code: s.code || "",
      slug: s.slug || "",
      category: cat,
      parentFlagshipId: matchedSub ? matchedSub.code : (MEP_SUB_CATEGORIES[cat]?.[0]?.code || ""),
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
    setViewMode("edit");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/admin/services?action=edit&id=${s.id}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back to Services List Screen
  const handleBackToList = () => {
    setViewMode("list");
    setEditingService(null);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/admin/services");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle URL params on initial load and route changes
  useEffect(() => {
    if (typeof window !== "undefined" && services.length > 0) {
      const params = new URLSearchParams(window.location.search);
      const action = params.get("action");
      const id = params.get("id");
      if (action === "create" || action === "new") {
        if (viewMode !== "create") handleOpenCreate();
      } else if (action === "edit" && id) {
        const found = services.find((s) => s.id === id);
        if (found && editingService?.id !== id) {
          handleOpenEdit(found);
        }
      }
    }
  }, [services]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const action = params.get("action");
      const id = params.get("id");
      if (action === "create" || action === "new") {
        handleOpenCreate();
      } else if (action === "edit" && id) {
        const found = services.find((s) => s.id === id);
        if (found) {
          handleOpenEdit(found);
        } else {
          handleBackToList();
        }
      } else {
        handleBackToList();
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [services]);

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

      setViewMode("list");
      setEditingService(null);
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", "/admin/services");
      }
      setNotification({
        type: "success",
        message: editingService ? "Service updated successfully!" : "New service created successfully!",
      });
      fetchServices();
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleSubServiceImageUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const upData = new FormData();
      upData.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: upData,
      });
      const data = await res.json();
      if (data.url) {
        handleUpdateSubService(idx, "image", data.url);
      }
    } catch (err) {
      console.error("Sub-service upload error:", err);
      alert("Failed to upload image.");
    }
  };

  const handleSubServiceSliderUpload = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const upData = new FormData();
        upData.append("file", files[i]);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: upData,
        });
        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const updated = [...prev.subServices];
          const existing = updated[idx].sliderImages || [];
          updated[idx] = {
            ...updated[idx],
            sliderImages: [...existing, ...uploadedUrls],
          };
          return { ...prev, subServices: updated };
        });
      }
    } catch (err) {
      console.error("Slider upload error:", err);
      alert("Failed to upload slider image(s).");
    }
  };

  const handleRemoveSubServiceSliderImage = (subIdx: number, imgIdx: number) => {
    setFormData((prev) => {
      const updated = [...prev.subServices];
      const existing = updated[subIdx].sliderImages || [];
      updated[subIdx] = {
        ...updated[subIdx],
        sliderImages: existing.filter((_, i) => i !== imgIdx),
      };
      return { ...prev, subServices: updated };
    });
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
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
            notification.type === "success"
              ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
              : "bg-red-950/40 border-red-500/40 text-red-300"
          }`}
        >
          <div className="flex items-center gap-2.5 text-xs font-semibold">
            <FaCheckCircle className="text-sm" />
            <span>{notification.message}</span>
          </div>
          <button
            onClick={() => setNotification(null)}
            className="text-xs hover:opacity-75 transition-opacity"
          >
            <FaTimes />
          </button>
        </div>
      )}

      {/* VIEW 1: CATEGORY SLIDERS STUDIO SCREEN */}
      {viewMode === "sliders" ? (
        <DivisionSlidersScreen
          initialCategoryKey={selectedSliderCategory}
          onBack={handleBackToList}
        />
      ) : viewMode === "list" ? (
        <div className="space-y-6">
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

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setSelectedSliderCategory("eels");
              setViewMode("sliders");
            }}
            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-blue-400 hover:text-white border border-blue-500/30 font-semibold text-xs sm:text-sm transition-all active:scale-95 shadow-sm"
          >
            <FaSlidersH className="text-xs" />
            <span>Manage Division Sliders</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            <FaPlus />
            <span>Add New Service</span>
          </button>
        </div>
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

        </div>
      ) : (
        /* VIEW 2: DEDICATED FULL SCREEN SERVICE STUDIO / CREATION SCREEN */
        <div className="space-y-6">
          {/* Screen Top Header with Breadcrumbs, Back Button, and Quick Actions */}
          <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBackToList}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-semibold transition-all active:scale-95"
                  >
                    <FaArrowLeft className="text-xs" />
                    <span>Back to Services</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Admin</span>
                    <span>/</span>
                    <span>Services</span>
                    <span>/</span>
                    <span className="text-blue-400 font-semibold">
                      {viewMode === "edit" ? "Edit Service" : "Add New Service"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-lg font-bold border border-blue-500/30">
                    <FaCogs />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      {viewMode === "edit"
                        ? `Edit Service: ${formData.title || editingService?.title || "Untitled"}`
                        : "Add New Engineering Service"}
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                      {viewMode === "edit"
                        ? "Update service parameters, engineering specifications, media banners, and sub-services."
                        : "Configure and publish a new MEP discipline service with full technical specifications."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Top Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
                {/* Toggle Live Split Preview */}
                <button
                  type="button"
                  onClick={() => setShowLivePreview(!showLivePreview)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                    showLivePreview
                      ? "bg-blue-600/20 text-blue-400 border-blue-500/40 shadow-sm"
                      : "bg-slate-800 text-slate-400 border-slate-700 hover:text-white"
                  }`}
                  title="Toggle Live Split-Screen View"
                >
                  <FaColumns className="text-xs" />
                  <span>{showLivePreview ? "Split View: ON" : "Split View: OFF"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBackToList}
                  className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700/60"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const form = document.getElementById("service-editor-form") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 active:scale-95"
                >
                  <FaSave />
                  <span>
                    {submitting
                      ? "Saving to Database..."
                      : viewMode === "edit"
                      ? "Update Service"
                      : "Create Service"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Screen Content Wrapper: Normal or Live Split Screen */}
          <div className={`grid gap-6 ${showLivePreview ? "grid-cols-1 xl:grid-cols-12" : "grid-cols-1"}`}>
            
            {/* LEFT COLUMN: Input Form & Tabs */}
            <div className={`${showLivePreview ? "xl:col-span-6" : "col-span-1"} bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col`}>
              {/* Screen Tabs Bar */}
              <div className="flex border-b border-slate-800 bg-slate-950/60 px-4 sm:px-6 pt-3 gap-2 overflow-x-auto">
                {[
                  { id: "general", label: "1. Basic Info & Code" },
                  { id: "banner", label: "2. Media Banner" },
                  { id: "scope", label: "3. Scope & Challenges" },
                  { id: "faqs", label: `4. FAQs (${formData.faqs.length})` },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-400 bg-blue-500/5 rounded-t-lg"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Screen Form Content */}
              <form
                id="service-editor-form"
                onSubmit={handleSubmit}
                className="p-5 sm:p-6 space-y-6 flex-1"
              >
              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
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
                              : e.target.value
                                  .toLowerCase()
                                  .trim()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, ""),
                          })
                        }
                        placeholder="e.g. Heating, Ventilation & Air Conditioning"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
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
                        onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                        placeholder="e.g. ESL-MEP-HVAC"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 uppercase font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        1. Discipline / Main Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const newCat = e.target.value;
                          const subs = MEP_SUB_CATEGORIES[newCat] || [];
                          const firstSub = subs[0];
                          setFormData({
                            ...formData,
                            category: newCat,
                            parentFlagshipId: firstSub ? firstSub.code : "",
                            ...(viewMode === "create" && firstSub
                              ? {
                                  code: `ESL-MEP-${firstSub.code}`,
                                  icon: firstSub.icon,
                                  subtitle: firstSub.subtitle,
                                  complianceText: firstSub.compliance,
                                }
                              : {}),
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                      >
                        <option value="mechanical">Mechanical Services</option>
                        <option value="electrical">Electrical Services</option>
                        <option value="plumbing">Plumbing Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        2. Flagship Sub-Category ({formData.category.toUpperCase()}) <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.parentFlagshipId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const subs = MEP_SUB_CATEGORIES[formData.category] || [];
                          const matchedSub = subs.find((s) => s.code === val || s.slug === val);
                          setFormData({
                            ...formData,
                            parentFlagshipId: val,
                            ...(viewMode === "create" && matchedSub
                              ? {
                                  code: `ESL-MEP-${matchedSub.code}`,
                                  icon: matchedSub.icon,
                                  subtitle: matchedSub.subtitle,
                                  complianceText: matchedSub.compliance,
                                }
                              : {}),
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-slate-950 border border-blue-500/50 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-semibold transition-colors"
                      >
                        <optgroup label={`3 Core ${formData.category.toUpperCase()} Sub-Categories`}>
                          {(MEP_SUB_CATEGORIES[formData.category] || []).map((sub) => (
                            <option key={sub.code} value={sub.code}>
                              {sub.code} — {sub.title}
                            </option>
                          ))}
                        </optgroup>
                        {services.filter((s) => s.category === formData.category && s.id !== editingService?.id).length > 0 && (
                          <optgroup label="Other Database Services in this Discipline">
                            {services
                              .filter((s) => s.category === formData.category && s.id !== editingService?.id)
                              .map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.code} — {s.title}
                                </option>
                              ))}
                          </optgroup>
                        )}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-300">
                          URL Slug (Auto-generated)
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          /services/{formData.parentFlagshipId?.toLowerCase() || formData.category}/{formData.slug || "..."}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. vrf-vrv-multi-split-systems"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 font-mono transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Display Order Index
                      </label>
                      <input
                        type="number"
                        value={formData.orderIndex}
                        onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                        placeholder="0"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      placeholder="e.g. High-efficiency VRF, central chillers & cleanroom HVAC engineering."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Short Description (Overview & SEO)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Short summary displayed on cards, hero banners, and overview grids..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Full Engineering Description
                    </label>
                    <textarea
                      rows={6}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Comprehensive description of engineering capabilities, methodologies, standards adherence, and technical credentials..."
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: Visual Banner & Media */}
              {activeTab === "banner" && (
                <div className="space-y-6">
                  <div className="p-6 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white">Upload Banner Image</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        High-resolution engineering photo displayed across the service hero banner and header section.
                      </p>
                    </div>

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
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all disabled:opacity-50 shadow-md shadow-blue-500/20 active:scale-95"
                      >
                        <FaUpload />
                        <span>{uploading ? "Uploading Image..." : "Choose File from Computer"}</span>
                      </button>
                      <span className="text-slate-400 text-xs">
                        JPG, PNG, WebP supported (Recommended ratio: 16:9, e.g. 1920x1080)
                      </span>
                    </div>

                    <div className="pt-2">
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Or specify direct image URL:
                      </label>
                      <input
                        type="text"
                        value={formData.bannerImage}
                        onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Banner Preview */}
                  {formData.bannerImage ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-300">Live Visual Banner Preview:</span>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, bannerImage: "" }))}
                          className="text-xs text-red-400 hover:text-red-300 font-semibold transition-colors"
                        >
                          Clear Image
                        </button>
                      </div>
                      <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
                        <Image
                          src={formData.bannerImage}
                          alt="Banner Preview"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                          <span className="text-xs font-bold text-blue-400 font-mono tracking-wider">
                            {formData.code || "ESL-MEP-CODE"}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-1">
                            {formData.title || "Service Title Preview"}
                          </h3>
                          {formData.subtitle && (
                            <p className="text-xs text-slate-300 mt-1 max-w-xl">
                              {formData.subtitle}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-12 border-2 border-dashed border-slate-800 rounded-2xl text-center flex flex-col items-center justify-center gap-3 bg-slate-950/30">
                      <FaImage className="text-3xl text-slate-600" />
                      <span className="text-xs font-semibold text-slate-300">
                        No banner image uploaded yet
                      </span>
                      <span className="text-[11px] text-slate-500 max-w-sm">
                        Choose a high-resolution file from your computer or paste an image URL above to see the live hero preview.
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: Scope of Work, Challenges & Solutions */}
              {activeTab === "scope" && (
                <div className="space-y-6">
                  {/* Scope of Work & Technical Deployments */}
                  <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <FaCheckCircle className="text-emerald-500 text-xs" />
                          <span>Scope of Work & Technical Deployments</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Turnkey deliverables and certified scope items displayed as emerald checkmarks on both the division and details page (one per line).
                        </p>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                        {formData.scopeText.split("\n").filter((s) => s.trim()).length} Items
                      </span>
                    </div>

                    <textarea
                      rows={6}
                      value={formData.scopeText}
                      onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                      placeholder="e.g.&#10;Heat load calculation & psychrometric analysis&#10;Ductwork design & fabrication compliant with SMACNA&#10;Chillers, AHU, FCU installation & commissioning&#10;Cleanroom positive pressure validation"
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Challenges & Engineered Solutions Side-by-Side */}
                  <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-4">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FaExclamationTriangle className="text-amber-400 text-xs" />
                        <span>Challenges & Engineered Solutions</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Client pain points contrasted with your turnkey engineering solutions (one item per line).
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Client Pain Points & Vulnerabilities */}
                      <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-rose-300">
                            Client Pain Points & Vulnerabilities
                          </label>
                          <span className="text-[10px] font-mono text-rose-400">
                            {formData.problemsText.split("\n").filter((p) => p.trim()).length} issues
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Specific vulnerabilities faced by factories/facilities before your installation.
                        </p>
                        <textarea
                          rows={6}
                          value={formData.problemsText}
                          onChange={(e) => setFormData({ ...formData, problemsText: e.target.value })}
                          placeholder="e.g.&#10;High energy consumption in conventional systems&#10;Uneven temperature distribution and humidity issues&#10;Inadequate ventilation causing compliance risks"
                          className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-rose-900/30 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-rose-500 transition-colors"
                        />
                      </div>

                      {/* Engineered Turnkey Solutions */}
                      <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-xs font-bold text-emerald-300">
                            Engineered Turnkey Solutions
                          </label>
                          <span className="text-[10px] font-mono text-emerald-400">
                            {formData.solutionsText.split("\n").filter((s) => s.trim()).length} solutions
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          The engineered solution deployed to solve each problem above.
                        </p>
                        <textarea
                          rows={6}
                          value={formData.solutionsText}
                          onChange={(e) => setFormData({ ...formData, solutionsText: e.target.value })}
                          placeholder="e.g.&#10;Custom VRF/VRV system integration with smart thermostats&#10;Precision air handling units (AHU) with HEPA filtration&#10;Automated building management system (BMS) integration"
                          className="w-full px-3.5 py-2.5 bg-slate-900/90 border border-emerald-900/30 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mandatory Safety & Compliance Standards */}
                  <div className="p-5 bg-slate-950/70 border border-slate-800 rounded-2xl space-y-3">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FaShieldAlt className="text-blue-400 text-xs" />
                      <span>Mandatory Engineering Compliance Standards</span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Comma-separated list of regulatory codes and standards (e.g. BNBC, ASHRAE, NFPA, DoE, SMACNA).
                    </p>
                    <input
                      type="text"
                      value={formData.complianceText}
                      onChange={(e) => setFormData({ ...formData, complianceText: e.target.value })}
                      placeholder="e.g. BNBC, ASHRAE, SMACNA, NFPA 20, ISO 9001, FSCD"
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {formData.complianceText && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {formData.complianceText
                          .split(",")
                          .map((c) => c.trim())
                          .filter(Boolean)
                          .map((item, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-md text-[11px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold"
                            >
                              ✓ {item}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: Frequently Asked Questions (FAQs) */}
              {activeTab === "faqs" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <FaQuestionCircle className="text-blue-400 text-xs" />
                        <span>Frequently Asked Questions (FAQs)</span>
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Technical questions and answers displayed in accordion format on this service&apos;s page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                    >
                      <FaPlus />
                      <span>Add FAQ</span>
                    </button>
                  </div>

                  {formData.faqs.length === 0 ? (
                    <div className="p-8 bg-slate-950/40 rounded-2xl border border-slate-800 text-center text-xs text-slate-400">
                      No FAQs added yet. Click &quot;Add FAQ&quot; to provide technical answers for clients.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {formData.faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-400">
                              Question #{idx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFaq(idx)}
                              className="text-red-400 hover:text-red-300 text-xs font-semibold transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                          <input
                            type="text"
                            value={faq.question}
                            onChange={(e) => handleUpdateFaq(idx, "question", e.target.value)}
                            placeholder="Enter the question..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                          <textarea
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => handleUpdateFaq(idx, "answer", e.target.value)}
                            placeholder="Enter the answer..."
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-800">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700/60"
                >
                  <FaArrowLeft className="text-xs" />
                  <span>Discard & Back to Services</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleBackToList}
                    className="px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors border border-slate-700/60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 active:scale-95"
                  >
                    <FaSave />
                    <span>
                      {submitting
                        ? "Saving to Database..."
                        : viewMode === "edit"
                        ? "Update Service"
                        : "Create Service"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Live Split-Screen Website Display */}
          {showLivePreview && (
            <div className="xl:col-span-6 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden flex flex-col xl:sticky xl:top-6 xl:h-[calc(100vh-3rem)]">
              {/* Live Preview Screen Header */}
              <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <FaDesktop className="text-blue-400 text-[11px]" />
                    <span>Live Website Screen Preview</span>
                  </span>
                </div>
                <span className="text-[10px] text-blue-400 font-mono">
                  /services/{formData.slug || "service"}
                </span>
              </div>

              {/* Scrollable Live Preview Screen */}
              <div className="flex-1 overflow-y-auto bg-slate-100 p-2 sm:p-3 scrollbar-thin">
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-300 bg-white">
                  <ServiceLivePreview formData={formData} />
                </div>
              </div>

              {/* Live Preview Footer */}
              <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
                <span>Changes typed on the left appear on this live screen instantly.</span>
                <span className="text-emerald-400 font-semibold">Realtime WYSIWYG</span>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
);
}

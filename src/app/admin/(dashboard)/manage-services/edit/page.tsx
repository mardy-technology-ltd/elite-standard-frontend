"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaPlus,
  FaTrash,
  FaCheckCircle,
  FaExclamationTriangle,
  FaCogs,
  FaExternalLinkAlt,
} from "react-icons/fa";

function EditSubServiceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const parentParam = searchParams.get("parent");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    id: "",
    slug: "",
    code: "",
    title: "",
    subtitle: "",
    category: "",
    shortDescription: "",
    fullDescription: "",
    bannerImage: "",
    sliderImages: [] as string[],
    features: [] as string[],
    faqs: [] as { question: string; answer: string }[],
    problems: [] as string[],
    solutions: [] as string[],
    assurance: {
      enabled: true,
      standards: "BNBC & NFPA Compliant",
      warranty: "OEM Verified Guarantee",
      support: "24/7 Rapid Response",
    },
    parentFlagshipId: "",
    parentFlagshipSlug: "",
    parentFlagshipCode: "",
    isEmbedded: false,
  });

  const [newFeatureText, setNewFeatureText] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newFaqQuestion, setNewFaqQuestion] = useState("");
  const [newFaqAnswer, setNewFaqAnswer] = useState("");
  const [newProblemText, setNewProblemText] = useState("");
  const [newSolutionText, setNewSolutionText] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSubService = async () => {
      try {
        const res = await fetch(`/api/admin/manage-services/sub-service/${id}`);
        const data = await res.json();

        if (res.ok && data.service) {
          const s = data.service;
          const sliderImages = Array.isArray(s.sliderImages) && s.sliderImages.length > 0
            ? s.sliderImages
            : s.bannerImage
            ? [s.bannerImage]
            : [];

          setFormData({
            id: s.id || id,
            slug: s.slug || "",
            code: s.code || "",
            title: s.title || "",
            subtitle: s.subtitle || "",
            category: s.category || "",
            shortDescription: s.shortDescription || "",
            fullDescription: s.fullDescription || "",
            bannerImage: s.bannerImage || (sliderImages[0] || ""),
            sliderImages,
            features: Array.isArray(s.features) ? s.features : (Array.isArray(s.scopeOfWork) ? s.scopeOfWork : []),
            faqs: Array.isArray(s.faqs) ? s.faqs : [],
            problems: Array.isArray(s.problems) ? s.problems : [],
            solutions: Array.isArray(s.solutions) ? s.solutions : [],
            assurance: (s.sectors as any)?.assurance ?? {
              enabled: true,
              standards: "BNBC & NFPA Compliant",
              warranty: "OEM Verified Guarantee",
              support: "24/7 Rapid Response",
            },
            parentFlagshipId: data.parentFlagshipId || s.parentFlagshipId || "",
            parentFlagshipSlug: s.parentFlagshipSlug || parentParam || "",
            parentFlagshipCode: s.parentFlagshipCode || "",
            isEmbedded: Boolean(data.isEmbedded),
          });
        } else {
          setNotification({ type: "error", message: data.error || "Sub-Service not found" });
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        setNotification({ type: "error", message: "Failed to load sub-service details" });
      } finally {
        setLoading(false);
      }
    };

    fetchSubService();
  }, [id, parentParam]);

  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const body = new FormData();
        body.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });

        const data = await res.json();
        if (data.url) {
          uploadedUrls.push(data.url);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          const combined = [...prev.sliderImages, ...uploadedUrls];
          return {
            ...prev,
            sliderImages: combined,
            bannerImage: prev.bannerImage || combined[0],
          };
        });
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload some images. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setFormData((prev) => {
      const updated = [...prev.sliderImages, newImageUrl.trim()];
      return {
        ...prev,
        sliderImages: updated,
        bannerImage: prev.bannerImage || updated[0],
      };
    });
    setNewImageUrl("");
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => {
      const updated = prev.sliderImages.filter((_, i) => i !== index);
      return {
        ...prev,
        sliderImages: updated,
        bannerImage: prev.bannerImage === prev.sliderImages[index] ? (updated[0] || "") : prev.bannerImage,
      };
    });
  };

  const handleSetPrimaryImage = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      bannerImage: url,
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, newFeatureText.trim()],
    }));
    setNewFeatureText("");
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = val;
      return { ...prev, features: updated };
    });
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      alert("Please provide both question and answer");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: newFaqQuestion.trim(), answer: newFaqAnswer.trim() }],
    }));
    setNewFaqQuestion("");
    setNewFaqAnswer("");
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

  const handleAddProblem = () => {
    if (!newProblemText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      problems: [...prev.problems, newProblemText.trim()],
    }));
    setNewProblemText("");
  };

  const handleRemoveProblem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      problems: prev.problems.filter((_, i) => i !== index),
    }));
  };

  const handleProblemChange = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.problems];
      updated[index] = val;
      return { ...prev, problems: updated };
    });
  };

  const handleAddSolution = () => {
    if (!newSolutionText.trim()) return;
    setFormData((prev) => ({
      ...prev,
      solutions: [...prev.solutions, newSolutionText.trim()],
    }));
    setNewSolutionText("");
  };

  const handleRemoveSolution = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      solutions: prev.solutions.filter((_, i) => i !== index),
    }));
  };

  const handleSolutionChange = (index: number, val: string) => {
    setFormData((prev) => {
      const updated = [...prev.solutions];
      updated[index] = val;
      return { ...prev, solutions: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    // If user filled in the "Add FAQ" inputs but forgot to click "+ Add FAQ", automatically include it
    let finalFaqs = [...formData.faqs];
    if (newFaqQuestion.trim() && newFaqAnswer.trim()) {
      finalFaqs.push({
        question: newFaqQuestion.trim(),
        answer: newFaqAnswer.trim(),
      });
    }

    // Same for "Solutions we cover" feature input
    let finalFeatures = [...formData.features];
    if (newFeatureText.trim()) {
      finalFeatures.push(newFeatureText.trim());
    }

    // Same for problems and solutions
    let finalProblems = [...formData.problems];
    if (newProblemText.trim()) {
      finalProblems.push(newProblemText.trim());
    }

    let finalSolutions = [...formData.solutions];
    if (newSolutionText.trim()) {
      finalSolutions.push(newSolutionText.trim());
    }

    const payload = {
      ...formData,
      faqs: finalFaqs,
      features: finalFeatures,
      problems: finalProblems,
      solutions: finalSolutions,
      sectors: {
        assurance: formData.assurance,
      },
    };

    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch(`/api/admin/manage-services/sub-service/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || "Failed to save changes");
      }

      setNotification({ type: "success", message: "Sub-Service updated successfully!" });
      setTimeout(() => {
        const cat = formData.category ? `?category=${formData.category}` : "";
        router.push(`/admin/manage-services${cat}`);
      }, 800);
    } catch (err: any) {
      setNotification({ type: "error", message: err.message || "Failed to save changes" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-400 text-sm font-sans flex items-center justify-center gap-2">
        <FaCogs className="animate-spin text-blue-500 text-lg" />
        <span>Loading Sub-Service configuration...</span>
      </div>
    );
  }

  return (
    <div className="w-full pb-20 font-sans space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/manage-services${formData.category ? `?category=${formData.category}` : ""}`}
            className="w-10 h-10 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center border border-slate-700 transition-colors"
            title="Back to Manage Services"
          >
            <FaArrowLeft className="text-sm" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">Edit Sub-Service</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {formData.code || "SUB-SERVICE"}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Updating technical specifications, capabilities, and presentation media.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center">
          <Link
            href={`/admin/manage-services${formData.category ? `?category=${formData.category}` : ""}`}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
          >
            <FaSave />
            <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
          </button>
        </div>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2.5 ${
            notification.type === "success"
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
          }`}
        >
          {notification.type === "success" ? <FaCheckCircle className="text-sm" /> : <FaExclamationTriangle className="text-sm" />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Form Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: General Specifications & Scope */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card: Basic Parameters */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>General Information</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Sub-Service Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. VRF/VRV Multi-Split Systems"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Slug ID</label>
                <input
                  type="text"
                  readOnly
                  value={formData.slug}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs font-mono text-slate-400 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">Discipline Code</label>
                <input
                  type="text"
                  readOnly
                  value={formData.code}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs font-mono text-blue-400 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Subtitle / Tagline</label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Brief technical punchline..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Short Overview Description</label>
              <textarea
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="Summary description displayed under the title on the big card and page header..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Card: Engineering Overview (Technical Blueprint) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  Engineering Overview
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                Technical Blueprint
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              This text is displayed inside the dedicated white card with the gold vertical accent line under the "Engineering Overview" section on the Sub-Service details page.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Technical Blueprint Narrative / Description
              </label>
              <textarea
                rows={4}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                placeholder="Detailed technical overview narrative (e.g. Renewable energy generation and distribution solutions engineered for residential, commercial, and industrial facilities. Complete turnkey EPC covering solar power stations, grid synchronization, and hybrid storage systems.)..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors leading-relaxed"
              />
            </div>

            {/* Assurance Badges (Standards, Warranty, Support) */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300 flex items-center gap-2">
                  <span>Assurance Badges Strip (3 Columns)</span>
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">
                    {formData.assurance.enabled ? "Enabled" : "Disabled"}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        assurance: {
                          ...formData.assurance,
                          enabled: !formData.assurance.enabled,
                        },
                      })
                    }
                    className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formData.assurance.enabled ? "bg-cyan-500" : "bg-slate-700"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        formData.assurance.enabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {formData.assurance.enabled && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Badge 1: Standards */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                      Standards (1st Badge)
                    </span>
                    <input
                      type="text"
                      value={formData.assurance.standards}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assurance: { ...formData.assurance, standards: e.target.value },
                        })
                      }
                      placeholder="e.g. BNBC & NFPA Compliant"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  {/* Badge 2: Warranty */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                      Warranty (2nd Badge)
                    </span>
                    <input
                      type="text"
                      value={formData.assurance.warranty}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assurance: { ...formData.assurance, warranty: e.target.value },
                        })
                      }
                      placeholder="e.g. OEM Verified Guarantee"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Badge 3: Support */}
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1.5">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">
                      Support (3rd Badge)
                    </span>
                    <input
                      type="text"
                      value={formData.assurance.support}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          assurance: { ...formData.assurance, support: e.target.value },
                        })
                      }
                      placeholder="e.g. 24/7 Rapid Response"
                      className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Card: Solutions we cover */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Solutions we cover</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {formData.features.length} items
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              These items appear as prominent dark chips with gold indicators inside the Sub-Service card.
            </p>

            {/* List of Features */}
            <div className="space-y-2.5">
              {formData.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold text-xs pl-2">›</span>
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
                    title="Remove capability"
                  >
                    <FaTrash className="text-[10px]" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Feature */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={newFeatureText}
                onChange={(e) => setNewFeatureText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Type new capability (e.g. Solar Power Station) and click Add..."
                className="flex-1 px-3.5 py-2 bg-slate-950 border border-dashed border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 transition-all shrink-0"
              >
                <FaPlus className="text-[10px]" />
                <span>Add Item</span>
              </button>
            </div>
          </div>

          {/* Card: Technical Clarifications & FAQs */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <h3 className="text-sm font-bold text-white">
                  Technical Clarifications & FAQs
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {formData.faqs.length} FAQs
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              These appear in the accordion section ("Technical Clarifications & Project Execution") on the Sub-Service page.
            </p>

            {/* List of FAQs */}
            <div className="space-y-3">
              {formData.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-2 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono font-bold">
                      Q{idx + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFaq(idx)}
                      className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
                      title="Delete FAQ"
                    >
                      <FaTrash className="text-[9px]" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Question
                    </label>
                    <input
                      type="text"
                      value={faq.question}
                      onChange={(e) => handleFaqChange(idx, "question", e.target.value)}
                      placeholder="e.g. How long does implementation take?"
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 mb-1">
                      Answer
                    </label>
                    <textarea
                      rows={2}
                      value={faq.answer}
                      onChange={(e) => handleFaqChange(idx, "answer", e.target.value)}
                      placeholder="e.g. 4 to 12 weeks."
                      className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Add New FAQ Form */}
            <div className="pt-2 border-t border-slate-800/80 space-y-2">
              <label className="block text-xs font-bold text-slate-300">
                + Add New Clarification / FAQ
              </label>
              <input
                type="text"
                value={newFaqQuestion}
                onChange={(e) => setNewFaqQuestion(e.target.value)}
                placeholder="Question (e.g. What warranty is provided?)..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea
                rows={2}
                value={newFaqAnswer}
                onChange={(e) => setNewFaqAnswer(e.target.value)}
                placeholder="Answer (e.g. 5-year comprehensive warranty with 24/7 technical support)..."
                className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-bold border border-blue-500/30 transition-all"
              >
                <FaPlus className="text-[10px]" />
                <span>Add FAQ</span>
              </button>
            </div>
          </div>

          {/* Card: Challenges & Engineered Solutions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <h3 className="text-sm font-bold text-white">
                  Challenges & Engineered Solutions
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                {formData.problems.length} Problems / {formData.solutions.length} Solutions
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              These appear in the 2-column card ("Challenges & Engineered Solutions") on the Sub-Service page.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
              {/* Left Column: Client Pain Points & Vulnerabilities */}
              <div className="p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 space-y-3">
                <div className="flex items-center justify-between border-b border-rose-500/20 pb-2">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>Client Pain Points</span>
                  </span>
                  <span className="text-[10px] font-mono text-rose-400/80">
                    {formData.problems.length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.problems.map((prob, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 ml-1" />
                      <input
                        type="text"
                        value={prob}
                        onChange={(e) => handleProblemChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-rose-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveProblem(idx)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
                        title="Remove problem"
                      >
                        <FaTrash className="text-[9px]" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newProblemText}
                    onChange={(e) => setNewProblemText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddProblem();
                      }
                    }}
                    placeholder="New client pain point..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-dashed border-rose-500/40 rounded-lg text-xs text-white focus:outline-none focus:border-rose-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddProblem}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white text-xs font-bold border border-rose-500/30 transition-all shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>

              {/* Right Column: Engineered Turnkey Solutions */}
              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Engineered Solutions</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400/80">
                    {formData.solutions.length} items
                  </span>
                </div>

                <div className="space-y-2">
                  {formData.solutions.map((sol, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 ml-1" />
                      <input
                        type="text"
                        value={sol}
                        onChange={(e) => handleSolutionChange(idx, e.target.value)}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-emerald-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSolution(idx)}
                        className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-rose-600/20 text-slate-400 hover:text-rose-400 flex items-center justify-center transition-colors shrink-0"
                        title="Remove solution"
                      >
                        <FaTrash className="text-[9px]" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={newSolutionText}
                    onChange={(e) => setNewSolutionText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSolution();
                      }
                    }}
                    placeholder="New turnkey engineered solution..."
                    className="flex-1 px-3 py-1.5 bg-slate-950 border border-dashed border-emerald-500/40 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleAddSolution}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white text-xs font-bold border border-emerald-500/30 transition-all shrink-0"
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Media, Banner Image & Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Media & Images (Multiple Image Support) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Media & Image Gallery</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                {formData.sliderImages.length} images
              </span>
            </div>

            {/* Upload Buttons */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Upload New Images
              </label>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 disabled:opacity-50"
                >
                  <FaUpload />
                  <span>{uploading ? "Uploading Images..." : "+ Add Images From PC"}</span>
                </button>
                {formData.sliderImages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm("Clear all images from gallery?")) {
                        setFormData((prev) => ({
                          ...prev,
                          sliderImages: [],
                          bannerImage: "",
                        }));
                      }
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition-all"
                  >
                    Clear All Images
                  </button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleMultipleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>

            {/* Or add Image URL manually */}
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                Or Add Image via URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddImageUrl();
                    }
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleAddImageUrl}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shrink-0"
                >
                  Add URL
                </button>
              </div>
            </div>

            {/* Thumbnail Gallery Grid */}
            {formData.sliderImages.length > 0 && (
              <div className="space-y-2 pt-2">
                <label className="block text-[11px] font-bold text-slate-400">
                  Uploaded Gallery Images (Click to set primary banner):
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {formData.sliderImages.map((imgUrl, idx) => {
                    const isPrimary = formData.bannerImage === imgUrl;
                    return (
                      <div
                        key={idx}
                        className={`group relative h-20 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                          isPrimary
                            ? "border-blue-500 ring-2 ring-blue-500/40 shadow-lg"
                            : "border-slate-800 hover:border-slate-600"
                        }`}
                        onClick={() => handleSetPrimaryImage(imgUrl)}
                        title={isPrimary ? "Primary Banner Image" : "Click to set as primary banner"}
                      >
                        <Image
                          src={imgUrl}
                          alt={`Thumbnail ${idx + 1}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isPrimary && (
                          <span className="absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded text-[8px] font-black uppercase bg-blue-600 text-white shadow">
                            Primary
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(idx);
                          }}
                          className="absolute top-1 right-1 z-10 w-5 h-5 rounded-md bg-black/80 hover:bg-rose-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Delete image"
                        >
                          <FaTrash className="text-[8px]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Visual Image Box Preview */}
            <div className="space-y-1 pt-2">
              <label className="block text-[11px] font-bold text-slate-400">
                Primary Banner Live Preview:
              </label>
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
                {formData.bannerImage ? (
                  <Image
                    src={formData.bannerImage}
                    alt={formData.title || "Preview"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-500 font-semibold">
                    No image preview available
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-xl bg-slate-950/90 text-amber-400 font-mono font-bold text-xs border border-slate-800 shadow-xl backdrop-blur-md">
                    {formData.code || "SUB"} / {formData.title || "Untitled"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Card: Save & Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-md flex items-center justify-between gap-3">
            <Link
              href={`/admin/manage-services${formData.category ? `?category=${formData.category}` : ""}`}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors font-medium"
            >
              <FaArrowLeft className="text-[10px]" />
              <span>Cancel & Return</span>
            </Link>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 disabled:opacity-50"
            >
              <FaSave />
              <span>{saving ? "Saving Changes..." : "Save Sub-Service"}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function EditSubServicePage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Loading Edit Screen...</div>}>
      <EditSubServiceContent />
    </Suspense>
  );
}


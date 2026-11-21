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
    features: [] as string[],
    parentFlagshipId: "",
    parentFlagshipSlug: "",
    parentFlagshipCode: "",
    isEmbedded: false,
  });

  const [newFeatureText, setNewFeatureText] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchSubService = async () => {
      try {
        const res = await fetch(`/api/admin/manage-services/sub-service/${id}`);
        const data = await res.json();

        if (res.ok && data.service) {
          const s = data.service;
          setFormData({
            id: s.id || id,
            slug: s.slug || "",
            code: s.code || "",
            title: s.title || "",
            subtitle: s.subtitle || "",
            category: s.category || "",
            shortDescription: s.shortDescription || "",
            fullDescription: s.fullDescription || "",
            bannerImage: s.bannerImage || "",
            features: Array.isArray(s.features) ? s.features : (Array.isArray(s.scopeOfWork) ? s.scopeOfWork : []),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    setSaving(true);
    setNotification(null);

    try {
      const res = await fetch(`/api/admin/manage-services/sub-service/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
                placeholder="Summary description displayed under the title on the big card..."
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Card: Key Technical Capabilities (Service Groups) */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Key Technical Capabilities / Service Groups</span>
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
        </div>

        {/* Right Column: Media, Banner Image & Live Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Media & Image */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Media & Banner Image</span>
            </h3>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Image URL</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.bannerImage}
                  onChange={(e) => setFormData({ ...formData, bannerImage: e.target.value })}
                  placeholder="https://images.unsplash.com/... or upload"
                  className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all disabled:opacity-50 shrink-0"
                >
                  <FaUpload />
                  <span>{uploading ? "..." : "Upload"}</span>
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

            {/* Visual Image Box Preview */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
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


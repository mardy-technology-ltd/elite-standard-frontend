"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaSave,
  FaImage,
  FaUpload,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaSlidersH,
  FaDesktop,
  FaLayerGroup,
  FaInfoCircle,
} from "react-icons/fa";

export interface CategorySlide {
  title: string;
  subtitle: string;
  badge: string;
  image: string;
}

export const FLAGSHIP_DIVISIONS = [
  { key: "hvac", code: "HVAC", name: "Heating, Ventilation & Air Conditioning", discipline: "Mechanical" },
  { key: "fdps", code: "FDPS", name: "Fire Detection & Protection System", discipline: "Mechanical" },
  { key: "guds", code: "GUDS", name: "Gas & Utility Distribution System", discipline: "Mechanical" },
  { key: "pdcp", code: "PDCP", name: "Power Distribution & Control Panel", discipline: "Electrical" },
  { key: "eels", code: "EELS", name: "Electrical & Lighting Systems", discipline: "Electrical" },
  { key: "iba", code: "IBA", name: "Industrial Building Automation (BMS)", discipline: "Electrical" },
  { key: "wsds", code: "WSDS", name: "Water Supply & Drainage Systems", discipline: "Plumbing" },
  { key: "wts", code: "WTS", name: "Water Treatment Systems (ETP/STP/RO)", discipline: "Plumbing" },
  { key: "rhs", code: "RHS", name: "Renewable & Solar Solutions", discipline: "Plumbing" },
];

interface DivisionSlidersScreenProps {
  initialCategoryKey?: string;
  onBack: () => void;
}

export default function DivisionSlidersScreen({
  initialCategoryKey = "eels",
  onBack,
}: DivisionSlidersScreenProps) {
  const [selectedKey, setSelectedKey] = useState(initialCategoryKey);
  const [slides, setSlides] = useState<CategorySlide[]>([]);
  const [activeSlidePreviewIdx, setActiveSlidePreviewIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchSlides(selectedKey);
  }, [selectedKey]);

  const fetchSlides = async (catKey: string) => {
    setLoading(true);
    setSuccessMsg(null);
    try {
      const res = await fetch(`/api/admin/category-sliders?key=category_slider_${catKey}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.value) && data.value.length > 0) {
        setSlides(data.value);
        setActiveSlidePreviewIdx(0);
      } else {
        const curr = FLAGSHIP_DIVISIONS.find((d) => d.key === catKey);
        setSlides([
          {
            title: curr ? curr.name : "Turnkey Engineering Systems",
            subtitle: "Conforming to international safety, BNBC, and precision MEP engineering standards.",
            badge: `${curr ? curr.code : "ESL"} Solutions`,
            image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
          },
        ]);
        setActiveSlidePreviewIdx(0);
      }
    } catch (err) {
      console.error("Failed to load slides:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlide = () => {
    const curr = FLAGSHIP_DIVISIONS.find((d) => d.key === selectedKey);
    setSlides((prev) => {
      const updated = [
        ...prev,
        {
          title: `${curr?.code || "Flagship"} Engineering Deployment #${prev.length + 1}`,
          subtitle: "High efficiency industrial engineering deployment with 24/7 technical monitoring.",
          badge: `${curr?.code || "MEP"} Certified`,
          image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1600&auto=format&fit=crop",
        },
      ];
      setActiveSlidePreviewIdx(updated.length - 1);
      return updated;
    });
  };

  const handleRemoveSlide = (idx: number) => {
    setSlides((prev) => {
      const updated = prev.filter((_, i) => i !== idx);
      if (activeSlidePreviewIdx >= updated.length) {
        setActiveSlidePreviewIdx(Math.max(0, updated.length - 1));
      }
      return updated;
    });
  };

  const handleUpdateSlide = (idx: number, field: keyof CategorySlide, value: string) => {
    setSlides((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const handleUploadImage = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingIdx(idx);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        handleUpdateSlide(idx, "image", data.url);
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Error uploading image.");
    } finally {
      setUploadingIdx(null);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccessMsg(null);
    try {
      const res = await fetch("/api/admin/category-sliders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryKey: selectedKey,
          slides: slides,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg(`Successfully saved slides for ${selectedKey.toUpperCase()}!`);
        setTimeout(() => setSuccessMsg(null), 5000);
      } else {
        alert(data.error || "Failed to save category slides.");
      }
    } catch (err) {
      console.error("Error saving category slides:", err);
      alert("Error saving category slides.");
    } finally {
      setSaving(false);
    }
  };

  const currentDiv = FLAGSHIP_DIVISIONS.find((d) => d.key === selectedKey);
  const activeSlide = slides[activeSlidePreviewIdx] || slides[0];

  return (
    <div className="space-y-6">
      {/* Top Header Card with Back Button */}
      <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all border border-slate-700/60 shadow-sm active:scale-95"
              title="Return to Services List"
            >
              <FaArrowLeft className="text-sm" />
            </button>

            <div>
              <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
                <span>Services Catalog</span>
                <span>/</span>
                <span className="text-slate-300">Flagship Category Sliders</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <FaSlidersH className="text-blue-400 text-lg sm:text-xl" />
                <span>Flagship Sub-Category Sliders Studio</span>
              </h1>
              <p className="text-slate-400 text-xs mt-0.5">
                Customize the top showcase slider images &amp; headings that introduce each flagship domain landing page.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/services/${selectedKey}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition-all"
            >
              <span>View /services/{selectedKey}</span>
              <FaExternalLinkAlt className="text-[10px]" />
            </Link>

            <button
              onClick={handleSave}
              disabled={saving || loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 transition-all"
            >
              <FaSave className="text-sm" />
              <span>{saving ? "Saving Changes..." : "Save Slider Changes"}</span>
            </button>
          </div>
        </div>

        {/* 9 Divisions Navigation Strip */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <FaLayerGroup className="text-blue-400" />
            <span>Select Division to Customize ({FLAGSHIP_DIVISIONS.length} Core Flagships):</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {FLAGSHIP_DIVISIONS.map((div) => {
              const isActive = selectedKey === div.key;
              return (
                <button
                  key={div.key}
                  onClick={() => setSelectedKey(div.key)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 font-bold scale-[1.02]"
                      : "bg-slate-800/70 text-slate-300 border-slate-750 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="font-mono font-bold">{div.code}</span>
                  <span className="text-[10px] opacity-75 hidden sm:inline">| {div.discipline}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Success Notification Alert */}
      {successMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs rounded-2xl flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5 font-semibold">
            <FaCheckCircle className="text-base text-emerald-400" />
            <span>{successMsg}</span>
          </div>
          <Link
            href={`/services/${selectedKey}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:underline font-semibold"
          >
            <span>Preview live at /services/{selectedKey}</span>
            <FaExternalLinkAlt className="text-[10px]" />
          </Link>
        </div>
      )}

      {/* Main Studio Body: 2 Columns (Editor + Live Visual Preview) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Column: Slides Editor */}
        <div className="xl:col-span-7 space-y-4">
          <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>{currentDiv?.name}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 font-mono">
                  {currentDiv?.code}
                </span>
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Manage each slide in the rotating banner. Slide order determines playback sequence.
              </p>
            </div>

            <button
              onClick={handleAddSlide}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-semibold text-xs border border-blue-500/40 transition-all shadow-sm active:scale-95"
            >
              <FaPlus className="text-xs" />
              <span>Add Slide</span>
            </button>
          </div>

          {loading ? (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-16 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : slides.length === 0 ? (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-12 text-center text-slate-400 text-xs">
              No slides configured. Click &quot;Add Slide&quot; above to create the first slide.
            </div>
          ) : (
            <div className="space-y-4">
              {slides.map((slide, idx) => {
                const isSelected = activeSlidePreviewIdx === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveSlidePreviewIdx(idx)}
                    className={`p-5 bg-slate-900/70 border rounded-2xl transition-all cursor-pointer ${
                      isSelected
                        ? "border-blue-500/80 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/50"
                        : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-800 text-slate-400"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-200">
                          Slide #{idx + 1}
                        </span>
                        {isSelected && (
                          <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Active in Preview
                          </span>
                        )}
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveSlide(idx);
                        }}
                        disabled={slides.length === 1}
                        className="text-xs text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                        title="Delete this slide"
                      >
                        <FaTrash />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      {/* Image Preview & Upload */}
                      <div className="md:col-span-4 space-y-2">
                        <div className="relative aspect-[16/9] w-full bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                          {slide.image ? (
                            <Image
                              src={slide.image}
                              alt={slide.title || "Slide Image"}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 text-xs">
                              <FaImage className="text-2xl mb-1" />
                              <span>No image</span>
                            </div>
                          )}

                          {uploadingIdx === idx && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </div>

                        <label className="cursor-pointer w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-colors">
                          <FaUpload className="text-[11px]" />
                          <span>{uploadingIdx === idx ? "Uploading..." : "Upload New Image"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleUploadImage(idx, e)}
                          />
                        </label>

                        <input
                          type="text"
                          placeholder="Or paste image URL..."
                          value={slide.image}
                          onChange={(e) => handleUpdateSlide(idx, "image", e.target.value)}
                          className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      {/* Text Fields */}
                      <div className="md:col-span-8 space-y-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Slide Heading / Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Turnkey Industrial Infrastructure"
                            value={slide.title}
                            onChange={(e) => handleUpdateSlide(idx, "title", e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Slide Subtitle / Technical Description
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Engineering summary describing this deployment..."
                            value={slide.subtitle}
                            onChange={(e) => handleUpdateSlide(idx, "subtitle", e.target.value)}
                            className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500 resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Slide Badge Tag
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. IEC 61439 Type-Tested • 0.99 PF Guarantee"
                            value={slide.badge}
                            onChange={(e) => handleUpdateSlide(idx, "badge", e.target.value)}
                            className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Live Website Mockup Preview */}
        <div className="xl:col-span-5 bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden xl:sticky xl:top-6">
          <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <FaDesktop className="text-blue-400 text-xs" />
                <span>Live Slider Display Preview</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-blue-400">
              /services/{selectedKey}
            </span>
          </div>

          <div className="p-4 bg-slate-950/80">
            {/* Live Slider Mockup Card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-900 border border-slate-700 shadow-2xl group">
              {activeSlide?.image ? (
                <Image
                  src={activeSlide.image}
                  alt={activeSlide.title || "Preview"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">
                  No preview available
                </div>
              )}

              {/* Gradient Overlays matching frontend */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              {/* Slide Content Box */}
              <div className="absolute inset-x-0 bottom-0 p-5 text-white space-y-2">
                {activeSlide?.badge && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-600/90 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm border border-blue-400/40">
                    {activeSlide.badge}
                  </span>
                )}
                <h4 className="text-base sm:text-lg font-bold leading-snug line-clamp-2">
                  {activeSlide?.title || "Slide Title"}
                </h4>
                <p className="text-xs text-slate-200 line-clamp-2 font-normal leading-relaxed opacity-90">
                  {activeSlide?.subtitle || "Slide technical description..."}
                </p>
              </div>

              {/* Navigation Indicators */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full text-[10px] text-white border border-white/10">
                <span>Slide</span>
                <span className="font-bold text-blue-400">{activeSlidePreviewIdx + 1}</span>
                <span>/</span>
                <span>{slides.length}</span>
              </div>
            </div>

            {/* Thumbnail selector */}
            {slides.length > 1 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {slides.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlidePreviewIdx(idx)}
                    className={`relative aspect-[16/9] rounded-lg overflow-hidden border transition-all ${
                      activeSlidePreviewIdx === idx
                        ? "border-blue-500 ring-2 ring-blue-500/50 scale-105"
                        : "border-slate-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    {s.image ? (
                      <Image
                        src={s.image}
                        alt="thumb"
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-900" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-950 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FaInfoCircle className="text-blue-400" />
              <span>Click any slide on the left or thumbnail to preview.</span>
            </span>
            <span className="text-emerald-400 font-semibold font-mono">100% Live Sync</span>
          </div>
        </div>
      </div>
    </div>
  );
}


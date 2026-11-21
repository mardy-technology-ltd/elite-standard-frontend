"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import CreateServiceModal from "./CreateServiceModal";
import {
  FaSnowflake,
  FaBolt,
  FaWater,
  FaChevronDown,
  FaSearch,
  FaExternalLinkAlt,
  FaLayerGroup,
  FaArrowRight,
  FaTools,
  FaFireExtinguisher,
  FaIndustry,
  FaLightbulb,
  FaMicrochip,
  FaShower,
  FaSun,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrashAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

interface ServiceItem {
  id: string;
  slug: string;
  code: string;
  category: string;
  title: string;
  subtitle?: string;
  shortDescription?: string;
  fullDescription?: string;
  features?: string[];
  scopeOfWork?: string[];
  subServices?: any[];
  bannerImage?: string;
  sliderImages?: string[];
  isEmbeddedSubService?: boolean;
  parentFlagshipSlug?: string;
}

interface FlagshipSubCategory {
  code: string;
  title: string;
  slug: string;
  subtitle: string;
  icon: React.ReactNode;
  compliance: string;
}

interface ServicePillar {
  id: "mechanical" | "electrical" | "plumbing";
  code: "M" | "E" | "P";
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  accentBorder: string;
  subCategories: FlagshipSubCategory[];
}

const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: "mechanical",
    code: "M",
    title: "Mechanical Services",
    subtitle: "HVAC, Fire Protection & Gas Systems",
    icon: <FaSnowflake />,
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",
    badgeBg: "bg-sky-500/10 border-sky-500/30 text-sky-400",
    badgeText: "M",
    accentBorder: "border-sky-500/30",
    subCategories: [
      {
        code: "HVAC",
        title: "Heating, Ventilation & Air Conditioning",
        slug: "hvac",
        subtitle: "Central HVAC, VRF & Cleanroom AHU Systems",
        icon: <FaSnowflake className="text-sky-400" />,
        compliance: "BNBC, ASHRAE, SMACNA, NFPA",
      },
      {
        code: "FDPS",
        title: "Fire Detection & Protection System",
        slug: "fdps",
        subtitle: "Hydrant, Sprinkler & FM200 Clean Agent Suppression",
        icon: <FaFireExtinguisher className="text-rose-400" />,
        compliance: "BNBC, NFPA 13, NFPA 72, FSCD",
      },
      {
        code: "GUDS",
        title: "Gas & Utility Distribution System",
        slug: "guds",
        subtitle: "Natural Gas & LPG Central Distribution Pipelines",
        icon: <FaIndustry className="text-amber-400" />,
        compliance: "BNBC, NFPA 54, Titas Gas",
      },
    ],
  },
  {
    id: "electrical",
    code: "E",
    title: "Electrical Services",
    subtitle: "Switchgear, Automation & Lighting",
    icon: <FaBolt />,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 border-amber-500/30 text-amber-400",
    badgeText: "E",
    accentBorder: "border-amber-500/30",
    subCategories: [
      {
        code: "PDCP",
        title: "Power Distribution & Control Panel",
        slug: "pdcp",
        subtitle: "Form-4 LT Switchgear, Substation & Smart MCC",
        icon: <FaBolt className="text-amber-400" />,
        compliance: "BNBC, IEC 61439, IEEE, NEC",
      },
      {
        code: "EELS",
        title: "Electrical & Lighting Systems",
        slug: "eels",
        subtitle: "Compact BBT, Early Streamer Lightning & Smart DALI LED",
        icon: <FaLightbulb className="text-yellow-400" />,
        compliance: "BNBC, IEC, IEEE, IESNA",
      },
      {
        code: "IBA",
        title: "Industrial Building Automation",
        slug: "iba",
        subtitle: "Siemens/Schneider PLC, Central SCADA & Smart BMS",
        icon: <FaMicrochip className="text-emerald-400" />,
        compliance: "BNBC, BACnet, Modbus, IEC 61131",
      },
    ],
  },
  {
    id: "plumbing",
    code: "P",
    title: "Plumbing Services",
    subtitle: "Water Distribution, Treatment & Harvesting",
    icon: <FaWater />,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    badgeBg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400",
    badgeText: "P",
    accentBorder: "border-cyan-500/30",
    subCategories: [
      {
        code: "WSDS",
        title: "Water Supply & Drainage Systems",
        slug: "wsds",
        subtitle: "VFD Booster Pumps, PPR Risers & Stormwater Harvesting",
        icon: <FaShower className="text-cyan-400" />,
        compliance: "BNBC, IPC, WASA Standards",
      },
      {
        code: "WTS",
        title: "Water Treatment Systems",
        slug: "wts",
        subtitle: "Effluent ETP, Sewage STP, ZLD, IRP & Reverse Osmosis",
        icon: <FaWater className="text-blue-400" />,
        compliance: "DoE, WHO Drinking Standards, BDS",
      },
      {
        code: "RHS",
        title: "Renewable & Solar Solutions",
        slug: "rhs",
        subtitle: "Rooftop Solar PV Plants, Net Metering & Hybrid Storage",
        icon: <FaSun className="text-orange-400" />,
        compliance: "SREDA, IEC 61215, BREB",
      },
    ],
  },
];

function SubServiceCardMedia({
  srv,
  subCatCode,
}: {
  srv: ServiceItem;
  subCatCode: string;
}) {
  const images =
    Array.isArray(srv.sliderImages) && srv.sliderImages.length > 0
      ? srv.sliderImages
      : srv.bannerImage
      ? [srv.bannerImage]
      : [];

  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="lg:col-span-5 relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
      {images.length > 0 ? (
        <>
          {images.map((img, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === currentIdx ? "opacity-100 z-0" : "opacity-0 pointer-events-none"
              }`}
            >
              <Image
                src={img}
                alt={`${srv.title} slide ${i + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
              />
            </div>
          ))}

          {/* Slider Controls (if multiple images) */}
          {images.length > 1 && (
            <>
              {/* Prev / Next Buttons */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
                }}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-700 shadow-md"
                title="Previous image"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx((prev) => (prev + 1) % images.length);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm border border-slate-700 shadow-md"
                title="Next image"
              >
                <FaChevronRight className="text-[10px]" />
              </button>

              {/* Slide Indicator Dots */}
              <div className="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 bg-slate-950/70 px-2 py-1 rounded-full border border-slate-800 backdrop-blur-sm">
                {images.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentIdx(dotIdx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      dotIdx === currentIdx ? "w-4 bg-amber-400" : "w-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-600 text-xs font-semibold">
          No Image Available
        </div>
      )}

      {/* Bottom Gradient Overlay & Badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-4 left-4 z-10">
        <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/90 text-amber-400 font-mono font-bold text-xs border border-slate-800 shadow-xl backdrop-blur-md">
          {subCatCode} / {srv.title}
        </span>
      </div>
    </div>
  );
}

function ManageServicesContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category"); // mechanical, electrical, plumbing

  const [openSubCats, setOpenSubCats] = useState<Record<string, boolean>>({});
  const [dbServices, setDbServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalCategory, setModalCategory] = useState<"mechanical" | "electrical" | "plumbing" | null>(null);
  const [modalDiscipline, setModalDiscipline] = useState<string | undefined>(undefined);
  const [selectedDisciplineByPillar, setSelectedDisciplineByPillar] = useState<Record<string, string>>({
    mechanical: "HVAC",
    electrical: "PDCP",
    plumbing: "WSDS",
  });

  const toggleSubCat = (slug: string) => {
    setOpenSubCats((prev) => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setDbServices(data.services || []);
      }
    } catch (err) {
      console.error("Failed to fetch services", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const getServicesForSubCategory = (subCatCode: string, subCatSlug: string): ServiceItem[] => {
    const codeClean = subCatCode.toUpperCase();
    const slugClean = subCatSlug.toLowerCase();

    // 1. Find dedicated Service records created in DB for this discipline
    // Exclude the flagship root record itself (e.g. s.slug === 'hvac' or code === 'HVAC')
    const standaloneServices = dbServices
      .filter((s) => {
        const sCode = (s.code || "").toUpperCase();
        const sSlug = (s.slug || "").toLowerCase();

        // Check if this is the root flagship itself
        const isRootFlagship = sSlug === slugClean && sCode === codeClean;
        if (isRootFlagship) return false;

        // Match if code contains discipline code (e.g. ESL-MEP-HVAC-...)
        // or slug starts with subCatSlug- or matches subCatCode
        const isMatch =
          sCode.includes(codeClean) ||
          sSlug.startsWith(`${slugClean}-`) ||
          sSlug.startsWith(`${codeClean.toLowerCase()}-`);

        return isMatch;
      })
      .map((s) => {
        let sliderImages: string[] = [];
        if (Array.isArray(s.subServices) && s.subServices.length > 0) {
          const first = s.subServices[0];
          if (Array.isArray(first?.sliderImages) && first.sliderImages.length > 0) {
            sliderImages = first.sliderImages;
          }
        }
        if (sliderImages.length === 0 && s.bannerImage) {
          sliderImages = [s.bannerImage];
        }

        return {
          ...s,
          sliderImages,
          isEmbeddedSubService: false,
        };
      });

    // 2. Also check if the root flagship service has embedded `subServices` items in JSON
    const rootFlagship = dbServices.find(
      (s) => (s.slug || "").toLowerCase() === slugClean || (s.code || "").toUpperCase() === codeClean
    );

    const embeddedServices: ServiceItem[] = [];
    if (rootFlagship && Array.isArray(rootFlagship.subServices)) {
      rootFlagship.subServices.forEach((sub: any, idx: number) => {
        // Only include if not already added as a standalone service with the same slug
        const existsInStandalone = standaloneServices.some(
          (sa) => sa.slug.toLowerCase() === (sub.slug || "").toLowerCase()
        );
        if (!existsInStandalone) {
          const sliderImages = Array.isArray(sub.sliderImages) && sub.sliderImages.length > 0
            ? sub.sliderImages
            : sub.image
            ? [sub.image]
            : [];

          embeddedServices.push({
            id: sub.id || `${subCatCode.toLowerCase()}-sub-${idx}`,
            slug: sub.slug || `${subCatSlug}-${idx}`,
            code: `${subCatCode}-${(sub.slug || `0${idx + 1}`).toUpperCase()}`,
            category: rootFlagship.category,
            title: sub.title || sub.name || "Untitled Service",
            subtitle: sub.shortDesc || sub.subtitle || "",
            shortDescription: sub.shortDesc || sub.fullDesc || "",
            features: Array.isArray(sub.features) ? sub.features : [],
            bannerImage: sub.image || "",
            sliderImages,
            isEmbeddedSubService: true,
            parentFlagshipSlug: subCatSlug,
          });
        }
      });
    }

    const allMatches = [...standaloneServices, ...embeddedServices];

    if (!searchQuery.trim()) return allMatches;
    const q = searchQuery.toLowerCase();
    return allMatches.filter(
      (s) =>
        s.title?.toLowerCase().includes(q) ||
        s.code?.toLowerCase().includes(q) ||
        s.slug?.toLowerCase().includes(q) ||
        s.shortDescription?.toLowerCase().includes(q)
    );
  };

  // If URL has ?category=mechanical, only show that category. Otherwise, show all.
  const visiblePillars = categoryParam && ["mechanical", "electrical", "plumbing"].includes(categoryParam.toLowerCase())
    ? SERVICE_PILLARS.filter((p) => p.id === categoryParam.toLowerCase())
    : SERVICE_PILLARS;

  return (
    <div className="space-y-6 w-full pb-16 font-sans">
      {/* Create Service Modal */}
      {modalCategory && (
        <CreateServiceModal
          initialCategory={modalCategory}
          initialDiscipline={modalDiscipline}
          onClose={() => {
            setModalCategory(null);
            setModalDiscipline(undefined);
          }}
          onSuccess={() => {
            fetchServices();
            setModalCategory(null);
            setModalDiscipline(undefined);
          }}
        />
      )}

      {/* Pillars View */}
      <div className="space-y-6">
        {visiblePillars.map((pillar) => (
          <div
            key={pillar.id}
            className={`bg-slate-900/90 border rounded-2xl overflow-hidden shadow-lg ${pillar.accentBorder}`}
          >
            {/* Category Header */}
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-12 h-12 rounded-2xl ${pillar.iconBg} ${pillar.iconColor} border border-white/5 flex items-center justify-center shrink-0 text-xl shadow-sm`}
                >
                  {pillar.icon}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight truncate">
                    {pillar.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 truncate">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Side: 3 Sub-Discipline Selector Buttons + Pillar Letter Badge */}
              <div className="flex flex-wrap items-center gap-2 shrink-0 self-end sm:self-center">
                <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-xl border border-slate-800">
                  {pillar.subCategories.map((sub) => {
                    const activeDiscipline = selectedDisciplineByPillar[pillar.id] || pillar.subCategories[0].code;
                    const isSelected = activeDiscipline === sub.code;

                    return (
                      <button
                        key={sub.code}
                        type="button"
                        onClick={() =>
                          setSelectedDisciplineByPillar((prev) => ({
                            ...prev,
                            [pillar.id]: sub.code,
                          }))
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-500"
                            : "bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-800"
                        }`}
                        title={`Show ${sub.title} services`}
                      >
                        <span>{sub.code}</span>
                      </button>
                    );
                  })}
                </div>

                <span
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-black text-xs uppercase border ${pillar.badgeBg}`}
                >
                  {pillar.badgeText}
                </span>
              </div>
            </div>

            {/* Sub-Categories inside (Only show the selected discipline) */}
            <div className="p-4 sm:p-6 bg-slate-950/60 space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {pillar.subCategories
                  .filter((subCat) => {
                    const activeCode = selectedDisciplineByPillar[pillar.id] || pillar.subCategories[0].code;
                    return subCat.code === activeCode;
                  })
                  .map((subCat) => {
                  const isSubOpen = openSubCats[subCat.slug] ?? true;
                  const matchedServices = getServicesForSubCategory(subCat.code, subCat.slug);

                  return (
                    <div
                      key={subCat.slug}
                      className="bg-slate-900/60 rounded-2xl overflow-hidden shadow-sm transition-all"
                    >
                      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-center shrink-0 text-lg shadow-inner">
                            {subCat.icon}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                                {subCat.title}
                              </h3>
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {subCat.code}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 truncate mt-0.5">
                              {subCat.subtitle}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => {
                              setModalDiscipline(subCat.code);
                              setModalCategory(pillar.id);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 hover:text-blue-300 text-xs font-semibold border border-blue-500/20 transition-colors"
                            title={`Create Sub-Service under ${subCat.code}`}
                          >
                            <FaPlus className="text-[9px]" />
                            <span>Add Sub Service</span>
                          </button>
                        </div>
                      </div>

                      {isSubOpen && (
                        <div className="p-4 sm:p-5 pt-0">
                          {loading ? (
                            <p className="text-xs text-slate-500 py-3 text-center">
                              Loading services...
                            </p>
                          ) : matchedServices.length === 0 ? (
                            <div className="p-6 rounded-xl bg-slate-900/50 border border-dashed border-slate-800 text-center flex flex-col items-center justify-center gap-2">
                              <p className="text-xs text-slate-400">
                                No individual services created under {subCat.title} ({subCat.code}) yet.
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setModalDiscipline(subCat.code);
                                  setModalCategory(pillar.id);
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all shadow-sm"
                              >
                                <FaPlus className="text-[9px]" />
                                <span>Create First {subCat.code} Service</span>
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-6">
                              {matchedServices.map((srv, idx) => {
                                const featuresList =
                                  Array.isArray(srv.features) && srv.features.length > 0
                                    ? srv.features
                                    : Array.isArray(srv.scopeOfWork) && srv.scopeOfWork.length > 0
                                    ? srv.scopeOfWork
                                    : [];

                                const targetUrl = srv.isEmbeddedSubService
                                  ? `/services/${srv.parentFlagshipSlug}`
                                  : `/services/${srv.slug}`;

                                return (
                                  <div
                                    key={srv.id}
                                    className="relative bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-9 shadow-xl hover:border-slate-700/80 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-slate-200 group/card"
                                  >
                                    {/* Top-Right Action Buttons: Edit & Delete */}
                                    <div className="absolute top-5 right-5 z-20 flex items-center gap-2">
                                      <Link
                                        href={`/admin/manage-services/edit?id=${srv.id}&parent=${subCat.slug}`}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-blue-600 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 shadow-md transition-all active:scale-95"
                                        title="Edit this Sub-Service"
                                      >
                                        <FaEdit className="text-[11px]" />
                                        <span>Edit</span>
                                      </Link>
                                      <button
                                        type="button"
                                        onClick={async () => {
                                          if (confirm(`Are you sure you want to delete "${srv.title}"?`)) {
                                            try {
                                              const res = await fetch(`/api/admin/services/${srv.id}`, {
                                                method: "DELETE",
                                              });
                                              if (res.ok) {
                                                fetchServices();
                                              } else {
                                                const d = await res.json();
                                                alert(d.error || "Failed to delete sub-service");
                                              }
                                            } catch (err) {
                                              console.error("Delete error:", err);
                                              alert("Error deleting sub-service");
                                            }
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-rose-600 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 shadow-md transition-all active:scale-95"
                                        title="Delete this Sub-Service"
                                      >
                                        <FaTrashAlt className="text-[11px]" />
                                        <span>Delete</span>
                                      </button>
                                    </div>

                                    {/* Left Column: Details & Technical Capabilities */}
                                    <div className="lg:col-span-7 flex flex-col gap-4">
                                      <div className="flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-xl bg-blue-600/20 text-blue-400 font-mono font-black text-xs flex items-center justify-center shrink-0 border border-blue-500/30">
                                          0{idx + 1}
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 bg-slate-950/80 px-3 py-1 rounded-lg border border-slate-800">
                                          SOLUTION #{idx + 1}
                                        </span>
                                      </div>

                                      {/* Title */}
                                      <Link href={targetUrl} target="_blank">
                                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white hover:text-blue-400 transition-colors tracking-tight leading-snug">
                                          {srv.title}
                                        </h3>
                                      </Link>

                                      {/* Subtitle / Description */}
                                      {(srv.shortDescription || srv.subtitle) && (
                                        <p className="text-slate-400 text-sm leading-relaxed font-normal">
                                          {srv.shortDescription || srv.subtitle}
                                        </p>
                                      )}

                                      {/* Solutions we cover */}
                                      {featuresList.length > 0 && (
                                        <div className="pt-2 flex flex-col gap-2.5">
                                          <h4 className="text-xs font-extrabold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-400" />
                                            <span>Solutions we cover:</span>
                                          </h4>
                                          <div className="flex flex-col gap-2">
                                            {featuresList.map((feat, fIdx) => (
                                              <div
                                                key={fIdx}
                                                className="flex items-center gap-2.5 bg-slate-950/90 text-slate-200 px-4 py-2.5 rounded-xl border border-slate-800/90 shadow-inner hover:border-amber-400/40 transition-colors"
                                              >
                                                <span className="text-amber-400 text-xs font-bold">›</span>
                                                <span className="text-xs font-bold tracking-wide">{feat}</span>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    {/* Right Column: Dynamic Slider Media */}
                                    <SubServiceCardMedia srv={srv} subCatCode={subCat.code} />
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ManageServicesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Loading Manage Services...</div>}>
      <ManageServicesContent />
    </Suspense>
  );
}

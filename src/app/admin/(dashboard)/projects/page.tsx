"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaProjectDiagram,
  FaMapMarkerAlt,
  FaBuilding,
  FaCalendarAlt,
  FaStar,
  FaRegStar,
  FaArrowLeft,
  FaSave,
  FaUpload,
  FaImage,
  FaImages,
  FaCheckCircle,
  FaClipboardList,
  FaExternalLinkAlt,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { MEP_SUB_CATEGORIES } from "@/lib/flagshipDomains";

export interface ProjectGalleryItem {
  title?: string;
  image: string;
  category?: string;
}

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  subCategory?: string | null;
  client: string;
  location: string;
  completionDate: string;
  description: string;
  image: string;
  gallery?: ProjectGalleryItem[];
  scope?: string[];
  isFeatured?: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // View state: 'list' | 'create' | 'edit'
  const [viewMode, setViewMode] = useState<"list" | "create" | "edit">("list");
  const [activeTab, setActiveTab] = useState<"general" | "media" | "scope">("general");
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Image upload helpers
  const [manualImageUrl, setManualImageUrl] = useState("");
  const [manualImageTitle, setManualImageTitle] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category: string;
    subCategory: string;
    client: string;
    location: string;
    completionDate: string;
    description: string;
    image: string;
    gallery: ProjectGalleryItem[];
    scopeText: string;
    isFeatured: boolean;
  }>({
    title: "",
    slug: "",
    category: "mechanical",
    subCategory: "HVAC",
    client: "",
    location: "Dhaka, Bangladesh",
    completionDate: "2024 - 2025",
    description: "",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop",
    gallery: [
      {
        title: "Main Site View",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop",
      },
    ],
    scopeText: "Turnkey MEP Design & Engineering\nInstallation of Automated Systems\nTesting & Commissioning",
    isFeatured: false,
  });

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const url = new URL("/api/admin/projects", window.location.origin);
      if (search) url.searchParams.set("search", search);
      if (categoryFilter !== "all") url.searchParams.set("category", categoryFilter);
      if (subCategoryFilter !== "all") url.searchParams.set("subCategory", subCategoryFilter);

      const res = await fetch(url.toString(), { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error("Failed to fetch projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search, categoryFilter, subCategoryFilter]);

  // Open Create Screen (Dedicated Page, No Pop-up Modal)
  const handleOpenCreate = () => {
    setEditingProject(null);
    setManualImageUrl("");
    setManualImageTitle("");
    const defaultCover = "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop";
    setFormData({
      title: "",
      slug: "",
      category: "mechanical",
      subCategory: "HVAC",
      client: "",
      location: "Dhaka, Bangladesh",
      completionDate: "2024 - 2025",
      description: "",
      image: defaultCover,
      gallery: [
        {
          title: "Primary Installation Overview",
          image: defaultCover,
        },
      ],
      scopeText: "Turnkey MEP Design & Engineering\nInstallation of Automated Systems\nTesting & Commissioning",
      isFeatured: false,
    });
    setActiveTab("general");
    setViewMode("create");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/admin/projects?action=create");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open Edit Screen (Dedicated Page, No Pop-up Modal)
  const handleOpenEdit = (p: Project) => {
    setEditingProject(p);
    setManualImageUrl("");
    setManualImageTitle("");
    const cat = (p.category || "mechanical").toLowerCase();
    const subs = MEP_SUB_CATEGORIES[cat] || [];
    const matchedSub = subs.find((s) => s.code === p.subCategory);

    // Normalize gallery items
    let initialGallery: ProjectGalleryItem[] = [];
    if (Array.isArray(p.gallery) && p.gallery.length > 0) {
      initialGallery = p.gallery.map((item: any) =>
        typeof item === "string" ? { image: item, title: "Site Photo" } : item
      );
    } else if (p.image) {
      initialGallery = [{ image: p.image, title: "Main Site View" }];
    }

    setFormData({
      title: p.title || "",
      slug: p.slug || "",
      category: cat,
      subCategory: p.subCategory || (matchedSub ? matchedSub.code : subs[0]?.code || "HVAC"),
      client: p.client || "",
      location: p.location || "Dhaka, Bangladesh",
      completionDate: p.completionDate || "2024 - 2025",
      description: p.description || "",
      image: p.image || initialGallery[0]?.image || "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop",
      gallery: initialGallery,
      scopeText: Array.isArray(p.scope) ? p.scope.join("\n") : "",
      isFeatured: Boolean(p.isFeatured),
    });
    setActiveTab("general");
    setViewMode("edit");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `/admin/projects?action=edit&id=${p.id}`);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Back to Project List Screen
  const handleBackToList = () => {
    setViewMode("list");
    setEditingProject(null);
    setManualImageUrl("");
    setManualImageTitle("");
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", "/admin/projects");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Multiple Image Upload from Computer
  const handleMultipleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedItems: ProjectGalleryItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const bodyData = new FormData();
        bodyData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: bodyData,
        });

        const data = await res.json();
        if (res.ok && data.url) {
          const autoTitle = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/[-_]+/g, " ")
            .trim();
          uploadedItems.push({
            title: autoTitle || `Field Photo ${formData.gallery.length + uploadedItems.length + 1}`,
            image: data.url,
          });
        }
      }

      if (uploadedItems.length > 0) {
        setFormData((prev) => {
          const newGallery = [...prev.gallery, ...uploadedItems];
          return {
            ...prev,
            gallery: newGallery,
            image: prev.image || newGallery[0]?.image || "",
          };
        });
      }
    } catch (err: any) {
      console.error("Multi-image upload error:", err);
      alert(err.message || "Failed to upload one or more images.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add Manual Image URL + Caption
  const handleAddManualImage = () => {
    if (!manualImageUrl.trim()) return;
    const newItem: ProjectGalleryItem = {
      title: manualImageTitle.trim() || `Field Photo ${formData.gallery.length + 1}`,
      image: manualImageUrl.trim(),
    };
    setFormData((prev) => {
      const newGallery = [...prev.gallery, newItem];
      return {
        ...prev,
        gallery: newGallery,
        image: prev.image || newItem.image,
      };
    });
    setManualImageUrl("");
    setManualImageTitle("");
  };

  // Set as primary cover image
  const setAsCover = (imgUrl: string) => {
    setFormData((prev) => ({
      ...prev,
      image: imgUrl,
    }));
  };

  // Remove gallery item
  const removeGalleryItem = (index: number) => {
    setFormData((prev) => {
      const updated = prev.gallery.filter((_, i) => i !== index);
      const wasCover = prev.gallery[index]?.image === prev.image;
      return {
        ...prev,
        gallery: updated,
        image: wasCover ? (updated[0]?.image || "") : prev.image,
      };
    });
  };

  // Update caption of gallery item
  const updateGalleryItemTitle = (index: number, newTitle: string) => {
    setFormData((prev) => {
      const updated = [...prev.gallery];
      if (updated[index]) {
        updated[index] = { ...updated[index], title: newTitle };
      }
      return { ...prev, gallery: updated };
    });
  };

  // Toggle Featured Landmark
  const toggleFeatured = async (p: Project) => {
    const nextVal = !p.isFeatured;
    setTogglingId(p.id);

    // Optimistic UI update: if making featured, unset others
    setProjects((prev) =>
      prev.map((item) => {
        if (item.id === p.id) {
          return { ...item, isFeatured: nextVal };
        }
        return nextVal ? { ...item, isFeatured: false } : item;
      })
    );

    try {
      const res = await fetch(`/api/admin/projects/${p.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured: nextVal }),
      });
      if (!res.ok) {
        throw new Error("Failed to update highlight status");
      }
    } catch (err: any) {
      alert(err.message);
      fetchProjects(); // rollback on error
    } finally {
      setTogglingId(null);
    }
  };

  // Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const scope = formData.scopeText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const autoSlug = (formData.slug || formData.title)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const primaryCover = formData.image.trim() || formData.gallery[0]?.image || "";

      const payload = {
        title: formData.title.trim(),
        slug: autoSlug,
        category: formData.category.toLowerCase(),
        subCategory: formData.subCategory,
        client: formData.client.trim(),
        location: formData.location.trim(),
        completionDate: formData.completionDate.trim(),
        description: formData.description.trim(),
        image: primaryCover,
        gallery: formData.gallery,
        scope,
        isFeatured: Boolean(formData.isFeatured),
      };

      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to update project");
        }
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create project");
        }
      }

      handleBackToList();
      fetchProjects();
    } catch (err: any) {
      alert(err.message || "An error occurred while saving the project.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title?: string) => {
    if (!confirm(`Are you sure you want to permanently delete "${title || "this project"}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {viewMode === "list" ? (
        /* ============================================================== */
        /* VIEW 1: PROJECTS DIRECTORY & LANDMARK SHOWCASE LIST            */
        /* ============================================================== */
        <div className="space-y-6">
          {/* Header & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
                <FaProjectDiagram className="text-indigo-400" />
                Landmark Projects & Case Studies
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Showcase turnkey engineering implementations across Bangladesh industrial & commercial facilities.
              </p>
            </div>

            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
            >
              <FaPlus />
              <span>Add New Project</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
            <div className="relative w-full md:max-w-md">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search project title, client, or location..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Category & Sub-Category Filter Pills */}
            <div className="flex flex-col gap-2.5 w-full md:w-auto">
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
                <FaFilter className="text-slate-500 text-xs shrink-0" />
                {["all", "mechanical", "electrical", "plumbing"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat);
                      setSubCategoryFilter("all");
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
                      categoryFilter.toLowerCase() === cat.toLowerCase()
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-slate-950 text-slate-400 hover:text-white border border-slate-800"
                    }`}
                  >
                    {cat === "all" ? "All Disciplines" : cat}
                  </button>
                ))}
              </div>

              {/* Sub-Category Pills for Active Discipline */}
              {categoryFilter !== "all" && (MEP_SUB_CATEGORIES[categoryFilter.toLowerCase()] || []).length > 0 && (
                <div className="flex items-center gap-1.5 overflow-x-auto pl-5 pt-1.5 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0">Domain:</span>
                  <button
                    onClick={() => setSubCategoryFilter("all")}
                    className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                      subCategoryFilter === "all"
                        ? "bg-blue-600/30 text-blue-300 border border-blue-500/40"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    All {categoryFilter}
                  </button>
                  {(MEP_SUB_CATEGORIES[categoryFilter.toLowerCase()] || []).map((sub) => (
                    <button
                      key={sub.code}
                      onClick={() => setSubCategoryFilter(sub.code)}
                      className={`px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                        subCategoryFilter === sub.code
                          ? "bg-blue-600 text-white shadow-sm"
                          : "text-slate-400 hover:text-white bg-slate-950/60 border border-slate-800"
                      }`}
                    >
                      {sub.code}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Projects Cards Grid */}
          {loading ? (
            <div className="p-16 text-center bg-slate-900/90 rounded-2xl border border-slate-800">
              <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-xs text-slate-400">Loading projects repository...</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-16 text-center bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto text-xl">
                <FaProjectDiagram />
              </div>
              <p className="text-sm font-bold text-white">No projects found</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No case studies match your current search criteria. Click "Add New Project" to publish your first turnkey engineering showcase.
              </p>
              <button
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md hover:bg-indigo-500 transition-colors"
              >
                <FaPlus />
                <span>Create First Project</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all group"
                >
                  <div>
                    {/* Thumbnail Banner */}
                    <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
                      <Image
                        src={proj.image || "/images/company-info.png"}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5 flex-wrap justify-end max-w-[85%]">
                        {proj.isFeatured && (
                          <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1">
                            <FaStar className="text-[10px]" />
                            Featured
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-indigo-300 backdrop-blur-md border border-slate-700">
                          {proj.category}
                        </span>
                        {proj.subCategory && (
                          <span className="px-2 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-blue-600/90 text-white backdrop-blur-md border border-blue-500/40 shadow-sm">
                            {proj.subCategory}
                          </span>
                        )}
                      </div>

                      {/* Photo Gallery Count Pill */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950/80 text-slate-300 backdrop-blur-md border border-slate-700/80 flex items-center gap-1 shadow">
                          <FaImages className="text-indigo-400 text-[10px]" />
                          <span>
                            {proj.gallery && proj.gallery.length > 0
                              ? proj.gallery.length
                              : 1}{" "}
                            Photos
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 space-y-3">
                      <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-indigo-400 transition-colors">
                        {proj.title}
                      </h3>

                      <div className="space-y-1.5 text-xs text-slate-300">
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaBuilding className="text-indigo-400 flex-shrink-0" />
                          <span className="truncate font-semibold text-slate-200">{proj.client}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaMapMarkerAlt className="text-red-400 flex-shrink-0" />
                          <span className="truncate">{proj.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400">
                          <FaCalendarAlt className="text-amber-400 flex-shrink-0" />
                          <span>{proj.completionDate}</span>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs line-clamp-2 pt-2 border-t border-slate-800/80 leading-relaxed">
                        {proj.description || "No project description provided."}
                      </p>
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => toggleFeatured(proj)}
                      disabled={togglingId === proj.id}
                      title={
                        proj.isFeatured
                          ? "Currently Highlighted Showcase. Click to unfeature."
                          : "Click to highlight as Landmark Project on Public Page"
                      }
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        proj.isFeatured
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30"
                          : "bg-slate-800 text-slate-400 hover:text-amber-400 hover:bg-slate-700 border border-slate-700"
                      } ${togglingId === proj.id ? "opacity-50 cursor-wait" : ""}`}
                    >
                      {proj.isFeatured ? (
                        <>
                          <FaStar className="text-amber-400" />
                          <span>Highlighted</span>
                        </>
                      ) : (
                        <>
                          <FaRegStar className="text-slate-400" />
                          <span>Highlight</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <Link
                        href="/projects"
                        target="_blank"
                        title="View on Public Website"
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        title="Edit Project"
                        className="p-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(proj.id, proj.title)}
                        title="Delete Project"
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ============================================================== */
        /* VIEW 2: DEDICATED FULL SCREEN PROJECT STUDIO SCREEN            */
        /* ============================================================== */
        <div className="space-y-6">
          {/* Top Bar with Breadcrumbs, Back Button, and Primary Action Buttons */}
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
                    <span>Back to Projects</span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span>Admin</span>
                    <span>/</span>
                    <span>Projects</span>
                    <span>/</span>
                    <span className="text-indigo-400 font-semibold">
                      {viewMode === "edit" ? "Edit Project" : "Add Landmark Case Study"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-lg font-bold border border-indigo-500/30">
                    <FaProjectDiagram />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">
                      {viewMode === "edit"
                        ? `Edit Project: ${formData.title || editingProject?.title || "Untitled"}`
                        : "Add Landmark Engineering Project"}
                    </h1>
                    <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
                      {viewMode === "edit"
                        ? "Update project specifications, high-res site images, client credentials, and deliverables."
                        : "Publish a landmark engineering case study with technical execution deliverables."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 self-end md:self-center">
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
                    const form = document.getElementById("project-editor-form") as HTMLFormElement;
                    if (form) form.requestSubmit();
                  }}
                  disabled={submitting || uploading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 active:scale-95"
                >
                  <FaSave />
                  <span>
                    {submitting
                      ? "Saving Project..."
                      : viewMode === "edit"
                      ? "Update Project"
                      : "Publish Project"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Dedicated Studio Content Card */}
          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
            {/* Screen Tabs Bar */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 pt-3 gap-3 overflow-x-auto">
              {[
                { id: "general", label: "1. Project Overview & Client" },
                {
                  id: "media",
                  label: `2. Multi-Photo Gallery & Cover (${formData.gallery.length})`,
                },
                { id: "scope", label: "3. Scope of Work & Narrative" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3.5 px-4 text-xs font-bold border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-400 bg-indigo-500/5 rounded-t-lg"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Studio Form */}
            <form
              id="project-editor-form"
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 space-y-8"
            >
              {/* TAB 1: General Info */}
              {activeTab === "general" && (
                <div className="space-y-6">
                  {/* Title & Slug Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Project Title <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            title: e.target.value,
                            slug: editingProject
                              ? formData.slug
                              : e.target.value
                                  .toLowerCase()
                                  .trim()
                                  .replace(/[^a-z0-9]+/g, "-")
                                  .replace(/^-|-$/g, ""),
                          })
                        }
                        placeholder="e.g. Beximco Pharma 50,000 LPH RO Water Treatment Plant"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-300">
                          URL Slug (Auto-generated)
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          /projects/{formData.slug || "..."}
                        </span>
                      </div>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        placeholder="e.g. beximco-pharma-ro-plant"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono transition-colors"
                      />
                    </div>
                  </div>

                  {/* Client & Project Site Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Client / Enterprise Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.client}
                        onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                        placeholder="e.g. Square Pharmaceuticals Ltd. / Beximco"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5">
                        Project Site Location
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Kaliakoir, Gazipur / DEPZ Savar"
                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Category and Sub-Category (Dynamic MEP Flagship Hierarchy) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/80 p-5 rounded-2xl border border-indigo-500/20 shadow-inner">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px] font-bold">1</span>
                        Discipline / Main Category <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={formData.category.toLowerCase()}
                        onChange={(e) => {
                          const newCat = e.target.value.toLowerCase();
                          const subs = MEP_SUB_CATEGORIES[newCat] || [];
                          setFormData({
                            ...formData,
                            category: newCat,
                            subCategory: subs[0]?.code || "",
                          });
                        }}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-semibold capitalize"
                      >
                        <option value="mechanical">Mechanical Engineering</option>
                        <option value="electrical">Electrical Engineering</option>
                        <option value="plumbing">Plumbing Engineering</option>
                      </select>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Select the primary engineering sector for this project showcase.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-[10px] font-bold">2</span>
                        Flagship Sub-Category ({formData.category.toUpperCase()}) <span className="text-red-400">*</span>
                      </label>
                      <select
                        required
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors font-medium"
                      >
                        {(MEP_SUB_CATEGORIES[formData.category.toLowerCase()] || []).map((sub) => (
                          <option key={sub.code} value={sub.code}>
                            {sub.code} — {sub.title}
                          </option>
                        ))}
                      </select>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Connects directly to your MEP Services catalog flagship domains.
                      </p>
                    </div>
                  </div>

                  {/* Timeline / Year */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Completion Timeline / Year
                    </label>
                    <input
                      type="text"
                      value={formData.completionDate}
                      onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                      placeholder="e.g. December 2024 / Completed 2025"
                      className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  {/* Landmark Featured Highlight Banner */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center gap-4">
                    <input
                      type="checkbox"
                      id="studio-featured"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                      className="w-5 h-5 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
                    />
                    <label htmlFor="studio-featured" className="cursor-pointer select-none">
                      <span className="text-xs font-bold text-amber-400 block flex items-center gap-1.5">
                        <FaStar className="text-amber-400 text-xs" />
                        Highlight as Primary Landmark Case Study
                      </span>
                      <span className="text-[11px] text-slate-400">
                        When enabled, this project will be prominently featured at the top hero banner of the public Projects page.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2: Multi-Image Field Gallery & Primary Cover Selection */}
              {activeTab === "media" && (
                <div className="space-y-6">
                  {/* Upload Controls & Add Methods */}
                  <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
                    <div>
                      <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <FaImages className="text-indigo-400 text-sm" />
                        <span>Upload Project Photos & Field Gallery</span>
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Select multiple photos from your computer or enter image URLs. You can upload entire field photo sets at once.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      {/* Direct Computer Multi-Upload */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleMultipleImageUpload}
                          disabled={uploading}
                          className="hidden"
                          id="project-multi-upload"
                        />
                        <label
                          htmlFor="project-multi-upload"
                          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600/20 to-blue-600/20 hover:from-indigo-600/30 hover:to-blue-600/30 text-indigo-300 border border-indigo-500/30 hover:border-indigo-500/60 cursor-pointer font-bold text-xs transition-all text-center shadow-lg active:scale-[0.99]"
                        >
                          <FaUpload className={uploading ? "animate-bounce" : ""} />
                          <span>
                            {uploading
                              ? "Uploading Photos to Cloud..."
                              : "Upload Photos from Computer (Select Multiple)"}
                          </span>
                        </label>
                      </div>

                      {/* Manual URL + Caption Input */}
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        <div className="flex-1 w-full space-y-1">
                          <input
                            type="url"
                            value={manualImageUrl}
                            onChange={(e) => setManualImageUrl(e.target.value)}
                            placeholder="Paste direct photo URL (https://...)"
                            className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                          <input
                            type="text"
                            value={manualImageTitle}
                            onChange={(e) => setManualImageTitle(e.target.value)}
                            placeholder="Optional Caption (e.g. Chiller Plant Room)"
                            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={handleAddManualImage}
                          disabled={!manualImageUrl.trim()}
                          className="w-full sm:w-auto self-stretch px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          <FaPlus />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Photo Gallery Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                          <FaImages className="text-indigo-400" />
                          <span>Project Gallery Photos ({formData.gallery.length})</span>
                        </label>
                      </div>
                      <span className="text-[11px] text-slate-400">
                        ⭐ Click &quot;Set as Cover&quot; to pick the main thumbnail shown on the website
                      </span>
                    </div>

                    {formData.gallery.length === 0 ? (
                      <div className="p-10 text-center bg-slate-950 rounded-2xl border border-dashed border-slate-800 text-slate-500 text-xs space-y-2">
                        <FaImages className="text-3xl text-slate-600 mx-auto" />
                        <p className="font-semibold text-slate-300">No gallery photos added yet</p>
                        <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                          Upload multiple site installation photos from your computer above.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.gallery.map((item, idx) => {
                          const isCover = formData.image === item.image;
                          return (
                            <div
                              key={idx}
                              className={`rounded-2xl overflow-hidden border bg-slate-950 flex flex-col justify-between transition-all group ${
                                isCover
                                  ? "border-amber-500 ring-2 ring-amber-500/30 shadow-lg shadow-amber-500/10"
                                  : "border-slate-800 hover:border-slate-700"
                              }`}
                            >
                              {/* Photo Preview with Cover badge */}
                              <div className="relative h-36 w-full bg-slate-900 overflow-hidden">
                                <Image
                                  src={item.image}
                                  alt={item.title || `Gallery photo ${idx + 1}`}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                                {isCover && (
                                  <span className="absolute top-2 left-2 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 flex items-center gap-1 shadow-md">
                                    <FaStar className="text-[10px]" />
                                    Main Cover
                                  </span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => removeGalleryItem(idx)}
                                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-900/80 text-slate-400 hover:text-red-400 hover:bg-red-500/20 border border-slate-700 transition-colors"
                                  title="Delete photo from gallery"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>

                              {/* Editable Caption & Cover Switcher */}
                              <div className="p-3 bg-slate-950 space-y-2 border-t border-slate-800/80">
                                <div>
                                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Caption / Label:
                                  </label>
                                  <input
                                    type="text"
                                    value={item.title || ""}
                                    onChange={(e) => updateGalleryItemTitle(idx, e.target.value)}
                                    placeholder="e.g. Chiller Plant Room"
                                    className="w-full px-2.5 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                                  />
                                </div>

                                <div className="pt-1 flex items-center justify-between">
                                  {!isCover ? (
                                    <button
                                      type="button"
                                      onClick={() => setAsCover(item.image)}
                                      className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                                    >
                                      <FaStar className="text-[10px]" />
                                      <span>Set as Cover</span>
                                    </button>
                                  ) : (
                                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                                      <FaCheckCircle className="text-[11px]" />
                                      <span>Primary Cover</span>
                                    </span>
                                  )}
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    #{idx + 1}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Live Cover Banner & Field Site Photos Preview */}
                  <div className="space-y-3 pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300 block">
                        Live Landmark Showcase Preview (Cover + Sliding Thumbnails):
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Website visitors can browse all {formData.gallery.length} photos
                      </span>
                    </div>

                    <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-xl">
                      {formData.image ? (
                        <Image
                          src={formData.image}
                          alt="Cover Preview"
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 gap-2">
                          <FaImage className="text-3xl" />
                          <span className="text-xs">No cover image selected yet</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-indigo-600 text-[10px] font-bold uppercase tracking-wider text-white shadow">
                          {formData.category}
                        </span>
                        {formData.subCategory && (
                          <span className="px-2.5 py-1 rounded bg-blue-600 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
                            {formData.subCategory}
                          </span>
                        )}
                        {formData.isFeatured && (
                          <span className="px-2.5 py-1 rounded bg-amber-500 text-[10px] font-extrabold uppercase tracking-wider text-slate-950 shadow flex items-center gap-1">
                            <FaStar className="text-[9px]" />
                            Featured Landmark
                          </span>
                        )}
                      </div>

                      {/* Bottom Details & Mini Gallery Strip */}
                      <div className="absolute bottom-4 left-4 right-4 space-y-3 text-white">
                        <div>
                          <h4 className="text-base sm:text-lg font-bold drop-shadow-md">
                            {formData.title || "Project Title Preview"}
                          </h4>
                          <span className="text-xs text-slate-300 drop-shadow-sm font-medium">
                            {formData.client || "Client Name"} • {formData.location || "Location"}
                          </span>
                        </div>

                        {/* Miniature Thumbnails Strip */}
                        {formData.gallery.length > 0 && (
                          <div className="pt-2 border-t border-white/10 flex items-center gap-2 overflow-x-auto pb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 shrink-0">
                              Gallery ({formData.gallery.length}):
                            </span>
                            {formData.gallery.map((g, gIdx) => (
                              <button
                                key={gIdx}
                                type="button"
                                onClick={() => setAsCover(g.image)}
                                title={`Click to make cover: ${g.title || "Photo"}`}
                                className={`relative w-12 h-9 rounded-md overflow-hidden shrink-0 border-2 transition-all ${
                                  formData.image === g.image
                                    ? "border-amber-400 scale-105 shadow-md"
                                    : "border-white/30 opacity-70 hover:opacity-100 hover:border-white"
                                }`}
                              >
                                <Image
                                  src={g.image}
                                  alt={g.title || "Thumb"}
                                  fill
                                  className="object-cover"
                                />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: Scope of Work & Narrative */}
              {activeTab === "scope" && (
                <div className="space-y-6">
                  {/* Detailed Description */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1.5">
                      Comprehensive Project Narrative / Summary
                    </label>
                    <textarea
                      rows={5}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the plant capacity, technological challenges overcome, energy savings achieved, or regulatory approvals secured by Elite Standard Limited..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Scope of Work */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold text-slate-300">
                        Technical Scope of Work & Deliverables (1 per line)
                      </label>
                      <span className="text-[10px] text-slate-500">
                        {formData.scopeText.split("\n").filter(Boolean).length} Deliverable(s)
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      value={formData.scopeText}
                      onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                      placeholder="Turnkey MEP Engineering & Blueprint Design&#10;Supply & Installation of 1200 TR Chillers&#10;BMS Telemetry & SCADA Dashboard Integration&#10;Final BNBC & FSCD Certification Audits"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono transition-colors leading-relaxed"
                    />
                  </div>

                  {/* Scope Preview Pills */}
                  {formData.scopeText.split("\n").filter(Boolean).length > 0 && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                      <span className="text-[11px] font-bold text-slate-400 block flex items-center gap-1.5">
                        <FaClipboardList className="text-indigo-400" />
                        Preview of Deliverables Rendered on Website:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {formData.scopeText
                          .split("\n")
                          .filter(Boolean)
                          .map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-start gap-2 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800 text-xs text-slate-300"
                            >
                              <FaCheckCircle className="text-emerald-400 text-xs shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Screen Actions */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancel & Return
                </button>

                <div className="flex items-center gap-3">
                  {activeTab !== "general" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(activeTab === "scope" ? "media" : "general")
                      }
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                      Previous Step
                    </button>
                  )}

                  {activeTab !== "scope" ? (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(activeTab === "general" ? "media" : "scope")
                      }
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shadow-md shadow-indigo-500/20"
                    >
                      Next Step
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting || uploading}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/25 disabled:opacity-50 active:scale-95"
                    >
                      <FaSave />
                      <span>
                        {submitting
                          ? "Saving to Database..."
                          : viewMode === "edit"
                          ? "Update Project"
                          : "Publish Project"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

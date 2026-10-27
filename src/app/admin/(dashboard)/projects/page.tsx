"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
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
} from "react-icons/fa";

interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  location: string;
  completionDate: string;
  description: string;
  image: string;
  scope?: string[];
  isFeatured?: boolean;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Industrial Water Treatment",
    client: "",
    location: "Dhaka, Bangladesh",
    completionDate: "2024 - 2025",
    description: "",
    image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop",
    scopeText: "Turnkey MEP Design & Engineering\nInstallation of Automated Systems\nTesting & Commissioning",
    isFeatured: false,
  });

  const fetchProjects = async () => {
    try {
      const url = new URL("/api/admin/projects", window.location.origin);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [search]);

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

  const openAddModal = () => {
    setEditingProject(null);
    setFormData({
      title: "",
      category: "Industrial Water Treatment",
      client: "",
      location: "Dhaka, Bangladesh",
      completionDate: "2024 - 2025",
      description: "",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?q=80&w=800&auto=format&fit=crop",
      scopeText: "Turnkey MEP Design & Engineering\nInstallation of Automated Systems\nTesting & Commissioning",
      isFeatured: false,
    });
    setModalOpen(true);
  };

  const openEditModal = (p: Project) => {
    setEditingProject(p);
    setFormData({
      title: p.title,
      category: p.category,
      client: p.client,
      location: p.location,
      completionDate: p.completionDate,
      description: p.description,
      image: p.image,
      scopeText: Array.isArray(p.scope) ? p.scope.join("\n") : "",
      isFeatured: p.isFeatured || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const scope = formData.scopeText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        client: formData.client,
        location: formData.location,
        completionDate: formData.completionDate,
        description: formData.description,
        image: formData.image,
        scope,
        isFeatured: Boolean(formData.isFeatured),
      };

      if (editingProject) {
        const res = await fetch(`/api/admin/projects/${editingProject.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update project");
      } else {
        const res = await fetch("/api/admin/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create project");
      }
      setModalOpen(false);
      fetchProjects();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
      if (res.ok) fetchProjects();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FaProjectDiagram className="text-indigo-400" />
            Landmark Projects & Case Studies
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Showcase turnkey engineering implementations across Bangladesh industries.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-indigo-500/20"
        >
          <FaPlus />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search project title, client, or location..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Projects Grid */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900/90 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm bg-slate-900/90 rounded-2xl border border-slate-800">
          No projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="relative h-44 w-full bg-slate-800">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {proj.isFeatured && (
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-lg flex items-center gap-1">
                        <FaStar className="text-[10px]" />
                        Featured Landmark
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 text-white backdrop-blur-md border border-slate-700">
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-white text-base line-clamp-1 flex-1">
                      {proj.title}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2 text-slate-400">
                      <FaBuilding className="text-indigo-400 flex-shrink-0" />
                      <span className="truncate">{proj.client}</span>
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

                  <p className="text-slate-400 text-xs line-clamp-2 pt-1 border-t border-slate-800/80">
                    {proj.description}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => toggleFeatured(proj)}
                  disabled={togglingId === proj.id}
                  title={proj.isFeatured ? "Currently Highlighted Showcase. Click to unfeature." : "Click to highlight as Landmark Project on Public Page"}
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
                  <button
                    onClick={() => openEditModal(proj)}
                    title="Edit Project"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-400 transition-colors"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    title="Delete Project"
                    className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/30 text-slate-300 hover:text-red-400 transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <h2 className="text-lg font-bold text-white mb-4">
              {editingProject ? "Edit Project Details" : "Add Landmark Case Study"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Beximco Pharma 50,000 LPH RO Water Treatment Plant"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="Beximco Pharmaceuticals Ltd."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Industrial Water Treatment"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Tongir, Gazipur"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={formData.completionDate}
                    onChange={(e) => setFormData({ ...formData, completionDate: e.target.value })}
                    placeholder="November 2024"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive engineering summary..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                  Scope of Work (1 per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.scopeText}
                  onChange={(e) => setFormData({ ...formData, scopeText: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                />
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded border-slate-700 text-amber-500 focus:ring-amber-500 bg-slate-900 cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-medium text-slate-200 cursor-pointer flex-1">
                  <span className="font-bold text-amber-400 block">⭐ Highlight as Main Landmark Showcase</span>
                  Display this project as the top hero case study on the public Projects page.
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingProject ? "Save Changes" : "Create Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

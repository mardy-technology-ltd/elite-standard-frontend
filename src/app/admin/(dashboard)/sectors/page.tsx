"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaFlask,
  FaIndustry,
  FaHospital,
  FaServer,
  FaSun,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaImage,
  FaUpload,
  FaWarehouse,
  FaMicrochip,
  FaBolt,
  FaWater,
  FaShieldAlt,
} from "react-icons/fa";

const availableIcons: { [key: string]: any } = {
  FaBuilding,
  FaFlaskVial: FaFlask,
  FaFlask,
  FaIndustry,
  FaHospital,
  FaServer,
  FaSun,
  FaWarehouse,
  FaMicrochip,
  FaBolt,
  FaWater,
  FaShieldAlt,
};

interface IndustrySectorItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  href: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminSectorsPage() {
  const [items, setItems] = useState<IndustrySectorItem[]>([]);
  const [stats, setStats] = useState({ total: 0, active: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<IndustrySectorItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    icon: "FaBuilding",
    image: "",
    href: "/sectors",
    orderIndex: 0,
    isActive: true,
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/admin/sectors", window.location.origin);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load sectors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems();
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      description: "",
      icon: "FaBuilding",
      image: "",
      href: "/sectors",
      orderIndex: items.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: IndustrySectorItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || "FaBuilding",
      image: item.image,
      href: item.href || "/sectors",
      orderIndex: item.orderIndex,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          setFormData((prev) => ({ ...prev, image: json.url }));
        }
      } else {
        alert("Image upload failed. Please try again or use direct image URL.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please provide title, description, and sector image.");
      return;
    }

    try {
      setSubmitting(true);
      const method = editingItem ? "PUT" : "POST";
      const endpoint = editingItem
        ? `/api/admin/sectors/${editingItem.id}`
        : "/api/admin/sectors";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save sector.");
      }
    } catch (err) {
      console.error("Save error:", err);
      alert("Something went wrong while saving sector.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleActiveStatus = async (item: IndustrySectorItem) => {
    try {
      const res = await fetch(`/api/admin/sectors/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((s) => (s.id === item.id ? { ...s, isActive: !s.isActive } : s))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (item: IndustrySectorItem) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/sectors/${item.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchItems();
      } else {
        alert("Failed to delete sector.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting sector.");
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Key Sectors & Industries
            </h1>
          </div>
          <p className="text-slate-500 text-sm">
            Manage industry solutions displayed on the Home Page and Sectors overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchItems}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition"
          >
            <FaSync className={`text-xs ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-bold shadow-md shadow-amber-600/20 transition"
          >
            <FaPlus className="text-xs" />
            Add New Sector
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Sectors</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
            <FaIndustry />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live & Active</p>
            <p className="text-3xl font-black text-emerald-600 mt-1">{stats.active}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
            <FaCheckCircle />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by industry title or description..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
          />
        </form>
      </div>

      {/* Grid of Sector Cards */}
      {loading ? (
        <div className="py-20 text-center">
          <div className="w-10 h-10 border-4 border-amber-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Loading industry sectors...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200">
          <p className="text-slate-500 text-base mb-4">No industry sectors found.</p>
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-amber-600 text-white text-sm font-bold shadow-md"
          >
            Create First Sector
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const IconComponent = availableIcons[item.icon] || FaBuilding;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Top status & badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white border border-white/10">
                        Order #{item.orderIndex}
                      </span>
                      <button
                        onClick={() => toggleActiveStatus(item)}
                        className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md transition ${
                          item.isActive
                            ? "bg-emerald-500/90 text-white"
                            : "bg-rose-500/90 text-white"
                        }`}
                      >
                        {item.isActive ? <FaCheckCircle className="text-[10px]" /> : <FaTimesCircle className="text-[10px]" />}
                        <span>{item.isActive ? "Active" : "Hidden"}</span>
                      </button>
                    </div>

                    {/* Floating Icon */}
                    <div className="absolute bottom-3 left-4 w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-lg font-bold shadow-lg">
                      <IconComponent />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <h3 className="text-base font-extrabold text-slate-900 mb-2 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      Link: {item.href || "/sectors"}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    {item.icon}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 text-slate-600 hover:text-amber-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition text-xs font-bold"
                      title="Edit Sector"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 text-slate-600 hover:text-rose-600 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition text-xs font-bold"
                      title="Delete Sector"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="text-lg font-black text-slate-900">
                {editingItem ? "Edit Industry Sector" : "Add New Industry Sector"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-sm flex-1">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Sector Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Commercial & Corporate Towers"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of engineering solutions delivered for this sector..."
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Select Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  >
                    <option value="FaBuilding">🏢 Building / Towers (FaBuilding)</option>
                    <option value="FaFlaskVial">🧪 Cleanroom / Pharma (FaFlaskVial)</option>
                    <option value="FaIndustry">🏭 Industrial Plant (FaIndustry)</option>
                    <option value="FaHospital">🏥 Hospital / Healthcare (FaHospital)</option>
                    <option value="FaServer">🖥️ Data Center / Telecom (FaServer)</option>
                    <option value="FaSun">☀️ Solar / Renewable (FaSun)</option>
                    <option value="FaWarehouse">🏬 Warehouse / Depot (FaWarehouse)</option>
                    <option value="FaMicrochip">⚡ Automation / Electronics (FaMicrochip)</option>
                    <option value="FaWater">💧 Water / Utilities (FaWater)</option>
                    <option value="FaShieldAlt">🛡️ Fire Safety / Protection (FaShieldAlt)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Link / Target URL
                  </label>
                  <input
                    type="text"
                    value={formData.href}
                    onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                    placeholder="/sectors or /services/hvac"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Image Input & Upload */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                  Sector Background Image *
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://... or /images/..."
                    className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                  <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl cursor-pointer text-slate-700 font-semibold text-xs flex items-center gap-1.5 shrink-0 transition">
                    <FaUpload className="text-xs" />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {formData.image && (
                  <div className="mt-2 relative h-28 w-full rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                    <Image
                      src={formData.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
                    />
                    <span className="text-xs font-bold text-slate-700">Display Live on Website</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md shadow-amber-600/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingItem ? "Update Sector" : "Create Sector"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

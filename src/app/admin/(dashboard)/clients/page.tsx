"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaHandshake,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaBuilding,
  FaSync,
  FaCheckCircle,
  FaTimesCircle,
  FaImage,
  FaUpload,
  FaTags,
} from "react-icons/fa";

interface ClientItem {
  id: string;
  name: string;
  type: string;
  category: "client" | "partner";
  monogram?: string | null;
  logo?: string | null;
  bgColor?: string | null;
  orderIndex: number;
  isActive: boolean;
  createdAt: string;
}

export default function AdminClientsPage() {
  const [items, setItems] = useState<ClientItem[]>([]);
  const [stats, setStats] = useState({ total: 0, clients: 0, partners: 0 });
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClientItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    category: "client" as "client" | "partner",
    monogram: "",
    logo: "",
    bgColor: "bg-blue-50 text-blue-600 border-blue-100",
    orderIndex: 0,
    isActive: true,
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      const url = new URL("/api/admin/clients", window.location.origin);
      if (categoryFilter !== "ALL") url.searchParams.set("category", categoryFilter);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to load clients:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, [categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchItems();
  };

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      type: "",
      category: (categoryFilter === "partner" ? "partner" : "client"),
      monogram: "",
      logo: "",
      bgColor: "bg-blue-50 text-blue-600 border-blue-100",
      orderIndex: items.length + 1,
      isActive: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item: ClientItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      type: item.type,
      category: item.category,
      monogram: item.monogram || "",
      logo: item.logo || "",
      bgColor: item.bgColor || "bg-blue-50 text-blue-600 border-blue-100",
      orderIndex: item.orderIndex || 0,
      isActive: item.isActive,
    });
    setModalOpen(true);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.error || "File upload failed");
        return;
      }

      const data = await res.json();
      setFormData((prev) => ({ ...prev, logo: data.url }));
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type) {
      alert("Please provide both name and sector/type description.");
      return;
    }

    try {
      setSubmitting(true);
      const url = editingItem
        ? `/api/admin/clients/${editingItem.id}`
        : `/api/admin/clients`;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to save client reference.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admin/clients/${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems((prev) => prev.filter((i) => i.id !== id));
      } else {
        alert("Failed to delete client.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleActive = async (item: ClientItem) => {
    try {
      const res = await fetch(`/api/admin/clients/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !item.isActive }),
      });
      if (res.ok) {
        setItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, isActive: !item.isActive } : i))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Clients & Brand Partners</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live DB
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage corporate client logos shown on the Projects page and official OEM brand partners shown on the Home page.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchItems}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors border border-slate-700/80"
            title="Refresh"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-accent/20"
          >
            <FaPlus className="text-xs" />
            <span>Add Client / Partner</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total References</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
            <FaHandshake />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Corporate Clients</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.clients}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            <FaBuilding />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">OEM Brand Partners</p>
            <p className="text-2xl font-bold text-amber-400 mt-1">{stats.partners}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-xl">
            <FaTags />
          </div>
        </div>
      </div>

      {/* Search and Tabs Filter */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search by client or brand name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </form>

        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            onClick={() => setCategoryFilter("ALL")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              categoryFilter === "ALL" ? "bg-accent text-brand-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            All References ({stats.total})
          </button>
          <button
            onClick={() => setCategoryFilter("client")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              categoryFilter === "client" ? "bg-accent text-brand-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Clients ({stats.clients})
          </button>
          <button
            onClick={() => setCategoryFilter("partner")}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
              categoryFilter === "partner" ? "bg-accent text-brand-950 font-bold" : "text-slate-400 hover:text-white"
            }`}
          >
            Brand Partners ({stats.partners})
          </button>
        </div>
      </div>

      {/* Grid of Clients / Brand Cards */}
      {loading ? (
        <div className="p-16 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm">Loading corporate references...</p>
        </div>
      ) : items.length === 0 ? (
        <div className="p-16 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
          <FaHandshake className="text-4xl mx-auto mb-3 opacity-30" />
          <p className="text-sm font-semibold text-slate-300">No client or partner references found</p>
          <p className="text-xs text-slate-500 mt-1">Click the button above to add a new client or brand.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-slate-900 border ${
                item.isActive ? "border-slate-800" : "border-slate-800/40 opacity-60"
              } hover:border-slate-700 p-5 rounded-2xl flex flex-col justify-between transition-all group relative`}
            >
              {/* Category Badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    item.category === "partner"
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  }`}
                >
                  {item.category === "partner" ? "Brand Partner" : "Corporate Client"}
                </span>

                <button
                  onClick={() => handleToggleActive(item)}
                  title={item.isActive ? "Deactivate" : "Activate"}
                  className={`text-xs ${item.isActive ? "text-emerald-400" : "text-slate-500"}`}
                >
                  {item.isActive ? <FaCheckCircle /> : <FaTimesCircle />}
                </button>
              </div>

              {/* Logo / Monogram Box */}
              <div className="w-full h-24 bg-white rounded-xl p-3 flex items-center justify-center border border-slate-200/80 mb-3 overflow-hidden shadow-sm">
                {item.logo ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={item.logo}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-slate-100 rounded-lg">
                    <span className="font-heading font-black text-xl text-slate-800 tracking-wider">
                      {item.monogram || item.name.slice(0, 3).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              {/* Client Info */}
              <div className="space-y-1 mb-4">
                <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-accent transition-colors">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {item.type}
                </p>
                <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1 font-mono">
                  <span>Order: #{item.orderIndex}</span>
                  <span>{item.isActive ? "Visible" : "Hidden"}</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800/80">
                <button
                  onClick={() => openEditModal(item)}
                  className="flex-1 py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <FaEdit className="text-[11px]" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(item.id, item.name)}
                  className="p-2 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs rounded-lg transition-colors"
                  title="Delete"
                >
                  <FaTrash className="text-[11px]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Dialog */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl relative my-8">
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">
              {editingItem ? "Edit Client / Partner" : "Add New Client / Partner"}
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Fill in client or brand partner information to display on the public website.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Reference Type / Group <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    className={`border rounded-xl p-3 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                      formData.category === "client"
                        ? "bg-blue-500/15 border-blue-500 text-blue-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value="client"
                      checked={formData.category === "client"}
                      onChange={() => setFormData({ ...formData, category: "client" })}
                      className="sr-only"
                    />
                    <FaBuilding />
                    <span>Corporate Client</span>
                  </label>

                  <label
                    className={`border rounded-xl p-3 text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors ${
                      formData.category === "partner"
                        ? "bg-amber-500/15 border-amber-500 text-amber-300"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value="partner"
                      checked={formData.category === "partner"}
                      onChange={() => setFormData({ ...formData, category: "partner" })}
                      className="sr-only"
                    />
                    <FaTags />
                    <span>Brand / OEM Partner</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Client / Brand Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. IFIC Bank Limited or Daikin"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Sector / Equipment Category <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banking & Infrastructure or HVAC Chillers & VRF"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Monogram / Short Tag
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. BAL, DK"
                    value={formData.monogram}
                    onChange={(e) => setFormData({ ...formData, monogram: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={formData.orderIndex}
                    onChange={(e) => setFormData({ ...formData, orderIndex: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>

              {/* Logo Upload / URL */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Logo Image (URL or Upload)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="/images/clients/example.png or http://..."
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    className="flex-1 bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-accent"
                  />
                  <label className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2.5 rounded-xl cursor-pointer text-xs font-semibold flex items-center gap-1.5 border border-slate-700">
                    <FaUpload className={uploading ? "animate-bounce" : ""} />
                    <span>{uploading ? "Uploading..." : "Upload"}</span>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
                {formData.logo && (
                  <div className="mt-2 w-20 h-14 bg-white rounded-lg p-1.5 border border-slate-700 flex items-center justify-center relative overflow-hidden">
                    <Image
                      src={formData.logo}
                      alt="Preview"
                      width={60}
                      height={40}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Active Toggle */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-accent focus:ring-0 w-4 h-4"
                />
                <label htmlFor="isActive" className="text-xs text-slate-300 font-medium cursor-pointer">
                  Visible on public website
                </label>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 bg-accent hover:bg-amber-600 text-brand-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg hover:shadow-accent/20 disabled:opacity-50"
                >
                  {submitting ? "Saving..." : editingItem ? "Update Reference" : "Create Reference"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

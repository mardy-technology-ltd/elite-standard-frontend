"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaBoxes,
  FaUpload,
  FaImage,
  FaStar,
  FaListUl,
  FaInfoCircle,
  FaTag,
  FaShieldAlt,
  FaLink,
} from "react-icons/fa";

interface ProductSpec {
  label: string;
  value: string;
}

interface Product {
  id: string;
  slug: string;
  code: string;
  title: string;
  category: string;
  brand?: string;
  sector: string[];
  price: number;
  priceFormatted: string;
  regularPrice?: string;
  inStock: boolean;
  stockBadge?: string;
  warranty?: string;
  image: string;
  galleryImages?: string[];
  variantsText?: string;
  description?: string;
  specs?: ProductSpec[];
  fullSpecs?: { attribute: string; value: string }[];
  href?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [activeTab, setActiveTab] = useState<"general" | "media" | "specs">("general");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [manualImageUrl, setManualImageUrl] = useState("");

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    title: string;
    category: string;
    subCategory: string;
    brand: string;
    sector: string[];
    price: number;
    priceFormatted: string;
    regularPrice: string;
    inStock: boolean;
    stockBadge: string;
    warranty: string;
    image: string;
    galleryImages: string[];
    variantsText: string;
    description: string;
    specs: ProductSpec[];
  }>({
    code: "",
    title: "",
    category: "mechanical",
    subCategory: "HVAC & Climate Systems",
    brand: "",
    sector: ["Industrial", "Commercial"],
    price: 0,
    priceFormatted: "",
    regularPrice: "",
    inStock: true,
    stockBadge: "",
    warranty: "",
    image: "",
    galleryImages: [],
    variantsText: "",
    description: "",
    specs: [],
  });

  // 3-6-9 Framework: 3 Core Disciplines & 3 Flagship Sub-Categories per discipline
  const PRODUCT_CATEGORY_MAP: Record<string, string[]> = {
    "mechanical": [
      "HVAC & Climate Systems",
      "Fire Detection & Protection (FDPS)",
      "Gas & Utility Distribution (GUDS)",
    ],
    "electrical": [
      "Power Distribution & Panels (PDCP)",
      "Energy-Efficient Lighting (EELS)",
      "Intelligent Building Automation (IBA)",
    ],
    "plumbing": [
      "Water Supply & Drainage (WSDS)",
      "Water Treatment Solutions (WTS)",
      "Rainwater Harvesting Systems (RHS)",
    ],
  };

  const categories = [
    "all",
    "mechanical",
    "electrical",
    "plumbing",
  ];

  const fetchProducts = async () => {
    try {
      const url = new URL("/api/admin/products", window.location.origin);
      if (selectedCategory !== "all") url.searchParams.set("category", selectedCategory);
      if (search) url.searchParams.set("search", search);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, search]);

  const openAddModal = () => {
    setEditingProduct(null);
    setActiveTab("general");
    const defaultCategory = "mechanical";
    const defaultSub = PRODUCT_CATEGORY_MAP[defaultCategory]?.[0] || "";
    setFormData({
      code: "ESL-" + Math.floor(1000 + Math.random() * 9000),
      title: "",
      category: defaultCategory,
      subCategory: defaultSub,
      brand: "",
      sector: ["Industrial", "Commercial"],
      price: 0,
      priceFormatted: "",
      regularPrice: "",
      inStock: true,
      stockBadge: "",
      warranty: "",
      image: "",
      galleryImages: [],
      variantsText: "",
      description: "",
      specs: [],
    });
    setManualImageUrl("");
    setModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setActiveTab("general");
    const gallery =
      Array.isArray(p.galleryImages) && p.galleryImages.length > 0
        ? p.galleryImages
        : p.image
        ? [p.image]
        : [];

    // Find existing sub-category from specs or default from map
    const existingSubSpec = Array.isArray(p.specs)
      ? p.specs.find((s) => s.label === "Sub-Category" || s.label === "Sub Category" || s.label === "Equipment Type")
      : null;
    const currentSub = existingSubSpec ? existingSubSpec.value : (PRODUCT_CATEGORY_MAP[p.category]?.[0] || "");

    setFormData({
      code: p.code,
      title: p.title,
      category: p.category,
      subCategory: currentSub,
      brand: p.brand || "Elite Standard Limited",
      sector: p.sector || ["Industrial"],
      price: p.price,
      priceFormatted: p.priceFormatted,
      regularPrice: p.regularPrice || `Tk ${Math.round(p.price * 1.15).toLocaleString()}`,
      inStock: p.inStock,
      stockBadge: p.stockBadge || "In Stock",
      warranty: p.warranty || "2 Years OEM Service Warranty",
      image: p.image || gallery[0] || "",
      galleryImages: gallery,
      variantsText: p.variantsText || "",
      description: p.description || "",
      specs: Array.isArray(p.specs) && p.specs.length > 0
        ? p.specs
        : [
            { label: "Category", value: p.category },
            { label: "Sub-Category", value: currentSub },
            { label: "Model", value: p.code },
          ],
    });
    setManualImageUrl("");
    setModalOpen(true);
  };

  // Upload file from computer
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const body = new FormData();
        body.append("file", files[i]);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });

        const data = await res.json();
        if (data.url) {
          setFormData((prev) => {
            const updatedGallery = [...prev.galleryImages, data.url];
            return {
              ...prev,
              image: prev.image || data.url,
              galleryImages: updatedGallery,
            };
          });
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Add manual image URL
  const handleAddImageUrl = () => {
    if (!manualImageUrl.trim()) return;
    setFormData((prev) => {
      const updatedGallery = [...prev.galleryImages, manualImageUrl.trim()];
      return {
        ...prev,
        image: prev.image || manualImageUrl.trim(),
        galleryImages: updatedGallery,
      };
    });
    setManualImageUrl("");
  };

  // Set cover image
  const setAsCoverImage = (imgUrl: string) => {
    setFormData((prev) => ({ ...prev, image: imgUrl }));
  };

  // Remove image from gallery
  const removeGalleryImage = (idxToRemove: number) => {
    setFormData((prev) => {
      const updated = prev.galleryImages.filter((_, idx) => idx !== idxToRemove);
      return {
        ...prev,
        galleryImages: updated,
        image: prev.image === prev.galleryImages[idxToRemove] ? updated[0] || "" : prev.image,
      };
    });
  };

  // Spec row helpers
  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specs: [...prev.specs, { label: "", value: "" }],
    }));
  };

  const handleSpecChange = (index: number, field: "label" | "value", val: string) => {
    setFormData((prev) => {
      const updated = [...prev.specs];
      updated[index][field] = val;
      return { ...prev, specs: updated };
    });
  };

  const handleRemoveSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specs: prev.specs.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Ensure Sub-Category is represented in specs
      const cleanedSpecs = formData.specs.filter(
        (s) => s.label.trim() && s.value.trim() && s.label !== "Sub-Category"
      );
      if (formData.subCategory) {
        cleanedSpecs.unshift({ label: "Sub-Category", value: formData.subCategory });
      }

      const payload = {
        ...formData,
        image: formData.image || formData.galleryImages[0] || "",
        galleryImages: formData.galleryImages.length > 0 ? formData.galleryImages : (formData.image ? [formData.image] : []),
        specs: cleanedSpecs,
      };

      if (editingProduct) {
        const res = await fetch(`/api/admin/products/${editingProduct.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to update product");
        }
      } else {
        const res = await fetch("/api/admin/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create product");
        }
      }

      setModalOpen(false);
      fetchProducts();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
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
            <FaBoxes className="text-blue-500" />
            Engineering Products Catalog
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage commercial equipment, multi-image galleries, and technical specifications on Supabase PostgreSQL.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20"
        >
          <FaPlus />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {cat === "all" ? "All Equipment" : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search code or name..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-400">Loading catalog from database...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-sm">
            No products found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Product & Thumbnail</th>
                  <th className="px-5 py-3.5">Category & Brand</th>
                  <th className="px-5 py-3.5">Pricing</th>
                  <th className="px-5 py-3.5">Gallery Images</th>
                  <th className="px-5 py-3.5">Inventory</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {products.map((p) => {
                  const galleryCount =
                    Array.isArray(p.galleryImages) && p.galleryImages.length > 0
                      ? p.galleryImages.length
                      : p.image ? 1 : 0;

                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0 border border-slate-700 group">
                            {p.image ? (
                              <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-200"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-slate-500">
                                <FaImage />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white text-sm line-clamp-1">{p.title}</div>
                            <div className="text-blue-400 font-mono text-[11px] mt-0.5">{p.code}</div>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 w-fit capitalize">
                            <FaTag className="text-[9px] text-blue-400" />
                            {p.category === "mechanical"
                              ? "Mechanical"
                              : p.category === "electrical"
                              ? "Electrical"
                              : p.category === "plumbing"
                              ? "Plumbing"
                              : p.category}
                          </span>
                          {(() => {
                            const subSpec = Array.isArray(p.specs)
                              ? p.specs.find((s) => s.label === "Sub-Category" || s.label === "Sub Category" || s.label === "Equipment Type")
                              : null;
                            if (subSpec && subSpec.value) {
                              return (
                                <span className="text-[10px] text-blue-400 font-medium">
                                  ↳ {subSpec.value}
                                </span>
                              );
                            }
                            return null;
                          })()}
                          <div className="text-[11px] text-slate-400">{p.brand || "Elite Standard"}</div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <div className="font-bold text-emerald-400 text-sm">
                          {p.priceFormatted || `Tk ${p.price.toLocaleString()}`}
                        </div>
                        {p.regularPrice && (
                          <del className="text-[11px] text-slate-500 font-mono">{p.regularPrice}</del>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
                          <FaImage className="text-[10px]" />
                          <span>{galleryCount} Images</span>
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                            p.inStock
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                              : "bg-red-500/10 text-red-400 border-red-500/30"
                          }`}
                        >
                          {p.inStock ? <FaCheck className="text-[8px]" /> : <FaTimes className="text-[8px]" />}
                          {p.stockBadge || (p.inStock ? "In Stock" : "Out of Stock")}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-slate-300 hover:text-blue-400 transition-colors"
                            title="Edit Product & Gallery"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/30 text-slate-300 hover:text-red-400 transition-colors"
                            title="Delete Product"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Multi-Tab Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <div>
                <h2 className="text-xl font-bold text-white">
                  {editingProduct ? `Edit Equipment: ${editingProduct.title}` : "Add New Equipment Product"}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Configure pricing, multi-image gallery, and technical specifications.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
              <button
                type="button"
                onClick={() => setActiveTab("general")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "general"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <FaInfoCircle />
                <span>1. Basic Info & Pricing</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("media")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "media"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <FaImage />
                <span>2. Multi-Image Gallery ({formData.galleryImages.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("specs")}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === "specs"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                <FaListUl />
                <span>3. Specifications & Details</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* TAB 1: General & Pricing */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Product Code / Model ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="e.g. ESL-WTS-IRP-01"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono uppercase"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        1. Category Division <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => {
                          const newCat = e.target.value;
                          const newSubOptions = PRODUCT_CATEGORY_MAP[newCat] || [];
                          setFormData({
                            ...formData,
                            category: newCat,
                            subCategory: newSubOptions[0] || "",
                          });
                        }}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-medium"
                      >
                        <option value="mechanical">Mechanical Services</option>
                        <option value="electrical">Electrical Services</option>
                        <option value="plumbing">Plumbing Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        2. Sub-Category (Equipment Type) <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.subCategory}
                        onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-blue-500/60 rounded-lg text-white text-xs font-semibold focus:border-blue-400 focus:outline-none"
                      >
                        {(PRODUCT_CATEGORY_MAP[formData.category] || []).map((sub) => (
                          <option key={sub} value={sub}>
                            {sub}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Product Title
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Reverse Osmosis (RO) Commercial Purification Plant"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-semibold"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Brand / Manufacturer
                      </label>
                      <input
                        type="text"
                        value={formData.brand}
                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        placeholder="e.g. Elite Standard Limited / Grundfos"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Warranty Support
                      </label>
                      <input
                        type="text"
                        value={formData.warranty}
                        onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                        placeholder="e.g. 2 Years Full OEM Service Warranty"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Special Offer Price (Numeric BDT)
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.price === 0 ? "" : formData.price}
                        placeholder="e.g. 50000"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            price: e.target.value === "" ? 0 : Number(e.target.value),
                            priceFormatted: e.target.value === "" ? "" : `Tk ${Number(e.target.value).toLocaleString()}`,
                          })
                        }
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-bold text-emerald-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Regular Price (Market Reference)
                      </label>
                      <input
                        type="text"
                        value={formData.regularPrice}
                        onChange={(e) => setFormData({ ...formData, regularPrice: e.target.value })}
                        placeholder="e.g. Tk 60,000"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Stock Badge
                      </label>
                      <input
                        type="text"
                        value={formData.stockBadge}
                        onChange={(e) => setFormData({ ...formData, stockBadge: e.target.value })}
                        placeholder="In Stock / UL-FM Approved / Custom Built"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                        Inventory Availability
                      </label>
                      <select
                        value={formData.inStock ? "true" : "false"}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.value === "true" })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                      >
                        <option value="true">In Stock (Immediate Deployment)</option>
                        <option value="false">Out of Stock / Custom Made to Order</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Multi-Image Gallery with File Upload & Previews */}
              {activeTab === "media" && (
                <div className="space-y-5">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                    <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <FaUpload className="text-blue-400" />
                      Upload Images from Computer or Enter URL
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
                      {/* Direct Computer Upload */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="admin-file-upload"
                        />
                        <label
                          htmlFor="admin-file-upload"
                          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 hover:border-blue-500/50 cursor-pointer font-semibold text-xs transition-all text-center"
                        >
                          <FaUpload />
                          <span>{uploading ? "Uploading Image..." : "Upload from Computer (Multi)"}</span>
                        </label>
                      </div>

                      {/* Manual URL Input */}
                      <div className="flex items-center gap-2">
                        <input
                          type="url"
                          value={manualImageUrl}
                          onChange={(e) => setManualImageUrl(e.target.value)}
                          placeholder="Paste image URL here..."
                          className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddImageUrl}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shrink-0"
                        >
                          <FaPlus />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Visual Gallery Previews Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-300 uppercase">
                        Current Image Gallery ({formData.galleryImages.length})
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Click "Set as Cover" to choose the thumbnail shown on the website
                      </span>
                    </div>

                    {formData.galleryImages.length === 0 ? (
                      <div className="p-8 text-center bg-slate-950 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                        No images uploaded yet. Upload a photo or add an image URL above.
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto p-1">
                        {formData.galleryImages.map((imgUrl, idx) => {
                          const isCover = formData.image === imgUrl;
                          return (
                            <div
                              key={idx}
                              className={`relative rounded-xl overflow-hidden border bg-slate-950 flex flex-col justify-between group ${
                                isCover
                                  ? "border-emerald-500 ring-2 ring-emerald-500/30"
                                  : "border-slate-800 hover:border-slate-700"
                              }`}
                            >
                              <div className="relative h-28 w-full bg-slate-900">
                                <Image
                                  src={imgUrl}
                                  alt={`Product image ${idx + 1}`}
                                  fill
                                  className="object-cover"
                                />
                                {isCover && (
                                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-slate-950 flex items-center gap-1 shadow">
                                    <FaStar className="text-[9px]" />
                                    Cover
                                  </span>
                                )}
                              </div>

                              <div className="p-2 bg-slate-950/90 flex items-center justify-between gap-1 border-t border-slate-800">
                                {!isCover ? (
                                  <button
                                    type="button"
                                    onClick={() => setAsCoverImage(imgUrl)}
                                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300"
                                  >
                                    Set as Cover
                                  </button>
                                ) : (
                                  <span className="text-[10px] font-bold text-emerald-400">Main Cover</span>
                                )}

                                <button
                                  type="button"
                                  onClick={() => removeGalleryImage(idx)}
                                  className="text-slate-500 hover:text-red-400 p-1"
                                  title="Delete image"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: Specifications & Description */}
              {activeTab === "specs" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">
                      Product Description & Features
                    </label>
                    <textarea
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Comprehensive engineering description, benefits, and applications..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs leading-relaxed"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-xs font-bold text-slate-300 uppercase">
                        Technical Specifications (Key & Value Table)
                      </label>
                      <button
                        type="button"
                        onClick={handleAddSpecRow}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold transition-all"
                      >
                        <FaPlus className="text-[10px]" />
                        <span>Add Specification Row</span>
                      </button>
                    </div>

                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                      {formData.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={spec.label}
                            onChange={(e) => handleSpecChange(sIdx, "label", e.target.value)}
                            placeholder="Attribute (e.g. Flow Capacity)"
                            className="w-1/2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                          />
                          <input
                            type="text"
                            value={spec.value}
                            onChange={(e) => handleSpecChange(sIdx, "value", e.target.value)}
                            placeholder="Value (e.g. 5000 LPH)"
                            className="w-1/2 px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-semibold text-blue-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveSpecRow(sIdx)}
                            className="p-2 text-slate-500 hover:text-red-400"
                            title="Remove Row"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-800">
                <div className="flex items-center gap-2">
                  {activeTab !== "general" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(activeTab === "specs" ? "media" : "general")
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
                    >
                      ← Previous Tab
                    </button>
                  )}
                  {activeTab !== "specs" && (
                    <button
                      type="button"
                      onClick={() =>
                        setActiveTab(activeTab === "general" ? "media" : "specs")
                      }
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-semibold text-slate-300"
                    >
                      Next Tab →
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-3">
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
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-500/20 disabled:opacity-50"
                  >
                    {submitting
                      ? "Saving to Database..."
                      : editingProduct
                      ? "Save All Changes"
                      : "Create Product"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

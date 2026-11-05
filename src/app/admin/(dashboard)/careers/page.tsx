"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaTimes,
  FaBriefcase,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaUserTie,
  FaUsers,
  FaFileAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaCalendarAlt,
  FaFilter,
  FaImage,
  FaUpload,
  FaSpinner,
} from "react-icons/fa";

interface JobPosition {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  salaryBadge?: string;
  summary: string;
  qualifications: string[];
  responsibilities?: string[];
  isActive: boolean;
  deadline?: string;
  orderIndex: number;
  _count?: {
    applications: number;
  };
}

interface JobApplication {
  id: string;
  jobPositionId?: string;
  positionTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience?: string;
  resumeUrl?: string;
  coverNote?: string;
  status: "NEW" | "REVIEWED" | "SHORTLISTED" | "REJECTED";
  createdAt: string;
  jobPosition?: {
    id: string;
    title: string;
    department: string;
  };
}


export default function AdminCareersPage() {
  const [viewMode, setViewMode] = useState<"positions" | "applications">("positions");

  // Positions State
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loadingPositions, setLoadingPositions] = useState(true);
  const [search, setSearch] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");

  // Applications State
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loadingApplications, setLoadingApplications] = useState(true);
  const [appSearch, setAppSearch] = useState("");
  const [appStatusFilter, setAppStatusFilter] = useState("ALL");
  const [appJobFilter, setAppJobFilter] = useState("all");
  const [activeNote, setActiveNote] = useState<JobApplication | null>(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "overview" | "qualifications">("basic");
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null);


  // Career Circular Multiple Banners State
  const [careerBanners, setCareerBanners] = useState<string[]>([]);
  const [loadingBanner, setLoadingBanner] = useState(true);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [savingBanner, setSavingBanner] = useState(false);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [newBannerUrl, setNewBannerUrl] = useState<string>("");
  const [modalBanners, setModalBanners] = useState<string[]>([]);


  const fetchCareerBanners = async () => {
    setLoadingBanner(true);
    try {
      const res = await fetch("/api/admin/careers/banner");
      const data = await res.json();
      if (Array.isArray(data.banners)) {
        setCareerBanners(data.banners);
      } else if (data.banner) {
        setCareerBanners([data.banner]);
      } else {
        setCareerBanners([]);
      }
    } catch (err) {
      console.error("Failed to fetch career banners:", err);
    } finally {
      setLoadingBanner(false);
    }
  };

  useEffect(() => {
    fetchCareerBanners();
  }, []);

  const handleOpenBannerModal = () => {
    setModalBanners([...careerBanners]);
    setNewBannerUrl("");
    setBannerModalOpen(true);
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingBanner(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        const json = await res.json();
        if (json.url) {
          setModalBanners((prev) => [...prev, json.url]);
        }
      } else {
        alert("Banner image upload failed. Please try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload banner image.");
    } finally {
      setUploadingBanner(false);
      e.target.value = "";
    }
  };

  const handleAddUrlBanner = () => {
    const trimmed = newBannerUrl.trim();
    if (!trimmed) return;
    setModalBanners((prev) => [...prev, trimmed]);
    setNewBannerUrl("");
  };

  const handleRemoveModalBanner = (indexToRemove: number) => {
    setModalBanners((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleMoveBanner = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= modalBanners.length) return;
    const updated = [...modalBanners];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setModalBanners(updated);
  };

  const handleSaveAllBanners = async () => {
    try {
      setSavingBanner(true);
      const res = await fetch("/api/admin/careers/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners: modalBanners }),
      });

      if (res.ok) {
        const data = await res.json();
        setCareerBanners(data.banners || []);
        setBannerModalOpen(false);
      } else {
        alert("Failed to save banners.");
      }
    } catch (err) {
      console.error("Save banners error:", err);
      alert("Error saving banners.");
    } finally {
      setSavingBanner(false);
    }
  };

  const handleDirectDeleteSingleBanner = async (indexToRemove: number) => {
    if (!confirm("Are you sure you want to delete this circular banner?")) return;
    const remaining = careerBanners.filter((_, idx) => idx !== indexToRemove);

    try {
      setSavingBanner(true);
      const res = await fetch("/api/admin/careers/banner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banners: remaining }),
      });

      if (res.ok) {
        setCareerBanners(remaining);
      }
    } catch (err) {
      console.error("Delete banner error:", err);
    } finally {
      setSavingBanner(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    title: "",
        location: "",
    type: "Full Time",
    experience: "",
    salary: "",
    salaryBadge: "",
    summary: "",
    qualificationsText: "",
    responsibilitiesText: "",
    isActive: true,
    deadline: "",
    orderIndex: 0,
  });

  // Fetch Positions
  const fetchPositions = async () => {
    setLoadingPositions(true);
    try {
      let url = "/api/admin/careers";
      const params = new URLSearchParams();
            if (selectedStatus !== "all") params.append("status", selectedStatus);
      if (search) params.append("search", search);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.positions) {
        setPositions(data.positions);
      }
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    } finally {
      setLoadingPositions(false);
    }
  };

  // Fetch Applications
  const fetchApplications = async () => {
    setLoadingApplications(true);
    try {
      let url = "/api/admin/careers/applications";
      const params = new URLSearchParams();
      if (appJobFilter !== "all") params.append("jobPositionId", appJobFilter);
      if (appStatusFilter !== "ALL") params.append("status", appStatusFilter);
      if (appSearch) params.append("search", appSearch);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      const data = await res.json();
      if (data.applications) {
        setApplications(data.applications);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoadingApplications(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [selectedStatus, search]);

  useEffect(() => {
    fetchApplications();
  }, [appJobFilter, appStatusFilter, appSearch]);

  const handleOpenCreate = () => {
    setEditingPosition(null);
    setFormData({
      title: "",
            location: "",
      type: "Full Time",
      experience: "",
      salary: "",
      salaryBadge: "",
      summary: "",
      qualificationsText: "",
      responsibilitiesText: "",
      isActive: true,
      deadline: "",
      orderIndex: positions.length + 1,
    });
    setActiveTab("basic");
    setModalOpen(true);
  };

  const handleOpenEdit = (job: JobPosition) => {
    setEditingPosition(job);
    setFormData({
      title: job.title,
            location: job.location,
      type: job.type,
      experience: job.experience,
      salary: job.salary,
      salaryBadge: job.salaryBadge || job.salary,
      summary: job.summary || "",
      qualificationsText: Array.isArray(job.qualifications) ? job.qualifications.join("\n") : "",
      responsibilitiesText: Array.isArray(job.responsibilities) ? job.responsibilities.join("\n") : "",
      isActive: job.isActive,
      deadline: job.deadline || "",
      orderIndex: job.orderIndex,
    });
    setActiveTab("basic");
    setModalOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setPositions((prev) =>
          prev.map((p) => (p.id === id ? { ...p, isActive: !currentStatus } : p))
        );
      }
    } catch (err) {
      console.error("Toggle error:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete role: "${title}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/careers/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Failed to delete position");
      }
      fetchPositions();
    } catch (err: any) {
      alert(err.message || "Failed to delete position");
    }
  };

  const handleAppStatusChange = async (appId: string, newStatus: string) => {
    setUpdatingAppId(appId);
    try {
      const res = await fetch(`/api/admin/careers/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) => (a.id === appId ? { ...a, status: newStatus as any } : a))
        );
      }
    } catch (err) {
      console.error("Error updating application status:", err);
    } finally {
      setUpdatingAppId(null);
    }
  };

  const handleDeleteApplication = async (appId: string, name: string) => {
    if (!confirm(`Are you sure you want to delete application from "${name}"?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/careers/applications/${appId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setApplications((prev) => prev.filter((a) => a.id !== appId));
        fetchPositions(); // refresh counts
      }
    } catch (err) {
      console.error("Error deleting application:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const qualifications = formData.qualificationsText
        .split("\n")
        .map((q) => q.trim())
        .filter(Boolean);

      const responsibilities = formData.responsibilitiesText
        .split("\n")
        .map((r) => r.trim())
        .filter(Boolean);

      const payload = {
        title: formData.title,
        department: 'General',
        location: formData.location,
        type: formData.type,
        experience: formData.experience,
        salary: formData.salary,
        salaryBadge: formData.salaryBadge || formData.salary,
        summary: formData.summary,
        qualifications,
        responsibilities,
        isActive: formData.isActive,
        deadline: formData.deadline || null,
        orderIndex: Number(formData.orderIndex) || 0,
      };

      if (editingPosition) {
        const res = await fetch(`/api/admin/careers/${editingPosition.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to update position");
        }
      } else {
        const res = await fetch("/api/admin/careers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to create position");
        }
      }

      setModalOpen(false);
      fetchPositions();
    } catch (err: any) {
      alert(err.message || "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  const newAppsCount = applications.filter((a) => a.status === "NEW").length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-sans">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <FaBriefcase />
            Careers & Recruitment Management
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Engineering Recruitment & Candidate Applications
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage open engineering positions, review incoming candidate CVs, update application statuses, and publish vacancies.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              setBannerModalOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-all shadow-sm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <FaImage className="text-amber-400" />
            <span>{careerBanners.length > 0 ? `Manage Banners (${careerBanners.length})` : "Upload Banners"}</span>
            {careerBanners.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            )}
          </button>

          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <FaPlus />
            <span>Post New Position</span>
          </button>
        </div>
      </div>

      
      {/* Active Circular Banners Notification & Carousel Gallery */}
      {careerBanners.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h4 className="text-white text-sm font-bold">
                Active Live Circular Banners ({careerBanners.length})
              </h4>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold">
                Auto-slides on Live Career page
              </span>
            </div>

            <button
              onClick={handleOpenBannerModal}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <FaPlus className="text-[10px]" />
              <span>Add / Reorder Banners</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {careerBanners.map((imgUrl, idx) => (
              <div
                key={idx}
                className="group relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-md hover:border-amber-500/50 transition-all"
              >
                <div className="relative w-full h-36">
                  <Image
                    src={imgUrl}
                    alt={`Circular banner ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-white font-mono text-[10px] font-bold backdrop-blur-sm">
                    #{idx + 1}
                  </div>

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                    <a
                      href={imgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-white/20 hover:bg-white text-white hover:text-slate-950 transition-colors"
                      title="View full image"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleDirectDeleteSingleBanner(idx)}
                      className="p-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-colors"
                      title="Delete banner"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setViewMode("positions")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === "positions"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <FaBriefcase />
          <span>Open Positions ({positions.length})</span>
        </button>

        <button
          onClick={() => setViewMode("applications")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            viewMode === "applications"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
          }`}
        >
          <FaUsers />
          <span>Candidate Applications ({applications.length})</span>
          {newAppsCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold animate-pulse">
              {newAppsCount} NEW
            </span>
          )}
        </button>
      </div>

      {/* VIEW MODE 1: OPEN POSITIONS */}
      {viewMode === "positions" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="relative w-full lg:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search job title, skills, location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Status Filter */}
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active Only (Live)</option>
                <option value="inactive">Draft / Inactive</option>
              </select>

              
            </div>
          </div>

          {/* Positions Table */}
          {loadingPositions ? (
            <div className="flex items-center justify-center p-16">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : positions.length === 0 ? (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-12 text-center">
              <FaUserTie className="mx-auto text-4xl text-slate-600 mb-3" />
              <h3 className="text-base font-semibold text-white">No Positions Found</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                Try adjusting your search criteria or click &quot;Post New Position&quot; to publish a job.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Job Title & Overview</th>
                      <th className="px-4 py-3">Location & Type</th>
                      <th className="px-4 py-3">Salary & Exp</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Applications</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {positions.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex flex-col">
                            <span className="font-bold text-white text-sm">
                              {job.title}
                            </span>
                                                        <span className="text-slate-500 text-[10px] line-clamp-1 mt-0.5">
                              {job.summary}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <span className="flex items-center gap-1.5 text-slate-200">
                              <FaMapMarkerAlt className="text-amber-500 text-[10px]" />
                              <span>{job.location}</span>
                            </span>
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-semibold text-slate-300 self-start">
                              {job.type}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-col gap-1">
                            <span className="font-bold text-emerald-400 text-[11px] flex items-center gap-1">
                              <FaMoneyBillWave className="text-[10px]" />
                              <span>{job.salaryBadge || job.salary}</span>
                            </span>
                            <span className="text-slate-400 text-[10px]">
                              Exp: {job.experience}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleToggleActive(job.id, job.isActive)}
                            disabled={togglingId === job.id}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                              job.isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                            }`}
                          >
                            {job.isActive ? (
                              <>
                                <FaCheckCircle className="text-emerald-400" />
                                <span>Live on Site</span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-slate-500" />
                                <span>Inactive / Draft</span>
                              </>
                            )}
                          </button>
                        </td>

                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              setAppJobFilter(job.id);
                              setViewMode("applications");
                            }}
                            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                          >
                            <FaUsers className="text-amber-400 text-[10px]" />
                            <span>{job._count?.applications ?? 0} CVs</span>
                          </button>
                        </td>

                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href="/career"
                              target="_blank"
                              title="View on Careers Page"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                            </Link>
                            <button
                              onClick={() => handleOpenEdit(job)}
                              title="Edit Position"
                              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
                            >
                              <FaEdit className="text-xs" />
                            </button>
                            <button
                              onClick={() => handleDelete(job.id, job.title)}
                              title="Delete Position"
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 2: CANDIDATE APPLICATIONS */}
      {viewMode === "applications" && (
        <div className="space-y-6">
          {/* Applications Filter Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="relative w-full lg:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search candidate name, email, phone, position..."
                value={appSearch}
                onChange={(e) => setAppSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Job Filter */}
              <select
                value={appJobFilter}
                onChange={(e) => setAppJobFilter(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500 max-w-xs"
              >
                <option value="all">All Applied Positions</option>
                {positions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={appStatusFilter}
                onChange={(e) => setAppStatusFilter(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="ALL">All Application Statuses</option>
                <option value="NEW">NEW (Unreviewed)</option>
                <option value="REVIEWED">REVIEWED</option>
                <option value="SHORTLISTED">SHORTLISTED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          {loadingApplications ? (
            <div className="flex items-center justify-center p-16">
              <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : applications.length === 0 ? (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-12 text-center">
              <FaFileAlt className="mx-auto text-4xl text-slate-600 mb-3" />
              <h3 className="text-base font-semibold text-white">No Applications Found</h3>
              <p className="text-slate-400 text-xs mt-1 max-w-sm mx-auto">
                No candidate resumes have been submitted matching this filter.
              </p>
            </div>
          ) : (
            <div className="bg-slate-900/40 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    <tr>
                      <th className="px-4 py-3">Candidate Info</th>
                      <th className="px-4 py-3">Applied Position</th>
                      <th className="px-4 py-3">Experience</th>
                      <th className="px-4 py-3">Resume / CV</th>
                      <th className="px-4 py-3">Cover Note</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {applications.map((app) => {
                      const statusColor =
                        app.status === "NEW"
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : app.status === "SHORTLISTED"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                          : app.status === "REVIEWED"
                          ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30";

                      return (
                        <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-bold text-white text-sm">
                                {app.fullName}
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <a
                                  href={`tel:${app.phone}`}
                                  className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px] transition-colors"
                                >
                                  <FaPhoneAlt className="text-[10px]" />
                                  <span>{app.phone}</span>
                                </a>
                              </div>
                              <a
                                href={`mailto:${app.email}`}
                                className="text-slate-400 hover:text-amber-400 flex items-center gap-1 text-[11px] transition-colors mt-0.5"
                              >
                                <FaEnvelope className="text-[10px]" />
                                <span>{app.email}</span>
                              </a>
                            </div>
                          </td>

                          <td className="px-4 py-3">
                            <div className="flex flex-col">
                              <span className="font-semibold text-white text-xs">
                                {app.positionTitle}
                              </span>
                                                          </div>
                          </td>

                          <td className="px-4 py-3 text-slate-300">
                            {app.experience || "Not specified"}
                          </td>

                          <td className="px-4 py-3">
                            {app.resumeUrl ? (
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold transition-all"
                              >
                                <FaExternalLinkAlt className="text-[10px]" />
                                <span>Open CV / Link</span>
                              </a>
                            ) : (
                              <span className="text-slate-500 text-[11px]">No link provided</span>
                            )}
                          </td>

                          <td className="px-4 py-3">
                            {app.coverNote ? (
                              <button
                                onClick={() => setActiveNote(app)}
                                className="text-xs text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
                              >
                                View Note ({app.coverNote.length > 25 ? `${app.coverNote.slice(0, 25)}...` : app.coverNote})
                              </button>
                            ) : (
                              <span className="text-slate-500 text-[11px]">None</span>
                            )}
                          </td>

                          <td className="px-4 py-3">
                            <select
                              value={app.status}
                              disabled={updatingAppId === app.id}
                              onChange={(e) => handleAppStatusChange(app.id, e.target.value)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer transition-colors ${statusColor}`}
                            >
                              <option value="NEW" className="bg-slate-900 text-amber-400">NEW</option>
                              <option value="REVIEWED" className="bg-slate-900 text-blue-400">REVIEWED</option>
                              <option value="SHORTLISTED" className="bg-slate-900 text-emerald-400">SHORTLISTED</option>
                              <option value="REJECTED" className="bg-slate-900 text-red-400">REJECTED</option>
                            </select>
                          </td>

                          <td className="px-4 py-3 text-[11px] text-slate-400 whitespace-nowrap">
                            <span className="flex items-center gap-1">
                              <FaCalendarAlt className="text-[10px] text-slate-500" />
                              <span>{new Date(app.createdAt).toLocaleDateString()}</span>
                            </span>
                          </td>

                          <td className="px-4 py-3 text-right">
                            <button
                              onClick={() => handleDeleteApplication(app.id, app.fullName)}
                              title="Delete Application"
                              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                            >
                              <FaTrash className="text-xs" />
                            </button>
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
      )}

      {/* Cover Note Viewer Modal */}
      {activeNote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Cover Note: {activeNote.fullName}
                </h3>
                <span className="text-xs text-amber-400">
                  {activeNote.positionTitle}
                </span>
              </div>
              <button
                onClick={() => setActiveNote(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <FaTimes />
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-h-60 overflow-y-auto">
              <p className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                {activeNote.coverNote}
              </p>
            </div>

            {activeNote.resumeUrl && (
              <div className="pt-2">
                <a
                  href={activeNote.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline"
                >
                  <FaExternalLinkAlt className="text-[10px]" />
                  <span>Open Attached CV Link</span>
                </a>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveNote(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center text-sm font-bold">
                  <FaBriefcase />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    {editingPosition ? `Edit Role: ${editingPosition.title}` : "Post New Career Position"}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Configure position details, salary scale, and qualification requirements.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 pt-2 gap-2">
              {[
                { id: "basic", label: "1. Position & Compensation" },
                { id: "overview", label: "2. Role Overview & Responsibilities" },
                { id: "qualifications", label: "3. Qualifications & Requirements" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-amber-500 text-amber-400"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
              {/* TAB 1 */}
              {activeTab === "basic" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Job Position Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g. Senior Mechanical Engineer / Software Engineer"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Job Location <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Amtola / Banani, Dhaka"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Employment Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Contractual">Contractual</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Experience Required <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      placeholder="e.g. 3 - 5 Years"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Monthly Salary Offer <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.salary}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            salary: e.target.value,
                            salaryBadge: e.target.value,
                          })
                        }
                        placeholder="e.g. BDT 75,000 - 1,10,000 / Month"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Salary Badge (Short Display)
                      </label>
                      <input
                        type="text"
                        value={formData.salaryBadge}
                        onChange={(e) => setFormData({ ...formData, salaryBadge: e.target.value })}
                        placeholder="e.g. BDT 75k - 110k"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-950 border-slate-800"
                    />
                    <label htmlFor="isActive" className="text-xs font-semibold text-slate-200 cursor-pointer">
                      Publish immediately to live Careers page
                    </label>
                  </div>
                </div>
              )}

              {/* TAB 2 */}
              {activeTab === "overview" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Role Summary / Job Scope <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.summary}
                      onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                      placeholder="Outline the primary purpose of the position, key project deliverables, and team context..."
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Key Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={5}
                      value={formData.responsibilitiesText}
                      onChange={(e) => setFormData({ ...formData, responsibilitiesText: e.target.value })}
                      placeholder="Lead engineering design schematics&#10;Supervise site execution and commissioning&#10;Perform quality inspections and prepare documentation"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              )}

              {/* TAB 3 */}
              {activeTab === "qualifications" && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Key Qualifications & Requirements (one per line) <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={formData.qualificationsText}
                      onChange={(e) => setFormData({ ...formData, qualificationsText: e.target.value })}
                      placeholder="B.Sc. in Mechanical/Electrical Engineering&#10;Proficient in AutoCAD and sizing tools&#10;In-depth knowledge of BNBC and NFPA standards&#10;Strong communication and client negotiation skills"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold text-slate-300">
                        Application Deadline (Optional Date Picker)
                      </label>
                      {formData.deadline && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, deadline: "" })}
                          className="text-[11px] text-amber-400 hover:text-amber-300 underline"
                        >
                          Clear Date
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 cursor-pointer [color-scheme:dark]"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      Leave empty for open/rolling applications.
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {submitting
                    ? "Saving to Database..."
                    : editingPosition
                    ? "Update Position"
                    : "Publish Position"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Multiple Banners Upload & Management Modal */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-7 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center text-lg font-bold">
                  <FaImage />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Manage Recruitment Circular Banners
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload multiple hiring flyers. They will slide automatically one by one on the Live Career page.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setBannerModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-5 max-h-[60vh] overflow-y-auto pr-1">
              {/* File Upload Box */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Upload New Banner Image
                </label>
                <div className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-2xl p-6 text-center bg-slate-950/60 transition-colors cursor-pointer relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerUpload}
                    disabled={uploadingBanner}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                  {uploadingBanner ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-3">
                      <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold text-slate-300">Uploading banner image...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 py-1">
                      <div className="w-11 h-11 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center text-lg shadow-inner">
                        <FaUpload />
                      </div>
                      <p className="text-xs font-bold text-white mt-1">
                        Click or drag images to upload
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Supports PNG, JPG, WEBP & SVG. You can upload multiple times!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Or Direct Image URL input with Add button */}
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Or Add Image by URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newBannerUrl}
                    onChange={(e) => setNewBannerUrl(e.target.value)}
                    placeholder="https://... or /uploads/products/..."
                    className="flex-1 px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddUrlBanner}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl text-xs font-bold border border-slate-700 transition-colors"
                  >
                    Add URL
                  </button>
                </div>
              </div>

              {/* Banners List / Slider Queue */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-300">
                    Banners in Slider Queue ({modalBanners.length}):
                  </label>
                  {modalBanners.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setModalBanners([])}
                      className="text-[11px] text-red-400 hover:underline"
                    >
                      Remove All
                    </button>
                  )}
                </div>

                {modalBanners.length === 0 ? (
                  <div className="p-6 text-center rounded-2xl bg-slate-950/40 border border-slate-800/80 text-slate-500 text-xs">
                    No banners in queue. Upload an image above to get started.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {modalBanners.map((url, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 bg-slate-950 border border-slate-800 rounded-xl gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <div className="relative w-16 h-10 rounded-lg overflow-hidden bg-slate-900 border border-slate-800 shrink-0">
                            <Image src={url} alt="Banner" fill className="object-cover" />
                          </div>
                          <span className="text-xs text-slate-300 truncate font-mono max-w-[200px] sm:max-w-xs">
                            {url}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMoveBanner(idx, "up")}
                            title="Move Up in slide order"
                            className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            disabled={idx === modalBanners.length - 1}
                            onClick={() => handleMoveBanner(idx, "down")}
                            title="Move Down in slide order"
                            className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed text-[11px]"
                          >
                            ▼
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveModalBanner(idx)}
                            title="Remove from queue"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors ml-1"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                {modalBanners.length > 1
                  ? "Banners will auto-slide every 5 seconds on the live page."
                  : modalBanners.length === 1
                  ? "1 static banner will be displayed."
                  : "No banner will be displayed."}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAllBanners}
                  disabled={savingBanner || uploadingBanner}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold text-xs transition-all shadow-md shadow-amber-500/20 disabled:opacity-50"
                >
                  {savingBanner ? (
                    <>
                      <FaSpinner className="animate-spin text-xs" />
                      <span>Saving Banners...</span>
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-xs" />
                      <span>Save & Publish ({modalBanners.length})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
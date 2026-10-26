"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  FaListUl,
  FaUserTie,
  FaEye,
  FaUsers,
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

const DEPARTMENTS = [
  "Mechanical Engineering (HVAC)",
  "Power Distribution & Panels (PDCP)",
  "Fire Detection & Protection (FDPS)",
  "Industrial Building Automation (IBA)",
  "Plumbing & Water Treatment",
  "Solar & Renewable Energy",
  "Corporate & Project Management",
];

export default function AdminCareersPage() {
  const [positions, setPositions] = useState<JobPosition[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPosition, setEditingPosition] = useState<JobPosition | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "overview" | "qualifications">("basic");
  const [submitting, setSubmitting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    department: DEPARTMENTS[0],
    location: "Amtola / Banani, Dhaka",
    type: "Full Time",
    experience: "3 - 5 Years",
    salary: "BDT 60,000 - 90,000 / Month (Negotiable)",
    salaryBadge: "BDT 60,000 - 90,000 / Month",
    summary: "",
    qualificationsText: "",
    responsibilitiesText: "",
    isActive: true,
    deadline: "",
    orderIndex: 0,
  });

  const fetchPositions = async () => {
    setLoading(true);
    try {
      let url = "/api/admin/careers";
      const params = new URLSearchParams();
      if (selectedDept !== "all") params.append("department", selectedDept);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPositions();
  }, [selectedDept, selectedStatus, search]);

  const handleOpenCreate = () => {
    setEditingPosition(null);
    setFormData({
      title: "",
      department: DEPARTMENTS[0],
      location: "Amtola / Banani, Dhaka",
      type: "Full Time",
      experience: "3 - 5 Years",
      salary: "BDT 60,000 - 90,000 / Month (Negotiable)",
      salaryBadge: "BDT 60,000 - 90,000 / Month",
      summary: "Lead engineering design, site validation, and standards compliance...",
      qualificationsText:
        "B.Sc. in Engineering from a recognized university\nProficiency in AutoCAD and engineering calculation tools\nSound knowledge of BNBC codes and international standards",
      responsibilitiesText:
        "Execute engineering calculations and prepare technical drawings\nSupervise on-site installation and testing protocols\nLiaise with clients and project stakeholders",
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
      department: job.department,
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
        department: formData.department,
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
            Job Vacancies & Engineering Recruitment
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage open positions, set salary scales and criteria, toggle live status on website, and review applications.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 active:scale-95 whitespace-nowrap"
        >
          <FaPlus />
          <span>Post New Position</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full lg:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search job title, department, skills..."
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

          {/* Department Filter */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500 max-w-xs"
          >
            <option value="all">All Engineering Departments</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Positions Table */}
      {loading ? (
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
                  <th className="px-4 py-3">Job Title & Department</th>
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
                        <span className="text-amber-400 text-[11px] font-semibold mt-0.5">
                          {job.department}
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
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-semibold inline-flex items-center gap-1.5">
                        <FaUsers className="text-slate-400 text-[10px]" />
                        <span>{job._count?.applications ?? 0} CVs</span>
                      </span>
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
                      placeholder="e.g. Senior Mechanical Engineer (HVAC & Cleanrooms)"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        Department <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {DEPARTMENTS.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select>
                    </div>

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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Application Deadline (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.deadline}
                      onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      placeholder="e.g. 30 November 2026 or Rolling Basis"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                    />
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
    </div>
  );
}

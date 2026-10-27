"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaMailBulk,
  FaEnvelope,
  FaCalendarAlt,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaUser,
  FaTags,
  FaSync,
  FaBookOpen,
  FaPlus,
  FaEdit,
  FaExternalLinkAlt,
  FaFilePdf,
  FaTimes,
  FaSpinner,
  FaClock,
} from "react-icons/fa";

interface Subscriber {
  id: string;
  email: string;
  name?: string | null;
  interest: string;
  source: string;
  isActive: boolean;
  createdAt: string;
}

interface Bulletin {
  id: string;
  issue: string;
  title: string;
  category: string;
  date: string;
  readTime?: string | null;
  summary: string;
  highlights: string[];
  pdfUrl?: string | null;
  isActive: boolean;
  orderIndex: number;
  createdAt: string;
}

interface Stats {
  total: number;
  active: number;
  unsubscribed: number;
}

const CORE_DISCIPLINES = [
  { value: "mechanical", label: "Mechanical Engineering" },
  { value: "electrical", label: "Electrical Engineering" },
  { value: "plumbing", label: "Plumbing & Sanitary" },
];

const BULLETIN_SUBCATEGORIES: Record<string, string[]> = {
  mechanical: [
    "HVAC & Climate Systems",
    "Fire Detection & Protection (FDPS)",
    "Gas & Utility Distribution (GUDS)",
  ],
  electrical: [
    "Power Distribution & Panels (PDCP)",
    "Energy-Efficient Lighting (EELS)",
    "Intelligent Building Automation (IBA)",
  ],
  plumbing: [
    "Water Supply & Drainage (WSDS)",
    "Water Treatment Solutions (WTS)",
    "Rainwater Harvesting Systems (RHS)",
  ],
};

export default function AdminNewsletterPage() {
  const [activeTab, setActiveTab] = useState<"bulletins" | "subscribers">("bulletins");

  // Bulletins State
  const [bulletins, setBulletins] = useState<Bulletin[]>([]);
  const [loadingBulletins, setLoadingBulletins] = useState(true);
  const [bulletinSearch, setBulletinSearch] = useState("");
  const [bulletinCategory, setBulletinCategory] = useState("all");
  const [bulletinStatus, setBulletinStatus] = useState("all");

  // Bulletin Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBulletin, setEditingBulletin] = useState<Bulletin | null>(null);
  const [submittingBulletin, setSubmittingBulletin] = useState(false);
  const [togglingBulletinId, setTogglingBulletinId] = useState<string | null>(null);

  const [bulletinForm, setBulletinForm] = useState({
    issue: "",
    title: "",
    category: "mechanical",
    date: "",
    readTime: "5 min read",
    summary: "",
    highlightsText: "",
    pdfUrl: "",
    isActive: true,
    orderIndex: 0,
  });

  // Subscribers State
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0 });
  const [loadingSubs, setLoadingSubs] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [interestFilter, setInterestFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Fetch Bulletins
  const fetchBulletins = async () => {
    try {
      setLoadingBulletins(true);
      const url = new URL("/api/admin/bulletins", window.location.origin);
      if (bulletinCategory !== "all") url.searchParams.set("category", bulletinCategory);
      if (bulletinStatus !== "all") url.searchParams.set("status", bulletinStatus);
      if (bulletinSearch.trim()) url.searchParams.set("search", bulletinSearch.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setBulletins(data.bulletins || []);
      }
    } catch (err) {
      console.error("Failed to fetch bulletins:", err);
    } finally {
      setLoadingBulletins(false);
    }
  };

  // Fetch Subscribers
  const fetchSubscribers = async () => {
    try {
      setLoadingSubs(true);
      const url = new URL("/api/admin/newsletter", window.location.origin);
      if (statusFilter !== "ALL") url.searchParams.set("status", statusFilter);
      if (interestFilter !== "ALL") url.searchParams.set("interest", interestFilter);
      if (search.trim()) url.searchParams.set("search", search.trim());

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data.subscribers || []);
        if (data.stats) setStats(data.stats);
      }
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
    } finally {
      setLoadingSubs(false);
    }
  };

  useEffect(() => {
    fetchBulletins();
    fetchSubscribers();
  }, []);

  useEffect(() => {
    fetchBulletins();
  }, [bulletinCategory, bulletinStatus, bulletinSearch]);

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter, interestFilter, search]);

  // Modal Handlers
  const handleOpenCreate = () => {
    setEditingBulletin(null);
    setBulletinForm({
      issue: "",
      title: "",
      category: "mechanical",
      date: new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
      readTime: "5 min read",
      summary: "",
      highlightsText: "",
      pdfUrl: "",
      isActive: true,
      orderIndex: bulletins.length + 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (b: Bulletin) => {
    setEditingBulletin(b);
    let cat = "mechanical";
    const cLower = (b.category || "").toLowerCase();
    if (cLower.includes("elect")) cat = "electrical";
    else if (cLower.includes("plumb") || cLower.includes("water")) cat = "plumbing";

    setBulletinForm({
      issue: b.issue,
      title: b.title,
      category: cat,
      date: b.date,
      readTime: b.readTime || "5 min read",
      summary: b.summary,
      highlightsText: Array.isArray(b.highlights) ? b.highlights.join("\n") : "",
      pdfUrl: b.pdfUrl || "",
      isActive: b.isActive,
      orderIndex: b.orderIndex,
    });
    setModalOpen(true);
  };

  const handleSubmitBulletin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingBulletin(true);

    try {
      const highlights = bulletinForm.highlightsText
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean);

      const payload = {
        issue: bulletinForm.issue || undefined,
        title: bulletinForm.title,
        category: bulletinForm.category,
        date: bulletinForm.date,
        readTime: bulletinForm.readTime,
        summary: bulletinForm.summary,
        highlights,
        pdfUrl: bulletinForm.pdfUrl,
        isActive: bulletinForm.isActive,
        orderIndex: Number(bulletinForm.orderIndex) || 0,
      };

      if (editingBulletin) {
        const res = await fetch(`/api/admin/bulletins/${editingBulletin.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to update bulletin");
      } else {
        const res = await fetch("/api/admin/bulletins", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Failed to create bulletin");
      }

      setModalOpen(false);
      fetchBulletins();
    } catch (err: any) {
      alert(err.message || "Failed to save bulletin");
    } finally {
      setSubmittingBulletin(false);
    }
  };

  const handleToggleBulletinActive = async (id: string, currentStatus: boolean) => {
    setTogglingBulletinId(id);
    try {
      const res = await fetch(`/api/admin/bulletins/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setBulletins((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isActive: !currentStatus } : b))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTogglingBulletinId(null);
    }
  };

  const handleDeleteBulletin = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to permanently delete: "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/bulletins/${id}`, { method: "DELETE" });
      if (res.ok) {
        setBulletins((prev) => prev.filter((b) => b.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Subscriber Handlers
  const handleToggleSubscriber = async (id: string, currentStatus: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus }),
      });
      if (res.ok) {
        setSubscribers((prev) =>
          prev.map((sub) => (sub.id === id ? { ...sub, isActive: !currentStatus } : sub))
        );
        setStats((prev) => ({
          ...prev,
          active: !currentStatus ? prev.active + 1 : prev.active - 1,
          unsubscribed: !currentStatus ? prev.unsubscribed - 1 : prev.unsubscribed + 1,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteSubscriber = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this subscriber?")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, { method: "DELETE" });
      if (res.ok) {
        const deletedSub = subscribers.find((s) => s.id === id);
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        setStats((prev) => ({
          total: prev.total - 1,
          active: deletedSub?.isActive ? prev.active - 1 : prev.active,
          unsubscribed: !deletedSub?.isActive ? prev.unsubscribed - 1 : prev.unsubscribed,
        }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const exportEmailsCSV = () => {
    const activeSubs = subscribers.filter((s) => s.isActive);
    if (activeSubs.length === 0) {
      alert("No active subscribers to export");
      return;
    }
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        "Email,Name,Interest,Source,Subscribed Date",
        ...activeSubs.map(
          (s) =>
            `"${s.email}","${s.name || ""}","${s.interest}","${s.source}","${new Date(
              s.createdAt
            ).toLocaleDateString()}"`
        ),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `elite-subscribers-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Newsletter & Bulletins
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live DB
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage technical whitepapers, engineering bulletins, and client email subscribers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === "bulletins" ? (
            <button
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-accent/20 cursor-pointer"
            >
              <FaPlus className="text-xs" />
              <span>Create New Bulletin</span>
            </button>
          ) : (
            <button
              onClick={exportEmailsCSV}
              className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-accent/20"
            >
              <FaDownload className="text-xs" />
              <span>Export CSV</span>
            </button>
          )}

          <button
            onClick={() => {
              if (activeTab === "bulletins") fetchBulletins();
              else fetchSubscribers();
            }}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors border border-slate-700/80"
            title="Refresh"
          >
            <FaSync className={loadingBulletins || loadingSubs ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-900/60 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveTab("bulletins")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "bulletins"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FaBookOpen />
          <span>Engineering Bulletins ({bulletins.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("subscribers")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
            activeTab === "subscribers"
              ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <FaMailBulk />
          <span>Email Subscribers ({subscribers.length})</span>
        </button>
      </div>

      {/* TAB 1: ENGINEERING BULLETINS */}
      {activeTab === "bulletins" && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-800">
            <div className="relative w-full lg:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
              <input
                type="text"
                placeholder="Search bulletin title or topic..."
                value={bulletinSearch}
                onChange={(e) => setBulletinSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <select
                value={bulletinCategory}
                onChange={(e) => setBulletinCategory(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All 3 Disciplines</option>
                {CORE_DISCIPLINES.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>

              <select
                value={bulletinStatus}
                onChange={(e) => setBulletinStatus(e.target.value)}
                className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-amber-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Live on Site</option>
                <option value="inactive">Draft / Hidden</option>
              </select>
            </div>
          </div>

          {/* Bulletins Table */}
          {loadingBulletins ? (
            <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
              <FaSpinner className="animate-spin text-2xl text-amber-500" />
              <span className="text-xs">Loading engineering bulletins...</span>
            </div>
          ) : bulletins.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/30 border border-slate-800 rounded-2xl">
              <FaBookOpen className="text-3xl text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400 font-semibold">No engineering bulletins found.</p>
              <button
                onClick={handleOpenCreate}
                className="mt-3 px-3 py-1.5 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
              >
                Create First Bulletin
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3.5">Issue & Category</th>
                      <th className="px-4 py-3.5">Title & Insights</th>
                      <th className="px-4 py-3.5">Date & Read Time</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-4 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {bulletins.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="px-4 py-3 align-top">
                          <span className="font-mono text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 block w-fit mb-1 border border-slate-700">
                            {b.issue}
                          </span>
                          <span className="text-[11px] text-amber-400 font-semibold">
                            {b.category}
                          </span>
                        </td>

                        <td className="px-4 py-3 align-top max-w-md">
                          <p className="font-bold text-white text-sm line-clamp-1">{b.title}</p>
                          <p className="text-slate-400 text-[11px] line-clamp-2 mt-0.5">{b.summary}</p>
                          {b.highlights && b.highlights.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                              {b.highlights.slice(0, 2).map((h, i) => (
                                <span
                                  key={i}
                                  className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800/80 text-slate-300"
                                >
                                  &bull; {h}
                                </span>
                              ))}
                              {b.highlights.length > 2 && (
                                <span className="text-[9px] text-slate-500">
                                  +{b.highlights.length - 2} more
                                </span>
                              )}
                            </div>
                          )}
                        </td>

                        <td className="px-4 py-3 align-top whitespace-nowrap">
                          <div className="text-slate-200 text-xs font-medium">{b.date}</div>
                          <div className="text-slate-500 text-[10px] flex items-center gap-1 mt-0.5">
                            <FaClock className="text-[9px]" />
                            <span>{b.readTime || "5 min read"}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 align-top">
                          <button
                            onClick={() => handleToggleBulletinActive(b.id, b.isActive)}
                            disabled={togglingBulletinId === b.id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                              b.isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                                : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                            }`}
                          >
                            {b.isActive ? (
                              <>
                                <FaCheckCircle className="text-emerald-400" />
                                <span>Live</span>
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-slate-500" />
                                <span>Draft</span>
                              </>
                            )}
                          </button>
                        </td>

                        <td className="px-4 py-3 align-top text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <Link
                              href="/newsletter"
                              target="_blank"
                              title="View on Newsletter Page"
                              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                            >
                              <FaExternalLinkAlt className="text-xs" />
                            </Link>
                            <button
                              onClick={() => handleOpenEdit(b)}
                              title="Edit Bulletin"
                              className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-colors"
                            >
                              <FaEdit className="text-xs" />
                            </button>
                            <button
                              onClick={() => handleDeleteBulletin(b.id, b.title)}
                              title="Delete Bulletin"
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

      {/* TAB 2: EMAIL SUBSCRIBERS */}
      {activeTab === "subscribers" && (
        <div className="space-y-6">
          {/* KPI Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Total Subscribers
                </p>
                <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 text-lg">
                <FaMailBulk />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Active Verified
                </p>
                <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.active}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg">
                <FaCheckCircle />
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                  Unsubscribed / Inactive
                </p>
                <p className="text-2xl font-bold text-slate-400 mt-1">{stats.unsubscribed}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-lg">
                <FaTimesCircle />
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3.5 rounded-2xl">
            <div className="relative w-full sm:w-80">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
              <input
                type="text"
                placeholder="Search email, name or domain..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-accent"
              >
                <option value="ALL">All Statuses</option>
                <option value="ACTIVE">Active Only</option>
                <option value="INACTIVE">Unsubscribed Only</option>
              </select>

              <select
                value={interestFilter}
                onChange={(e) => setInterestFilter(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-accent"
              >
                <option value="ALL">All Interests (All Disciplines)</option>
                <option value="mechanical">Mechanical (HVAC, Fire Protection & Gas)</option>
                <option value="electrical">Electrical (Switchgear, Automation & Lighting)</option>
                <option value="plumbing">Plumbing (Water Distribution, Treatment & Harvesting)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-semibold">
                    <th className="py-3 px-4">Subscriber Details</th>
                    <th className="py-3 px-4">Primary Interest</th>
                    <th className="py-3 px-4">Source</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Subscribed At</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {loadingSubs ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        <FaSync className="animate-spin text-lg mx-auto mb-2 text-accent" />
                        Loading newsletter subscribers...
                      </td>
                    </tr>
                  ) : subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-500">
                        <FaEnvelope className="text-2xl mx-auto mb-2 text-slate-600" />
                        No newsletter subscribers found.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{sub.email}</div>
                          {sub.name && (
                            <div className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <FaUser className="text-[9px]" /> {sub.name}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-medium border border-slate-700 uppercase">
                            {sub.interest}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 capitalize">
                          {sub.source.replace("_", " ")}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => handleToggleSubscriber(sub.id, sub.isActive)}
                            disabled={updatingId === sub.id}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all ${
                              sub.isActive
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
                                : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
                            }`}
                          >
                            {sub.isActive ? (
                              <>
                                <FaCheckCircle className="text-[10px]" /> Active
                              </>
                            ) : (
                              <>
                                <FaTimesCircle className="text-[10px]" /> Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400 whitespace-nowrap">
                          {new Date(sub.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteSubscriber(sub.id)}
                            disabled={updatingId === sub.id}
                            className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Delete Subscriber"
                          >
                            <FaTrash className="text-xs" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT BULLETIN MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2">
                <FaBookOpen className="text-amber-500 text-sm" />
                <h3 className="font-bold text-white text-base">
                  {editingBulletin ? "Edit Engineering Bulletin" : "Create New Engineering Bulletin"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmitBulletin} className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Issue Tag <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={bulletinForm.issue}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, issue: e.target.value })}
                    placeholder="e.g. Bulletin #25 — Q4 Edition"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={bulletinForm.category}
                    onChange={(e) =>
                      setBulletinForm({ ...bulletinForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    {CORE_DISCIPLINES.map((d) => (
                      <option key={d.value} value={d.value}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Bulletin Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={bulletinForm.title}
                  onChange={(e) => setBulletinForm({ ...bulletinForm, title: e.target.value })}
                  placeholder="e.g. Tropical VRF Air Conditioning: Optimizing COP in High Ambient Temperatures"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Publication Month/Year
                  </label>
                  <input
                    type="text"
                    value={bulletinForm.date}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, date: e.target.value })}
                    placeholder="e.g. October 2026"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={bulletinForm.readTime}
                    onChange={(e) => setBulletinForm({ ...bulletinForm, readTime: e.target.value })}
                    placeholder="e.g. 6 min read"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Display Order Index
                  </label>
                  <input
                    type="number"
                    value={bulletinForm.orderIndex}
                    onChange={(e) =>
                      setBulletinForm({ ...bulletinForm, orderIndex: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Executive Summary / Abstract <span className="text-red-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={bulletinForm.summary}
                  onChange={(e) => setBulletinForm({ ...bulletinForm, summary: e.target.value })}
                  placeholder="A concise synopsis of the engineering challenge, technical standard, and practical solution..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Key Engineering Insights (one per line)
                </label>
                <textarea
                  rows={3}
                  value={bulletinForm.highlightsText}
                  onChange={(e) =>
                    setBulletinForm({ ...bulletinForm, highlightsText: e.target.value })
                  }
                  placeholder={"Inverter compressor frequency modulation curves\nOil recovery cycle timing\nModbus/BACnet BMS telemetry"}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Direct PDF URL <span className="text-slate-500 font-normal">(optional, for instant download)</span>
                </label>
                <input
                  type="text"
                  value={bulletinForm.pdfUrl}
                  onChange={(e) => setBulletinForm({ ...bulletinForm, pdfUrl: e.target.value })}
                  placeholder="https://... or /brochures/bulletin-24.pdf"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveBulletin"
                  checked={bulletinForm.isActive}
                  onChange={(e) =>
                    setBulletinForm({ ...bulletinForm, isActive: e.target.checked })
                  }
                  className="rounded border-slate-700 bg-slate-950 text-amber-500 focus:ring-0"
                />
                <label htmlFor="isActiveBulletin" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Publish live on public Newsletter page
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingBulletin}
                  className="inline-flex items-center gap-1.5 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold rounded-lg shadow-md transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submittingBulletin && <FaSpinner className="animate-spin text-xs" />}
                  <span>{editingBulletin ? "Update Bulletin" : "Save & Publish"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

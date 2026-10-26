"use client";

import React, { useState, useEffect } from "react";
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

interface Stats {
  total: number;
  active: number;
  unsubscribed: number;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, active: 0, unsubscribed: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [interestFilter, setInterestFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, [statusFilter, interestFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSubscribers();
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
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

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this subscriber?")) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/newsletter/${id}`, {
        method: "DELETE",
      });
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
      ["Email,Name,Interest,Source,Subscribed Date", ...activeSubs.map((s) => `"${s.email}","${s.name || ""}","${s.interest}","${s.source}","${new Date(s.createdAt).toLocaleDateString()}"`)].join("\n");

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-white tracking-tight">Newsletter & Bulletins</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live DB
            </span>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Manage engineers, industrial clients and consultants subscribed to technical updates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchSubscribers}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm transition-colors border border-slate-700/80"
            title="Refresh"
          >
            <FaSync className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={exportEmailsCSV}
            className="inline-flex items-center gap-2 bg-accent hover:bg-amber-600 text-brand-950 font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all shadow-lg hover:shadow-accent/20"
          >
            <FaDownload className="text-xs" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Total Subscribers</p>
            <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center text-xl">
            <FaMailBulk />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Active Subscribers</p>
            <p className="text-2xl font-bold text-emerald-400 mt-1">{stats.active}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl">
            <FaCheckCircle />
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Unsubscribed</p>
            <p className="text-2xl font-bold text-slate-400 mt-1">{stats.unsubscribed}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 flex items-center justify-center text-xl">
            <FaTimesCircle />
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-center justify-between">
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-xs" />
          <input
            type="text"
            placeholder="Search by email or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 text-white pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </form>

        <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <FaFilter className="text-slate-500 text-[10px]" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-slate-900">All Statuses</option>
              <option value="ACTIVE" className="bg-slate-900">Active</option>
              <option value="UNSUBSCRIBED" className="bg-slate-900">Unsubscribed</option>
            </select>
          </div>

          {/* Interest Filter */}
          <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-300">
            <FaTags className="text-slate-500 text-[10px]" />
            <select
              value={interestFilter}
              onChange={(e) => setInterestFilter(e.target.value)}
              className="bg-transparent text-white focus:outline-none cursor-pointer text-xs"
            >
              <option value="ALL" className="bg-slate-900">All Interests</option>
              <option value="all" className="bg-slate-900">All MEP Disciplines</option>
              <option value="hvac" className="bg-slate-900">HVAC & Mechanical</option>
              <option value="fire" className="bg-slate-900">Fire Protection</option>
              <option value="electrical" className="bg-slate-900">Electrical & Switchgear</option>
              <option value="water" className="bg-slate-900">Water Treatment</option>
            </select>
          </div>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-5">Subscriber</th>
                <th className="py-3.5 px-5">Interest</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Date Subscribed</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="inline-block w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin mb-2" />
                    <p>Loading subscribers from database...</p>
                  </td>
                </tr>
              ) : subscribers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <FaMailBulk className="text-3xl mx-auto mb-2 opacity-30" />
                    <p className="text-sm font-medium">No subscribers found</p>
                    <p className="text-xs text-slate-600 mt-1">
                      Submissions from the footer and newsletter page will appear here automatically.
                    </p>
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 font-bold shrink-0">
                          {sub.name ? sub.name.charAt(0).toUpperCase() : <FaEnvelope className="text-xs text-slate-400" />}
                        </div>
                        <div className="min-w-0">
                          <p className="text-white font-medium truncate flex items-center gap-1.5">
                            {sub.email}
                          </p>
                          {sub.name && (
                            <p className="text-slate-400 text-xs truncate flex items-center gap-1 mt-0.5">
                              <FaUser className="text-[10px] text-slate-500" />
                              <span>{sub.name}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {sub.interest === "all"
                          ? "All MEP"
                          : sub.interest === "hvac"
                          ? "HVAC & Mechanical"
                          : sub.interest === "fire"
                          ? "Fire Protection"
                          : sub.interest === "electrical"
                          ? "Electrical"
                          : sub.interest === "water"
                          ? "Water Treatment"
                          : sub.interest}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">
                        {sub.source}
                      </span>
                    </td>

                    <td className="py-4 px-5">
                      <button
                        onClick={() => handleToggleStatus(sub.id, sub.isActive)}
                        disabled={updatingId === sub.id}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                          sub.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-500 border border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${sub.isActive ? "bg-emerald-400" : "bg-slate-500"}`} />
                        <span>{sub.isActive ? "Active" : "Unsubscribed"}</span>
                      </button>
                    </td>

                    <td className="py-4 px-5 text-slate-400 text-xs">
                      <div className="flex items-center gap-1.5">
                        <FaCalendarAlt className="text-slate-600 text-[10px]" />
                        <span>{new Date(sub.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => handleDelete(sub.id)}
                        disabled={updatingId === sub.id}
                        className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="Delete Permanently"
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
  );
}

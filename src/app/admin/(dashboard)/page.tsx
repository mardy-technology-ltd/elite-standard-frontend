"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBoxes,
  FaProjectDiagram,
  FaEnvelopeOpenText,
  FaClock,
  FaCheckCircle,
  FaPhoneAlt,
  FaEnvelope,
  FaArrowRight,
  FaPlus,
  FaDatabase,
  FaFileInvoiceDollar,
  FaCogs,
  FaBriefcase,
} from "react-icons/fa";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<any>(null);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
        setRecentInquiries(data.recentInquiries || []);
      }
    } catch (err) {
      console.error("Dashboard data fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setRecentInquiries((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const kpis = [
    {
      title: "MEP Services",
      value: stats?.servicesCount ?? 0,
      description: "Mechanical, Electrical, Plumbing",
      icon: FaCogs,
      color: "from-blue-700 to-indigo-700",
      href: "/admin/services",
      btnText: "Manage Services",
    },
    {
      title: "Catalog Products",
      value: stats?.productsCount ?? 0,
      description: "Active engineering equipment",
      icon: FaBoxes,
      color: "from-blue-600 to-cyan-600",
      href: "/admin/products",
      btnText: "Manage Products",
    },
    {
      title: "Portfolio Projects",
      value: stats?.projectsCount ?? 0,
      description: "Landmark MEP installations",
      icon: FaProjectDiagram,
      color: "from-indigo-600 to-purple-600",
      href: "/admin/projects",
      btnText: "Manage Projects",
    },
    {
      title: "Pending Quotations",
      value: stats?.pendingInquiriesCount ?? 0,
      description: "Awaiting engineer response",
      icon: FaClock,
      color: "from-amber-600 to-orange-600",
      href: "/admin/inquiries",
      btnText: "View Inquiries",
      highlight: (stats?.pendingInquiriesCount ?? 0) > 0,
    },
    {
      title: "Total Customer Leads",
      value: stats?.inquiriesCount ?? 0,
      description: "Total RFQ & consultation inquiries",
      icon: FaEnvelopeOpenText,
      color: "from-emerald-600 to-teal-600",
      href: "/admin/inquiries",
      btnText: "All Inquiries",
    },
    {
      title: "Open Careers",
      value: stats?.careersCount ?? 0,
      description: "Active engineering vacancies",
      icon: FaBriefcase,
      color: "from-amber-600 to-yellow-600",
      href: "/admin/careers",
      btnText: "Manage Careers",
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome & Database Connection Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <FaCheckCircle />
              Supabase PostgreSQL Database Connected
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome to Elite Standard Admin Portal
            </h1>
            <p className="mt-1 text-slate-300 text-sm max-w-2xl">
              Centralized administration for Water Treatment, HVAC, Fire Protection, and Power Switchgear operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-md shadow-blue-500/20"
            >
              <FaPlus />
              <span>Add New Product</span>
            </Link>
            <Link
              href="/admin/inquiries"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all"
            >
              <FaFileInvoiceDollar />
              <span>Review RFQs</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className={`bg-slate-900/90 rounded-2xl border p-5 transition-all hover:border-slate-700 flex flex-col justify-between ${
                kpi.highlight
                  ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
                  : "border-slate-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {kpi.title}
                  </span>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${kpi.color} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="text-lg" />
                  </div>
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight">
                  {kpi.value}
                </div>
                <p className="mt-1 text-xs text-slate-400">{kpi.description}</p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-800/80">
                <Link
                  href={kpi.href}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <span>{kpi.btnText}</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Customer Inquiries / Leads Table */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 sm:p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FaEnvelopeOpenText className="text-blue-400" />
              Recent Inquiries & Quotation Requests
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customer inquiries submitted via the live website contact & quotation forms
            </p>
          </div>
          <Link
            href="/admin/inquiries"
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1.5"
          >
            <span>View All Inquiries</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">
            No inquiries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Customer / Organization</th>
                  <th className="px-5 py-3.5">Requested Equipment</th>
                  <th className="px-5 py-3.5">Contact Details</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {recentInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-sm">{inq.name}</div>
                      {inq.facility && (
                        <div className="text-slate-400 text-[11px] mt-0.5">{inq.facility}</div>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-slate-200 font-medium max-w-xs truncate">
                        {inq.productName || "General Technical Consultation"}
                      </div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                        {inq.type}
                      </span>
                    </td>

                    <td className="px-5 py-4 space-y-1">
                      <a
                        href={`tel:${inq.phone}`}
                        className="flex items-center gap-1.5 text-blue-400 hover:underline font-semibold"
                      >
                        <FaPhoneAlt className="text-[10px]" />
                        <span>{inq.phone}</span>
                      </a>
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="flex items-center gap-1.5 text-slate-400 hover:text-white"
                        >
                          <FaEnvelope className="text-[10px]" />
                          <span className="truncate max-w-[150px]">{inq.email}</span>
                        </a>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <select
                        value={inq.status}
                        disabled={updatingId === inq.id}
                        onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors cursor-pointer focus:outline-none ${
                          inq.status === "PENDING"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : inq.status === "CONTACTED"
                            ? "bg-blue-500/10 text-blue-400 border-blue-500/30"
                            : inq.status === "QUOTED"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        <option value="PENDING" className="bg-slate-900 text-white">PENDING</option>
                        <option value="CONTACTED" className="bg-slate-900 text-white">CONTACTED</option>
                        <option value="QUOTED" className="bg-slate-900 text-white">QUOTED</option>
                        <option value="ARCHIVED" className="bg-slate-900 text-white">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        href={`/admin/inquiries`}
                        className="inline-flex items-center gap-1 text-slate-400 hover:text-white font-semibold text-xs"
                      >
                        <span>View Details</span>
                        <FaArrowRight className="text-[9px]" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

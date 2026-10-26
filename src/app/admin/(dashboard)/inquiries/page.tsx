"use client";

import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpenText,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaCalendarAlt,
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaSearch,
  FaFilter,
} from "react-icons/fa";

interface Inquiry {
  id: string;
  type: string;
  productName?: string;
  name: string;
  phone: string;
  email?: string;
  facility?: string;
  message?: string;
  status: "PENDING" | "CONTACTED" | "QUOTED" | "ARCHIVED";
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const url = new URL("/api/admin/inquiries", window.location.origin);
      if (selectedStatus !== "ALL") url.searchParams.set("status", selectedStatus);

      const res = await fetch(url.toString());
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, [selectedStatus]);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus as any } : i))
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry record?")) return;
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) fetchInquiries();
    } catch (e) {
      console.error(e);
    }
  };

  const filtered = inquiries.filter((inq) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      inq.name.toLowerCase().includes(q) ||
      inq.phone.toLowerCase().includes(q) ||
      (inq.email && inq.email.toLowerCase().includes(q)) ||
      (inq.facility && inq.facility.toLowerCase().includes(q)) ||
      (inq.productName && inq.productName.toLowerCase().includes(q))
    );
  });

  const statuses = ["ALL", "PENDING", "CONTACTED", "QUOTED", "ARCHIVED"];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <FaEnvelopeOpenText className="text-amber-400" />
            Customer Inquiries & RFQs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review quotation requests, equipment inquiries, and technical consultation leads.
          </p>
        </div>
        <a
          href="/admin/newsletter"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition-all self-start sm:self-auto"
        >
          <FaEnvelope className="text-amber-400 text-xs" />
          <span>View Newsletter Subscribers &rarr;</span>
        </a>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedStatus === status
                  ? "bg-amber-500 text-slate-950 font-bold shadow-sm"
                  : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer, phone, email..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Inquiries Table / Cards */}
      {loading ? (
        <div className="p-12 text-center bg-slate-900/90 rounded-2xl border border-slate-800">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs text-slate-400">Loading leads from Supabase...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-slate-400 text-sm bg-slate-900/90 rounded-2xl border border-slate-800">
          No inquiries found matching this criteria.
        </div>
      ) : (
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/60 text-slate-400 uppercase tracking-wider text-[11px] font-semibold border-b border-slate-800">
                <tr>
                  <th className="px-5 py-3.5">Customer & Facility</th>
                  <th className="px-5 py-3.5">Equipment / Inquiry</th>
                  <th className="px-5 py-3.5">Contact Channels</th>
                  <th className="px-5 py-3.5">Status Flow</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70">
                {filtered.map((inq) => (
                  <tr key={inq.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-white text-sm">{inq.name}</div>
                      {inq.facility && (
                        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                          <FaBuilding className="text-[10px] text-blue-400 flex-shrink-0" />
                          <span className="truncate max-w-xs">{inq.facility}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mt-1">
                        <FaCalendarAlt className="text-[9px]" />
                        <span>{new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-white font-medium line-clamp-1">
                        {inq.productName || "General Engineering Inquiry"}
                      </div>
                      {inq.message && (
                        <p className="text-slate-400 text-[11px] line-clamp-2 mt-1 italic">
                          "{inq.message}"
                        </p>
                      )}
                    </td>

                    <td className="px-5 py-4 space-y-1">
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1.5 text-blue-400 hover:underline font-semibold"
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
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer focus:outline-none ${
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
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setActiveInquiry(inq)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                        >
                          Details
                        </button>
                        <button
                          onClick={() => handleDelete(inq.id)}
                          className="p-2 rounded-lg bg-slate-800 hover:bg-red-600/30 text-slate-300 hover:text-red-400 transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
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

      {/* Inquiry Detail Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center justify-between">
              <span>Customer Inquiry Details</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase bg-amber-500/20 text-amber-400 border border-amber-500/30">
                {activeInquiry.status}
              </span>
            </h2>

            <div className="space-y-3 text-xs">
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Customer Name</div>
                <div className="text-white font-bold text-sm">{activeInquiry.name}</div>
                {activeInquiry.facility && (
                  <div className="text-slate-300">{activeInquiry.facility}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">Phone Number</div>
                  <a
                    href={`tel:${activeInquiry.phone}`}
                    className="text-blue-400 font-bold hover:underline"
                  >
                    {activeInquiry.phone}
                  </a>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <div className="text-slate-400 mb-1">Email Address</div>
                  <a
                    href={`mailto:${activeInquiry.email}`}
                    className="text-slate-200 hover:underline truncate block"
                  >
                    {activeInquiry.email || "Not Provided"}
                  </a>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                <div className="text-slate-400">Requested Product / Service</div>
                <div className="text-white font-medium">
                  {activeInquiry.productName || "General Consultation"}
                </div>
              </div>

              {activeInquiry.message && (
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-1">
                  <div className="text-slate-400">Customer Message / Requirements</div>
                  <p className="text-slate-200 whitespace-pre-wrap leading-relaxed">
                    {activeInquiry.message}
                  </p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setActiveInquiry(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

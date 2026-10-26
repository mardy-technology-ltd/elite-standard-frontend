"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  FaTachometerAlt,
  FaBoxes,
  FaProjectDiagram,
  FaEnvelopeOpenText,
  FaNewspaper,
  FaExternalLinkAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUserShield,
  FaDatabase,
  FaBell,
  FaSearch,
  FaCogs,
} from "react-icons/fa";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/admin/login");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.user) setAdminUser(data.user);
      })
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      router.push("/admin/login");
    }
  };

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: FaTachometerAlt,
      exact: true,
    },
    {
      label: "Services & Solutions",
      href: "/admin/services",
      icon: FaCogs,
      badge: "Core MEP",
    },
    {
      label: "Products Catalog",
      href: "/admin/products",
      icon: FaBoxes,
      badge: "Catalog",
    },
    {
      label: "Case Studies / Projects",
      href: "/admin/projects",
      icon: FaProjectDiagram,
      badge: "Portfolio",
    },
    {
      label: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: FaEnvelopeOpenText,
      badge: "Active",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white font-sans">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 text-sm">Authenticating Admin Session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans antialiased">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="relative w-36 h-12">
              <Image
                src="/logo.png"
                alt="Elite Standard Limited"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-2"
          >
            <FaTimes />
          </button>
        </div>

        {/* Database & System Status Tag */}
        <div className="px-5 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Supabase Postgres</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">
            PROD
          </span>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Administration
          </p>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`text-base ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          <div className="pt-6">
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
              Quick Shortcuts
            </p>
            <Link
              href="/products"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span>Live Products Page</span>
              <FaExternalLinkAlt className="text-xs text-slate-400" />
            </Link>
            <Link
              href="/projects"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors"
            >
              <span>Live Projects Page</span>
              <FaExternalLinkAlt className="text-xs text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Current Admin User & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/40">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow">
              <FaUserShield className="text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">
                {adminUser?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {adminUser?.email || "admin@elitestandard.com"}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-slate-800/80 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700/60 hover:border-red-500/30 text-xs font-semibold transition-all"
          >
            <FaSignOutAlt />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg bg-slate-800/60"
            >
              <FaBars />
            </button>
            <div className="hidden sm:block">
              <span className="text-xs font-medium text-slate-400">Elite Standard Management /</span>
              <h1 className="text-base font-bold text-white tracking-tight capitalize">
                {pathname === "/admin"
                  ? "Dashboard Overview"
                  : pathname.replace("/admin/", "").replace("-", " ")}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
            >
              <FaExternalLinkAlt className="text-xs text-blue-400" />
              <span>View Live Website</span>
            </Link>

            <button
              onClick={handleLogout}
              className="sm:hidden text-slate-400 hover:text-red-400 p-2"
              title="Sign Out"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

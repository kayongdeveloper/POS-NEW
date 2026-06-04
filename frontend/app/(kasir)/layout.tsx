"use client";

import { useSidebar } from "@/context/SidebarContext";
import Navbar from "@/components/layout/Navbar";
import Backdrop from "@/components/layout/Backdrop";
import React from "react";

/**
 * Layout Kasir
 * Kasir tidak memiliki sidebar navigasi penuh seperti admin.
 * Layout ini minimal: hanya navbar + konten.
 */
export default function KasirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Backdrop />
      <Navbar />
      <main
        className={`flex-1 p-4 md:p-6 mx-auto w-full max-w-screen-2xl transition-all duration-300 ${
          isMobileOpen ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}

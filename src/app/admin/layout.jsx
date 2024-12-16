"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 bg-gray-50 p-4 overflow-y-auto transition-all duration-300 ${
          sidebarOpen ? "ml-64" : ""
        }`}
      >
        {children}
      </main>
    </div>
  );
}

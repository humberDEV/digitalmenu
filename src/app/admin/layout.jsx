"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const storedValue = localStorage.getItem("sidebarOpen");
    if (storedValue === null) {
      localStorage.setItem("sidebarOpen", "true");
      setSidebarOpen(true);
    } else {
      setSidebarOpen(storedValue === "true");
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      document.title = "MenuPage - Admin";
    }
  }, [pathname]);

  const toggleSidebar = () => {
    const newValue = !sidebarOpen;
    localStorage.setItem("sidebarOpen", String(newValue));
    setSidebarOpen(newValue);
  };

  return (
    <div className="flex h-screen">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <main
        className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-200`}
      >
        {children}
      </main>
    </div>
  );
}

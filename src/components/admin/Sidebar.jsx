"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuItems from "./menu-items";

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`hidden md:block bg-slate-900 text-white ${
          sidebarOpen ? "w-52" : "w-16"
        } transition-all duration-300 h-screen flex flex-col`}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between p-4">
          {sidebarOpen && (
            <div className="text-xl font-bold flex items-center transition-transform">
              <span className="flex items-center">
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500">
                  Menu
                </span>
                <span className="text-white-800 font-bold">Page</span>
              </span>
            </div>
          )}
          <button onClick={toggleSidebar} className="text-white mb-4">
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col flex-grow">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center p-4 transition-all duration-100 ${
                  isActive
                    ? "bg-gray-700 border-l-4 border-cyan-50"
                    : "hover:bg-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                {sidebarOpen && <span className="ml-4">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Menú para móviles */}
      <div className="block md:hidden">
        <div className="btm-nav">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`flex flex-col items-center p-4 transition-colors ${
                  isActive ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                <span className="text-white">{item.icon}</span>
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}

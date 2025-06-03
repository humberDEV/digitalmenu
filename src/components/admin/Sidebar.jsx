"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuItems from "./menu-items";
import { cn } from "@/lib/utils"; // Si usas shadcn-utils opcional

export default function Sidebar({ sidebarOpen, toggleSidebar }) {
  const pathname = usePathname();

  return (
    <>
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen transition-all duration-300 ease-in-out bg-[#121a26] text-white border-r border-[#1f1f1f]",
          sidebarOpen ? "w-56" : "w-16"
        )}
      >
        {/* Encabezado */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#1f1f1f]">
          {sidebarOpen && (
            <h1 className="text-lg font-bold tracking-tight text-white">
              <span className="bg-gradient-to-r from-[#a78bfa] to-[#7c3aed] bg-clip-text text-transparent text-xl font-bold">
                Digi
              </span>
              <span className="text-white text-xl font-bold">Menu</span>
            </h1>
          )}
          <button
            onClick={toggleSidebar}
            className="text-neutral-400 hover:text-white"
          >
            {sidebarOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Navegación */}
        <nav className="flex flex-col flex-grow px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white/10 text-white backdrop-blur-md border border-white/10"
                    : "text-neutral-300 hover:bg-white/5 hover:text-white transition-all duration-200 ease-in-out"
                )}
              >
                <span className="text-lg">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Navegación móvil */}
      <div className="block md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-sm bg-black/30 border-t border-white/10">
        <div className="flex justify-around py-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center text-xs",
                  isActive
                    ? "text-blue-400"
                    : "text-neutral-400 hover:text-white"
                )}
              >
                <span className="text-lg">{item.icon}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

import React from "react";

export default function Header() {
  return (
    <header className="p-4 w-full">
      <div className="max-w-screen-2xl flex justify-between items-center p-4 mx-auto">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center space-x-1 hover:scale-105 transition-transform">
          <a href="/" className="flex items-center">
            <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-indigo-500">
              Digi
            </span>
            <span className="text-gray-800 font-bold">Menu</span>
          </a>
        </div>

        {/* Botones de navegación */}
        <div className="hidden md:flex space-x-4">
          <a href="/pricing" className="btn btn-ghost text-xl">
            Precios
          </a>
          <a
            href="/login"
            className="btn bg-black text-white rounded-xl text-xl hover:scale-105 transition-transform"
          >
            Accede a tu cuenta
          </a>
        </div>

        {/* Menú desplegable para móviles */}
        <div className="md:hidden flex items-center space-x-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu bg-slate-100 dropdown-content rounded-box z-[1] mt-4 w-52 p-2 shadow"
            >
              <li>
                <a href="/pricing" className="font-medium text-lg">
                  Precios
                </a>
              </li>
              <li>
                <a href="/login" className="font-medium text-lg">
                  Acceder
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

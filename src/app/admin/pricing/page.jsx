"use client";

import Pricing from "@/components/princing/Pricing";

export default function PricingPage() {
  return (
    <div className="flex flex-col">
      <button className="absolute top-6 left-30 text-teal-600 text-xl mb-4 ml-4">
        <a href="/admin/settings" className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span>Volver</span>
        </a>
      </button>
      <Pricing />
    </div>
  );
}

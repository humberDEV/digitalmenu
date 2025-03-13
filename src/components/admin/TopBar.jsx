"use client";

import { useState } from "react";

export default function TopBar({ isEditing, setIsEditing }) {
  return (
    <>
      <div className="flex justify-between items-center bg-gray-200 p-4 rounded-br-md">
        <h1 className="text-2xl font-bold">Configura tu menú</h1>
        <button
          className={`btn ${
            isEditing
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-orange-300 hover:bg-orange-400"
          } text-white px-6 py-3 rounded-md transition w-full sm:w-auto border-none`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Guardar" : "Editar"}
        </button>
      </div>
    </>
  );
}

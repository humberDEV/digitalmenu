"use client";

import { useState } from "react";

export default function SettingsPage() {
  const hasSuscription = false;
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  var buttonPricingText = "Contratar un plan";
  if (hasSuscription) {
    buttonPricingText = "Mejorar plan";
  }

  const handleLogout = () => {
    // Aquí puedes añadir la lógica para cerrar sesión
    console.log("Sesión cerrada");
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      {/* Título de la página */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Configuración</h1>

      {/* Sección Administrar suscripción */}
      <div className="mt-12 p-6 rounded-lg shadow-md bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Administrar suscripción
        </h2>
        <div className="flex flex-col space-y-2">
          <span className="badge badge-outline p-3 text-xs text-gray-500">
            Plan Actual: Gratuito (Prueba)
          </span>
          <span className="text-xs text-gray-500">
            Contrate con nosotros para obtener acceso a todas las
            funcionalidades.
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="/admin/pricing"
            className="btn bg-teal-500 text-slate-200 rounded-md hover:bg-teal-400 transition"
          >
            {buttonPricingText}
          </a>
          {hasSuscription && (
            <button className="btn btn-ghost text-red-600 rounded-md transition">
              Cancelar suscripción
            </button>
          )}
        </div>
      </div>

      {/* Sección Cambio de contraseña */}
      <div className="mt-12 p-6 rounded-lg shadow-md bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cambio de contraseña
        </h2>
        <div className="flex gap-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="input w-full bg-gray-100 border border-gray-300 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button className="btn bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 transition">
            Actualizar contraseña
          </button>
        </div>
      </div>

      {/* Sección Logout */}
      <div className="mt-12 p-6 rounded-lg shadow-md bg-gray-50">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Cerrar sesión
        </h2>
        <button
          className="btn bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition"
          onClick={() => setShowLogoutModal(true)}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Modal de confirmación de logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              ¿Deseas cerrar sesión?
            </h3>
            <p className="text-gray-700 mb-6">
              No te preocupes, tus menús seguirán disponibles en línea y podrás
              acceder a ellos cuando vuelvas a iniciar sesión.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="btn btn-outline border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-md"
                onClick={() => setShowLogoutModal(false)}
              >
                Cancelar
              </button>
              <button
                className="btn bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
                onClick={() => {
                  handleLogout();
                  setShowLogoutModal(false);
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

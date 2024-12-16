export default function SettingsPage() {
  return (
    <div className="h-screen p-8 bg-gray-50">
      {/* Título de la página */}
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Configuración</h1>

      {/* Sección Administrar suscripción */}
      <div className="card shadow-xl rounded-lg mb-8 bg-white p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Administrar suscripción
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Gestiona tu suscripción actual, cambia de plan, actualiza tus datos o
          cancela tu suscripción en cualquier momento.
        </p>

        {/* Mostrar plan actual */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md w-full sm:w-auto">
              <h3 className="text-lg font-semibold text-gray-900">
                Plan Actual
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Tu plan actual es el siguiente:
              </p>
              <p className="text-sm font-medium text-gray-900">Plan Básico</p>
              <p className="text-sm text-gray-500">Precio: $49.99/mes</p>
              <p className="text-xs text-gray-400">
                Renovación automática el 31 de diciembre
              </p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-6 flex-col sm:flex-row">
          <button className="btn w-full sm:w-auto py-3 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition">
            Cambiar plan
          </button>
          <button className="btn w-full sm:w-auto py-3 px-6 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition">
            Cancelar suscripción
          </button>
        </div>
      </div>

      {/* Sección Cambio de nombre de empresa */}
      <div className="card shadow-md rounded-lg mb-8 bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cambio de nombre de empresa
        </h2>
        <div className="flex items-center gap-6">
          <input
            type="text"
            value="Nombre de la Empresa"
            disabled
            className="input w-full bg-gray-100 text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="btn bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition">
            Actualizar
          </button>
        </div>
      </div>

      {/* Sección Cambio de contraseña */}
      <div className="card shadow-md rounded-lg mb-8 bg-white p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cambio de contraseña
        </h2>
        <div className="flex gap-6">
          <input
            type="password"
            placeholder="Nueva contraseña"
            className="input w-full bg-gray-100 text-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button className="btn bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700 transition">
            Actualizar contraseña
          </button>
        </div>
      </div>
    </div>
  );
}

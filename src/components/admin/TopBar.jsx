export default function TopBar({ title, isEditing, onSave, onCancel }) {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4 rounded-br-md">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        {isEditing && (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Debes guardar los cambios para que se apliquen en tu web, si no, se perderán"
          >
            <div className="badge badge-warning text-xs">
              Editando: cambios sin guardar
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-6">
        {/* botón de cancelar */}
        {isEditing && (
          <button
            className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md transition w-full sm:w-auto border-none"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        {/* botón de guardar */}
        <button
          className={`btn ${
            isEditing
              ? "bg-teal-500 hover:bg-teal-600"
              : "bg-orange-300 hover:bg-orange-400"
          } text-white px-6 py-3 rounded-md transition w-full sm:w-auto border-none`}
          onClick={onSave}
        >
          {isEditing ? "Guardar" : "Editar"}
        </button>
      </div>
    </div>
  );
}

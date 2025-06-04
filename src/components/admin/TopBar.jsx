export default function TopBar({
  title,
  isEditing,
  onSave,
  onCancel,
  showButtons = true,
}) {
  const isMobile = () => {
    return window.innerWidth < 768;
  };

  return (
    <div className="flex justify-between items-center bg-[#121a26] border-b border-[#1f1f1f] p-4 rounded-br-md text-white z-40">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-neutral-100 tracking-tight leading-snug">
          {title}
        </h1>
        {isEditing && !isMobile() && (
          <div
            className="tooltip tooltip-bottom"
            data-tip="Debes guardar los cambios para que se apliquen en tu web, si no, se perderán"
          >
            <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded-md">
              Editando: cambios sin guardar
            </span>
          </div>
        )}
      </div>

      {showButtons && (
        <div className="flex gap-6">
          {/* botón de cancelar */}
          {isEditing && (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium text-sm shadow-sm transition"
              onClick={onCancel}
            >
              Cancelar
            </button>
          )}
          {/* botón de guardar */}
          <button
            className={`px-4 py-2 rounded-md font-medium text-sm shadow-sm transition ${
              isEditing
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
            onClick={onSave}
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
      )}
    </div>
  );
}

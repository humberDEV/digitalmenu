import "@/styles/admin/scroll.css";

export default function PreviewMenu({ menuData, menuConfig }) {
  return (
    <div
      className={`mockup-phone border-black h-[85vh] w-full relative px-6 overflow-y-hidden ${menuConfig?.fontFamily?.class}`}
      style={{ backgroundColor: menuConfig.backgroundColor }}
    >
      {/* Contenedor principal con su propio scroll */}
      <div className="flex flex-col h-full w-full overflow-y-auto">
        {/* Contenedor interno para el scroll del contenido */}
        <div className="overflow-y-auto h-full w-full scroll-smooth no-scrollbar">
          {menuData.length > 0 ? (
            menuData.map((category) => (
              <div key={category.id} className="mb-6 mt-4">
                {/* Título de la categoría */}
                <h3
                  className="font-bold border-b pb-1 mb-4"
                  style={{
                    color: menuConfig.categoryTitleColor,
                    fontSize: `${menuConfig.categoryTitleSize}px`,
                  }}
                >
                  {category.name}
                </h3>
                <ul className="space-y-2">
                  {category.products.map((product) => (
                    <li key={product.id} className="flex flex-col">
                      {/* Contenedor del título y el precio */}
                      <div className="flex justify-between items-center">
                        <span
                          className="font-semibold"
                          style={{
                            color: menuConfig.productTitleColor,
                            fontSize: `${menuConfig.productTitleSize}px`,
                          }}
                        >
                          {product.name}
                        </span>
                        <span
                          className="font-medium"
                          style={{
                            color: menuConfig.productPriceColor,
                            fontSize: `${menuConfig.productPriceSize}px`,
                          }}
                        >
                          {product.price}€
                        </span>
                      </div>

                      {/* Descripción del producto */}
                      {product.description && (
                        <span
                          className="mt-1 text-sm"
                          style={{
                            color: menuConfig.productDescriptionColor,
                            fontSize: `${menuConfig.productDescriptionSize}px`,
                          }}
                        >
                          {product.description}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center">Menú vacío</p>
          )}
        </div>
      </div>
    </div>
  );
}

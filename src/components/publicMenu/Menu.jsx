// components/public/PublicMenu.jsx
export default function PublicMenu({ menuData, menuConfig }) {
  return (
    <main
      className={`min-h-screen w-full px-4 py-10 sm:px-8 overflow-x-hidden overscroll-none overflow-y-auto ${menuConfig?.fontFamily?.class}`}
      style={{ backgroundColor: menuConfig?.backgroundColor || "#fff" }}
    >
      {menuData?.length > 0 ? (
        menuData.map((category, i) => {
          return (
            <section key={category.id || category.name + i} className="mb-10">
              <h2
                className="font-bold border-b pb-2 mb-4"
                style={{
                  color: menuConfig?.categoryTitleColor,
                  fontSize: `${menuConfig?.categoryTitleSize}px`,
                }}
              >
                {category.name}
              </h2>
              <ul className="space-y-4">
                {category.products.map((product, j) => (
                  <li
                    key={`${category.name}-${product.name}-${j}`}
                    className="flex flex-col gap-1 min-h-[2.5rem]"
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className="font-medium"
                        style={{
                          color: menuConfig?.productTitleColor,
                          fontSize: `${menuConfig?.productTitleSize}px`,
                        }}
                      >
                        {product.name}
                      </span>
                      <span
                        className="font-semibold"
                        style={{
                          color: menuConfig?.productPriceColor,
                          fontSize: `${menuConfig?.productPriceSize}px`,
                        }}
                      >
                        {product.price} €
                      </span>
                    </div>
                    {product.description && (
                      <p
                        className="text-sm"
                        style={{
                          color: menuConfig?.productDescriptionColor,
                          fontSize: `${menuConfig?.productDescriptionSize}px`,
                        }}
                      >
                        {product.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      ) : (
        <p className="text-center text-gray-400">Menú vacío</p>
      )}
    </main>
  );
}

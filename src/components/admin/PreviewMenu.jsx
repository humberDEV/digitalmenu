export default function PreviewMenu({ menuData, menuConfig }) {
  return (
    <div className="mockup-phone border-black h-screen w-full bg-white relative ">
      <div className="flex flex-col text-black h-full w-full">
        <div className="overflow-y-auto h-full w-full p-4">
          {menuData.length > 0 ? (
            menuData.map((category) => (
              <div key={category.id} className="mb-6">
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <ul>
                  {category.products.map((product) => (
                    <li key={product.id} className="text-sm text-gray-800">
                      {product.name} - {product.price}€
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

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 mt-4 shadow-sm bg-gray-100">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-500 font-bold text-xl">{product.price}</p>
      </div>
      <p className="text-gray-500">{product.description}</p>
    </div>
  );
}



export function SingleCategory() {
  return (
    <div key={product._id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out w-64 mb-5">
      <img className="w-full object-cover" src={product.imageUrl} alt="Product Image" />
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-800 mb-1">{product.title}</h3>

        <div className="flex items-center justify-between">
          <span className="text-gray-900 text-sm font-bold">{product.unitPrice}₮</span>
        </div>
      </div>
    </div>
  );
}

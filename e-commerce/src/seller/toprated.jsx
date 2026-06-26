
function Toprated({ product, rank }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="bg-orange-500 text-white w-12 h-12 flex items-center justify-center rounded-lg font-bold">
          #{rank}
        </div>

        <img
          src={`https://e-commerce-backend-l9wv.onrender.com/product-image/${product.id}`}
          alt={product.name}
          className="w-14 h-14 rounded-lg object-cover"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/100";
          }}
        />

        <div>
          <h3 className="font-semibold text-gray-800">
            {product.name}
          </h3>

          <p className="text-sm text-yellow-500">
            ⭐{" "}
            {Number(
              product.rating || 0
            ).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-800">
          $
          {Number(
            product.price || 0
          ).toFixed(2)}
        </p>

        <p
          className={`text-sm ${
            product.stock > 5
              ? "text-green-600"
              : product.stock > 0
              ? "text-orange-500"
              : "text-red-500"
          }`}
        >
          {product.stock > 0
            ? `${product.stock} in stock`
            : "Out of stock"}
        </p>
      </div>
    </div>
  );
}

export default Toprated;
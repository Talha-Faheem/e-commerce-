import { CiStar } from "react-icons/ci";

function SmallCard({ product }) {
  return (
    <div className="mb-10 rounded-2xl min-w-[220px] border overflow-hidden group hover:shadow-lg bg-white">
      <div className="w-full h-[180px] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={`https://e-commerce-backend-l9wv.onrender.com/product-image/${product.id}`}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/300x300?text=No+Image";
          }}
        />
      </div>

      <div className="p-3">
        <h2 className="text-md font-semibold line-clamp-2">
          {product.name}
        </h2>

        <div className="flex items-center gap-2 mt-2">
          <CiStar />
          <span>
            {Number(
              product.rating || 0
            ).toFixed(1)}
          </span>
        </div>

        <h2 className="text-xl mt-3 font-semibold">
          ${product.price}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Sold: {product.sales || 0}
        </p>
      </div>
    </div>
  );
}

export default SmallCard;
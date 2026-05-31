
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { CiStar } from "react-icons/ci";

function ShoppingCard({ product }) {
  if (!product) return null;

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const customerId =
    user?.customer_id;

  const addToCart = async (e) => {
    e.preventDefault();

    if (!customerId) {
      alert("Please login first");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3000/cart/add",
        {
          customer_id: customerId,
          product_id: product.id,
          quantity: 1,
        }
      );

      alert("Added To Cart");
    } catch (error) {
      console.log(error);
      alert("Failed To Add Cart");
    }
  };

  const getImageUrl = () => {
    if (!product.thumbnail) {
      return "https://via.placeholder.com/320x270";
    }
    if (product.thumbnail.startsWith('http')) {
      return product.thumbnail;
    }
    return `data:image/jpeg;base64,${product.thumbnail}`;
  };

  return (
    <div className="mb-6 rounded-2xl lg:max-w-[320px] md:w-[43%] w-[90%] border overflow-hidden group hover:shadow-2xl duration-500">
      <Link
        to={`/customer/product/${product.id}`}
      >
        <div className="w-full h-[270px] overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={getImageUrl()}
            alt={product.name}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/320x270";
            }}
          />
        </div>

        <div className="px-4 py-3">
          <h2 className="text-lg font-semibold">
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

          <h2 className="text-2xl mt-3 font-semibold">
            ${product.price}
          </h2>

          <p
            className={`text-sm mt-1 ${
              product.stock > 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} In Stock`
              : "Out Of Stock"}
          </p>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={addToCart}
          disabled={product.stock <= 0}
          className="w-full flex items-center justify-center gap-3 bg-black text-white py-2 rounded-md disabled:bg-gray-400"
        >
          <FiShoppingCart />
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default ShoppingCard;


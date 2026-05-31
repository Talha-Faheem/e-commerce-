import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import EditProductModal from "./editproduct";

function Addproduct({ product, refreshProducts }) {
  const [showEdit, setShowEdit] = useState(false);

  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:3000/deleteproduct/${product.id}`
      );

      refreshProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const getImageUrl = () => {
    if (!product.thumbnail) {
      return "https://via.placeholder.com/400x300";
    }
    if (product.thumbnail.startsWith('http')) {
      return product.thumbnail;
    }
    return `data:image/jpeg;base64,${product.thumbnail}`;
  };

  return (
    <>
      <div className="mb-6 rounded-2xl lg:max-w-[320px] md:w-[43%] w-[90%] border overflow-hidden group duration-500 hover:shadow-2xl bg-white">
        <div className="w-full h-[270px] overflow-hidden">
          <img
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            src={getImageUrl()}
            alt={product.name}
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300";
            }}
          />
        </div>

        <div className="px-4 py-4">
          <h2 className="md:text-[20px] text-[16px] font-semibold mb-3 line-clamp-2">
            {product.name}
          </h2>

          <div className="flex flex-col gap-3">
            <div>
              <h2 className="md:text-2xl text-lg font-semibold">
                ${product.price}
              </h2>

              <p
                className={`text-sm font-medium ${
                  product.stock > 10
                    ? "text-green-500"
                    : product.stock > 0
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {product.stock > 10
                  ? `${product.stock} In Stock`
                  : product.stock > 0
                  ? `Low Stock (${product.stock})`
                  : "Out Of Stock"}
              </p>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setShowEdit(true)}
                className="w-[74%] flex gap-3 items-center justify-center bg-black rounded-md text-white py-2 hover:bg-gray-800"
              >
                <FaEdit />
                Edit
              </button>

              <button
                onClick={deleteProduct}
                className="w-[18%] flex items-center justify-center rounded-lg bg-red-200 text-red-600 py-2 hover:bg-red-300"
              >
                <RiDeleteBin5Line />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProductModal
          product={product}
          refreshProducts={refreshProducts}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}

export default Addproduct;

import React, { useState } from "react";
import axios from "axios";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import EditProductModal from "./editproduct";

function Addproduct({
  product,
  refreshProducts,
}) {
  const [showEdit, setShowEdit] =
    useState(false);

  const deleteProduct =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete this product?"
        );

      if (!confirmDelete)
        return;

      try {
        await axios.delete(
          `http://localhost:3000/deleteproduct/${product.id}`
        );

        refreshProducts();
      } catch (err) {
        console.log(err);
      }
    };

  const imageUrl = `http://localhost:3000/product-image/${product.id}`;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border w-[320px]">
        <div className="h-[250px] overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x300?text=No+Image";
            }}
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold">
            {product.name}
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            {product.description}
          </p>

          <div className="mt-3">
            <p className="text-2xl font-bold">
              ${product.price}
            </p>

            <p className="text-green-600">
              Stock:{" "}
              {product.stock || 0}
            </p>

            <p className="text-blue-600">
              Reserved:{" "}
              {product.reserved_stock ||
                0}
            </p>

            <p className="text-gray-500 text-sm">
              Warehouse:{" "}
              {product.warehouse_location ||
                "N/A"}
            </p>
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() =>
                setShowEdit(true)
              }
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaEdit />
              Edit
            </button>

            <button
              onClick={
                deleteProduct
              }
              className="bg-red-100 text-red-600 px-4 py-2 rounded-lg"
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <EditProductModal
          product={product}
          refreshProducts={
            refreshProducts
          }
          onClose={() =>
            setShowEdit(false)
          }
        />
      )}
    </>
  );
}

export default Addproduct;
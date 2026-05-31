import React, { useState } from "react";
import {
  FaPlus,
  FaCircleExclamation,
} from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import Addproduct from "./addproduct";
import AddProductModal from "./addProductModel";

function Inventory({
  data,
  refreshProducts,
}) {
  const [search, setSearch] =
    useState("");

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const [
    stockFilter,
    setStockFilter,
  ] = useState("");

  const products =
    data?.products || [];

  const lowStock =
    products.filter(
      (item) =>
        item.stock > 0 &&
        item.stock <= 5
    );

  const outOfStock =
    products.filter(
      (item) => item.stock === 0
    );

  const totalStock =
    products.reduce(
      (sum, item) =>
        sum +
        Number(
          item.stock || 0
        ),
      0
    );

  const filteredProducts =
    products.filter(
      (product) => {
        const matchesSearch =
          product.name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) || false;

        const matchesStock =
          stockFilter === ""
            ? true
            : stockFilter ===
              "available"
            ? product.stock > 5
            : stockFilter ===
              "low"
            ? product.stock > 0 &&
              product.stock <= 5
            : product.stock === 0;

        return (
          matchesSearch &&
          matchesStock
        );
      }
    );

  return (
    <>
      <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5">
        <div className="w-full flex justify-between items-center">
          <div>
            <h2 className="text-xl font-medium mb-2">
              Inventory
              Management
            </h2>

            <p className="text-gray-500">
              Manage your
              products and stock
              levels
            </p>
          </div>

          <button
            onClick={() =>
              setShowAddModal(
                true
              )
            }
            className="flex gap-3 p-3 items-center rounded-lg bg-purple-600 text-white hover:bg-purple-700"
          >
            <FaPlus />

            <p>
              Add Product
            </p>
          </button>
        </div>

        <div className="flex justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] rounded-lg border-green-300 border-2 p-4 shadow-sm bg-white">
            <h2>
              Total Products
            </h2>

            <h2 className="text-3xl font-bold">
              {products.length}
            </h2>

            <p className="text-sm text-green-500">
              {totalStock} units
              in inventory
            </p>
          </div>

          <div className="flex-1 min-w-[250px] rounded-lg border-yellow-300 border-2 p-4 shadow-sm bg-white">
            <h2>
              Low Stock
            </h2>

            <h2 className="text-3xl font-bold text-yellow-500">
              {lowStock.length}
            </h2>

            <p className="text-sm text-yellow-500">
              Items below 5
              units
            </p>
          </div>

          <div className="flex-1 min-w-[250px] rounded-lg border-red-300 border-2 p-4 shadow-sm bg-white">
            <h2>
              Out Of Stock
            </h2>

            <h2 className="text-3xl font-bold text-red-500">
              {
                outOfStock.length
              }
            </h2>

            <p className="text-sm text-red-500">
              Needs
              restocking
            </p>
          </div>
        </div>

        {lowStock.length >
          0 && (
          <div className="flex gap-5 p-4 bg-yellow-100 rounded-lg w-full px-6">
            <FaCircleExclamation className="text-white bg-yellow-400 p-2 text-4xl rounded-md" />

            <div>
              <h4 className="text-yellow-800 font-medium text-lg">
                Low Stock
                Alert
              </h4>

              <p className="text-yellow-800">
                {
                  lowStock.length
                }{" "}
                product(s)
                need
                restocking
                soon.
              </p>
            </div>
          </div>
        )}

        <div className="w-full rounded-lg bg-white shadow-md p-4 flex flex-col gap-5 mb-6">
          <div className="flex justify-between gap-4">
            <div className="flex items-center rounded-lg p-2 gap-3 bg-gray-200 flex-1">
              <IoSearch className="text-gray-500" />

              <input
                value={
                  search
                }
                onChange={(
                  e
                ) =>
                  setSearch(
                    e.target
                      .value
                  )
                }
                className="outline-none bg-gray-200 text-md font-normal w-full"
                type="text"
                placeholder="Search products..."
              />
            </div>

            <div className="w-[180px]">
              <select
                value={
                  stockFilter
                }
                onChange={(
                  e
                ) =>
                  setStockFilter(
                    e.target
                      .value
                  )
                }
                className="w-full rounded-md text-md p-2 border"
              >
                <option value="">
                  All Stock
                </option>

                <option value="available">
                  In Stock
                </option>

                <option value="low">
                  Low Stock
                </option>

                <option value="out">
                  Out Of Stock
                </option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            {filteredProducts.length >
            0 ? (
              filteredProducts.map(
                (
                  product
                ) => (
                  <Addproduct
                    key={
                      product.id
                    }
                    product={
                      product
                    }
                    refreshProducts={
                      refreshProducts
                    }
                  />
                )
              )
            ) : (
              <div className="w-full text-center py-10 text-gray-500">
                No products
                found
              </div>
            )}
          </div>
        </div>
      </div>

      {showAddModal && (
        <AddProductModal
          refreshProducts={
            refreshProducts
          }
          onClose={() =>
            setShowAddModal(
              false
            )
          }
        />
      )}
    </>
  );
}

export default Inventory;


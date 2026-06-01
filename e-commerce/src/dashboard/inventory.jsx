import React, {
  useState,
  useMemo,
} from "react";

import { FaPlus } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
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
    stockFilter,
    setStockFilter,
  ] = useState("");

  const [
    showAddModal,
    setShowAddModal,
  ] = useState(false);

  const products =
    data?.products || [];

  const lowStock =
    useMemo(
      () =>
        products.filter(
          (product) =>
            Number(
              product.stock
            ) > 0 &&
            Number(
              product.stock
            ) <= 5
        ),
      [products]
    );

  const outOfStock =
    useMemo(
      () =>
        products.filter(
          (product) =>
            Number(
              product.stock
            ) === 0
        ),
      [products]
    );

  const totalStock =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.stock || 0
        ),
      0
    );

  const reservedStock =
    products.reduce(
      (sum, product) =>
        sum +
        Number(
          product.reserved_stock ||
            0
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
            ) ||
          product.category_name
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesStock =
          stockFilter === ""
            ? true
            : stockFilter ===
              "available"
            ? Number(
                product.stock
              ) > 5
            : stockFilter ===
              "low"
            ? Number(
                product.stock
              ) > 0 &&
              Number(
                product.stock
              ) <= 5
            : Number(
                product.stock
              ) === 0;

        return (
          matchesSearch &&
          matchesStock
        );
      }
    );

  return (
    <>
      <div className="w-[90%] mx-auto mt-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              Inventory
              Management
            </h2>

            <p className="text-gray-500">
              Manage products
              and inventory
            </p>
          </div>

          <button
            onClick={() =>
              setShowAddModal(
                true
              )
            }
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg"
          >
            <FaPlus />
            Add Product
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="bg-white border-2 border-green-300 rounded-lg p-4">
            <h3>
              Total Products
            </h3>

            <h2 className="text-3xl font-bold">
              {products.length}
            </h2>

            <p className="text-green-600 text-sm">
              {totalStock} units
            </p>
          </div>

          <div className="bg-white border-2 border-blue-300 rounded-lg p-4">
            <h3>
              Reserved Stock
            </h3>

            <h2 className="text-3xl font-bold text-blue-500">
              {
                reservedStock
              }
            </h2>

            <p className="text-blue-500 text-sm">
              Reserved units
            </p>
          </div>

          <div className="bg-white border-2 border-yellow-300 rounded-lg p-4">
            <h3>
              Low Stock
            </h3>

            <h2 className="text-3xl font-bold text-yellow-500">
              {
                lowStock.length
              }
            </h2>

            <p className="text-yellow-500 text-sm">
              Less than 5
              units
            </p>
          </div>

          <div className="bg-white border-2 border-red-300 rounded-lg p-4">
            <h3>
              Out Of Stock
            </h3>

            <h2 className="text-3xl font-bold text-red-500">
              {
                outOfStock.length
              }
            </h2>

            <p className="text-red-500 text-sm">
              Need restocking
            </p>
          </div>
        </div>

        {lowStock.length >
          0 && (
          <div className="flex gap-4 bg-yellow-100 p-4 rounded-lg">
            <FaCircleExclamation className="text-4xl text-yellow-500" />

            <div>
              <h3 className="font-semibold text-yellow-700">
                Low Stock Alert
              </h3>

              <p className="text-yellow-700">
                {
                  lowStock.length
                }{" "}
                product(s)
                need
                restocking.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white p-5 rounded-lg shadow">
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg flex-1">
              <IoSearch />

              <input
                type="text"
                placeholder="Search products..."
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
                className="bg-transparent outline-none w-full"
              />
            </div>

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
              className="border rounded-lg px-3 py-2"
            >
              <option value="">
                All Stock
              </option>

              <option value="available">
                Available
              </option>

              <option value="low">
                Low Stock
              </option>

              <option value="out">
                Out Of Stock
              </option>
            </select>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
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
                No Products
                Found
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
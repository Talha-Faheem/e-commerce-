
import React, { useEffect, useState } from "react";
import Shoppingcard from "./Shoppingcard";
import { CiStar } from "react-icons/ci";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [sortBy, setSortBy] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/products"
      );

      const data = await res.json();

      setProducts(data.products || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.log(error);
      setProducts([]);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  let filteredProducts = [...products];

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (item) =>
        Number(item.category_id) ===
        Number(selectedCategory)
    );
  }

  if (minRating > 0) {
    filteredProducts = filteredProducts.filter(
      (item) =>
        Number(item.rating || 0) >= minRating
    );
  }

  if (sortBy === "low") {
    filteredProducts.sort(
      (a, b) =>
        Number(a.price) - Number(b.price)
    );
  }

  if (sortBy === "high") {
    filteredProducts.sort(
      (a, b) =>
        Number(b.price) - Number(a.price)
    );
  }

  return (
    <div className="w-[94%] mt-5 mx-auto flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">
            All Products
          </h2>

          <p>
            {filteredProducts.length} results
          </p>
        </div>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          className="border-2 p-2 rounded-md"
        >
          <option value="">
            Featured
          </option>

          <option value="low">
            Price Low To High
          </option>

          <option value="high">
            Price High To Low
          </option>
        </select>
      </div>

      <div className="flex gap-3 overflow-x-auto scrollbar-hide">
        <button
          onClick={() =>
            setSelectedCategory("all")
          }
          className={`px-3 py-1 rounded-md ${
            selectedCategory === "all"
              ? "bg-black text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              setSelectedCategory(category.id)
            }
            className={`px-3 py-1 rounded-md ${
              Number(selectedCategory) ===
              Number(category.id)
                ? "bg-black text-white"
                : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="flex md:gap-2 lg:gap-10">
        <div className="w-[24%] hidden lg:flex flex-col gap-5 border-2 rounded-lg items-center py-4 h-fit sticky top-[120px]">
          <div className="w-[90%]">
            <h3 className="text-xl font-medium">
              Filters
            </h3>
          </div>

          <div className="border-t-2 w-[90%] pt-4">
            <h3 className="mb-4">
              Minimum Rating
            </h3>

            {[5, 4, 3, 2, 1].map(
              (rating) => (
                <button
                  key={rating}
                  onClick={() =>
                    setMinRating(rating)
                  }
                  className="flex items-center gap-2 mb-2 hover:bg-gray-100 px-2 py-2 rounded-md w-full"
                >
                  <CiStar />
                  {rating}+ Stars
                </button>
              )
            )}

            <button
              onClick={() => {
                setMinRating(0);
                setSelectedCategory(
                  "all"
                );
                setSortBy("");
              }}
              className="mt-5 w-full bg-red-100 py-2 rounded-md"
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div className="lg:w-[75%] w-full flex flex-wrap gap-6 justify-center lg:justify-start">
          {loading ? (
            <h2>Loading Products...</h2>
          ) : filteredProducts.length >
            0 ? (
            filteredProducts.map(
              (product) => (
                <Shoppingcard
                  key={product.id}
                  product={product}
                />
              )
            )
          ) : (
            <div className="w-full text-center py-10">
              No Products Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;

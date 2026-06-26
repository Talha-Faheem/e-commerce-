import { useEffect, useState } from "react";
import { BsGraphUpArrow } from "react-icons/bs";
import { CiStar } from "react-icons/ci";

import Banner1 from "../assests/banner1.jpg";

import Categorybox from "./categorybox";
import Shoppingcard from "./Shoppingcard";
import Smallcard from "./smallcard";

function MainPages() {
  const [homeData, setHomeData] = useState({
    categories: [],
    featured: [],
    trending: [],
  });

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const res = await fetch(
          "https://e-commerce-backend-l9wv.onrender.com/homepage"
        );

        const data = await res.json();
        console.log(data)

        setHomeData(data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    getHomeData();
  }, []);

  return (
    <main className="w-full flex flex-col items-center">
      {/* Banner */}
      <div className="w-[90%] max-h-[500px] overflow-hidden rounded-2xl my-10 relative">
        <img
          className="w-full h-full object-cover"
          src={Banner1}
          alt="Banner"
        />

        <div className="absolute inset-0 bg-black/20 text-white font-semibold flex flex-col items-center justify-center gap-5">
          <div className="flex flex-col items-center">
            <h1 className="md:text-6xl text-4xl">
              Spring Sale
            </h1>

            <h3 className="mt-3 md:text-2xl text-lg">
              Up to 50% off on selected items
            </h3>
          </div>

          <button className="md:p-4 p-2 md:text-lg text-md text-black bg-white rounded-lg">
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="w-[90%] mb-10 flex flex-col gap-6">
        <h2 className="text-2xl font-semibold">
          Shop by Category
        </h2>

        <div className="flex gap-7 overflow-x-auto scrollbar-hide">
          {homeData.categories?.map((category) => (
            <Categorybox
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="flex justify-between items-center w-[90%] mb-5">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          <CiStar />
          Featured Products
        </h2>
      </div>

      <div className="w-[90%] flex flex-wrap gap-7 justify-center">
        {homeData.featured?.map((product) => (
          <Shoppingcard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* Trending Products */}
      <div className="flex justify-between items-center w-[90%] mt-10 mb-5">
        <h2 className="text-2xl font-semibold flex items-center gap-3">
          <BsGraphUpArrow />
          Trending Now
        </h2>
      </div>

      <div className="w-[90%] flex gap-5 overflow-x-auto scrollbar-hide pb-5">
        {homeData.trending?.map((product) => (
          <Smallcard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </main>
  );
}

export default MainPages;

import React from "react";

function CategoryBox({ category }) {
  return (
    <div className="xl:w-[18%] md:min-w-[250px] md:h-[180px] min-w-[200px] h-[130px] rounded-2xl overflow-hidden relative group">
      <img
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        src={
          category.image ||
          "https://via.placeholder.com/300"
        }
        alt={category.name}
      />

      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-500"></div>

      <div className="absolute bottom-2 w-full flex flex-col items-center text-white font-semibold">
        <h3 className="text-2xl">
          {category.name}
        </h3>

        <p>
          {category.product_count || 0} items
        </p>
      </div>
    </div>
  );
}

export default CategoryBox;


import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaCircleExclamation } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import Addproduct from "./addproduct";
// import header from "./header2";

function inventory() {
  return (
    <>
    {/* <header/> */}
    <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5 ">
      <div className="w-full flex justify-between items-center">
        <div>
          <h2 className="text-xl font font-medium mb-2">
            Inventory Management
          </h2>
          <p className="text-gray-500 ">
            Manage your product catalog and stock levels
          </p>
        </div>
        <div>
          <button className="flex gap-3 p-3 items-center rounded-lg bg-purple-600 text-white">
            <FaPlus />
            <p>Add product</p>
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[32%] rounded-lg border-gray-200 border-2 p-4 shadow-sm">
          <h2>Total Products</h2>
          <h2 className="text-3xl">6</h2>
          <p className="text-sm text-green-400">Active listings</p>
        </div>

        <div className="w-[32%] rounded-lg border-gray-200 border-2 p-4 shadow-sm">
          <h2>Total Products</h2>
          <h2 className="text-3xl">6</h2>
          <p className="text-sm text-green-400">Active listings</p>
        </div>

        <div className="w-[32%] rounded-lg border-gray-200 border-2 p-4 shadow-sm">
          <h2>Total Products</h2>
          <h2 className="text-3xl">6</h2>
          <p className="text-sm text-green-400">Active listings</p>
        </div>
      </div>

      <div className="flex gap-5 p-4 bg-yellow-100 rounded-lg w-full mx-auto px-6 ">
        <div>
          <FaCircleExclamation className=" text-white bg-yellow-400 p-2 text-4xl rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-yellow-800 font-medium text-lg">
            Low Stock Alert
          </h4>
          <p className="text-yellow-800 ">1 product running low on inventory</p>
        </div>
      </div>

      <div className="w-full rounded-lg bg-white shadow-md min-h-[100px] p-4 flex flex-col gap-5  mb-6">
        <div className="flex justify-between ">
          <div className=" flex  items-center rounded-lg p-2 gap-3 bg-gray-200 w-[65%] ">
            <IoSearch className="text-gray-500" />
            <input
              className="outline-none bg-gray-200 text-md font-normal xl:w-[280px] lg:w-[220px] md:w-[250px] "
              type="text"
              placeholder="Search here ...."
            />
          </div>

          <div className="w-[15%]">
            <select
              name=""
              id=""
              className="w-full rounded-md text-md p-2 border"
            >
              <option value="category">Category</option>
            </select>
          </div>
          <div className="w-[15%]">
            <select
              name=""
              id=""
              className="w-full rounded-md text-md p-2 border"
            >
              <option value="Rated">Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-4 flex-wrap ">
          <Addproduct />
          <Addproduct />
          <Addproduct />
          <Addproduct />
        </div>
      </div>
    </div>
    </>
  );
}

export default inventory;

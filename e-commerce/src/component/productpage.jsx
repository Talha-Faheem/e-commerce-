import React from 'react'
import Shoppingcard from "./Shoppingcard"
import { CiStar } from "react-icons/ci";
function prouductpage() {
  return (
    <div className="w-[94%] mt-5 mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-center ">
            <div>
              <h2 className="text-xl  font-semibold">All Product</h2>
          <p className='md:text-md text-sm'>6 results</p>
            </div>
            <div >
              <select className="border-2 md:p-2 p-1  hover:border-black rounded-md md:w-[130px] md:h-[42px] w-[100px] h-[34] md:text-md text-sm" name="" id="">
                <option value="">Features </option>
                <option value="">low to low </option>
                <option value="">High to low </option>
                <option value="">High to low </option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mb-4 overflow-y-scroll scrollbar-hide">
            <button className="px-3 py-1 text-white bg-black font-medium rounded-md md:text-lg border text-sm border-white hover:border-black">All</button>
            <button className="px-3 py-1 text-black bg-gray-200 font-medium rounded-md md:text-lg border text-sm border-white hover:border-black">Electronics</button>
            <button className="px-3 py-1 text-black bg-gray-200 font-medium rounded-md  md:text-lg border text-sm border-white hover:border-black">Fashion</button>
            <button className="px-3 py-1 text-black bg-gray-200 font-medium rounded-md   md:text-lg border text-sm border-white hover:border-black">Home&Garden</button>
            <button className="px-3 py-1 text-black bg-gray-200 font-medium rounded-md  md:text-lg border text-sm border-white hover:border-black">Sports</button>
            <button className="px-3 py-1 text-black bg-gray-200 font-medium rounded-md  md:text-lg border text-sm border-white hover:border-black">Books</button>
          </div>

          <div className="flex md:gap-2 lg:gap-10">
            <div className="w-[24%] hidden lg:flex flex-col gap-5 border-2 rounded-lg items-center py-4 overflow-hidden h-[470px] sticky top-[120px]">
              <div className="w-[90%] flex flex-col gap-3">
                <h3 className="text-xl font-medium">Filters</h3>
              <div className="w-[90%]">
                <p>Price Range</p>
                <input className="w-full" type="range" />
                <div className="flex justify-between">
                  <p>$0</p>
                  <p>$1000</p>
                </div>
              </div>
              </div>
                
              <div className="border-t-2 w-[90%] ">
                <h3 className="mt-3 font-medium">Minimum Rating</h3>
                <div className="flex flex-col gap-3 mt-4">
                  <div className="flex items-center w-[80%] bg-gray-200 px-2 py-1 rounded-md border border-black ">
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <p className="ml-3">& Up</p>
                </div>
                <div className="flex items-center w-[80%] hover:bg-gray-200 px-2 py-1 rounded-md select:border select:border-black ">
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <p className="ml-3">& Up</p>
                </div>
                <div className="flex items-center w-[80%] hover:bg-gray-200 px-2 py-1 rounded-md select:border select:border-black  ">
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <p className="ml-3">& Up</p>
                </div>
                <div className="flex items-center w-[80%] hover:bg-gray-200 px-2 py-1 rounded-md select:border select:border-black ">
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <CiStar/>
                  <p className="ml-3">& Up</p>
                </div>
                </div>
              </div>

              <div className="border-t-2 w-[90%] ">
                  <h3 className="my-3 w-[80%] mx-auto py-2 hover:bg-red-200 rounded-md flex justify-center">Clear-Filter</h3>
              </div>
            </div>


            <div className="lg:w-[75%] w-full flex gap-2 flex-wrap md:justify-start justify-center">
              <Shoppingcard/>
              <Shoppingcard/>
              <Shoppingcard/>
              <Shoppingcard/>
            </div>
          </div>
        </div>
  )
}

export default prouductpage
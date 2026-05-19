import React from 'react'
import Headphone from "../assests/headphone.jpg";
import { FiShoppingCart } from "react-icons/fi";

import { CiStar } from "react-icons/ci";
function card() {
  return (
    <div className="mb-6 rounded-2xl lg:max-w-[320px]  md:w-[43%] w-[90%]   h-70vh flex flex-col md:gap-3 gap-1 justify-center border overflow-hidden group duration-600 hover:shadow-2xl">
        <div className="w-full md:h-[270px]  overflow-hidden  " >
          <img className="w-full h-auto object-cover object-center group-hover:scale-110 ease-in-out transition-transform duration-700" src={Headphone} alt="" />
        </div>
        
          <div className="px-3">
            <h2 className="md:text-[20px] text-[15px] font-semibold md:mb-5 mb-2">Wireless Headphones Pro</h2>
          <div className="flex flex-col md:gap-4  gap-2">
            <div className="flex items-center text-sm md:text-md">
            <CiStar />
            <CiStar/>
            <CiStar/>
            <CiStar/>
            <CiStar/>
            <p>(4.5)</p>
          </div>
          <div>
            <h2 className="md:text-2xl text-lg mb-1">$199.99</h2>
          <p className="md:text-md text-xs text-green-500">in-stock</p>
          </div>
          <button className=" w-[98%] md:text-lg text-sm flex gap-3  items-center justify-center bg-black rounded-md text-white py-2 mx-auto"><FiShoppingCart/>Add to Cart</button>
          <p className="md:text-md text-xs mb-4 mx-auto">by starseller</p>
          </div>
          </div>
         
        </div>
  )
}

export default card
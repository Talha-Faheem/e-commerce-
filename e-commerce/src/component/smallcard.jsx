import React from 'react'
import { CiStar } from "react-icons/ci";
import Headphone from "../assests/headphone.jpg";
import { FiShoppingCart } from "react-icons/fi";
function smallcard() {
  return (
    <div className="mb-20 rounded-2xl min-w-[210px] flex flex-col gap-2 justify-center border overflow-hidden group hover:shadow-md">
                <div className="w-full  overflow-hidden  " >
                  <img className="w-full h-auto object-cover object-center group-hover:scale-110 ease-in-out transition-transform duration-700 " src={Headphone} alt="" />
                </div>
                
                  <div className="px-3">
                    <h2 className="text-md font-semibold">Wireless Headphones Pro</h2>
                  <div className="flex flex-col gap-3 ">
                    <div className="flex gap-2  items-center">
                    <CiStar />
                   
                    <p>(4.5)</p>
                  </div>
                 
                    <h2 className="text-xl mb-3">$199.99</h2>
                  </div>
                  </div>
                 
                </div>
  )
}

export default smallcard
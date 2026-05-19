import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import Headphone from "../assests/headphone.jpg";
import { FiBox } from "react-icons/fi";
import { FaTruck } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaListCheck } from "react-icons/fa6";
import { CiStar } from "react-icons/ci";
function productdetial() {
  return (
    <div className="w-[90%] mt-5 mx-auto flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <IoMdArrowRoundBack size={22}/>
          Back Catelog
        </div>

        <div className="flex gap-16 flex-wrap">

          <div className="w-[46%] min-w-[500px] h-[520px] overflow-hidden rounded-2xl">
              <img className="object-cover object-center" src={Headphone} alt="" />
          </div>
          <div className="w-[44%]  text-gray-500 flex flex-col gap-4">
              <h2 className="text-2xl text-black font-semibold"> Wireless Headphones Pro</h2>
              <div className="flex gap-0.5 items-center text-black">
                <CiStar/>
                <CiStar/>
                <CiStar/>
                <CiStar/>
                <CiStar/>
                <p>4.5 (1 reviews)</p>

              </div>
                <h2 className="text-3xl font-normal text-black">$199.99</h2>
                <p className="text-md">Premium noise-canceling wireless headphones with 30-hour battery life</p>

                <div className="flex flex-col gap-3">
                  <p className="flex gap-3 items-center text-gray-800"> <FiBox color="gray"/> Stock: <span className="text-green-400">45 available</span></p>
                  <p className="flex gap-3 items-center text-gray-800"> <FaTruck color="gray"/> Free shipping on orders over $50</p>
                  <p>Sold by: <span className="text-gray-800"> Tech Solutions Inc</span> </p>
                  <p>Category: <span className="text-gray-800">Electronics</span> </p>
                </div>
                <div className="flex items-end gap-8 w-full">
                  <div >
                    <p className="text-lg text-black font-semibold mb-2">Quantity</p>
                    <input className="py-1.5 w-[55px] border-2 border-black text-black rounded-md px-1" type="number" defaultValue={1} />
                  </div>
                  <button className="w-[60%] py-2 rounded-md gap-3 flex items-center text-xl text-white bg-black font-semibold justify-center"><FiShoppingCart/> <p>Add cart</p></button>
                </div>

          
                <div className="border-t border-gray-600 text-black mt-4">
                  <h2 className="text-xl font-semibold mt-3">Customer Review</h2>

                  <div className="flex flex-col gap-4 my-5">
                    
                      <div className="bg-gray-200 rounded-md w-[90%] px-3 py-2">
                      <div className="text-lg flex  items-center font-semibold mb-1">
                        <CiStar size={15}/>
                        <CiStar size={15}/>
                        <CiStar size={15}/>
                        <CiStar size={15}/>
                        <CiStar size={15}/>
                        <h3 className="ml-2">John Doe <span className="text-xs font-normal ml-3">2026-04-10</span></h3></div>
                      <p>Excellent sound quality and comfort!</p>


                    </div>
                  </div>
                </div>


                <div className="text-lg text-black font-medium border border-gray-500 rounded-md px-3 w-[90%] gap-3 flex  flex-col py-2 mb-8 ">
                  <h3>Write a Review</h3>
                  <h3 className="text-sm">Rating</h3>
                  <div className="flex ">
                    <CiStar/>
                    <CiStar/>
                    <CiStar/>
                    <CiStar/>
                    <CiStar/>
                  </div>
                  <div>
                    <h3 className="text-sm">Your Review</h3>
                    <textarea className="mt-2 font-normal w-[95%] rounded-md resize-none p-2 border-2" rows={4} placeholder="Write your review ....." name="" id=""></textarea>
                  </div>
                  <button className="p-2 text-white bg-black rounded-md">Submit button</button>
                </div>
          </div> 
        </div>


      </div>
  )
}

export default productdetial
import React from 'react'
import Headphone from "../assests/headphone.jpg";
function toprated() {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500 text-white px-4 py-3 rounded-lg font-bold">
                  #1
                </div>

                <img
                  src={Headphone}
                  alt="product"
                  className="w-14 h-14 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Running Shoes Ultra
                  </h3>
                  <p className="text-sm text-yellow-500">⭐ 4.8</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">$129.99</p>
                <p className="text-sm text-gray-500">12 in stock</p>
              </div>
            </div>
  )
}

export default toprated
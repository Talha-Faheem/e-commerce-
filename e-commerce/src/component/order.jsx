import React from 'react'
import { FaTruck } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";
function order() {
  return (
    <div className="w-[90%]  mt-5 mx-auto flex flex-col gap-4">
        <h2 className="text-xl mb-4 text-black font-medium">Order History</h2>

        <div className="flex flex-col gap-4">
          <div className="w-full  mx-auto bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Order #01</h2>

                  <span className="flex items-center gap-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                    <FaTruck size={14} />
                    Shipped
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">2026-04-15</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold">$199.99</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-800">Wireless Headphones Pro x1</p>

              <p className="text-right text-gray-700 mt-1">$199.99</p>
            </div>

            <div className="border-t my-4"></div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery Address:</span> 123 Main
              St, New York, NY 10001
            </p>
          </div>
          <div className="w-full  mx-auto bg-white rounded-xl border border-gray-200 p-5 shadow-sm">

            <div className="flex justify-between items-start">

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">Order #02</h2>

                  <span className="flex items-center gap-2 text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                    <FaBox size={14} />
                    Pending
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">2026-04-15</p>
              </div>

              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold">$199.99</p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-gray-800">Wireless Headphones Pro x1</p>

              <p className="text-right text-gray-700 mt-1">$199.99</p>
            </div>

            <div className="border-t my-4"></div>

            <p className="text-sm text-gray-600">
              <span className="font-medium">Delivery Address:</span> 123 Main
              St, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
  )
}

export default order
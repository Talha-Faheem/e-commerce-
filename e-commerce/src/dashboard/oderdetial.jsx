import React from "react";
import { FaTruck, FaClock, FaCheck, FaUser, FaMapMarkerAlt, FaCalendar } from "react-icons/fa";

export default function OrderDetails() {
  return (
    <div className="w-full   bg-gray-100 rounded-2xl shadow p-0 overflow-hidden">


      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-lg">
            <FaTruck />
          </div>
          <div>
            <p className="text-sm opacity-80">Order #o1</p>
            <h2 className="text-xl font-semibold">Shipped</h2>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-80">Order Total</p>
          <p className="text-2xl font-bold">$199.99</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-8">

          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <FaClock />
            </div>
            <p className="text-sm mt-2">Order Placed</p>
          </div>

          <div className="flex-1 h-[2px] bg-blue-500 mx-4"></div>


          <div className="flex flex-col items-center">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <FaTruck />
            </div>
            <p className="text-sm mt-2">In Transit</p>
          </div>

          <div className="flex-1 h-[2px] bg-gray-300 mx-4"></div>


          <div className="flex flex-col items-center">
            <div className="bg-gray-300 text-gray-500 p-3 rounded-full">
              <FaCheck />
            </div>
            <p className="text-sm mt-2 text-gray-500">Delivered</p>
          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">


          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <FaUser />
              <span>Customer</span>
            </div>
            <p className="font-semibold">Alice Johnson</p>
          </div>

     
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <FaMapMarkerAlt />
              <span>Delivery Address</span>
            </div>
            <p>123 Main St, New York, NY 10001</p>
          </div>

 
          <div>
            <div className="flex items-center gap-2 text-gray-500 mb-1">
              <FaCalendar />
              <span>Order Date</span>
            </div>
            <p>2026-04-15</p>
          </div>

        </div>


        <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 px-3 py-1 rounded">1x</span>
            <p>Wireless Headphones Pro</p>
          </div>
          <p className="font-semibold">$199.99</p>
        </div>


        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition">
          Mark as Completed
        </button>

      </div>
    </div>
  );
}
import React from "react";
import { FaMapMarkerAlt, FaCreditCard } from "react-icons/fa";

export default function Checkout() {
  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 md:px-10 py-6">

    
      <p className="text-sm text-gray-500 mb-4 cursor-pointer">
         Back to cart
      </p>

      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

  
        <div className="lg:col-span-2 space-y-6">

          
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-black text-white p-3 rounded-full">
                <FaMapMarkerAlt />
              </div>
              <h2 className="text-lg font-semibold">Delivery Address</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Street Address</label>
                <input className="w-full border rounded-lg p-3 mt-1 outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>City</label>
                  <input className="w-full border rounded-lg p-3 mt-1" />
                </div>
                <div>
                  <label>State</label>
                  <input className="w-full border rounded-lg p-3 mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>ZIP Code</label>
                  <input className="w-full border rounded-lg p-3 mt-1" />
                </div>
                <div>
                  <label>Country</label>
                  <input className="w-full border rounded-lg p-3 mt-1" />
                </div>
              </div>

              <button className="w-full bg-black text-white py-3 rounded-lg mt-4">
                Continue to Payment
              </button>
            </div>
          </div>

          
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-black text-white p-3 rounded-full">
                <FaCreditCard />
              </div>
              <h2 className="text-lg font-semibold">Payment Information</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label>Card Number</label>
                <input
                  placeholder="1234 5678 9012 3456"
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label>Cardholder Name</label>
                <input className="w-full border rounded-lg p-3 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>Expiry Date</label>
                  <input placeholder="MM/YY" className="w-full border rounded-lg p-3 mt-1" />
                </div>
                <div>
                  <label>CVV</label>
                  <input placeholder="123" className="w-full border rounded-lg p-3 mt-1" />
                </div>
              </div>

              <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-4">
                Place Order
              </button>
            </div>
          </div>

        </div>

        
        <div className="bg-white rounded-xl border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-600">
            <p>Smart Watch Series X x1</p>
            <p>$349.99</p>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-sm text-gray-600">
            <p>Subtotal</p>
            <p>$349.99</p>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <p>Shipping</p>
            <p className="text-green-600">Free</p>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p>$349.99</p>
          </div>
        </div>

      </div>
    </div>
  );
}
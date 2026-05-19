import React from 'react'
import { FaBox } from "react-icons/fa";
function Recentorder() {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-200 p-3 rounded-lg">
                      <FaBox className="text-gray-600" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-800">Order #o1</h3>
                      <p className="text-sm text-gray-500">Alice Johnson</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-800">$199.99</p>
                    <p className="text-sm text-blue-600">Shipped</p>
                  </div>
                </div>
  )
}

export default Recentorder
import React from "react";
import { FaBox } from "react-icons/fa";

function Recentorder({ order }) {
  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-gray-200 p-3 rounded-lg">
          <FaBox className="text-gray-600" />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            Order #{order.id}
          </h3>

          <p className="text-sm text-gray-500">
            Product #{order.product_id}
          </p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-semibold text-gray-800">
          ${order.subtotal}
        </p>

        <p className="text-sm text-blue-600">
          Qty: {order.quantity}
        </p>
      </div>
    </div>
  );
}

export default Recentorder;
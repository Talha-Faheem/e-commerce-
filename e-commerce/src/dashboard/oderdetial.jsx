import React from "react";
import axios from "axios";
import {
  FaTruck,
  FaClock,
  FaCheck,
  FaUser,
  FaCalendar,
} from "react-icons/fa";

function OrderDetails({
  order,
  getOrders,
}) {
  const status =
    order.order_status_id === 1
      ? "Pending"
      : order.order_status_id === 2
      ? "Shipped"
      : "Completed";

  const markCompleted = async () => {
    try {
      await axios.put(
        `http://localhost:3000/seller/order/status/${order.order_id}`,
        {
          order_status_id: 3,
        }
      );

      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full bg-gray-100 rounded-2xl shadow overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 flex justify-between items-center">
        <div>
          <p>
            Order #{order.order_number}
          </p>

          <h2 className="text-xl font-semibold">
            {status}
          </h2>
        </div>

        <div>
          <p>Order Total</p>

          <p className="text-2xl font-bold">
            ${order.total_amount}
          </p>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <FaUser />
              <span>Customer</span>
            </div>

            <p>
              {order.customer_name}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <FaCalendar />
              <span>Order Date</span>
            </div>

            <p>
              {new Date(
                order.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-gray-200 px-3 py-1 rounded">
              {order.quantity}x
            </span>

            <p>{order.product_name}</p>
          </div>

          <p className="font-semibold">
            ${order.subtotal}
          </p>
        </div>

        {status !== "Completed" && (
          <button
            onClick={markCompleted}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
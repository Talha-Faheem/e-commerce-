
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { FaTruck } from "react-icons/fa";
import { FaBox } from "react-icons/fa6";

function Order() {
  const [orders, setOrders] =
    useState([]);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const customerId =
    user?.customer_id;

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `https://e-commerce-backend-l9wv.onrender.com/customer/orders/${customerId}`
      );

      setOrders(
        res.data.orders || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (customerId) {
      getOrders();
    }
  }, [customerId, getOrders]);

  return (
    <div className="w-[90%] mt-5 mx-auto flex flex-col gap-4">
      <h2 className="text-xl mb-4 text-black font-medium">
        Order History
      </h2>

      <div className="flex flex-col gap-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={`${order.order_number}-${order.id}`}
              className="w-full bg-white rounded-xl border border-gray-200 p-5 shadow-sm"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold">
                      Order #
                      {order.order_number}
                    </h2>

                    {order.order_status_id ===
                    1 ? (
                      <span className="flex items-center gap-2 text-sm bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
                        <FaBox size={14} />
                        Pending
                      </span>
                    ) : order.order_status_id ===
                      2 ? (
                      <span className="flex items-center gap-2 text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                        <FaTruck size={14} />
                        Shipped
                      </span>
                    ) : (
                      <span className="flex items-center gap-2 text-sm bg-green-100 text-green-600 px-3 py-1 rounded-full">
                        Delivered
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      order.created_at
                    ).toLocaleDateString()}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Total
                  </p>

                  <p className="text-xl font-semibold">
                    $
                    {Number(
                      order.total_amount
                    ).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-800">
                  {order.product_name}
                  {" x "}
                  {order.quantity}
                </p>

                <p className="text-right text-gray-700 mt-1">
                  $
                  {Number(
                    order.subtotal
                  ).toFixed(2)}
                </p>
              </div>

              <div className="border-t my-4"></div>

              <p className="text-sm text-gray-600">
                <span className="font-medium">
                  Delivery Address:
                </span>{" "}
                {order.address_line_1}
                {order.address_line_2
                  ? `, ${order.address_line_2}`
                  : ""}
                {order.landmark
                  ? `, ${order.landmark}`
                  : ""}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl p-10 text-center">
            No Orders Found
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;


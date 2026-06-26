import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { BsBoxSeamFill } from "react-icons/bs";
import { FaClock, FaTruck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";

import OrderDetails from "./oderdetial";

function OrderHistory() {
  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const sellerId =
    user?.seller_id;

  const getOrders = async () => {
    try {
      const res =
        await axios.get(
          `https://e-commerce-backend-l9wv.onrender.com/seller/orders/${sellerId}`
        );

      setOrders(
        res.data.orders || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (sellerId) {
      getOrders();
    }
  }, [sellerId]);

  const filteredOrders =
    orders.filter(
      (order) =>
        order.order_number
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        order.customer_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  const pending =
    orders.filter(
      (order) =>
        order.order_status_id ===
        1
    );

  const shipped =
    orders.filter(
      (order) =>
        order.order_status_id ===
        2
    );

  const completed =
    orders.filter(
      (order) =>
        order.order_status_id ===
        3
    );

  const revenue =
    orders.reduce(
      (sum, order) =>
        sum +
        Number(
          order.subtotal || 0
        ),
      0
    );

  return (
    <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5">
      <div>
        <h2 className="text-xl font-medium mb-2">
          Order Management
        </h2>

        <p className="text-gray-500">
          Track and manage your
          customer orders
        </p>
      </div>

      <div className="flex justify-between gap-4 flex-wrap">
        <div className="flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-5 flex-1 min-w-[220px] text-white gap-5">
          <BsBoxSeamFill className="p-2 bg-white/15 rounded-md text-5xl" />

          <div className="flex flex-col items-center">
            <p>Total Orders</p>

            <h4 className="text-3xl font-bold">
              {orders.length}
            </h4>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg p-5 flex-1 min-w-[220px] gap-5 bg-white">
          <FaClock className="p-2 bg-gray-100 rounded-md text-5xl" />

          <div className="flex flex-col items-center">
            <p>Pending</p>

            <h4 className="text-3xl font-bold">
              {pending.length}
            </h4>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg p-5 flex-1 min-w-[220px] gap-5 bg-white">
          <FaTruck className="p-2 bg-gray-100 rounded-md text-5xl" />

          <div className="flex flex-col items-center">
            <p>Shipped</p>

            <h4 className="text-3xl font-bold">
              {shipped.length}
            </h4>
          </div>
        </div>

        <div className="flex flex-col border rounded-lg p-5 flex-1 min-w-[220px] gap-5 bg-white">
          <FaCircleCheck className="p-2 bg-gray-100 rounded-md text-5xl" />

          <div className="flex flex-col items-center">
            <p>Completed</p>

            <h4 className="text-3xl font-bold">
              {completed.length}
            </h4>
          </div>
        </div>
      </div>

      <div className="w-full rounded-lg bg-white shadow-md p-4 flex flex-col gap-5 mb-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center rounded-lg p-2 gap-3 bg-gray-200">
              <IoSearch className="text-gray-500" />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="outline-none bg-gray-200 w-full"
                placeholder="Search by Order ID or Customer"
              />
            </div>
          </div>

          <div className="min-w-[180px] rounded-md p-2 border flex flex-col items-center">
            <h3 className="text-sm">
              Total Revenue
            </h3>

            <p className="font-semibold text-lg">
              $
              {revenue.toFixed(
                2
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {filteredOrders.length >
          0 ? (
            filteredOrders.map(
              (order) => (
                <OrderDetails
                  key={
                    order.id
                  }
                  order={order}
                  getOrders={
                    getOrders
                  }
                />
              )
            )
          ) : (
            <div className="text-center py-10 text-gray-500">
              No Orders Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;
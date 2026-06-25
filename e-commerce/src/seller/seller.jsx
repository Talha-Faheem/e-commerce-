import React, {
  useEffect,
  useState,
} from "react";

import { IoReorderThreeOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import {
  MdInventory,
  MdOutlineLogout,
} from "react-icons/md";
import { BsBoxSeamFill } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";

import Sellerdashboard from "./sellerdashboard";
import Inventory from "./inventory";
import ProductAnalytics from "./product";
import Orderhistory from "./orderhistory";

function Seller() {
  const [sellerdata, setSellerdata] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [activePage, setActivePage] =
    useState("inventory");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const sellerId =
    user?.seller_id;

  const fetchSellerData =
    async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await fetch(
            `http://localhost:3000/sellerdetail/${sellerId}`
          );

        const data =
          await response.json();

        console.log(
          "Seller Response:",
          data
        );

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch seller data"
          );
        }

        setSellerdata(data);
      } catch (err) {
        console.error(
          "Seller Error:",
          err
        );

        setError(
          err.message
        );
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    if (!sellerId) {
      setError(
        "Seller ID not found"
      );
      setLoading(false);
      return;
    }

    fetchSellerData();
  }, [sellerId]);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-xl font-semibold">
          Loading...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen flex-col gap-4">
        <h2 className="text-red-500 text-xl font-semibold">
          Error Loading Seller Data
        </h2>

        <p className="text-gray-600">
          {error}
        </p>

        <button
          onClick={
            fetchSellerData
          }
          className="bg-purple-600 text-white px-6 py-2 rounded-lg"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen
            ? "w-72"
            : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Seller Panel
          </h2>
        </div>

        <div className="flex flex-col gap-2 p-4">
          <button
            onClick={() =>
              setActivePage(
                "dashboard"
              )
            }
            className={`flex items-center gap-3 p-4 rounded-xl transition ${
              activePage ===
              "dashboard"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <AiOutlineDashboard />
            Dashboard
          </button>

          <button
            onClick={() =>
              setActivePage(
                "inventory"
              )
            }
            className={`flex items-center gap-3 p-4 rounded-xl transition ${
              activePage ===
              "inventory"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <MdInventory />
            Inventory
          </button>

          <button
            onClick={() =>
              setActivePage(
                "orders"
              )
            }
            className={`flex items-center gap-3 p-4 rounded-xl transition ${
              activePage ===
              "orders"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <BsBoxSeamFill />
            Orders
          </button>

          <button
            onClick={() =>
              setActivePage(
                "analytics"
              )
            }
            className={`flex items-center gap-3 p-4 rounded-xl transition ${
              activePage ===
              "analytics"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <FaChartLine />
            Analytics
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <header className="sticky top-0 z-50 bg-white shadow-md">
          <div className="w-[95%] mx-auto flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  setSidebarOpen(
                    !sidebarOpen
                  )
                }
              >
                <IoReorderThreeOutline
                  size={35}
                />
              </button>

              <h2 className="text-xl font-semibold capitalize">
                {activePage}
              </h2>
            </div>

            <div className="flex items-center gap-5">
              <IoIosNotifications
                size={24}
              />

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <CgProfile
                  size={22}
                />

                <span>
                  {user?.name ||
                    "Seller"}
                </span>
              </div>

              <button
                onClick={
                  logout
                }
              >
                <MdOutlineLogout
                  size={24}
                />
              </button>
            </div>
          </div>
        </header>

        <main>
          {activePage ===
            "dashboard" && (
            <Sellerdashboard
              data={
                sellerdata
              }
            />
          )}

          {activePage ===
            "inventory" && (
            <Inventory
              data={
                sellerdata
              }
              refreshProducts={
                fetchSellerData
              }
            />
          )}

          {activePage ===
            "orders" && (
            <Orderhistory
              data={
                sellerdata
              }
            />
          )}

          {activePage ===
            "analytics" && (
            <ProductAnalytics
              data={
                sellerdata
              }
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Seller;
import React, {
  useEffect,
  useState,
} from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdInventory, MdOutlineLogout } from "react-icons/md";
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

  const [sidebarOpen, setSidebarOpen] =
    useState(true);

  const [activePage, setActivePage] =
    useState("inventory");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const sellerId =
    user?.seller_id;

  const sellerdetial = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/sellerdetail/${sellerId}`
      );

      const data = await res.json();

      setSellerdata(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (sellerId) {
      sellerdetial();
    }
  }, [sellerId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${
          sidebarOpen
            ? "w-72"
            : "w-0 overflow-hidden"
        }`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold">
            Seller Panel
          </h2>
        </div>

        <div className="flex flex-col gap-2 px-4">
          <button
            onClick={() =>
              setActivePage("dashboard")
            }
            className={`flex items-center gap-3 p-4 rounded-xl ${
              activePage === "dashboard"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <AiOutlineDashboard />
            Dashboard
          </button>

          <button
            onClick={() =>
              setActivePage("inventory")
            }
            className={`flex items-center gap-3 p-4 rounded-xl ${
              activePage === "inventory"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <MdInventory />
            Inventory
          </button>

          <button
            onClick={() =>
              setActivePage("orders")
            }
            className={`flex items-center gap-3 p-4 rounded-xl ${
              activePage === "orders"
                ? "bg-purple-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            <BsBoxSeamFill />
            Orders
          </button>

          <button
            onClick={() =>
              setActivePage("analytics")
            }
            className={`flex items-center gap-3 p-4 rounded-xl ${
              activePage === "analytics"
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
        <header className="flex justify-center py-4 bg-white shadow-md sticky top-0 z-50">
          <div className="w-[95%] flex justify-between items-center">
            <div className="flex gap-4 items-center">
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

            <div className="flex gap-5 items-center">
              <IoIosNotifications
                size={24}
              />

              <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                <CgProfile size={22} />

                <span>
                  {user?.name}
                </span>
              </div>

              <button
                onClick={() => {
                  localStorage.clear();
                  window.location.href =
                    "/";
                }}
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
              data={sellerdata}
            />
          )}

          {activePage ===
            "inventory" && (
            <Inventory
              data={sellerdata}
              refreshProducts={
                sellerdetial
              }
            />
          )}

          {activePage ===
            "orders" && (
            <Orderhistory
              data={sellerdata}
            />
          )}

          {activePage ===
            "analytics" && (
            <ProductAnalytics
              data={sellerdata}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default Seller;


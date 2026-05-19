import React from "react";
// import header from "./header2";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdInventory, MdOutlineLogout } from "react-icons/md";
import Sellerdashboard from "./sellerdashboard";
import Inventory from "./inventory";
import { IoSearch } from "react-icons/io5";
import ProductAnalytics from "./product";
import { BsBoxSeamFill } from "react-icons/bs";
import OrderDetails from "./oderdetial";
function seller() {
  return (
    <>
      <header className="flex w-[100%]  justify-center mx-auto md:py-5 py-3 items-center shadow-md sticky top-0 bg-white">
        <div className="w-[90%]  flex justify-between items-center">
          <div className="flex gap-5 text-2xl items-center">
            <IoReorderThreeOutline />
            <h2>Dashboard</h2>
          </div>

          <div className="flex gap-5 text-2xl items-center">
            <IoIosNotifications />
            <div className="flex items-center justify-around bg-gray-200 rounded-lg p-2 text-sm font-normal max-w-25 overflow-hidden gap-2">
              <CgProfile size={20} className="text-gray-600" />
              <p className="hidden md:flex">username</p>
            </div>
            <div className="hover:bg-red-100 rounded-lg px-3 py-2 group">
              <MdOutlineLogout className="group-hover:text-red-500" size={22} />
            </div>
          </div>
        </div>
      </header>

      {/* <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5 ">
        <div className="w-full ">
          <h2 className="text-xl font font-medium mb-2">Order Management</h2>
          <p className="text-gray-500 ">
            Track and manage your customer orders
          </p>
        </div>

        <div className="flex justify-between">
          <div className="flex flex-col bg-blue-500 rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5">
                <div>
                  <BsBoxSeamFill className="p-2 bg-white/15 rounded-md text-white text-4xl"/>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium ">All</p>
                  <h4 className="text-2xl">3</h4>
                </div>
          </div>
          <div className="flex flex-col bg-blue-500 rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5">
                <div>
                  <BsBoxSeamFill className="p-2 bg-white/15 rounded-md text-white text-4xl"/>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium ">All</p>
                  <h4 className="text-2xl">3</h4>
                </div>
          </div>
          <div className="flex flex-col bg-blue-500 rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5">
                <div>
                  <BsBoxSeamFill className="p-2 bg-white/15 rounded-md text-white text-4xl"/>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium ">All</p>
                  <h4 className="text-2xl">3</h4>
                </div>
          </div>
          <div className="flex flex-col bg-blue-500 rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5">
                <div>
                  <BsBoxSeamFill className="p-2 bg-white/15 rounded-md text-white text-4xl"/>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-medium ">All</p>
                  <h4 className="text-2xl">3</h4>
                </div>
          </div>
        </div>


        <div className="w-full rounded-lg bg-white shadow-md min-h-[100px] p-4 flex flex-col gap-5  mb-6">
                <div className="flex justify-between  items-center">
                  <div className="w-[80%]">
                    <div className=" flex  items-center rounded-lg p-2 gap-3 bg-gray-200 w-full  ">
                    <IoSearch className="text-gray-500" />
                    <input
                      className="outline-none bg-gray-200 text-md font-normal md:w-[95%] "
                      type="text"
                      placeholder="Search here ...."
                    />
                  </div>
                  </div>
        
                  
                  <div className="w-[15%] rounded-md text-md p-2 border flex flex-col items-center">
                    <h3 className="text-sm">Total Revenue</h3>
                    <p>$729.96</p>
                  </div>
                </div>
        
                <div className="flex flex-col w-full">
                  <OrderDetails/>
                </div>
              </div>
      </div> */}

        <ProductAnalytics/>

      {/* <Inventory/> */}

      {/* <Sellerdashboard/> */}
    </>
  );
}

export default seller;

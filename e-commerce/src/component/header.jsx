import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FiShoppingCart } from "react-icons/fi";
import { IoSearch } from "react-icons/io5";
import { FiHome } from "react-icons/fi";
import { TbBoxPadding } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogout } from "react-icons/md";

import Cart from "./cart";

export default function Header() {
const navigate = useNavigate();

const [cart, setCart] = useState(false);

const user = JSON.parse(
localStorage.getItem("user")
);

function closecart() {
setCart(false);
}

function opencart() {
setCart(true);
}

function logout() {
localStorage.removeItem("user");
localStorage.removeItem("token");


navigate("/");


}

return (
<> <header className="z-10 w-full flex flex-col gap-3 justify-center xl:text-lg text-md font-semibold md:py-5 py-3 items-center shadow-md sticky top-0 bg-white">


    <div className="w-[90%] flex justify-between items-center">

    
      <div
        onClick={() =>
          navigate("/customer")
        }
        className="xl:text-2xl text-xl cursor-pointer"
      >
        Market Hub
      </div>

      <div className="xl:gap-5 lg:flex gap-2 items-center hidden">

        <button
          onClick={() =>
            navigate("/customer")
          }
          className="hover:bg-gray-200 rounded-lg p-2 flex gap-2 items-center"
        >
          <FiHome />
          Home
        </button>

        <button
          onClick={() =>
            navigate(
              "/customer/allproduct"
            )
          }
          className="hover:bg-gray-200 rounded-lg p-2 flex gap-2 items-center"
        >
          <TbBoxPadding />
          All Products
        </button>

        <button
          onClick={() =>
            navigate(
              "/customer/orderhistory"
            )
          }
          className="hover:bg-gray-200 rounded-lg p-2"
        >
          Orders
        </button>

      </div>

   
      <div className="items-center rounded-lg p-2 gap-3 bg-gray-200 md:flex hidden">

        <IoSearch className="text-gray-500" />

        <input
          className="outline-none bg-gray-200 text-md font-normal xl:w-[280px] lg:w-[220px] md:w-[250px]"
          type="text"
          placeholder="Search here..."
        />

      </div>

    
      <div className="flex xl:gap-9 md:gap-5 gap-3 items-center">

     
        <div
          className="px-3 py-2 cursor-pointer"
          onClick={opencart}
        >
          <FiShoppingCart size={24} />
        </div>

    
        <div className="flex items-center justify-around bg-gray-200 rounded-lg p-2 text-sm font-normal min-w-[100px] overflow-hidden gap-2">

          <CgProfile
            size={20}
            className="text-gray-600"
          />

          <p className="hidden md:flex truncate">
            {user?.name ||
              "Customer"}
          </p>

        </div>

  
        <div
          onClick={logout}
          className="hover:bg-red-100 rounded-lg px-3 py-2 group cursor-pointer"
        >
          <MdOutlineLogout
            className="group-hover:text-red-500"
            size={22}
          />
        </div>

      </div>
    </div>

    
    <div className="items-center rounded-lg p-2 gap-3 bg-gray-200 md:hidden flex w-[90%]">

      <IoSearch className="text-gray-500" />

      <input
        className="outline-none bg-gray-200 text-md font-normal w-full"
        type="text"
        placeholder="Search here..."
      />

    </div>

  </header>

  {cart && (
    <Cart close={closecart} />
  )}
</>


);
}

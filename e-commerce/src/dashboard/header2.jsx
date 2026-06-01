import React from 'react'

import Header from "../component/header";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { MdInventory, MdOutlineLogout } from "react-icons/md";
function header() {
  return (
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
  )
}

export default header
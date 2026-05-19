import React from 'react'
import { LuDollarSign } from "react-icons/lu";
import { SlBag } from "react-icons/sl";
import { FaBox } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
function card() {
  return (
    <div className="flex flex-col bg-green-500 rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5">
        <div className="flex justify-between">
            <LuDollarSign className="p-2 bg-white/15 rounded-md text-white text-5xl"/>
            <div>
              <p className="p-1 px-2 bg-white/15 rounded-lg">12%</p>
            </div>
        </div>
        <div className="text-gray-200">
            <p >Total Revenue</p>
            <h2 className="text-3xl text-white">$729.96</h2>
            <p>Last 30 days</p>
        </div>

    </div>
  )
}

export default card
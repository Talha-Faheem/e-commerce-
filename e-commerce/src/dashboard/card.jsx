import React from 'react'
import { LuDollarSign } from "react-icons/lu";
import { SlBag } from "react-icons/sl";
import { FaBox } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

function card({title,value,description,text,color,Icon}) {
  return (
    <div className={`flex flex-col ${color} rounded-lg p-5 min-w-[200px] w-[23%] text-white gap-5`}>
        <div className="flex justify-between">
            <Icon  className="p-2 bg-white/15 rounded-md text-white text-5xl"/>
            <div>
              <p className="p-1 px-2 bg-white/15 rounded-lg">{text}</p>
            </div>
        </div>
        <div className="text-gray-200">
            <p >{title}</p>
            <h2 className="text-3xl text-white">{value}</h2>
            <p>{description}</p>
        </div>

    </div>
  )
}

export default card
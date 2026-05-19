import React from 'react'
import Card from "./card";
import Orderchart from "./orderchart";
import Sellweek from "./sellweek.jsx";
import Toprated from "./toprated.jsx"
import Recentorder from "./Recentorder.jsx"
import { FaCircleExclamation } from "react-icons/fa6";


function sellerdashboard() {
  return (
    <div className="w-[90%] mx-auto mt-4 flex flex-col gap-5 ">
        <div className="w-full ">
          <h2 className="text-xl font font-medium mb-2">Dashboard Overview</h2>
          <p className="text-gray-500 ">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>

        <div className="flex gap-4 md:justify-between flex-wrap justify-center">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>

        <div className="flex gap-5 p-4 bg-yellow-100 rounded-lg w-full mx-auto px-6 ">
          <div>
            <FaCircleExclamation className=" text-white bg-yellow-400 p-2 text-4xl rounded-md" />
          </div>
          <div className="flex flex-col gap-2">
            <h4 className="text-yellow-800 font-medium text-lg">
              Low Stock Alert
            </h4>
            <p className="text-yellow-800 ">
              1 product running low on inventory
            </p>

            <div>
              <button className="bg-yellow-400 text-white p-3 rounded-lg">
                Manage Inventory
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
            <div className="w-full h-full">
              <Orderchart />
            </div>
          </div>
          <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
            <div className="w-full h-full">
              <Sellweek />
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          
              <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
                <div className="flex flex-col gap-3">
            <div className="flex justify-between px-3">
              <h2 className="text-xl font-medium">Recent Orders</h2>
              <p className="text-md">View all</p>
            </div>
            <div className="flex flex-col gap-2">
              <Recentorder/>
              <Recentorder/>
            </div>
            <div>
                
              </div>
            </div>
          </div>

          <div className="w-[49%] h-[49vh] bg-white shadow-2xl p-4 rounded-lg">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between px-3">
              <h2 className="text-xl font-medium">Top Rated Product</h2>
              
            </div>
            <div className="flex flex-col gap-2">
            <Toprated/>
            <Toprated/>
            <Toprated/>
            </div>
            </div>
          </div>
        </div>

        <div></div>
      </div>
  )
}

export default sellerdashboard
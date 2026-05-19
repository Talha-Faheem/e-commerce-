import { BsGraphUpArrow } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import Banner1 from "../assests/banner1.jpg";
import Banner2 from "../assests/banner2.jpg";
import Shoppingcard from "./Shoppingcard";
import Smallcard from "./smallcard";
import Categorybox from "./categorybox";

import React from 'react'



function mainpages() {

  

  
  return (
    <div>
      
      
      <main className="w-full flex flex-col items-center">

        
        <div className="w-[90%] max-h-[500px] overflow-hidden rounded-2xl my-10 relative ">
          <img className="w-full h-full object-cover" src={Banner1} alt="" />
          <div className="w-full h-full absolute top-0 text-white font-semibold flex flex-col items-center justify-center gap-5 bg-black/10">
            <div className="flex flex-col items-center" >
              <h1 className="md:text-6xl text-4xl">Spring Sale</h1>
            <h3 className="mt-3 md:text-2xl text-lg">Up to 50% off on selected items</h3>
            </div>
            <button className="md:p-4 p-2 md:text-lg text-md text-black bg-white rounded-lg ">Shop Now</button>
            
          </div>
        </div>

        <div className="w-[90%] mb-10 flex gap-6 flex-col ">
          <h2 className="text-2xl font-semibold">Shop by Category</h2>
            <div className="w-full flex gap-7 overflow-y-scroll scrollbar-hide">
              <Categorybox/>
            <Categorybox/>
            <Categorybox/>
            <Categorybox/>
            <Categorybox/>
            
            </div>
        </div>

        <div className="flex justify-between items-center w-[90%] mb-5">
          <h2 className="text-2xl font-semibold flex gap-3 items-center "><CiStar/> Featured</h2>
          <a className="">See all</a>
        </div>

        <div className="w-[90%] flex-wrap flex md:gap-7 md:justify-start justify-center gap-1">

        <Shoppingcard/>
        <Shoppingcard/>
        <Shoppingcard/>
        <Shoppingcard/>

        
          
        
        </div>

        <div className="flex justify-between items-center w-[90%] mb-5">
          <h2 className="text-2xl font-semibold flex gap-3 items-center "><BsGraphUpArrow/> Trending Now</h2>
          <a className="">See all</a>
        </div>

        <div className="flex w-[90%]  justify-between gap-5 overflow-y-scroll  scrollbar-hide">
          <Smallcard/>
          <Smallcard/>
          <Smallcard/>
          <Smallcard/>
          <Smallcard/>
          <Smallcard/>
        </div>

      </main>
    </div>
  )
}

export default mainpages
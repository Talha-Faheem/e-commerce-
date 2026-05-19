import React from 'react'
import Headphone from "../assests/headphone.jpg";

import { GoDash } from "react-icons/go";
import { IoAddSharp } from "react-icons/io5";
function cartitems() {
  return (
    <div className='flex  bg-gray-200 p-2 rounded-lg gap-2 mb-3 items-center' >
                <div>
                    <img className='w-[100px] md:h-[100px] h-[90px] rounded-md' sizes='24' src={Headphone} alt="" />
                </div>
                <div className='w-[80%] flex flex-col  justify-between'>
                    <div className='flex justify-between'>
                        <h3>Wireless Headphones Pro</h3>
                        <p>$129.99</p>
                    </div>
                    <div>
                        <p className='text-gray-500'>$129.99</p>
                    </div>
                    <div className='flex justify-between pr-3'>
                        <div className='flex items-center gap-4'>
                            <GoDash/>
                            <p className='w-5 h-5 flex justify-center items-center rounded-sm'>1</p>
                            <IoAddSharp/>
                        </div>
                        <div>
                            <p className='text-red-500'>remove</p>
                        </div>
                    </div>
                </div>
            </div>
  )
}

export default cartitems
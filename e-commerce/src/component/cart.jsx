import React from 'react'
import { RiShoppingBag3Fill } from "react-icons/ri";
import Cartitems from './cartitems';
import { RxCross2 } from "react-icons/rx";
function cart({close}) {
  return (
    <div className='w-[90%] max-w-[420px] flex flex-col items-center fixed right-0 top-0 bg-white h-full shadow-lg ease-in-out duration-700 transition-transform  z-20'>
        <div className='flex w-full justify-between items-center  border-gray-500 md:py-[26px] py-3 px-3 shadow-md'>
            <div className='flex gap-5 items-center'> 
            <RiShoppingBag3Fill size={32}/>
             <h2 className='xl:text-2xl  text-xl font-medium'>Shopping cart</h2>
        </div>
        <div >
            <RxCross2 onClick={()=>{close()}} size={20}/>
        </div>
        </div>
        
        <div className='w-full px-5 pt-5 h-70vh overflow-scroll overflow-x-hidden  '>
            <Cartitems/>
            <Cartitems/>
            <Cartitems/>
            <Cartitems/>
            <Cartitems/>
            <Cartitems/>
            <Cartitems/>
            
        </div>

        <div className='flex flex-col w-full px-5 gap-6 absolute bottom-0 pb-5 border-t pt-3 bg-white '>
            <div className='flex justify-between'>
                <h3 className='text-xl font-medium'>Total </h3>
                <p className='text-lg'>$ 2000</p>

            </div>
            <button className='w-[98%] text-lg flex gap-3  items-center justify-center bg-black rounded-md text-white py-2 mx-auto'>Proceed to checkout</button>
        </div>
    </div>
  )
}

export default cart
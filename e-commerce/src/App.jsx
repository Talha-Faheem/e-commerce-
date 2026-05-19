import { useState } from 'react'
import Homepage from './dashboard/homepage'
import {Routes,Route} from 'react-router-dom'
import Mainpages from "./component/mainpages";
import Productpage from "./component/productpage";
import Productdetial from "./component/productdetial";
import Order from "./component/order"
import Checkout from "./component/checkout"
import Seller from "./dashboard/seller"
import Inventory from "./dashboard/inventory"
function App() {
  

  return (
    
    <Routes>
     <Route path="/" element={<Homepage />}>
        <Route index element={<Mainpages />} />
        <Route path="orderhistory" element={<Order />} />
        <Route path="Allproduct" element={<Productpage />} />
        <Route path="product" element={<Productdetial />} />
      </Route>
      
      <Route path='/seller' element={<Seller/>}/>
      <Route path='/inventory' element={<Inventory/>}/>
      <Route path='/seller' element={<Seller/>}/>

    </Routes>


  )
}

export default App

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import Cartitems from "./cartitems";

function Cart({ close }) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const customerId = user?.customer_id;

  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/cart/${customerId}`
      );

      setCart(res.data.cart || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (customerId) {
      getCart();
    }
  }, [customerId]);

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.subtotal || 0),
    0
  );

  const checkout = () => {
    close();
    navigate("/customer/checkout");
  };

  return (
    <div className="w-[90%] max-w-[420px] fixed right-0 top-0 h-screen bg-white shadow-xl z-50 flex flex-col">
      <div className="flex justify-between items-center p-4 shadow-md">
        <div className="flex items-center gap-4">
          <RiShoppingBag3Fill size={30} />
          <h2 className="text-xl font-semibold">
            Shopping Cart
          </h2>
        </div>

        <RxCross2
          size={24}
          className="cursor-pointer"
          onClick={close}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {cart.length > 0 ? (
          cart.map((item) => (
            <Cartitems
              key={item.id}
              item={item}
              refreshCart={getCart}
            />
          ))
        ) : (
          <div className="flex justify-center items-center h-full text-gray-500">
            Cart is Empty
          </div>
        )}
      </div>

      <div className="border-t p-4 bg-white">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-semibold">
            Total
          </h3>

          <p className="text-lg font-semibold">
            ${total.toFixed(2)}
          </p>
        </div>

        <button
          onClick={checkout}
          disabled={cart.length === 0}
          className="w-full bg-black text-white py-3 rounded-lg disabled:bg-gray-400"
        >
          Proceed To Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
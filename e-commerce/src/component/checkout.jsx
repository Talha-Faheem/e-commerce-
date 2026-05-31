
import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const customerId =
    user?.customer_id;

  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [address, setAddress] =
    useState({
      full_name: "",
      phone: "",
      city: "",
      province: "",
      postal_code: "",
      address_line_1: "",
      address_line_2: "",
      landmark: "",
    });

  useEffect(() => {
    if (customerId) {
      fetchCart();
    }
  }, [customerId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/cart/${customerId}`
      );

      setCartItems(
        res.data.cart || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]:
        e.target.value,
    });
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(item.subtotal),
    0
  );

  const handleOrder = async () => {
    if (
      !address.full_name ||
      !address.phone ||
      !address.address_line_1
    ) {
      alert(
        "Please fill all required fields"
      );
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/placeorder",
        {
          customer_id: customerId,
          address,
        }
      );

      if (res.data.success) {
        alert(
          `Order ${res.data.order_number} placed successfully`
        );

        navigate(
          "/customer/orderhistory"
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data
          ?.message ||
          "Failed To Place Order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 md:px-10 py-6">
      <p
        onClick={() =>
          navigate("/customer")
        }
        className="text-sm text-gray-500 mb-4 cursor-pointer"
      >
        ← Back To Shopping
      </p>

      <h1 className="text-2xl font-semibold mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-black text-white p-3 rounded-full">
                <FaMapMarkerAlt />
              </div>

              <h2 className="text-lg font-semibold">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="full_name"
                  value={
                    address.full_name
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label>
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={
                    address.phone
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label>
                  Address Line 1
                </label>

                <input
                  type="text"
                  name="address_line_1"
                  value={
                    address.address_line_1
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label>
                  Address Line 2
                </label>

                <input
                  type="text"
                  name="address_line_2"
                  value={
                    address.address_line_2
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div>
                <label>
                  Landmark
                </label>

                <input
                  type="text"
                  name="landmark"
                  value={
                    address.landmark
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={
                      address.city
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border rounded-lg p-3 mt-1"
                  />
                </div>

                <div>
                  <label>
                    Province
                  </label>

                  <input
                    type="text"
                    name="province"
                    value={
                      address.province
                    }
                    onChange={
                      handleChange
                    }
                    className="w-full border rounded-lg p-3 mt-1"
                  />
                </div>
              </div>

              <div>
                <label>
                  Postal Code
                </label>

                <input
                  type="text"
                  name="postal_code"
                  value={
                    address.postal_code
                  }
                  onChange={
                    handleChange
                  }
                  className="w-full border rounded-lg p-3 mt-1"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="mb-3"
              >
                <div className="flex justify-between text-sm">
                  <p>
                    {item.name}
                    {" x "}
                    {item.quantity}
                  </p>

                  <p>
                    $
                    {Number(
                      item.subtotal
                    ).toFixed(
                      2
                    )}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Cart Empty
            </p>
          )}

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-sm">
            <p>
              Subtotal
            </p>

            <p>
              $
              {total.toFixed(
                2
              )}
            </p>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <p>
              Shipping
            </p>

            <p className="text-green-600">
              Free
            </p>
          </div>

          <div className="border-t my-4"></div>

          <div className="flex justify-between text-lg font-semibold">
            <p>Total</p>

            <p>
              $
              {total.toFixed(
                2
              )}
            </p>
          </div>

          <button
            onClick={
              handleOrder
            }
            disabled={
              loading ||
              cartItems.length ===
                0
            }
            className="w-full bg-black text-white py-3 rounded-lg mt-6"
          >
            {loading
              ? "Processing..."
              : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}


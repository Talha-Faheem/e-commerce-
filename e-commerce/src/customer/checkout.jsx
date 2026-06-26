import {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const customerId = user?.customer_id;

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

  const fetchCart = async () => {
    try {
      const res = await axios.get(
        `https://e-commerce-backend-l9wv.onrender.com/cart/${customerId}`
      );

      if (res.data.success) {
        setCartItems(
          res.data.cart || []
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!customerId) {
      navigate("/login");
      return;
    }

    fetchCart();
  }, [customerId]);

  const handleChange = (e) => {
    setAddress((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum +
      Number(
        item.subtotal || 0
      ),
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
        "http://74.220.48.0/24/placeorder",
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
    <div className="min-h-screen bg-gray-50 px-4 md:px-10 py-6">
      <p
        onClick={() =>
          navigate("/customer")
        }
        className="text-sm text-gray-500 mb-4 cursor-pointer"
      >
        ← Back To Shopping
      </p>

      <h1 className="text-3xl font-bold mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Address Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black text-white p-3 rounded-full">
                <FaMapMarkerAlt />
              </div>

              <h2 className="text-xl font-semibold">
                Delivery Address
              </h2>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={
                  address.full_name
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={
                  address.phone
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="address_line_1"
                placeholder="Address Line 1"
                value={
                  address.address_line_1
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="address_line_2"
                placeholder="Address Line 2"
                value={
                  address.address_line_2
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />

              <input
                type="text"
                name="landmark"
                placeholder="Landmark"
                value={
                  address.landmark
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={
                    address.city
                  }
                  onChange={
                    handleChange
                  }
                  className="border rounded-lg p-3"
                />

                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  value={
                    address.province
                  }
                  onChange={
                    handleChange
                  }
                  className="border rounded-lg p-3"
                />
              </div>

              <input
                type="text"
                name="postal_code"
                placeholder="Postal Code"
                value={
                  address.postal_code
                }
                onChange={
                  handleChange
                }
                className="w-full border rounded-lg p-3"
              />
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl border p-6 h-fit">
          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-3"
              >
                <div>
                  <p className="font-medium">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Qty:{" "}
                    {item.quantity}
                  </p>
                </div>

                <p className="font-semibold">
                  $
                  {Number(
                    item.subtotal
                  ).toFixed(2)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Cart Empty
            </p>
          )}

          <div className="border-t mt-4 pt-4">
            <div className="flex justify-between mb-2">
              <span>
                Subtotal
              </span>
              <span>
                $
                {total.toFixed(
                  2
                )}
              </span>
            </div>

            <div className="flex justify-between mb-2">
              <span>
                Shipping
              </span>
              <span className="text-green-600">
                Free
              </span>
            </div>

            <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
              <span>Total</span>

              <span>
                $
                {total.toFixed(
                  2
                )}
              </span>
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
              className="w-full mt-6 bg-black text-white py-3 rounded-lg disabled:bg-gray-400"
            >
              {loading
                ? "Processing..."
                : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}